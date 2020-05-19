import ajax from '../lib/ajax';

export function getChatData(params) {
  return ajax('chat/list', 'get', params);
}
