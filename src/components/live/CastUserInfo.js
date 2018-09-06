/**
 * Created by qzy on 24/03/2017.
 * File description:用户信息
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
} from 'react-native';

const styles = StyleSheet.create({
	wrapper: {
		height: 39,
		backgroundColor: 'rgba(0,0,0,0.5)',
		borderRadius: 100,
		flexDirection: 'row',
		alignItems: 'center',
		paddingRight: 4,
	},
	imageWrapper: {width: 38, height: 35, borderRadius: 40, overflow: 'hidden', marginLeft: 2},
	row: {
		marginBottom: 4,
	},
	avatar: {width: 35, height: 35, marginHorizontal: 2,borderRadius:17},
	text: {color: '#fff', fontSize: 14, },
	red: {color: 'red'},
	subContent: {color: 'white', fontSize: 12, marginLeft: 2},
	subContentWrapper: {flexDirection: 'row', alignItems: 'center', marginTop: 2,marginRight:8},
	contentWrapper: {marginLeft: 6,},
	redText:{color: 'red', fontSize: 12, marginLeft: 2},
	btnWrapper:{backgroundColor:'#ffa60b',borderRadius:20,padding:8,marginLeft:4,},
	btnWrapperGray:{backgroundColor:'#ccc',borderRadius:20,padding:8,marginLeft:4,},
	btnText:{color:'white',fontSize:15}
})
class CastUserInfo extends Component {
	renderBtn() {
		if(this.props.type === "castor"){
			if(this.props.is_favorite == 0 ) {
				return (
					<View style={styles.btnWrapper}>
						<TouchableWithoutFeedback onPress={ () => this.props.onPress()}>
							<View>
								<Text style={styles.btnText}>关注</Text>
							</View>
						</TouchableWithoutFeedback>
					</View>
				)
			} else {
				return (
					<View style={styles.btnWrapperGray}>
						<TouchableWithoutFeedback onPress={ () => this.props.onPress()}>
							<View>
								<Text style={styles.btnText}>已关注</Text>
							</View>
						</TouchableWithoutFeedback>
					</View>
				)
			}
		}
	}
	renderContent() {
		const { type, live_user_name, money } = this.props;
		if (type === 'castor') {
			return (
				<View>
					<Text style={styles.text}>{live_user_name}</Text>
					<View style={styles.subContentWrapper}>
						<Image source={require('../../static/images/live/wallet.png')}/>
						<Text style={styles.redText}>￥{this.props.red_packet}</Text>
					</View>
				</View>
			)
		}
		if (type === 'user') {
			return (
				<View style={{marginRight:8}}>
					<Text style={styles.text}>{this.props.user_name}</Text>
					<View style={styles.subContentWrapper}>
						<Text style={styles.subContent}>包了一个
							<Text style={styles.red}>{money}元</Text>
							的红包</Text>
					</View>
				</View>
			)
		}
	}

	render() {
		return (
			<View style={styles.wrapper}>
					<View style={styles.imageWrapper}>
						{
							this.props.type === "castor" ?
								<Image source={{ uri: this.props.live_user_thumb }} style={styles.avatar}/>:
								<Image source={{ uri: this.props.user_thumb }} style={styles.avatar}/>
						}
					</View>

					<View style={styles.contentWrapper}>
						{this.renderContent()}
					</View>

					{
						!this.props.is_caster?
							this.renderBtn()
							:null
					}
			</View>
		);
	}
}

export default CastUserInfo;
