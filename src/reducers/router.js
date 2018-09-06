/**
 * Created by qzy on 21/06/2017.
 * File description:
 */
import {
  ROUTER_HIDE_SCORERIGHTBTN,
  ROUTER_SHOW_SCORERIGHTBTN,
} from '../actions/types';

const INITIAL_STATE = {
  show: true,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ROUTER_HIDE_SCORERIGHTBTN:
      state.show = false
      return state;
    case ROUTER_SHOW_SCORERIGHTBTN:
      state.show = true
      return state;
    default:
      return state;
  }
};