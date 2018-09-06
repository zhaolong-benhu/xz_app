/**
 * Created by same on 2017/04/20.
 * File description:加载动画
 */

'use strict'
import React ,{
    Component
} from "react";

import {
    View,
    Text,
    StyleSheet,
    Image,
    ActivityIndicator
} from 'react-native';
import {global_width, global_height} from '../../util'
export default class Loading extends Component{
    render(){
        return(
          <View style={styles.wrapper}>
              <View style={styles.loading}>
                    <ActivityIndicator/>
                    <Text style={ styles.loadingText }>Loading</Text>
              </View>
          </View>
        )
    }
}

var styles = StyleSheet.create({
  wrapper: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width:global_width,
    height:global_height,
    position:'absolute',
    left:0,
    top:0,
    zIndex: 100000,
  },
  loading: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    width:90,
    height:70,
    borderRadius:3,
    paddingTop:20,
    flex:0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 14,
    marginBottom: 20,
    color:'#fff'
  },
})
