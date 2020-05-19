import ajax from '@/lib/ajax';

/**
 * 课表
 * @param {string} type
 * @param {string} is_comment
 */
export function getScheduleList(num, page, semester_id, class_time) {
  return ajax(`teacher-timetable/index?num=${num}&page=${page}`, 'post', {
    semester_id,
    class_time,
  });
}

/**
 * 获取学期
 */

export function getSemesterList() {
  return ajax(`semester/index?page=0&num=100`, 'post', {});
}
