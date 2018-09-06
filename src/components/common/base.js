import webim from './webim'
import { Alert } from '../../components'
import {platform} from '../../util'
import { Actions } from 'react-native-router-flux';
import { times } from '../../api/global'
import IOSPlayStreaming from '../../components/common/IOSPlayStreaming';
//发送消息 type 0付费 1免费
export const onSendMsg = (msg, type, loginInfo, avChatRoomId)=> {
	const mesTypes = [
		webim.GROUP_MSG_SUB_TYPE.COMMON, //普通消息,
		webim.GROUP_MSG_SUB_TYPE.LOVEMSG, //-点赞消息，优先级最低
		webim.GROUP_MSG_SUB_TYPE.TIP, //-提示消息(不支持发送，用于区分群消息子类型)，
		webim.GROUP_MSG_SUB_TYPE.REDPACKET, //-红包消息，优先级最高
	]

	const isSend = true;//是否为自己发送
	// const { loginInfo } = this.props.liveChatRoom
	// const selToID = this.props.liveChatRoom.avChatRoomId
	const selToID = avChatRoomId
	const selType = webim.SESSION_TYPE.GROUP;
	const msgLen = webim.Tool.getStrBytes(msg);
	const random = Math.round(Math.random() * 4294967296);//消息随机数，用于去重
	const msgTime = Math.round(new Date().getTime() / 1000);//消息时间戳
	var subType = mesTypes[type];
	var seq = -1;//消息序列，-1表示sdk自动生成，用于去重
	// console.log(loginInfo)
	if (msg.length < 1) {
		Alert("发送的消息不能为空!");
		return;
	}
	if (!selSess) {
		var selSess = new webim.Session(selType, selToID, selToID, loginInfo.headurl, Math.round(new Date().getTime() / 1000));
	}
	let maxLen, errInfo;
	if (selType == webim.SESSION_TYPE.GROUP) {
		maxLen = webim.MSG_MAX_LENGTH.GROUP;
		errInfo = "消息长度超出限制(最多" + Math.round(maxLen / 3) + "汉字)";
	}
	if (msgLen > maxLen) {
		alert(errInfo);
		return;
	}
	const webimMessage = new webim.Msg(selSess, isSend, seq, random, msgTime, loginInfo.identifier, subType, loginInfo.identifierNick);

	//解析文本和表情
	var expr = /\[[^[\]]{1,3}\]/mg;
	var emotions = msg.match(expr);
	var text_obj, face_obj, tmsg, emotionIndex, emotion, restMsgIndex;
	if (!emotions || emotions.length < 1) {
			text_obj = new webim.Msg.Elem.Text(msg);
			webimMessage.addText(text_obj);
	} else {//有表情
			for (var i = 0; i < emotions.length; i++) {
					tmsg = msg.substring(0, msg.indexOf(emotions[i]));
					if (tmsg) {
							text_obj = new webim.Msg.Elem.Text(tmsg);
							webimMessage.addText(text_obj);
					}
					emotionIndex = webim.EmotionDataIndexs[emotions[i]];
					emotion = webim.Emotions[emotionIndex];
					if (emotion) {
							face_obj = new webim.Msg.Elem.Face(emotionIndex, emotions[i]);
							webimMessage.addFace(face_obj);
					} else {
							text_obj = new webim.Msg.Elem.Text(emotions[i]);
							webimMessage.addText(text_obj);
					}
					restMsgIndex = msg.indexOf(emotions[i]) + emotions[i].length;
					msg = msg.substring(restMsgIndex);
			}
			if (msg) {
					text_obj = new webim.Msg.Elem.Text(msg);
					webimMessage.addText(text_obj);
			}
	}


	// console.log(webimMessage)
	webim.sendMsg(webimMessage,  (resp) => {
		webim.Log.info("发消息成功");
	}, function (err) {
  //todo 发送失败重新登录

		webim.Log.error("发消息失败:" + err.ErrorInfo);
		// alert("发消息失败:" + err.ErrorInfo);
	});
}

