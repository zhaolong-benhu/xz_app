/**
 * Created by zhaolong on 2017/10/27.
 * File description:视频介绍
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
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {Alert} from '../../components';

export default class VideoIntroduce extends React.Component {
    state = {
        addIcon:require('../../static/images/live/checked.png'),
        deleteIcon:require('../../static/images/live/checked.png'),
        tips:"展开",
        bShouldClose:false,
        content:"无",
        bOpen:true,
    };

    constructor(props) {
        super(props);
    }

    componentWillMount(){

    }
    componentDidMount(){
        // if(this.props.content.course_detail && this.props.content.course_detail.length > 40){
        //     this.setState({content:this.props.content.course_detail.substr(0,40)+"...",bShouldClose:true});
        // }else {
        //     this.setState({bShould:false,content:this.props.content.course_detail});
        // }
    }
    componentWillReceiveProps(nextProps){
    }
    //控制和显示更多的视频介绍内容
    showMoreText(){
        this.setState({bOpen:!this.state.bOpen});
        if(this.state.bOpen){
            this.setState({tips:"收起",content:this.props.content.course_detail});
        }else {
            this.setState({tips:"展开",content:this.props.content.course_detail.substr(0,40)+"..."});
        }
    }
    render(){
        return(
            <ScrollView style={styles.container}>
                <View style={styles.head}>
                    <Text>视频介绍</Text>
                    {/* {this.state.bShouldClose == true ?
                    <View>
                        <TouchableOpacity style={styles.action} onPress={()=>this.showMoreText()}>
                            <FontAwesome name={this.state.bOpen?"angle-down":"angle-up"} size={20} color="#000000" />
                            <Text>{this.state.tips}</Text>
                        </TouchableOpacity>
                    </View>
                     :null
                   } */}
                </View>
                <View style={styles.content}>
                    <Text style={styles.introduce}>{this.props.content.course_detail}</Text>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
  container: {
      marginTop:10,
      paddingLeft:10,
      paddingRight:10,
      paddingBottom:20,
      // borderBottomWidth:1,
      // borderBottomColor:'#e0e0e0',
  },
  head:{
      flexDirection:'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  },
  action:{
      flexDirection:'row',
  },
  content:{
      marginTop:10,
    //   marginBottom:10,
 },
  introduce:{
      marginLeft:10,
  }
});
