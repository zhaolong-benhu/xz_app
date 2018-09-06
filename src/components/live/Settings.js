/**
 * Created by qzy on 31/05/2017.
 * File description:
 */
import React, {Component, PropTypes,} from 'react';
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
  Share,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {global_width, global_height} from '../../util'
import {glo_url} from '../../api/global';
class Settings extends Component {
	_share = () => {
        this.props.toggleMenuPopup();
        Share.share({
						message: `我是${this.props.liveRoomInfo.live_user_name},${this.props.liveRoomInfo.live_status == 2?"将在":"正在"}直播《${this.props.liveRoomInfo.course_name}》,快来看看吧。 http://m.9first.com/liveshare/${this.props.id}`,
            url: `http://m.9first.com/liveshare/${this.props.id}`,
            title: '快来围观我的直播'
        }, {
            dialogTitle: '直播分享',
            excludedActivityTypes: [
                'com.apple.UIKit.activity.PostToTwitter'
            ],
            tintColor: 'green'
        })
	}
	render() {
		return (
			<View
				style={{
					width: 90,
					height: 120,
					position: 'absolute',
					right: global_width / 4,
					top: global_height-170,
					backgroundColor: 'rgba(0,0,0,0.6)',
					justifyContent: 'space-around',
					borderRadius: 10,
					padding: 4,
					zIndex:100,
				}}
			>
				<TouchableHighlight onPress={ this._share }>
					<View style={styles.menuOptions}>
						<MaterialCommunityIcons name="share" size={18} color="#fff"/>
						<Text style={styles.popupMenuText}>分享</Text>
					</View>
				</TouchableHighlight>
				{/*<TouchableHighlight onPress={ () => this.props.toggleMenuPopup() }>*/}
					{/*<View style={styles.menuOptions}>*/}
						{/*<SimpleLineIcons name="magic-wand" size={18} color="#fff"/>*/}
						{/*<Text style={styles.popupMenuText}>美化</Text>*/}
					{/*</View>*/}
				{/*</TouchableHighlight>*/}
				<TouchableHighlight onPress={ () => this.props.onSetting() }>
					<View style={styles.menuOptions}>
						<MaterialCommunityIcons name="settings" size={18} color="#fff"/>
						<Text style={styles.popupMenuText}>设置</Text>
					</View>
				</TouchableHighlight>
			</View>
		);
	}
}

export default Settings

const styles = StyleSheet.create({
	popupMenuText: {
		fontSize: 18,
		color: '#fff',
	},
	menuOptions: {
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
});
