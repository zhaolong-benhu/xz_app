/**
 * Created by same on 21/04/2017.
 * File description:
 */
import React from 'react';
import {
	View,
	Image,
    AlertIOS,
    ToastAndroid,
    Platform
} from 'react-native';
/**
 * 系统提示
 * 返回一个字符串
 * @param msg 提示信息
 */
export default (msg) => {
  return Platform.OS == 'android' ? ToastAndroid.show(msg,ToastAndroid.SHORT) : AlertIOS.alert(msg);
}
