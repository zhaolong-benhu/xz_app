/**
 * Created by same on 2017/03/30.
 * File description:个人中心-个人设置-修改密码
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
import { connect } from 'react-redux';
import {resetPassWord} from '../../actions';
import {Alert} from '../../components';


class UpdatePassWord extends Component{
    constructor(props) {
      super(props)
      this.state = {
        password: '',
        newpassword: '',
        confirmpassword:'',
      }
    }
    componentWillReceiveProps(nextProps) {
      if (this.props.user !== nextProps.user) {
        if (nextProps.user == null) {
          Alert('修改成功,请重新登录');
          Actions.LoginScreen();
        }
      }
    }
    pressPassBtn(){
        const {newpassword,password,confirmpassword} = this.state;
        if(!password){
          Alert('请输入原密码');
       }
       else if(!newpassword){
          Alert('请输入新密码');
       }
       else if(!/^[A-z0-9]{6,20}$/.test(newpassword)){
         Alert('请输入密码包含6-20位的字母或数字组成');
       }
       else if(!confirmpassword){
         Alert('请输入确认密码');
       }
       else if(newpassword != confirmpassword){
           Alert('两次密码不一致');
       }else{
         this.props.resetPassWord(password,newpassword);
       }
    }
    render(){
        return(
            <View style={styles.containter}>
                <TextInput style={styles.searchBox}  blurOnSubmit={true} returnKeyType ='done' underlineColorAndroid = {'transparent'}
                 onChangeText={(password) => this.setState({password})}
                 value={this.state.password}
                 clearButtonMode="always"
                 secureTextEntry={true}
                 placeholder="请输入原密码"
                 />
               <TextInput style={styles.searchBox}  blurOnSubmit={true} returnKeyType ='done' underlineColorAndroid = {'transparent'}
                onChangeText={(newpassword) => this.setState({newpassword})}
                value={this.state.newpassword}
                clearButtonMode="always"
                secureTextEntry={true}
                placeholder="请输入新密码，6-20位数字和字母组成"
                />
                <TextInput style={styles.searchBox}  blurOnSubmit={true} returnKeyType ='done' underlineColorAndroid = {'transparent'}
                 onChangeText={(confirmpassword) => this.setState({confirmpassword})}
                 value={this.state.confirmpassword}
                 clearButtonMode="always"
                 secureTextEntry={true}
                 placeholder="确定新密码"
                 />
                <TouchableOpacity style={styles.save} onPress={()=> this.pressPassBtn()}>
                  <Text style={styles.saveText}>保存</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = ({user,common}) => {
	return {
		user:user.userInfo,
		loading:common.loading,
	}
}

export default connect(mapStateToProps, {resetPassWord})(UpdatePassWord);

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
