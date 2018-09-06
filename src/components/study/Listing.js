/**
 * Created by zhaolong on 2017/03/31.
 * File description:书包-listview列表
 */
import React, {
	Component,
} from 'react';
import {
	AppRegistry,
	ListView,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableHighlight,
	View,
	Image,
	ToastAndroid,
	Platform,
	AlertIOS,
	ActivityIndicator,
	RefreshControl,
	InteractionManager
} from 'react-native';

import {global_width, global_height} from '../../util/screen'
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
import {Scene, Router,Actions} from 'react-native-router-flux';
import {api_mycourse,api_mycertificate,api_myihma,api_myopenclass,glo_url} from '../../api/global';
import {LoadMore,Alert,Loading} from '../../components';

export default class Listing extends Component {
	state = {
		data: [],
		bFlag: false,
		tips: '您还没有精品课哦，快去查看学习哟！',
		nSelected: 0,
		isRefreshing: false,
		loadingMore: false,
		loading: false,
		bShowfooter: false,
		hideTitle: true,
		isLoadAll: false,
		loaded: false,
		tipsAll: [
			{msg: "您还没有精品课哦，快去查看学习哟！"},
			{msg: "您还没有专业证书哦，快去查看学习哟！"},
			{msg: "您还没有IHMA证书哦,快去查看哟！"},
			{msg: "您还没有报名参加公开课哦，快去参加哟！"}
		],
		default_thumb: require('../../static/images/study/course_defaultbg.jpg'),
		daysBg: require('../../static/images/study/daysBg.png')
	}
	static defaultProps = {
		empty: require('../../static/images/study/empty.png')
	}

	constructor(props) {
		super(props);
		this.nPage = 2;
		this.realtoEnd = 0;
		this.CourseUrl = "kecheng/";
		this.CertificateUrl = "kechengbao/";
		this.IhmaUrl = "ihmaDetail/";
		this.OpenclassUrl = "gongkaike/";
		this.basic_url = glo_url+"/";
		this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	}

	shouldComponentUpdate() {
		this.setState({tips: this.state.tipsAll[this.props.nSelected].msg});
		return true;
	}

	componentWillReceiveProps(nextProps, nextState) {
		if(this.props.nSelected != nextProps.nSelected){
			this.realtoEnd = 0;
		}
		this.setState({nSelected: this.props.nSelected, tips: this.state.tipsAll[this.props.nSelected].msg});
		this.setState({isRefreshing: false});
	}

	//续购
	Repurchase(secId, rowId, rowMap) {
		var url = '';
		var title ='';
		if(this.state.nSelected == 0){
			url = this.CourseUrl+this.props.data[rowId].course_id;
			title　= this.props.data[rowId].title;
			if('4' == this.props.data[rowId].status){//已过期才可以续购
				Actions.XZWebView({url:this.basic_url+url,title:title});
			}
		}
		if(this.state.nSelected == 1){
			url = this.CertificateUrl+this.props.data[rowId].product_id;
			title　= this.props.data[rowId].title;
			if('4' == this.props.data[rowId].status){//已过期才可以续购
				Actions.XZWebView({url:this.basic_url+url,title:title});
			}
		}
		if (this.state.nSelected == 2) {
			url = this.IhmaUrl + this.props.data[rowId].cert_id;
		}
		if (this.state.nSelected == 3) {
			url = this.OpenclassUrl + this.props.data[rowId].id;
		}
	}

