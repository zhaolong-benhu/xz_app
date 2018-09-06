/**
 * Created by same on 2017/04/11.
 * File description:错误类型
 */
'use strict'

export class ApiHttpError {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }

  toString() {
    return `${this.code} ${this.message}`;
  }
}

export class ApiResultError {
  constructor(code, message, data) {
    this.code = code;
    this.message = message;
    this.data = data;
  }

  toString() {
    return `${this.code} ${this.message}`;
  }
}

export class StorageError {
  constructor(err) {
    this.message = err.message;
    switch(err.name) {
  	    case 'NotFoundError'://不缓存
  	        this.code='1';
  	        break;
        case 'ExpiredError'://过期缓存
            this.code='2';
            break;
        default:
            this.code='0'
            break;
  	}
  }
  toString() {
    return `${this.code} ${this.message}`;
  }
}

export const errMsg = {
  1011:'用户名不存在',
  1030:'密码为空',
  1033:'密码不正确',
  1091:'您注册的太频繁了，请稍后再注册',
  1092:'您的ip禁止访问',
  5000:'短信发送失败',
  5001:'手机验证码无效',
  5002:'手机验证码错误',
  5010:'手机号码已注册',
  5011:'手机号码不存在',
  5012:'手机号码已注册',
  5101:'图片验证码错误',
	8001:'登录超时，请重新登录',
}
