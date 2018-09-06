/**
 * Created by zhaolong on 2017/10/18.
 * File description:直播信息
 */

'use strict'

import React,{Component} from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    ToastAndroid,
}from 'react-native';
import {connect} from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {global_height, global_width, platform} from "../../util";
import {Alert} from '../../components';
import {Actions} from 'react-native-router-flux';


export default class AnchorInformation extends Component {
    static defaultProps = {
        type:1,
    }
    constructor(props) {
        super(props);
        this.state = {
            hoticon:require('../../static/images/live/hot.png'),
            peopleicon:require('../../static/images/live/people2.png'),
            defaultAnchor:require('../../static/images/live/anchor.png'),
            followbg:require('../../static/images/live/followbg.png'),
            followedbg:require('../../static/images/live/followedbg.png'),
            bAddfollow:true,
        };
    }

    componentWillMount() {
    }
    componentDidMount(){
    }
    componentWillReceiveProps(nextProps){
    }

    alert = () => {
      platform=='ios' ?
      Alert.alert(
          '提示',
          '请先登录',
          [
            {text: '取消',},
            {
              text: '登录', onPress: () => {
                this.state.isFull ? this.onFullScreen() : null
                Actions.LoginScreen({liveId: this.props.id});
              }
            },
          ],
          {cancelable: false}
      )
      :
      Actions.LoginScreen();
    }

    render(){
        var data = this.props.data;
        return(
            <View>
            {data ?
                <View style={styles.teacherInfos}>
                    {data.pic && data.pic !="" ?
                        <Image source={{uri:data.pic}} style={styles.teacherHead}/>
                        :
                        <Image source={this.state.defaultAnchor} style={styles.teacherHead}/>
                    }
                    <View style={styles.infoDetail}>
                        <Text style={styles.teacherName}>{data.name}</Text>
                        {this.props.type == "1"?
                            <View style={styles.teacherVermicelli}>
                                <Image source={this.state.hoticon} style={styles.icon}/>
                                <Text style={platform === "android" ? styles.onlineNumber : styles.onlineNumberIos}>{this.props.view_num?this.props.view_num:"0"}</Text>
                                <Image source={this.state.peopleicon} style={styles.icon2}/>
                                <Text style={platform === "android" ? styles.onlineNumber : styles.onlineNumberIos}>{this.props.MemberNum?this.props.MemberNum:"0"}</Text>
                            </View>
                            :
                            <View style={styles.teacherVermicelli}>
                                <Text>视频播放量：{data.view_num}</Text>
                            </View>
                        }
                    </View>
                    {this.props.is_favorite && this.props.is_favorite == 1 ?
                        <TouchableOpacity style={styles.addFollow} onPress={()=>this.props.addFollow()}>
                            <Image source={this.state.followedbg} style={styles.followbg}/>
                            {/* <Text style={platform === "ios" ? styles.addFollowedText_ios:styles.addFollowedText}>已关注</Text> */}
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.addFollow} onPress={()=>this.props.addFollow()}>
                            <Image source={this.state.followbg} style={styles.followbg}/>
                            {/* <Text style={platform === "ios" ? styles.addFollowText_ios:styles.addFollowText}>+关注</Text> */}
                        </TouchableOpacity>
                    }

                </View>
                :
                null
            }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    teacherHead:{
        width:50,
        height:50,
        borderRadius:25,
    },
    teacherInfos:{
        flexDirection:"row",
        alignItems:'center',
        justifyContent:'space-between',
        height:80,
        paddingLeft:10,
        borderBottomWidth:1,
        borderBottomColor:'#e0e0e0',
    },
    infoDetail:{
        height:50,
        marginLeft:10,
        flexGrow:1,
    },
    teacherName:{
        color:'#000000',
        height:25,
    },
    teacherVermicelli:{
        flexDirection:"row",
        height:25
    },
    onlineNumber:{
        color:'#737373',
        marginLeft:3,
    },
    onlineNumberIos:{
      color:'#000000',
      marginLeft:3,
      marginTop:3,
    },
    addFollow:{
        width:57,
    	  height: 31,
        alignItems:'center',
        justifyContent:'center',
        marginLeft:20,
        marginRight:10,
        paddingHorizontal:6,
    },
    followbg:{
        width:57,
        height:31
    },
    addFollowText:{
        color:'#fff',
        textAlign:'center',
        marginTop:-27,
        fontSize:12,
        backgroundColor:'#00a6ea',
    },
    addFollowText_ios:{
        color:'#fff',
        textAlign:'center',
        marginTop:-24,
        fontSize:12,
        backgroundColor:'#00a6ea',
    },
    addFollowedText:{
        marginTop:-27,
        color:'#ECECEC',
        textAlign:'center',
        fontSize:12,
        backgroundColor:'#fff',
    },
    addFollowedText_ios:{
        marginTop:-24,
        color:'#ECECEC',
        textAlign:'center',
        fontSize:12,
        backgroundColor:'#fff',
    },
    icon:{
        marginTop:3
    },
    icon2:{
        marginTop:5,
        marginLeft:10,
    },
})
