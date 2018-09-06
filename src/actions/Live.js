/**
 * Created by qzy on 18/04/2017.
 * File description:所有直播行为
 */
import * as helpers from '../helpers/helpers';
import {
	LIVE_LIVECAST_GET,
	LIVE_LIVECAST_GET_FAIL,
	LIVE_LIVECAST_GET_SUCCESS,
	LIVE_LIVECAST_ADD_REMIND_SUCCESS,
	LIVE_LIVECAST_ADD_REMIND_FAIL,
	LIVE_LIVECAST_DELETE_REMIND_SUCCESS,
	LIVE_LIVECAST_DELETE_REMIND_FAIL,
	LIVE_LIVECAST_GET_LIVE_WATCH_ROOM,
	LIVE_LIVECAST_CHANGE_LIVE_ROOM_FAVORITE,
	LIVE_LIVECAST_GET_THEME,
	LIVE_LIVECAST_CLOSE_THEME_MODAL,
	LIVE_LIVECAST_PASS_ID_STATUS_TO_ROOM,
	LIVE_LIVECAST_TOGGLE_PAYMODAL,
	LIVE_LIVECAST_RANDOM_PAY,
	LIVE_LIVECAST_CHANGE_PAY,
	LIVE_LIVECAST_TOGGLE_CHECKOUTMODAL,
	LIVE_LIVECAST_CHOOSE_PAY,
	LIVE_LIVECAST_TOGGLE_CHOOSE_PAY,
	LIVE_LIVECAST_GET_ORDER,
	LIVE_LIVECAST_GET_ALIPAY_PARAMS,
	LIVE_LIVECAST_QUIT_CHAT_GROUP,
	LIVE_LIVECAST_EMIT_ONE_MESSAGE_BY_WATCHER,
	LIVE_LIVECAST_ALTER_USER_NUM,
	LIVE_LIVECAST_LIVEROOM_SET_REDPACKET_NUM,
	LIVE_LIVECAST_GET_LIVE_BARRAGE,
	LIVE_LIVECAST_EMIT_ONE_BARRAGE,
	LIVE_LIVECAST_GET_BARRAGE_ORDER,
	LIVE_LIVECAST_LIVEROOM_PUSH_USER_ICON,
	LIVE_LIVECAST_LIVEROOM_PUSH_RED_POCKET,
	LIVE_LIVECAST_LIVEROOM_REMOVE_RED_POCKET,
	LIVE_LIVECAST_LIVEROOM_ADD_RED_POCKET_TO_CASTER,
	LIVE_LIVECAST_GET_BARRAGE,
	LIVE_LIVECAST_LIVEROOM_SET_BARRAGE,
	LIVE_LIVECAST_LIVEROOM_REMOVE_BARRAGE,
	LIVE_LIVECAST_ADD_FAVORITE_SUCCESS,
	LIVE_LIVECAST_DELETE_FAVORITE_SUCCESS,
	LIVE_LIVECAST_LIVECAST_CLEAR_LIVE_LIST,
	LIVE_LIVECAST_LIVECAST_BARRAGE_PRICE_CHANGED,
	LIVE_LIVECAST_LIVECAST_BACK_AND_OPEN_THEME_MODAL,
	LIVE_LIVECAST_CLEAR_LIVE_ROOM,
	LIVE_LIVECAST_CASTER_IS_ONLINE,
	LIVE_STOP_VIDEO_PLAY
} from './types';

const getListSuccess = data => ({
		type: LIVE_LIVECAST_GET_SUCCESS,
		payload: data,
})

const getListFail = err => ({
		type: LIVE_LIVECAST_GET_FAIL,
		payload: err,
})

const addRemindSuccess = id => ({
	type: LIVE_LIVECAST_ADD_REMIND_SUCCESS,
	payload: id,
})

const addRemindFail = err => ({
	type: LIVE_LIVECAST_ADD_REMIND_FAIL,
	payload: err,
})

const deleteRemindSuccess = id => ({
	type: LIVE_LIVECAST_DELETE_REMIND_SUCCESS,
	payload: id,
})

const deleteRemindFail = err => ({
	type: LIVE_LIVECAST_DELETE_REMIND_FAIL,
	payload: err,
})
//获取列表
export const getLiveList = page => {

	return (dispatch,getState)=>{
		dispatch({ type: LIVE_LIVECAST_GET })
		helpers.post('mv1/live/live-list',{'page': page, 'page_size':10})
			.then(
				data => { dispatch(getListSuccess(data)) },
				err => { dispatch(addRemindFail(err)) },
			)
	}
}

//增加提醒
export const addRemind = id => {
	return (dispatch)=>{
		helpers.post('mv1/user/live/add-remind',{'live_id': id})
			.then(
				data => {
					if(data) dispatch(addRemindSuccess(id))
			}).catch( err => {
				dispatch(addRemindFail(err))
			})
	}
}
// 删除提醒
export const deleteRemind = id => {
	return (dispatch) => {
		helpers.post('mv1/user/live/delete-remind',{'live_id': id})
			.then(
				data => {
					// console.log("success:"+data);
					if(data) dispatch(deleteRemindSuccess(id))
				}
			).catch(err => {
				// console.log("error:"+ err);
				dispatch(deleteRemindFail(err))
		})
	}
}
// 获取直播房间信息action
const getLiveWatchRoomSuccess = data => ({
	type: LIVE_LIVECAST_GET_LIVE_WATCH_ROOM,
	payload: data,
})

