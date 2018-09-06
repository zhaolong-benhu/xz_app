/**
 * Created by zhaolong on 2017/10/19.
 * File description:RN模版文件
 */

'use strict'

import React,{Component} from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
}from 'react-native';


export default class ReactNativeTemplate extends React.Component {
    state={

    };

    static defaultProps={

    };
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <View style={styles.container}>
                <Text>ReactNativeTemplate</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
