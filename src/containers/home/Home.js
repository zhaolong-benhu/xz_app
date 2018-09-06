/**
 * Created by zhaolong on 2017/03/20.
 * File description:首页
 */
'use strict'

import React, {Component} from "react";

import {Animated, ScrollView, StatusBar, StyleSheet, View,Dimensions, Platform} from "react-native";

import {
  // LiveViewPager,
  FreeCourse,
  Header,
  HomeBanner,
  OccupationCertificate,
  OnlineCourse,
  OpenCourse,
  Plates,
  Seckill,
  Teacher,
  Alert,
  AppUpgrade,
} from "../../components";
import {connect} from "react-redux";
import {fetchBannerList, logout} from "../../actions";
import {global_width,global_height} from '../../util';
import {post} from '../../helpers/helpers'
import {isIphoneX,ifIphoneX} from '../../components/common/IPhoneX';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bFixed: false,
      bShowAppupgrade:true,
      // upgrade:0,
      // content:["1.直播现在更改为横屏直播。","2.直播间新增课件板块。","3.历史直播视频可在线观看。",],
      animatedValue: new Animated.Value(0)
    };
  }

  componentWillMount() {
    // this.TestVersion();
    if (this.props.action && this.props.action == 'logout') {
      this.props.logout();
    }
    //头部广告
    this.props.fetchBannerList();

    let dimen = Dimensions.get('window');

    // if(isIphoneX()){
    //     Alert("您的设备是IPhoneX");
    // }else {
    //     Alert("您的设备不是IPhoneX");
    // }
    // Alert("width"+dimen.width+"height"+dimen.height);
  }
  //检测后端版本
  TestVersion = async () => {
      let res = await post('mv1/update/check', {
        current_version:"1.1.0"
      })
      if(res){
        // var data = JSON.stringify(res);
        if(res.update === 1){
            this.setState({upgrade:1});
            this.setState({content:res.content});
        }
      }
  }
  //页面滑动
  onScroll = (event) => {
    if (this._distanceFromTop(event) > 20) {
      this.setState({bFixed: true});
    } else {
      this.setState({bFixed: false});
    }
  }

  //求距离顶部的距离
  _distanceFromTop(event) {
    let {
      contentSize,
      contentInset,
      contentOffset,
      layoutMeasurement,
    } = event.nativeEvent;

    let scrollOffset = contentOffset.y;

    return scrollOffset;
  }

  onClose(){
    this.setState({bShowAppupgrade:false});
  }
  render() {
    //滚动
    let event = Animated.event(
        [{
          nativeEvent: {
            contentOffset: {
              y: this.state.animatedValue
            }
          }
        }],
        {
          listener: this.onScroll//监听
        }
    );

    let interpolatedColor = this.state.animatedValue.interpolate({
      inputRange: [0, 40],
      outputRange: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)'],
    });

    return (
        <View style={styles.container}>
          <StatusBar
              barStyle='light-content'
          />
          {
            this.state.bFixed ? <StatusBar
                barStyle='dark-content'
            /> : <StatusBar
                barStyle='light-content'
            />
          }
          <Header bFixed={this.state.bFixed} interpolatedColor={interpolatedColor}/>
          <ScrollView onScroll={event} scrollEventThrottle={16} style={{position: 'relative', top: -20,}}>
            <HomeBanner bannerData={this.props.bannerData}/>
            <Plates/>
            {/* <Seckill/> */}
             <FreeCourse title="免费好课"/>
             <OnlineCourse title="在线课程"/>
             <OpenCourse title="线下公开课"/>
             <Teacher title="人气导师"/>
            <OccupationCertificate title="IHMA证书"/>
          </ScrollView>
          {this.state.bShowAppupgrade && this.props.upgrade === 1 ?
              <AppUpgrade onClose={()=>this.onClose()} content={this.props.content} url={this.props.url}/>
              :
              null
          }
        </View>
    )
  }
}
const mapStateToProps = ({user, banner}) => {
  return {
    user: user.userInfo,
    bannerData: banner.bannerData
  }
}
export default connect(mapStateToProps, {fetchBannerList, logout})(Home)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 40
  }
})