//获取直播间信息
export const getLiveWatchRoom = (id, caster_status) => {
	return (dispatch) => {
		helpers.post('mv1/live/live-info',{id})
			.then(
				data => {
					// console.log(caster_status , data.live_status);
					// console.log(caster_status != undefined && caster_status == 1);
					// console.log(caster_status == undefined && data.live_status != 1);

					if(data) {
						// console.log('获取主题'+caster_status);
			            //获取主题(主播不获取，开始直播不获取)
			            // if(caster_status != undefined && caster_status == 1) {
						//   console.log('主播没主题')
			            // }else if( (caster_status == 0 || undefined) && data.live_status != 1 && data.live_user_id != data.user_id ){
			            //   console.log('获取主题')
			            //   dispatch(getTheme({id,status:data.live_status}))
			            // }
			            dispatch(getLiveWatchRoomSuccess(data))
			        }

				}
			)
	}
}

// 获取直播房间信息action
const changeLiveFavoriteSuccess = data => {
	// console.log(data)
	return {
		type: LIVE_LIVECAST_CHANGE_LIVE_ROOM_FAVORITE,
		payload: data,
	}
}

// 列表关注
const addFavoriteSuccess = id => ({
  type: LIVE_LIVECAST_ADD_FAVORITE_SUCCESS,
  payload: id,
})
// 列表取关
const deleteFavoriteSuccess = id => ({
  type: LIVE_LIVECAST_DELETE_FAVORITE_SUCCESS,
  payload: id,
})

//加关注
export const changeLiveFavorite = id => {
	return (dispatch) => {
		helpers.post('mv1/user/favorite/add',{id, type: 24})
			.then(
				data => {
					if(data) dispatch(changeLiveFavoriteSuccess(data))

          //发出修改列表页的关注状态
          // if (data && data.is_favorite == 0)  dispatch(addFavoriteSuccess(id))
          // if (data && data.is_favorite == 1)  dispatch(deleteFavoriteSuccess(id))
				}
			)
	}
}
// 获取主题action
const getThemeSuccess = data => {
	return {
		type: LIVE_LIVECAST_GET_THEME,
		payload: data,
	}
}


//获取主题弹窗
export const getTheme = ( {id, status} ) => {
	return (dispatch) => {
		if(status == 2 || status == 1 || status == 4 ) {
			helpers.post('mv1/live/get-theme',{live_id: id})
				.then(
					data => {
						// console.log(data)
						if(data) dispatch(getThemeSuccess(data))
					}
				)
		}
		if(status === 3) {
			helpers.post('mv1/live/live-review',{live_id: id})
				.then(
					data => {
						// console.log(data)
						if(data) dispatch(getThemeSuccess(data))
					}
				)
		}
	}
}
//关闭主题模态窗
export const closeThemeModal = () => {
	return {
		type: LIVE_LIVECAST_CLOSE_THEME_MODAL
	}
}

//传递id和status
export const passIdAndStatusToRoom = (id, status) => {
	return {
		type:LIVE_LIVECAST_PASS_ID_STATUS_TO_ROOM,
		payload: {
			id,
			status
		}
	}
}
//关闭红包模态窗
export const togglePayModal = () => {
	return {
		type: LIVE_LIVECAST_TOGGLE_PAYMODAL
	}
}
//关闭支付模态窗
export const toggleCheckoutModal = (payType) => {
	return {
		type: LIVE_LIVECAST_TOGGLE_CHECKOUTMODAL,
		payload: payType
	}
}

//红包随机金额
export const randomPay = () => {
	return {
		type: LIVE_LIVECAST_RANDOM_PAY
	}
}
//输入红包金额
export const changePay = (text) => {
	return {
		type: LIVE_LIVECAST_CHANGE_PAY,
		payload: text
	}
}
//选择支付方式
export const choosePay = (payCode) => {
	return {
		type: LIVE_LIVECAST_CHOOSE_PAY,
		payload: payCode
	}
}
//选择支付方式
export const toggleChoosePay = () => {
	return {
		type: LIVE_LIVECAST_TOGGLE_CHOOSE_PAY,
	}
}

//创建订单
 getOrder = (live_id, money) => {
	return (dispatch) => {
		helpers.post('mv1/user/order/create-red-order',{live_id,money,source:6})
			.then(
				res=>{
					if(res) dispatch(getOrderSuccess(res))
			})

	}
}

export const  getOrderSuccess = (res) => {
	return {
		type: LIVE_LIVECAST_GET_ORDER,
		payload: res
	}
}

