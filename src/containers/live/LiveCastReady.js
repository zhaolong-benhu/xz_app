/**
 * Created by qzy on 21/03/2017.
 * File description:直播准备页面
 */

import React, {Component, PropTypes,} from 'react';
import {View, Text, Image, TextInput, TouchableOpacity, StyleSheet, StatusBar} from 'react-native';
import {
	Alert
} from '../../components';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { post } from '../../helpers/helpers'
import {
	passIdAndStatusToRoom
} from '../../actions/Live';
import LiveComponent from '../../components/common/IOSStreaming';

const styles = StyleSheet.create({
	text: {
		color: 'white',
		textAlign: 'center',
		marginTop: 12,
		backgroundColor:'transparent'
	},
	icon: {position: 'absolute', right: 13, top: 20, backgroundColor: 'transparent'},
	blur: {flex: 1},
	inputWrapper: {
		height: 70,
		borderColor: 'white',
		borderBottomWidth: 1,
		width: 310,
		alignSelf: 'center',
		marginTop: 150
	},
	input: {height: 70, color: 'white', fontSize: 30,},
	shareWrapper: {flexDirection: 'row', justifyContent: 'space-between', width: 300, alignSelf: 'center', marginTop: 30},
	btnWrapper: {justifyContent: 'center', flexDirection: 'row', marginTop: 90},
	btnBlur: {
		width: 92,
		height: 92,
		borderRadius: 44,
		overflow: 'hidden',
		justifyContent: 'center',
		alignItems: 'center'
	},
	btn: {
		width: 88,
		height: 88,
		borderRadius: 44,
		overflow: 'hidden',
		backgroundColor: 'rgba(255,98,98,0.9)',
		justifyContent: 'center',
		alignItems: 'center'
	},
	btnText: {color: 'white', fontSize: 30},
	preview: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	capture: {
		flex: 0,
		backgroundColor: '#fff',
		borderRadius: 5,
		color: '#000',
		padding: 10,
		margin: 40
	}
})

class LiveCastReady extends Component {
	state = {
		title: ''
	}
	async componentWillMount() {
		const {title} = await post('/mv1/user/live/live-theme')
		this.setState({title})
	}

	async _onPressButton() {
    LiveComponent.stopPush()
    const json = await post('/mv1/user/live/get-live-auth')
		console.log(json)
    if(json == "-1"){
			Actions.pop()
    }else{
      // this.props.passIdAndStatusToRoom(this.props.id, 1)
      Actions.LiveWatching({id:this.props.id,  caster_status:1})
    }
	}
	render() {
		return (
			<View>
				<StatusBar
					backgroundColor='#303F9F'
					barStyle='light-content'
				/>
        <LiveComponent />
				{/*<ResponsiveImage source={require('../../static/images/live/anchor.jpg')} initHeight="740">*/}
					{/* <BlurView blurType="dark" blurAmount={1} style={styles.blur}> */}
						<TouchableOpacity onPress={()=>{
						  LiveComponent.stopPush()
						  Actions.pop()
            }}>
							<Icon name="close" size={28} color="#fff" style={styles.icon}/>
						</TouchableOpacity>

						<View style={styles.inputWrapper}>
							<TextInput
								placeholderTextColor={"white"}
								placeholder={"填写直播主题"}
								editable={false}
								style={styles.input}
								onChangeText={(title) => this.setState({title})}
								textAlign='center'
								value={this.state.title}
							/>
						</View>


						{/*<View style={styles.shareWrapper}>*/}
							{/*<View>*/}
								{/*<Image source={require('../../static/images/live/wechat.png')}/>*/}
								{/*<Text style={styles.text}>微信</Text>*/}
							{/*</View>*/}
							{/*<View>*/}
								{/*<Image source={require('../../static/images/live/qq.png')}/>*/}
								{/*<Text style={styles.text}>QQ</Text>*/}
							{/*</View>*/}
							{/*<View>*/}
								{/*<Image source={require('../../static/images/live/sina.png')}/>*/}
								{/*<Text style={styles.text}>新浪</Text>*/}
							{/*</View>*/}
							{/*<View>*/}
								{/*<Image source={require('../../static/images/live/qqZone.png')}/>*/}
								{/*<Text style={styles.text}>QQ空间</Text>*/}
							{/*</View>*/}
							{/*<View>*/}
								{/*<Image source={require('../../static/images/live/wechatShare.png')}/>*/}
								{/*<Text style={styles.text}>朋友圈</Text>*/}
							{/*</View>*/}
						{/*</View>*/}

						<View style={styles.btnWrapper}>
							<TouchableOpacity underlayColor={'yellow'} onPress={this._onPressButton.bind(this)}>
								 {/* <BlurView blurType="light" blurAmount={5} style={styles.btnBlur}> */}
									<View style={styles.btn}>
										<Text style={styles.btnText}>开播</Text>
									</View>
								{/* </BlurView> */}
							</TouchableOpacity>
						</View>

					{/* </BlurView> */}
				{/*</ResponsiveImage>*/}
			</View>
		);
	}
}


export default connect(null,{passIdAndStatusToRoom})(LiveCastReady);
