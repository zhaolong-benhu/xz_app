/**
 * Created by qzy on 05/04/2017.
 * File description:
 */
/**
 * Created by qzy on 05/04/2017.
 * File description:课程章节
 */
import React, {Component} from "react";
import {StyleSheet, Text, TouchableHighlight, TouchableWithoutFeedback, View} from "react-native";
import {Alert} from "../../components";
import Foundation from "react-native-vector-icons/Foundation";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {Actions} from "react-native-router-flux";
import {global_width} from "../../util";
import {post} from "../../helpers/helpers";
class CourseChapter extends Component {

  //渲染小标题
  renderSub(sub) {
    if (sub.child.length > 1) {
      return sub.child.map((node) => {
        return (<TouchableHighlight
            underlayColor={'rgba(255,255,255,0.4)'}
            onPress={ () => {
              this.watchVideo(
                  node.mp4_url,
                  node.title,
                  this.props.progress.id,
                  node.id,
                  this.props.course.id,
                  sub.child,
              )
            }}
            key={node.id}>
          <Text style={styles.subsubtitle}>{node.title}</Text>
        </TouchableHighlight>)
      })
    }
  }

  //看视频传递地址，参数，播放列表
  watchVideo(video_address, title, progress_id, lecture_id, course_id, lastTime) {
    // Orientation.lockToLandscape();
    //跳过自评
    if (this.props.progress.learn_rate < 10) {
      post('mv1/user/index/skip-self-evaluation', {progress_id: this.props.progress.id})
    }
    //看视频学习
    if (this.props.course.type == 2) {
      Actions.WatchVideo({video_address, title, progress_id, lecture_id, course_id, lastTime})
    } else {
      Alert('APP版暂不支持scorm类型课程观看，请到pc端观看！')
    }
  }

  //计算时间长度
  renderTime(sub) {
    const totalTime = sub.child
        .map(i => i.video_duration)
        .reduce((total, cur) => total += parseInt(cur), 0)

    return `${Math.floor(totalTime / 60)}分钟${Math.floor(totalTime % 60)}秒`
  }

  //参加考试
  goToExam = (course_id, progress_id, cert_id, product_id, ) => () => {
    this.props.fetchExam(course_id, progress_id, cert_id, product_id,)
  }
  //继续学习
  continuePlay = (lecture_id, lastTime) => () => {
    const {course, progress, openState} = this.props
    //查找视频地址
    let mp4_url = ""
    let title = ""
    if (lecture_id == 0) {
      // debugger
      mp4_url = course.detail[0].child[0].mp4_url;
      title = course.detail[0].child[0].title;
    } else {
      course.detail.map(chap => {
            return chap.child.map(sub => {
                  if (sub.id === lecture_id) {
                    mp4_url = sub.mp4_url
                    title = sub.title
                  }
                }
            )
          }
      )
    }

    console.log(mp4_url, lecture_id, lastTime)
    this.watchVideo(mp4_url, title, progress.id, lecture_id, course.id, lastTime)
  }