	//删除课程
	deleteRow(secId, rowId, rowMap) {
		if (this.state.nSelected == 0) {
			if ('4' == this.props.data[rowId].status || '5' == this.props.data[rowId].type) {
				this.props.callbackParent("delete", this.props.data[rowId].type, this.props.data[rowId].course_id, null);
				this.props.data.splice(rowId, 1);
				this.setState({bFlag: !this.state.bFlag});

			} else {
				Alert('该课程目前无法进行删除！');
			}
		}
		else {
			Alert('该课程目前无法进行删除！');
		}
	}
	//进入详情页
	gotoCourse(data) {
		const {title,id,status,is_time,course_id, cert_id, product_id,is_study_status} = data;
        this.props.showScoreRightBtn();

		if (this.state.nSelected == 0) {
			if(4 == status){
				Alert('课程已过期，请重新购买学习~');
			}else {
				Actions.CourseDetail({course_id, cert_id, product_id, _type: 1, title: '精品课详情'});
			}
		}
		if (this.state.nSelected == 1) {
      this.props.showScoreRightBtn();
			if(is_time == "1"){
				Actions.CourseDetail({course_id, cert_id, product_id, _type: 6, title: '课程包详情'});
			}else {//已过期
				if(status == "2"){
	  	        //已结业
	  			Alert('已获得证书，请勿重新购买~');
	  	      }else {
	  		    Alert('课程已过期，请重新购买学习~');
	  	      }
			}
		}
		if (this.state.nSelected == 2) {
			if(is_study_status == 0){
				Alert("该课程已过期，不能再学哦~");
			}else{
				this.props.hideScoreRightBtn();
				Actions.CourseDetail({course_id, cert_id, product_id, _type: 2, title: 'IHMA详情', lecture_id: 0, sort: 0});
			}
		}
		if(this.state.nSelected == 3){
			if(data.type == "13" || data.type == "14" || data.type == "15" || data.type == "16"){
				Actions.XZWebView({title:title,url:this.basic_url+'huodong/'+id});
			}else {
				Actions.XZWebView({title:title,url:this.basic_url+'gongkaike/'+id});
			}
		}
	}
	_goUrl(){
		switch (this.state.nSelected) {
			case 0:
				Actions.XZWebView({title: '在线课程', url: glo_url + '/kecheng/list/0-1-2'})
				break;
			case 1:
				Actions.XZWebView({title: '专业证书', url: glo_url + '/kecheng/list/0-1-3'})
				break;
			case 2:
				Actions.XZWebView({title: 'IHMA证书', url: glo_url + '/ihma'})
				break;
			case 3:
				Actions.XZWebView({title: '线下公开课', url: glo_url + '/gongkaike'})
				break;
			default:

		}this.state.nSelected
	}
	//渲染每行数据
	renderCourse(data) {
		return (
			<TouchableHighlight onPress={() => this.gotoCourse(data)}>
				<View style={{borderBottomWidth: 5, borderTopWidth: 5,borderColor:'#FFFFFF'}}>
					<View style={styles.coursecontainer}>
						{(() => {
							if (this.state.nSelected == 2) {
								if (data.picture) {
									return <Image source={{uri: data.picture}} style={styles.thumbihma}/>
								} else {
									return <Image source={this.state.default_thumb} style={styles.thumbihma}/>
								}
							} else {
								if (data.thumb) {
									return <Image source={{uri: data.thumb}} style={styles.thumbnail}/>
								} else {
									return <Image source={this.state.default_thumb} style={styles.thumbnail}/>
								}
							}
						})()}

						<View style={styles.rightContainer}>
							<View style={styles.cert}>
								{(() => {
									if (this.state.nSelected == 1) {
										return <View style={styles.cert_Bg}>
											<Text style={styles.sign}>证书</Text>
										</View>
									}
									if (this.state.nSelected == 3) {
										switch (data.type) {
											case "13":
												return <View style={styles.summit_Bg}>
													<Text style={styles.sign}>峰会</Text>
												</View>
												break;
											case "14":
												return <View style={styles.cert_Bg}>
													<Text style={styles.sign}>展会</Text>
												</View>
												break;
											case "15":
												return <View style={styles.salon_Bg}>
													<Text style={styles.sign}>沙龙</Text>
												</View>
												break;
											case "16":
												return <View style={styles.study_Bg}>
													<Text style={styles.sign}>学习考察</Text>
												</View>
												break;
											default:
										}
									}
								})()}
								<Text style={styles.coursetitle} numberOfLines={1}>{data.title || data.name}</Text>
							</View>
							{(() => {
								switch (this.state.nSelected) {
									case 0: {
										return <Text style={styles.learnnum}>{data.study_num}人学过</Text>
									}
										break;
									case 1: {
										return <View style={styles.info}>
											<Text style={styles.coursenum}>共{data.course_num}门课程</Text>
											<Text style={styles.line}>|</Text>
											<Text style={styles.learnnum2}>{data.study_num}人学过</Text>
										</View>
									}
										break;
									case 2: {

									}
										break;
									case 3: {
										return <View style={styles.info2}>
											<Text style={styles.coursenum}>{data.teacher_name}</Text>
											<View style={styles.city_date}>
												<Text style={styles.start_time}>{data.start_time}</Text>
												<Text style={styles.city}>{data.city_abbreviation}</Text>
											</View>
										</View>
									}
										break;

									default:

								}
							})()}

							{(() => {
								if (this.state.nSelected == 0) {
									if ('1' == data.status || '2' == data.status) {
										return <Text style={styles.studing}>学习中</Text>
									}
									if ('3' == data.status) {
										return <Text style={styles.studing}>已完成</Text>
									}
									if ('4' == data.status) {
										return <Text style={styles.study}>已过期</Text>
									}
								}
								if (this.state.nSelected == 1) {
									if ('0' == data.status) {
										return <Text style={styles.studing}>已报名</Text>
									} else if ('1' == data.status) {
										return <Text style={styles.studing}>学习中</Text>
									} else if ('2' == data.status) {
										return <Text style={styles.studing}>已结业</Text>
									} else if ('3' == data.status) {
										return <Text style={styles.studing}>已通过</Text>
									} else if ('4' == data.status) {
										return <Text style={styles.notpassed}>未通过</Text>
									} else if ('5' == data.status) {
										return <Text style={styles.notpassed}>未完成</Text>
									}
								}
								if (this.state.nSelected == 2) {
									return <Text style={styles.apply}>{data.study_num}人报考</Text>
								}
								if (this.state.nSelected == 3) {
									if( data.real_price == "0.00"){
										return <View style={styles.price_viewnum}>
											<Text style={styles.notpassed}>免费</Text>
											<Text style={styles.interest}>{data.view_num}人感兴趣</Text>
										</View>
									}else {
										return <View style={styles.price_viewnum}>
											<Text style={styles.notpassed}>¥{data.real_price}</Text>
											<Text style={styles.interest}>{data.view_num}人报名</Text>
										</View>
									}
								}
							})()}
						</View>

						{(()=>{
							if(this.state.nSelected == 0 || this.state.nSelected == 1){
							return	<View style={styles.actions}>
									<View style={styles.rightDays}>
										<Image style={styles.daysBg} source={this.state.daysBg}/>
										<Text style={styles.day}>{data.leave_days < 0 ? 0 : data.leave_days}天</Text>
									</View>
									<Text style={styles.date}>{data.add_time}</Text>
							   </View>
							}
						})()}

					</View>
				</View>
			</TouchableHighlight>
		)
	}

