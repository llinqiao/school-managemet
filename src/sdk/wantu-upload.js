import myAjax from './ajax';

const uploadJSSDK = options => {
  let file = options.file;
  let dir = options.dir || '';
  let token = options.token;
  let callback = options.callback || function() {};
  let retries = options.retries || 3;
  let maxSize = options.maxSize || 0;
  let fileName = options.name || file.name;
  // 记得套壳的时候加上http
  let uploadUrl = '//upload.media.aliyun.com/api/proxy/upload';
  let blockInit = '//upload.media.aliyun.com/api/proxy/blockInit';
  let blockUpload = '//upload.media.aliyun.com/api/proxy/blockUpload';
  let blockComplete = '//upload.media.aliyun.com/api/proxy/blockComplete';
  let chunkSize = options.chunkSize || 4 * 1024 * 1024;
  let offset = 0;
  let blob = file;
  let id; // 上传唯一id，上传初始化请求获得
  let uploadId; // 分片上传id，上传初始化请求获得
  let tags = []; // 每次分片上传得到的md5
  let curChunkSize = [];
  let chunkBlob = []; // 分块上传的各个块

  const handleError = (result, finish, chunk, status) => {
    // 重试
    if (retries-- > 0 && !finish && status !== 599) {
      if (file.size > chunkSize) {
        // 分块上传
        uploadNextChunk(chunk, curChunkSize[chunk], chunkBlob[chunk]);
      } else {
        // 普通上传
        uploadSingle();
      }
    } else {
      // eslint-disable-next-line
      callback(-1, result);
    }
  };

  // 上传分块之前需要提交个start请求，上传结束需要提交个finish请求
  const startChunks = () => {
    let tmp = 0;
    let size;
    while (tmp < blob.size) {
      size = Math.min(chunkSize, blob.size - tmp);
      curChunkSize.push(size);
      chunkBlob.push(blob.slice(tmp, tmp + size));
      tmp += size;
    }
    uploadNextChunk(0, curChunkSize[0], chunkBlob[0]);
  };

  const uploadNextChunk = (chunk, curchunksize, chunkblob) => {
    let formData = new FormData();
    formData.append('size', curchunksize);
    let url;
    if (chunk === 0) {
      formData.append('dir', dir);
      formData.append('name', fileName);
      url = blockInit;
    } else {
      formData.append('id', id);
      formData.append('uploadId', uploadId);
      formData.append('partNumber', chunk + 1); // chunk从0开始,partNumber从1开始
      url = blockUpload;
    }
    formData.append('content', chunkblob, blob.name);

    ajax(url, formData, function(e) {
      let status = e.status;
      let message = e.statusText || '';
      if (status === 200 && message === 'OK') {
        let result = JSON.parse(e.responseText);
        tags[chunk] = result.eTag;
        offset += curchunksize;

        let percent = Math.ceil((offset / file.size) * 100);
        // 改变显示的中间状态
        callback(percent);

        if (chunk === 0) {
          id = result.id;
          uploadId = result.uploadId;
          for (let i = 1; i < chunkBlob.length; i++) {
            uploadNextChunk(i, curChunkSize[i], chunkBlob[i]);
          }
        }
        //  Check if file is uploaded
        if (offset >= blob.size) {
          blob = null;
          chunkblob = formData = null; //  Free memory
          finishChunks();
        }
      } else {
        handleError(JSON.parse(e.responseText), 0, chunk, status);
      }
    });
  };

  const finishChunks = () => {
    let parts = [];
    for (let i = 0; i < tags.length; i++) {
      parts[i] = {
        partNumber: i + 1,
        eTag: tags[i],
      };
    }
    parts = btoa(JSON.stringify(parts));
    let formData = new FormData();
    formData.append('id', id);
    formData.append('uploadId', uploadId);
    formData.append('parts', parts);

    ajax(blockComplete, formData, function(e) {
      let status = e.status;
      let message = e.statusText || '';
      if (status === 200 && message === 'OK') {
        // eslint-disable-next-line
        callback(100, JSON.parse(e.responseText));
      } else {
        handleError(JSON.parse(e.responseText), 1, '', status); // 分片上传已经完成就不能重试了
      }
    });
  };

  const uploadSingle = () => {
    let formData = new FormData();
    formData.append('dir', dir);
    formData.append('name', fileName);
    formData.append('size', file.size);
    formData.append('content', file);
    let url = uploadUrl;

    ajax(url, formData, e => {
      let status = e.status;
      let message = e.statusText || '';
      if (status === 200 && message === 'OK') {
        // eslint-disable-next-line
        callback(100, JSON.parse(e.responseText));
      } else {
        handleError(JSON.parse(e.responseText), '', '', status);
      }
    });
  };

  const ajax = (url, data, complete) => {
    let request = new XMLHttpRequest();
    let query = 'Authorization=' + token + '&UserAgent=ALIMEDIASDK_WORKSTATION';
    if (url.indexOf('?') > -1) {
      url += '&' + query;
    } else {
      url += '?' + query;
    }
    request.open('POST', url);

    request.onload = function(e) {
      complete(request);
    };
    request.send(data);
  };

  if (!file || !token) {
    // eslint-disable-next-line
    callback(-1, '上传文件参数必须配置file以及token');
    return;
  }

  if (maxSize && file.size > maxSize) {
    // eslint-disable-next-line
    callback(-1, '文件大小不能超过' + maxSize);
    return;
  }

  if (file.size > chunkSize) {
    // 分块上传
    startChunks();
  } else {
    // 普通上传
    uploadSingle();
  }
};
/**
 * upload img
 * @param {Object} upData use data type
 * @param {Function} callback
 */
const uploadImg = async (type, file, callback) => {
  try {
    let [{ token }, { dir, name }] = await Promise.all([
      myAjax('user/wantu'),
      myAjax('user/wantu-upload-name', 'get', { type }),
    ]);
    name = name + '_' + file.name;
    uploadJSSDK({ file, token, dir, name, callback });
  } catch (error) {
    console.error(error);
  }
};
export default uploadImg;
