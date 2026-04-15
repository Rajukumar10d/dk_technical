import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL + '/admin';

const adminClient = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to attach the token
adminClient.interceptors.request.use((config) => {
  // Get the token from localStorage (Supabase stores it there)
  const supabaseToken = localStorage.getItem('sb-' + import.meta.env.VITE_SUPABASE_URL.split('//')[1].split('.')[0] + '-auth-token');
  
  if (supabaseToken) {
    try {
      const parsedToken = JSON.parse(supabaseToken);
      const token = parsedToken.access_token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      console.error('Error parsing token:', e);
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

const adminApi = {
  // Stats
  getStats: () => adminClient.get('/stats'),

  // Users
  getUsers: (search = '', page = 1) => 
    adminClient.get('/users', { params: { search, page } }),

  // Videos
  getVideos: () => adminClient.get('/videos'),
  addVideo: (videoData) => adminClient.post('/videos', videoData),
  updateVideo: (id, videoData) => adminClient.put(`/videos/${id}`, videoData),
  deleteVideo: (id) => adminClient.delete(`/videos/${id}`),

  // Taglines
  getTaglines: () => adminClient.get('/taglines'),
  addTagline: (taglineData) => adminClient.post('/taglines', taglineData),
  updateTagline: (id, taglineData) => adminClient.put(`/taglines/${id}`, taglineData),
  deleteTagline: (id) => adminClient.delete(`/taglines/${id}`),

  // Questions
  getQuestions: () => adminClient.get('/questions'),
  updateQuestion: (id, data) => adminClient.put(`/questions/${id}`, data),
  deleteQuestion: (id) => adminClient.delete(`/questions/${id}`),
};

export default adminApi;

