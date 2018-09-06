/**
 * Created by qzy on 17/05/2017.
 * File description:支付弹窗
 */
import React, {Component,} from 'react';
import {
	StyleSheet,
	View,
	Image,
	Text,
	TouchableWithoutFeedback,
	TouchableHighlight,
	TouchableOpacity,
	Dimensions,
	TextInput,
	Modal,
} from 'react-native';
import {Alert} from '../../components';
import {global_width,global_height,platform}  from '../../util';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Card, Button, Avatar} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import Orientation from 'react-native-orientation';
const styles = StyleSheet.create({
	innerWrapper: {backgroundColor: 'rgb(255,255,255)', borderRadius: 6, width: global_width * 0.80,zIndex:9999999},
	innerWrapper2: {backgroundColor: 'rgb(255,255,255)', borderRadius: 6, width: global_width * 0.80,zIndex:9999999},
	wrapper: {backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', flex: 1,},
	wrapper2: {backgroundColor: 'rgba(0,0,0,0.5)', paddingTop:70, alignItems: 'center', flex: 1,},
	icon: {position: 'absolute', right: 6, top: 6},
	title: {textAlign: 'center', paddingBottom: 25, fontSize: 24},
	item: {width: 128, height: 79, margin: 8},
	titleWrapper: {
		paddingHorizontal: 12,
		height: 40,
		backgroundColor: '#ffa60c',
		borderTopLeftRadius: 4,
		borderTopRightRadius: 4,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems:'center',
	},
	priceBg:{
		width:25,height:30,backgroundColor:'#fff',marginRight:5,borderColor:'#ececec',borderWidth:1,justifyContent:'center',alignItems:'center',flexDirection:'row'
	},
	priceBg_sel:{
		width:25,height:30,backgroundColor:'#ff6b6b',marginRight:5,justifyContent:'center',alignItems:'center',flexDirection:'row'
	},
	rmb_icon:{
		color:'#ff6b6b',fontSize:8,
	},
	rmb_icon_sel:{
		color:'#fff',fontSize:8,
	},
	priceText:{
		color:'#ff6b6b',
	},
	priceText_sel:{
		color:'#fff',
	}
})

class PayModal extends Component {
	state={
		bInputFocus:false,
		currentSelected:1,
		moneyArry:[
			{price:"1"},
			{price:"3"},
			{price:"6"},
			{price:"12"}
		]
	}
	//输入框获得到焦点
	onFocus(){
		this.setState({bInputFocus:true});
	}
 	//输入框失去焦点
	onBlur(){
		this.setState({bInputFocus:false});
	}
	//IOS选中价格
	selectedPrice(i){
		this.setState({currentSelected:i});
		this.props.changePay(this.state.moneyArry[i].price);
	}
	componentDidMount(){
		if(platform == "ios"){
			this.props.changePay(this.state.moneyArry[1].price);
		}
	}
	render() {
		return (
			<View style={{backgroundColor: 'rgba(0,0,0,0.5)',width:this.props.isFull ? global_height : global_width,height:this.props.isFull ? global_width:global_height,zIndex:120,position:'absolute',top:0,left:0}}>
				{
					<View style={this.state.bInputFocus&&!this.props.isFull?styles.wrapper2:styles.wrapper}>
						<View style={this.state.bInputFocus?styles.innerWrapper2:styles.innerWrapper2}>
							<View style={styles.titleWrapper}>
								<Text style={{fontSize: 18, color: '#fff',}}>包红包</Text>
								<TouchableOpacity onPress={() => this.props.togglePayModal()} style={{width:24,}}>
									<Ionicons name="md-close" size={24} color="#fff" style={{marginTop: 10}}/>
								</TouchableOpacity>
							</View>
							<View style={{alignItems: 'center', paddingVertical: 10, height: 240}}>
								<View style={{flexDirection: 'row',}}>
									<Text style={{color: '#999', marginRight: 10}}>发红包给</Text>
									<Text style={{color: '#333'}}>{this.props.liveRoomInfo.live_user_name}</Text>
								</View>

                <View style={{borderWidth: 1, borderColor: '#e4e4e4',borderRadius:35,width:70,height:70,marginTop:12}}>
                  {
                    this.props.liveRoomInfo.live_user_thumb ?
                    <Image source={{uri: this.props.liveRoomInfo.live_user_thumb }} style={{width:70,height:70,borderRadius:35,}}/>
                    :
                    <Icon name="user-circle" color="#ddd" size={44} />
                  }

                </View>
								{platform == "android"?
									<View style={{position:'absolute',bottom:70,left:global_width*0.4-55,flexDirection:'row'}}>
										<View style={{borderWidth:1,borderColor:'#e4e4e4',height:40,paddingRight:10,paddingLeft:14,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
											<TextInput
												  underlineColorAndroid="transparent"
												  placeholderTextColor={"#999"}
											  	  style={{ color: '#fe2d30', fontSize: 15,width:64,height:40,alignItems:'center', paddingTop: 0,paddingBottom: 0}}
												  onChangeText={(text) => this.props.changePay(text)}
												  value={ this.props.payNumber.toString() }
												  maxLength={6}
												  onFocus={ ()=> this.onFocus() }
												  onBlur={ ()=> this.onBlur() }
											/>
											<Text>元</Text>
										</View>
										<Button
											backgroundColor="transparent"
											textStyle={{color:'#137edc'}}
											title='随机'
											onPress={() => this.props.randomPay() }
										/>
									</View>
									:
									<View style={{position:'absolute',bottom:100,left:global_width*0.4-55,flexDirection:'row'}}>
										{this.state.moneyArry.map((v,i)=>{
											return <TouchableOpacity onPress={()=>this.selectedPrice(i)} key={i} style={this.state.currentSelected==i?styles.priceBg_sel:styles.priceBg}>
													{/*<Text style={this.state.currentSelected==i?styles.rmb_icon_sel:styles.rmb_icon}>¥</Text>*/}
													<Text style={this.state.currentSelected==i?styles.priceText_sel:styles.priceText}>{v.price}</Text>
										 	       </TouchableOpacity>
										})}
									</View>
								}

								<View style={{position: 'absolute', bottom: 10, left: global_width * 0.4 - 73}}>
									<Button
										backgroundColor="#ff6b6b"
										title='包红包'
										buttonStyle={{borderRadius: 4, width: 120,}}
									    onPress={()=>{
									  	if( this.props.payNumber == 0 ){
									  		Alert('金额不能为0')
										  }else{
						                        this.props.togglePayModal()//关闭红包模态窗
						                        //这是RN的bug，连续触发modal显示
						                        setTimeout(()=>this.props.toggleCheckoutModal('redPocket'),0)//关闭支付模态窗
                      						}
									  }}
									/>
								</View>
							</View>
						</View>
					</View>
				}
			</View>
		);
	}
}

export default PayModal
