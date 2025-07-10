
import { supabase } from './supabaseClient';
import { Therapist } from 'types/Therapist';

export const fetchTherapists = async (): Promise<Therapist[]> => {
  const { data, error } = await supabase
    .from('therapists')
    .select('*')
    .eq('approved', true);
  if (error) throw error;
  return data;
};

export const getAllTherapists = async (): Promise<Therapist[]> => {
  const { data, error } = await supabase.from('therapists').select('*');
  if (error) throw error;
  return data;
};

export const getTherapist = async (id: string): Promise<Therapist> => {
  const { data, error } = await supabase
    .from('therapists')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
};

export const createTherapist = async (therapist: Partial<Therapist>): Promise<Therapist> => {
  const { data, error } = await supabase.from('therapists').insert(therapist).single();
  if (error) throw error;
  return data;
};

export const updateTherapist = async (id: string, therapist: Partial<Therapist>): Promise<Therapist> => {
  const { data, error } = await supabase.from('therapists').update(therapist).eq('id', id).single();
  if (error) throw error;
  return data;
};

export const deleteTherapist = async (id: string): Promise<void> => {
  const { error } = await supabase.from('therapists').delete().eq('id', id);
  if (error) throw error;
};
