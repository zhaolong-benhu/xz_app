/**
 * Created by zhaolong on 2017/03/30.
 * File description:公告Webveiw
 */

'use strict'
import React, {Component} from "react";

import {
  BackAndroid,
  Button,
  Platform,
  ReactNative,
  StatusBar,
  StyleSheet,
  ToastAndroid,
  View,
  WebView,
  Text
} from "react-native";
import AndroidWebView from "react-native-webview-file-upload-android";
import {Actions, backAndroidHandler, ActionConst} from "react-native-router-flux";
import {platform} from "../../util/platform";
import {glo_url} from "../../api/global";
import {connect} from "react-redux";
import {post} from '../../helpers/helpers'
import {Alert, Loading, renderIf} from '../../components'
var InAppUtils = require('NativeModules').InAppUtils

global.router = [];
global.islogin = false;
global.title = "";
global.popNum = 0;
class XZWebView extends Component {
  state = {
    isLogin: false,
    loading: false,
  }
  loadStart = () => {
    this.setState({loading:true})
  }
  loadEnd = () => {
    this.setState({loading:false})
  }
  componentWillMount() {
    if (Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
    global.title = this.props.title;
  }
  onBackAndroid = () => {
        if(!this.props.url){
          return true;
        }
        const i=global.router.indexOf(this.props.url);
        if(i>0){
          Actions.refresh({
            url:global.router[i-1],
            rightButtonImage:require('../../static/images/icon/close.png'),
            rightButtonIconStyle:{width:18,height:18,marginLeft:10},
            onRight: this.handleClose
          });
          global.router.splice(parseInt(i),1);
          return true;
        }else{
          this.handleClose()
          return true;
        }
       return false;
     };
    onExitApp = () => {
        if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
          //最近2秒内按过back键，可以退出应用。
         BackAndroid.exitApp();
        }
        this.lastBackPressed = Date.now();
        ToastAndroid.show('再按一次退出应用',ToastAndroid.SHORT)
        return true;
      };
    goUrl(event){
      let alipay_url = "https://d.alipay.com/i/index.htm?pageSkin=skin-h5cashier&iframeSrc=alipays%3A%2F%2Fplatformapi%2FstartApp%3FappId%3D20000013%26pwdType%3DordinaryPassword";
      let {url,title,loading} = event;
      if(url == alipay_url){
          Alert('请安装支付宝App客户端再进行操作');
          Actions.pop();
      }

      if(!loading){
         if(url==glo_url+'/login'){
           global.islogin=true;
           //Actions.pop()
           setTimeout(()=>Actions.LoginScreen({back:'h5',url:global.router[global.router.length-1]}), 0)
         }else if(url==glo_url+'/user'){
           global.router = []
           Actions.pop()
           setTimeout(()=>Actions.Study(), 0)
         }else if(url==glo_url){
           global.router = []
           Actions.pop()
           setTimeout(()=>Actions.Home(), 0)
         }else if(url==glo_url+'/user/seting'){
           global.router = []
           Actions.pop()
           setTimeout(()=>Actions.Me(), 0)
         }else if(url==alipay_url){
            Alert('请安装支付宝App客户端再进行操作');
            return;
         }else{
           if(global.router.length==0){
              global.router.push(url)
           }else if(global.router.indexOf(url)<0){
              global.router.push(url);
           }
           this.handRefresh(url);
         }
      }
  }

