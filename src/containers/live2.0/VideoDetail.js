/**
 * Created by zhaolong on 2017/10/27.
 * File description:历史回看 视频详情
 */

'use strict'

import React,{Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    ViewPagerAndroid,
    TouchableWithoutFeedback,
    TouchableOpacity,
    NativeModules,
    ListView,
    BackAndroid,
    AlertIOS,
    ToastAndroid,
}from "react-native";
import {
  LiveTitle,
  AnchorInformation,
  Interaction,
  Courseware,
  LiveDetail,
  HistoricalReview,
  Tips,
  Comment,
  VideoIntroduce,
  Alert,
  VideoPlayer,
} from '../../components';
import ViewPager from "react-native-viewpager";
import Orientation from 'react-native-orientation';
import {Actions} from 'react-native-router-flux';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {global_width,global_height,platform} from "../../util";
import {fetchVideodetailData} from "../../actions/VideoDetail";
import {fetchCoursewareData,changeLiveFavorite} from '../../actions';
import {connect} from "react-redux";
import RCTLive from "../../components/live/PlayerView";
const LiveNativeModule = NativeModules.LiveNativeModule;
import _ from 'lodash';

class VideoDetail extends Component {

    constructor(props) {
        super(props);

        let pages = [{
          title:"视频详情",
          key:"video-detail"
        },{
          title:"课件",
          key:"courseware"
        }];

        var dataSource = new ViewPager.DataSource({
          pageHasChanged: (p1, p2) => p1 !== p2,
        });

        this.state = {
            page:0,
            pages:pages,
            bAddfollow:false,
            followText:"关注",
            w:global_width,
            h:global_height,
            isFull:false,
            paused:false,//视频是否自动播放
            rate:1,
            dataSource:dataSource.cloneWithPages(pages),
        };
    }
    componentDidMount(){
      // Orientation.lockToLandscape();
      if (platform=== 'android') {
         BackAndroid.addEventListener('hardwareBackPress', this.onBack);
      }
    }
    componentWillReceiveProps(nextProps){
        // if(this.props.videodetailData != nextProps.videodetailData){
        //     this.setState({videodetailData:nextProps.videodetailData});
        // }
        // if(this.props.CoursewareData != nextProps.CoursewareData){
        //     this.setState({CoursewareData:nextProps.CoursewareData});
        // }
    }
    componentWillUnmount(){
      //退出直播间 关闭视频
      if(platform ==='android'){
        LiveNativeModule.stopPlay()
        BackAndroid.removeEventListener('hardwareBackPress', null);
      }else{
        this.onProgress.cancel()
      }
    }
    onLoad = () => {
      console.log('On load fired!');
    }

    loadStart() {
      console.log('loadStart');
    }

    onProgress = _.throttle((data) => {
      // const {progress_id, course_id,} = this.props
      // const lecture_id = this.state.lecture_id
      // const times = Math.floor(data.currentTime)
      // post('mv1/user/index/course-play-record', {progress_id, lecture_id, course_id, times})
    }, 15000)

    onEnd = async () => {
      Alert('视频观看结束，请选择其他历史直播视频')
      Actions.pop()
    }
      //返回上一页
    onBack = () =>{
      if(this.state.isFull){
        this.onFullScreen()
      }else{
        //退出直播间 关闭视频
        if(platform ==='android'){
          LiveNativeModule.stopPlay()
          BackAndroid.addEventListener('hardwareBackPress', this.onExitApp);
        }else{
          this.onProgress.cancel()
        }
        Actions.pop()
      }
      return true;
    }
    onError = () => {
      Actions.pop();
      Alert('播放错误')
    }
    goPage(index){
      if(platform == 'ios')
      {
        return;
      }
        this.viewPager.setPageWithoutAnimation(index);
        this.setState({page:index});
    }
    onPageSelected(e) {
       this.setState({page: e.nativeEvent.position});
     }
     alert = () => {
       platform=='ios' ?
       AlertIOS.alert(
           '提示',
           '请先登录',
           [
             {text: '取消',},
             {
               text: '登录', onPress: () => {
                 Actions.LoginScreen({liveId: this.props.live_id});
               }
             },
           ]
       )
       :
       Actions.LoginScreen();
     }

