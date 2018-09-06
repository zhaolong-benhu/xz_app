/**
 * Created by zhaolong on 2017/03/20.
 * File description:首页-免费好课
 */
'use strict'

import React from "react";

import {Image, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import {Icon} from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {connect} from "react-redux";
import {fetchFreeCourseData} from "../../actions/FreeCourse";
import {global_width} from "../../util/screen";
import {Actions} from "react-native-router-flux";
import {glo_url} from "../../api/global";
class FreeCourse extends React.Component {
  state = {
    data: []
  }
  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchFreeCourseData();
  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    const {freeCourseData} = this.props;
    return (
        <View>
          {freeCourseData && freeCourseData.length >= 3 &&
          <View style={styles.container}>
            <View style={styles.head}>
              <Text style={styles.text1}>{this.props.title}</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.text2} onPress={() => Actions.XZWebView({
                  title: '在线课程',
                  url: glo_url + '/kecheng/list/0-0-1'
                }) }>更多{this.props.title}</Text>
                <Icon style={{color: '#157eda', fontSize: 15}} name="ios-arrow-forward-outline"/>
              </View>
            </View>
            <TouchableWithoutFeedback style={styles.img} onPress={ () => Actions.XZWebView({
              title: freeCourseData[0].title,
              url: glo_url + '/kecheng/' + freeCourseData[0].id
            })}>
              <View
                  style={{paddingHorizontal: 10, paddingBottom: 10, borderBottomColor: '#eee', borderBottomWidth: 0.5}}>
                <Image style={styles.pic} source={{uri: freeCourseData[0].thumb}} resizeMode={'cover'}/>
              </View>
            </TouchableWithoutFeedback>

            <View style={styles.course}>
              <TouchableWithoutFeedback onPress={() => Actions.XZWebView({
                title: freeCourseData[1].title,
                url: glo_url + '/kecheng/' + freeCourseData[1].id
              })}>
                <View style={[styles.detail, {borderRightWidth: 0.5, borderRightColor: '#eee'}]}>
                  <Image style={styles.thumb} source={{uri: freeCourseData[1].thumb}} resizeMode={'cover'}/>
                  <Text style={styles.title} numberOfLines={1}>{freeCourseData[1].title}</Text>
                  <View style={styles.detailinfo}>
                    <Text style={styles.free}>免费</Text>
                    <View style={styles.combination}>
                      <FontAwesome name="user-o" size={12} color="#ababab"/>
                      <Text style={styles.infocount}>{freeCourseData[1].view_num}</Text>
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback onPress={() => Actions.XZWebView({
                title: freeCourseData[2].title,
                url: glo_url + '/kecheng/' + freeCourseData[2].id
              })}>
                <View style={styles.detail}>
                  <Image style={styles.thumb} source={{uri: freeCourseData[1].thumb}} resizeMode={'cover'}/>
                  <Text style={styles.title} numberOfLines={1}>{freeCourseData[2].title}</Text>
                  <View style={styles.detailinfo}>
                    <Text style={styles.free}>免费</Text>
                    <View style={styles.combination}>
                      <FontAwesome name="user-o" size={12} color="#ababab"/>
                      <Text style={styles.infocount}>{freeCourseData[2].view_num}</Text>
                    </View>
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
const styles = StyleSheet.create({
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
  },
  pic: {
    width: global_width - 20,
    height: 200,
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
    fontSize: 14,
    width:global_width/2-20
  },
  detailinfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    alignItems: 'center',
  },
  detailinfo2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    alignItems: 'center',
  },
  free: {
    color: '#ff2e2e',
  },
  infocount: {
    marginLeft: 4,
    color: '#999',
    fontSize: 10,
  }
})

const mapStateToProps = ({freeCourse}) => {
  return {
    freeCourseData: freeCourse.freeCourseData
  }
}

export default connect(mapStateToProps, {fetchFreeCourseData})(FreeCourse)
