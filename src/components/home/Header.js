/**
 * Created by zhaolong on 2017/03/20.
 * File description:首页-顶部搜索框
 */
'use strict'

import React, {Component} from "react";

import {Animated, Image, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View} from "react-native";
import {connect} from "react-redux";
import {Actions} from "react-native-router-flux";
import {global_width, platform} from "../../util";
import {glo_url} from "../../api/global";
import {fetchUserinfoDetailData} from "../../actions/UserInfo";
class Header extends Component {
  state = {
    account: false,
    bHaveMsg: false,
    bIslogin: false,
  }
  static defaultProps = {
    bHaveMsg: true,
    search_icon: require('../../static/images/home/search.png'),
    msg_icon: require('../../static/images/home/message.png'),
    msg_iconFixed: require('../../static/images/home/message2.png'),
    msg_icons: require('../../static/images/home/messages.png'),
    msg_iconsFixed: require('../../static/images/home/messages2.png'),

  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (this.props.user.user_ticket !== '') {
      this.props.fetchUserinfoDetailData();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.user !== nextProps.user) {
      if (nextProps.user && nextProps.user.user_ticket) {
        this.props.fetchUserinfoDetailData();
      }
    }
  }

  onFocus() {
    Actions.Search();
  }

  //消息点击
  onClickedMsg() {
    if (this.props.user.user_ticket !== '') {
      Actions.XZWebView({title: '消息中心', url: glo_url + '/user/message'});
    } else {
      Actions.LoginScreen();
    }
  }

  render() {
    const {userInfoDetail} = this.props
    return (
        <View style={styles.container}>
          <Animated.View style={[{
            height: platform === 'ios' ? 64 : 44,
            justifyContent: 'center',
            borderBottomColor: '#eeeeee',
            borderBottomWidth: this.props.bFixed ? 0.5 : 0
          }, {backgroundColor: this.props.interpolatedColor}]}>
            <View style={styles.inputArea}>
              <View style={{
                borderWidth: 0.5,
                height: 30,
                borderColor: '#d5d5d5',
                backgroundColor: '#fff',
                width: global_width * 0.8,
                flexDirection: 'row',
                borderRadius: 4,
                alignItems: 'center',
                opacity: 0.9,
              }}>
                <View style={styles.search}>
                  <Image style={styles.search_icon} source={this.props.search_icon}/>
                </View>
                <TextInput style={styles.searchBox} underlineColorAndroid={'transparent'} placeholder="搜索课程"
                           onFocus={() => this.onFocus()} onChangeText={(text) => this.setState({account: text})}/>
              </View>

              <TouchableWithoutFeedback onPress={() => this.onClickedMsg()}>
                <View style={styles.msg}>
                  {(() => {
                    if (this.props.user.user_ticket !== '' && userInfoDetail) {
                      if (!this.props.bFixed) {
                        return <Image style={styles.msg_icon}
                                      source={userInfoDetail.message_num == 0 ? this.props.msg_icon : this.props.msg_icons}/>
                      } else {
                        return <Image style={styles.msg_icon}
                                      source={userInfoDetail.message_num == 0 ? this.props.msg_iconFixed : this.props.msg_iconsFixed}/>
                      }
                    } else {
                      if (!this.props.bFixed) {
                        return <Image style={styles.msg_icon} source={this.props.msg_icon}/>
                      } else {
                        return <Image style={styles.msg_icon} source={this.props.msg_iconFixed}/>
                      }
                    }
                  })()}
                </View>
              </TouchableWithoutFeedback>
            </View>
          </Animated.View>
        </View>
    )
  }
}

const mapStateToProps = ({user, userInfo, common}) => {
  return {
    user: user.userInfo,
    userInfoDetail: userInfo.userInfoDetail,
    loading: common.loading,
  }
}

export default connect(mapStateToProps, {fetchUserinfoDetailData})(Header)
const styles = StyleSheet.create({
  container: {
    position: 'absolute', top: 0, width: global_width, zIndex: 100,
  },
  inputArea: {
    flexDirection: "row",
    marginTop: platform === 'ios' ? 18 : 0,
    paddingHorizontal: 15,
    justifyContent: 'space-between'
  },
  search: {
    marginLeft: 8, justifyContent: 'center'
  },
  search_icon: {
    width: 15,
    height: 15,
  },
  searchBox: {
    flex: 1,
    paddingTop: platform === 'ios' ? 9 : 0,
    paddingBottom: platform === 'ios' ? 5 : 0,
    fontSize: 13,
    marginLeft: 6
  },
  msg: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  msg_icon: {
    width: 27,
    height: 20,
  }
})
