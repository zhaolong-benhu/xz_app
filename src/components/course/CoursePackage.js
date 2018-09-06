
/**
 * Created by zhaolong on 2017/05/02.
 * File description:专业证书
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
    TouchableWithoutFeedback
} from 'react-native';
import {global_width,global_height} from '../../util/screen';
import {Scene, Router, Actions} from 'react-native-router-flux';
import {glo_url} from '../../api/global';

export default class CoursePackage extends React.Component{
    state={
        default_thumb:require('../../static/images/study/course_defaultbg.jpg'),
    }
    render(){
        return(
            <View style={styles.container}>
            {this.props.list.map((value,index) => {
                return <View style={styles.coursecontainer} key={"list"+index}>
                        <TouchableWithoutFeedback onPress={()=>Actions.XZWebView({title:value.title,url:glo_url+'/kechengbao/'+value.id})}>
                            <View style={styles.view}>
                                {(()=>{
                                    if(value.thumb && value.thumb != ""){
                                        return <Image source={{uri:value.thumb}} style={styles.thumb}/>
                                    }else{
                                        return <Image source={this.state.default_thumb} style={styles.thumb}/>
                                    }
                                })()}
                                <View style={styles.rightContainer}>
                                    <View style={styles.title}>
                                        <Text style={styles.sign}>证书</Text>
                                        <Text style={styles.coursetitle} numberOfLines={1}>{value.title}</Text>
                                    </View>
                                    <View style={styles.info}>
                                        <Text style={styles.coursenum}>共{value.count}门课程</Text>
                                        <Text style={styles.learnnum}>{value.study_num}人学过</Text>
                                    </View>

                                    <Text style={styles.real_price}>¥{value.real_price}</Text>
                              </View>
                            </View>
                        </TouchableWithoutFeedback>
                </View>
            })}
            </View>
        )
    }
}
var styles = StyleSheet.create({
    container:{
        paddingBottom:20,
    },
    coursecontainer:{
        paddingBottom:10,
        backgroundColor:'#FFFFFF',
    },
    view:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
		marginLeft:10
    },
    thumb:{
        width: 100,
        height: 70
    },
    rightContainer: {
       height:70,
       flex: 1,
       marginLeft:10,
       borderBottomWidth:1,
       borderColor:'#ECECEC'
    },
    title:{
        flexDirection: 'row',
        height:20
    },
    sign:{
        backgroundColor:'#659df2',
        borderRadius:3,
        fontSize: 13,
        color: '#fff',
        paddingLeft:4,
        paddingRight:4
    },
    coursetitle: {
      fontSize: 14,
      color:'#333333',
      paddingLeft:5,
      height:25
    },
    info:{
        flexDirection: 'row',
    },
    coursenum:{
        fontSize:12,
        color:'#333',
        height:25,
        paddingTop:3,
        paddingBottom:1
    },
    learnnum: {
        marginLeft:15,
        fontSize:12,
        color:'#ABABAB',
        height:23,
        paddingTop:3,
        paddingBottom:1
    },
    real_price:{
        color:'red',
        fontSize:15
    }
});