     _onChangePage(page: number | string) {
        this.setState({page: page});
      }
      _renderPage(data:Object,pageID: number | string,){
        switch (data.key) {
          case 'video-detail':
            return(
                <View style={{width:global_width}}>
                  <AnchorInformation
                      data={this.props.videodetailData}
                      {...this.props.liveRoomInfo}
                      type="2"
                      addFollow={() => {
                      if (this.props.user.user_ticket) {
                        this.props.changeLiveFavorite(this.props.user_id)
                      } else {
                        this.remind();//提示用户登录
                      }
                     }}
                  />
                  {this.props.videodetailData ?
                    <VideoIntroduce content={this.props.videodetailData}/>
                    :
                    null
                  }
                </View>
            )
            break;
          case 'courseware':
            return(
              <View style={{width:global_width,justifyContent:'center',alignItems:'center'}}>
                <Courseware data={this.props.CoursewareData} />
              </View>
            )
            break;
          default:
           return <View navigator={this.props.navigator} />
        }

      }

    //播放模式切换
    onFullScreen = () =>{
      //正常播放
      if(!this.state.isFull){
        Orientation.lockToLandscape() //横屏
        this.setState({isFull:true,w:global_height,h:global_width})
      }else{
        Orientation.lockToPortrait() //竖屏
        this.setState({isFull:false,w:global_width,h:global_height*9/16})
      }
    }
    remind(){
        this.alert();
        if(platform ==='android'){
          LiveNativeModule.stopPlay()
        }else{
          this.onProgress.cancel()
          this.setState({paused:true,rate:0});
        }
    }
    onExitApp = () => {
      if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
        //最近2秒内按过back键，可以退出应用。
       BackAndroid.exitApp();
      }
      this.lastBackPressed = Date.now();
      ToastAndroid.show('再按一次退出应用',ToastAndroid.SHORT)
      return true;
    };
    render(){
        var mp4_url = "";
        if(this.props.videodetailData){
            var url = this.props.videodetailData.mp4_sd_url;
            var temp = url.substr(5,url.length);
            mp4_url = "http"+temp;
            console.log("mp4_url:"+mp4_url);
        }
        return(
            <View style={styles.containter}>
                {platform == "ios" && this.props.videodetailData ?
                  <VideoPlayer
                      source={{uri:this.props.videodetailData.mp4_sd_url}} //http://video-xz.veimg.cn/210/7900/pc_hd/210_7900zD77pFGI.mp4
                      // seekerPosition = { this.props.lastTime || 0 }
                      playInBackground={ false }   // play audio when entering background
                      playWhenInactive={ false }   // [iOS] continuing playing when notification centre active
                      resizeMode={ 'contain' }     // 'contain' or 'cover' should be used.
                      repeat={ false }             // Repeats at end of duration
                      title={this.props.videodetailData.course_name}     // Video title, if null title area is hidden
                      ref={(ref) => {
                        this.player = ref
                      }}
                      paused={this.state.paused}
                      rate={this.state.rate}
                      // settings
                      controlTimeout={ 15000 }     // hide controls after ms of inactivity.
                      videoStyle={{}}            // Style appended to <Video> component
                      style={{height:120}}                 // Style appended to <View> container

                      // event callbacks
                      onError={ this.onError }         // Fired when an error is encountered on load
                      onBack={ this.onBack }          // Function fired when back button is pressed.
                      onEnd={ this.onEnd }           // Fired when the video is complete.
                      onLoadStart={ this.loadStart }            // Callback when video starts to load
                      onLoad={ this.onLoad }
                      onProgress={ this.onProgress }
                  />
                  :
                  <View style={this.state.isFull ? {width:this.state.w, height:this.state.h-25}: {width:this.state.w, height:this.state.w*9/16}}>
                    <RCTLive style={this.state.isFull ? {width:this.state.w, height:this.state.h-25}: {width:this.state.w, height:this.state.w*9/16}}
                            url={mp4_url}
                    />
                    <TouchableOpacity style={styles.androidfullscreen} underlayColor={'yellow'} onPress={()=>{this.onFullScreen()}}>
                        <FontAwesome name="arrows-alt" size={20} color="#ffffff" style={{backgroundColor:'transparent'}} />
                    </TouchableOpacity>
                  </View>
                }
                {platform==='ios'?
                  <TouchableOpacity style={styles.fullscreen} underlayColor={'yellow'} onPress={()=>{this.onFullScreen()}}>
                      <FontAwesome name="arrows-alt" size={20} color="#ffffff" style={{backgroundColor:'transparent'}} />
                  </TouchableOpacity>
                  :null
                }


                  {!this.state.isFull?
                          <View style={{flex:1,backgroundColor:'#fff'}}>
                                <View style={{height:48,flexDirection:"row",alignItems:"center",backgroundColor:"white",borderBottomWidth:1,borderBottomColor:"#e0e0e0"}}>
                                    <TouchableWithoutFeedback onPress={this.goPage.bind(this,0)}>
                                        <View style={styles.classify}>
                                            <Text style={this.state.page==0?{color:"#00A6EA"}:{}}>视频详情</Text>
                                                <View style={styles.currentpos}>
                                                    {this.state.page==0 &&
                                                        <FontAwesome name="sort-up" size={18} color="#00A6EA"/>
                                                    }
                                                </View>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={this.goPage.bind(this,1)}>
                                        <View style={{flex:1,alignItems:"center"}}>
                                            <Text style={this.state.page==1?{color:"#00A6EA"}:{}}>课件</Text>
                                            <View style={styles.currentpos}>
                                                {this.state.page==1 &&
                                                    <FontAwesome name="sort-up" size={18} color="#00A6EA"/>
                                                }
                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                                {platform === 'android' ?
                                    <ViewPagerAndroid
                                        onPageSelected={this.onPageSelected.bind(this)}
                                        style={{flex:1}}
                                        ref={viewPager => { this.viewPager = viewPager; }}
                                        initialPage={0}>

                                        <View style={{width:global_width}}>
                                            <AnchorInformation
                                                data={this.props.videodetailData}
                                                {...this.props.liveRoomInfo}
                                                type="2"
                                                addFollow={() => {
                                                if (this.props.user.user_ticket) {
                                                  this.props.changeLiveFavorite(this.props.user_id)
                                                } else {
                                                    this.remind();//提示用户登录
                                                }
                                               }}
                                            />
                                            {this.props.videodetailData ?
                                                <VideoIntroduce content={this.props.videodetailData}/>
                                                :
                                                null
                                            }
                                        </View>


                                         <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                         {this.props.CoursewareData ?
                                             <Courseware data={this.props.CoursewareData} />
                                             :
                                             null
                                         }
                                         </View>
                                    </ViewPagerAndroid>
                                    :
                                    <ViewPager
                                      dataSource={this.state.dataSource}
                                      renderPage={this._renderPage.bind(this)}
                                      onChangePage={this._onChangePage.bind(this)}
                                      ref={viewPager => { this.viewPager = viewPager; }}/>
                                }
                          </View>
                          :
                          null
                  }
                  {platform=='android' &&
                    <View style={[this.state.isFull ? styles.liveTitleFull : styles.liveTitle,{width:this.state.w}]}>
                         <LiveTitle back={()=>this.onBack()} id={this.props.videodetailData?this.props.videodetailData.id:0} type="historyVideo" title={this.props.videodetailData && this.props.videodetailData.course_name} />
                    </View>
                  }
            </View>
        )
    }
}

