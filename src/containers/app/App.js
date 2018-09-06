'use strict';
import React, {Component} from 'react';
import {Platform, StyleSheet, View,Image} from 'react-native';
import RNIdle from 'react-native-idle';
import ResponsiveImage from 'react-native-responsive-image';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {global_height, global_width} from '../../util/screen';
import {platform} from '../../util/platform';
import Orientation from 'react-native-orientation';

import {getUserInfo} from '../../actions/User';
import GlobalStorage from './globalStorage';
import {checkUpdate, downloadUpdate, switchVersionLater,packageVersion} from 'react-native-update';
import _updateConfig from '../../../update.json';
import {post} from '../../helpers/helpers'

const BuildVersionKey = 'BuildVersionKey';
const BuildVersion = '1.0.0';
const {appKey} = _updateConfig[Platform.OS];

class App extends Component {
  state = {
    bShowNewFeature: false,
    appLaunchImage: require('../../static/images/home/appLaunch.jpg'),
  }
  //检测后端版本
  checkVersion = async () => {
      try{
          let res = await post('mv1/update/check', {
            current_version:packageVersion,
            platform:platform,
            user_id:this.props.userInfo ? this.props.userInfo.user_id : 0
          })
          if(res){
            if(res.update === 1){
                Actions.Home({upgrade:res.update,content:res.content,url:res.url});
            }else{
                Actions.Home({upgrade:0});
            }
         }
      } catch (err) {
          Actions.Home({upgrade:0});
      }
  }
  componentWillMount() {
    this.props.getUserInfo();
    // this.checkUpdate();//热更新
    // this.checkVersion();
    // setTimeout(() => {
    //   Actions.Home({upgrade:this.upgrade,content:this.content});
    // }, 3000);

    // const {isResetFromNewFeature} = this.props;
    //
    // if (!isResetFromNewFeature) {
    //     GlobalStorage.load(BuildVersionKey)
    //         .then(version => {
    //             if (version != BuildVersion) {
    //                 GlobalStorage.save(BuildVersionKey, BuildVersion);
    //
    //                 this.setState({bShowNewFeature:true});
    //             } else {
    //                 setTimeout(()=>{
    //                     Actions.Home();
    //                 },3000);
    //             }
    //         })
    // }

    // var initial = Orientation.getInitialOrientation();
    //   if (initial === 'PORTRAIT') {
    //     //do stuff
    //   } else {
    //     //do other stuff
    //   }
  }

  componentDidMount() {
    // 只允许竖屏
    Orientation.lockToPortrait();
    // Actions.Home();
    this.checkVersion();
    // 只允许横屏
    // Orientation.lockToLandscape();
    // alert(packageVersion);

    RNIdle.disableIdleTimer()    //保持屏幕常亮
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.userInfo !== nextProps.userInfo) {
      //   Actions.Home();
    }
  }

  //执行更新
  doUpdate(info) {
    downloadUpdate(info).then(hash => {
      switchVersionLater(hash)
    }).catch(err => {
      //   Alert.alert('提示', '更新失败.');
    });
  }

  //检查更新
  checkUpdate() {
    checkUpdate(appKey).then(info => {
      if (info.expired) {

      } else if (info.upToDate) {

      } else {
        this.doUpdate(info)
      }
    }).catch(err => {
      //   Alert.alert('提示', '更新失败.');
    });
  }

  render() {
    return (
        <View style={{flex: 1}}>
          {/* {(()=>{
                    if(this.state.bShowNewFeature){
                        return <View>
                            <NewFeature/>
                        </View>
                    }else {
                        return <View>
                            <Image style={styles.startBg} source={{uri:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1497335189851&di=a4868d10ff63dc4cb8cf5cf637253777&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F011cc35543ad3b0000019ae95af0d5.jpg'}}/>
                        </View>
                    }
            })()} */}
          {platform == "android" ?
              <View>
                <ResponsiveImage style={styles.startBg} initHeight={global_height} source={this.state.appLaunchImage}/>
              </View> : null
          }
        </View>
    );
  }
}

const mapStateToProps = ({user, common}) => {
  return {
    userInfo: user.userInfo,
    loading: common.loading,
  }
}
export default connect(mapStateToProps, {getUserInfo})(App);

const styles = StyleSheet.create({
  startBg: {
    width: global_width,
    height: global_height,
  }
});
