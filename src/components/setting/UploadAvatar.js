/**
 * Created by zhaolong on 2017/03/30.
 * File description:个人中心-个人设置-上传头像
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
    BackAndroid,
    TouchableWithoutFeedback
} from 'react-native';

import {global_width,global_height} from '../../util/screen'

export default class UploadAvatar extends Component{

    render(){
        return(
            <View style={styles.containter}>
                <View style={styles.photo}>
                  <View style={styles.photograph}>
                    <Text style={styles.text} onPress={()=>this.props.callbackParent('photograph')}>拍照</Text>
                  </View>
                  <View style={styles.choicePhone}>
                    <Text style={styles.text2} onPress={()=>this.props.callbackParent('choicephone')}>从相册中选择</Text>
                  </View>
                </View>
                <View style={styles.cancel}>
                    <Text style={styles.cancelText} onPress={()=>this.props.callbackParent('cancel')}>取消</Text>
                </View>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    containter:{
        width:global_width,
        height:160,
        backgroundColor:"#707070",
        position:'absolute',
        bottom:40,
    },
    photo:{
        backgroundColor:'#F7F7F7',
        marginLeft:10,
        marginRight:10,
        height:84,
        borderRadius:7
    },
    photograph:{
        width:global_width-20,
        height:35,
        marginTop:7,
        borderBottomWidth:1,
        borderColor:'#ECECEC',
    },
    text:{
      height:34,
      textAlign:'center',
      lineHeight:27,
      color:'#333333',
      fontSize:16,
    },
    text2:{
      height:34,
      textAlign:'center',
      lineHeight:34,
      color:'#333333',
      fontSize:16,
    },
    choicePhone:{
        width:global_width-20,
        height:35,
        // marginTop:8
    },
    cancel:{
        marginTop:15,
        backgroundColor:'#F7F7F7',
        marginLeft:10,
        marginRight:10,
        height:40,
        borderRadius:7,
    },
    cancelText:{
        width:global_width-20,
        height:26,
        textAlign:'center',
        color:'#1a81da',
        fontSize:16,
        marginTop:7,
        lineHeight:26,
    },
})
