/**
 * Created by qzy on 11/04/2017.
 * File description:
 */
import { Actions } from 'react-native-router-flux';
import {
	TEST,
	LOGIN_USER_DATA,
} from './types';
import * as helpers from '../helpers/helpers';

export const testAction = () => {
	return {
		type: TEST,
		payload: 'text',
	};
};


export const getSuccess = (data) => {
    return {
        type: LOGIN_USER_DATA,
        data
    }
}

export function getUesr(){
	return (dispatch) => {
			helpers.getFetchFromCache('mv1/home/topad').then((result)=>{
					dispatch(getSuccess(result))
			})
	}
}
