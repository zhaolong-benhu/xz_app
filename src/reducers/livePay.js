/**
 * Created by qzy on 19/05/2017.
 * File description:
 */
import {
	LIVE_LIVECAST_GET_ORDER,
	LIVE_LIVECAST_GET_ALIPAY_PARAMS,
	LIVE_LIVECAST_GET_LIVE_WATCH_ROOM,
	LIVE_LIVECAST_GET_LIVE_BARRAGE,
	LIVE_LIVECAST_GET_BARRAGE_ORDER,
	LIVE_LIVECAST_TOGGLE_CHECKOUTMODAL,
  LIVE_LIVECAST_LIVECAST_BARRAGE_PRICE_CHANGED,
} from '../actions/types';
import _ from 'lodash';
import { fromJS, toJS } from 'immutable';
const INITIAL_STATE = {
	orderInfo: {},
	aliPayParams:{},
	textPayNums: null,
	barrageInfo:{},
	payType:null,
};
export default (state = INITIAL_STATE, action) => {
  const vanillaState = state;
	state = fromJS(state)
	switch (action.type) {
		//支付模态窗
		case LIVE_LIVECAST_TOGGLE_CHECKOUTMODAL:
			return state.set('payType',action.payload).toJS();
		// 订单信息
		case LIVE_LIVECAST_GET_ORDER:
			return state.set('orderInfo',action.payload).toJS();
		// 支付宝参数
		case LIVE_LIVECAST_GET_ALIPAY_PARAMS:
			return state.set('aliPayParams',action.payload).toJS();
		// 弹幕
		case LIVE_LIVECAST_GET_LIVE_BARRAGE:
			return state.set('textPayNums', action.payload).toJS()
		// 弹幕订单
		case LIVE_LIVECAST_GET_BARRAGE_ORDER:
			return state.set('barrageInfo', action.payload).toJS()
		// 弹幕价格修改
		case LIVE_LIVECAST_LIVECAST_BARRAGE_PRICE_CHANGED:
			return state.set('textPayNums',action.payload).toJS()
		default:
			return vanillaState;
	}
};
