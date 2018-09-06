
/**
 * Created by zhaolong on 2017/04/28.
 * File description:个人中心-订单列表
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
} from 'react-native';
import {global_width,global_height} from '../../util/screen'
import {Scene, Router, Actions} from 'react-native-router-flux';
import {glo_url} from '../../api/global';

export default class List extends React.Component{
    state={
        default_thumb:require('../../static/images/study/course_defaultbg.jpg'),
        currency_thumb:require('../../static/images/study/currency.png'),
        daysBg: require('../../static/images/study/daysBg.png')
    }
    evaluateCourse(id){
        this.props.callbackParent(id);
    }
    render(){
        return(
            <View style={styles.coursecontainer}>
            {this.props.list.map((value,index) => {
                return <View key={"list"+index}>
                            <View style={styles.line}></View>
                            <Text style={styles.orderId}>订单号:{value.order_num}</Text>
                            <View style={styles.course}>
                                {(()=>{
                                    if(value.pic && value.pic != ""){
                                        return <Image source={{uri: value.pic}} style={styles.thumbnail}/>
                                    }else {
                                        return <Image source={this.state.default_thumb} style={styles.thumbnail}/>
                                    }
                                })()}
                                <View style={styles.rightContainer}>
                                    <View style={styles.info}>
                                        <Text style={styles.coursetitle} numberOfLines={1}>{value.title}</Text>
                                        <Text style={styles.year}>{value.pay_time}</Text>
                                        <View style={styles.pay_types}>
                                          <Text style={styles.real_price}>¥{value.pay_fee}</Text>
                                          <Image source={this.state.currency_thumb} style={styles.currency_thumb}/>
                                          <Text style={styles.currency}>{value.pay_xz_coin}</Text>
                                        </View>
                                    </View>
                                    {(()=>{
                                        if(value.order_type != 13 && value.order_type != 14){
                                            return <View style={styles.day}>
                                                <View style={styles.rightDays}>
                                                    <Image style={styles.daysBg} source={this.state.daysBg}/>
                                                    <Text style={styles.da}>{value.leave_days}天</Text>
                                                </View>
                                            </View>
                                        }
                                    })()}
                                </View>
                            </View>
                            {(()=>{
                                if(value.order_type == 1){
                                     return <Text style={styles.evaluate} onPress={()=>Actions.XZWebView({title:value.title,url:glo_url+'/kecheng/'+value.course_id+'?tab=reviews'})}>去评价</Text>
                                }
                                if(value.order_type == 2){
                                     return <Text style={styles.evaluate} onPress={()=>Actions.XZWebView({title:value.title,url:glo_url+'/kechengbao/'+value.product_id+'?tab=reviews'})}>去评价</Text>
                                }
                            })()}
                    </View>
            })}
            </View>
        )
    }
}
var styles = StyleSheet.create({
    coursecontainer:{

    },
    line:{
        width:global_width,
        height:10,
        backgroundColor:'#EEEEEE',
    },
    course:{
         flexDirection: 'row',
         paddingLeft:10,
         marginTop:10,
         paddingBottom:10,
         borderBottomWidth:1,
         borderColor:'#ECECEC',
    },
    evaluate:{
        width:global_width,
        paddingTop:10,
        paddingBottom:10,
        color:'#ffa60b',
        fontSize:16,
        textAlign:'center',
    },
    title:{
        fontSize:18,
        color:'#333333',
        marginLeft:global_width/2-50,
        height:30
    },
    orderId:{
       height:30,
       width:global_width,
       color:'#ababab',
       fontSize:12,
       borderBottomWidth:1,
       borderColor:'#ECECEC',
       paddingTop:5,
       paddingLeft:10
    },
    thumbnail: {
      width: 100,
      height: 60,
    },
    listView: {
      backgroundColor: '#F5FCFF',
      position:'absolute',
      marginTop:150
    },
    rightContainer: {
       height:60,
       flex: 1,
       paddingLeft:10,
       marginRight:10,
    //    backgroundColor:"black"
      flexDirection: 'row',
    },
    info:{
        width:global_width-180,
        height:60,
    },
    day:{
        height:60,
        width:80,
    },
    rightDays: {
        position: 'absolute',
        right: 30,
        top:5,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    daysBg: {
        width: 40,
        height: 40,
    },
    days:{
        paddingRight:26,
        paddingTop:11,
        color:'#167fda',
        fontSize:12
    },
    da: {
        textAlign: 'center',
        color: '#167fda',
        fontSize: 12,
        height: 20,
        marginTop: -28,
    },
    coursetitle: {
      fontSize: 15,
      color:'#333333',
    },
    pay_types:{
        flexDirection: 'row',
    },
    real_price:{
      paddingTop:6,
      color:'red',
    },
    currency_thumb:{
      marginTop:10,
      marginLeft:10,
      width:11,
      height:11,
    },
    currency:{
      paddingTop:6,
      color:'#333333',
    }
});
