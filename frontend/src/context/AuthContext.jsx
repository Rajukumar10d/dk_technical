import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const authRedirectUrl = import.meta.env.VITE_AUTH_REDIRECT_URL || window.location.origin;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const setAxiosToken = (token) => {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common.Authorization;
    }
  };

  const ADMIN_EMAIL = 'admindktiwari12@gmail.com';

  const fetchUserRole = async (sessionUser) => {
    if (!sessionUser) return null;

    // Hardcoded unique admin identity
    if (sessionUser.email === ADMIN_EMAIL) {
      return { role: 'admin', is_admin: true };
    }

    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', sessionUser.id)
        .single();
      
      if (error && error.code === 'PGRST116') {
        const { data: newUser, error: createError } = await supabase
          .from('users')
          .insert([{ id: sessionUser.id, email: sessionUser.email, role: 'user' }])
          .select()
          .single();
        if (createError) throw createError;
        return newUser;
      }
      return data;
    } catch (err) {
      console.error('Error fetching role:', err);
      return { ...sessionUser, role: 'user' };
    }
  };

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const fullUser = await fetchUserRole(session.user);
        setUser({ ...session.user, ...fullUser });
      } else {
        setUser(null);
      }
      setAxiosToken(session?.access_token ?? null);
      setLoading(false);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const fullUser = await fetchUserRole(session.user);
          setUser({ ...session.user, ...fullUser });
        } else {
          setUser(null);
        }
        setAxiosToken(session?.access_token ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const login = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: authRedirectUrl
      }
    });
    if (error) console.error('Error:', error);
  };

  const loginWithEmail = async (email, password) => {
    setLoading(true);
    let { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    // If user doesn't exist yet and it's the specific admin email, attempt to sign them up
    if (error && error.message === 'Invalid login credentials' && email === ADMIN_EMAIL) {
      console.log('Attempting to initialize admin account...');
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (signUpError) {
        setLoading(false);
        throw signUpError;
      }
      
      // If sign up worked, try logging in again (auto-confirmed in many dev setups)
      const { data: nextData, error: nextError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (nextError) {
        setLoading(false);
        throw new Error('Admin account created, but requires email verification or dashboard confirmation.');
      }
      
      data = nextData;
      error = null;
    }

    if (error) {
      setLoading(false);
      throw error;
    }
    
    const fullUser = await fetchUserRole(data.user);
    setUser({ ...data.user, ...fullUser });
    setLoading(false);
    return data;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Error:', error);
    setAxiosToken(null);
    setUser(null);
  };

  const updateContact = async (contactNumber) => {
    try {
      if (!user) return;
      const { data, error } = await supabase
        .from('users')
        .update({ contact_number: contactNumber })
        .eq('id', user.id);
      if (error) throw error;
      setUser({ ...user, contact_number: contactNumber });
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      loginWithEmail,
      logout,
      updateContact,
      supabase
    }}>
      {children}
    </AuthContext.Provider>
  );
};