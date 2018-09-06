/**
 * Created by qzy on 20/03/2017.
 * File description:
 */
import React, {Component} from 'react';
import {
	View,
	StatusBar,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux';

import {Scene, Router, Actions, ActionConst} from 'react-native-router-flux';

import {
	App,
	LiveCast,
	LiveCastReady,
	LiveCasting,
	LiveWatching,
	Home,
	Study,
	User,
	ExamResult,
	CourseDetail,
	CourseExam,
	MainLogin,
	Register,
	MainRegister,
	LoginScreen,
	WatchVideo,
	ForgotPassword,
	UserAgreement,
	Login,
    WatchPastVideo,
	AnchorRoom,
	VideoDetail,
	PasswordRoom,
	LiveReady,
} from './containers';

import {
	Setting,
	ChangePassword,
	Feedback,
	ModifyNickname,
	Search,
	XZWebView,
	Orderlist,
	Listing,
	Follow,
	ScoreRightBtn,
	UpdatePassWord,
} from './components';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

class RouterComponent extends Component {
	render() {
		return (
			<Router key="Main">
				<Scene key="Root">
					<Scene key="MainPage" tabs={true} tabBarStyle={styles.tabBarStyle} tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle} panHandlers={null}>
            <Scene key="App" initial={true} component={App} hideNavBar={true} hideTabBar={true} tabs={true}/>
						<Scene key="Home"  title="首页" icon={TabIcon} iconName="ios-home-outline" hideNavBar={true}>
							<Scene key="HomePage" component={Home} title='首页' panHandlers={null}/>
							<Scene key="Search" component={Search} title='搜索' panHandlers={null} tabs={true} hideNavBar={true} hideTabBar={true}/>
						</Scene>
						<Scene key="Live" title="直播" icon={TabIcon} iconName="ios-easel-outline" hideNavBar={true} navigationBarStyle={styles.navBarStyle}>
							<Scene key="LiveCast" component={LiveCast}  initial hideTabBar={false} />
							<Scene key="LiveReady" hideTabBar={true} component={LiveReady} tabs={true} />
							<Scene key="LiveCastReady" hideTabBar={true} component={LiveCastReady} tabs={true} />
							<Scene key="LiveCasting" hideTabBar={true} component={LiveCasting} tabs={true} />
							<Scene key="LiveWatching" component={LiveWatching} hideTabBar={true} />
							<Scene key="WatchPastVideo" component={WatchPastVideo} hideTabBar={true} />

							<Scene key="AnchorRoom" component={AnchorRoom} hideTabBar={true} hideNavBar={true}/>
							<Scene key="VideoDetail" component={VideoDetail} hideTabBar={true} />
							<Scene key="PasswordRoom" component={PasswordRoom} hideNavBar={true} hideTabBar={true} />
						</Scene>

						<Scene key="Study" title="学习" icon={TabIcon} iconName="ios-bookmarks-outline" hideNavBar={true} navigationBarStyle={styles.navBarStyle} >
							<Scene key="Learn" component={Study} title='书包' titleStyle={styles.titleStyle} tabs={true}/>
							<Scene key="Listing" component={Listing} title="订单列表" titleStyle={styles.titleStyle} tabs={true}
							       hideNavBar={true} hideTabBar={true}/>
							<Scene key="CourseDetail" component={CourseDetail} title="课程包详情" titleStyle={styles.titleStyle}
							       tabs={true} hideNavBar={false} hideTabBar={true}
							       renderRightButton={ () => <ScoreRightBtn/> }/>
							<Scene key="CourseExam" component={CourseExam} title="课后测试" titleStyle={styles.titleStyle} tabs={true}
							       hideNavBar={false} hideTabBar={true}/>
							<Scene key="ExamResult" component={ExamResult} title="测试结果" titleStyle={styles.titleStyle} tabs={true}
							       hideNavBar={true} hideTabBar={true} />
							<Scene key="WatchVideo" component={WatchVideo}  titleStyle={styles.titleStyle} tabs={true} hideNavBar={true} hideTabBar={true} />
						</Scene>
						<Scene key="Me" title="我的" icon={TabIcon} iconName="user" hideNavBar={true} navigationBarStyle={styles.navBarStyle}>
							<Scene key="User" component={User} title="我的" titleStyle={styles.titleStyle} tabs={true}/>
							<Scene key="Setting" component={Setting} title="个人设置" titleStyle={styles.titleStyle} tabs={true}
							       hideNavBar={false} hideTabBar={true}/>
						 	<Scene key="ModifyNickname" component={ModifyNickname} title="修改昵称" titleStyle={styles.titleStyle} tabs={true}
							       hideNavBar={false} hideTabBar={true}/>
						  <Scene key="UpdatePassWord" component={UpdatePassWord} title="修改密码" titleStyle={styles.titleStyle} tabs={true}
						  		  hideNavBar={false} hideTabBar={true}/>
						  <Scene key="ChangePassword" component={ChangePassword} title="修改密码" titleStyle={styles.titleStyle} tabs={true}
							       hideNavBar={false} hideTabBar={true}/>
							<Scene key="Register" component={Register} title="注册" titleStyle={styles.titleStyle} tabs={true}
							       hideNavBar={true} hideTabBar={true}/>
							<Scene key="Feedback" component={Feedback} title="反馈建议" titleStyle={styles.titleStyle} tabs={true}
							       hideNavBar={false} hideTabBar={true} onBack={()=>Actions.pop()}/>
							<Scene key="Orderlist" component={Orderlist} title="订单列表" titleStyle={styles.titleStyle} tabs={true}
							       hideNavBar={false} hideTabBar={true}/>
							<Scene key="Follow" component={Follow} title="主播关注" titleStyle={styles.titleStyle} tabs={true}
							       hideNavBar={false} hideTabBar={true}/>
						</Scene>
					</Scene>
					<Scene key="LoginScreen" component={LoginScreen} title="登录"  hideNavBar={false} hideTabBar={true} tabs={true}
					 		navigationBarStyle={styles.loginBg} titleStyle={{color:'#fff'}}
							backButtonImage={require('./static/images/icon/back_white.png')}
							onBack={()=>{
								 if(global.islogin){
									 Actions.XZWebView({url:global.router[global.router.length-1],title:global.title})
								 }else{
									 Actions.pop()
								 }
							 }}/>
					<Scene key="MainRegister" component={MainRegister} title="注册" hideNavBar={false} hideTabBar={true} tabs={true}
									 navigationBarStyle={styles.loginBg} titleStyle={{color:'#fff'}}
									 backButtonImage={require('./static/images/icon/back_white.png')}
									 onBack={()=>Actions.pop()}/>
					<Scene key="ForgotPassword" title='忘记密码' component={ForgotPassword} hideNavBar={false} hideTabBar={true} tabs={true}
								 navigationBarStyle={styles.loginBg} titleStyle={{color:'#fff'}}
								 backButtonImage={require('./static/images/icon/back_white.png')}
								 onBack={()=>Actions.pop()}/>
					<Scene key="UserAgreement" title='用户协议' component={UserAgreement} titleStyle={styles.titleStyle} tabs={true}
								 hideNavBar={false} hideTabBar={true}  onBack={()=>Actions.pop()}/>
					<Scene key="XZWebView" component={XZWebView} panHandlers={null} tabs={true} hideNavBar={false} hideTabBar={true} />
				</Scene>
			</Router>
		)
	}
}
const mapStateToProps = ({course, courseReview, category, common}) => {
  return {
    percent: course.percent,
    course: course.coursePackage,
    review: courseReview,
    category: category.category,
    categoryState: category.toggleCategory,
    progressState: category.toggleProgress,
    choosedCategoryID: category.choosedCategoryID,
    choosedCategoryName: category.choosedCategoryName,
    choosedProgressID: category.choosedProgressID,
    choosedProgressName: category.choosedProgressName,
  }
}

