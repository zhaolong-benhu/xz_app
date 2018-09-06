/**
 * Created by zhaolong on 06/04/2017.
 * File description:个人中心-主播关注
 */
import React, {Component, PropTypes,} from 'react';
import {
	StyleSheet,
	View,
	Image,
	Button,
	Text,
	ScrollView,
	TouchableOpacity,
	BackAndroid,
	ToastAndroid
} from 'react-native';
import _ from 'lodash'
import {connect} from 'react-redux';
import {Scene, Router, Actions} from 'react-native-router-flux';
import {global_width, global_height} from '../../util/screen';
import {Loading,FollowList} from '../../components';
import {platform} from '../../util/platform';
import {fetchliveFollowData} from '../../actions';

class Follow extends Component {

	constructor(props) {
		super(props);
		this.current_page = 1,
		this.total_page = 0,
		this.array = [];

		this.state = {
			livefollowed_list:[]
	    },
		//监听安卓返回键
		BackAndroid.addEventListener('hardwareBackPress', function() {
          Actions.pop();
          return true;
        });
	}

	componentWillMount() {
		this.props.fetchliveFollowData(this.current_page);
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.followingData != nextProps.followingData) {
			if(nextProps.followingData.list && nextProps.followingData.list.length>0){
				this.total_page = nextProps.followingData.total_page;
				this.current_page = nextProps.followingData.current_page;
				this.array.push(nextProps.followingData.list);
				this.setState({
				  livefollowed_list: _.flatten(this.array)
				});
			}
		}
	}

	componentWillUnmount() {
		this.array = [];
	}
	//刷新列表
	onRefresh = () => {
	  if(!this.props.loading){
		  //清除数据
		  this.array = [];
		  this.setState({livefollowed_list:_.flatten(this.array),tips:""});
	      //获取第一页数据
		  this.props.fetchliveFollowData(1)
	  }
	}

	render() {
		return (
			<ScrollView style={styles.container} keyboardShouldPersistTaps={true}>
				<View style={{height:global_height-100}}>
					<FollowList
					data={this.state.livefollowed_list}
					loadMore={(page)=>this.props.fetchliveFollowData(page)}
					onRefresh={()=>this.onRefresh()}
					total_page={this.total_page}
					/>
				</View>
				{this.props.loading ? <Loading/> : null }
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#EEEEEE',
		width: global_width,
		marginTop:50,
	},
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
		marginLeft:10,
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
		// justifyContent:'center',
		// alignItems:'center',
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


const mapStateToProps = ({liveFollow, common}) => {
	return {
		followingData: liveFollow.followingData,
		loading: common.loading
	}
}
export default connect(mapStateToProps, {
	    fetchliveFollowData
	})(Follow)