  render() {
    const {course, progress, openState} = this.props
    let status = ''
    if (progress.learn_rate < 10) {
      status = 'unplay'
    } else if (progress.learn_rate >= 10 && progress.learn_rate < 80) {
      status = 'playing'
    } else if (progress.learn_rate >= 80) {
      status = 'finished'
    }
    return (
        <View style={styles.wrapper}>
          <View style={{width: global_width * 0.9}}>
            <View style={[styles.titleWrapper,]}>
              <View style={{flexDirection: 'row'}}>
                <TouchableWithoutFeedback onPress={ () => this.props.toggle(course.id) }>
                  <View>
                    <Text style={styles.title}>{course.title}</Text>
                  </View>
                </TouchableWithoutFeedback>

                {
                  //考试按钮or继续学习
                  status === 'finished' ?
                      progress.is_pass == 1 ?
                          (<View
                              style={[styles.btn, styles.colorGrey]}
                          >
                            <Text style={styles.btnText}>已通过</Text>
                          </View>)
                          :
                          progress.is_pass == 3 ?
                              (<View
                                  style={[styles.btn, styles.colorGrey]}
                              >
                                <Text style={styles.btnText}>未通过</Text>
                              </View>) :
                              (<TouchableHighlight
                                  underlayColor={'rgba(255,255,255,0.4)'}
                                  style={styles.btn}
                                  onPress={this.goToExam(course.id, progress.id, this.props.cert_id, this.props.product_id)}>
                                <View>
                                  <Text style={styles.btnText}>考试</Text>
                                </View>
                              </TouchableHighlight>) :
                      status === 'playing' ?
                          (<TouchableHighlight
                              underlayColor={'rgba(255,255,255,0.4)'}
                              style={styles.btn}
                              onPress={ this.continuePlay(progress.last_learn_lecture_id, progress.last_learn_second) }>
                            <View>
                              <Text style={styles.btnText}>
                                继续学习
                              </Text>
                            </View>
                          </TouchableHighlight>) : null
                }
                {
                  //折叠按钮
                  // course.detail.length >  1 ?
                  <TouchableWithoutFeedback onPress={ () => this.props.toggle(course.id) }>
                    <MaterialIcons
                        name={ openState ? "keyboard-arrow-up" : "keyboard-arrow-down" }
                        size={20}
                        color="#aaa"
                        style={{position: 'absolute', top: 0, right: 0}}
                    />
                  </TouchableWithoutFeedback>
                  // : null
                }

              </View>
              <Text style={[styles.status, status === 'finished' ? '' : styles.red]}>
                {
                  status === 'finished' ? '已学完' :
                      status === 'playing' ? this.props._type == 6 ? '学习中  ' + progress.learn_rate + '%' : '学习中' :
                          status === 'unplay' ? '未开始' : ''
                }
              </Text>
            </View>
            {/*{console.log(course.detail)}*/}
            {openState && course.detail.map((sub, i, all) => {
                  // console.log(sub)
                  return (
                      <View
                          style={[styles.subtitleWrapper,
                            // sub.status === 'finished' ? '' : styles.borderGrey ,
                            i === all.length - 1 ? '' : styles.bottom]} key={sub.id}>

                        <View>
                          <TouchableHighlight
                              underlayColor={'rgba(255,255,255,0.4)'}
                              onPress={() => {
                                // console.log(sub.child[0].id)
                                // console.log(sub.child)
                                this.watchVideo(
                                    sub.child[0].mp4_url,
                                    sub.title,
                                    progress.id,
                                    sub.child[0].id,
                                    course.id,
                                    sub.child
                                )
                              }}>
                            <View style={{flexDirection: 'row'}}>
                              <Foundation name="play-video" color="#9ccef9" size={24} style={{marginRight: 8}}/>
                              <View>
                                <Text style={styles.subtitle}>{sub.title}</Text>
                                <Text style={[styles.time]}>{this.renderTime(sub)}</Text>
                              </View>
                            </View>
                          </TouchableHighlight>

                          { this.renderSub(sub)}
                        </View>

                      </View>
                  )
                }
            )}
          </View>
          {
            status === 'finished' ? (
                <View style={styles.iconWrapper}>
                  <Ionicons name="ios-checkmark-circle" size={14} color="#7fcb54"/>
                  <View style={[styles.line, styles.borderGreen]}/>
                  <View style={[styles.line, styles.borderGreen]}/>
                  <Ionicons name="ios-checkmark-circle" size={14} color="#7fcb54"/>
                </View>) :
                status === 'playing' ? (
                    <View style={styles.iconWrapper}>
                      <Ionicons name="ios-checkmark-circle" size={14} color="#f24a4c"/>
                      <View style={[styles.line, styles.borderRed]}/>
                      <View style={[styles.line, styles.borderGrey]}/>
                      <Ionicons name="ios-checkmark-circle" size={14} color="#ddd"/>
                    </View>) :
                    status === 'unplay' ? (
                        <View style={styles.iconWrapper}>
                          <Ionicons name="ios-checkmark-circle" size={14} color="#ddd"/>
                          <View style={[styles.line, styles.borderGrey]}/>
                          <View style={[styles.line, styles.borderGrey]}/>
                          <Ionicons name="ios-checkmark-circle" size={14} color="#ddd"/>
                        </View>
                    ) : <Text>555</Text>
          }
        </View>
    );
  }
}

const styles = StyleSheet.create({
  colorGrey: {
    backgroundColor: '#ccc'
  },
  wrapper: {
    flexDirection: 'row-reverse',
    marginRight: global_width * 0.02,
    paddingVertical: 20,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  btn: {
    borderRadius: 4,
    justifyContent: 'center',
    width: 55,
    height: 24,
    alignItems: 'center',
    backgroundColor: '#157eda'
  },
  btnText: {fontSize: 12, color: '#fff'},
  iconWrapper: {width: 12, zIndex: 10},
  subtitle: {fontSize: 14, color: '#333', marginBottom: 10, marginTop: 4, width: global_width * 0.75},
  subsubtitle: {fontSize: 14, color: '#333', marginTop: 10, width: global_width * 0.75, marginLeft: 24,},
  title: {fontSize: 16, color: '#333', marginBottom: 10, width: global_width * 0.65},
  titleWrapper: {
    paddingLeft: 10,
    // borderLeftWidth: 1,
    // borderLeftColor: '#7fcb54'
  },
  subtitleWrapper: {
    flexDirection: 'row',
    paddingLeft: 10,
  },
  borderGrey: {borderLeftColor: '#ddd'},
  borderRed: {borderLeftColor: '#f24a4c'},
  borderGreen: {borderLeftColor: '#7fcb54'},
  status: {fontSize: 12, color: '#7fcb54', marginBottom: 20},
  time: {fontSize: 12, color: '#ababab',},
  bottom: {paddingBottom: 17},
  red: {color: '#f24a4c',},
  line: {flex: 1, position: 'relative', left: 5, borderLeftWidth: 1}
})


export default CourseChapter
