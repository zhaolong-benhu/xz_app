/**
 * Created by qzy on 21/03/2017.
 * File description:直播列表
 */
import React, {Component} from "react";
import {Image, StyleSheet, Text, TouchableHighlight, View, AlertIOS} from "react-native";
import {global_width,platform} from "../../util";
import Icon from "react-native-vector-icons/FontAwesome";
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import ResponsiveImage from "react-native-responsive-image";

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#FFFFFF',
    paddingLeft:10,
    paddingRight:10,
  },
  listHeader: {
    height: 64,
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: 10,
  },
  head:{
      width:50,
      height:50,
  },
  avatarWrapper: {
    width: 44,
    height: 44,
    alignSelf: 'center',
    borderRadius: 22,
    overflow: 'hidden',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  listHeaderLeft: {
    flexDirection: 'row',
    flex: 1,
  },
  textWrapper: {marginLeft: 10, justifyContent: 'space-around', flex: 1},
  teacher: {fontSize: 15, color: '#333'},
  title: {fontSize: 12, color: '#999'},
  btnWrapper: {flex: 1, justifyContent: 'center',position:'absolute',right:10,bottom:10},
  touchable: {
    backgroundColor: "#00A6EA",
    width: 65,
    height: 22,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  untouchable: {
    backgroundColor: "#d9d9d9",
  },
  btnText: {fontSize: 12, color: '#fff',},
  exclusiveWrapper: {
    alignSelf: 'center',
    borderRadius: 10,
    borderColor: '#ff2e31',
    borderWidth: 1,
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginLeft: 4
  },
  exclusive: {fontSize: 9, color: '#ff2e31',},
  labelWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor:'#9A9A9A',
    borderRadius:5,
    height: 20,
    top: 10,
    left:20,
  },
  roomType:{
      position: 'absolute',
      top: 0,
      left:0,
  },
  labelText: {color: '#fff', fontSize: 12, marginLeft: 8,marginRight:8,},
  live_status_common:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      backgroundColor:'rgba(238,238,238,0.5)',
      borderWidth:1,
      borderColor:'#00a6ea',
      borderRadius:5,
      height: 20,
      top: 10,
      right:10,
  },
  liveRemind:{
      backgroundColor:'rgba(229,229,229,0.2)',
      borderColor:'#FF6600',
  },
  liveReming:{
      backgroundColor:'rgba(229,229,229,0.2)',
      borderColor:'#00a6ea',
  },
  lived:{
      backgroundColor:'rgba(0,0,0,0.5)',
      borderColor:'#000000',
  },
  live_status_Textcommon:{
      fontSize: 12,
      marginLeft: 8,
      marginRight:8,
  },
  liveRemindText:{
      color:'#FF6600',
  },
  livingText:{
      color:'#00a6ea',
  },
  livedText:{
       color:'#000000',
   },
  titleWrapper:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      backgroundColor:'rgba(154,154,154,0.5)',
      borderRadius:5,
      bottom: 10,
      paddingVertical:2,
      left:20,
  },
  triangle: {
    position: 'absolute',
    top: 0,
    right: -10,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 10,
    borderTopWidth: 20,
    borderRightColor: 'transparent',
    borderTopColor: 'rgba(0,0,0,0.5)'
  },
  bottomLabel: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: 49,
    height: 18,
    backgroundColor: 'rgba(0,0,0,0.5)',
    bottom: 10,
    left: 12,
    borderRadius: 20
  },
  counts: {color: '#00a6ea', fontSize: 12, marginLeft: 4,marginTop:3},
  counts2: {color: '#00a6ea', fontSize: 12, marginLeft: 4,marginTop:4},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 211,
    backgroundColor: '#9DD6EB',
    resizeMode: Image.resizeMode.cover,
  },
  onlineNumbers:{
    flexDirection:'row',
    alignItems:'center',
  },
  peoples:{
      marginTop:5
  },
  labels:{
    flexDirection:'row',
    alignItems:'center',
  },
  label:{
    backgroundColor:'#fff',
    borderRadius:10,
    borderWidth:0.6,
    borderColor:'#00A6EA',
    paddingHorizontal:5,
    paddingVertical:2,
    marginRight:10,
},
text:{
    fontSize:11,
}
});

class LiveCastList extends Component {
  state = {
    default_face_url: require('../../static/images/study/course_defaultbg.jpg'),
    defaultAnchor:require('../../static/images/live/anchor.png'),
    lock:require('../../static/images/live/lock.png'),
    rmb:require('../../static/images/live/rmb@2x.png'),
    people:require('../../static/images/live/people.png'),
  }
  alert = () => {
    platform=='ios' ?
    AlertIOS.alert(
        '提示',
        '请先登录',
        [
          {text: '取消'},
          {text: '登录', onPress: () => Actions.LoginScreen(), },
        ],
        { cancelable: false }
    )
    :
    Actions.LoginScreen()
  }

