const express = require('express');
const supabase = require('../config/supabase');

const router = express.Router();

// Middleware to check if user is admin
const requireAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Check if user is admin
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
    res.status(500).json({ message: 'Server error' });
  }
};

// Protect all admin routes
router.use(requireAdmin);

// Get all users
router.get('/users', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('id, display_name, email, contact_number, role, created_at')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all videos
router.get('/videos', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('videos')
      .select(`
        *,
        users!uploaded_by (
          display_name
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add new video
router.post('/videos', async (req, res) => {
  const { title, url, description } = req.body;
  try {
    const { data, error } = await supabase
      .from('videos')
      .insert([{
        title,
        url,
        description,
        uploaded_by: req.user.id
      }])
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Edit video
router.put('/videos/:id', async (req, res) => {
  const { title, url, description } = req.body;
  try {
    const { data, error } = await supabase
      .from('videos')
      .update({ title, url, description })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete video
router.delete('/videos/:id', async (req, res) => {
  try {
    const { error } = await supabase
      .from('videos')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;
    res.json({ message: 'Video deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all questions
router.get('/questions', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Answer question
router.put('/questions/:id', async (req, res) => {
  const { answer } = req.body;
  try {
    const { data, error } = await supabase
      .from('questions')
      .update({
        answer,
        status: 'answered'
      })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;