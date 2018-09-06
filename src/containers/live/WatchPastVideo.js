/**
 * Created by qzy on 28/06/2017.
 * File description:观看视频
 */
import React, {Component, PropTypes,} from 'react';
import {
  Platform,
  BackAndroid,
} from 'react-native';
import { Actions } from 'react-native-router-flux'
import { VideoPlayer, Alert } from '../../components';
import Orientation from 'react-native-orientation';
import { backAndOpenThemeModal } from "../../actions";
import {connect} from "react-redux";

class WatchPastVideo extends Component {
  componentDidMount() {
    Orientation.lockToPortrait();
    if (Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', this.onBack);
    }
  }
  onBack = () => {
    this.props.backAndOpenThemeModal()
    Actions.pop()
  }
  onError = () => {
    Actions.pop();
    Alert('播放错误')
  }

  render() {
    return (
        <VideoPlayer
            source={{uri: this.props.video_address}}
            // seekerPosition = { this.props.lastTime || 0 }
            playInBackground={ false }   // play audio when entering background
            playWhenInactive={ false }   // [iOS] continuing playing when notification centre active
            resizeMode={ 'cover' }     // 'contain' or 'cover' should be used.
            repeat={ false }             // Repeats at end of duration
            title={this.props.title}     // Video title, if null title area is hidden
            ref={(ref) => {
              this.player = ref
            }}
            // settings
            controlTimeout={ 15000 }     // hide controls after ms of inactivity.

            // event callbacks
            onError={ this.onError }         // Fired when an error is encountered on load
            onBack={ this.onBack }          // Function fired when back button is pressed.
            onEnd={ this.onBack }           // Fired when the video is complete.
        />
    );
  }
}

export default connect(null, {backAndOpenThemeModal})(WatchPastVideo)
