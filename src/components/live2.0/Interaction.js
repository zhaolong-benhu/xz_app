/**
 * Created by zhaolong on 2017/10/19.
 * File description:直播互动
 */

'use strict'

import React,{Component} from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    ToastAndroid,
}from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import {Actions} from "react-native-router-flux";
import {global_width, platform} from "../../util";
import {onSendMsg} from "../../components/common/base";
import {glo_url} from "../../api/global";
import {Badge} from "react-native-elements";
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {post} from "../../helpers/helpers";
import { Alert } from '../../components'

export default class Interaction extends Component {
    constructor(props) {
        super(props);
        this.list=[]
        this.state={
          open:false,
          expression:require('../../static/images/live/expression.png'),
        }
        this.renderEmotions();
    }
    componentWillReceiveProps(){
      if(this.props.isFull){
        this.refs.textInput.blur();
      }
    }
    _onSendMsg = () => {
      //弹幕不能立即清空输入内容,付款发送后清空
      const {loginInfo, avChatRoomId} = this.props.liveChatRoom
      const text = this.props.text
      if(loginInfo.userSig === null) {
        return
      }
      if(text.length <1 ) {
        Alert("发送的消息不能为空!");
        return;
      }
       if (this.props.ifNotAuthedToLogin()) {
           onSendMsg(this.props.text, 0, loginInfo, avChatRoomId);
           this.props.clearInput()
           this.setState({open:false})
       }
      // 弹幕功能设置
      // if (this.props.emitPayText) {
      //   if (this.props.livePay.textPayNums > 0) {
      //     this.props.getBarragesOrder(this.props.id)
      //     this.props.toggleCheckoutModal('barrage')
      //   } else {
      //     onSendMsg(JSON.stringify({"barrageTxt":text}), 1, loginInfo, avChatRoomId);
      //     this.props.clearInput()
      //   }
      //
      // } else {
      //   onSendMsg(this.props.text, 0, loginInfo, avChatRoomId);
      //   this.props.clearInput()
      // }
    }

    renderEmotions = () => {
      const emotions = this.props.emotions;
      for(var index in emotions){
          this.list.push(index)
      }
    }

