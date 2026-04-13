const express = require('express');
const supabase = require('../config/supabase');

const router = express.Router();

// @desc    Get current user
// @route   GET /auth/user
router.get('/user', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Get user profile from users table
    let { data: profile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError && profileError.details !== 'Result has no rows') {
      return res.status(500).json({ message: 'Error fetching user profile' });
    }

    if (!profile) {
      const displayName = user.user_metadata?.name || user.email;
      const { data: createdProfile, error: createError } = await supabase
        .from('users')
        .insert([{ id: user.id, display_name: displayName, email: user.email }])
        .select()
        .single();

      if (createError) {
        return res.status(500).json({ message: 'Error creating user profile' });
      }
      profile = createdProfile;
    }

    res.json({ ...user, ...profile });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Submit a question
// @route   POST /auth/question
router.post('/question', async (req, res) => {
  const { name, email, question } = req.body;
  try {
    const { data, error } = await supabase
      .from('questions')
      .insert([{ name, email, question }]);

    if (error) throw error;
    res.json({ message: 'Question submitted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Update contact number
// @route   PUT /auth/contact
router.put('/contact', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const { data, error } = await supabase
      .from('users')
      .update({ contact_number: req.body.contactNumber })
      .eq('id', user.id)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get all videos
// @route   GET /auth/videos
router.get('/videos', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;