const mapStateToProps = ({videoDetail,anchorRoomUserinfo,coursewareList,user,liveWatchRoom}) => {
	return {
	     videodetailData: videoDetail.videodetailData,
         liveUserinfoData:anchorRoomUserinfo.liveUserinfoData,
         CoursewareData: coursewareList.CoursewareData,
         user: user.userInfo,
         liveRoomInfo: liveWatchRoom.liveRoomInfo
	}
}
export default connect(mapStateToProps, {fetchVideodetailData,fetchCoursewareData,changeLiveFavorite})(VideoDetail)
const styles = StyleSheet.create({
    containter:{
        flex:1,
        backgroundColor:'#000000'
    },
    img:{
        width:global_width,
        height:200,
    },
    liveTitle:{
      position:'absolute',
      top:0,
      zIndex:10,
      width:global_width,
      height:40,
    },
    liveTitleFull:{
      position:'absolute',
      top:0,
      zIndex:10,
      width:global_width,
      backgroundColor: 'rgba(0,0,0,0.4)',
      height:40,
    },
    classify:{
        flex:1,alignItems:"center",borderRightWidth:1,borderColor:'#ECECEC',
    },
    fullscreen:{
        position:'absolute',
        right:20,
        top:268,
        borderRadius: 100,
        width: 30,
        height: 30,
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#3d403e',
    },
    androidfullscreen:{
        position:'absolute',
        right:10,
        bottom:15,
        borderRadius: 100,
        width: 30,
        height: 30,
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#3d403e',
    },
    currentpos:{
        height:6,
    },
    delta:{
        width:13,
        height:6,
    },
    chat:{
        position:'absolute',
        bottom:0,
        zIndex:10,
        width:global_width,
        backgroundColor: 'rgba(0,0,0,0.4)',
    }
})
