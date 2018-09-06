/**
 * Created by qzy on 21/06/2017.
 * File description:
 */

import {
  ROUTER_HIDE_SCORERIGHTBTN,
  ROUTER_SHOW_SCORERIGHTBTN,
} from './types';

export function hideScoreRightBtn() {
  return {
    type: ROUTER_HIDE_SCORERIGHTBTN
  }
}

export function showScoreRightBtn() {
  return {
    type: ROUTER_SHOW_SCORERIGHTBTN
  }
}