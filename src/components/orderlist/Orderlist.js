/**
 * Created by zhaolong on 2017/03/30.
 * File description:个人中心-订单列表
 */

'use strict'
import React ,{
    Component
} from "react";

import {
    View,
    Text,
    StyleSheet,
    Image,
    BackAndroid,
    TextInput,
    ToastAndroid,
    TouchableWithoutFeedback,
    TouchableOpacity,
    ListView,
    TouchableHighlight,
    RefreshControl,
    ScrollView
} from 'react-native';
import _ from 'lodash'
import { connect } from 'react-redux';
import {fetchOrderListData} from '../../actions/OrderList';
import {global_width,global_height} from '../../util/screen'
import {Scene, Router,Actions} from 'react-native-router-flux';

import List from './List';

class Orderlist extends Component{
    constructor(props){
        super(props);
        this.array=[];
        this.nPage=1;
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
          dataSource: ds,
          isRefreshing:false,
          loadingMore:false,
          currentPage:0,
          total_page:0,
          list:[],
          emptyPic:require('../../static/images/study/empty.png'),
        };
        //监听安卓返回键
        BackAndroid.addEventListener('hardwareBackPress', function() {
          Actions.pop();
          return true;
        });
    }

    componentWillMount(){
        this.props.fetchOrderListData(this.nPage,15);
    }
    componentDidMount(){
    }
    componentWillReceiveProps(nextProps){
        this.setState({isRefreshing: false});

        if(this.props.orderListData != nextProps.orderListData){
            var list = null;
            if(!this.state.isRefreshing)
            {
                var list = this.state.list.concat(nextProps.orderListData.list);
                this.setState({total_page:nextProps.orderListData.total_page})
                this.setState({currentPage:this.state.currentPage + 1});
            }
            else {
                this.setState({currentPage:0});
            }
            this.setState({list:list,dataSource:this.state.dataSource.cloneWithRows(list)});
        }
        this.setState({isRefreshing:false,loadingMore:false});
    }
    //去评价
    evaluateCourse(cert_id){
        ToastAndroid.show(cert_id+'评价...',ToastAndroid.SHORT)
    }
    //跳转到Webview
    gotoWebView(){

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
     //页面滑动
     onScroll = (event) => {
         if(this._distanceFromEnd(event) <= 20){
            this._reachEnd();
         }

     }
     //滑到底部
     _reachEnd(){
         if(this.state.isRefreshing == false && this.state.loadingMore == false)
         {
             this.nPage++;
             this.setState({loadingMore:true});
             if(this.nPage <= this.state.total_page){
                 this.props.fetchOrderListData(this.nPage,15);
             }
         }
     }
     //刷新页面
     _onRefresh(){
         this.setState({currentPage:1});
         this.setState({isRefreshing: true});
         this.props.fetchOrderListData(1);
      }
     _renderFooter(){}


     render(){
        return(
                <View>
                    {(()=>{
                        if(this.props.num == 0){
                            return <View>
                                        <Image style={styles.emptyPic} source={this.state.emptyPic}/>
                                   </View>
                        }else {
                            return <ScrollView style={{marginTop:60}} onScroll={this.onScroll} keyboardShouldPersistTaps={true}>
                                        <List list={this.state.list} callbackParent={ (cert_id) => this.evaluateCourse(cert_id)}/>
                                   </ScrollView>
                        }
                    })()}
                </View>
        )
    }
}

var styles = StyleSheet.create({
    coursecontainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderTopWidth:10,
        borderColor:'#EEEEEE',
    },
    emptyPic:{
        marginLeft: global_width / 2 - 89,
        marginTop: (global_height-75)/2,
        width: 168,
        height: 75,
    },
    course:{
         flexDirection: 'row',
         paddingLeft:10,
         marginTop:10,
         paddingBottom:10,
         borderBottomWidth:1,
         borderColor:'#ECECEC',
    },
    evaluate:{
        width:global_width,
        paddingTop:10,
        paddingBottom:10,
        color:'#ffa60b',
        fontSize:16,
        textAlign:'center',
    },
    title:{
        fontSize:18,
        color:'#333333',
        marginLeft:global_width/2-50,
        height:30
    },
    orderId:{
       height:30,
       width:global_width,
       color:'#ababab',
       fontSize:12,
       borderBottomWidth:1,
       borderColor:'#ECECEC',
       paddingTop:5,
       paddingLeft:10
    },
    thumbnail: {
      width: 100,
      height: 60,
    },
    listView: {
      backgroundColor: '#F5FCFF',
      position:'absolute',
      marginTop:150
    },
    rightContainer: {
       height:60,
       flex: 1,
       paddingLeft:10,
       marginRight:60,
    },
    rightDays:{
        position:'absolute',
        right:0,
    },
    daysBg:{
        position:'absolute',
        right:20,
        width:40,
        height:40,
    },
    days:{
        paddingRight:26,
        paddingTop:11,
        color:'#167fda',
        fontSize:12
    },
    coursetitle: {
      fontSize: 15,
      color:'#333333',
    },
    year: {
    },
    real_price:{
      paddingTop:6,
      color:'red',
    }
})

const mapStateToProps = ({orderList,common}) => {
	return {
		 orderListData: orderList.orderListData,
         loading:common.loading
	}
}

export default connect(mapStateToProps, { fetchOrderListData })(Orderlist)
