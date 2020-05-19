import ajax from '../lib/ajax';

/**
 * 获取作业列表
 * @param {number} page
 * @param {number} number
 */
export function getHomeWorkList(type, page, num) {
  return ajax('parent/homework', 'post', { type, page, num });
}

/**
 * 获取作业得分
 * @param {number} type
 * @param {number} id
 */
export function getHomeWorkScore(type, id) {
  return ajax('parent/score', 'post', { type, id });
}

/**
 * 获取作业详情
 * @param {number} type
 * @param {number} detail_id
 * @param {number} id
 */
export function getHomeWorkDetail(type, id, detail_id) {
  return ajax('parent/score-detail', 'post', { type, detail_id, id });
}
