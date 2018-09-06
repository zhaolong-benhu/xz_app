
/**
 * Created by zhaolong on 2017/05/04.
 * File description:活动列表
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

export default class ActivityList extends React.Component{
    state={
        default_thumb:require('../../static/images/study/course_defaultbg.jpg'),
    }
    render(){
        return(
            <View style={styles.container}>
            {this.props.list.map((value,index) => {
                return <View style={styles.coursecontainer} key={"list"+index}>
                        <TouchableWithoutFeedback onPress={()=>Actions.XZWebView({title:value.title,url:glo_url+'/huodong/'+value.id})}>
                            <View style={styles.view}>
                            {(()=>{
                                if(value.thumb && value.thumb != ""){
                                    return <Image source={{uri:value.thumb}} style={styles.thumb}/>
                                }else{
                                    return <Image source={this.state.default_thumb} style={styles.thumb}/>
                                }
                            })()}
                                <View style={styles.rightContainer}>
                                    <View style={styles.info}>
                                        {(()=>{
                                            switch (value.type) {
                                                case '13':
                                                    return <Text style={styles.type}>峰会</Text>
                                                    break;
                                                case '14':
                                                    return <Text style={styles.type2}>展会</Text>
                                                    break;
                                                case '15':
                                                    return <Text style={styles.type2}>沙龙</Text>
                                                    break;
                                                case '16':
                                                    return <Text style={styles.type4}>学习考察</Text>
                                                    break;
                                                default:
                                                return <Text style={styles.type}>峰会</Text>
                                            }
                                        })()}
                                        <Text style={styles.title} numberOfLines={1}>{value.title}</Text>
                                    </View>

                                         <View style={styles.info}>
                                            <Text style={styles.teacher_name} numberOfLines={1}>{value.teacher_name}</Text>
                                            <Text style={styles.end_time} numberOfLines={1}>{value.end_time}</Text>
                                        </View>

                                         <View style={styles.info}>
                                               {(()=>{
                                                   if(value.real_price != '0.00'){
                                                       return <Text style={styles.real_price} numberOfLines={1}>¥{value.real_price}</Text>
                                                   }else {
                                                       return <Text style={styles.real_price} numberOfLines={1}>免费</Text>
                                                   }
                                               })()}
                                             <Text style={styles.view_num} numberOfLines={1}>{value.view_num}人感兴趣</Text>
                                        </View>


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
    },
    coursecontainer:{
        paddingBottom:10,
        backgroundColor:'#FFFFFF',
    },
    thumb:{
        width: 100,
        height: 70,
    },
    rightContainer: {
       height:75,
       flex: 1,
       marginLeft:10,
       borderBottomWidth:1,
       borderColor:'#ECECEC',
       paddingBottom:5,
   },
    view:{
        flexDirection: 'row',
		marginLeft:10,
    },
    info:{
        flexDirection: 'row',
    },
    type:{
        backgroundColor:'#d03b3c',
        borderRadius:5,
        paddingLeft:5,
        paddingRight:5,
        fontSize:13
    },
    type2:{
        backgroundColor:'#659df2',
        borderRadius:5,
        paddingLeft:5,
        paddingRight:5,
        fontSize:13
    },
    type3:{
        backgroundColor:'#E79138',
        borderRadius:5,
        paddingLeft:5,
        paddingRight:5,
        fontSize:13
    },
    type4:{
        backgroundColor:'#5cc97c',
        borderRadius:5,
        paddingLeft:5,
        paddingRight:5,
        fontSize:13
    },
    title:{
        marginLeft:10,
        fontSize:13,
        width:180
    },
    teacher_name:{
        fontSize:11,
        color:'#333',
        marginTop:3,
        height:20,
        width:150
    },
    teacher_name2:{
        fontSize:11,
        color:'#333',
        marginTop:5,
        // height:20,
        width:150
    },
    end_time:{
        fontSize:11,
        marginLeft:4,
        // marginTop:10,
        color: '#ababab',
    },
    end_time2:{
        fontSize:11,
        marginLeft:4,
        // marginTop:5,
        color: '#ababab',
    },
    real_price:{
        color: '#ff2e2e',
        fontSize:14,
    },
    view_num:{
        position:'absolute',
        right:5,
    },
});
