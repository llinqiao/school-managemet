import { env } from '../config';

/**
 * 判断是否是手机
 * @param {string} string
 * @return {boolean} 是否是手机
 */
export function isPhoneNumber(str) {
  let phoneReg = /^1(3|4|5|7|8)\d{9}$/;
  return phoneReg.test(str);
}

/**
 * 是否是微信浏览器
 */
export function isWxBrowser() {
  return /micromessenger/i.test(navigator.userAgent);
}

/**
 * 是否是安卓机
 */
export function isAndroid() {
  return navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1;
}

/**
 * 是否是ios
 */
export function isIos() {
  return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
}

/**
 * 格式化成大概时间
 * @param {Date} dateTimeStamp 时间戳
 * @return 大概时间
 */
export function timeDiff(dateTimeStamp) {
  dateTimeStamp *= 1000;
  let minute = 1000 * 60;
  let hour = minute * 60;
  let day = hour * 24;
  // let halfamonth = day * 15;
  let month = day * 30;
  let now = new Date().getTime();
  let diffValue = now - dateTimeStamp;
  if (diffValue < 0) {
    return;
  }
  let monthC = diffValue / month;
  let weekC = diffValue / (7 * day);
  let dayC = diffValue / day;
  let hourC = diffValue / hour;
  let minC = diffValue / minute;
  let result = '';
  if (monthC >= 1) {
    result = '' + parseInt(monthC) + '月前';
  } else if (weekC >= 1) {
    result = '' + parseInt(weekC) + '周前';
  } else if (dayC >= 1) {
    result = '' + parseInt(dayC) + '天前';
  } else if (hourC >= 1) {
    result = '' + parseInt(hourC) + '小时前';
  } else if (minC >= 1) {
    result = '' + parseInt(minC) + '分钟前';
  } else {
    result = '刚刚';
  }
  return result;
}

/**
 * 格式化成指定格式的时间
 * @param {Date} time 时间戳
 * @param {string} fmt 格式化的格式
 * @return {string} 格式后的时间
 */
export function timeFormat(time, fmt = 'yyyy-MM-dd hh:mm:ss') {
  let o = {
    'M+': time.getMonth() + 1, // 月份
    'd+': time.getDate(), // 日
    'h+': time.getHours(), // 小时
    'm+': time.getMinutes(), // 分
    's+': time.getSeconds(), // 秒
    'q+': Math.floor((time.getMonth() + 3) / 3), // 季度
    S: time.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      );
  }
  return fmt;
}

/**
 * 获取倒计时
 * @param {date} haveTime
 */
export function getCountTime(haveTime, isData) {
  if (typeof haveTime !== 'number') {
    return false;
  }
  haveTime = Math.floor(haveTime / 1000);
  if (haveTime <= 0) {
    return false;
  }
  let day = Math.floor(haveTime / 3600 / 24);
  let hour = Math.floor(haveTime / 3600 - 24 * day);
  let minute = Math.floor((haveTime - 3600 * hour - 24 * 3600 * day) / 60);
  let second = haveTime % 60;
  const completenum = num => (num < 10 ? '0' + num : num);
  if (isData) {
    return [day, hour, minute, second].map(item => completenum(item));
  }
  return `${day}天${hour}小时${minute}分钟${second}秒`;
}

/**
 * 补全图片地址
 * @param {*} url
 */
export function fullImgUrl(url) {
  if (!url) {
    return url;
  }
  if (url.indexOf('http') !== -1) {
    return url;
  } else {
    return env.imgUrl + url;
  }
}

/**
 * preview uploadImg
 * read input upload file to base64
 * @param {Object} input base64 string
 * @return {String} base64 string
 */
export function uploadImgPreview(input) {
  let base64;
  if (input.files && input.files[0]) {
    let reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = e => {
        base64 = e.target.result;
        resolve(base64);
      };
      reader.readAsDataURL(input.files[0]);
    });
  }
}

/**
 * 震动
 * @param {*} time
 */
export function vibrate(time) {
  let vibrateSupport = 'vibrate' in navigator;
  if (vibrateSupport) {
    // 兼容不同的浏览器
    navigator.vibrate =
      navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
    return navigator.vibrate(time);
  } else {
    return false;
  }
}

/**
 * 微信内设置标题
 * @param {string} title 标题
 */
export function setWechatTitle(title) {
  document.title = title;
  if (isIos()) {
    let iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.setAttribute('src', '/static/favicon.ico');
    const iframeCallback = () => {
      setTimeout(() => {
        iframe.removeEventListener('load', iframeCallback);
        document.body.removeChild(iframe);
      }, 0);
    };
    iframe.addEventListener('load', iframeCallback);
    document.body.appendChild(iframe);
  }
}

/**
 * 说一说 写一写 句子转化
 * @param {string} words
 * @param {string} lack
 */
export function covSayOrWrite(words, lack) {
  if (!lack) return `<span class="error">${words}</span>`;
  if (!words) return '';
  const rightArr = lack.split(',').map(item => Number(item));
  const wordsArr = words.split(' ');

  return wordsArr
    .map((item, index) => {
      if (!rightArr.includes(index)) item = `<span class="error">${item}</span>`;
      return item;
    })
    .join(' ');
}

/**
 * 学生回答句子转化
 * @param {string} words
 * @param {string|number} lack
 */
export function studentAnswerCov(words, lack) {
  if (!lack) return words;
  if (!words) return '';
  if (parseInt(lack, 10) === 500) {
    return `<span class="error">${words}</span>`;
  } else {
    let sentenceArr = words.split(/[.?!,。？！，]/).map(item => item.split(' '));
    if (lack) {
      // 错误二维数组
      let errorArr = lack.split('||').map(item => item.split('-').map(num => parseInt(num, 10)));

      errorArr.forEach((errorrItem, sIndex) => {
        errorrItem.forEach(errorIndex => {
          if (!isNaN(errorIndex) && sentenceArr[sIndex][errorIndex]) {
            sentenceArr[sIndex][errorIndex] = `<span class="error">${
              sentenceArr[sIndex][errorIndex]
            }</span>`;
          }
        });
      });
    }
    return sentenceArr.map(item => item.join(' ')).join('.');
  }
}
