/**
 * Created by same on 2017/04/11.
 * File description:本地数据存储配置
 */
'use strict'

import {AsyncStorage} from "react-native";
import Storage from "react-native-storage";

var storage = new Storage({
    //最大容量：数据条数
    size: 10000,

    //存储引擎，RN使用AsyncStorage
    storageBackend: AsyncStorage,

    //数据过期时间，单位毫秒,null表示永不过期
    defaultExpires: null,

    //读写时在内存中缓存数据。默认启用
    enableCache: true,
});

global.storage = storage;