//监听大群新消息（普通，点赞，提示，红包, 主播停止直播）
export const onBigGroupMsgNotify = (message_processor, nextProps) => (msgList) => {
	for (var i = msgList.length - 1; i >= 0; i--) {//遍历消息，按照时间从后往前
		var msg = msgList[i];
		// console.log('消息：'+JSON.stringify(msg));
		//处理收到的消息
		if(msg.subType == 0) {
			let message = msg.toHtml().replace(/&quot;/g, '"')
      //纯数字
      if(message>=0){
        let account = msg.getFromAccountNick()
        message_processor.emitOneMsgByWatcher(`${account}: ${msg.toHtml()}`)
        return
      }
			try{
        var jsonMsg = JSON.parse(message)
        //安卓不支持subtype = 3
        if (jsonMsg.type === "PushingStop") {
          // 停止推流消息
          //IOS退出视频观看
          platform === 'ios' ? IOSPlayStreaming.stopPlay() : null
					message_processor.stopPlay()
        }
        else if(jsonMsg.type === "barragePriceChanged") {
          //修改弹幕价格
          message_processor.barragePriceChanged(jsonMsg.val)
        }else if(jsonMsg.type === "PushStart"){
          message_processor.changeCasterIsOnLine()
        }else{
          //todo 处理头像
          message_processor.pushUserIcon(jsonMsg.headurl)
        }
			}catch(e){
				let account = msg.getFromAccountNick()
				message_processor.emitOneMsgByWatcher(`${account}: ${msg.toHtml()}`)
			}
		}
		if(msg.subType == 1) {
      let message = JSON.parse(msg.toHtml().replace(/&quot;/g, '"'))
			//弹幕消息
			message_processor.emitOneBarrage(`${msg.getFromAccountNick()}: ${message.barrageTxt}`)
		}
		//进入退出房间
		if(msg.subType == 2) {
			//console.log('人数:'+msg.getElems()[0].content.groupMemberNum);
			message_processor.alterUserNum()
			// message_processor.alterUserNum(msg.getElems()[0].content.groupMemberNum*times)
		}
		if(msg.subType == 3) {
      let message = JSON.parse(msg.toHtml().replace(/&quot;/g, '"'))
      if (message.type === "PushingStop") {
        // 停止推流消息
        //IOS退出视频观看
        platform === 'ios' ? IOSPlayStreaming.stopPlay() : null
				message_processor.stopPlay()
      }else if(message.type === "barragePriceChanged") {
        //修改弹幕价格
        message_processor.barragePriceChanged(message.val)
      } else{
        //红包消息
        //红包uid
        message.id = msg.random
        message_processor.emitOneRedPocketByWatcher(message)
        message_processor.addRedPocketToCaster(message.redPocketNum)
      }
		}
	}
}
//监听 群资料变化 群提示消息
export function onGroupSystemNotify(groupInfo) {
	webim.Log.warn("执行 群资料变化 回调： " + JSON.stringify(groupInfo));
	var groupId = groupInfo.GroupId;
	var newFaceUrl = groupInfo.GroupFaceUrl;//新群组图标, 为空，则表示没有变化
	var newName = groupInfo.GroupName;//新群名称, 为空，则表示没有变化
	var newOwner = groupInfo.OwnerAccount;//新的群主id, 为空，则表示没有变化
	var newNotification = groupInfo.GroupNotification;//新的群公告, 为空，则表示没有变化
	var newIntroduction = groupInfo.GroupIntroduction;//新的群简介, 为空，则表示没有变化

	if (newName) {
		//更新群组列表的群名称
		//To do
		webim.Log.warn("群id=" + groupId + "的新名称为：" + newName);
	}
}
//监听新消息(私聊(包括普通消息、全员推送消息)，普通群(非直播聊天室)消息)事件
//newMsgList 为新消息数组，结构为[Msg]
export function onMsgNotify(newMsgList) {
	var newMsg;
	for (var j in newMsgList) {//遍历新消息
		newMsg = newMsgList[j];
		// handlerMsg(newMsg);//处理新消息
	}
}
//监听 解散群 系统消息
export function onDestoryGroupNotify(notify) {
	webim.Log.warn("执行 解散群 回调：" + JSON.stringify(notify));
	var reportTypeCh = "[群被解散]";
	var content = "群主" + notify.Operator_Account + "已解散该群";
	// console.log(notify.ReportType, reportTypeCh, notify.GroupId, notify.GroupName, content, notify.MsgTime);
	//IOS退出视频观看
  IOSPlayStreaming.stopPlay();
  //页面返回
  Actions.pop();
}
export function onRevokeGroupNotify(notify) {
	webim.Log.warn("执行 群被回收 回调：" + JSON.stringify(notify));
	var reportTypeCh = "[群被回收]";
	var content = "该群已被回收";
	console.log(notify.ReportType, reportTypeCh, notify.GroupId, notify.GroupName, content, notify.MsgTime);
}
//监听 用户自定义 群系统消息
export function onCustomGroupNotify(notify) {
	webim.Log.warn("执行 用户自定义系统消息 回调：" + JSON.stringify(notify));
	var reportTypeCh = "[用户自定义系统消息]";
	var content = notify.UserDefinedField;//群自定义消息数据
	console.log(notify.ReportType, reportTypeCh, notify.GroupId, notify.GroupName, content, notify.MsgTime);
}
//加入大群
export function applyJoinBigGroup(groupId,callback) {
	var options = {
		'GroupId': groupId//群id
	};
	webim.applyJoinBigGroup(
		options,
		function (resp) {
			//JoinedSuccess:加入成功; WaitAdminApproval:等待管理员审批
			console.log('进群成功'+JSON.stringify(resp));
			if (resp.JoinedStatus && resp.JoinedStatus == 'JoinedSuccess') {
				console.log('进群成功');
				selToID = groupId;
				callback(true)
			} else {
        console.log('进群失败');
				callback(false)
			}
		},
		function (err) {
			console.log(err.ErrorInfo);
		}
	);
}
//监听连接状态回调变化事件
export function onConnNotify(resp) {
	switch (resp.ErrorCode) {
		case webim.CONNECTION_STATUS.ON:
			// webim.Log.warn('连接状态正常...');
			break;
		case webim.CONNECTION_STATUS.OFF:
			webim.Log.warn('连接已断开，无法收到新消息，请检查下你的网络是否正常');
			break;
		default:
			webim.Log.error('未知连接状态,status=' + resp.ErrorCode);
			break;
	}
};
//踢出
export function onKickedGroupNotify() {
	return false ;
}
