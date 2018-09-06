/**
 * Created by zhaolong on 2017/03/20.
 * File description:首页-人气导师
 */
'use strict'

import React, {Component} from "react";

import {Image, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import {Icon} from "native-base";
import {connect} from "react-redux";
import {fetchTeacherData} from "../../actions/Teacher";
import {global_width} from "../../util/screen";
import {Actions} from "react-native-router-flux";
import {glo_url} from "../../api/global";

class Teacher extends Component {
  constructor(props) {
    super(props);
    this.props.fetchTeacherData();
  }

  render() {
    const {teacherData} = this.props;
    return (
        <View>
          {teacherData && teacherData.length >= 3 &&
          <View style={styles.container}>
            <View style={styles.head}>
              <Text style={styles.text1}>{this.props.title}</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.text2} onPress={() => Actions.XZWebView({
                  title: '导师',
                  url: glo_url + '/neixun/'
                })}>更多{this.props.title}</Text>
                <Icon style={{color: '#157eda', fontSize: 15}} name="ios-arrow-forward-outline"/>
              </View>
            </View>
            <View style={styles.img}>
              <TouchableWithoutFeedback onPress={() => Actions.XZWebView({
                title: teacherData[0].name,
                url: glo_url + '/neixun/' + teacherData[0].user_id
              })}>
                <View style={{
                  paddingHorizontal: 10,
                  paddingBottom: 10,
                  borderBottomColor: '#eee',
                  borderBottomWidth: 0.5
                }}>
                  <Image style={styles.pic} source={{uri: teacherData[0].thumb}} resizeMode={'cover'}/>
                </View>
              </TouchableWithoutFeedback>
              {(() => {
                if (teacherData[0].is_reserve == 1) {
                  return <Text style={styles.appointment}>可预约</Text>
                } else {
                  return <Text style={styles.appointment}>不可预约</Text>
                }
              })()}
            </View>

            <View style={styles.course}>
              <TouchableWithoutFeedback onPress={() => Actions.XZWebView({
                title: teacherData[1].name,
                url: glo_url + '/neixun/' + teacherData[1].user_id
              })}>
                <View style={[styles.detail, {borderRightWidth: 0.5, borderRightColor: '#eee'}]}>
                  <Image style={styles.thumb} source={{uri: teacherData[1].thumb}} resizeMode={'cover'}/>
                  <View style={styles.detailinfo}>
                    <Text>{teacherData[1].name}</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback onPress={() => Actions.XZWebView({
                title: teacherData[2].name,
                url: glo_url + '/neixun/' + teacherData[2].user_id
              })}>
                <View style={styles.detail}>
                  <Image style={styles.thumb} source={{uri: teacherData[2].thumb}} resizeMode={'cover'}/>
                  <View style={styles.detailinfo}>
                    <Text>{teacherData[2].name}</Text>
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
  img: {
    width: global_width
  },
  pic: {
    width: global_width - 20,
    height: 200,
  },
  label: {
    backgroundColor: '#6dc8f3',
    textAlign: 'center',
    right: 10,
    paddingLeft: 5,
    position: 'absolute'
  },
  appointment: {
    backgroundColor: '#edb035',
    textAlign: 'center',
    right: 10,
    top: 0,
    paddingRight: 5,
    paddingLeft: 5,
    position: 'absolute'
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
    marginTop: 10,
  },
  twoimages: {
    flexDirection: 'row',
    marginTop: 10
  },
  leftimage: {
    paddingLeft: 10,
    width: global_width / 2 - 16,
    height: 112,
  },
  rightimage: {
    marginLeft: 10,
    width: global_width / 2 - 14,
    height: 112
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
    width: global_width / 2,
    marginTop: 5,
    paddingBottom: 10,
  },
  twoinfos2: {
    marginLeft: -3,
    marginTop: 5,
    paddingBottom: 10,
  },
  detailinfo: {
    marginTop: 10,
    flexDirection: 'row',
    width:global_width/2-20,
  },
  infofree: {
    color: 'red',
  },
  infocount: {
    color: '#999',
    marginLeft: 100,
  },
  infoimage: {
    marginLeft: 80,
  },
  infoText: {
    marginLeft: -5,
  },
  bg: {
    width: global_width,
    height: 50,
    marginTop: 5
  }
})

const mapStateToProps = ({teacher}) => {
  return {
    teacherData: teacher.teacherData
  }
}

export default connect(mapStateToProps, {fetchTeacherData})(Teacher)
