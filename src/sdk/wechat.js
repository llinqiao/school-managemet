import storage from './storage';
import { isWxBrowser } from '../lib/utils';
import axios from 'axios';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

/**
 * 获取微信openid
 */
export function wechatGetOpenId() {
  if (isWxBrowser()) {
    let openId = storage.get('open_id');
    if (openId) {
      return openId;
    } else {
      // 因为使用微信登陆暂无
    }
  }
  return '';
}

/**
 * 微信支付
 * @param {object} data
 */
export function wechatPay(data) {
  return new Promise((resolve, reject) => {
    WeixinJSBridge &&
      WeixinJSBridge.invoke('getBrandWCPayRequest', data, res => {
        if (res.err_msg === 'get_brand_wcpay_request:ok') {
          // 支付成功
          resolve(res);
        } else {
          reject(res);
        }
      });
  });
}

/**
 * 微信分享
 * @param {string} title
 * @param {string} desc
 * @param {string} link
 * @param {string} imgUrl
 * @param {string} type
 * @param {function} success
 * @param {function} cancel
 */
export function wechatShare(
  title = document.title,
  desc = document.title,
  link = location.href,
  imgUrl = '',
  type = 'link',
  success = null,
  cancel = null
) {
  if (!isWxBrowser()) {
    return;
  }
  // filter html tags
  if (desc) {
    desc.toString();
    desc = desc.replace(/(\n)/g, '');
    desc = desc.replace(/(\t)/g, '');
    desc = desc.replace(/(\r)/g, '');
    desc = desc.replace(/<\/?[^>]*>/g, '');
    desc = desc.replace(/\s*/g, '');
  }
  let url = location.href;
  let shareOptions = { title, desc, link, imgUrl, type };
  axios.post('/wechat/js-sign', { url }).then(config => {
    config.data.debug = false;
    config.data.jsApiList = [
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'onMenuShareWeibo',
      'startRecord',
      'stopRecord',
      'playVoice',
      'uploadVoice',
      'downloadVoice',
      'stopVoice',
      'pauseVoice',
    ];
    wx.config(config.data);
    wx.ready(() => {
      wx.onMenuShareTimeline(shareOptions);
      wx.onMenuShareAppMessage(shareOptions);
      wx.onMenuShareQQ(shareOptions);
    });
  });
}
