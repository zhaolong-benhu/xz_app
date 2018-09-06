/**
 * Created by same on 3/11/2017.
 * File description:主播头部
 */

import React, {Component, PropTypes,} from 'react';
import {Alert,View, Text, Image, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import {global_height, global_width, platform} from "../../util";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Orientation from 'react-native-orientation';
import { Actions } from 'react-native-router-flux';

export default class CastHeader extends Component {
  back = () => {
    Alert.alert(
        '提示',
        '是否停止直播',
        [
          {text: '不是', style: 'cancel'},
          {
            text: '是的', onPress: () => {
              this.props.onQuitPress()
              Orientation.lockToPortrait()
              Actions.popTo('LiveCast');
            }
          },
        ],
        { cancelable: false }
    )
  }
	render() {
		return (
      <View style={styles.headerWrapper}>
          <View style={styles.castor}>
  						<View style={{flexDirection:'row',marginRight:20,alignItems:'center'}}>
                <Image source={require('../../static/images/live/people.png')}/>
    						<Text style={[styles.redText,{color:'#00a6ea'}]}>{this.props.MemberNum}</Text>
  						</View>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <Image source={require('../../static/images/live/wallet.png')}/>
    						<Text style={styles.redText}>{this.props.red_packet}</Text>
  						</View>
          </View>
          <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end'}}>
            <View style={styles.btnRadius}>
              <TouchableOpacity onPress = {()=> this.props.rotateCamera()}>
                <Ionicons  name="md-camera" size={28} color="#fff" style={styles.icon}/>
              </TouchableOpacity>
            </View>
            <View style={[styles.btnRadius,{marginLeft:10}]}>
                <TouchableOpacity onPress={this.back}>
                  <Icon name="close" size={35} color="#fff" style={styles.icon}/>
                </TouchableOpacity>
            </View>
          </View>
      </View>
		);
	}
}


const styles = StyleSheet.create({
  icon: {backgroundColor: 'transparent'},
	shareWrapper: {flexDirection: 'row', justifyContent: 'space-between', width: 300, alignSelf: 'center', marginTop: 30},
	btnWrapper: {justifyContent: 'center', flexDirection: 'row', marginTop: 100},
  headerWrapper: {justifyContent: 'space-between', flexDirection: 'row', marginTop: 10,alignItems:'center',paddingHorizontal:20,},
  btnRadius:{
    borderRadius: 100,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#3d403e',
  },
  castor:{
    height:35,
    borderRadius:35,
    backgroundColor:'rgba(61,64,62,0.6)',
    flexDirection:'row',
    alignItems: 'center',
    paddingHorizontal:10,
  },
  redText:{color:'red',fontSize: 16,marginLeft:5},
})
