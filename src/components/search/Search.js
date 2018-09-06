/**
 * Created by zhaolong on 2017/03/30.
 * File description:搜索页
 */
'use strict'

import React, {
  Component,
} from 'react';

import {
  View,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native'
import _ from 'lodash'
import { connect } from 'react-redux';
import {Scene, Router,Actions} from 'react-native-router-flux';
import {fetchSearchResult} from '../../actions/Search';
import {global_width,global_height} from '../../util/screen';
import {platform} from '../../util/platform';
import {SingleCourse,CoursePackage,Document,Certificate,Tutor,Training,ActivityList,Loading} from '../../components';
import {Icon} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


 class Search extends Component{
    state={
        searchBox_placeholder:"搜索课程",
        searchResult_data:[],
        showSearchresult:false,

        nResultSelect:0,//用户选择搜索内容
        searchType:"",//分类名称
        pageNum:0,
        index:1,
        bLock:false,
        data:[],
        loadingMore:false,

        screenHight:"480",
        //返回为空
        result_isEmpty:false,

        //线下公开课
        openclass_data:[],
        //导师
        tutor_data:[],
        //内训
        train_data:[],
        //峰会
        summit_data:[],
        //展会
        exhibition_data:[],
        //沙龙
        salon_data:[],
        //学习考察
        studyinvestigation_data:[],
        //在线课程
        singlecourse_data:[],
        coursepackage_data:[],
        //职业认证
        cert_data:[],
        //智库
        document_data:[],

        //判断所有类别搜索结果标识
        openclass_exist:false,
        tutor_exist:false,
        train_exist:false,
        summit_exist:false,
        exhibition_exist:false,
        salon_exist:false,
        studyinvestigation_exist:false,
        singlecourse_exist:false,
        coursepackage_exist:false,
        cert_exist:false,
        document_exist:false,

        //判断所有类别搜索结果是否有更多标识
        openclass_more:false,
        training_more:false,
        tutor_more:false,
        summit_more:false,
        exhibition_more:false,
        salon_more:false,
        study_investigation_more:false,
        course_more:false,
        product_more:false,
        cert_more:false,
        document_more:false,
        can_move:false,
        bShowClearBtn:false,
        inputText:'',
    }
    static defaultProps = {
        bHaveMsg:true,
        search_icon:require('../../static/images/home/search.png'),
        msg_icon:require('../../static/images/home/message.png'),
        msg_icons:require('../../static/images/home/messages.png'),
        search_empty:require('../../static/images/home/search_empty.png'),
        all_plates:[
          {id:"-2",name:"在线课程",img:'',link:"/category/3",statistics:"ga('send','event','kecheng','sy','yketang')"},
          {id:"22",name:"智库",img:'',link:"/papers",statistics:"ga('send','event','zk','sy','yketang')"},
          {id:"-1",name:"线下活动",img:'',link:"/huodong",statistics:"ga('send','event','qthuodong','sy','yketang')"},
          {id:"4",name:"IHMA证书",img:'',link:"papers",statistics:"ga('send','event','ihma','sy','yketang')"},
        //   {id:"0",name:"企业商学院",img:'',link:"/lms",statistics:"ga('send','event','lms','sy','yketang')"},
          {id:"-3",name:"内训",img:'',link:"/neixun",statistics:"ga('send','event','neixun','sy','yketang')"}
      ],
      all_plates_img1:require('../../static/images/plates/zaixiankecheng.png'),
      all_plates_img2:require('../../static/images/plates/zhiku.png'),
      all_plates_img3:require('../../static/images/plates/xianxiahuodong.png'),
      all_plates_img4:require('../../static/images/plates/zhiyerenzheng.png'),
      all_plates_img5:require('../../static/images/plates/qiyeshangxueyuan.png'),
      all_plates_img6:require('../../static/images/plates/neixun.png'),
    };
    constructor(props){
        super(props);
        this.is_more = false;
        this.bFocus = false;
        this.gongkaikeArray = [];
        this.daoshiArray = [];
        this.neixunArray = [];
        this.fenghuiArray = [];
        this.zhanhuiArray = [];
        this.shalongArray = [];
        this.xuexikaochaArray = [];
        this.danmenkechengArray = [];
        this.zhuanyezhengshuArray = [];
        this.zhiyerenzhengArray = [];
        this.zhikuArray = [];
        this.globalSearch = true;
        this.inputText="";
    }
    componentWillMount(){
        this.props.all_plates[0].img = this.props.all_plates_img1;
        this.props.all_plates[1].img = this.props.all_plates_img2;
        this.props.all_plates[2].img = this.props.all_plates_img3;
        this.props.all_plates[3].img = this.props.all_plates_img4;
        this.props.all_plates[4].img = this.props.all_plates_img5;
        // this.props.all_plates[5].img = this.props.all_plates_img6;
    }
    onFocus(){
    }

  componentDidMount(){
      this.refs.searchText.focus();//手动触发input的得到焦点事件
  }
  componentWillUnmount(){
       this.ReleaseResources();
  }
  componentWillReceiveProps(nextProps,nextState){
      if(this.props.searchResult != nextProps.searchResult){
         if(nextProps.searchResult.total_num == 0){
             this.setState({result_isEmpty:true});
         }else{
             this.setState({result_isEmpty:false});

             //单门课程
             if(nextProps.searchResult.course){
                if(nextProps.searchResult.current_page==1)
                  this.danmenkechengArray.length=0;
               this.setState({singlecourse_exist:true});
               if(this.globalSearch){
                   this.setState({singlecourse_data:nextProps.searchResult.course});
               }else {
                   this.danmenkechengArray.push(nextProps.searchResult.course);
                   this.setState({pageNum:nextProps.searchResult.total_page});
                   this.setState({danmenkecheng_data:_.flatten(this.danmenkechengArray)});
               }
             }else{
               this.setState({singlecourse_exist:false});
               this.setState({singlecourse_data:[]});
             }
             if(this.is_more){
               if(nextProps.searchResult.is_more && nextProps.searchResult.is_more.course == 1){
                  this.setState({course_more:true});
               }else{
                 this.setState({course_more:false});
               }
             }

             //专业证书
             if(nextProps.searchResult.product){
                if(nextProps.searchResult.current_page==1)
                  this.zhuanyezhengshuArray.length=0;
               this.setState({coursepackage_exist:true});
               if(this.globalSearch){
                   this.setState({coursepackage_data:nextProps.searchResult.product});
               }else {
                   this.zhuanyezhengshuArray.push(nextProps.searchResult.product);
                   this.setState({pageNum:nextProps.searchResult.total_page});
                   this.setState({zhuanyezhengshu_data:_.flatten(this.zhuanyezhengshuArray)});
               }
             }else{
               this.setState({coursepackage_exist:false});
               this.setState({coursepackage_data:[]});
             }
             if(this.is_more){
               if(nextProps.searchResult.is_more && nextProps.searchResult.is_more.product == 1){
                  this.setState({product_more:true});
               }else{
                 this.setState({product_more:false});
               }
             }

             //智库
             if(nextProps.searchResult.document){
                 if(nextProps.searchResult.current_page==1)
                   this.zhikuArray.length=0;
                this.bLock = false;
                this.setState({document_exist:true});
                if(this.globalSearch){
                    this.setState({document_data:nextProps.searchResult.document});
                }else{
                    this.zhikuArray.push(nextProps.searchResult.document);
                    this.setState({pageNum:nextProps.searchResult.total_page});
                    this.setState({zhiku_data:_.flatten(this.zhikuArray)});
                }
             }else{
               this.setState({document_exist:false});
               this.setState({document_data:[]});
             }
             if(this.is_more){
               if(nextProps.searchResult.is_more && nextProps.searchResult.is_more.document == 1){
                  this.setState({document_more:true});
               }else{
                 this.setState({document_more:false});
               }
             }

             //职业认证
             if(nextProps.searchResult.cert){
                 if(nextProps.searchResult.current_page==1)
                   this.zhiyerenzhengArray.length=0;
                this.bLock = false;
                this.setState({cert_exist:true});
                if(this.globalSearch){
                    this.setState({cert_data:nextProps.searchResult.cert});
                }else {
                    this.zhiyerenzhengArray.push(nextProps.searchResult.cert);
                    this.setState({pageNum:nextProps.searchResult.total_page});
                    this.setState({zhiyerenzheng_data:_.flatten(this.zhiyerenzhengArray)});
                }
             }else{
               this.setState({cert_exist:false});
               this.setState({cert_data:[]});
             }
             if(this.is_more){
               if(nextProps.searchResult.is_more && nextProps.searchResult.is_more.cert == 1){
                  this.setState({cert_more:true});
               }else{
                 this.setState({cert_more:false});
               }
             }

             //导师
             if(nextProps.searchResult.teacher){
                if(nextProps.searchResult.current_page==1)
                  this.daoshiArray.length=0;
               this.bLock = false;
               this.setState({tutor_exist:true});
               if(this.globalSearch){
                   this.setState({tutor_data:nextProps.searchResult.teacher});
               }else {
                   this.daoshiArray.push(nextProps.searchResult.teacher);
                   this.setState({pageNum:nextProps.searchResult.total_page});
                   this.setState({daoshi_data:_.flatten(this.daoshiArray)});
               }
             }else{
               this.setState({tutor_exist:false});
               this.setState({tutor_data:[]});
             }
             if(this.is_more){
               if(nextProps.searchResult.is_more && nextProps.searchResult.is_more.teacher == 1){
                  this.setState({tutor_more:true});
               }else{
                 this.setState({tutor_more:false});
               }
             }

             //内训
             if(nextProps.searchResult.training){
                    if(nextProps.searchResult.current_page==1)
                      this.neixunArray.length=0;
                   this.bLock = false;
                   this.setState({train_exist:true});
                   if(this.globalSearch){
                       this.setState({train_data:nextProps.searchResult.training});
                   }else{
                       this.neixunArray.push(nextProps.searchResult.training);
                       this.setState({pageNum:nextProps.searchResult.total_page});
                       this.setState({neixun_data:_.flatten(this.neixunArray)});
                   }
             }else{
               this.setState({train_exist:false});
               this.setState({train_data:[]});
             }
             if(this.is_more){
               if(nextProps.searchResult.is_more && nextProps.searchResult.is_more.training == 1){
                  this.setState({training_more:true});
               }else{
                 this.setState({training_more:false});
               }
             }

             //峰会
             if(nextProps.searchResult.summit){
                 if(nextProps.searchResult.current_page==1)
                   this.fenghuiArray.length=0;
                // this.bLock = false;
                this.setState({summit_exist:true});
                if(this.globalSearch){
                    this.setState({summit_data:nextProps.searchResult.summit});
                }else {
                    this.fenghuiArray.push(nextProps.searchResult.summit);
                    this.setState({pageNum:nextProps.searchResult.total_page});
                    this.setState({fenghui_data:_.flatten(this.fenghuiArray)});
                }
             }else{
               this.setState({summit_exist:false});
               this.setState({summit_data:[]});
             }
             if(this.is_more){
               if(nextProps.searchResult.is_more && nextProps.searchResult.is_more.summit == 1){
                  this.setState({summit_more:true});
               }else{
                 this.setState({summit_more:false});
               }
             }

             //展会
             if(nextProps.searchResult.exhibition){
                if(nextProps.searchResult.current_page==1)
                  this.zhanhuiArray.length=0;
               this.bLock = false;
               this.setState({exhibition_exist:true});
               if(this.globalSearch){
                   this.setState({exhibition_data:nextProps.searchResult.exhibition});
               }else {
                   this.zhanhuiArray.push(nextProps.searchResult.exhibition);
                   this.setState({pageNum:nextProps.searchResult.total_page});
                   this.setState({zhanhui_data:_.flatten(this.zhanhuiArray)});
               }
             }else{
               this.setState({exhibition_exist:false});
               this.setState({exhibition_data:[]});
             }
             if(this.is_more){
               if(nextProps.searchResult.is_more && nextProps.searchResult.is_more.exhibition == 1){
                  this.setState({exhibition_more:true});
               }else{
                 this.setState({exhibition_more:false});
               }
             }

             //沙龙
             if(nextProps.searchResult.salon){
                if(nextProps.searchResult.current_page==1)
                  this.shalongArray.length=0;
               this.bLock = false;
               this.setState({salon_exist:true});
               if(this.globalSearch){
                   this.setState({salon_data:nextProps.searchResult.salon});
               }else {
                   this.shalongArray.push(nextProps.searchResult.salon);
                   this.setState({pageNum:nextProps.searchResult.total_page});
                   this.setState({shalong_data:_.flatten(this.shalongArray)});
               }
             }else{
               this.setState({salon_exist:false});
               this.setState({salon_data:[]});
             }
             if(this.is_more){
               if(nextProps.searchResult.is_more && nextProps.searchResult.is_more.salon == 1){
                  this.setState({salon_more:true});
               }else{
                 this.setState({salon_more:false});
               }
             }

             //学习考察
             if(nextProps.searchResult.study_investigation){
                if(nextProps.searchResult.current_page==1)
                  this.xuexikaochaArray.length=0;
               this.bLock = false;
               this.setState({studyinvestigation_exist:true});
               if(this.globalSearch){
                   this.setState({studyinvestigation_data:nextProps.searchResult.study_investigation});
               }else{
                   this.xuexikaochaArray.push(nextProps.searchResult.study_investigation);
                   this.setState({pageNum:nextProps.searchResult.total_page});
                   this.setState({xuexikaocha_data:_.flatten(this.xuexikaochaArray)});
               }
             }else{
               this.setState({studyinvestigation_exist:false});
               this.setState({studyinvestigation_data:[]});
             }
             if(this.is_more){
               if(nextProps.searchResult.is_more && nextProps.searchResult.is_more.study_investigation == 1){
                  this.setState({study_investigation_more:true});
               }else{
                 this.setState({study_investigation_more:false});
               }
             }
         }

      }
  }

  //释放数据资源+还原默认值
  ReleaseResources(){
        this.gongkaikeArray.length = 0;
        this.daoshiArray.length = 0;
        this.neixunArray.length = 0;
        this.fenghuiArray.length = 0;
        this.zhanhuiArray.length = 0;
        this.shalongArray.length = 0;
        this.xuexikaochaArray.length = 0;
        this.danmenkechengArray.length = 0;
        this.zhuanyezhengshuArray.length = 0;
        this.zhiyerenzhengArray.length = 0;
        this.zhikuArray.length = 0;

        this.setState({gongkaike_data:this.gongkaikeArray});
        this.setState({daoshi_data:this.daoshiArray});
        this.setState({neixun_data:this.neixunArray});
        this.setState({fenghui_data:this.fenghuiArray});
        this.setState({zhanhui_data:this.zhanhuiArray});
        this.setState({shalong_data:this.shalongArray});
        this.setState({xuexikaocha_data:this.xuexikaochaArray});
        this.setState({danmenkecheng_data:this.danmenkechengArray});
        this.setState({zhuanyezhengshu_data:this.zhuanyezhengshuArray});
        this.setState({zhiyerenzheng_data:this.zhiyerenzhengArray});
        this.setState({zhiku_data:this.zhikuArray});

       this.bLock = false;
       this.setState({
          openclass_exist:false,
          tutor_exist:false,
          train_exist:false,
          summit_exist:false,
          exhibition_exist:false,
          salon_exist:false,
          studyinvestigation_exist:false,
          singlecourse_exist:false,
          coursepackage_exist:false,
          cert_exist:false,
          document_exist:false
      });
  }
  //图标点击事件
  IconClicked(id,index){
    var prefix = "搜索";
    // this.bFocus = true;
    this.is_more = true;
    this.globalSearch = false;
    this.refs.searchText.blur();
    //this.refs.searchText.focus();//手动触发input的得到焦点事件
    this.setState({searchBox_placeholder:prefix});
    this.setState({nResultSelect:id,index:1});

    this.setState({searchType:this.props.all_plates[index].name+' |'});
  //   const params={
  //     search:"",
  //     page:1,
  //     type:this.props.all_plates[index].id
  //   }
    this.props.fetchSearchResult("",this.props.all_plates[index].id,1);
    this.setState({showSearchresult:true});
}
    OnSearchBoxChanged(text){
          this.setState({inputText:text});
          this.inputText = text;
          if(this.inputText.length>100)
          {
            this.refs.searchText.value =inputText.substr(0,100);
          }
          if(this.inputText.length>0){
              this.setState({bShowClearBtn:true});
          }else {
              this.setState({bShowClearBtn:false});
          }
    }
    //删除输入框的内容
    ClearInputText(){
        this.setState({inputText:""});
        this.setState({bShowClearBtn:false});
    }
    //搜索
    onSubmitEditing(){
        this.setState({result_isEmpty:false});
        this.is_more = true;
        var inputText = this.state.inputText;
        if(inputText == ""){
          this.setState({showSearchresult:false});
        }else {
          this.props.fetchSearchResult(inputText,this.state.nResultSelect,1);
          this.setState({showSearchresult:true,can_move:true});
        //   this.refs.searchText.blur();//手动触发input的失去焦点事件
        }
    }
    //搜索更多内容
    SearchMore(nType){
        this.is_more = false;
        this.setState({result_isEmpty:false});
        var inputText = this.state.inputText;

          this.props.fetchSearchResult("",nType,null);
          this.setState({showSearchresult:true,nResultSelect:nType});
          this.refs.searchText.blur();//手动触发input的失去焦点事件

          switch (nType) {
            case 21:
            {
              this.setState({tutor_more:false});
            }break;
            case 11:
            {
              this.setState({training_more:false});
            }break;
            case 12:
            {
              this.setState({openclass_more:false});
            }break;
            case 1:
            {
              this.setState({course_more:false});
            }break;
            case 3:
            {
              this.setState({product_more:false});
            }break;
            case 4:
            {
              this.setState({cert_more:false});
            }break;
            case 13:
            {
              this.setState({summit_more:false});
            }break;
            case 14:
            {
              this.setState({exhibition_more:false});
            }break;
            case 15:
            {
              this.setState({salon_more:false});
            }break;
            case 16:
            {
              this.setState({study_investigation_more:false});
            }break;
            case 22:
            {
              this.setState({document_more:false});
            }break;
            default:
          }
    }
    //跳转H5页面
    GotoWebview(url) {
        Actions.XZWebView({url:url});
    }
    //页面滑动
    onScroll = (event) => {
        if(this._distanceFromEnd(event) <= 20){
           this._reachEnd();
        }
    }
    //求距离底部的距离
    _distanceFromEnd(event) {
        let {
          contentSize,
          contentInset,
          contentOffset,
          layoutMeasurement,
        } = event.nativeEvent;

      let contentLength = contentSize.height;
      let trailingInset = contentInset.bottom;
      let scrollOffset = contentOffset.y;
      let viewportLength = layoutMeasurement.height;

      return contentLength + trailingInset - scrollOffset - viewportLength;
    }
    //滑到底部
    _reachEnd(){
        if(this.state.loadingMore == false)
        {
            if(this.state.index<this.state.pageNum){
                let index=Number(this.state.index)+1;
                this.setState({index:index});
                let type = this.state.nResultSelect;
                let search = "";
                this.props.fetchSearchResult(search,type,index);
            }else {
            }

        }
    }
    Back(){
        this.state.danmenkecheng_data
        if(this.state.showSearchresult){
            this.setState({showSearchresult:false});
        }else {
            Actions.Home();
        }
    }
    render(){
        return(
            <ScrollView style={styles.container} onScroll={this.onScroll} keyboardShouldPersistTaps={true}>
                    <View style={styles.area}>
                        <View style={styles.head}>
                            {(()=>{
                                if(this.state.searchType != ""){
                                    return <Text style={styles.search_type}>{this.state.searchType}</Text>
                                }
                            })()}
                            <TextInput style={this.state.searchType != ""?styles.searchBox:styles.searchBox2}
                            ref="searchText"
                            autoFocus={true}
                            underlineColorAndroid = {'transparent'}
                            placeholder={this.state.searchBox_placeholder}
                            onFocus={()=>this.onFocus()}
                            onChangeText={(value) => {
                              this.setState({value})
                              this.OnSearchBoxChanged(value)}
                            }
                            onSubmitEditing={()=>this.onSubmitEditing()}
                            value={this.state.inputText}
                              />
                            <View style={styles.search}>
                                <Image style={styles.search_icon} source={this.props.search_icon} />
                                {/* <Icon style={{color:'#157EDA',position:'absolute',paddingTop:6,fontSize:25}} name="search"/> */}
                            </View>
                            {(()=>{
                                if(this.state.bShowClearBtn){
                                    return <View style={styles.icon}>
                                        <TouchableWithoutFeedback onPress={()=>this.ClearInputText()}>
                                            {/* <Image style={styles.delete_icon} source={this.props.search_icon} /> */}
                                            <Icon style={{color:'#ababab',position:'absolute',paddingTop:7,right:2,fontSize:15}} name="ios-close-circle"/>
                                            {/* <FontAwesome size={12}  name="ios-close-circle" color="#ABABAB" /> */}
                                        </TouchableWithoutFeedback>
                                    </View>
                                }
                            })()}
                        </View>
                        <Text style={styles.cancel} onPress={()=>this.Back()}>取消</Text>
                    </View>
                    {(()=>{
                        if(!this.state.showSearchresult){
                            return <View style={styles.classification}>
                            {this.props.all_plates.map((value,index) =>{
                                 return <TouchableWithoutFeedback key={'all_plates' + index} onPress={()=>this.IconClicked(value.id,index)}>
                                        <View style={styles.nav}>
                                          <View style={{marginLeft:40}}>
                                            <Image source={value.img} style={styles.img} />
                                          </View>
                                          <Text style={styles.name}>
                                            {value.name}
                                          </Text>
                                       </View>
                                     </TouchableWithoutFeedback>
                            })}
                            </View>
                        }else {
                            return <View>
                                {(()=>{
                                    if(this.state.result_isEmpty){
                                        return <View>
                                            <Image style={styles.tipsimage} source={this.props.search_empty}/>
                                            <Text style={styles.tipstext}>找不到你要的内容哦</Text>
                                        </View>
                                    }else{
                                        return <View>
                                        {(()=>{
                                            if(this.state.singlecourse_exist){
                                                return <View>
                                                        <View style={styles.title}>
                                                            <Text style={styles.type}>单门课程</Text>
                                                            {(()=>{
                                                                if(this.state.course_more){
                                                                return <TouchableWithoutFeedback onPress={this.SearchMore.bind(this,1)}>
                                                                        <View style={styles.more}>
                                                                            <Text style={styles.moreText} >更多单门课程</Text>
                                                                            {(()=>{
                                                                              if (platform == "android") {
                                                                                return  <Icon style={{color:'#157eda',position:'absolute',paddingTop:3,paddingBottom:10,right:0,fontSize:15}} name="ios-arrow-forward-outline"/>
                                                                              }else {
                                                                                return  <Icon style={{color:'#157eda',position:'absolute',paddingTop:3,paddingBottom:10,right:0,top:-3,fontSize:15}} name="ios-arrow-forward-outline"/>
                                                                              }
                                                                            })()}
                                                                        </View>
                                                                    </TouchableWithoutFeedback>
                                                                }
                                                            })()}
                                                        </View>
                                                        {this.state.danmenkecheng_data && !this.globalSearch &&
                                                            <SingleCourse  list={this.state.danmenkecheng_data} search={this.refs.searchText.value} callbackParent={(url) => this.GotoWebview(url)}/>
                                                        }
                                                        {(()=>{
                                                            if(this.globalSearch){
                                                                return  <SingleCourse  list={this.state.singlecourse_data} search={this.refs.searchText.value} callbackParent={(url) => this.GotoWebview(url)}/>
                                                            }
                                                        })()}
                                                </View>

                                            }
                                        })()}

                                        {(()=>{
                                            if(this.state.coursepackage_exist){
                                                return <View>
                                                        <View style={styles.title}>
                                                            <Text style={styles.type}>专业证书</Text>
                                                            {(()=>{
                                                                if(this.state.product_more){
                                                                    return <TouchableWithoutFeedback onPress={this.SearchMore.bind(this,3)}>
                                                                            <View style={styles.more}>
                                                                                <Text style={styles.moreText} >更多专业证书</Text>
                                                                                {(()=>{
                                                                                  if (platform == "android") {
                                                                                    return  <Icon style={{color:'#157eda',position:'absolute',paddingTop:3,paddingBottom:10,right:0,fontSize:15}} name="ios-arrow-forward-outline"/>
                                                                                  }else {
                                                                                    return  <Icon style={{color:'#157eda',position:'absolute',paddingTop:3,paddingBottom:10,right:0,top:-3,fontSize:15}} name="ios-arrow-forward-outline"/>
                                                                                  }
                                                                                })()}
                                                                            </View>
                                                                        </TouchableWithoutFeedback>
                                                                }
                                                            })()}
                                                        </View>
                                                        {this.state.zhuanyezhengshu_data && !this.globalSearch &&
                                                            <CoursePackage   list={this.state.zhuanyezhengshu_data} search={this.refs.searchText.value} callbackParent={(url) => this.GotoWebview(url)}/>
                                                        }
                                                        {(()=>{
                                                            if(this.globalSearch){
                                                                return  <CoursePackage  list={this.state.coursepackage_data} search={this.refs.searchText.value} callbackParent={(url) => this.GotoWebview(url)}/>
                                                            }
                                                        })()}
                                                </View>

                                            }
                                        })()}


                                        {(()=>{
                                            if(this.state.document_exist){
                                                return <View>
                                                        <View style={styles.title}>
                                                            <Text style={styles.type}>智库</Text>
                                                            {(()=>{
                                                                if(this.state.document_more){
                                                                    return <TouchableWithoutFeedback onPress={this.SearchMore.bind(this,22)}>
                                                                            <View style={styles.more}>
                                                                                <Text style={styles.moreText} >更多智库</Text>
                                                                                {(()=>{
                                                                                  if (platform == "android") {
                                                                                    return  <Icon style={{color:'#157eda',position:'absolute',paddingTop:3,paddingBottom:10,right:0,fontSize:15}} name="ios-arrow-forward-outline"/>
                                                                                  }else {
                                                                                    return  <Icon style={{color:'#157eda',position:'absolute',paddingTop:3,paddingBottom:10,right:0,top:-3,fontSize:15}} name="ios-arrow-forward-outline"/>
                                                                                  }
                                                                                })()}
                                                                            </View>
                                                                        </TouchableWithoutFeedback>
                                                                }
                                                            })()}
                                                        </View>
                                                        {this.state.zhiku_data && !this.globalSearch &&
                                                            <Document list={this.state.zhiku_data} search={this.refs.searchText.value} callbackParent={(url) => this.GotoWebview(url)}/>
                                                        }
                                                        {(()=>{
                                                            if(this.globalSearch){
                                                                return  <Document list={this.state.document_data} search={this.refs.searchText.value} callbackParent={(url) => this.GotoWebview(url)}/>
                                                            }
                                                        })()}
                                                </View>

                                            }
                                        })()}

                                        {(()=>{
                                            if(this.state.cert_exist){
                                                return <View>
                                                        <View style={styles.title}>
                                                            <Text style={styles.type}>IHMA证书</Text>
                                                            {(()=>{
                                                                if(this.state.cert_more){
                                                                    return <TouchableWithoutFeedback onPress={this.SearchMore.bind(this,22)}>
                                                                            <View style={styles.more}>
                                                                                <Text style={styles.moreText} >更多IHMA证书</Text>
                                                                                {(()=>{
                                                                                  if (platform == "android") {
                                                                                    return  <Icon style={{color:'#157eda',position:'absolute',paddingTop:3,paddingBottom:10,right:0,fontSize:15}} name="ios-arrow-forward-outline"/>
                                                                                  }else {
                                                                                    return  <Icon style={{color:'#157eda',position:'absolute',paddingTop:3,paddingBottom:10,right:0,top:-3,fontSize:15}} name="ios-arrow-forward-outline"/>
                                                                                  }
                                                                                })()}
                                                                            </View>
                                                                        </TouchableWithoutFeedback>
                                                                }
                                                            })()}
                                                        </View>
                                                        {this.state.zhiyerenzheng_data && !this.globalSearch &&
                                                            <Certificate list={this.state.zhiyerenzheng_data} search={this.refs.searchText.value} callbackParent={(url) => this.GotoWebview(url)}/>
                                                        }
                                                        {(()=>{
                                                            if(this.globalSearch){
                                                                return  <Certificate list={this.state.cert_data} search={this.refs.searchText.value} callbackParent={(url) => this.GotoWebview(url)}/>
                                                            }
                                                        })()}
                                                </View>

                                            }
                                        })()}


                                        {(()=>{
                                            if(this.state.tutor_exist){
                                                return <View>
                                                        <View style={styles.title}>
                                                            <Text style={styles.type}>导师</Text>
                                                            {(()=>{
                                                                if(this.state.tutor_more){
                                                                    return <TouchableWithoutFeedback onPress={this.SearchMore.bind(this,21)}>
                                                                            <View style={styles.more}>
                                                                                <Text style={styles.moreText} >更多导师</Text>
                                                                                {(()=>{
                                                                                  if (platform == "android") {
                                                                                    return  <Icon style={{color:'#157eda',position:'absolute',paddingTop:3,paddingBottom:10,right:0,fontSize:15}} name="ios-arrow-forward-outline"/>
                                                                                  }else {
                                                                                    return  <Icon style={{color:'#157eda',position:'absolute',paddingTop:3,paddingBottom:10,right:0,top:-3,fontSize:15}} name="ios-arrow-forward-outline"/>
                                                                                  }
                                                                                })()}
                                                                            </View>
                                                                        </TouchableWithoutFeedback>
                                                                }
                                                            })()}
                                                        </View>
                                                        {this.state.daoshi_data && !this.globalSearch &&
                                                            <Tutor list={this.state.daoshi_data} search={this.refs.searchText.value} callbackParent={(url) => this.GotoWebview(url)}/>
                                                        }
                                                        {(()=>{
                                                            if(this.globalSearch){
                                                                return  <Tutor list={this.state.tutor_data} search={this.refs.searchText.value} callbackParent={(url) => this.GotoWebview(url)}/>
                                                            }
                                                        })()}
                                                </View>
                                            }
                                        })()}

                                        {(()=>{
                                            if(this.state.train_exist){
                                                return <View>
                                                        <View style={styles.title}>
                                                            <Text style={styles.type}>内训</Text>
                                                            {(()=>{
                                                                if(this.state.training_more){
                                                                    return <TouchableWithoutFeedback onPress={this.SearchMore.bind(this,11)}>
                                                                            <View style={styles.more}>
                                                                                <Text style={styles.moreText} >更多内训</Text>
                                                                                {(()=>{
                                                                                  if (platform == "android") {
                                                                                    return  <Icon style={{color:'#157eda',position:'absolute',paddingTop:3,paddingBottom:10,right:0,fontSize:15}} name="ios-arrow-forward-outline"/>
                                                                                  }else {
                                                                                    return  <Icon style={{color:'#157eda',position:'absolute',paddingTop:3,paddingBottom:10,right:0,top:-3,fontSize:15}} name="ios-arrow-forward-outline"/>
                                                                                  }
                                                                                })()}
                                                                            </View>
                                                                        </TouchableWithoutFeedback>
                                                                }
                                                            })()}
                                                        </View>
                                                        {this.state.neixun_data && !this.globalSearch &&
                                                            <Training list={this.state.neixun_data} search={this.refs.searchText.value} callbackParent={(url) => this.GotoWebview(url)}/>
                                                        }
                                                        {(()=>{
                                                            if(this.globalSearch){
                                                                return  <Training list={this.state.train_data} search={this.refs.searchText.value} callbackParent={(url) => this.GotoWebview(url)}/>
                                                            }
                                                        })()}
                                                </View>
                                            }
                                        })()}


                                        {(()=>{
                                            if(this.state.summit_exist){
                                                return <View>
                                                        <View style={styles.title}>
                                                            <Text style={styles.type}>峰会</Text>
                                                            {(()=>{
                                                                if(this.state.summit_more){
                                                                    return <TouchableWithoutFeedback onPress={this.SearchMore.bind(this,13)}>
                                                                            <View style={styles.more}>
                                                                                <Text style={styles.moreText} >更多峰会</Text>
                                                                                {(()=>{
                                                                                  if (platform == "android") {
                                                                                    return  <Icon style={{color:'#157eda',position:'absolute',paddingTop:3,paddingBottom:10,right:0,fontSize:15}} name="ios-arrow-forward-outline"/>
                                                                                  }else {
                                                                                    return  <Icon style={{color:'#157eda',position:'absolute',paddingTop:3,paddingBottom:10,right:0,top:-3,fontSize:15}} name="ios-arrow-forward-outline"/>
                                                                                  }
                                                                                })()}
                                                                            </View>
                                                                        </TouchableWithoutFeedback>
                                                                }
                                                            })()}
                                                        </View>
                                                        {this.state.fenghui_data && !this.globalSearch &&
                                                            <ActivityList  list={this.state.fenghui_data} search={this.refs.searchText.value} callbackParent={(url) => this.GotoWebview(url)}/>
                                                        }
                                                        {(()=>{
                                                            if(this.globalSearch){
                                                                return  <ActivityList  list={this.state.summit_data} search={this.refs.searchText.value} callbackParent={(url) => this.GotoWebview(url)}/>
                                                            }
                                                        })()}
                                                </View>

                                            }
                                        })()}

                                        {(()=>{
                                            if(this.state.exhibition_exist){
                                                return <View>
                                                        <View style={styles.title}>
                                                            <Text style={styles.type}>展会</Text>
                                                            {(()=>{
                                                                if(this.state.exhibition_more){
                                                                    return <TouchableWithoutFeedback onPress={this.SearchMore.bind(this,14)}>
                                                                            <View style={styles.more}>
                                                                                <Text style={styles.moreText} >更多展会</Text>
                                                                                {(()=>{
                                                                                  if (platform == "android") {
                                                                                    return  <Icon style={{color:'#157eda',position:'absolute',paddingTop:3,paddingBottom:10,right:0,fontSize:15}} name="ios-arrow-forward-outline"/>
                                                                                  }else {
                                                                                    return  <Icon style={{color:'#157eda',position:'absolute',paddingTop:3,paddingBottom:10,right:0,top:-3,fontSize:15}} name="ios-arrow-forward-outline"/>
                                                                                  }
                                                                                })()}
                                                                            </View>
                                                                        </TouchableWithoutFeedback>
                                                                }
                                                            })()}
                                                        </View>
                                                        {this.state.zhanhui_data && !this.globalSearch &&
                                                            <ActivityList  list={this.state.zhanhui_data} search={this.refs.searchText.value} callbackParent={(url) => this.GotoWebview(url)}/>
                                                        }
                                                        {(()=>{
                                                            if(this.globalSearch){
                                                                return  <ActivityList  list={this.state.exhibition_data} search={this.refs.searchText.value} callbackParent={(url) => this.GotoWebview(url)}/>
                                                            }
                                                        })()}
                                                </View>

                                            }
                                        })()}

                                        {(()=>{
                                            if(this.state.salon_exist){
                                                return <View>
                                                        <View style={styles.title}>
                                                            <Text style={styles.type}>沙龙</Text>
                                                            {(()=>{
                                                                if(this.state.salon_more){
                                                                    return <TouchableWithoutFeedback onPress={this.SearchMore.bind(this,15)}>
                                                                            <View style={styles.more}>
                                                                                <Text style={styles.moreText} >更多沙龙</Text>
                                                                                {(()=>{
                                                                                  if (platform == "android") {
                                                                                    return  <Icon style={{color:'#157eda',position:'absolute',paddingTop:3,paddingBottom:10,right:0,fontSize:15}} name="ios-arrow-forward-outline"/>
                                                                                  }else {
                                                                                    return  <Icon style={{color:'#157eda',position:'absolute',paddingTop:3,paddingBottom:10,right:0,top:-3,fontSize:15}} name="ios-arrow-forward-outline"/>
                                                                                  }
                                                                                })()}
                                                                            </View>
                                                                        </TouchableWithoutFeedback>
                                                                }
                                                            })()}
                                                        </View>
                                                        {this.state.shalong_data && !this.globalSearch &&
                                                            <ActivityList  list={this.state.shalong_data} search={this.refs.searchText.value} callbackParent={(url) => this.GotoWebview(url)}/>
                                                        }
                                                        {(()=>{
                                                            if(this.globalSearch){
                                                                return  <ActivityList  list={this.state.salon_data} search={this.refs.searchText.value} callbackParent={(url) => this.GotoWebview(url)}/>
                                                            }
                                                        })()}
                                                </View>
                                            }
                                        })()}

                                        {(()=>{
                                            if(this.state.studyinvestigation_exist){
                                                return <View>
                                                        <View style={styles.title}>
                                                            <Text style={styles.type}>学习考察</Text>
                                                            {(()=>{
                                                                if(this.state.study_investigation_more){
                                                                    return <TouchableWithoutFeedback onPress={this.SearchMore.bind(this,16)}>
                                                                            <View style={styles.more}>
                                                                                <Text style={styles.moreText} >更多学习考察</Text>
                                                                                {(()=>{
                                                                                  if (platform == "android") {
                                                                                    return  <Icon style={{color:'#157eda',position:'absolute',paddingTop:3,paddingBottom:10,right:0,fontSize:15}} name="ios-arrow-forward-outline"/>
                                                                                  }else {
                                                                                    return  <Icon style={{color:'#157eda',position:'absolute',paddingTop:3,paddingBottom:10,right:0,top:-3,fontSize:15}} name="ios-arrow-forward-outline"/>
                                                                                  }
                                                                                })()}
                                                                            </View>
                                                                        </TouchableWithoutFeedback>
                                                                }
                                                            })()}
                                                        </View>
                                                        {this.state.xuexikaocha_data && !this.globalSearch &&
                                                            <ActivityList  list={this.state.xuexikaocha_data} search={this.refs.searchText.value} callbackParent={(url) => this.GotoWebview(url)}/>
                                                        }
                                                        {(()=>{
                                                            if(this.globalSearch){
                                                                return  <ActivityList  list={this.state.studyinvestigation_data} search={this.refs.searchText.value} callbackParent={(url) => this.GotoWebview(url)}/>
                                                            }
                                                        })()}
                                                </View>
                                            }
                                        })()}


                                        </View>
                                    }
                                })()}
                            </View>
                        }
                    })()}
                {/* {this.props.loading ?  <loading/>: null } */}
            </ScrollView>
        )
    }
}

const mapStateToProps = ({search,common}) => {
	return {
		 searchResult: search.searchResult,
         loading:common.loading
	}
}

export default connect(mapStateToProps, { fetchSearchResult })(Search)
var styles = StyleSheet.create({
    container:{backgroundColor:'#FFFFFF',height:global_height-25,paddingTop:25},
    tipsimage:{marginLeft:global_width/2-35,marginTop:global_height/3-65,width:69,height:64},
    tipstext:{fontSize: 15,color:'#ababab',width:global_width,textAlign:'center',marginTop:10},
    area:{width:global_width,height:50,backgroundColor:'#FFFFFF'},
    head:{flexDirection:"row",height:30,marginLeft:10,marginRight:50,marginTop:10,backgroundColor:'#F0F0F0',borderColor:'#D5D5D5',borderWidth:1,borderRadius:5,},
    cancel:{position:'absolute',right:10,color:'#157EDA',height:23,top:15},
    search:{width:25,height:25,left:5,marginTop:5,position:"absolute"},
    icon:{width:16,height:14,position:"absolute",right:10},
    search_icon:{width:18,height:18,marginTop:0,},
    delete_icon:{width:10,height:10,marginTop:-10,},
    search_type:{paddingLeft:25,paddingTop:3,paddingBottom:3,color:'#999'},
    searchBox:{flex:1,borderWidth:1, borderColor:'#F0F0F0', borderRadius:5, marginRight:10,paddingLeft:10,backgroundColor:'#F0F0F0',borderBottomWidth:0,paddingTop:7,paddingBottom:4,height:28,},
    searchBox2:{flex:1,borderWidth:1, borderColor:'#F0F0F0', borderRadius:5, marginRight:10,paddingLeft:28,backgroundColor:'#F0F0F0',borderBottomWidth:0,paddingTop:7,paddingBottom:4,height:28,},
    msg:{width:28,height:32,},
    msg_icon:{width:25,height:20,marginTop:10},
    textInput: {height: 50,width: 200,},
    classification:{flexDirection: 'row',flexWrap:'wrap'},//justifyContent:'space-around'
    nav:{width:global_width/3,height:80,justifyContent:'center'},
    nav2:{width:global_width/3,height:80,justifyContent:'center',marginLeft:8},
    nav3:{width:global_width/3,height:80,justifyContent:'center',marginLeft:-115},
    img:{width:40,height:40,},
    name:{width:120,textAlign:'center',color:'#333333',marginTop:5},
    title:{flexDirection:"row",backgroundColor:'#FFF',paddingLeft:10,paddingRight:10,paddingTop:5,paddingBottom:5, borderTopWidth:10,borderColor:'#ECECEC'},
    type:{fontSize:15,color:'#333',},
    more:{position:'absolute',right:15,top:5},
    moreText:{paddingRight:10}
})
