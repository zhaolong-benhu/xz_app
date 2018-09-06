/**
 * Created by zhaolong on 2017/03/20.
 * File description:首页-秒杀
 */
'use strict'

import React, {
  Component,
} from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid
} from 'react-native'
import {global_width,global_height} from '../../util/screen';
import {Scene, Router, Actions} from 'react-native-router-flux';
import {glo_url} from '../../api/global';
import ResponsiveImage from 'react-native-responsive-image'

export default class Seckill extends Component{
    static defaultProps = {
        bg:require('../../static/images/home/fpBanner.jpg'),
    };
    render(){
        return(
            <TouchableOpacity style={styles.container} onPress={ ()=>Actions.XZWebView({title:'限时秒杀',url:glo_url+'/seckill/1'}) }>
              <View>
              <ResponsiveImage style={styles.bg} source={this.props.bg}/>
              </View>
            </TouchableOpacity>
        )
    }
}
var styles = StyleSheet.create({
    container:{
        height:60,
        backgroundColor:'#ECECEC'
    },
    bg:{
        width:global_width,
        height:50,
        marginTop:5
    }
})