  render() {
    const {id, xz_live_id, channel_name,teacher_name,title,teacher_label,channel_description, remind, favorite, channel_status, start_time, pic, face_url, view_num,online_num, favorite_num, live_status,type} = this.props.list;
    return (
        <View style={styles.list}>
          <View style={styles.listHeader}>
            <View style={styles.listHeaderLeft}>
              {
                pic ?
                    <View style={styles.avatarWrapper}>
                      <Image source={{uri: pic}} style={styles.avatar}/>
                    </View> : <Image source={this.state.defaultAnchor} style={styles.head} />
              }
              <View style={styles.textWrapper}>
                <View style={{flexDirection: 'row',}}>
                  <Text style={styles.teacher}>{teacher_name}</Text>
                </View>

                <View style={styles.labels}>
                    {teacher_label && teacher_label.length>0 && teacher_label.map((value,index)=>{
                            return <View style={styles.label} key={index}>
                                <Text style={styles.text}>{value}</Text>
                            </View>
                    })}
                </View>
              </View>
                <View style={styles.onlineNumbers}>
                   <Image source={this.state.people} style={styles.peoples}/>
                   <Text style={platform==="android"?styles.counts:styles.counts2}>{live_status === 1 ? online_num : view_num}</Text>
                </View>
            </View>

          </View>
          <View>
            <TouchableHighlight onPress={() => this.props.action(id,type,live_status)}>
              {(() => {
                if (face_url && face_url != "") {
                  return <ResponsiveImage source={{uri: face_url}} style={{width: global_width-20, height: (global_width-20)/1.95}}
                                resizeMode={"cover"}/>
                } else {
                  return <Image source={this.state.default_face_url}
                                style={{width: global_width-20, height:(global_width-20)/1.95}} resizeMode={"cover"}/>
                }
              })()}
              {/*<Image source={{uri: face_url}} style={styles.slide}/>*/}
            </TouchableHighlight>
            {/* {
              live_status == 1 ? <View style={styles.labelWrapper}>
                <Icon name="microphone" size={12} color="#fff"/>
                <Text style={styles.labelText}>正在直播</Text>
                <View style={styles.triangle}/>
              </View> : null
            } */}

            {
              live_status == 2 ?
                  (<View style={styles.labelWrapper}>
                    {/* <Icon name="volume-up" size={12} color="#fff"/> */}
                    <Text style={styles.labelText}>开播时间：{start_time}</Text>
                  </View>) : null
            }
            {
              live_status == 1 ?
                  (<View style={[styles.live_status_common,styles.liveReming]}>
                    <Text style={[styles.live_status_Textcommon,styles.livingText]}>直播中</Text>
                  </View>) : null
            }
            {
              live_status == 2 ?
                  (<View style={[styles.live_status_common,styles.liveRemind]}>
                    <Text style={[styles.live_status_Textcommon,styles.liveRemindText]}>即将开播</Text>
                  </View>) : null
            }
            {/* {
              live_status == 3 ?
                  (<View style={[styles.live_status_common,styles.lived]}>
                    <Text style={[styles.live_status_Textcommon,styles.livedText]}>直播已结束</Text>
                  </View>) : null
            } */}

            {title !== "" ?
                <View style={styles.titleWrapper}>
                  <Text style={styles.labelText}>{title.length>18?title.substr(0,18)+'...':title}</Text>
                </View>:null
            }

            {
              1 == type ? <View style={styles.roomType}>
                <Image source={this.state.lock} style={{width:25,height:25}} />
              </View> : null
            }
            {
              2 == type ? <View style={styles.roomType}>
                <Image source={this.state.rmb} style={{width:25,height:25}} />
              </View> : null
            }

            <View></View>

            {
              live_status == 2 ?
                  <View>
                    <View style={styles.btnWrapper}>
                      {
                        remind === 0 ?
                            <TouchableHighlight style={styles.touchable} onPress={() => {
                              if (this.props.user.user_ticket) {
                                this.props.addRemind(id)
                              } else {
                                this.alert()
                              }
                            }}>
                              <Text style={styles.btnText}>直播提醒</Text>
                            </TouchableHighlight> : <TouchableHighlight
                                style={[styles.touchable, styles.untouchable]}
                                onPress={() => {
                                  if (this.props.user.user_ticket) {
                                    this.props.deleteRemind(id)
                                  } else {
                                    this.alert()
                                  }
                                }}>
                              <Text style={styles.btnText}>取消提醒</Text>
                            </TouchableHighlight>
                      }
                    </View>
                  </View>
                  :
                  null
                  // <View>
                  //   <View style={styles.btnWrapper}>
                  //     {
                  //       favorite === 0 ?
                  //           <TouchableHighlight underlayColor={'rgba(255,255,255,0.4)'} style={styles.touchable}
                  //                               onPress={() => {
                  //                                 if (this.props.user.user_ticket) {
                  //                                   this.props.toggleFavorite(xz_live_id)
                  //                                 } else {
                  //                                   this.alert()
                  //                                 }
                  //                               }}>
                  //             <Text style={styles.btnText}>+关注</Text>
                  //           </TouchableHighlight> : <TouchableHighlight
                  //               underlayColor={'rgba(255,255,255,0.4)'}
                  //               style={[styles.touchable, styles.untouchable]}
                  //               onPress={() => {
                  //                 if (this.props.user.user_ticket) {
                  //                   this.props.toggleFavorite(xz_live_id)
                  //                 } else {
                  //                   this.alert()
                  //                 }
                  //               }}>
                  //             <Text style={styles.btnText}>取消关注</Text>
                  //           </TouchableHighlight>
                  //     }
                  //   </View>
                  // </View>

            }
          </View>
        </View>
    )
  }
}

export default connect(({user})=>{return {user: user.userInfo}}, null)(LiveCastList)
