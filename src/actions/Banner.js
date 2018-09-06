/**
 * Created by zhaolong on 2017/04/19.
 * File description: 首页Banner
 */
import * as helpers from '../helpers/helpers';
import * as api from '../api/global'
import {
	BANNER_SUCCESS,
	BANNER_FAIL,
	BANNER,
} from './types';

const banner = (type,result) => {
	switch (type) {
		case BANNER_SUCCESS:
			return {
					type: BANNER_SUCCESS,
					result:result
			}
			break;
		case BANNER_FAIL:
			return {
					type: BANNER_FAIL,
					error:result
			}
			break;
		default:
	}
}

export function fetchBannerList(){
	return (dispatch) => {
			helpers.getFetchFromCache(api.api_banner,{type:2}).then((result)=>{
					dispatch(banner(result ? BANNER_SUCCESS : BANNER_FAIL,result))
			})
	}
}
