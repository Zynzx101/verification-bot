import { createClient } from '@supabase/supabase-js'

import config from '../config/config.json' with { type: 'json' };


const supabase = createClient(config.supabaseUrl, config.supabaseKey);


const { data: master_db_data, error: readError } = await supabase
  .from('master_db')
  .select('student_id, full_name')

if (readError) {
  console.error('Error reading master_db:', readError)
}



const studentLookup = new Map();

for (const student of master_db_data) {
  const key =
    student.full_name.toLowerCase() + "|" + student.student_id;

  studentLookup.set(key, student);
}

export function isValidStudent(student_id, full_name) {
  const full_name_normalized = full_name.toLowerCase();
  const student_id_cleaned = student_id.replace(/\D/g, '');

  const key = full_name_normalized + "|" + student_id_cleaned;

  return studentLookup.has(key);
}




