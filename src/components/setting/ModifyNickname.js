/**
 * Created by zhaolong on 2017/03/30.
 * File description:个人中心-个人设置-修改昵称
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
    ToastAndroid,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback
} from 'react-native';

import {global_width,global_height} from '../../util/screen'
import {Scene, Router,Actions} from 'react-native-router-flux';
import {Alert} from '../../components';


export default class ModifyNickname extends Component{
    state={
        nickName:this.props.nickName,
    }
    constructor(props){
        super(props);
    }
    compentDidmount(){

    }
    SaveNickname(){
        if(this.state.nickName.length == 0){
            Alert("昵称不能为空！");
        }else{
            // if(this.state.nickName.length>6){
            //     Alert('昵称长度太长');
            // }else {
                this.props.callbackParent("save",this.state.nickName);
            //   Actions.Setting({new_name:this.state.nickName,user_name:this.state.nickName});
            // }
        }
    }
    render(){
        var str = '<';
        return(
            <View style={styles.containter}>
                <TextInput style={styles.searchBox} value={this.state.nickName} multiline={true} blurOnSubmit={true} maxLength={11} placeholder="请输入昵称" returnKeyType ='done' underlineColorAndroid = {'transparent'}  onChangeText={(nickName) => {this.setState({nickName})}}/>
                <TouchableOpacity style={styles.save} onPress={this.SaveNickname.bind(this)}>
                  <Text style={styles.saveText}>保存</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    containter:{
        backgroundColor:'#EEEEEE',
        width:global_width,
        height:global_height,
        position:'absolute',
        top:40,
    },
    head:{
        flexDirection:"row",
        backgroundColor:'#FFFFFF'
    },
    back:{
        paddingLeft:10,
        fontSize:20
    },
    title:{
        fontSize:18,
        color:'#333333',
        marginLeft:global_width/2-50,
        height:30
    },
    userHead:{
        position:'absolute',
        right:30,
        width:30,
        height:30,
    },
    searchBox:{
        borderWidth:1,
        borderColor:'#FFFFFF',
        borderRadius:5,
        backgroundColor:'#FFFFFF',
        marginTop:20,
        marginLeft:10,
        marginRight:10,
        height:45,
        lineHeight:45,
        paddingTop:10,
        fontSize:15,
        paddingLeft:10,
    },
    save:{
        backgroundColor:'#157EDA',
        borderRadius:7,
        height:45,
        width:global_width-20,
        marginLeft:10,
        marginRight:10,
        marginTop:25,
    },
    saveText:{
        height:31,
        width:global_width-20,
        textAlign:'center',
        color:'white',
        marginTop:7,
        lineHeight:26,
        fontSize:16,
    }
})
