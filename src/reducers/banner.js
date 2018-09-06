/**
 * Created by zhaolong on 2017/04/19.
 * File description: 首页Banner
 */
import {
  BANNER_SUCCESS,
  BANNER_FAIL,
  BANNER
} from '../actions/types';

const INITIAL_STATE = {
  bannerloading: false,
  error: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BANNER_SUCCESS:
      return {
        ...state,
        bannerloading: true,
        bannerData: action.result,
      };
    case BANNER_FAIL:
      return {
        ...state,
        bannerData: action.error,
      };
    default:
      return state;
  }
};
