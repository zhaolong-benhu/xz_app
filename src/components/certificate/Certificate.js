
/**
 * Created by zhaolong on 2017/05/03.
 * File description:职业认证
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

export default class Certificate extends React.Component{
    state={
        default_thumb:require('../../static/images/study/course_defaultbg.jpg'),
    }
    render(){
        return(
            <View style={styles.container}>
            {this.props.list.map((value,index) => {
                return <View style={styles.coursecontainer} key={"list"+index}>
                        <TouchableWithoutFeedback onPress={()=>Actions.XZWebView({title:value.name,url:glo_url+'/ihmaDetail/'+value.id})}>
                            <View style={styles.view}>
                                {(()=>{
                                    if(value.picture && value.picture != ""){
                                        return <Image source={{uri:value.picture}} style={styles.thumb}/>
                                    }else {
                                        return <Image source={this.state.default_thumb} style={styles.thumb}/>
                                    }
                                })()}
                                <View style={styles.rightContainer}>
                                    <Text style={styles.coursetitle} numberOfLines={2}>{value.name}</Text>
                                    <Text style={styles.add_time}>{value.study_num}人报考</Text>
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
		marginLeft:10,
        borderBottomWidth:1,
        borderColor:'#ECECEC',
    },
    thumb:{
        width: 65,
        height: 85,
    },
    rightContainer: {
       height:95,
       flex: 1,
       marginLeft:10,
    },
    coursetitle: {
      fontSize: 15,
      color:'#333333',
    },
    info:{
        flexDirection: 'row',
        paddingTop:25,
    },
    learnnum: {
        fontSize:12,
        color:'#000',
        paddingBottom:5,
    },
    add_time:{
        position:'absolute',
        right:10,
        bottom:10,
        fontSize:12,
        color:'#ababab'
    }
});
