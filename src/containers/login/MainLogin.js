/**
 * Created by qzy on 10/04/2017.
 * File description:
 */
import React, {Component, PropTypes,} from 'react';
import {
	AppRegistry,
	View,
	Text,
	TextInput,
	Image,
	StyleSheet,
	ToastAndroid,
	ScrollView,
	TouchableWithoutFeedback,
	TouchableHighlight,
	StatusBar,
	Platform,
	TouchableOpacity,
	Linking,
	Alert,
	ActivityIndicator,
} from 'react-native';
// import {
//   isFirstTime,
//   isRolledBack,
//   packageVersion,
//   currentVersion,
//   checkUpdate,
//   downloadUpdate,
//   switchVersion,
//   switchVersionLater,
//   markSuccess,
// } from 'react-native-update';
// import _updateConfig from '../../../update.json';
// const {appKey} = _updateConfig[Platform.OS];

import {global_width, global_height} from '../../util/screen'
import {Scene, Router, Actions} from 'react-native-router-flux';
import { connect } from 'react-redux';
import {
	testAction,
	getUesr,
	getSuccess,
} from '../../actions/Test';
import RepeatImage from '../../components/common/BackgroundRepeat';

class MainLogin extends Component {

	componentWillMount(){
	  // if (isFirstTime) {
	  // 	markSuccess();
	  // } else if (isRolledBack) {
	  // Alert.alert('提示', '刚刚更新失败了,版本被回滚.');
	  // }
	  // this.checkUpdate();
		//this.props.getUesr();
	}
	componentDidMount() {
		//this.props.testAction();

	}
	//执行更新
	// doUpdate(info){
	//   downloadUpdate(info).then(hash => {
	// 	switchVersionLater(hash)
	//   }).catch(err => {
	//   //   Alert.alert('提示', '更新失败.');
	//   });
	// }
	// //检查更新
	// checkUpdate(){
	//   checkUpdate(appKey).then(info => {
	// 	if (info.expired) {
	//
	// 	} else if (info.upToDate) {
	//
	// 	} else {
	// 	  this.doUpdate(info)
	// 	}
	//   }).catch(err => {
	//   //   Alert.alert('提示', '更新失败.');
	//   });
	// }

	render() {
		const { data, getUesr,getSuccess } = this.props;
		return (
			<View style={styles.wrapper}>
				<StatusBar
					barStyle='light-content'
				/>

				<View style={styles.bgWrapper}>
					<RepeatImage imgWidth={144} imgHeight={139} source={require('../../static/images/mainLogin/bg.png')}/>
				</View>

				<View style={{zIndex: 10, alignItems: 'center',}}>
					<Image source={require('../../static/images/mainLogin/logo.png')} style={{marginTop: global_height * 0.15}}/>



					<TouchableHighlight underlayColor={"rgba(0,0,0,0.2)"} onPress={ () => Actions.LoginScreen() }
					                    style={styles.login}>
						<Text style={{color: '#167fda', fontSize: 18,}}>登录</Text>
					</TouchableHighlight>

					<TouchableHighlight underlayColor={"rgba(255,255,255,0.4)"} onPress={ () => Actions.MainRegister()}
					                    style={styles.register}>
						<Text style={{color: '#fff', fontSize: 18,}}>注册</Text>
					</TouchableHighlight>


					<TouchableWithoutFeedback onPress={ () => getUesr() }>
						<View style={{marginTop: 75,}}>
							<Text style={{color: "#fff", fontSize: 15}}>游客模式</Text>
						</View>
					</TouchableWithoutFeedback>
					<View>
						{/*<Text>当前包版本号:{packageVersion}</Text>*/}

					</View>
				</View>

			</View>
		);
	}
}
const styles = StyleSheet.create({
	wrapper: {backgroundColor: '#167fda', flex: 1, position: 'relative', alignItems: 'center'},
	bgWrapper: {position: 'absolute', top: 0, left: 0, zIndex: 0, width: global_width * 1.4, height: global_height},
	login: {
		height: 41,
		backgroundColor: '#fff',
		width: global_width * 0.75,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 3,
		marginTop: 70
	},
	register: {
		height: 41,
		borderColor: '#fff',
		borderWidth: 1,
		width: global_width * 0.75,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 3,
		marginTop: 18
	},
})

const mapStateToProps = ({ test }) => {
	return { test };
};

export default connect(
	state => ({
		data: state.test.data
	}),
	{
		testAction,
		getUesr,
		getSuccess,
})(MainLogin);
