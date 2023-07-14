import { createClient } from '@supabase/supabase-js';
const supaUrl = `${process.env.REACT_APP_SUPABASE_MAIN}`;
const supaApi= `${process.env.REACT_APP_SUPABASE_API}`;

const supabase = createClient(
  supaUrl,
  supaApi
);
export default supabase;