/**
 * Created by zhaolong on 2017/11/06.
 * File description: 直播间验证规则
 */
import {
    LIVE_ROOMVALID_SUCCESS,
    LIVE_ROOMVALID_FAIL,
    LIVE_ROOMVALID,

    LIVE_ROOMHISTORYVALID_SUCCESS,
    LIVE_ROOMHISTORYVALID_FAIL,
    LIVE_ROOMHISTORYVALID,

    LIVE_ROOMVALIDPASSWORD_SUCCESS,
    LIVE_ROOMVALIDPASSWORD_FAIL,
    LIVE_ROOMVALIDPASSWORD,
} from '../actions/types';

const INITIAL_STATE = {
    liveroomValidDataloading:false,
	error:'',
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case LIVE_ROOMVALID_SUCCESS:
			return {
				...state,
				liveRoomValidData:action.result,
			};
		case LIVE_ROOMVALID_FAIL:
			return {
				...state,
				liveRoomValidData:action.error,
			};
        case LIVE_ROOMHISTORYVALID_SUCCESS:
            return {
                ...state,
                liveRoomHistoryValidData:action.result,
            };
        case LIVE_ROOMHISTORYVALID_FAIL:
            return {
                ...state,
                liveRoomHistoryValidData:action.error,
            };
        case LIVE_ROOMVALIDPASSWORD_SUCCESS:
            return {
                ...state,
                liveRoomValidpasswordData:action.result,
            };
        case LIVE_ROOMVALIDPASSWORD_FAIL:
            return {
                ...state,
                liveRoomValidpasswordData:action.error,
            };
		default:
			return state;
	}
};
