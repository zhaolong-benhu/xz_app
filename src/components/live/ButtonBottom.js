/**
 * Created by qzy on 26/03/2017.
 * File description:主播底部按钮
 */
import React, {Component,} from 'react';
import {
	StyleSheet,
	View,
	TouchableHighlight,
  Alert,
	TextInput,
} from 'react-native';
import { onSendMsg } from '../../components/common/base'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Dimensions from 'Dimensions';
import {Actions} from 'react-native-router-flux';
import {global_width} from '../../util'
const styles = StyleSheet.create({
	wrapper: {
		backgroundColor: 'rgba(0,0,0,0.7)',
		width: Dimensions.get('window').width,
		height: 50,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
  btn:{width:global_width*0.25,alignItems:'center',height:50,justifyContent:'center'},
})

class ButtonBottom extends Component {

	back = () => {
    Alert.alert(
        '提示',
        '是否停止直播',
        [
          {text: '不是', style: 'cancel'},
          {
            text: '是的', onPress: () => {
              this.props.onQuitPress()
              Actions.popTo('LiveCast');
            }
          },
        ],
        { cancelable: false }
    )
    // Alert.alert(
    //     '是否停止直播',
    //     [
    //       {text: '不是'},
    //       {
    //           text: '是的', onPress: () => {
    //           this.props.onQuitPress()
    //           Actions.LiveCast();
    //         }
    //       }
    //     ],
    //     { cancelable: false }
    // )
	}
	_onSendMsg =  () => {
		//弹幕不能立即清空输入内容,付款发送后清空
		const {loginInfo, avChatRoomId} = this.props.liveChatRoom
		const text = this.props.text
		if(this.props.emitPayText){
			if(this.props.livePay.textPayNums > 0) {
				this.props.getBarragesOrder(this.props.id)
				this.props.toggleCheckoutModal('barrage')
				// onSendMsg(text, 1, loginInfo, avChatRoomId);
			}else{
				onSendMsg(text, 1, loginInfo, avChatRoomId);
				this.props.clearInput()
			}

		}else{
			onSendMsg(this.props.text, 0, loginInfo, avChatRoomId);
			this.props.clearInput()
		}
	}
	render() {
		return (
			<View>
			<View style={styles.wrapper}>
				<TouchableHighlight onPress={()=> this.refs.textInput.focus()} style={styles.btn}>
					<MaterialCommunityIcons name="message-text-outline" size={30} color="#fff"/>
				</TouchableHighlight>
				<TouchableHighlight onPress = {()=> this.props.rotateCamera()} style={styles.btn}>
					<MaterialCommunityIcons name="camera-party-mode" size={30} color="#fff"/>
				</TouchableHighlight>
				{/*<TouchableHighlight>*/}
					{/*<MaterialCommunityIcons name="message-video" size={30} color="#fff"/>*/}
				{/*</TouchableHighlight>*/}
				<TouchableHighlight onPress={()=>this.props.toggleMenuPopup()} style={styles.btn}>
					<MaterialCommunityIcons name="menu" size={30} color="#fff"/>
				</TouchableHighlight>
				<TouchableHighlight onPress={this.back} style={styles.btn}>
					<MaterialCommunityIcons name="close" size={30} color="#fff"/>
				</TouchableHighlight>
			</View>
				<TextInput
					ref="textInput"
					autoCapitalize="none"
					placeholderTextColor={"#999"}
					placeholder={"说点什么"}
					style={{width:0}}
		            returnKeyType={'send'}
		            returnKeyLabel={'send'}
		            autoCorrect={false}
					onChangeText={this.props.onChangeText}
					textAlign='left'
					value={this.props.text}
					onFocus={ () => this.props.onFocus()}
					onSubmitEditing={this._onSendMsg}
					onEndEditing={()=> this.props.closeInput()}
				    maxLength={34}
				/>
			</View>
		);
	}
}

export default ButtonBottom
