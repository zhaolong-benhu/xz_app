/**
 * Created by same on 2017/04/11.
 * File description:本地数据存储
 */
'use strict'

import stotege from './storage';
import {StorageError} from './error';

//保存数据
export function save(key,value,expires=1000 * 600){
  return storage.save({
    	key: key,
    	rawData:value,
    	expires: expires
    }).then((ret) => {
        console.log(`save ${key} success!`);
    }).catch(error => {
        console.log(`save ${key} error:${error}`);
    });
}
//读取数据
export function get(key){
  console.log('***********'+JSON.stringify(key));
    return storage.load({
        key: key
    }).then(ret => { // 如果找到数据，则在then方法中返回
        console.log(`load ${key} success:${JSON.stringify(ret)}`);
        return ret;
    }).catch(error => { //如果没有找到数据且没有sync方法，
        console.log(`load ${key} error:${JSON.stringify(error)}`);
        return null
    });
};
//保存数据
export function doSave(key, id, value, expires = 5*1000){
    return storage.save({
        key: key, //注意:请不要在key中使用_下划线符号!
        id: id,   //注意:请不要在id中使用_下划线符号!
        rawData: value,
        expires: expires //如果设为null，则永不过期
    }).then((ret) => {
        console.log(`save ${key} success!`);
    }).catch(error => {
        console.log(`save ${key} error:${error}`);
    });
};
//读取数据
export function doLoad(key,id){
    return storage.load({
        key: key,
        id: id
    }).then(ret => { // 如果找到数据，则在then方法中返回
        console.log(`load ${key}-${id} success:${ret}`);
        return ret;
    }).catch(error => { //如果没有找到数据且没有sync方法，
        console.log(`load ${key}-${id} error:${error}`);
        return new StorageError(error);
    });
};
//获取某个key下的所有数据
export function getAllDataForKey(key) {
  return storage.getAllDataForKey(key).then(ret=> {
      console.log(`get ${key} success:${ret}`);
      return ret;
  }).catch(error => { //如果没有找到数据且没有sync方法，
      console.log(`get ${key} error:${error}`);
      return new StorageError(error);
  });
};
//获取某个key下的所有id
export function getIdsForKey(key) {
  return storage.getIdsForKey(key).then(ids => {
      console.log(`get ${key} success:${ids}`);
      return ids;
  }).catch(error => {
      console.log(`get ${key} error:${error}`);
      return new StorageError(error);
  })
};
// 使用和load方法一样的参数读取批量数据，但是参数是以数组的方式提供。
// 会在需要时分别调用相应的sync方法，最后统一返回一个有序数组。
export function getBatchData(keys){
  return storage.getBatchData(keys)
  .then(results => {
    results.forEach( result => {
      console.log(`get ${key} success:${result}`);
      return result;
    })
  })
};
//根据key和一个id数组来读取批量数据
export function getBatchDataWithIds(key,ids){
  return storage.getBatchDataWithIds({
    key: key,
    ids: ids
  })
  .then(results => {
    results.forEach( result => {
      console.log(`get ${key}-${ids} success:${result}`);
    })
    return results;
  })
  .then(error=>{
    console.log(`get ${key}-${id} error:${error}`);
    return new StorageError(error);
  })
};
//清除某个key下的所有数据
export function clearMapForKey(key){
  return storage.clearMapForKey(key).then((ret) => {
      console.log(`clear ${key} success!`);
  }).catch(error => {
      console.log(`clear ${key} error:${error}`);
  })
};
//删除单个数据
export function doRemove(key){
  storage.remove({
  	key: key
  })
};
//清空map，移除所有"key-id"数据（但会保留只有key的数据）
export function clearMap(){
  storage.clearMap();
};
