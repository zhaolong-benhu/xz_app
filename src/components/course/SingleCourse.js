
/**
 * Created by zhaolong on 2017/05/02.
 * File description:单门课程
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

export default class SingleCourse extends React.Component{
    state={
        default_thumb:require('../../static/images/study/course_defaultbg.jpg'),
    }
    render(){
        return(
            <View style={styles.container}>
            {this.props.list.map((value,index) => {
                return <View style={styles.coursecontainer} key={"list"+index}>
                        <TouchableWithoutFeedback onPress={()=>Actions.XZWebView({title:value.title,url:glo_url+'/kecheng/'+value.id})}>
                            <View style={styles.view}>
                                {(()=>{
                                    if(value.thumb && value.thumb != ""){
                                        return <Image source={{uri:value.thumb}} style={styles.thumb}/>
                                    }else{
                                        return <Image source={this.state.default_thumb} style={styles.thumb}/>
                                    }
                                })()}
                                <View style={styles.rightContainer}>
                                    <Text style={styles.coursetitle} numberOfLines={1}>{value.title}</Text>
                                    <Text style={styles.learnnum}>{value.study_num}人学过</Text>
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
        paddingBottom:20
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
		marginLeft:10,
    },
    thumb:{
        width: 100,
        height: 70,
    },
    rightContainer: {
       height:70,
       flex: 1,
       marginLeft:10,
       borderBottomWidth:1,
       borderColor:'#ECECEC',
    },
    coursetitle: {
      fontSize: 15,
      color:'#333333',
      height:23
    },
    learnnum: {
        fontSize:12,
        color:'#ABABAB',
        height:20,
        paddingTop:1,
        paddingBottom:1,
    },
    real_price:{
        color:'red',
        fontSize:15,
    }
});
