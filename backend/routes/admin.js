const express = require('express');
const supabase = require('../config/supabase');

const router = express.Router();

// Middleware to check if user is admin
const requireAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'No authorization header' });
    }
    
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Check if user is admin in public.users table
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profileError || profile?.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    req.user = { ...user, ...profile };
    next();
  } catch (err) {
    console.error('Admin Auth Error:', err);
    res.status(500).json({ message: 'Server authentication error' });
  }
};

// Protect all admin routes
router.use(requireAdmin);

// --- Overview Stats ---
router.get('/stats', async (req, res) => {
  try {
    const [users, videos, questions, pendingQuestions] = await Promise.all([
      supabase.from('users').select('id', { count: 'exact', head: true }),
      supabase.from('videos').select('id', { count: 'exact', head: true }),
      supabase.from('questions').select('id', { count: 'exact', head: true }),
      supabase.from('questions').select('id', { count: 'exact', head: true }).eq('status', 'pending')
    ]);

    res.json({
      totalUsers: users.count || 0,
      totalVideos: videos.count || 0,
      totalQuestions: questions.count || 0,
      pendingQuestions: pendingQuestions.count || 0
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch stats' });
  }
});

// --- User Management ---
router.get('/users', async (req, res) => {
  const { search, page = 1, limit = 10 } = req.query;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  try {
    let query = supabase
      .from('users')
      .select('id, display_name, email, contact_number, role, created_at', { count: 'exact' });

    if (search) {
      query = query.or(`display_name.ilike.%${search}%,email.ilike.%${search}%`);
    }

    const { data, count, error } = await query
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) throw error;
    res.json({ data, total: count, page: parseInt(page), limit: parseInt(limit) });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

// --- Video Management ---
const extractYoutubeId = (url) => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : null;
};

router.get('/videos', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('videos')
      .select(`*, users!uploaded_by ( display_name )`)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch videos' });
  }
});

router.post('/videos', async (req, res) => {
  const { title, url, description } = req.body;
  const youtubeId = extractYoutubeId(url);
  
  if (!youtubeId) {
    return res.status(400).json({ message: 'Invalid YouTube URL' });
  }

  const thumbnail_url = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;

  try {
    const { data, error } = await supabase
      .from('videos')
      .insert([{
        title,
        url,
        description,
        youtube_id: youtubeId,
        thumbnail_url,
        uploaded_by: req.user.id
      }])
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add video' });
  }
});

router.put('/videos/:id', async (req, res) => {
  const { title, url, description } = req.body;
  const youtubeId = extractYoutubeId(url);
  const thumbnail_url = youtubeId ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg` : null;

  try {
    const updateData = { title, url, description };
    if (youtubeId) {
      updateData.youtube_id = youtubeId;
      updateData.thumbnail_url = thumbnail_url;
    }

    const { data, error } = await supabase
      .from('videos')
      .update(updateData)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update video' });
  }
});

router.delete('/videos/:id', async (req, res) => {
  try {
    const { error } = await supabase.from('videos').delete().eq('id', req.params.id);
    if (error) throw error;
    res.json({ message: 'Video deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete video' });
  }
});

// --- Tagline Management ---
router.get('/taglines', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('taglines')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch taglines' });
  }
});

router.post('/taglines', async (req, res) => {
  const { content, is_active } = req.body;
  try {
    if (is_active) {
      await supabase.from('taglines').update({ is_active: false }).eq('is_active', true);
    }
    const { data, error } = await supabase.from('taglines').insert([{ content, is_active }]).select().single();
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create tagline' });
  }
});

router.put('/taglines/:id', async (req, res) => {
  const { content, is_active } = req.body;
  try {
    if (is_active) {
      // Deactivate others
      await supabase.from('taglines').update({ is_active: false }).neq('id', req.params.id);
    }
    const { data, error } = await supabase.from('taglines').update({ content, is_active }).eq('id', req.params.id).select().single();
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update tagline' });
  }
});

router.delete('/taglines/:id', async (req, res) => {
  try {
    const { error } = await supabase.from('taglines').delete().eq('id', req.params.id);
    if (error) throw error;
    res.json({ message: 'Tagline deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete tagline' });
  }
});

// --- Question Management ---
router.get('/questions', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch questions' });
  }
});

router.put('/questions/:id', async (req, res) => {
  const { answer, status } = req.body;
  try {
    // 1. Fetch the original question to get user email and name
    const { data: questionData, error: fetchError } = await supabase
      .from('questions')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (fetchError || !questionData) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // 2. Update the question in Supabase
    const { data: updatedData, error: updateError } = await supabase
      .from('questions')
      .update({ 
        answer, 
        status: status || 'answered',
        updated_at: new Date().toISOString()
      })
      .eq('id', req.params.id)
      .select()
      .single();

    if (updateError) throw updateError;

    // 3. Send Email via Resend
    if (answer && process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 're_your_api_key_here') {
      try {
        console.log(`Attempting to dispatch email to: ${questionData.email}`);
        const { data: emailResponse, error: emailError } = await resend.emails.send({
          from: 'Gulf Hub <onboarding@resend.dev>', // Required for unverified domains
          to: [questionData.email],
          subject: `${questionData.name}, Dharmendra Tiwari replied to your inquiry`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
              <h2 style="color: #f97316;">GULF HUB Official Response</h2>
              <p>Hello <strong>${questionData.name}</strong>,</p>
              <p>Dharmendra Tiwari has reviewed your message and provided the following response:</p>
              <div style="padding: 15px; background: #f4f4f4; border-left: 5px solid #10b981; margin: 20px 0;">
                "${answer}"
              </div>
              <p>Good luck with your recruitment journey!</p>
              <hr />
              <p style="font-size: 12px; color: #666;">This is an automated message from DK Technical's Gulf Hub portal.</p>
            </div>
          `
        });

        if (emailError) {
          console.error('Resend API returned an error:', emailError);
        } else {
          console.log('Email sent successfully! ID:', emailResponse.id);
        }
      } catch (dispatchErr) {
        console.error('Critical Error in Email Dispatcher:', dispatchErr);
      }
    }


    res.json(updatedData);
  } catch (err) {
    console.error('Question Update Error:', err);
    res.status(500).json({ message: 'Failed to update question and dispatch notification' });
  }
});

router.delete('/questions/:id', async (req, res) => {
  try {
    const { error } = await supabase.from('questions').delete().eq('id', req.params.id);
    if (error) throw error;
    res.json({ message: 'Question deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete question' });
  }
});

module.exports = router;