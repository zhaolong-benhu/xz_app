/**
 * Created by qzy on 24/06/2017.
 * File description:IOS推流
 */
import React, { Component } from 'react';
import { requireNativeComponent,NativeModules } from 'react-native';
export default class LiveComponent extends Component {
  static addUrl (url,beauty=true) {
    LiveFunction.addUrl(url,beauty);
  }
  static rotateCamera() {
    LiveFunction.rotateCamera()
  }
  static stopPush() {
    LiveFunction.stopPush()
  }
  static zoomSize(zoom){
    LiveFunction.zoomSize(zoom)
  }
  render() {
    return <Live />;
  }
}

LiveComponent.propTypes = {

};

var Live = requireNativeComponent('LiveView', LiveComponent);
var LiveFunction = NativeModules.LiveViewManager;
// console.log(Live)
// CalendarManager.addUrl("rtmp://2000.livepush.myqcloud.com/live/2000_44c6e64e79af11e69776e435c87f075e?bizid=2000");
// setTimeout( () => CalendarManager.rotateCamera(), 5000)
