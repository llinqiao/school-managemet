import ajax from '@/lib/ajax';

/**
 * 测试成绩列表
 */
export function getTestList(page = 0, num = 10) {
  return ajax(`teacher-exam/index?num=${num}&page=${page}`, 'post', {});
}

/**
 * 测试成绩详情
 */
export function getTestDetail(exam_id) {
  return ajax(`teacher-exam/detail`, 'post', { exam_id });
}

/**
 * 测试学校成绩列表
 */
export function getSchoolTestList(page = 0, num = 10) {
  return ajax(`teacher-score/index?num=${num}&page=${page}`, 'post', {});
}

/**
 * 班级下学生
 */
export function getClassroomStudent(classroom_id, page, num) {
  return ajax(`teacher-score/student?num=${num}&page=${page}`, 'post', { classroom_id });
}

/**
 * 学生成绩
 */
export function getStudentScore(classroom_id, student_id) {
  return ajax(`teacher-score/score`, 'post', {
    classroom_id,
    student_id,
  });
}

// 创建学校成绩
export function createSchoolTest(type, score, course_type, student_id) {
  return ajax(`teacher-score/create-score`, 'post', { type, score, course_type, student_id });
}
