/**
 * Created by qzy on 31/03/2017.
 * File description:顶部按钮
 */
import React, {Component, PropTypes,} from 'react';
import {
	StyleSheet,
	View,
	Image,
	TouchableWithoutFeedback,
	TouchableHighlight,
	ListView,
	ScrollView,
	NativeModules,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Actions} from 'react-native-router-flux';
import {Text} from 'native-base';
import {api_isLiveUser,glo_url} from '../../api/global';
import {platform} from '../../util/platform';
import { post } from '../../helpers/helpers';

const styles = StyleSheet.create({
	avatarWrapper: {
		width: 45,
		height: 45,
		alignSelf: 'center',
		borderRadius: 22,
		overflow: 'hidden',
		marginLeft: 8,
	},
	avatar: {
		width: 37,
		height: 37,
		borderRadius:18,
		marginTop:4,
	},
})

const pressGoLive = (user) => async () => {
  if(user.user_ticket){
    try {
      let res = await post(api_isLiveUser);
      if (res.is_live_user == 1) {
        switch (res.live_status) {
          case "1":
            //跳转直播准备页面
            if(platform === "ios"){
              // Actions.LiveCastReady({id: res.live_id})
				Actions.LiveReady({id: res.live_id})
            }else{
              const json = await post('/mv1/user/live/get-live-auth')
              if(json == "-1"){ //直播没有权限
                Actions.pop()
              }else{
				NativeModules.LiveNativeModule.LivePublisher(res.live_id,user.user_ticket)
              }
            }
            break;
          case "2":
            //申请未通过
            Actions.XZWebView({title:'提交审核',url:glo_url+'/tutorregister/verify/2'});
            break;
          case "0":
            //申请已提交
            Actions.XZWebView({title:'提交审核',url:glo_url+'/tutorregister/verify/3'});
            break;
          default:
            Actions.XZWebView({title:'主播报名',url:glo_url+'/live/enroll'});
            break;
        }
      }else {
        //申请主播
        Actions.XZWebView({title:'主播报名',url:glo_url+'/live/enroll'});
      }
    } catch (err) {
      //Actions.LoginScreen();
    }
  }else{
		platform=='ios' ?
    Alert.alert(
        '提示',
        '请先登录',
        [
          {text: '取消'},
          {text: '登录', onPress: () => Actions.LoginScreen(), },
        ],
        { cancelable: false }
    )
		:
		Actions.LoginScreen()
  }
	//查询是否是主播，跳转触屏和直播页面


}

const ButtonRight = ({ user, containerStyle }) => {
	return (
		<View style={[{flexDirection: 'row', alignItems: 'center'},containerStyle]}>
				<TouchableHighlight onPress={ pressGoLive(user) } underlayColor={'rgba(255,255,255,0.4)'}>
							<View style={{
								height: 26,
								flexDirection: 'row',
								borderWidth: 1,
								borderColor: '#157eda',
								borderRadius: 3,
								alignItems: 'center',
								paddingHorizontal: 4,
								marginRight:5,
								justifyContent:'center',
							}}>
								<MaterialCommunityIcons name='play' size={20} color="#157eda"/>
								<Text style={{fontSize: 12, color: '#157eda', marginLeft: 1,  marginRight: 4,}}>我要直播</Text>
							</View>
				</TouchableHighlight>
			<TouchableHighlight style={styles.avatarWrapper} onPress={() => Actions.Me()}>
			{(()=>{
					if(user && user.thumb){
						return	<Image source={{ uri: user.thumb }} style={styles.avatar}/>
					}else{
						return <Icon name="user-circle" color="#ddd" size={33} style={{marginTop:5,marginLeft:2}}/>
					}
			})()}
			</TouchableHighlight>
		</View>
	)
}


export default ButtonRight
