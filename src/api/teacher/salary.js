import ajax from '@/lib/ajax';

/**
 * 工资列表
 */
export function getSalaryList(num, page, year) {
  return ajax(`teacher-salary/index?num=${num}&page=${page}`, 'post', { year });
}

/**
 * 工资详情
 */
export function getSalaryDetail(salary_id, type) {
  return ajax(`teacher-salary/detail`, 'post', { salary_id, type });
}
