/**
 * Created by qzy on 10/05/2017.
 * File description:
 */
import React, {
  Component
} from 'react';
import {
  Platform,
  BackAndroid,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux'
import { VideoPlayer, Alert } from '../../components';
import { post } from '../../helpers/helpers';
import { backAndRefresh } from '../../actions';
import Orientation from 'react-native-orientation';
import _ from 'lodash';
class WatchVideo extends Component {
  state = {
    lecture_id: this.props.lecture_id,
    title: this.props.title,
    video_address: this.props.video_address,
  }

  componentDidMount() {
    Orientation.lockToLandscape();
    if (Platform.OS === 'android') {
       BackAndroid.addEventListener('hardwareBackPress', this.onBack);
    }
  }
   componentWillReceiveProps(nextProps){
        //  this.setState({
        //    lecture_id: nextProps.lecture_id,
        //    title: nextProps.title,
        //    video_address: nextProps.mp4_url,
        //  })
   }
  onLoad = () => {
    console.log('On load fired!');
  }

  loadStart() {
    console.log('loadStart');
  }

  onProgress = _.throttle((data) => {
    const {progress_id, course_id,} = this.props
    const lecture_id = this.state.lecture_id
    const times = Math.floor(data.currentTime)
    post('mv1/user/index/course-play-record', {progress_id, lecture_id, course_id, times})
  }, 15000)

  onEnd = async () => {
    //取消进度记录
    this.onProgress.cancel()
    //获取下一章节
    let newVideo = await post('mv1/user/index/change-lecture', {lecture_id: this.state.lecture_id})
    // console.log(newVideo)
    const {title, id, mp4_url } = newVideo
    if(id != this.state.lecture_id) {
      // console.log(1)
      this.setState({
        lecture_id: id,
        title: title,
        video_address: mp4_url,
      })
    } else {
      Alert('学习结束，请选择其他课程包')
      Actions.pop()
      this.props.backAndRefresh()
    }
  }
  //取消进度记录，返回页面，刷新数据
  onBack = () => {
    this.onProgress.cancel()
    Actions.pop()
    this.props.backAndRefresh()
    return true;
  }
  onError = (err) => {
    //Actions.pop();
    Alert('播放错误')
  }
  render() {
    return (
				<VideoPlayer
						source={{uri: this.state.video_address}}
						// seekerPosition = { this.props.lastTime || 0 }
						playInBackground={ false }   // play audio when entering background
						playWhenInactive={ false }   // [iOS] continuing playing when notification centre active
						resizeMode={ 'contain' }     // 'contain' or 'cover' should be used.
						repeat={ false }             // Repeats at end of duration
						title={this.state.title}     // Video title, if null title area is hidden
						ref={(ref) => {this.player = ref}}
						// settings
						controlTimeout={ 15000 }     // hide controls after ms of inactivity.
						videoStyle={{}}            // Style appended to <Video> component
						style={{}}                 // Style appended to <View> container
						// event callbacks
						onError={ this.onError }         // Fired when an error is encountered on load
						onBack={ this.onBack }          // Function fired when back button is pressed.
						onEnd={ this.onEnd }           // Fired when the video is complete.
						onLoadStart={ this.loadStart }            // Callback when video starts to load
						onLoad={ this.onLoad }
						onProgress={ this.onProgress }
				/>
    )
  }
}

export default connect(null,{ backAndRefresh, })(WatchVideo)
