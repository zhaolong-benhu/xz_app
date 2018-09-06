/**
 * Created by zhaolong on 2017/03/21.
 * File description:首页-在线课程
 */
'use strict'

import React, {
  Component,
} from 'react';

import {
  View,
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableWithoutFeedback,
} from 'react-native'
import {Icon} from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { connect } from 'react-redux';
import {fetchOnlineCourseData} from '../../actions/OnlineCourse';
import {global_width,global_height} from '../../util/screen';
import {platform} from '../../util/platform';
import {Scene, Router, Actions} from 'react-native-router-flux';
import {glo_url} from '../../api/global';
import ResponsiveImage from 'react-native-responsive-image'
class OnlineCourse extends React.Component{

    constructor(props){
        super(props);
        this.props.fetchOnlineCourseData();
    }
    render(){
        const {onLineCourseData} = this.props;
        return(
            <View>
                 {onLineCourseData && onLineCourseData.classroom && onLineCourseData.course.length>=2 &&
                     <View style={styles.container}>
                         <View style={styles.head}>
                             <Text style={styles.text1}>{this.props.title}</Text>
                              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                             <Text style={styles.text2} onPress={()=>Actions.XZWebView({title:'在线课程',url:glo_url+'/kecheng'})}>更多{this.props.title}</Text>
                             <Icon style={{color: '#157eda', fontSize: 15}} name="ios-arrow-forward-outline"/>
                         </View>
                         </View>
                         <View style={{paddingHorizontal:10,paddingBottom:10,borderBottomColor:'#eee',borderBottomWidth:0.5}}>
                            <TouchableWithoutFeedback style={styles.img} onPress={()=>Actions.XZWebView({title:onLineCourseData.classroom[0].title,url:glo_url+'/kechengbao/'+onLineCourseData.classroom[0].id})}>
                                <View>
                                    <ResponsiveImage style={styles.pic} source={{uri:onLineCourseData.classroom[0].thumb}}/>
                                </View>
                            </TouchableWithoutFeedback>
                            <Text style={styles.label}>共{onLineCourseData.classroom[0].course_num}门课程</Text>
                         </View>
                         <View style={styles.course}>
                         <TouchableWithoutFeedback onPress={()=>Actions.XZWebView({title:onLineCourseData.course[0].title,url:glo_url+'/kecheng/'+onLineCourseData.course[0].id})}>
                            <View style={[styles.detail,{borderRightWidth:0.5,borderRightColor:'#eee'}]}>
                                <ResponsiveImage style={styles.thumb} source={{uri:onLineCourseData.course[0].thumb}}/>
                                <Text style={styles.title} numberOfLines={1}>{onLineCourseData.course[0].title}</Text>
                                <View style={styles.detailinfo}>
                                 <Text style={styles.free}>¥{onLineCourseData.course[0].real_price}</Text>
                                 <View style={styles.combination}>
                                   <FontAwesome name="user-o" size={12} color="#ababab"/>
                                   <Text style={styles.infocount}>{onLineCourseData.course[0].view_num}</Text>
                                 </View>
                                </View>
                            </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={()=>Actions.XZWebView({title:onLineCourseData.course[1].title,url:glo_url+'/kecheng/'+onLineCourseData.course[1].id})}>
                            <View style={styles.detail}>
                                <ResponsiveImage style={styles.thumb} source={{uri:onLineCourseData.course[1].thumb}}/>
                                <Text style={styles.title} numberOfLines={1}>{onLineCourseData.course[1].title}</Text>
                                <View style={styles.detailinfo}>
                                 <Text style={styles.free}>¥{onLineCourseData.course[1].real_price}</Text>
                                 <View style={styles.combination}>
                                   <FontAwesome name="user-o" size={12} color="#ababab"/>
                                   <Text style={styles.infocount}>{onLineCourseData.course[1].view_num}</Text>
                                 </View>
                                </View>
                            </View>
                            </TouchableWithoutFeedback>
                         </View>
                     </View>
                 }
            </View>
        )
    }
}
var styles = StyleSheet.create({
    container:{
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 5,
        borderColor: '#ECECEC'
    },
    head:{
        paddingHorizontal:10,
        height: 34,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text1: {
      fontSize: 15,
      color: '#333',
    },
    text2: {
      color: '#999',
      fontSize: 12,
      marginRight: 4,
    },
    combination:{
        flexDirection:'row',
        position:'absolute',
        right:0,
    },
    img:{
        width:global_width,
    },
    pic: {
      width: global_width - 20,
      height: 200,
    },
    label:{
        backgroundColor:'#6dc8f3',
        textAlign:'center',
        right:10,
        top:0,
        paddingLeft:5,
        paddingRight:5,
        position:'absolute'
    },
    appointment:{
        backgroundColor:'#edb035',
        textAlign:'center',
        marginLeft:297,
        paddingLeft:5,
        paddingRight:5,
        position:'absolute'
    },
    course:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    detail:{
        justifyContent: 'center',
        padding:10,
    },
    thumb:{
        width:global_width/2-20,
        height: 112,
    },
    title:{
        marginTop:5,
        width:global_width/2-20
    },
    detailinfo:{
        flexDirection: 'row',
        marginTop:5,
        marginRight:5,
     },
    free:{
         color:'red',
    },
    infocount: {
      marginLeft:4,
      color: '#999',
      fontSize: 10,
    }
})
const mapStateToProps = ({onLineCourse}) => {
	return {
		 onLineCourseData: onLineCourse.onLineCourseData
	}
}

export default connect(mapStateToProps, { fetchOnlineCourseData })(OnlineCourse)
