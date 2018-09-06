/**
 * Created by qzy on 14/07/2017.
 * File description:
 */

import {
  LOADING_START,
  LOADING_END,
} from './types';


export function loadStart(){
  return {
    type:LOADING_START
  }
}

export function loadEnd(){
  return {
    type:LOADING_END
  }
}