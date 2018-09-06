/**
 * Created by zhaolong on 06/04/2017.
 * File description:个人中心-直播关注列表
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
    RefreshControl,
	TouchableOpacity,
	BackAndroid,
	ToastAndroid
} from 'react-native';
import _ from 'lodash'
import {connect} from 'react-redux';
import {Scene, Router, Actions} from 'react-native-router-flux';
import {global_width, global_height} from '../../util/screen';
import {
    fetchCoursewareData,
    fetchLiveroomUserinfo,
    fetchHistoricalReviewData,
    // changeLiveFavorite,
	addLiveFavorite,
	getLiveWatchRoom,
	fetchLiveroomValid
} from '../../actions';
import {Alert} from '../../components';

class FollowList extends Component {

	constructor(props) {
		super(props);
        this.state={
            isRefreshing:false,
            tips:"",
            default_face_url:require('../../static/images/live/anchor.png'),
						follow_icon:require('../../static/images/live/follow.png'),
						followed_icon:require('../../static/images/live/followed.png'),
        }
				this.rowID = 0;
        this.current_page = 1;
        this.onEndReachedCount = 0;//记录onEndReached次数，防止第一次获取两次数据
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	}

	componentWillMount() {

	}
	componentWillReceiveProps(nextProps) {
        this.setState({tips:"您还没有关注任何主播哦,快去关注吧!"});
		if(this.props.addcancelfollowData != nextProps.addcancelfollowData){
			var items = this.props.data;
			if(items[this.rowID].favorite == "0"){
				items[this.rowID].favorite = "1"
			}else{
				items[this.rowID].favorite = "0";
			}
	        this.setState({tips:"您还没有关注任何主播哦,快去关注吧!"});
		}
		if(this.props.liveRoomValidData !== nextProps.liveRoomValidData){
	        if(nextProps.liveRoomValidData.is_valid == 1){//密码已经验证过/付款过-直接进入直播间

	        }else {
	            Actions.PasswordRoom({id:this.id,liveType:this.liveType,from:"livelist"});//进入验证界面
	    	}
	  }
	}

	componentWillUnmount() {
	}
	//刷新列表
	onRefresh = () => {
        this.props.onRefresh();
        this.setState({tips:""});
	}
	//滑动到底部
	onEndReached(){
		//防止第一次获取两次数据
		if(this.onEndReachedCount == 0) {
		  this.onEndReachedCount = 1;
	  	}else{
			if(this.current_page < this.props.total_page ){
    		  this.props.loadMore(this.current_page+1);
              this.current_page++;
    		}
	    }
	}
	//渲染列表数据
	renderList(rowData:object, sectionID: number, rowID: number){
		return	<TouchableOpacity style={styles.room} key={'live' + sectionID} onPress={()=>this.toRoom(rowData.live_id,rowData.is_valid,rowData.type)}>
    			 	<View style={styles.info}>
    					{rowData.pic && rowData.pic != "" ?
    						<Image source={{uri:rowData.pic}} style={styles.head}/>:
    						<Image source={this.state.default_face_url} style={styles.head}/>
    						}
    					<View>
    					<View style={styles.titleBg}>
    					  <Text style={styles.title}>{rowData.name}</Text>
    					</View>
    					<View style={styles.labels}>
    						{rowData.label && rowData.label.map((d,j)=>{
    							return 	<Text key={j} style={styles.label}>{d}</Text>
    						})}
    					</View>
    					</View>
    				</View>
    				<TouchableOpacity  onPress={()=>this.addFollow(rowData.user_id,sectionID,rowID)}>
    					<Image source={rowData.favorite == "0" ? this.state.follow_icon : this.state.followed_icon} style={styles.follow}/>
    				</TouchableOpacity>
		         </TouchableOpacity>
	}
	//进入直播间
	toRoom(id,is_valid,type) {
		// if(0 === type || is_valid){
			//获取直播间信息
			this.props.getLiveWatchRoom(id);
			//开始获取课件数据
			this.props.fetchCoursewareData(id);
			//开始获取直播详情数据
			this.props.fetchLiveroomUserinfo(id);
			//开始获取历史回看数据
			this.props.fetchHistoricalReviewData(id);

			//进入直播间
			Actions.AnchorRoom({id:id,caster_status:0,from:"followlist"});
		// }else {
		// 	this.props.fetchLiveroomValid(id);
		// 	// Actions.PasswordRoom({id:id,liveType:type,from:"livelist"});//进入验证界面
		// }
	}
	//取消/添加关注
	addFollow(user_id,sectionID,rowID){
		this.props.addLiveFavorite(user_id);
		this.rowID = rowID;
	}
	render() {
		return (
			<View>
                {this.props.data && this.props.data.length ==0 ?
                 <Text style={styles.tips}>{this.state.tips}</Text>:
                 <ListView
                     refreshControl={
                       <RefreshControl
                           refreshing={this.state.isRefreshing}
                           onRefresh={this.onRefresh}
                           tintColor="#ccc"
                           title="加载中..."
                           titleColor="#ccc"
                           colors={['#aaa', '#ccc', '#eee']}
                           progressBackgroundColor="#fff"
                       />
                     }
                     pageSize={3}
                     enableEmptySections
                     dataSource={this.ds.cloneWithRows(this.props.data)}
                     renderRow={this.renderList.bind(this)}
                     onEndReached={this.onEndReached.bind(this)}
                     onEndReachedThreshold={100}
                 />
                }

			</View>
		);
	}
}

const mapStateToProps = ({liveFollow,passwordRoom}) => {
	return {
		addcancelfollowData: liveFollow.addcancelfollowData,
		liveRoomValidData: passwordRoom.liveRoomValidData
	}
}
export default connect(mapStateToProps, {
		// changeLiveFavorite,
		addLiveFavorite,
		fetchCoursewareData,
 		fetchLiveroomUserinfo,
 		fetchHistoricalReviewData,
		getLiveWatchRoom,
		fetchLiveroomValid
	})(FollowList)

const styles = StyleSheet.create({
	tips: {
		paddingTop: global_height / 2 - 80,
		width: global_width,
		textAlign: 'center',
	},
	room:{
		width:global_width-40,
		height:70,
		marginLeft:20,
		marginTop:30,
		backgroundColor:'#fff',
		borderRadius:5,
		flexDirection:'row',
		justifyContent:"space-between",
	},
	head:{
		marginHorizontal:10,
        marginVertical:10,
		width:50,
		height:50,
		borderRadius:25,
	},
	info:{
		flexDirection:'row',
	},
	titleBg:{
		height:35,
	},
	title:{
		color:'#00a6ea',
		fontSize:16,
		marginTop:8,
	},
	labels:{
		flexDirection:'row',
		height:35,
	},
	label:{
		marginRight:10,
	},
	follow:{
		marginHorizontal:10,
        marginVertical:25,
		width:20,
		height:20,
	}
})
