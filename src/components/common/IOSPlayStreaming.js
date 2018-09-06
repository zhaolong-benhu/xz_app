/**
 * Created by qzy on 24/06/2017.
 * File description:IOS看推流
 */
import React, {Component, PropTypes,} from 'react';
import { requireNativeComponent,NativeModules } from 'react-native';
export default  class IOSPlayStreaming extends Component {
  static addPlayUrl (url) {
    // console.log('play: '+ url)
    LiveFunction.addPlayUrl(url);
  }
  static stopPlay() {
    LiveFunction.stopPlay()
  }
  static zoomSize(zoom){
    LiveFunction.zoomSize(zoom)
  }
  render() {
    return <Play />;
  }
}
IOSPlayStreaming.propTypes = {

};

var Play = requireNativeComponent('PlayView', IOSPlayStreaming);
var LiveFunction = NativeModules.PlayViewManager;