	//渲染隐藏的行数据
	renderHiddenCourse(data, secId, rowId, rowMap) {
		return (
			<View style={styles.rowBack}>
				<Text>左滑可以删除我哦~</Text>
				<View style={[styles.backRightBtn, styles.backRightBtnLeft]}>
					<Image style={styles.continueBg} source={this.state.daysBg}/>
					<Text style={data.status == '4' ? styles.backTextYellow : styles.backTextYellow2}
					      onPress={ _ => this.Repurchase(secId, rowId, rowMap) }>续购</Text>
				</View>
				<TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]}
				                  onPress={ _ => this.deleteRow(secId, rowId, rowMap) }>
					<Text style={styles.backTextWhite}>删除课程</Text>
				</TouchableOpacity>
			</View>
		)
	}

	//下拉刷新
	_onRefresh() {
		this.props.bLoadStatus();
		this.setState({isRefreshing: true});
		this.props.callbackParent("refresh", null, 1);
	}

	//底部判断
	_toEnd() {
		if (this.realtoEnd == 1) {
			if (this.props.current_page == 2) {
				this.nPage = 2;
			}
			if (this.nPage <= this.props.total_page) {
				this.props.callbackParent("loadMore", null, null, this.nPage);
				this.nPage++;
				this.props.bLoadStatus();

				if (this.nPage > this.props.total_page + 1) {
					this.setState({isLoadAll: true});
				}
				this.setState({bShowfooter: true, hideTitle: false});
			}
		}
		this.realtoEnd = 1;
	}

	//渲染底部
	_renderFooter() {
		return <LoadMore isLoadAll={true}/>
	}

	render() {

		if(!this.props.bLogin){
			return (
				<View>
					<TouchableOpacity style={styles.container} underlayColor={'rgba(255,255,255,0.4)'} onPress={()=>Actions.LoginScreen()}>
					<Image style={styles.tipsimage} source={this.props.empty}/>
					<Text style={styles.tipstext}>立即登录</Text>
					</TouchableOpacity>
				</View>
			)
		}
		else if (this.props.data && (this.props.data.length == 0 && this.props.loaded)) {
			return (
				<View style={styles.container}>
					<TouchableOpacity style={styles.container} onPress={()=>this._goUrl()}>
					<Image style={styles.tipsimage} source={this.props.empty}/>
					<Text style={styles.tipstext}>立即报名上课</Text>
					</TouchableOpacity>
				</View>
			)
		} else {
			return (
				<View style={styles.container}>
					<View style={styles.line}></View>
					{this.props.data && !this.state.bFlag &&
					<SwipeListView
						// pageSize={5}
						dataSource={this.ds.cloneWithRows(this.props.data)}
						renderRow={(data) => this.renderCourse(data)}
						renderHiddenRow={(data, secId, rowId, rowMap) => this.renderHiddenCourse(data, secId, rowId, rowMap)}
						leftOpenValue={75}
						rightOpenValue={-150}
						onEndReached={ this._toEnd.bind(this) }
						onEndReachedThreshold={10}
						// renderFooter={ this._renderFooter.bind(this) }
						enableEmptySections={true}
						refreshControl={
							<RefreshControl
								enabled={true}
								refreshing={this.state.isRefreshing}
								onRefresh={this._onRefresh.bind(this)}
								colors={['#ff0000', '#00ff00', '#0000ff']}
								progressBackgroundColor="#ffffff"
							/>
						}
					/>
					}
					{this.props.data && this.state.bFlag &&
					<SwipeListView
						// pageSize={5}
						dataSource={this.ds.cloneWithRows(this.props.data)}
						renderRow={(data) => this.renderCourse(data)}
						renderHiddenRow={(data, secId, rowId, rowMap) => this.renderHiddenCourse(data, secId, rowId, rowMap)}
						leftOpenValue={75}
						rightOpenValue={-150}
						onEndReached={ this._toEnd.bind(this) }
						onEndReachedThreshold={10}
						// renderFooter={ this._renderFooter.bind(this) }
						enableEmptySections={true}
						refreshControl={
							<RefreshControl
								enabled={true}
								refreshing={this.state.isRefreshing}
								onRefresh={this._onRefresh.bind(this)}
								colors={['#ff0000', '#00ff00', '#0000ff']}
								progressBackgroundColor="#ffffff"
							/>
						}
					/>
					}
					<View style={styles.footer}>
					</View>
				</View>
			);
		}


	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#F8F8F8',
		height:global_height,
		paddingBottom:70
	},
	line: {
		width: global_width,
		height: 10,
		backgroundColor: '#FFFFFF',
	},
	tipsimage: {
		marginLeft: global_width / 2 - 89,
		marginTop: global_height / 3 - 65,
		width: 168,
		height: 75,
	},
	tipstext: {
		fontSize: 15,
		color: '#0085f8',
		width: global_width,
		textAlign: 'center',
		marginTop: 20,
		fontWeight:'bold',
	},
	backTextWhite: {
		color: '#FFF',
	},
	backTextYellow: {
		color: '#ffa60b',
	},
	backTextYellow2: {
		color: '#ececec',
	},
	rowBack: {
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 15,
		marginBottom: 5
	},
	backRightBtn: {
		alignItems: 'center',
		bottom: 0,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		width: 75
	},
	backRightBtnLeft: {
		right: 75
	},
	backRightBtnRight: {
		backgroundColor: 'red',
		right: 0,
	},
	rightDays: {
		position: 'absolute',
		right: 20,
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
	},
	countdown: {
		right: 10,
		width: 40,
		height: 40,
	},
	daysBg: {
		width: 40,
		height: 40,
	},
	continueBg: {
		position: 'absolute',
		right: 20,
		width: 40,
		height: 40,
		top: 17,
		left: 17
	},
	day: {
		textAlign: 'center',
		color: '#167fda',
		fontSize: 12,
		height: 20,
		marginTop: -28,
	},
	coursecontainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
		paddingLeft:10
	},
	thumbnail: {
		width: 100,
		height: 70,
	},
	thumbihma: {
		width: 50,
		height: 70,
	},
	rightContainer: {
		height: 70,
		flex: 1,
		marginLeft: 10,
		borderBottomWidth: 1,
		borderColor: '#ECECEC',
	},
	actions: {
		height: 70,
		borderBottomWidth: 1,
		borderColor: '#ECECEC',
		paddingRight: 10,
	},
	surplusDay: {
		paddingTop: 5,
		paddingBottom: 5,
	},
	price_viewnum:{
		flexDirection: 'row',
	},
	date: {
		fontSize: 12,
		color: '#ABABAB',
		marginTop: 45,
	},
	interest:{
		position:'absolute',
		right:10,
		fontSize:10,
		color: '#ABABAB',
	},
	cert: {
		flexDirection: 'row',
	},
	cert_Bg:{
			height:18,
			width:40,
			alignItems:'center',
			justifyContent:'center',
			borderRadius: 3,
			backgroundColor: '#659df2',
			paddingLeft: 4,
			paddingRight: 4,
	},
	summit_Bg:{
			height:18,
			width:40,
			alignItems:'center',
			justifyContent:'center',
			borderRadius: 3,
			backgroundColor: '#d03b3c',
			paddingLeft: 4,
			paddingRight: 4,
	},
	salon_Bg:{
			height:18,
			width:40,
			alignItems:'center',
			justifyContent:'center',
			borderRadius: 3,
			backgroundColor: '#e79138',
			paddingLeft: 4,
			paddingRight: 4,
	},
	study_Bg:{
			height:18,
			width:40,
			alignItems:'center',
			justifyContent:'center',
			borderRadius: 3,
			backgroundColor: '#5cc97c',
			paddingLeft: 4,
			paddingRight: 4,
	},
	sign: {
		fontSize: 13,
		color:'#FFFFFF',
	},
	coursetitle: {
		fontSize: 14,
		color: '#333333',
		height: 25,
		flex:1,
		paddingLeft: 5,
	},
	learnnum: {
		fontSize: 10,
		color: '#ABABAB',
		height: 25,
	},
	learnnum2: {
		fontSize: 10,
		color:'red',
	},
	info: {
		flexDirection: 'row',
		height: 25,
	},
	info2: {
		height: 25,
		marginTop:-2,
	},
	start_time:{
		color:'#ababab',
		fontSize:10,
		paddingRight:10,
	},
	city:{
		color:'#ababab',
		fontSize:10,
	},
	city_date:{
		flexDirection: 'row',
	},
	coursenum: {
		fontSize: 10,
		paddingRight: 10,
		color: '#000'
	},
	line: {
		paddingRight: 10,
		paddingTop: -2
	},
	study: {
		color: '#999999',
		fontSize: 12,
	},
	apply: {
		fontSize: 12,
		color: "#ABABAB",
		position: 'absolute',
		bottom: 5,
	},
	studing: {
		fontSize: 12,
		color: '#61d261',
	},
	notpassed: {
		fontSize: 12,
		color: 'red',
	},
	loading: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center'
	},
	loadingText: {
		fontSize: 14,
		marginBottom: 20
	},
	footer: {
		width: global_width,
		height: 50,
		backgroundColor: '#FFFFFF',
	},
});
