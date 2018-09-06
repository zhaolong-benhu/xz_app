/**
 * Created by qzy on 24/04/2017.
 * File description:
 */
import {
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
	LIVE_LIVECAST_LIVEROOM_ADD_RED_POCKET_TO_CASTER,
	LIVE_LIVECAST_GET_BARRAGE,
	LIVE_LIVECAST_LIVEROOM_SET_BARRAGE,
  LIVE_LIVECAST_LIVECAST_BACK_AND_OPEN_THEME_MODAL,
  LIVE_LIVECAST_CLEAR_LIVE_ROOM,
} from '../actions/types';
import _ from 'lodash';
import { fromJS, toJS } from 'immutable';
const INITIAL_STATE = {
	liveRoomInfo: {},
	theme: null,
	themeModalShow: false,
	roomProps: {},
	showPayModal: false,
	showCheckoutModal: false,
	payNumber: null,
	payTo:'alipay',
	openChoosePay: false,
	barrages:{},
}

export default (state = INITIAL_STATE, action) => {
  const vanillaState = state;
	state = fromJS(state)
	switch (action.type) {
		case LIVE_LIVECAST_CLEAR_LIVE_ROOM:
			return INITIAL_STATE;
		// 房间参数
		case LIVE_LIVECAST_GET_LIVE_WATCH_ROOM:
			return state
							.set('theme',null)
							.set('themeModalShow',false)
							.set('liveRoomInfo',action.payload)
							.setIn(['roomProps','status'], action.payload.live_status)
							.toJS()
    // 房间内关注
		case LIVE_LIVECAST_CHANGE_LIVE_ROOM_FAVORITE:
			return state
							.setIn(['liveRoomInfo','is_favorite'],action.payload.is_favorite)
							.toJS()
    //返回展开主题
		case LIVE_LIVECAST_LIVECAST_BACK_AND_OPEN_THEME_MODAL:
      return state
          .set('themeModalShow',true)
          .toJS()
		// 直播主题
		case LIVE_LIVECAST_GET_THEME:
			return state
				.set('theme',action.payload)
				.set('themeModalShow',true)
				.toJS()
		// 关闭主题
		case LIVE_LIVECAST_CLOSE_THEME_MODAL:
			return state.set('themeModalShow',false).toJS()
		// 传递房间id和状态
		case LIVE_LIVECAST_PASS_ID_STATUS_TO_ROOM:
			return state.set('roomProps',action.payload).toJS()
		// 支付模态窗
		case LIVE_LIVECAST_TOGGLE_PAYMODAL:
			return state.update('showPayModal',showPayModal => !showPayModal).toJS()
		// 随机红包
		case LIVE_LIVECAST_RANDOM_PAY:
			const payArray = [ 6.66,1.66, 66.66, 13.14, 2.22, 0.66, 5.20, 16.66, 8.88, 0.88, 1.88, 18.88 ]
			const random = _.sample(payArray)
			return state.set('payNumber', random).toJS()
		// 修改支付价格
		case LIVE_LIVECAST_CHANGE_PAY:
			const reg = /^(.{0}|\d+\.?\d{0,2})$/

			if(action.payload.toString().match(reg)) {
				return state.set('payNumber', action.payload).toJS()
			}else{
				return state.toJS()
			}
			// 关闭弹窗
		case LIVE_LIVECAST_TOGGLE_CHECKOUTMODAL:
			return state.update('showCheckoutModal', showCheckoutModal => !showCheckoutModal).toJS()
		// 选择支付方式
		case LIVE_LIVECAST_CHOOSE_PAY:
			return state.set('payTo', action.payload).toJS()
		// 关闭选择
		case LIVE_LIVECAST_TOGGLE_CHOOSE_PAY:
			return state.update('openChoosePay', openChoosePay => !openChoosePay).toJS()
		//主播红包累加
		case LIVE_LIVECAST_LIVEROOM_ADD_RED_POCKET_TO_CASTER:
			return state.updateIn(['liveRoomInfo','red_packet'], red_packet => parseFloat(parseFloat(red_packet)+parseFloat(action.payload)).toFixed(2)).toJS()
		case LIVE_LIVECAST_GET_BARRAGE:
			return state.set('barrages',action.payload).toJS()
		// 设置弹幕
		case LIVE_LIVECAST_LIVEROOM_SET_BARRAGE:
			return state.setIn(['barrages','set_barrage'],action.payload).toJS()
		default:
			return vanillaState;
	}
}