    _onAction = (action) => {
      this.state.open ? this.setState({open:false}) :null
      action =='focus' ? this.props.onFocus() : this.props.onBlur()
    }
    render(){
        var list=[];
        return(
            <View>
            { this.props.type === "Landscape" ?
              <View style={[styles.containter,{backgroundColor: 'rgba(0,0,0,0.4)'}]}>
                   <View style={styles.first}>
                     <TouchableOpacity onPress={ () => {
                             this.props.refreshVideo()
                           } }
                       >
                        <Ionicons name="ios-refresh-outline" size={35} color="#FFFFFF"/>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>this.setState({open:!this.state.open})}>
                        {/* <FontAwesome name="smile-o" size={30} color="#FFD200"/> */}
                        <Image source={this.state.expression} style={styles.expression}/>
                     </TouchableOpacity>
                   </View>
                   <View style={[styles.chat,{flex:12}]}>
                       <TextInput
                         autoCapitalize="none"
                         value={this.props.text}
                         onSubmitEditing={this._onSendMsg}
                         onChangeText={this.props.onChangeText}
                         onFocus={()=>this._onAction('focus')}
                         onBlur={()=>this._onAction('blur')}
                         blurOnSubmit={false}
                         placeholderTextColor={"#999"}
                         placeholder={"快来跟主播互动吧~"}
                         textAlign='left'
                         maxLength={34}
                         returnKeyType={'send'}
                         returnKeyLabel={'send'}
                         autoCorrect={false}
                         ref="textInput"
                         underlineColorAndroid={'transparent'}
                         style={styles.chatInput}
                       />
                      <TouchableOpacity onPress={this._onSendMsg}>
                        <Ionicons name="ios-send-outline" size={30} color="#000000"/>
                      </TouchableOpacity>
                   </View>
                   <View style={styles.tools}>
                     <TouchableOpacity
                           onPress={ () => {
                            this.props.togglePayText()
                           } }
                       >
                       {
                           this.props.emitPayText ?
                           <Image source={require('../../static/images/live/barrage.png')}/>
                           :
                           <Image source={require('../../static/images/live/unbarrage.png')}/>
                        }
                     </TouchableOpacity>
                     <TouchableOpacity
                         onPress={() => {
                           if (this.props.ifNotAuthedToLogin()) {
                             this.refs.textInput.blur()
                             this.props.togglePayModal() && this.props.randomPay()
                           }
                         }}>
                       <Image source={require('../../static/images/live/redpackage.png')}/>
                     </TouchableOpacity>
                   </View>
              </View>
              :
              <View style={[styles.containter,{borderTopWidth:1,borderColor:'#EEEEEE'}]}>
                    <TouchableOpacity onPress={()=>this.setState({open:!this.state.open})}>
                      {/* <FontAwesome name="smile-o" size={30} color="#FFD200"/>*/}
                      <Image source={this.state.expression} />
                    </TouchableOpacity>
                    <View style={[styles.chat,platform === 'android' ? {flex:12} : {width:global_width*0.75}]}>
                        {this.props.user && this.props.user.user_ticket != "" ?
                            null:
                            <TouchableOpacity onPress={()=>this.props.ifNotAuthedToLogin()}>
                                <View style={{borderColor:'#ECECEC',borderRightWidth:1,height:38,justifyContent:'center',marginRight:3}}>
                                    <Text style={styles.logText}>登录</Text>
                                </View>
                            </TouchableOpacity>
                        }
                        <TextInput
                          autoCapitalize="none"
                          value={this.props.text}
                          onSubmitEditing={this._onSendMsg}
                          onChangeText={this.props.onChangeText}
                          onFocus={()=>this.setState({open:false})}
                          onBlur={()=>this.setState({open:false})}
                          blurOnSubmit={false}
                          placeholderTextColor={"#999"}
                          placeholder={"快来跟主播互动吧~"}
                          textAlign='left'
                          maxLength={34}
                          returnKeyType={'send'}
                          returnKeyLabel={'send'}
                          autoCorrect={false}
                          ref="textInput"
                          underlineColorAndroid={'transparent'}
                          style={styles.chatInput}
                        />
                       <TouchableOpacity  onPress={this._onSendMsg}>
                         <Ionicons name="ios-send-outline" size={30} color="#000000"/>
                       </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                          if (this.props.ifNotAuthedToLogin()) {
                            this.refs.textInput.blur()
                            this.props.togglePayModal() && this.props.randomPay()
                          }
                        }}>
                      <Image source={require('../../static/images/live/redpackage.png')}/>
                    </TouchableOpacity>
              </View>
            }
            {this.state.open ?
              <View style={[styles.smile,this.props.type === "Landscape" ? {flex:1} : {width:global_width,backgroundColor:'#FFFFFF'}]}>
              {
                this.list.map((v,i)=>{
                  return <TouchableOpacity key={'smile'+i} onPress={()=>{this.props.onChangeText(this.props.text+this.props.emotions[i][0])}} style={{height:35}}><Image source={{uri: this.props.emotions[i][1]}} style={styles.face}/></TouchableOpacity>
                })
              }
              </View>
              :
              null
            }
            {platform == "ios" ?
             <KeyboardSpacer/>
             :
             null
            }
        </View>
        )
    }
}

const styles = StyleSheet.create({
    containter:{
        //flex:1,
        flexDirection:"row",
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal:10,
        height:50,
    },
    first:{
        flex:2,
        flexDirection:"row",
        justifyContent: 'space-between',
    },
    tools:{
        flex:2,
        flexDirection:"row",
        justifyContent: 'space-between',
    },
    expression:{
      marginTop:4,
    },
    chat:{
        height:38,
        backgroundColor:'#fff',
        borderRadius:19,
        flexDirection:"row",
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal:10,
        paddingHorizontal:10,
        borderColor:'#ECECEC',
        borderWidth:1
    },
    chatInput:{
        // paddingLeft:2,
        marginRight:2,
        flex:3,
        height:40,
    },
    smile:{
      flexDirection:'row',
      flexWrap:'wrap',
      paddingHorizontal:10,
      backgroundColor:'#EEEEEE',
      paddingTop:5,
      paddingBottom:5,
    },
    face:{
      width:25,
      height:25,
      margin:5
    },
    logText:{
      color:'#00A6EA',
      paddingHorizontal:5,
      fontSize:16,
    }
})
