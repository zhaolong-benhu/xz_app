/**
 * Created by zhaolong on 2017/11/2.
 * File description:直播视频title
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Share
} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";

export default class LiveTitle extends Component {
    _share = () => {
      if(this.props.from == "liveroom"){//直播分享
        Share.share({
          message: `我是${this.props.liveRoomInfo.live_user_name},${this.props.liveRoomInfo.live_status == 1?"正在":"将要"}直播《${this.props.liveRoomInfo.course_name}》,快来看看吧。 http://m.9first.com/liveshare/${this.props.id}`,
          url: `http://m.9first.com/liveshare/${this.props.id}`,
          title: '快来先之云课堂看直播！'
        }, {
          dialogTitle: '直播分享',
          excludedActivityTypes: [
            'com.apple.UIKit.activity.PostToTwitter'
          ],
          tintColor: 'green'
        })
      }else{//历史回看视频分享
        Share.share({
          message: `我是先之小九,正在观看直播视频《${this.props.title}》,快来看看吧。 http://m.9first.com/liveshare/${this.props.id}`,
          url: `http://m.9first.com/liveshare/${this.props.id}`,
          title: '快来先之云课堂看直播！'
        }, {
          dialogTitle: '直播视频分享',
          excludedActivityTypes: [
            'com.apple.UIKit.activity.PostToTwitter'
          ],
          tintColor: 'green'
        })
      }

    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={()=>this.props.back()}>
                  <View style={styles.styleBtn}>
                        <Ionicons name="ios-arrow-back-outline" size={30} color="#FFFFFF" style={{backgroundColor:'transparent'}}/>
                  </View>
                </TouchableOpacity>
                <View style={{flex:3,alignItems:'center'}}>
                  <Text style={{color:'#fff',fontSize:16,backgroundColor:'transparent'}}>
                    {this.props.title && this.props.title.length>15?this.props.title.substr(0,15)+'...':this.props.title}
                  </Text>
                </View>
                <TouchableOpacity underlayColor={'yellow'} onPress={this._share}>
                  <View style={styles.styleBtn}>
                      <Ionicons name="md-share" size={this.props.type? 25 : 20} color="#ffffff" style={{backgroundColor:'transparent'}}/>
                  </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // paddingHorizontal:10,
    },
    styleBtn:{
      borderRadius: 100,
      width: 45,
      height: 45,
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor:'#3d403e',
    }
});
