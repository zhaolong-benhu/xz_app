/**
 * Created by qzy on 19/06/2017.
 * File description:
 */
import {
  COURSE_LIST_REFRESH_TRUE,
  COURSE_LIST_REFRESH_FALSE,
} from '../actions/types';
const INITIAL_STATE = {
  refresh: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case COURSE_LIST_REFRESH_TRUE:
      return {...state,refresh: true};
    case COURSE_LIST_REFRESH_FALSE:
      return {...state,refresh: false};
    default:
      return state
  }
};