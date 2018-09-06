/**
 * Created by qzy on 20/03/2017.
 * File description:直播列表页面
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Button,
  Text,
  TouchableWithoutFeedback,
  TouchableHighlight,
  ScrollView,
  ListView,
  RefreshControl,
  StatusBar,
  ToastAndroid,
  Modal,
  NetInfo,
  AlertIOS,
} from 'react-native';
import { platform, global_height, global_width} from '../../util';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Swiper from 'react-native-swiper';
import ResponsiveImage from 'react-native-responsive-image';
import {
  LiveCastList,
  Loading,
  ButtonRight,
  Alert
} from '../../components';
import {
  getLiveList,
  clearLiveList,
  addRemind,
  deleteRemind,
  passIdAndStatusToRoom,
  changeLiveFavorite,
  clearLiveRomm
} from '../../actions/Live';
import {fetchLiveroomValid,fetchCoursewareData,fetchLiveroomUserinfo,fetchHistoricalReviewData,getLiveWatchRoom} from '../../actions';
// import {fetchCoursewareData} from '../../actions/Courseware';
// import {fetchLiveroomUserinfo} from '../../actions/AnchorRoom';
// import {fetchHistoricalReviewData} from '../../actions/HistoricalReview';

class LiveCast extends Component {
  constructor(props) {
    super(props)
    this.onEndReachedCount = 0 //记录onEndReached次数，防止第一次获取两次数据
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      isRefreshing: false,
    },
    this.id = 0,
    this.caster_status = 0,
    this.liveType = 1;
  }

  componentWillMount() {
    //取第一页
    this.props.getLiveList(1);
    // this._onRefresh()

     //检测网络连接信息
       NetInfo.fetch().done((connectionInfo) => {
           this.connectionInfo = connectionInfo;
       });
  }
  componentWillReceiveProps(nextProps) {
    //设置列表数据
    const setLiveViewState = () => {
      console.log('直播列表渲染了')
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.liveLists),
      });
    }

    if (nextProps.liveLists) {
        setLiveViewState()
    }

    if(this.props.liveRoomValidData !== nextProps.liveRoomValidData){
        if(nextProps.liveRoomValidData.is_valid == 1){//密码已经验证过/付款过-直接进入直播间
            //获取直播间信息
            this.props.getLiveWatchRoom(this.id);
            //开始获取课件数据
            this.props.fetchCoursewareData(this.id);
            //开始获取直播详情数据
            this.props.fetchLiveroomUserinfo(this.id);
            //开始获取历史回看数据
            this.props.fetchHistoricalReviewData(this.id);
            Actions.AnchorRoom({id:this.id, caster_status:0});
        }else {
            Actions.PasswordRoom({id:this.id,liveType:this.liveType,from:"livelist"});//进入验证界面
    }
  }
  }
  _onRefresh = () => {
    if(!this.props.listLoading){
      //清楚数据重新获取
      this.onEndReachedCount = 0;
      this.props.clearLiveList();
      this.setState({
        dataSource: null
      });
      //获取第一页
      this.props.getLiveList(1)
    }
  }
  continueLook(){
    if(this.liveType == 0){//免费
        //获取直播间信息
        this.props.getLiveWatchRoom(this.id);
        //开始获取课件数据
        this.props.fetchCoursewareData(this.id);
        //开始获取直播详情数据
        this.props.fetchLiveroomUserinfo(this.id);
        //开始获取历史回看数据
        this.props.fetchHistoricalReviewData(this.id);

        //进入直播间
        Actions.AnchorRoom({id:this.id,caster_status:0});
    }else{//密码或门票
        this.props.fetchLiveroomValid(this.id);
    }
  }
  passIdAndStatusToRoom = (id,liveType,live_status) => {
      this.id = id;
      this.liveType = liveType;
      this.live_status = live_status;
      //关闭清理主题模态窗数据
      this.props.clearLiveRomm();
      this.continueLook();
      // if(platform === "ios"){
      //   // Alert(this.connectionInfo);
      //     if(this.connectionInfo == "unknown"){//cell
      //         AlertIOS.alert(
      //             '您正在使用非Wi-Fi网络',
      //             '继续观看将产生流量费用，建议您在Wi-Fi环境下观看',
      //             [
      //               {text: '停止观看'},
      //               {text: '继续观看', onPress: ()=>{this.continueLook()} },
      //             ]
      //         )
      //     }else{
      //         this.continueLook();
      //     }
      //
      // }else {
      //     this.continueLook();
      // }
  }
//列表每一行
  renderList(list) {
    return <LiveCastList
        list={list}
        key={list.id}
        addRemind={this.props.addRemind}
        deleteRemind={this.props.deleteRemind}
        toggleFavorite={this.props.changeLiveFavorite}
        action={(id,liveType,live_status) => this.passIdAndStatusToRoom(id,liveType,live_status)}
    />
  }
  _onEndReached = () => {
    // console.log(this.props.current_page,  this.props.total_page)
      //防止第一次获取两次数据
      this.onEndReachedCount += 1;
      if(this.onEndReachedCount === 1) {
        return false
      }
      if(this.props.current_page < this.props.total_page ){
        this.props.getLiveList(this.props.current_page+1)
      }
  }
  componentWillUnmount() {
    this.props.clearLiveList()
  }

  render() {
    return (
        <View style={{paddingTop: platform === "ios" ? 20 : 0, paddingBottom: 100,backgroundColor:'#FFFFFF'}}>
              <StatusBar barStyle='dark-content'/>
              <View style={{height:40,width:global_width,backgroundColor:'#00A6EA',justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:'#FFFFFF'}}>直播大厅</Text>
              </View>
              <View style={{borderTopWidth:1,borderTopColor:'#eee'}}>
                <ListView
                    refreshControl={
                      <RefreshControl
                          refreshing={this.state.isRefreshing}
                          onRefresh={this._onRefresh}
                          tintColor="#ccc"
                          title="加载中..."
                          titleColor="#ccc"
                          colors={['#aaa', '#ccc', '#eee']}
                          progressBackgroundColor="#fff"
                      />
                    }
                    pageSize={10}
                    enableEmptySections
                    dataSource={this.state.dataSource}
                    renderRow={this.renderList.bind(this)}
                    onEndReached={this._onEndReached}
                    onEndReachedThreshold={100}
                    style={{height: global_height - (platform === 'ios' ? 74: 54) }}
                />
              </View>
        </View>
    )
  }
}

const mapStateToProps = ({live, user, banner,passwordRoom,coursewareList,anchorRoomUserinfo,historicalReviewList}) => {
  return {
    liveLists: live.liveLists,
    listLoading: live.listLoading,
    user: user.userInfo,
    bannerData: banner.bannerData,
    total_page: live.total_page,
    current_page: live.current_page,
    liveRoomValidData: passwordRoom.liveRoomValidData,
    CoursewareData: coursewareList.CoursewareData,
    liveUserinfoData:anchorRoomUserinfo.liveUserinfoData,
    historyreviewData:historicalReviewList.historyreviewData,
  }
}

export default connect(mapStateToProps, {
  getLiveList,
  addRemind,
  deleteRemind,
  passIdAndStatusToRoom,
  changeLiveFavorite,
  clearLiveList,
  clearLiveRomm,
  fetchLiveroomValid,
  fetchCoursewareData,
  fetchLiveroomUserinfo,
  fetchHistoricalReviewData,
  getLiveWatchRoom,
})(LiveCast)

const styles = StyleSheet.create({
  dot: {
    backgroundColor: 'rgba(255,255,255,.4)',
    width: 5,
    height: 5,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3
  },
  activeDot: {
    backgroundColor: '#fff',
    width: 5,
    height: 5,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3
  },
  paginationStyle: {
    bottom: 10,
    left: null,
    right: 10
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 140,
    backgroundColor: '#9DD6EB',
    resizeMode: Image.resizeMode.cover,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },

})
