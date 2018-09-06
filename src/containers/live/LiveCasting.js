/**
 * Created by qzy on 22/03/2017.
 * File description:直播
 */
import React, {Component,} from 'react';
import {
	StyleSheet,
	View,
	Image,
	Button,
	Text,
	TouchableWithoutFeedback,
	TouchableHighlight,
	ListView,
	ScrollView,
    KeyboardAvoidingView,
	StatusBar,
} from 'react-native';
import { connect } from 'react-redux';
import ResponsiveImage from 'react-native-responsive-image';
import LinearGradient from 'react-native-linear-gradient';
import {CastUserInfo,ViewersBar,Chat,ButtonBottom} from '../../components';
import {
	getLiveWatchRoom
} from '../../actions/Live';
const styles = StyleSheet.create({
	topWrapper:{
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 10,
		marginTop: 30
	},
	chatWrapper:{paddingHorizontal: 10, marginBottom: 10,position: 'absolute', bottom: 40, height: 220},
	bottomWrapper:{position: 'absolute', bottom: 0},
	linearGradient: {
		flex: 1,
	},
})

class LiveCasting extends Component {
	componentWillMount() {
		this.props.getLiveWatchRoom(this.props.id)
	}
	render() {
		const castorInfo = {name:'王菲',type:'castor',money:'126'}
		const userInfo = {name:'西多夫',type:'user',money:'126'}
		const viewers = {counts:80}
		const data = [
			'张大大 今天主播讲得不错哦，老师下次讲什么内容啊阿什顿',
			'雨中歌 来了',
			'张大大 今天主播讲得不错哦按时大大撒',
			'张大大 今天主播讲得不错哦，老师下次讲什么内容啊阿斯',
			'雨中歌 来了阿斯达四大',
			'张大大 今天主播讲得不错哦',
			'雨中歌 来了',
			'张大大 今天主播讲得不错哦请问发的说按时大大法',
			'张大大 今天主播讲得不错哦，老师下次讲什么内容啊',
		]
		return (
			<View>
				<StatusBar
					backgroundColor='#303F9F'
					barStyle='light-content'
				/>
				{/*<Image style={{width:80,height:80}} source={{uri: 'https://ooo.0o0.ooo/2017/03/23/58d37a88b9603.png'}} />*/}
				<ResponsiveImage source={require('../../static/images/live/anchor.jpg')} initHeight="740">
					<LinearGradient
						locations={[0,0.3,0.7,1]}
						colors={['rgba(0,0,0,0.25)','rgba(0,0,0,0)','rgba(0,0,0,0)', 'rgba(0,0,0,0.8)']}
						style={styles.linearGradient}
					>
					<View style={styles.topWrapper}>
						<CastUserInfo {...this.props.liveRoomInfo} type={"castor"} onPress={this.props.changeLiveFavorite} id={ this.props.id } />
						<ViewersBar {...this.props.liveRoomInfo}/>
					</View>

					<View style={styles.chatWrapper}>
						<CastUserInfo {...this.props.user} type={"user"} />
					</View>

					<View style={styles.bottomWrapper}>
            <KeyboardAvoidingView behavior="position">
						<Chat data={ data } />
            </KeyboardAvoidingView>
						<ButtonBottom />
					</View>
					</LinearGradient>
				</ResponsiveImage>
			</View>
		);
	}
}

const mapStateToProps = ({liveWatchRoom, user}) => {
	return {
		liveRoomInfo: liveWatchRoom.liveRoomInfo,
		user: user.userInfo,
		roomProps: liveWatchRoom.roomProps
	}
}

export default connect(mapStateToProps, {
	getLiveWatchRoom,
})(LiveCasting)
