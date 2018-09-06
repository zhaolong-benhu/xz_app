/**
 * Created by qzy on 23/05/2017.
 * File description:聊天内容
 */

import {
  LIVE_LIVECAST_ALTER_USER_NUM,
  LIVE_LIVECAST_EMIT_ONE_BARRAGE,
  LIVE_LIVECAST_EMIT_ONE_MESSAGE_BY_WATCHER,
  LIVE_LIVECAST_GET_LIVE_WATCH_ROOM,
  LIVE_LIVECAST_LIVEROOM_PUSH_RED_POCKET,
  LIVE_LIVECAST_LIVEROOM_REMOVE_RED_POCKET,
  LIVE_LIVECAST_LIVEROOM_SET_REDPACKET_NUM,
  LIVE_LIVECAST_LIVEROOM_PUSH_USER_ICON,
  LIVE_LIVECAST_LIVEROOM_REMOVE_BARRAGE,
  LIVE_LIVECAST_QUIT_CHAT_GROUP,
  LIVE_LIVECAST_CLEAR_LIVE_ROOM,
  LIVE_LIVECAST_CASTER_IS_ONLINE,
  LIVE_STOP_VIDEO_PLAY
} from "../actions/types";
import _ from "lodash";
import {fromJS, toJS} from "immutable";
const INITIAL_STATE = {
  avChatRoomId: null,
  loginInfo: {
    'sdkAppID': '', //用户所属应用id,必填
    'appIDAt3rd': '', //用户所属应用id，必填
    'accountType': 8699, //用户所属应用帐号类型，必填
    'identifier': null, //当前用户ID,必须是否字符串类型，选填
    'identifierNick': null, //当前用户昵称，选填
    'userSig': null, //当前用户身份凭证，必须是字符串类型，选填
    'headurl': null,//当前用户默认头像，选填
  },
  message: [],
  MemberNum: 0,
  redPocketsNum:0,
  barrages: [],
  redPockets: [],
  userIcons: [],
  casterOnStreaming: false,
};
export default (state = INITIAL_STATE, action) => {
  const vanillaState = state;
  state = fromJS(state)
  switch (action.type) {
    case LIVE_LIVECAST_CLEAR_LIVE_ROOM:
      //退出房间清空
      return INITIAL_STATE;
      // 退群清空
    case LIVE_LIVECAST_QUIT_CHAT_GROUP:
      return state
          .set('avChatRoomId', null)
          .set('message', [])
          .set('barrages', [])
          .set('redPockets', [])
          .set('userIcons', [])
          // .setIn(['loginInfo', 'sdkAppID'], '')
          // .setIn(['loginInfo', 'appIDAt3rd'], '')
          // .setIn(['loginInfo', 'identifier'], null)
          // .setIn(['loginInfo', 'identifierNick'], null)
          // .setIn(['loginInfo', 'userSig'], null)
          // .setIn(['loginInfo', 'headurl'], null)
          .toJS();
      //直播房间信息
    case LIVE_LIVECAST_GET_LIVE_WATCH_ROOM:
      //游客是0
      let identifier ;
      if(action.payload.user_id == 0) {
        identifier = action.payload.user_name
      } else {
        identifier = action.payload.user_id
      }

      return state
          .set('message', [])
          .set('MemberNum', action.payload.online_num)
          .set('avChatRoomId', action.payload.room_id)
          .setIn(['loginInfo', 'sdkAppID'], action.payload.sdkappid)
          .setIn(['loginInfo', 'appIDAt3rd'], action.payload.sdkappid)
          .setIn(['loginInfo', 'identifier'], identifier)
          .setIn(['loginInfo', 'identifierNick'], action.payload.nick_name)
          .setIn(['loginInfo', 'userSig'], action.payload.usersig)
          .setIn(['loginInfo', 'headurl'], action.payload.user_thumb)
          .toJS();
      // 接受消息
    case LIVE_LIVECAST_EMIT_ONE_MESSAGE_BY_WATCHER:
      return state
          .set('message', state.get('message').push(action.payload))
          .toJS();
      //改变用户数量
    case LIVE_LIVECAST_ALTER_USER_NUM:
      return state
          .set('MemberNum', action.payload)
          .toJS();
      // 接受弹幕
    case LIVE_LIVECAST_EMIT_ONE_BARRAGE:
      return state
          .set('barrages', state.get('barrages').push({text:action.payload, positionY: Math.random()}))
          .toJS();
      // 删除弹幕
    case LIVE_LIVECAST_LIVEROOM_REMOVE_BARRAGE:
      function find(el) {
        return el.text = action.payload
      }
      const firstIndex = vanillaState.barrages.findIndex(find)
      // debugger
      if (firstIndex === -1) {
        return state.toJS()
      }else {
        return state
            .update('barrages', barrages => {
              return barrages.splice(firstIndex, 1)
            })
            .toJS();
      }

      // 接受红包
    case LIVE_LIVECAST_LIVEROOM_PUSH_RED_POCKET:
      // let msg = action.payload
      // msg.userName = hidePhoneNum(msg.userName)
      return state
          .set('redPockets', state.get('redPockets').push(action.payload))
          // .set('redPockets', action.payload)
          .toJS();
    //设置已显示红包数量
    case LIVE_LIVECAST_LIVEROOM_SET_REDPACKET_NUM:
      return state
          .set('redPocketsNum', action.payload)
          .toJS();
      // 删除红包
    case LIVE_LIVECAST_LIVEROOM_REMOVE_RED_POCKET:
      function find(el) {
        return el.id = action.payload
      }
      const index = vanillaState.redPockets.findIndex(find)
      // debugger
      if (index === -1) {
        return state.toJS()
      }else {
        return state
            .update('redPockets', redPockets => {
              return redPockets.splice(index, 1)
            })
            .toJS();
      }

      // 增加用户头像
    case LIVE_LIVECAST_LIVEROOM_PUSH_USER_ICON:
      //头像相同重复不添加
      if(new Set(vanillaState.userIcons).has(action.payload)) {
        return vanillaState
      }

      return state
          .set('userIcons', state.get('userIcons').push(action.payload))
          .toJS();
    case LIVE_LIVECAST_CASTER_IS_ONLINE:
      return state
          .update('casterOnStreaming', casterOnStreaming=>!casterOnStreaming)
    default:
      return vanillaState;
  }

};

//隐藏手机号
const hidePhoneNum = (msg) => msg.replace(/(1[3578]\d\d\d)\d{4}(\d\d)/g, '$1****$2')
