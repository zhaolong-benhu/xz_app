/**
 * Created by zhaolong on 2017/10/18.
 * File description:历史回看
 */

'use strict'

import React,{Component} from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
}from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {Icon} from 'native-base';
import ResponsiveImage from "react-native-responsive-image";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {global_width,global_height} from "../../util/screen";
import {Tips,Alert} from '../../components';
import {fetchVideodetailData,fetchCoursewareData,fetchLiveroomValid,fetchLiveroomValidforHistory} from '../../actions';

class HistoricalReview extends Component {
    state={
        lock:require('../../static/images/live/lock.png'),
        rmb:require('../../static/images/live/rmb.png'),
        defaultThumb:require('../../static/images/live/castCover.jpg')
    }
    constructor(props) {
        super(props);
        this.live_id = 0;
        this.user_id = 0;
    }
    componentWillReceiveProps(nextProps){
        if(this.props.liveRoomValidData !== nextProps.liveRoomValidData){
            if(nextProps.liveRoomValidData.is_valid === 1){//密码已经验证过/付款过-直接进入直播间
                //开始获取直播详情数据
                this.props.fetchVideodetailData(this.live_id);
                //开始获取课件数据
                this.props.fetchCoursewareData(this.live_id);
                Actions.VideoDetail({user_id:this.user_id,is_favorite:this.props.is_favorite});
            }else {
                Actions.PasswordRoom({id:nextProps.liveRoomValidData.id,user_id:this.user_id,liveType:nextProps.liveRoomValidData.type,from:"liveroom",to:'videodetail',is_favorite:this.props.is_favorite});//要进入验证界面
        }
      }
    }
    //点击历史回看视频列表
    touchList(live_id,xz_live_id,user_id,liveType,view_num,course_detail){
        this.live_id = live_id;
        this.user_id = user_id;
        if(0 == liveType){//免费
            //开始获取直播详情数据
            this.props.fetchVideodetailData(live_id);
            //开始获取课件数据
            this.props.fetchCoursewareData(live_id);
            //进入视频详情页
            Actions.VideoDetail({user_id:user_id,is_favorite:this.props.is_favorite});
        }else {//收费
            this.props.fetchLiveroomValid(live_id);
        }
    }
    render(){
        var historyreviewData = this.props.data;
        return(
            <View style={styles.container}>
                {historyreviewData && historyreviewData.historyList?
                    <ScrollView style={styles.lists}>
                            {historyreviewData.historyList.map((value,index)=>{
                             return <TouchableOpacity onPress={()=>this.touchList(value.live_id,value.xz_live_id,value.user_id,value.type,value.view_num,value.course_detail)} key={index} style={styles.content}>
                                    <View style={styles.head}>
                                        <View style={styles.point}></View>
                                        <View style={styles.date}>
                                            <Text>{value.start_time}</Text>
                                        </View>
                                        <View style={styles.viewNum}>
                                            <Icon style={{color:'#00A6EA',fontSize:20}} name="eye"/>
                                            <Text>{value.view_num}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.border}>
                                        <View style={styles.line}></View>
                                        {value.thumb && value.thumb != ""?
                                            <ResponsiveImage source={{uri:value.thumb}} style={styles.img} resizeMode={"cover"}/>:
                                            <ResponsiveImage source={this.state.defaultThumb} style={styles.img} resizeMode={"cover"}/>
                                        }
                                        <View style={styles.shade}>
                                            <Text style={styles.course_name}>《{value.course_name}》</Text>
                                            <Text style={styles.detail}>{value.course_detail.length>20?value.course_detail.substr(0,20)+'...':value.course_detail}</Text>
                                        </View>
                                        <View style={styles.label}>
                                        {value.type != 0 ?
                                            <Image source={value.type == 1?this.state.lock:this.state.rmb} style={styles.lock}/>
                                            :
                                            null
                                        }
                                        </View>
                                    </View>
                            </TouchableOpacity>
                        })}
                    </ScrollView>
                    :
                    <Tips text="很抱歉，该主播暂时还没有历史回看视频~"/>
                }
            </View>

        )
    }
}
const mapStateToProps = ({passwordRoom}) => {
  return {
    liveRoomValidData: passwordRoom.liveRoomValidData,
  }
}
export default connect(mapStateToProps, {
    fetchVideodetailData,
    fetchCoursewareData,
    fetchLiveroomValid,
    fetchLiveroomValidforHistory
})(HistoricalReview)

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingRight:5,
        paddingLeft:5,
    },
    lists:{
        marginTop:15,
    },
    content:{
        marginBottom:8,
    },
    head:{
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    date:{
        flexDirection:'row',
        flex:8,
    },
    point:{
        width:10,
        height:10,
        backgroundColor:'#00A6EA',
        borderRadius:5,
        marginRight:3,
        marginLeft:1
    },
    viewNum:{
        flexDirection:'row',
    },
    img:{
        width:global_width-30,
        height:(global_width-30)*0.5625,
        flex:8,
        marginTop:10,
    },
    border:{
        flex:1,
        flexDirection:'row',
        justifyContent: 'space-between',
        // height:200,
        paddingLeft:5,
    },
    line:{
        borderLeftWidth:2,
        borderLeftColor:'#00A6EA',
        width:5,
        marginRight:5
    },
    shade:{
       justifyContent:'center',
        width:global_width-25,
        height:40,
        backgroundColor:'rgba(0,0,0,0.4)',
        position:'absolute',
        bottom:0,
        left:15,
        // opacity:0.6
    },
    course_name:{
        color:'#fff',
        fontSize:12,
    },
    detail:{
      color:'#fff',
      fontSize:12,
      marginLeft:5,
      marginTop:2,
    },
    label:{
        width:30,
        height:30,
        position:'absolute',
        top:10,
        left:15,
    },
    lock:{
    },

})
