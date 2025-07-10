
import { supabase } from './supabaseClient';
import { AuthCredentials } from 'types/Auth';

export const signUp = async (credentials: AuthCredentials) => {
  const { data, error } = await supabase.auth.signUp({
    email: credentials.email,
    password: credentials.password,
  });
  if (error) throw error;
  // The user will get a confirmation email.
  return data;
};

export const signIn = async (credentials: AuthCredentials) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: credentials.email,
    password: credentials.password,
  });
  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
};

export const onAuthStateChange = (callback: (session: any) => void) => {
  const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session);
  });
  return authListener;
};