  handleBack = (url) => () => {
    const i = global.router.indexOf(url);
    if (i > 0) {
      Actions.refresh({
        url: global.router[i - 1],
        rightButtonImage: require('../../static/images/icon/close.png'),
        rightButtonIconStyle: {width: 18, height: 18, marginLeft: 10},
        onRight: this.handleClose
      });
      global.router.splice(parseInt(i), 1);
    } else {
      this.handleClose()
    }
  }
  handleClose = () => {
    global.router=[];
    if (Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', this.onExitApp);
    }
    try{
      global.islogin ? Actions.pop({popNum:1+global.popNum*2}) : Actions.pop();
      global.popNum=0;
      global.islogin=false;
    }
    catch (err) {
      console.log('err:'+JSON.stringify(err));
      Actions.XZWebView({url:this.props.url,title:global.title});
    }
  }
  handRefresh = (url) => {
    Actions.refresh({
      url: url,
      backButtonImage: require('../../static/images/icon/back.png'),
      onBack: this.handleBack(url),
      rightButtonImage: require('../../static/images/icon/close.png'),
      rightButtonIconStyle: {width: 18, height: 18, marginLeft: 10}
    })
  }
  getUrlParam = (name, url) => {
    const reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    const index = url.indexOf('?')
    const r = url.substr(index+1).match(reg);  //匹配目标参数
    if (r != null) return r[2];
    return null; //返回参数值
  }
  _onShouldStartLoadWithRequest =(global) => (event) => {
    if (event.url === glo_url + '/login') {
      global.islogin=true;
      //Actions.pop()
      setTimeout(()=>Actions.LoginScreen({back:'h5',url:global.router[global.router.length-1]}), 0)
      return false;
    }else if(event.url === glo_url + '/user') {
      global.router = []
      Actions.pop()
      setTimeout(()=>Actions.Study(), 0)
      return false;
    }else if(event.url === glo_url + '/user/seting') {
      global.router = []
      Actions.pop()
      setTimeout(()=>Actions.Me(), 0)
      return false;
    }else if (event.url.indexOf('/pay/') >= 0) {
      const prdPrefix = 'com.xianzhizhaolong.pub.class';
      const prdPrefix2 = 'com.xianzhizhaolong1.pub.class';
      const order_id = this.getUrlParam('order_id', event.url)
      const price = this.getUrlParam('price', event.url)
      const products = ( price == '18.00' ? [prdPrefix2+'.'+price] :[prdPrefix+'.'+price])

      // console.log(products)
      //读取产品数据
      this.loadStart()
      InAppUtils.loadProducts(products, (error, products) => {
        if(error) {
          Alert('订单没有找到')
          this.loadEnd()
        }
        // 购买产品
        console.log(products)
        InAppUtils.purchaseProduct(products[0].identifier, (error, response) => {
          if(error) {
            Alert('订单没有找到')
            this.loadEnd()
          }
          if (response && response.productIdentifier) {
            // 核对订单
            InAppUtils.receiptData(async (error, receiptData)=> {
              if(error) {
                Alert('订单没有找到');
                this.loadEnd()
              } else {
                console.log(receiptData)
                //核对单发后端
                let res = await post('/pay/respond/apple-return',{receipt:receiptData, order_id: order_id,type:0})
                this.loadEnd()
                if(res){
                  // this.handRefresh(`${glo_url}/payresult/${order_id}`)
                  console.log(global.router.length)
                  global.router.pop()
                  this.handRefresh(global.router[global.router.length-1])
                }else{
                  Alert('订单没有找到');
                  this.props.loadEnd()
                }
              }
            });
          }
        });
      });

      return false;
    } else {
      this.goUrl(event)
      return true
    }
  }

  render() {
      // console.log(this.props.loading)
    return (
        <View style={{flex: 1,marginTop:20}}>
          {
            platform == 'ios' ?
                <StatusBar barStyle='dark-content'/>
                :
                null
          }
          { this.state.loading ? <Loading/> : null }
          {
            this.props.url && this.props.url.indexOf('/live/') >= 0 && platform !== 'ios' ?
                <AndroidWebView
                    source={{uri: this.props.url}}
                    style={{marginTop: 8}}
                    // onNavigationStateChange={(event) => this.goUrl(event)}
                    startInLoadingState={true}
                    domStorageEnabled={true}
                    javaScriptEnabled={true}
                    mediaPlaybackRequiresUserAction={true}
                    bounces={false}
                />
                :
                <WebView
                ref="WebView"
                source={{uri: this.props.url}}
                onNavigationStateChange={(event) => platform == "android" ? this.goUrl(event) : null}
                startInLoadingState={true}
                domStorageEnabled={true}
                style={{marginTop: this.props.url == glo_url + '/user/Apply' || this.props.nType == 1 ? 50 : -13}}
                contentInset={{top: 12}}
                javaScriptEnabled={true}
                mediaPlaybackRequiresUserAction={true}
                bounces={false}
                onShouldStartLoadWithRequest={this._onShouldStartLoadWithRequest(global)}
                automaticallyAdjustContentInsets={true}
            >
            </WebView>
          }
        </View>
    )
  }
}
const mapStateToProps = ({user, common}) => {
  return {
    user: user.userInfo,
    loading: common.loading,
  }
}

export default connect(mapStateToProps, {})(XZWebView);
