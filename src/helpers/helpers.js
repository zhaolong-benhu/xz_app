/**
 * Created by Same on 17/02/28.
 */
import {
  Platform
} from 'react-native';
import * as storage from './cache'
import {errMsg} from './error';
import {Actions} from 'react-native-router-flux';
import * as api from '../api/global'
import {LOADING_START, LOADING_END} from '../actions/types';
import {Alert} from '../components';

// const baseUrl = Platform.OS == 'android' ? 'http://api.9first.com/' : 'http://api.9first.com/';
const baseUrl = 'https://api.9first.com/';


const showLog = __DEV__;

/**
 * @param key
 * @param fetchFunc
 * @param cached 是否从缓存中取
 */
const apiCache = (key, fetchFunc, cached = true) => {
  key = key.replace(/_/g, "");
  //storage.doRemove(key);
  if (!cached) {
    //不缓存
    // console.log(`cached = false. get api data from network ————  key = ${key}`);
    return fetchFunc();
  }
  return storage.get(key).then(value => {
    if (value) {
      console.log(`get api data from storage ————  value = ${value}`);
      return value;
    } else {
      return fetchFunc().then(value => {
        // console.log(`get api data from network ————  key = ${key}`);
        storage.save(key, value);//存储
        return value;
      });
    }
  });
};

/**
 * @param url 完整路径
 */
const getFetch = (url, cached) => {
  const fetchFunc = () => {
    return fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json'
        //'Host':'sso.9first.com'
      }
    }).then(convertRespToJson)
  };
  return apiCache(url, fetchFunc, cached).then(defaultAnalyse).catch(errorAnalyse);
};

/**
 * @param url 完整路径
 */
const postFetch = url => jsonData => {
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json'
    },
    body: jsonData
  }).then(convertRespToJson).then(defaultAnalyse).catch(errorAnalyse);
};

//拼接参数
const getParam = data => {
  return Object.entries(data).map(([key, value]) => {
    return `${key}=${value}`
  }).join('&');
};

/**
 * @param cached 是否优先本地缓存
 * @param path 相对路径
 */
const get = cached => (path, data) => {
  let url = path.indexOf('http://') == 0 ? path : baseUrl + path;
  if (data) {
    url += `?${getParam(data)}`;
  }
  return loggerWrap(`GET  ${url}`)(() => {
    return getFetch(url, cached);
  });
};
/**
 * 日志打印
 * @param requestInfo
 */
const loggerWrap = requestInfo => fetchFunc => {
  if (showLog) { //开发环境打印日志
    let startTime = new Date().getTime();//开始请求时间
    return fetchFunc().then(result => {
      console.log(`${requestInfo}  success  result = ${JSON.stringify(result)} cost time = ${new Date().getTime() - startTime}ms`);
      if (requestInfo == 'userAuth' && result) {
        console.log(`userAuth ————  save key = user ok`);
        storage.save("user", result, null);//用户信息缓存
      }
      if (requestInfo == 'logout' && result) {
        console.log(`logout ————  clear key = user ok`);
        storage.doRemove("user"); //清除用户缓存
      }
      if (requestInfo == 'updateUser' && result) {
        console.log(`update User thumb  ————  update key = user ok`);
        storage.get('user').then(value => {
          if (value) {
            value.thumb = result.pic;
            storage.save("user", value, null);//用户信息缓存
          }
        })
      }
      return result;
    }).catch(err => {
      console.log(`${requestInfo}  ${err}`);
      //return Promise.reject(err);
    });
  } else { //正式环境
    if (requestInfo == 'userAuth' || requestInfo == 'logout' || requestInfo == 'updateUser') {
      return fetchFunc().then(result => {
        if (result) {
          switch (requestInfo) {
            case 'userAuth':
              storage.save("user", result, null);//用户信息缓存
              break;
            case 'updateUser':
              storage.get('user').then(value => {
                if (value) {
                  value.thumb = result.pic;
                  storage.save("user", value, null);//用户信息缓存
                }
              })
              break;
            case 'logout':
              storage.doRemove("user"); //清除用户缓存
              break;
            default:
              break;
          }
        }
        return result;
      })
    }
  }
  return fetchFunc();
};

const convertRespToJson = response => {
  return response.json();
};

const defaultAnalyse = response => {
  if (response.flag == 0) {
    return response;
  } else if (response.status == 0) {
    //未登录
    if (response.errCode == 2002) {
      return storage.get('user').then(value => {
        if (value) {
          Alert('此账号已在其他地方登录')
          Actions.Home({action: 'logout'})
        }
      })
    } else if (response.errCode == -1) {
      Alert(response.errMsg)
      return response.errCode
    } else {
      Alert(errMsg[response.errCode])
    }
  } else if (response.status == 1) {
    return response.data;
  } else {
    Alert(errMsg[response.flag]);
    return response;
  }
};

const errorAnalyse = error => {
  let msg = '请检测你的网络是否连接'
  switch (error.message) {
    case 'Network request failed':
      msg = '网络请求失败';
      break;
    default:
      break;
  }
  Alert(msg);
};

/**
 * post请求
 * @param path 相对路径
 * @param data 参数
 */
export const post = (path, data) => {
  let url = path.indexOf('http://') == 0 ? path : baseUrl + path;
  console.log('***********'+path);
  return storage.get('user').then(value => {
    console.log('***********'+JSON.stringify(value));
    //不传data参数
    let val = data || {};
    if (value) {
      val.user_ticket = value.user_ticket;
    }
    var jsonData = JSON.stringify(val);
    return loggerWrap(api.api_updateavatar==path ? `updateUser` : `POST  ${url}  ${jsonData}`)(() => {
      return postFetch(url)(jsonData);
    });
  })
};

/**
 * 用户授权
 * @param path 相对路径
 * @param data 参数
 */
export const userAuth = (path, data) => {
  var jsonData = JSON.stringify(data);
  var url = baseUrl + path;
  return loggerWrap(`userAuth`)(() => {
    return postFetch(url)(jsonData);
  });
};
/**
 * 用户注册
 * @param data 参数
 * @param path 相对路径
 */
export const register = (path, data) => {
  let url = path.indexOf('http://') == 0 ? path : baseUrl + path;
  if (data) {
    url += `?${getParam(data)}`;
  }
  return loggerWrap(`userAuth`)(() => {
    return getFetch(url, false);
  });
};
/**
 * 用户注销
 * @param path 相对路径
 * @param data 参数
 */
export const userLogout = (path, data) => {
  var jsonData = JSON.stringify(data);
  var url = baseUrl + path;
  return loggerWrap(`logout`)(() => {
    return postFetch(url)(jsonData);
  });
};

/**
 * 获取用户信息
 * @param path 相对路径
 * @param data 参数
 */
export const getUserInfo = () => {
  return storage.get('user').then(value => {
    console.log('***********'+JSON.stringify(value));
    if (value) {
      return value;
    } else {
      return null;//{status:0,errCode:2002,errMsg:"未登陆!"};
    }
  })
};

export const getFetchFromCache = get(true);//缓存
export const getFetchNeverCached = get(false);//不缓存
