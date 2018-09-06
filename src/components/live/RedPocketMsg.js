/**

 * Created by qzy on 26/05/2017.

 * File description:

 */
/**

 * Created by qzy on 26/03/2017.

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
	Animated,
	Easing,
} from 'react-native';
import InvertibleScrollView from 'react-native-invertible-scroll-view';
import {Container, Content, Badge,} from 'native-base';
import _ from 'lodash';

const styles = StyleSheet.create({
	wrapper: {
		height: 39,
		// backgroundColor: 'rgba(0,0,0,0.5)',

		// borderRadius: 100,

		flexDirection: 'row',
		alignItems: 'center',
		paddingRight: 4,
		marginVertical: 4,
	},
	imageWrapper: {width: 35, height: 35, borderRadius: 40, overflow: 'hidden', marginLeft: 2},
	row: {marginBottom: 4,},
	avatar: {width: 35, height: 35, marginHorizontal: 2, borderRadius:17},
	text: {color: '#fff', fontSize: 14, },
	red: {color: 'red'},
	subContent: {color: 'white', fontSize: 12, marginLeft: 2},
	subContentWrapper: {flexDirection: 'row', alignItems: 'center', marginTop: 2},
	contentWrapper: {marginLeft: 6,},
	redText:{color: 'red', fontSize: 12, marginLeft: 2},
	btnWrapper:{backgroundColor:'#ffa60b',borderRadius:20,padding:8,marginLeft:4,},
	btnWrapperGray:{backgroundColor:'#ccc',borderRadius:20,padding:8,marginLeft:4,},
	btnText:{color:'white',fontSize:15},
	paybg:{height:25,width:185},
})

class RedPocketMsg extends Component {
	state = {
		fadeOutOpacity: new Animated.Value(0),
		data:{},//需要动画的队列数据

		AnimatedIndex: 0,//目前最后做动画序号

		animating: false,
		paybg:require('../../static/images/live/payBg.png'),
	};

	startAnimation() {
		this.setState({animating:true})
		this.state.fadeOutOpacity.setValue(1);
		Animated.timing(this.state.fadeOutOpacity, {
			toValue: 0,
			duration: 1500,
			delay:5000,
			easing: Easing.linear,// 线性的渐变函数

		}).start(()=> {
			this.setState({animating:false})
			if(this.state.AnimatedIndex < this.state.data.length-1) {
				this.startAnimation(this.state.AnimatedIndex)
				this.setState({
					AnimatedIndex: this.state.AnimatedIndex  + 1
				})
			}
		});
	}
	componentWillMount(nextProps) {
			this.setState({
				data: this.props.data,
			})
			if(this.props.is_caster){
				this.startAnimation()
			}else{
				if(!this.props.isFull || this.props.num==0){
					this.props.onChangeNum(this.props.data.length)
					this.startAnimation()
				}
			}
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.data !== this.props.data){
			if(nextProps.data.length!=this.props.data.length){
				this.setState({data: nextProps.data})
				if(this.state.AnimatedIndex < this.state.data.length && this.state.animating === false){
					this.setState({
						AnimatedIndex: this.state.AnimatedIndex  + 1
					})
					this.startAnimation()
				}
			}
		}
	}

	render() {
		return (

		 <Animated.View style={[styles.wrapper, {opacity: this.state.fadeOutOpacity,}]}>
				{/* <View style={styles.imageWrapper}>
					<Image source={{ uri: this.state.data[this.state.AnimatedIndex].userIcon }} style={styles.avatar}/>
				</View> */}
								<View style={{backgroundColor:'rgba(255,255,255,0.1)',paddingTop:2,paddingLeft:5,zIndex:999}}>
                  <Image source={this.state.paybg} style={styles.paybg}/>
                      <View style={{flexDirection:'row',marginTop:-25,paddingLeft:15,height:25,alignItems:'center'}}>
                      <Text style={{color:'#fff',fontSize:12}}>{this.state.data[this.state.AnimatedIndex].userName}:</Text><Text style={{color:'#e94e4d',fontSize:12}}>  打赏{this.state.data[this.state.AnimatedIndex].redPocketNum}</Text>
                  </View>
                </View>
				{/* <View style={styles.contentWrapper}>
					<View style={{marginRight:8}}>
						<Text style={styles.text}>{this.state.data[this.state.AnimatedIndex].userName}</Text>
						<View style={styles.subContentWrapper}>
							<Text style={styles.subContent}>包了一个
								<Text style={styles.red}>{this.state.data[this.state.AnimatedIndex].redPocketNum}元</Text>
								的红包</Text>
						</View>
					</View>
				</View> */}

			</Animated.View>
		);
	}
}

export default RedPocketMsg