//创建弹幕订单
export const getBarragesOrder = (live_id) => {
	return (dispatch) => {
		helpers.post('mv1/user/order/create-barrage-order',{live_id})
			.then(
				res=>{
					if(res) dispatch(getBarragesOrderSuccess(res))
				})

	}
}

const getBarragesOrderSuccess = (res) => {
	return {
		type: LIVE_LIVECAST_GET_BARRAGE_ORDER,
		payload: res
	}
}

//获取支付宝参数
export const getAliPayParams = (order_id, pay_bank, pay_type, user_id, live_id) => {
	return (dispatch) => {
		helpers.post('pay', {order_id, pay_bank, pay_type, user_id, live_id})
			.then(
				res=>{
					if(res) dispatch(getAliPayParamsSuccess(res))
				})
	}
}
const getAliPayParamsSuccess = (res) => {
	return {
		type: LIVE_LIVECAST_GET_ALIPAY_PARAMS,
		payload: res
	}
}
//推出群
export const quitGroup = () => {
	return {
		type: LIVE_LIVECAST_QUIT_CHAT_GROUP
	}
}
//用户发出一条消息
export const emitOneMsgByWatcher = (msg) => {
	return {
		type: LIVE_LIVECAST_EMIT_ONE_MESSAGE_BY_WATCHER,
		payload:msg
	}
}
//用户发出一条弹幕
export const emitOneBarrage = (msg) => {
  return (dispatch) => {
    dispatch({type: LIVE_LIVECAST_EMIT_ONE_BARRAGE,payload:msg})
    // 定时删除弹幕
    setTimeout(()=>{
      dispatch(remove_barrage(msg))
    },14000)
  }
}
//改变直播用户数量
export const alterUserNum = (num) => {
	return {
		type: LIVE_LIVECAST_ALTER_USER_NUM,
		payload:num
	}
}

//获取弹幕金额
export const getLiveBarrage = (live_id) => {
	return (dispatch) => {
		helpers.post('mv1/user/live/get-live-barrage', {live_id})
			.then(
				res=>{
					if(res) dispatch(getLiveBarrageSuccess(res))
				})
	}
}
const getLiveBarrageSuccess = (res) => {
	return {
		type: LIVE_LIVECAST_GET_LIVE_BARRAGE,
		payload: res.money
	}
}
//主播获取弹幕金额
export const getBarrage = (live_id) => {
	return (dispatch) => {
		helpers.post('mv1/user/live/get-barrage', {live_id})
			.then(
				res=>{
					if(res) dispatch(getBarrageSuccess(res))
				})
	}
}
const getBarrageSuccess = (res) => {
	return {
		type: LIVE_LIVECAST_GET_BARRAGE,
		payload: res
	}
}
export const pushUserIcon = (icon) => {
	return {
		type: LIVE_LIVECAST_LIVEROOM_PUSH_USER_ICON,
		payload: icon
	}
}

export const pushRedPocket = (redPocket) => {
	return {
		type: LIVE_LIVECAST_LIVEROOM_PUSH_RED_POCKET,
		payload: redPocket
	}
}

export const addRedPocketToCaster = (redPocket) => {
	return {
		type: LIVE_LIVECAST_LIVEROOM_ADD_RED_POCKET_TO_CASTER,
		payload: redPocket
	}
}

//选中弹幕价格
export const set_barrage = (id) => {
	return {
		type: LIVE_LIVECAST_LIVEROOM_SET_BARRAGE,
		payload: id
	}
}
//弹幕动画结束后，删除这条弹幕
export const remove_barrage = (barrage) => {
  return {
    type: LIVE_LIVECAST_LIVEROOM_REMOVE_BARRAGE,
    payload: barrage
  }
}
//动画结束后，删除这条红包
export const remove_redPacket = (redPockets) => {
  return {
    type: LIVE_LIVECAST_LIVEROOM_REMOVE_RED_POCKET,
    payload: redPockets
  }
}
//删除所有直播列表内容
export const clearLiveList = () => {
  return {
    type: LIVE_LIVECAST_LIVECAST_CLEAR_LIVE_LIST,
  }
}
//红包显示数量
export const setRedPacketNum = (num) => {
	return {
		type: LIVE_LIVECAST_LIVEROOM_SET_REDPACKET_NUM,
		payload:num
	}
}
// 修改弹幕金额
export const barragePriceChanged = (val) => {
  return {
    type: LIVE_LIVECAST_LIVECAST_BARRAGE_PRICE_CHANGED,
    payload:val,
  }
}
// 返回打开模态窗
export const backAndOpenThemeModal = () => {
  return {
    type: LIVE_LIVECAST_LIVECAST_BACK_AND_OPEN_THEME_MODAL,
  }
}

// 清楚房间信息
export const clearLiveRomm = () => {
  return {
    type: LIVE_LIVECAST_CLEAR_LIVE_ROOM
  }
}

//修改主播直播状态
export const changeCasterIsOnLine = () => {
  return {
    type: LIVE_LIVECAST_CASTER_IS_ONLINE
  }
}

//修改停止直播
export const stopVideoPlay = () => {
  return {
    type: LIVE_STOP_VIDEO_PLAY
  }
}
