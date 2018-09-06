/**
 * Created by same on 30/10/2017.
 * File description:直播准备页面
 */

import React, {Component, PropTypes,} from 'react';
import {View, Text, Image, TextInput, TouchableOpacity, StyleSheet, StatusBar,Share} from 'react-native';
import {
	Alert
} from '../../components';

import {global_height, global_width, platform} from "../../util";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Orientation from 'react-native-orientation';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { post } from '../../helpers/helpers'
import { passIdAndStatusToRoom } from '../../actions/Live';
import { fetchCoursewareData } from '../../actions/Courseware';

import LiveComponent from '../../components/common/IOSStreaming';

class LiveReady extends Component {
	state = {
		title: '',
		start_time:''
	}
	async componentWillMount() {
		const {teacher_name,title,start_time} = await post('/mv1/user/live/live-theme')
		this.setState({teacher_name,title,start_time})
	}

	async _onPressButton() {
		//开始获取课件ppt
		this.props.fetchCoursewareData(this.props.id);

    LiveComponent.stopPush()
    const json = await post('/mv1/user/live/get-live-auth')
		console.log(json)
    if(json == "-1"){
			Orientation.lockToPortrait() //横屏
			Actions.pop()
    }else{
      //Actions.LiveWatching({id:this.props.id,  caster_status:1})
			// this.props.fetchCoursewareData(this.props.id);
      Actions.AnchorRoom({id:this.props.id,  caster_status:1})
    }
	}
  _share = () => {
    Share.share({
      message: `我是${this.state.teacher_name}正在直播《${this.state.title}》,快来看看吧。 http://m.9first.com/liveshare/${this.props.id}`,
      url: `http://m.9first.com/liveshare/${this.props.id}`,
      title: '快来先之云课堂看直播！'
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
			<View>
				<StatusBar
					backgroundColor='#303F9F'
					barStyle='light-content'
				/>
				<LiveComponent />
	          	<View style={styles.headerWrapper}>
	              <View style={styles.btnRadius}>
	      						<TouchableOpacity onPress={()=>{
	      						  LiveComponent.stopPush()
	                    	      Orientation.lockToPortrait()
	      						  Actions.pop()
	                  			}}>
	      						<Icon name="close" size={35} color="#fff" style={styles.icon}/>
	      						</TouchableOpacity>
	              </View>
	              <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end'}}>
	                <View style={styles.btnRadius}>
	                  <TouchableOpacity underlayColor={'yellow'} onPress={this._share}>
	                      <Ionicons name="md-share" size={this.props.type? 25 : 20} color="#ffffff" />
	                  </TouchableOpacity>
	                </View>
	                <View style={[styles.btnRadius,{marginLeft:10}]}>
	                    <TouchableOpacity onPress={()=>{LiveComponent.rotateCamera()}}>
	                      <Ionicons  name="md-camera" size={28} color="#fff" style={styles.icon}/>
	                  </TouchableOpacity>
	                </View>
	              </View>
	          	</View>

				<View style={styles.inputWrapper}>
        			<Text style={styles.input}>开播时间：{this.state.start_time}</Text>
        			<Text style={styles.input}>直播标题：{this.state.title}</Text>
				</View>

				<View style={styles.btnWrapper}>
					<TouchableOpacity underlayColor={'yellow'} onPress={this._onPressButton.bind(this)}>
							<View style={styles.btn}>
								<Text style={styles.btnText}>开始开播</Text>
							</View>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

// const mapStateToProps = ({coursewareList}) => {
//   return {
//     CoursewareData: coursewareList.CoursewareData
//   }
// }
export default connect(null,{passIdAndStatusToRoom,fetchCoursewareData})(LiveReady);


const styles = StyleSheet.create({

	blur: {flex: 1},
	inputWrapper: {
	height: 80,
    justifyContent: 'space-between',
    flexDirection:'column',
    alignItems:'center',
    paddingHorizontal:20,
	},
    icon: {backgroundColor: 'transparent'},
	input: {height: 40, color: '#ffffff', fontSize: 30,backgroundColor: 'transparent'},
	shareWrapper: {flexDirection: 'row', justifyContent: 'space-between', width: 300, alignSelf: 'center', marginTop: 30},
	btnWrapper: {justifyContent: 'center', flexDirection: 'row', marginTop: 100},
    headerWrapper: {justifyContent: 'space-between', flexDirection: 'row', marginTop: 20,alignItems:'center',paddingHorizontal:20,},
    btnRadius:{
	    borderRadius: 100,
	    width: 50,
	    height: 50,
	    justifyContent: 'center',
	    alignItems: 'center',
	    backgroundColor:'#3d403e',
  	},
	btnBlur: {
		width: 92,
		height: 92,
		borderRadius: 44,
		overflow: 'hidden',
		justifyContent: 'center',
		alignItems: 'center'
	},
	btn: {
		width: 150,
		height: 45,
		borderRadius: 10,
		overflow: 'hidden',
		backgroundColor: 'rgba(0,166,234,0.8)',
		justifyContent: 'center',
		alignItems: 'center'
	},
	btnText: {color: 'white', fontSize: 20,},
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
