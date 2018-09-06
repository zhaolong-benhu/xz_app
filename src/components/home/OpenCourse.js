/**
 * Created by zhaolong on 2017/03/21.
 * File description:首页-线下公开课
 */
'use strict'

import React, {Component} from "react";

import {StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import {Icon} from "native-base";
import {connect} from "react-redux";
import {fetchOpenCourseData} from "../../actions/OpenCourse";
import {global_width} from "../../util/screen";
import {Actions} from "react-native-router-flux";
import {glo_url} from "../../api/global";
import ResponsiveImage from "react-native-responsive-image";
class OpenCourse extends Component {
  constructor(props) {
    super(props);
    this.props.fetchOpenCourseData();
  }

  render() {
    const {openCourseData} = this.props;
    return (
        <View>
          {openCourseData && openCourseData.open_course.length >= 2 &&
          <View style={styles.container}>
            <View style={styles.head}>
              <Text style={styles.text1}>{this.props.title}</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.text2} onPress={() => Actions.XZWebView({
                  title: '线下公开课',
                  url: glo_url + '/gongkaike/'
                })}>更多{this.props.title}</Text>
                <Icon style={{color: '#157eda', fontSize: 15}} name="ios-arrow-forward-outline"/>
              </View>
            </View>
            <View style={styles.img}>
              <TouchableWithoutFeedback onPress={() => Actions.XZWebView({
                title: openCourseData.open_course[0].title,
                url: glo_url + '/gongkaike/' + openCourseData.open_course[0].id
              })}>
                <View>
                  <ResponsiveImage style={styles.pic} source={{uri: openCourseData.open_course[0].thumb}}/>
                </View>
              </TouchableWithoutFeedback>
            </View>

            <View style={styles.course}>
              <TouchableWithoutFeedback onPress={() => Actions.XZWebView({
                title: openCourseData.open_course[1].title,
                url: glo_url + '/gongkaike/' + openCourseData.open_course[1].id
              })}>
                <View style={[styles.detail, {borderRightWidth: 0.5, borderRightColor: '#eee'}]}>
                  <ResponsiveImage style={styles.thumb} source={{uri: openCourseData.open_course[1].thumb}}/>
                  <Text style={styles.title} numberOfLines={1}>{openCourseData.open_course[1].title}</Text>
                  <View style={styles.detailinfo}>
                    <Text style={styles.infodate}>{openCourseData.open_course[1].start_time}</Text>
                  </View>
                  <View style={styles.real_price}>
                    <Text style={styles.infofree}>¥{openCourseData.open_course[1].real_price}</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback onPress={() => Actions.XZWebView({
                title: openCourseData.open_course[2].title,
                url: glo_url + '/gongkaike/' + openCourseData.open_course[2].id
              })}>
                <View style={[styles.detail, {borderRightWidth: 0.5, borderRightColor: '#eee'}]}>
                  <ResponsiveImage style={styles.thumb} source={{uri: openCourseData.open_course[2].thumb}}/>
                  <Text style={styles.title} numberOfLines={1}>{openCourseData.open_course[2].title}</Text>
                  <View style={styles.detailinfo}>
                    <Text style={styles.infodate}>{openCourseData.open_course[2].start_time}</Text>
                  </View>
                  <View style={styles.real_price}>
                    <Text style={styles.infofree}>¥{openCourseData.open_course[2].real_price}</Text>
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
  container: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 5,
    borderColor: '#ECECEC'
  },
  head: {
    paddingHorizontal: 10,
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
  combination: {
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
  },
  img: {
    width: global_width,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  pic: {
    width: global_width - 20,
    height: 200,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  course: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  detail: {
    justifyContent: 'center',
    padding: 10,
  },
  thumb: {
    width: global_width / 2 - 20,
    height: 112,
  },
  title: {
    marginTop: 5,
    width:global_width/2-20
  },
  label: {
    backgroundColor: '#6dc8f3',
    textAlign: 'center',
    right: 0,
    paddingLeft: 5,
    paddingRight: 5,
    position: 'absolute'
  },
  appointment: {
    backgroundColor: '#edb035',
    textAlign: 'center',
    right: 0,
    paddingLeft: 5,
    paddingRight: 5,
    position: 'absolute'
  },
  line: {
    width: global_width,
    height: 1,
    marginTop: 5,
    backgroundColor: '#ECECEC'
  },
  twoimages: {
    flexDirection: 'row',
    marginTop: 5
  },
  leftimage: {
    marginLeft: 10,
    width: global_width / 2 - 16,
    height: 100
  },
  rightimage: {
    marginLeft: 10,
    width: global_width / 2 - 14,
    height: 100
  },
  infodate: {
    color: '#ABABAB',
  },
  infoname: {
    color: '#000000',
  },
  twoinfo: {
    flexDirection: 'row',
    marginTop: 5,
    marginLeft: 10
  },
  twoinfos: {
    width: global_width / 2 - 10,
  },
  twoinfos2: {
    marginLeft: 10
  },
  detailinfo: {
    flexDirection: 'row',
    marginTop: 5,
  },
  infofree: {
    color: 'red',
  },
  infocount: {
    color: '#999',
    marginLeft: 100,
  },
  real_price: {
    marginTop: 5,
  },
  infoimage: {
    marginLeft: 80,
  },
  bg: {
    width: global_width,
    height: 50,
    marginTop: 5
  }
})

const mapStateToProps = ({openCourse}) => {
  return {
    openCourseData: openCourse.openCourseData
  }
}

export default connect(mapStateToProps, {fetchOpenCourseData})(OpenCourse)
