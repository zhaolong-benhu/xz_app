/**
 * Created by zhaolong on 2017/03/23.
 * File description:学习中心
 */
'use strict'

import React, {
	Component,
} from 'react';

import {
	View,
	Text,
	TextInput,
	Image,
	StyleSheet,
	ListView,
	TouchableWithoutFeedback,
	TouchableOpacity,
	StatusBar,
	ScrollView
} from 'react-native';
import {connect} from 'react-redux';
import {Icon} from 'native-base';
import {Actions} from 'react-native-router-flux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';
import {
	WantHome,
	Listing,
	Mask,
	CourseScreen,
	Loading
} from '../../components';
import {
	global_width,
	global_height
} from '../../util/screen';
import {platform} from '../../util/platform';

import {
	fetchmyCourseData,
	fetchmyCertificateData,
	fetchmyIhmaData,
	fetchmyOpenclassData,
	fetchmyActivityData,
	deleteCourseData,
	getDetail,
    showScoreRightBtn,
    hideScoreRightBtn
} from '../../actions';

class Study extends Component {
	state = {
		selectedText: "精品课",
		bMask: false,
		nSelected: 0,
		data: [],
		emptyData: [],
		total_page: 0,
		activity_total_page: 0,
		bDown:true,
		loaded:false,
		bLogin:false,
		bLoadStatus:0,
		list: [
			{name: "精品课"},
			{name: "专业证书"},
			{name: "IHMA证书"},
			{name: "线下公开课"}
		],
		hasData: false,
	}
	constructor(props) {
		super(props);
		this.page = 1;
		this.nReresh = 0;
		this.array = [];
		this.bDelete = false;
	}

	componentWillMount() {
		if(this.props.user && this.props.user.user_ticket !== ''){
			this.setState({bLoadStatus:1,bLogin:true});
			this.props.fetchmyCourseData(this.page);
		}else{
			this.setState({loaded:true,bLogin:false});
		}
		setTimeout(()=>{
			this.setState({loaded:true});
		},2000);
	}

	componentDidMount() {

	}
	componentWillUnmount(){
		this.array = [];
		this.setState({data:null});
	}

	componentWillReceiveProps(nextProps, nextState) {

		if(this.props.user != nextProps.user){
				if(nextProps.user && nextProps.user.user_ticket){
					this.setState({bLogin:true});
					this.props.fetchmyCourseData(1);
				}else {
					this.setState({bLogin:false});				}
  		}
		if(!this.bDelete){
			if (this.props.myCourseData != nextProps.myCourseData) {
				this.array.push(nextProps.myCourseData.list);
				this.setState({total_page: nextProps.myCourseData.total_page});
				this.setState({
					data: _.flatten(this.array),bLoadStatus:2
				});
			}
		}

		if (this.props.myCertificateData != nextProps.myCertificateData) {
			this.array.push(nextProps.myCertificateData);
			this.setState({total_page: nextProps.myCertificateData.total_page});
			this.setState({
				data: _.flatten(this.array),bLoadStatus:2,loaded:true
			});
		}
		if (this.props.myIhmaData != nextProps.myIhmaData) {
			this.array.push(nextProps.myIhmaData);
			this.setState({total_page: nextProps.myIhmaData.total_page});
			this.setState({
				data: _.flatten(this.array),bLoadStatus:2
			});
		}
		if (this.props.myOpenclassData != nextProps.myOpenclassData) {
			this.array.push(nextProps.myOpenclassData.list);
			this.setState({total_page: nextProps.myOpenclassData.total_page});
			this.setState({
				data: _.flatten(this.array),bLoadStatus:2
			});
		}
		if (this.props.myActivityData != nextProps.myActivityData) {
			this.array.push(nextProps.myActivityData.list);
			this.setState({activity_total_page: nextProps.myActivityData.total_page});
			this.setState({
				data: _.flatten(this.array),bLoadStatus:2
			});
		}

		if(nextProps.refresh === true) {
			if(this.nReresh == 0){
			switch (this.state.nSelected) {
			   case 0: {
				 this.array = []
				 this.setState({data:null})
				 this.props.fetchmyCourseData(this.page);
			   }
				 break;
			   case 1: {
				 this.array = []
				 this.setState({data:null})
				 this.props.fetchmyCertificateData();
			   }
				 break;
			   case 2: {
				 this.array = []
				 this.setState({data:null})
				 this.props.fetchmyIhmaData();
			   }
				 break;
				 case 3: {
				 this.array = []
				 this.setState({data:null})
				 this.props.fetchmyOpenclassData();
			   }
				 break;
			   default:
			 }
			 	this.nReresh = 1;
				setTimeout(()=>{
					this.nReresh = 0;
				},1000*60);
			}

		}
    	this.setState({hasData: true});
	}

	//控制方向箭头
	onPressScreen() {
		this.setState({
			bMask: !this.state.bMask,bDown:false
		});
	}

	//隐藏遮罩层
	hideMask() {
		this.setState({bMask: false});
	}

