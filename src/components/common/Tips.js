/**
 * Created by zhaolong on 2017/10/25.
 * File description:内容为空提示组件
 */

'use strict'

import React,{Component} from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
}from 'react-native';
import {global_width, global_height,platform} from '../../util';

export default class Tips extends React.Component {
    state={
        icon:require('../../static/images/live/cry.png'),
    };

    static defaultProps={

    };
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.tips}>
                    <Image source={this.state.icon} style={styles.icon}/>
                    <Text style={styles.text}>{this.props.text}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
},
tips:{
    flexDirection:'row',
},
icon:{
    marginRight:10
},
text:{
    lineHeight:23
}
});
