/**
 * Created by zhaolong on 2017/03/20.
 * File description:首页-banner
 */
'use strict'

import React, {
	Component,
} from 'react';

import {
	View,
	Text,
	ViewPagerAndroid,
	Image,
	StyleSheet,
	ToastAndroid,
	TouchableHighlight,
	TouchableWithoutFeedback
} from 'react-native'
import Swiper from 'react-native-swiper';
import {Scene, Router, Actions} from 'react-native-router-flux';
import ResponsiveImage from 'react-native-responsive-image';
export default class HomeBanner extends Component {

	onPressBanner(type,alt,linkurl,live_id){
		//App内部详情页 + 外链
		if(1 == type || 2 == type){
			Actions.XZWebView({nType:type,title:alt,url:linkurl});
		}
		//直播间
		if(3 == type){
			Actions.LiveWatching({id:live_id});
		}
	}
	render() {
		const {bannerData} = this.props;
		return (
			<View>
				{bannerData &&
					<View>
						<Swiper autoplay height={246} dot={<View style={styles.dot}/>} activeDot={<View style={styles.activeDot}/>} paginationStyle={styles.paginationStyle}>
									{bannerData.map((item, i) => {
											return <TouchableWithoutFeedback key={i} onPress={()=>this.onPressBanner(item.type,item.alt,item.linkurl,item.live_id)}>
												<Image source={{uri: item.imageurl}} style={styles.slide}/>
											</TouchableWithoutFeedback>
										})}
						</Swiper>
					</View>
				}
			</View>
		)
	}
}
var styles = StyleSheet.create({
	container: {
		height: 180,
		backgroundColor: "white"
	},
	root: {},
	img: {
		height: 180,
		resizeMode: 'cover'
	},
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
		height: 180,
		backgroundColor: '#9DD6EB',
		resizeMode: Image.resizeMode.cover,
	},
	text: {
		color: '#fff',
		fontSize: 30,
		fontWeight: 'bold',
	},

})
