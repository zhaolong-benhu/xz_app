/**
 * Created by zhaolong on 2017/03/23.
 * File description:学习中心
 */
'use strict'

import React, {
  Component,
} from 'react';

import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  ListView,
  TouchableHighlight,
} from 'react-native'

export default class CourseList extends Component{

    constructor(props){
        super(props);
        this.state = {
          dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
          }),
          channel : [
              {thumbnail:'http://img2.xz.veimg.cn/classroomclass/201652511232428555.jpg',title:"长租公寓成本管理",study_num:'17',real_price:'480'},
              {thumbnail:'http://img2.xz.veimg.cn/CourseMpic/20172149572676992.jpg',title:"客房管理",study_num:'17',real_price:'480'},
              {thumbnail:'http://img2.xz.veimg.cn/classroomclass/201652511232428555.jpg',title:"移动互联网思维",study_num:'17',real_price:'480'},
              {thumbnail:'http://img2.xz.veimg.cn/classroomclass/201652511232428555.jpg',title:"移动互联网思维",study_num:'17',real_price:'480'},
              {thumbnail:'http://img2.xz.veimg.cn/classroomclass/201652511232428555.jpg',title:"移动互联网思维",study_num:'17',real_price:'480'}
        ],
        default_thumbnail:require('../../static/images/study/course_defaultbg.jpg'),
        };
    }
    componentDidMount(){
      //list数据
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this.state.channel),
        });
    }
    //课程组件
    renderCourse(course){
        return (
          <TouchableHighlight underlayColor={'rgba(255,255,255,0.4)'} style={styles.coursecontainer}>
          {(()=>{
             if(course.thumbnail && course.thumbnail != ""){
                 return <Image source={{uri: course.thumbnail}} style={styles.thumbnail} />
             } else
             {
                 return <Image source={this.state.default_thumbnail} style={styles.thumbnail}/>
             }
          })()}

            <View style={styles.rightContainer}>
              <Text style={styles.coursetitle}>{course.title}</Text>
              <Text style={styles.year}>{course.study_num}人学过</Text>
              <Text style={styles.real_price}>¥{course.real_price}</Text>
            </View>
          </TouchableHighlight>
        );
    }

    render(){
        return(
            <View style={styles.container}>
                <ListView
                  dataSource={this.state.dataSource}
                  renderRow={this.renderCourse}
                  style={styles.listView}
                />
            </View>
        )
    }
}
var styles = StyleSheet.create({
    coursecontainer:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    thumbnail: {
      width: 100,
      height: 60,
    },
    listView: {
      padding: 10,
      backgroundColor: '#F5FCFF',
    },
    rightContainer: {
       height:60,
       flex: 1,
       paddingLeft:5,
       borderBottomWidth:1,
       marginTop:15,
    },
    coursetitle: {
      fontSize: 15,
      color:'#333333',
    },
    year: {
    },
    real_price:{
      color:'red',
    }
})
