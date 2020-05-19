import ajax from '@/lib/ajax';

/**
 * 报名
 */
export function report(username, mobile, grade, subject_type, employee_id) {
  return ajax(`teacher-client/create`, 'post', {
    username,
    mobile,
    grade,
    subject_type,
    employee_id,
  });
}