export default RouterComponent;
// export default connect(mapStateToProps,null)(RouterComponent);

//下面ICON组件 ，改变选中/未选中的图标颜色
class TabIcon extends React.Component {
	render() {
		var color = this.props.selected ? '#167fda' : '#666666'
		return (
			<View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
				{this.props.iconName=='user' ?
					<SimpleLineIcons color={color} name={this.props.iconName} size={19}/>
					:
					<Ionicons color={color} name={this.props.iconName} size={23}/>
				}
				{this.props.iconName=='user' ?
				<Text style={{color: color,marginTop:2}}>{this.props.title}</Text>
				:
				<Text style={{color: color,top:-1}}>{this.props.title}</Text>
				}
			</View>
		)
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1, backgroundColor: 'transparent', justifyContent: 'center',
		alignItems: 'center',
	},
	navBarStyle: {
		backgroundColor: '#FFF',
	},
	tabBarStyle: {
		backgroundColor: '#FFFF',
		borderTopWidth: 1,
		borderColor: '#EEEEEE',
		height:48,
		paddingTop:4,
	},
	tabBarSelectedItemStyle: {
		backgroundColor: '#FFFF',
		// borderTopWidth: 1,
		borderColor: '#EEEEEE',
	},
	titleStyle: {
		color: '#333',
		fontSize: 20,
	},
	navBar: {
		backgroundColor: '#0D47A1',
	},
	navBarTitle: {
		color: '#FFFFFF'
	},
	barButtonTextStyle: {
		color: '#FFFFFF'
	},
	barButtonIconStyle: {
		tintColor: 'rgb(255,255,255)'
	},
	loginBg:{
		backgroundColor:'#0A93FF',
		borderBottomColor:'transparent',
	},
	header:{
		backgroundColor:'transparent',
		borderBottomColor:'transparent',
		// tintColor:'#fff'
	}
});
