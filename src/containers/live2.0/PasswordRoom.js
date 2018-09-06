/**
 * Created by zhaolong on 2017/10/19.
 * File description:支付+密码检验
 */
'use strict'
import React,{Component} from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    ListView,
    TextInput,
    Alert,
    ScrollView,
    BackAndroid
}from 'react-native';
import {Actions} from 'react-native-router-flux';
import {global_height, global_width, platform} from "../../util";
import ResponsiveImage from "react-native-responsive-image";
import {Alert as sAlert,PayModal,CheckoutPayment,renderIf} from '../../components';
import {connect} from 'react-redux';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {fetchLiveroomValid,fetchLiveroomValidpassword} from '../../actions/PasswordRoom';
import {fetchCoursewareData,fetchLiveroomUserinfo,fetchHistoricalReviewData,getOrderSuccess,toggleCheckoutModal,getLiveWatchRoom,fetchVideodetailData} from '../../actions';
import Ionicons from "react-native-vector-icons/Ionicons";

class PasswordRoom extends React.Component{

    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource:ds,
            head:require('../../static/images/live/castCover.jpg'),
            enter:require('../../static/images/live/enter.png'),
            lock:require('../../static/images/live/lock2.png'),
            rmbBg:require('../../static/images/live/rmbBg.jpg'),
            pwdBg:require('../../static/images/live/pwdBg.jpg'),
            defaultAnchor:require('../../static/images/live/anchor.png'),
            defaultStudent:require('../../static/images/live/student.png'),
            inputText:'',
            inputValue:'',
            type:1,
            showPayModal:false,
            isPay:false,
            from:'livelist',
        };
    }
    componentWillMount(){

    }
    componentDidMount(){
        this._genRows();
        if (platform === 'android') {
          BackAndroid.addEventListener('hardwareBackPress', this.goBack);
        }
    }
    componentWillReceiveProps(nextProps){
        //判断密码是否正确
        if(this.props.liveRoomValidpasswordData != nextProps.liveRoomValidpasswordData){
            if(nextProps.liveRoomValidpasswordData.is_valid == 1 ){
                if(this.props.to == "videodetail"){
                    //开始获取直播回看详情数据
                    this.props.fetchVideodetailData(this.props.id);
                    //开始获取课件数据
                    this.props.fetchCoursewareData(this.props.id);
                    Actions.VideoDetail({xz_live_id:this.props.id,user_id:this.props.user_id,is_favorite:this.props.is_favorite});
                }else{
                    //获取直播间信息
                    this.props.getLiveWatchRoom(this.props.id);
                    //开始获取课件数据
                    this.props.fetchCoursewareData(this.props.id);
                    //开始获取直播详情数据
                    this.props.fetchLiveroomUserinfo(this.props.id);
                    //开始获取历史回看数据
                    this.props.fetchHistoricalReviewData(this.props.id);
                    // Alert("密码输入正确");
                    Actions.AnchorRoom({id:this.props.id,caster_status:0});
                }
            }
        }
    }
    //初始化Liveview
    _genRows(){
        if(this.props.liveRoomValidData && this.props.liveRoomValidData.live_view_thumb){
            this.setState({dataSource:this.state.dataSource.cloneWithRows(this.props.liveRoomValidData.live_view_thumb)});
        }
    }
    //渲染参与用户
    renderList(rowData:object, sectionID: number, rowID: number){
        return(
            <View style={styles.users}>
                {rowData != ""?
                    <Image source={{uri:rowData}} style={styles.user}/>
                    :
                    <Image source={this.state.defaultStudent} style={styles.user}/>
                    }
            </View>
        )
    }

    //校验密码
    checkPwd(){
            if(this.state.inputValue != ""){
                this.props.fetchLiveroomValidpassword(this.props.id,this.state.inputValue);
            }else if(this.state.inputValue == ""){
                sAlert("密码不能为空~");
            }
    }
    //支付门票
    payEntranceticket(from){
        if(this.props.user && this.props.user.user_ticket!=""){
            this.setState({showPayModal:true});
        }
        else{
            this.alert()
        }
    }
    componentWillUnmount(){
      // clearInterval(this.timer)
      if (platform === 'android') {
        BackAndroid.removeEventListener('hardwareBackPress', null);
      }
    }
    //返回上一页
    goBack = async () =>{
        if(this.props.from && this.props.from == "liveroom"){
            //获取直播间信息
            // this.props.getLiveWatchRoom(this.props.id);
            Actions.AnchorRoom();
            // Actions.pop();
        }else {
            Actions.pop();
        }
    }
    toggleCheckoutModal(){
        // this.props.toggleCheckoutModal(null)
        this.setState({showPayModal:false});
    }
    alert = () => {
      platform=='ios' ?
      Alert.alert(
          '提示',
          '请先登录',
          [
            {text: '取消',},
            {
              text: '登录', onPress: () => {
                Actions.LoginScreen();
              }
            },
          ],
          {cancelable: false}
      )
      :
      Actions.LoginScreen();
    }
    onPay(){
        if(this.props.to == "videodetail"){
            //开始获取直播详情数据
            this.props.fetchVideodetailData(this.props.id);
            //开始获取课件数据
            this.props.fetchCoursewareData(this.props.id);
            //进入视频详情页
            Actions.VideoDetail({user_id:this.props.user_id,is_favorite:this.props.is_favorite});
        }else{
            //获取直播间信息
            this.props.getLiveWatchRoom(this.props.id);
            //开始获取课件数据
            this.props.fetchCoursewareData(this.props.id);
            //开始获取直播详情数据
            this.props.fetchLiveroomUserinfo(this.props.id);
            //开始获取历史回看数据
            this.props.fetchHistoricalReviewData(this.props.id);
            // Alert("密码输入正确");
            Actions.AnchorRoom({id:this.props.id,caster_status:0});
        }
    }
    render(){
        var liveRoomValidData = this.props.liveRoomValidData;
        return(
              <ScrollView style={{marginTop:platform === "ios" ? 20 : 0,}}>
                  {liveRoomValidData?
                      <View style={{flexDirection:'column',justifyContent:'space-between',width:global_width,height:global_height-25}}>
                          <View style={{height:40,width:global_width,backgroundColor:'#00A6EA',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                              <TouchableOpacity style={{width:50,position:'absolute',left:10,top:6,height:30}} onPress={()=>this.goBack()}>
                                  <Ionicons name="ios-arrow-back-outline" size={30} color="#FFFFFF" />
                              </TouchableOpacity>
                              <Text style={{color:'#FFFFFF'}}>{liveRoomValidData.teacher_name}的直播间</Text>
                          </View>
                         <View style={styles.boxs}>
                             <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20,paddingVertical:20}}>
                                 <View style={styles.pic}>
                                      {liveRoomValidData.teacher_thumb != "" ?
                                          <Image source={{uri:liveRoomValidData.teacher_thumb}} style={styles.head}/>
                                          :
                                          <Image source={this.state.defaultAnchor} style={styles.head}/>
                                      }
                                 </View>
                                 <View style={styles.infos}>
                                     <Text>{liveRoomValidData.course_name}</Text>
                                     <View>
                                         <Text style={styles.start_time}>开播时间：{liveRoomValidData.start_time}</Text>
                                     </View>
                                     <View>
                                         <Text>主播名称：{liveRoomValidData.teacher_name}</Text>
                                     </View>
                                     <View style={styles.ranks}>
                                      {liveRoomValidData.teacher_label && liveRoomValidData.teacher_label.map((v,i)=>{
                                          return <View style={styles.rankBg} key={i}>
                                              <Text style={styles.rank}>{v}</Text>
                                          </View>
                                      })}
                                     </View>
                                 </View>
                             </View>
                             <View style={styles.title}>
                                 <Text style={styles.line}>|</Text>
                                 <Text>直播简介</Text>
                             </View>
                             {/* <ScrollView style={styles.introduceArea}> */}
                                <View style={styles.liveIntroduction}>
                                    <Text style={styles.description}>{liveRoomValidData.course_detail.length>200?liveRoomValidData.course_detail.substr(0,200)+'...':liveRoomValidData.course_detail}</Text>
                                </View>
                             {/* </ScrollView> */}

                             <View style={styles.title}>
                                 <Text style={styles.line}>|</Text>
                                 <Text>参与用户 ({liveRoomValidData.live_view_num})</Text>
                             </View>
                             <View style={styles.users}>
                                 <ListView
                                     style={styles.listview}
                                     dataSource={this.state.dataSource}
                                     renderRow={this.renderList.bind(this)}
                                     horizontal={true}
                                     enableEmptySections={true}
                                 />
                             </View>
                         </View>
                         {this.props.liveType == 1?
                             <View style={styles.pwdBg}>
                                 <Image source={this.state.lock} style={styles.lock}/>
                                 <TextInput style={styles.pwdText}
                                 placeholderTextColor={"#999"}
                                 placeholder={"请输入房间密码"}
                                 textAlign='left'
                                 returnKeyType={'send'}
                                 returnKeyLabel={'send'}
                                 autoCorrect={false}
                                 maxLength={4}
                                 clearButtonMode="always"
                                 secureTextEntry={true}
                                 underlineColorAndroid={'transparent'}
                                 onSubmitEditing={()=>this.checkPwd()}
                                 value={this.state.inputValue}
                                 onChangeText={
                                   (text) => {
                                     this.setState({inputValue:text});
                                   }
                                 }
                                 />
                                 <TouchableOpacity onPress={()=>this.checkPwd()}>
                                     <Image source={this.state.enter} style={styles.enter}/>
                                 </TouchableOpacity>
                             </View>
                             :
                             <TouchableOpacity style={styles.pay} onPress={()=>this.payEntranceticket()}>
                                 <Text style={styles.payText}>支付 ¥{liveRoomValidData.price}</Text>
                             </TouchableOpacity>
                         }
                         {
                           renderIf(this.state.showPayModal,
                               <CheckoutPayment
                                   {...this.props.liveRoomValidData}
                                   platform={platform}
                                   livePay={{payType:"ticket"}}
                                   onPay={()=>{this.onPay()}}
                                   toggleCheckoutModal={()=> this.toggleCheckoutModal()}
                                   showCheckoutModal={()=>this.props.showCheckoutModal}
                               />)
                         }
                         {
                           platform=='ios' ? <KeyboardSpacer/> : null
                         }
                      </View>
                       :
                       null
                   }
                   <Image source={this.props.liveType==1?this.state.pwdBg:this.state.rmbBg} style={styles.root}/>
              </ScrollView>
        )
    }
}
const mapStateToProps = ({passwordRoom,coursewareList,anchorRoomUserinfo,historicalReviewList,user,liveWatchRoom}) => {
	return {
           user: user.userInfo,
	       liveRoomValidData: passwordRoom.liveRoomValidData,
           liveRoomValidpasswordData: passwordRoom.liveRoomValidpasswordData,
           CoursewareData: coursewareList.CoursewareData,
           liveUserinfoData:anchorRoomUserinfo.liveUserinfoData,
           historyreviewData:historicalReviewList.historyreviewData,
           showCheckoutModal: liveWatchRoom.showCheckoutModal,
	}
}
export default connect(mapStateToProps, {
    fetchLiveroomValid,
    fetchLiveroomValidpassword,
    fetchCoursewareData,
    fetchLiveroomUserinfo,
    fetchHistoricalReviewData,
    getOrderSuccess,
    toggleCheckoutModal,
    getLiveWatchRoom,
    fetchVideodetailData
})(PasswordRoom)
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent'
  },
  root:{
    width:global_width,
    height:global_height,
    //不加这句，就是按照屏幕高度自适应
    //加上这几，就是按照屏幕自适应
    //resizeMode:Image.resizeMode.contain,
    //祛除内部元素的白色背景
    backgroundColor:'rgba(0,0,0,0)',
    position:'absolute',
    top:40,
    zIndex:-1,
   },
   boxs:{
     width:global_width,
     flex:1,
     marginTop:-10,
   },
   introduceArea:{
       marginLeft:10,
       lineHeight:20,
       height:150,
   },
   description:{
     marginLeft:10,
     lineHeight:20,
   },
  card:{
      width:global_width,
      height:global_height,
      backgroundColor:'#FFFFFF',
      borderRadius:5,
  },
  pic:{
      width:100,
      height:100,
  },
  head:{
      marginTop:8,
      width:90,
      height:90,
      borderRadius:90,
  },
  start_time:{
    fontSize:12,
    paddingVertical:5,
  },
  infos:{
      paddingTop:8,
      backgroundColor: 'transparent',
  },
  title:{
    flexDirection:'row',
    marginTop:15,
    marginLeft:20,
    backgroundColor: 'transparent'
  },
  liveIntroduction:{
      marginLeft:20,
      marginRight:20,
      marginTop:10,
      backgroundColor: 'transparent',
      // backgroundColor:'red',
      height:160,
      // height:80,
  },
  ranks:{
      flexDirection:'row',
      marginTop:5,
      flexWrap:'wrap',
  },
  rankBg:{
      borderRadius:15,
      borderWidth:0.6,
      borderColor:'#00A6EA',
      height:25,
      marginRight:3,
      marginTop:3,
      alignItems:'center',
      justifyContent:'center',
      paddingHorizontal:6,
  },
  rank:{
      fontSize:12
  },
  users:{
      flexDirection:'row',
      marginLeft:20,
      marginTop:10,
      justifyContent: 'space-around',
      alignItems: 'center',
  },
  user:{
      width:global_width/7,
      height:global_width/7,
      borderRadius:global_width/7/2,
      marginRight:15
  },
  line:{
      color:'#00A6EA',
      paddingRight:5,
      fontSize:22,
      lineHeight:19,
      height:16
  },
  pay:{
      marginLeft:25,
      marginTop:10,
      marginBottom:40,
      width:global_width-50,
      height:35,
      borderRadius:30,
      backgroundColor:'#00A6EA',
      justifyContent: 'center',
      alignItems:'center',
      zIndex:99999,
  },
  payText:{
      color:'#FFFFFF',
      fontSize:18
  },
  payBg:{
    width:global_width,
  },
  pwdBg:{
      marginHorizontal:20,
      paddingHorizontal:10,
      marginBottom:10,
      marginTop:10,
      height:40,
      borderRadius:7,
      backgroundColor:'#FFFFFF',
      flexDirection:'row',
      justifyContent:'space-between',
  },
  lock:{
      width:20,
      height:23,
      marginTop:6,
      marginLeft:5
  },
  enter:{
      width:25,
      height:20,
      marginTop:9,
      marginLeft:5
  },
  pwdText:{
      marginLeft:5,
      width:global_width-145,
      height:40,
  },
});
