//file should be rename with file extension .js, this is no longer  common javascript
import { createClient } from '@supabase/supabase-js'



 
const supabase = createClient(process.env.supabaseUrl, process.env.supabaseKey);


const { data: master_db_data, error: readError } = await supabase
  .from('active_members')
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
