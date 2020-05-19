import ajax from '../lib/ajax';
import { env } from '../config';

const _ajax = (api, method = 'get', data = null) => {
  return ajax(api, method, data, env.share_api);
};

/**
 * 获取分享故事
 * @param {string} story_test_id
 */
export function getStory(story_test_id) {
  return _ajax('site/share-story', 'get', { story_test_id }).then(res => res.data);
}

/**
 * 获取拓展分享故事
 * @param {string} story_test_child_id
 */
export function getExpandStory(story_test_expand_id) {
  return _ajax('site/share-story-expand', 'get', { story_test_expand_id }).then(res => res.data);
}

/**
 * 获取幼儿分享故事
 * @param {string} story_test_child_id
 */
export function getChildStory(story_test_child_id) {
  return _ajax('site/share-story-child', 'get', { story_test_child_id }).then(res => res.data);
}

/**
 * 普通课程
 * 获取说一说 或 写一写内容
 * @param {string} froduction_test_word_id
 * @param {number} type 0: 说一说 1: 写一写
 */
export function getNormalSayOrWrite(froduction_test_id, type) {
  return _ajax('site/share-froduction-all', 'get', { froduction_test_id, type });
}

/**
 * 扩展课程
 * 获取说一说 或 写一写内容
 * @param {string} froduction_test_expand_id
 * @param {number} type 0: 说一说 1: 写一写
 */
export function getExpandSayOrWrite(froduction_test_expand_id, type) {
  return _ajax('site/share-froduction-expand-all', 'get', { froduction_test_expand_id, type });
}

/**
 * 幼儿英语
 * 获取说一说 或 写一写内容
 * @param {string} test_log_child_id
 * @param {number} type 0: 说一说 1: 写一写
 */
export function getChildSayOrWrite(test_log_child_id) {
  return _ajax('site/share-froduction-child-all', 'get', { test_log_child_id });
}

/**
 * 获取普通课程难题整套分享
 * @param {string} froduction_test_hard_id
 */
export function getNormalCompleteQuestion(froduction_test_hard_id) {
  return _ajax('site/share-froduction-hard', 'get', { froduction_test_hard_id });
}

/**
 * 获取扩展课程难题整套分享
 * @param {string} froduction_test_hard_expand_id
 */
export function getExpandCompleteQuestion(froduction_test_hard_expand_id) {
  return _ajax('site/share-froduction-expand-hard', 'get', { froduction_test_hard_expand_id });
}

/**
 * 获取幼儿课程难题整套分享
 * @param {string} froduction_test_hard_child_id
 */
export function getChildCompleteQuestion(froduction_test_hard_child_id) {
  return _ajax('site/share-froduction-child-hard', 'get', { froduction_test_hard_child_id });
}