	//获取用户选择的分类
	getUserSlected(index) {
		this.array = [];
		this.hideMask();
		this.bDelete = false;
		this.setState({
			bDown:true,
			loaded:true
		});
		if(this.props.user.user_ticket === ''){
			return
		}
		if (index != this.state.nSelected) {
			this.setState({bLoadStatus:1});
			switch (index) {
				case 0: {
					this.props.fetchmyCourseData(this.page);
				}
					break;
				case 1: {
					this.props.fetchmyCertificateData();
				}
					break;
				case 2: {
					this.props.fetchmyIhmaData();
				}
					break;
				case 3: {
					this.props.fetchmyOpenclassData(this.page);
					//this.props.fetchmyActivityData(this.page);
				}
					break;
				default:
			}
			this.setState({selectedText: this.state.list[index].name, nSelected: index, hasData: false, current_page: 2});
		} else {
			this.setState({current_page: -1});
		}
	}

	//删除课程
	courseActions(action,type, id, page) {
		if (action == "delete") {
			this.props.deleteCourseData(type,id);
			this.bDelete = true;
			// this.props.fetchmyCourseData(this.page);
		}else {
			this.bDelete = false;
		}
		// if(action == "refresh"){
			switch (this.state.nSelected) {
				case 0: {
					if(action == "refresh"){
						this.array = [];
					}
					this.props.fetchmyCourseData(page);
				}
					break;
				case 1: {
					if(action == "refresh"){
						this.array = [];
					}
					this.props.fetchmyCertificateData(page);

				}
					break;
				case 2: {
					if(action == "refresh"){
						this.array = [];
					}
					this.props.fetchmyIhmaData(page);
				}
					break;
				case 3: {
					if(action == "refresh"){
						this.array = [];
					}
					this.props.fetchmyOpenclassData(page);
					this.props.fetchmyActivityData(page);
				}
					break;
				default:
			}
		// }
	}

	render() {
		return (
			<View style={platform=="ios"?styles.container:null}>
				<StatusBar barStyle='dark-content'/>
				<View style={styles.head}>
					<View style={styles.title}>
						<Text style={styles.text}>学习</Text>
					</View>
					<View style={styles.choice}>
					 <Text style={styles.selectedText} onPress={() => this.onPressScreen()}>{this.state.selectedText}</Text>
					<TouchableWithoutFeedback onPress={() => this.onPressScreen()}>
					{(()=>{
							if(platform == "android"){
								return <Icon style={{color:'#167fda',left:5,top:9,fontSize:15}} name={this.state.bDown?"ios-arrow-down-outline":"ios-arrow-up-outline"}/>
							}else {
								return	<Icon style={{color:'#167fda',left:5,top:6,height:12,fontSize:15}} name={this.state.bDown?"ios-arrow-down-outline":"ios-arrow-up-outline"}/>
							}
					})()}
					</TouchableWithoutFeedback>
					</View>
				</View>
					<Listing
					  bLogin={this.state.bLogin}
						data={this.state.hasData ? this.state.data : this.state.emptyData}
						nSelected={this.state.nSelected}
						callbackParent={(action,type, id, page) => this.courseActions(action,type, id, page)}
						current_page={this.state.current_page}
						total_page={this.state.total_page>this.state.activity_total_page ? this.state.total_page : this.state.activity_total_page}
						loaded={this.state.loaded}
						getDetail={this.props.getDetail}
						bLoadStatus={()=>this.setState({bLoadStatus:1})}
						showScoreRightBtn={this.props.showScoreRightBtn}
						hideScoreRightBtn={this.props.hideScoreRightBtn}
					/>

				{(() => {
					if (this.state.bMask) {
						return <Mask callbackParent={() => this.hideMask()}/>
					}
				})()}

				{(() => {
					if (this.state.bMask) {
						return <CourseScreen callbackParent={(index) => this.getUserSlected(index)}/>
					}
				})()}

				{/* {(()=>{
					if(this.state.bLoadStatus == 1){
						return <Loading/>
					}else {

					}
				})()} */}
			</View>
		)
	}
}
var styles = StyleSheet.create({
	container: {
		marginTop:10,
	},
	head: {
		paddingTop: 10,
		borderBottomWidth:1,
		borderColor: '#ECECEC',
		flexDirection: "row",
		paddingBottom:5,
	},
	title: {
		width:global_width-100,
		height: 30,
	},
	text:{
		fontSize: 20,
		color: '#333333',
		height:30,
		lineHeight:25,
		marginLeft:global_width/2-20,
	},
	choice: {
		width: 100,
		height:30,
		flexDirection: "row",
		justifyContent:'center',
	},
	selectedText: {
		color: '#167fda',
		fontSize: 13,
		textAlign:'center',
		lineHeight:25,
	}
})

//接收的Props属性
const mapStateToProps = ({myCourse, myCertificate, myIhma, myOpenclass, myActivity, deleteCourse, common,user, courseList}) => {
	return {
		user:user.userInfo,
		myCourseData: myCourse.myCourseData,
		myCertificateData: myCertificate.myCertificateData,
		myIhmaData: myIhma.myIhmaData,
		myOpenclassData: myOpenclass.myOpenclassData,
		myActivityData: myActivity.myActivityData,
		delCourseData: deleteCourse.delCourseData,
		loading: common.loading,
    	refresh: courseList.refresh,
	}
}
 //把React Native组件和 Redux的store连接起来
export default connect(mapStateToProps, {
	fetchmyCourseData,
	fetchmyCertificateData,
	fetchmyIhmaData,
	fetchmyOpenclassData,
	fetchmyActivityData,
	deleteCourseData,
	getDetail,
    showScoreRightBtn,
    hideScoreRightBtn
})(Study)
