/**
 * Created by zhaolong on 2017/10/27.
 * File description:视频留言区
 */

'use strict'

import React,{Component} from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
}from 'react-native';
import {global_width,global_height} from "../../util/screen";


export default class Comment extends React.Component {
    state = {
        addIcon:require('../../static/images/live/comment.png'),
        deleteIcon:require('../../static/images/live/delete.png')
    };

    static defaultProps={
        list:[
            {name:"赵龙",date:"2017-10-28",time:"10:28:10",from:'0',content:"adsfa视频讲的很不错，就是画面不太清晰，希望下次可以在白天进行直播，谢谢老师的分享~"},
            {name:"赵龙",date:"2017-10-28",time:"10:28:10",from:'1',content:"视频讲的很不错，就是画面不太清晰，希望下次可以在白天进行直播，谢谢老师的分享~"},
            {name:"赵龙",date:"2017-10-28",time:"10:28:10",from:'1',content:"哎呦，不错哦！"},
            {name:"赵龙",date:"2017-10-28",time:"10:28:10",from:'1',content:"very good"},
            {name:"赵龙",date:"2017-10-28",time:"10:28:10",from:'1',content:"视频讲的很不错，就是画面不太清晰，希望下次可以在白天进行直播，谢谢老师的分享~"},
            {name:"赵龙",date:"2017-10-28",time:"10:28:10",from:'0',content:"视频讲的很不错，就是画面不太清晰，希望下次可以在白天进行直播，谢谢老师的分享~"},
            {name:"赵龙",date:"2017-10-28",time:"10:28:10",from:'0',content:"视频讲的很不错，就是画面不太清晰，希望下次可以在白天进行直播，谢谢老师的分享~"},
            {name:"赵龙",date:"2017-10-28",time:"10:28:10",from:'0',content:"视频讲的很不错，就是画面不太清晰，希望下次可以在白天进行直播，谢谢老师的分享~"},
            {name:"赵龙",date:"2017-10-28",time:"10:28:10",from:'0',content:"视频讲的很不错，就是画面不太清晰，希望下次可以在白天进行直播，谢谢老师的分享~"},
            {name:"赵龙",date:"2017-10-28",time:"10:28:10",from:'0',content:"视频讲的很不错，就是画面不太清晰，希望下次可以在白天进行直播，谢谢老师的分享~"},
            {name:"赵龙",date:"2017-10-28",time:"10:28:10",from:'0',content:"视频讲的很不错，就是画面不太清晰，希望下次可以在白天进行直播，谢谢老师的分享~"},
            {name:"赵龙",date:"2017-10-28",time:"10:28:10",from:'0',content:"视频讲的很不错，就是画面不太清晰，希望下次可以在白天进行直播，谢谢老师的分享~"},
            {name:"赵龙",date:"2017-10-28",time:"10:28:10",from:'0',content:"视频讲的很不错，就是画面不太清晰，希望下次可以在白天进行直播，谢谢老师的分享~"},
            {name:"赵龙",date:"2017-10-28",time:"10:28:10",from:'1',content:"很好的课程9~"}
        ],
    };
    constructor(props) {
        super(props);
    }
    addComment(){}
    deleteComment(){}
    render(){
        return(
            <ScrollView style={styles.container}>
                <View style={styles.head}>
                    <Text>留言区</Text>
                    <View>
                        <TouchableOpacity style={styles.action} onPress={()=>this.addComment()}>
                            <Image source={this.state.addIcon} style={styles.addIcon}/>
                            <Text> 评论</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {this.props.list.length == 0 ?
                    <View style={styles.noComment}>
                        <Text>快来抢占沙发吧！</Text>
                    </View>
                    :
                    <View style={styles.details}>
                    {this.props.list.map((value,index)=>{
                        return(
                            <View key={index}>
                                <View style={styles.infos}>
                                    <Text style={value.from == '0'?styles.name:styles.self_name}>{value.from == '0'?value.name:"自己"}</Text>
                                    <Text style={value.from == '0'?styles.date:styles.self_date}>{value.date}</Text>
                                    <Text style={value.from == '0'?styles.time:styles.self_time}>{value.time}</Text>
                                </View>
                                <View style={styles.contents}>
                                    <Text style={styles.content}>{value.content}</Text>
                                    <TouchableOpacity onPress={()=>this.deleteComment()}>
                                        {value.from == 1?
                                            <Image source={this.state.deleteIcon} style={styles.deleteIcon}/>
                                            :<View style={styles.deleteIcon}></View>
                                         }
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    })}
                    </View>

                }
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    marginTop:10,
    paddingLeft:10,
    paddingRight:10,
    marginBottom:20
  },
  head:{
     flexDirection:'row',
     justifyContent: 'space-between',
     alignItems: 'center',
 },
 action:{
     flexDirection:'row',
    //  width:60,
    //  justifyContent: 'space-between',
 },
 noComment:{
     flex:1,
     justifyContent: 'center',
     alignItems:'center',
 },
 details:{
     flex:1,
     justifyContent: 'center',
     alignItems:'center',
 },
 detail:{

 },
 infos:{
     flexDirection:'row',
      marginTop:10,
 },
 name:{
    color:'#41a1ff',
 },
 date:{
     paddingLeft:10,
     paddingRight:10,
 },
 self_name:{
     color:'#00bdc9',
 },
 self_date:{
     color:'#00dbc9',
     paddingLeft:10,
     paddingRight:10,
 },
 self_time:{
     color:'#00dbc9',
 },
 contents:{
    flexDirection:'row',
    justifyContent: 'space-between',
    marginTop:5,
 },
 content:{
     width:global_width-50,
 },
 addIcon:{
     marginTop:3,
     paddingRight:5,
 },
 deleteIcon:{
     width:12,
     height:12,
 },
});
