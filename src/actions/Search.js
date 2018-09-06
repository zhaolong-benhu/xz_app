/**
 * Created by zhaolong on 2017/04/28.
 * File description: 首页-搜索
 */
import * as helpers from '../helpers/helpers';
import * as api from '../api/global'
import {
	HOME_SEARCH_SUCCESS,
	HOME_SEARCH_FAIL,
	HOME_SEARCH,

	LOADING_START,
	LOADING_END
} from './types';

const search_result = (type,result) => {
	return{
		type:type,
		result:result
	}
}

//搜索
export function	fetchSearchResult(search,type,page){
	return (dispatch) => {
			dispatch({type:LOADING_START})
			helpers.post(api.api_search,{'search':search,'type':type,'page':page}).then(
				    result => {dispatch({type:LOADING_END});result ? dispatch(search_result(HOME_SEARCH_SUCCESS,result)) : null},
					err => {dispatch({type:LOADING_END})}
				)
	}
}
