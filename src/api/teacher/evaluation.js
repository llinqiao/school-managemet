import ajax from '@/lib/ajax';

/**
 * 对我的评价
 * @param {number} type
 */
export function evaluationForMe(type, page, num) {
  return ajax(`teacher-comment/index-for-me?num=${num}&page=${page}`, 'post', { type });
}

/**
 * 评价班级的列表
 */
export function getEvaluationTeacher(page = 0, num = 10) {
  return ajax(`teacher-comment/index-teacher?num=${num}&page=${page}`, 'post', {});
}

/**
 * 需评价老师列表
 */
export function getEvaluationClass(num, page) {
  return ajax(`teacher-comment/index?num=${100}&page=${0}`, 'post', {});
}

/**
 * 班级下的学生列表
 */
export function getClassStudent(classroom_id, page, num) {
  return ajax(`teacher-comment/student?num=${num}&page=${page}`, 'post', { classroom_id });
}

/**
 * 评论列表
 */
export function getStudentEvaluationList(classroom_id, student_id, page = 0, num = 1000) {
  return ajax(`teacher-comment/comment-list?num=${num}&page=${page}`, 'post', {
    classroom_id,
    student_id,
  });
}

/**
 * 对学生评价
 */
export function evaluationStudent(data) {
  return ajax(`teacher-comment/create`, 'post', data);
}

/**
 * 对同事评价
 */
export function evaluationTeacher(data) {
  return ajax(`teacher-comment/comment-teacher`, 'post', data);
}

/**
 * 班级下学生的列表
 */
export function getStudentList(num, page, classroom_id) {
  return ajax(`teacher-comment/student?num=${num}&page=${page}`, 'post', { classroom_id });
}
