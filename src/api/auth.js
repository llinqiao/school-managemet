import ajax from '../lib/ajax';

/**
 * 登录
 * @param {string} mobile
 * @param {string} password
 */
export function login(mobile, password) {
  return ajax('teacher/login', 'post', { mobile, password });
}
