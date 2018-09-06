/* webim javascript SDK
 * VER 1.7.0
 */

/* webim API definitions
 */
var webim = { // namespace object webim

  /* function init
   *   sdk登录
   * params:
   *   loginInfo      - Object, 登录身份相关参数集合，详见下面
   *   {
   *     sdkAppID     - String, 用户标识接入SDK的应用ID，必填
   *     accountType  - int, 账号类型，必填
   *     identifier   - String, 用户帐号,必须是字符串类型，必填
   *     identifierNick   - String, 用户昵称，选填
   *     userSig      - String, 鉴权Token，必须是字符串类型，必填
   *   }
   *   listeners      - Object, 事件回调函数集合, 详见下面
   *   {
   *     onConnNotify - function(connInfo), 用于收到连接状态相关通知的回调函数,目前未使用
   *     jsonpCallback -function(rspData),//IE9(含)以下浏览器用到的jsonp回调函数
   *     onMsgNotify  - function(newMsgList), 用于收到消息通知的回调函数,
   *      newMsgList为新消息数组，格式为[Msg对象]
   *      使用方有两种处理回调: 1)处理newMsgList中的增量消息,2)直接访问webim.MsgStore获取最新的消息
   *     onGroupInfoChangeNotify  - function(groupInfo), 用于监听群组资料变更的回调函数,
   *          groupInfo为新的群组资料信息
   *     onGroupSystemNotifys - Object, 用于监听（多终端同步）群系统消息的回调函数对象
   *
   *   }
   *   options        - Object, 其它选项, 目前未使用
   * return:
   *   (无)
   */
  login: function (loginInfo, listeners, options) {
  },

  /* function syncMsgs
   *   拉取最新C2C消息
   *   一般不需要使用方直接调用, SDK底层会自动同步最新消息并通知使用方, 一种有用的调用场景是用户手动触发刷新消息
   * params:
   *   cbOk   - function(msgList)类型, 当同步消息成功时的回调函数, msgList为新消息数组，格式为[Msg对象],
   *            如果此参数为null或undefined则同步消息成功后会像自动同步那样回调cbNotify
   *   cbErr  - function(err)类型, 当同步消息失败时的回调函数, err为错误对象
   * return:
   *   (无)
   */
  syncMsgs: function (cbOk, cbErr) {
  },


  /* function getC2CHistoryMsgs
   * 拉取C2C漫游消息
   * params:
   *   options    - 请求参数
   *   cbOk   - function(msgList)类型, 成功时的回调函数, msgList为消息数组，格式为[Msg对象],
   *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
   * return:
   *   (无)
   */
  getC2CHistoryMsgs: function (options, cbOk, cbErr) {
  },

  /* function syncGroupMsgs
   * 拉取群漫游消息
   * params:
   *   options    - 请求参数
   *   cbOk   - function(msgList)类型, 成功时的回调函数, msgList为消息数组，格式为[Msg对象],
   *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
   * return:
   *   (无)
   */
  syncGroupMsgs: function (options, cbOk, cbErr) {
  },

  /* function sendMsg
   *   发送一条消息
   * params:
   *   msg    - webim.Msg类型, 要发送的消息对象
   *   cbOk   - function()类型, 当发送消息成功时的回调函数
   *   cbErr  - function(err)类型, 当发送消息失败时的回调函数, err为错误对象
   * return:
   *   (无)
   */
  sendMsg: function (msg, cbOk, cbErr) {
  },

  /* function logout
   *   sdk登出
   * params:
   *   cbOk   - function()类型, 成功时回调函数
   *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
   * return:
   *   (无)
   */
  logout: function (cbOk, cbErr) {
  },

  /* function setAutoRead
   * 设置会话自动已读上报标志
   * params:
   *   selSess    - webim.Session类型, 当前会话
   *   isOn   - boolean, 将selSess的自动已读消息标志改为isOn，同时是否上报当前会话已读消息
   *   isResetAll - boolean，是否重置所有会话的自动已读标志
   * return:
   *   (无)
   */
  setAutoRead: function (selSess, isOn, isResetAll) {
  },

  /* function getProfilePortrait
   *   拉取资料（搜索用户）
   * params:
   *   cbOk   - function()类型, 成功时回调函数
   *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
   * return:
   *   (无)
   */
  getProfilePortrait: function (options, cbOk, cbErr) {
  },

  /* function setProfilePortrait
   *   设置个人资料
   * params:
   *   cbOk   - function()类型, 成功时回调函数
   *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
   * return:
   *   (无)
   */
  setProfilePortrait: function (options, cbOk, cbErr) {
  },

  /* function applyAddFriend
   *   申请添加好友
   * params:
   *   cbOk   - function()类型, 成功时回调函数
   *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
   * return:
   *   (无)
   */
  applyAddFriend: function (options, cbOk, cbErr) {
  },

  /* function getPendency
   *   拉取好友申请
   * params:
   *   cbOk   - function()类型, 成功时回调函数
   *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
   * return:
   *   (无)
   */
  getPendency: function (options, cbOk, cbErr) {
  },

  /* function deletePendency
   *   删除好友申请
   * params:
   *   cbOk   - function()类型, 成功时回调函数
   *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
   * return:
   *   (无)
   */
  deletePendency: function (options, cbOk, cbErr) {
  },

  /* function responseFriend
   *   响应好友申请
   * params:
   *   cbOk   - function()类型, 成功时回调函数
   *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
   * return:
   *   (无)
   */
  responseFriend: function (options, cbOk, cbErr) {
  },

  /* function getAllFriend
   *   拉取我的好友
   * params:
   *   cbOk   - function()类型, 成功时回调函数
   *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
   * return:
   *   (无)
   */
  getAllFriend: function (options, cbOk, cbErr) {
  },

  /* function deleteFriend
   *   删除好友
   * params:
   *   cbOk   - function()类型, 成功时回调函数
   *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
   * return:
   *   (无)
   */
  deleteFriend: function (options, cbOk, cbErr) {
  },

  /* function addBlackList
   *   增加黑名单
   * params:
   *   cbOk   - function()类型, 成功时回调函数
   *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
   * return:
   *   (无)
   */
  addBlackList: function (options, cbOk, cbErr) {
  },

  /* function getBlackList
   *   删除黑名单
   * params:
   *   cbOk   - function()类型, 成功时回调函数
   *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
   * return:
   *   (无)
   */
  getBlackList: function (options, cbOk, cbErr) {
  },

  /* function deleteBlackList
   *   我的黑名单
   * params:
   *   cbOk   - function()类型, 成功时回调函数
   *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
   * return:
   *   (无)
   */
  deleteBlackList: function (options, cbOk, cbErr) {
  },

  /* function uploadPic
   *   上传图片
   * params:
   *   options    - 请求参数，详见api文档
   *   cbOk   - function()类型, 成功时回调函数
   *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
   * return:
   *   (无)
   */
  uploadPic: function (options, cbOk, cbErr) {
  },

  /* function createGroup
   *   创建群
   * params:
   *   options    - 请求参数，详见api文档
   *   cbOk   - function()类型, 成功时回调函数
   *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
   * return:
   *   (无)
   */
  createGroup: function (options, cbOk, cbErr) {
  },

  /* function applyJoinGroup
   *   申请加群
   * params:
   *   options    - 请求参数，详见api文档
   *   cbOk   - function()类型, 成功时回调函数
   *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
   * return:
   *   (无)
   */
  applyJoinGroup: function (options, cbOk, cbErr) {
  },

  /* function handleApplyJoinGroup
   *   处理申请加群(同意或拒绝)
   * params:
   *   options    - 请求参数，详见api文档
   *   cbOk   - function()类型, 成功时回调函数
   *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
   * return:
   *   (无)
   */
  handleApplyJoinGroup: function (options, cbOk, cbErr) {
  },

  /* function deleteApplyJoinGroupPendency
   *   删除加群申请
   * params:
   *   options    - 请求参数，详见api文档
   *   cbOk   - function()类型, 成功时回调函数
   *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
   * return:
   *   (无)
   */
  deleteApplyJoinGroupPendency: function (options, cbOk, cbErr) {
  },


  /* function quitGroup
   *  主动退群
   * params:
   *   options    - 请求参数，详见api文档
   *   cbOk   - function()类型, 成功时回调函数
   *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
   * return:
   *   (无)
   */
  quitGroup: function (options, cbOk, cbErr) {
  },

  /* function getGroupPublicInfo
   *   读取群公开资料-高级接口
   * params:
   *   options    - 请求参数，详见api文档
   *   cbOk   - function()类型, 成功时回调函数
   *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
   * return:
   *   (无)
   */
  getGroupPublicInfo: function (options, cbOk, cbErr) {
  },

  /* function getGroupInfo
   *   读取群详细资料-高级接口
   * params:
   *   options    - 请求参数，详见api文档
   *   cbOk   - function()类型, 成功时回调函数
   *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
   * return:
   *   (无)
   */
  getGroupInfo: function (options, cbOk, cbErr) {
  },

  /* function modifyGroupBaseInfo
   *   修改群基本资料
   * params:
   *   options    - 请求参数，详见api文档
   *   cbOk   - function()类型, 成功时回调函数
   *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
   * return:
   *   (无)
   */
  modifyGroupBaseInfo: function (options, cbOk, cbErr) {
  },

  /* function destroyGroup
   *  解散群
   * params:
   *   options    - 请求参数，详见api文档
   *   cbOk   - function()类型, 成功时回调函数
   *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
   * return:
   *   (无)
   */
  destroyGroup: function (options, cbOk, cbErr) {
  },

  /* function getJoinedGroupListHigh
   *   获取我的群组-高级接口
   * params:
   *   options    - 请求参数，详见api文档
   *   cbOk   - function()类型, 成功时回调函数
   *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
   * return:
   *   (无)
   */
  getJoinedGroupListHigh: function (options, cbOk, cbErr) {
  },

  /* function getGroupMemberInfo
   *   获取群组成员列表
   * params:
   *   options    - 请求参数，详见api文档
   *   cbOk   - function()类型, 成功时回调函数
   *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
   * return:
   *   (无)
   */
  getGroupMemberInfo: function (options, cbOk, cbErr) {
  },

  /* function addGroupMember
   *   邀请好友加群
   * params:
   *   options    - 请求参数，详见api文档
   *   cbOk   - function()类型, 成功时回调函数
   *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
   * return:
   *   (无)
   */
  addGroupMember: function (options, cbOk, cbErr) {
  },

  /* function modifyGroupMember
   *   修改群成员资料（角色或者群消息提类型示）
   * params:
   *   options    - 请求参数，详见api文档
   *   cbOk   - function()类型, 成功时回调函数
   *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
   * return:
   *   (无)
   */
  modifyGroupMember: function (options, cbOk, cbErr) {
  },

  /* function forbidSendMsg
   *   设置群成员禁言时间
   * params:
   *   options    - 请求参数，详见api文档
   *   cbOk   - function()类型, 成功时回调函数
   *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
   * return:
   *   (无)
   */
  forbidSendMsg: function (options, cbOk, cbErr) {
  },

  /* function deleteGroupMember
   *   删除群成员
   * params:
   *   options    - 请求参数，详见api文档
   *   cbOk   - function()类型, 成功时回调函数
   *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
   * return:
   *   (无)
   */
  deleteGroupMember: function (options, cbOk, cbErr) {
  },

  /* function sendCustomGroupNotify
   *   发送自定义群通知
   * params:
   *   options    - 请求参数，详见api文档
   *   cbOk   - function()类型, 成功时回调函数
   *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
   * return:
   *   (无)
   */
  sendCustomGroupNotify: function (options, cbOk, cbErr) {
  },

  /* class webim.Msg
   *   一条消息的描述类, 消息发送、接收的API中都会涉及此类型的对象
   * properties:
   *   sess   - Session object-ref, 消息所属的会话(e.g:我与好友A的C2C会话，我与群组G的GROUP会话)
   *   isSend - Boolean, true表示是我发出消息, false表示是发给我的消息)
   *   seq    - Integer, 消息序列号, 用于判断消息是否同一条
   *   random - Integer, 消息随机数,用于判断消息是否同一条
   *   time   - Integer, 消息时间戳, 为unix timestamp
   *   fromAccount -String,  消息发送者帐号
   *   subType -Integer,  消息子类型，c2c消息时，0-表示普通消息；群消息时，0-普通消息，1-点赞消息，2-提示消息
   *   fromAccountNick -String,  消息发送者昵称
   *   elems  - Array of webim.Msg.Elem, 描述消息内容的元素列表
   * constructor:
   *   Msg(sess, isSend, seq,random time,fromAccount) - 构造函数, 参数定义同上面properties中定义
   * methods:
   *   addText(text)  - 向elems中添加一个TEXT元素
   *   addFace(face)  - 向elems中添加一个FACE元素
   *   toHtml()       - 转成可展示的html String
   *addFace
   * sub-class webim.Msg.Elem
   *   消息中一个组成元素的描述类, 一条消息的内容被抽象描述为N个元素的有序列表
   * properties:
   *   type   - 元素类型, 目前有TEXT(文本)、FACE(表情)、IMAGE(图片)等
   *   content- 元素内容体, 当TEXT时为String, 当PIC时为UrlString
   * constructor:
   *   Elem(type, content) - 构造函数, 参数定义同上面properties中定义
   *
   * sub-class webim.Msg.Elem.TextElem
   *   文本
   * properties:
   *   text  - String 内容
   * constructor:
   *   TextElem(text) - 构造函数, 参数定义同上面properties中定义
   *
   * sub-class webim.Msg.Elem.FaceElem
   *   表情
   * properties:
   *   index  - Integer 表情索引, 用户自定义
   *   data   - String 额外数据，用户自定义
   * constructor:
   *   FaceElem(index,data) - 构造函数, 参数定义同上面properties中定义
   *
   *
   */
  Msg: function (sess, isSend, seq, random, time, fromAccount, subType, fromAccountNick) {/*Class constructor*/
  },

  /* singleton object MsgStore
   * webim.MsgStore是消息数据的Model对象(参考MVC概念), 它提供接口访问当前存储的会话和消息数据
   * 下面说明下会话数据类型: Session
   *
   * class Session
   *   一个Session对象描述一个会话，会话可简单理解为最近会话列表的一个条目，它由两个字段唯一标识:
   *     type - String, 会话类型(如"C2C", "GROUP", ...)
   *     id   - String, 会话ID(如C2C类型中为对方帐号,"C2C"时为好友ID,"GROUP"时为群ID)
   * properties:
   *   (Session对象未对外暴露任何属性字段, 所有访问通过下面的getter方法进行)
   * methods:
   *   type()     - String, 返回会话类型,"C2C"表示与好友私聊，"GROUP"表示群聊
   *   id()       - String, 返回会话ID
   *   name()     - String, 返回会话标题(如C2C类型中为对方的昵称,暂不支持)
   *   icon()     - String, 返回会话图标(对C2C类型中为对方的头像URL，暂不支持)
   *   unread()           - Integer, 返回会话未读条数
   *   time()     - Integer, 返回会话最后活跃时间, 为unix timestamp
   *   curMaxMsgSeq() - Integer, 返回会话最大消息序列号
   *   msgCount() - Integer, 返回会话中所有消息条数
   *   msg(index) - webim.Msg, 返回会话中第index条消息
   */
  MsgStore: {
    /* function sessMap
     *   获取所有会话
     * return:
     *   所有会话对象
     */
    sessMap: function () {
      return {/*Object*/};
    },
    /* function sessCount
     *   获取当前会话的个数
     * return:
     *   Integer, 会话个数
     */
    sessCount: function () {
      return 0;
    },

    /* function sessByTypeId
     *   根据会话类型和会话ID取得相应会话
     * params:
     *   type   - String, 会话类型(如"C2C", "GROUP", ...)
     *   id     - String, 会话ID(如对方ID)
     * return:
     *   Session, 会话对象(说明见上面)
     */
    sessByTypeId: function (type, id) {
      return {/*Session Object*/};
    },
    /* function delSessByTypeId
     *   根据会话类型和会话ID删除相应会话
     * params:
     *   type   - String, 会话类型(如"C2C", "GROUP", ...)
     *   id     - String, 会话ID(如对方ID)
     * return:
     *   Boolean, 布尔类型
     */
    delSessByTypeId: function (type, id) {
      return true;
    },

    /* function resetCookieAndSyncFlag
     *   重置上一次读取新c2c消息Cookie和是否继续拉取标记
     * return:
     *
     */
    resetCookieAndSyncFlag: function () {
    },

    downloadMap: {}
  }

};

/* webim API implementation
 */
(function (webim) {
  //sdk版本
  var SDK = {
    'VERSION': '1.7.0',//sdk版本号
    'APPID': '537048168'//web im sdk 版本 APPID
  };

  //是否启用正式环境，默认启用
  var isAccessFormaEnvironment = true;
  // var isAccessFormaEnvironment = false;

  //后台接口主机
  var SRV_HOST = {
    'FORMAL': {
      'COMMON': 'https://webim.tim.qq.com',
      'PIC': 'https://pic.tim.qq.com'
    },
    'TEST': {
      'COMMON': 'https://test.tim.qq.com',
      'PIC': 'https://pic.tim.qq.com'
    }
  };

  //浏览器版本信息
  var BROWSER_INFO = {};
  //是否为ie9（含）以下
  var lowerBR = false;

  //服务名称
  var SRV_NAME = {
    'OPEN_IM': 'openim',//私聊（拉取未读c2c消息，长轮询，c2c消息已读上报等）服务名
    'GROUP': 'group_open_http_svc',//群组管理（拉取群消息，创建群，群成员管理，群消息已读上报等）服务名
    'FRIEND': 'sns',//关系链管理（好友管理，黑名单管理等）服务名
    'PROFILE': 'profile',//资料管理（查询，设置个人资料等）服务名
    'RECENT_CONTACT': 'recentcontact',//最近联系人服务名
    'PIC': 'openpic',//图片（或文件）服务名
    'BIG_GROUP': 'group_open_http_noauth_svc',//直播大群 群组管理（申请加大群）服务名
    'BIG_GROUP_LONG_POLLING': 'group_open_long_polling_http_noauth_svc',//直播大群 长轮询（拉取消息等）服务名
    'IM_OPEN_STAT': 'imopenstat'//质量上报，统计接口错误率
  };

  //不同服务对应的版本号
  var SRV_NAME_VER = {
    'openim': 'v4',
    'group_open_http_svc': 'v4',
    'sns': 'v4',
    'profile': 'v4',
    'recentcontact': 'v4',
    'openpic': 'v4',
    'group_open_http_noauth_svc': 'v1',
    'group_open_long_polling_http_noauth_svc': 'v1',
    'imopenstat': 'v4'
  };

  //不同的命令名对应的上报类型ID，用于接口质量上报
  var CMD_EVENT_ID_MAP = {
    'login': 1,//登录
    'pic_up': 3,//上传图片
    'apply_join_group': 9,//申请加入群组
    'create_group': 10,//创建群组
    'longpolling': 18,//普通长轮询
    'send_group_msg': 19,//群聊
    'sendmsg': 20//私聊
  };

  //聊天类型
  var SESSION_TYPE = {
    'C2C': 'C2C',//私聊
    'GROUP': 'GROUP'//群聊
  };

  //最近联系人类型
  var RECENT_CONTACT_TYPE = {
    'C2C': 1,//好友
    'GROUP': 2//群
  };

  //消息最大长度（字节）
  var MSG_MAX_LENGTH = {
    'C2C': 12000,//私聊消息
    'GROUP': 8898//群聊
  };

  //后台接口返回类型
  var ACTION_STATUS = {
    'OK': 'OK',//成功
    'FAIL': 'FAIL'//失败
  };

  var ERROR_CODE_CUSTOM = 99999;//自定义后台接口返回错误码

  //消息元素类型
  var MSG_ELEMENT_TYPE = {
    'TEXT': 'TIMTextElem',//文本
    'FACE': 'TIMFaceElem',//表情
    'IMAGE': 'TIMImageElem',//图片
    'CUSTOM': 'TIMCustomElem',//自定义
    'SOUND': 'TIMSoundElem',//语音,只支持显示
    'FILE': 'TIMFileElem',//文件,只支持显示
    'LOCATION': 'TIMLocationElem',//地理位置
    'GROUP_TIP': 'TIMGroupTipElem'//群提示消息,只支持显示
  };

  //图片类型
  var IMAGE_TYPE = {
    'ORIGIN': 1,//原图
    'LARGE': 2,//缩略大图
    'SMALL': 3//缩略小图
  };

  //上传资源包类型
  var UPLOAD_RES_PKG_FLAG = {
    'RAW_DATA': 0,//原始数据
    'BASE64_DATA': 1//base64编码数据
  };

  //下载文件配置
  var DOWNLOAD_FILE = {
    'BUSSINESS_ID': '10001',//下载文件业务ID
    'AUTH_KEY': '617574686b6579',//下载文件authkey
    'SERVER_IP': '182.140.186.147'//下载文件服务器IP
  };

  //下载文件类型
  var DOWNLOAD_FILE_TYPE = {
    "SOUND": 2106,//语音
    "FILE": 2107//普通文件
  };

  //上传资源类型
  var UPLOAD_RES_TYPE = {
    "IMAGE": 1,//图片
    "FILE": 2,//文件
    "SHORT_VIDEO": 3,//短视频
    "SOUND": 4//语音，PTT
  };

  //版本号，用于上传图片或文件接口
  var VERSION_INFO = {
    'APP_VERSION': '2.1',//应用版本号
    'SERVER_VERSION': 1//服务端版本号
  };

  //长轮询消息类型
  var LONG_POLLINNG_EVENT_TYPE = {
    "C2C": 1//新的c2c消息通知
    ,"GROUP_COMMON": 3//新的群普通消息
    ,"GROUP_TIP": 4//新的群提示消息
    ,"GROUP_SYSTEM": 5//新的群系统消息
    ,"GROUP_TIP2": 6//新的群提示消息2
    ,"FRIEND_NOTICE": 7//好友系统通知
    ,"PROFILE_NOTICE": 8//资料系统通知
    ,"C2C_COMMON": 9//新的C2C消息
    ,"C2C_EVENT": 10
  };

  //c2c消息子类型
  var C2C_MSG_SUB_TYPE = {
    "COMMON": 0//普通消息
  };
  //c2c消息子类型
  var C2C_EVENT_SUB_TYPE = {
    "READED": 92//已读消息同步
  };

  //群消息子类型
  var GROUP_MSG_SUB_TYPE = {
    "COMMON": 0,//普通消息
    "LOVEMSG": 1,//点赞消息
    "TIP": 2,//提示消息
    "REDPACKET": 3//红包消息
  };

  //群消息优先级类型
  var GROUP_MSG_PRIORITY_TYPE = {
    "REDPACKET": 1,//红包消息
    "COMMON": 2,//普通消息
    "LOVEMSG": 3//点赞消息
  };

  //群提示消息类型
  var GROUP_TIP_TYPE = {
    "JOIN": 1,//加入群组
    "QUIT": 2,//退出群组
    "KICK": 3,//被踢出群组
    "SET_ADMIN": 4,//被设置为管理员
    "CANCEL_ADMIN": 5,//被取消管理员
    "MODIFY_GROUP_INFO": 6,//修改群资料
    "MODIFY_MEMBER_INFO": 7//修改群成员信息
  };

  //群提示消息-群资料变更类型
  var GROUP_TIP_MODIFY_GROUP_INFO_TYPE = {
    "FACE_URL": 1,//修改群头像URL
    "NAME": 2,//修改群名称
    "OWNER": 3,//修改群主
    "NOTIFICATION": 4,//修改群公告
    "INTRODUCTION": 5//修改群简介
  };

  //群系统消息类型
  var GROUP_SYSTEM_TYPE = {
    "JOIN_GROUP_REQUEST": 1,//申请加群请求（只有管理员会收到）
    "JOIN_GROUP_ACCEPT": 2,//申请加群被同意（只有申请人能够收到）
    "JOIN_GROUP_REFUSE": 3,//申请加群被拒绝（只有申请人能够收到）
    "KICK": 4,//被管理员踢出群(只有被踢者接收到)
    "DESTORY": 5,//群被解散(全员接收)
    "CREATE": 6,//创建群(创建者接收, 不展示)
    "INVITED_JOIN_GROUP_REQUEST": 7,//邀请加群(被邀请者接收)
    "QUIT": 8,//主动退群(主动退出者接收, 不展示)
    "SET_ADMIN": 9,//设置管理员(被设置者接收)
    "CANCEL_ADMIN": 10,//取消管理员(被取消者接收)
    "REVOKE": 11,//群已被回收(全员接收, 不展示)
    "READED": 15,//群消息已读同步
    "CUSTOM": 255//用户自定义通知(默认全员接收)
  };

  //好友系统通知子类型
  var FRIEND_NOTICE_TYPE = {
    "FRIEND_ADD": 1,//好友表增加
    "FRIEND_DELETE": 2,//好友表删除
    "PENDENCY_ADD": 3,//未决增加
    "PENDENCY_DELETE": 4,//未决删除
    "BLACK_LIST_ADD": 5,//黑名单增加
    "BLACK_LIST_DELETE": 6,//黑名单删除
    "PENDENCY_REPORT": 7,//未决已读上报
    "FRIEND_UPDATE": 8//好友数据更新
  };

  //资料系统通知子类型
  var PROFILE_NOTICE_TYPE = {
    "PROFILE_MODIFY": 1//资料修改
  };

  //腾讯登录服务错误码（用于托管模式）
  var TLS_ERROR_CODE = {
    'OK': 0,//成功
    'SIGNATURE_EXPIRATION': 11//用户身份凭证过期
  };

  //长轮询连接状态
  var CONNECTION_STATUS = {
    'INIT': -1,//初始化
    'ON': 0,//连接正常
    'RECONNECT': 1,//连接恢复正常
    'OFF': 9999//连接已断开,可能是用户网络问题，或者长轮询接口报错引起的
  };

  var UPLOAD_PIC_BUSSINESS_TYPE = {//图片业务类型
    'GROUP_MSG': 1,//私聊图片
    'C2C_MSG': 2,//群聊图片
    'USER_HEAD': 3,//用户头像
    'GROUP_HEAD': 4//群头像
  };

  var FRIEND_WRITE_MSG_ACTION = {//好友输入消息状态
    'ING': 14,//正在输入
    'STOP': 15//停止输入
  };

  //ajax默认超时时间，单位：毫秒
  var ajaxDefaultTimeOut = 15000;

  //大群长轮询接口返回正常时，延时一定时间再发起下一次请求
  var OK_DELAY_TIME = 1000;

  //大群长轮询接口发生错误时，延时一定时间再发起下一次请求
  var ERROR_DELAY_TIME = 5000;

  //群提示消息最多显示人数
  var GROUP_TIP_MAX_USER_COUNT = 10;

  //长轮询连接状态
  var curLongPollingStatus = CONNECTION_STATUS.INIT;

  //当长轮询连接断开后，是否已经回调过
  var longPollingOffCallbackFlag = false;

  //当前长轮询返回错误次数
  var curLongPollingRetErrorCount = 0;

  //长轮询默认超时时间，单位：毫秒
  var longPollingDefaultTimeOut = 60000;

  //长轮询返回错误次数达到一定值后，发起新的长轮询请求间隔时间，单位：毫秒
  var longPollingIntervalTime = 5000;

  //没有新消息时，长轮询返回60008错误码是正常的
  var longPollingTimeOutErrorCode = 60008;

  //多实例登录被kick的错误码
  var longPollingKickedErrorCode = 91101;

  var LongPollingId = null;

  //当前大群长轮询返回错误次数
  var curBigGroupLongPollingRetErrorCount = 0;

  //最大允许长轮询返回错误次数
  var LONG_POLLING_MAX_RET_ERROR_COUNT = 10;

  //上传重试累计
  var Upload_Retry_Times = 0;
  //最大上传重试
  var Upload_Retry_Max_Times = 20;

  //ie7/8/9采用jsonp方法解决ajax跨域限制
  var jsonpRequestId = 0;//jsonp请求id
  //最新jsonp请求返回的json数据
  var jsonpLastRspData = null;
  //兼容ie7/8/9,jsonp回调函数
  var jsonpCallback = null;

  var uploadResultIframeId = 0;//用于上传图片的iframe id

  var ipList = [];//文件下载地址
  var authkey = null;//文件下载票据
  var expireTime = null;//文件下载票据超时时间

  //错误码
  var ERROR = {};
  //当前登录用户
  var ctx = {
    sdkAppID: null,
    appIDAt3rd: null,
    accountType: null,
    identifier: null,
    tinyid: null,
    identifierNick: null,
    userSig: null,
    a2: null,
    contentType: 'json',
    apn: 1
  };
  var opt = {};
  var xmlHttpObjSeq = 0;//ajax请求id
  var xmlHttpObjMap = {};//发起的ajax请求
  var curSeq = 0;//消息seq
  var tempC2CMsgList = [];//新c2c消息临时缓存
  var tempC2CHistoryMsgList = [];//漫游c2c消息临时缓存

  var maxApiReportItemCount = 20;//一次最多上报条数
  var apiReportItems = [];//暂存api接口质量上报数据

  var Resources = {
    downloadMap : {}
  };

  //表情标识字符和索引映射关系对象，用户可以自定义
  var emotionDataIndexs = {
    "[惊讶]": 0,
    "[撇嘴]": 1,
    "[色]": 2,
    "[发呆]": 3,
    "[得意]": 4,
    "[流泪]": 5,
    "[害羞]": 6,
    "[闭嘴]": 7,
    "[睡]": 8,
    "[大哭]": 9,
    "[尴尬]": 10,
    "[发怒]": 11,
    "[调皮]": 12,
    "[龇牙]": 13,
    "[微笑]": 14,
    "[难过]": 15,
    "[酷]": 16,
    "[冷汗]": 17,
    "[抓狂]": 18,
    "[吐]": 19,
    "[偷笑]": 20,
    "[可爱]": 21,
    "[白眼]": 22,
    "[傲慢]": 23,
    "[饿]": 24,
    "[困]": 25,
    "[惊恐]": 26,
    "[流汗]": 27,
    "[憨笑]": 28,
    "[大兵]": 29,
    "[奋斗]": 30,
    "[咒骂]": 31,
    "[疑问]": 32,
    "[嘘]": 33,
    "[晕]": 34
  };

  //表情对象，用户可以自定义
  var emotions = {
    "0": ["[惊讶]","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAACglBMVEUAAABdIwBdIwBdIwBdIwBdIwBdIwBdIwBdIwBdIwBdIwCCTBmmci/brU7svli9ijh1PQzksUfksEXhrD/ZnjBdIwDxx2Xxx2Xyx2Tuwl/rxVXowE7jtkvLkzTksEXhrELgqj3cozTMjy5dIwDxx2Xzzl7z1VP12lL12U/12Ev110jdtDf11kTyz0PswTvjtD3gqTnepzlsMwrRpE/011z221j23Fv23V/221X12Ez110b10j/xyDvntDfdpzvcpTXcojPepTfxx2X23mL232b24Gv24W7100H0zTvany3cozPxx2X24Gj243LoymbSoD/sz2f0xzXcojHgq0Kpby/35Xu8dhvXpUn11UL0yzn0xTTpsy/aoC7MlETEgiPBgCnnzan8+PLiwpr1zz30yTf0wzGmZCTFhzfhvV/////z5tT0vy7hqCzZniy8dhvu3cb35oH35HbzuyrZnSvXmyrAeyDPmVXw2nrzvSzvsCXRoWKtkolvPzFaJBOGShvztibkpiXUmjTZsn+DW06tbCvBraewbBrcr1LzuSjYnCrTljekYhnzsyPenyTt2MD47uOOaF3ntk7eu42XVxjLu7XuqyDUlifyrR3NkCrAfR/KjCryqxvHhynkwVjUqHrz3HDzsCDDhCvrzmK+fyvrzVzAgSvtx0zmoB63dyvTihTVkh+7eirAgSrLfxHhrl304sTszJjTjiKycSuqaSzepjfpuTXDcw22diqtbCzdpTbLhyK8agzfmiDvqByraSynZizboTGnZSy1YQnany6mZCylYyz258rly7GiTQPZnSzqyIj68+TCjGGraizYnCrUmCrPkiqubSyvbyvJiyu4dyutbCyL1taJAAAA1nRSTlMAII/b/69gUO+/EID//////++/gDBAWM///////////99wEIDf////////////////75/f////////////////vyAw////////71Dv/////////2Bg///////////6///////////P////////z1D//////4Df//////////////+//////////9//////////j////////9/////////////////L//+v////cP///////yCf////10D//////1CAr//P7zD///+v////eJ/f/++Xn78wZnvzLAAABEFJREFUSMfdlv1DU1UYx9WuqRVESraQSUCyMedYxTa2wQbuFRvQhhzHGIyxjXlhJnCNJqXTXEk4pVZujZGNeCvQjJGbsbayV7Issvp/OufeuRdezJ99fv5+nuf7POc5595Nmx7K2LzlEQzb+ugD67dtxzBIYDsee0DgceyJnNzcJ/OwvKd27sq/r5WnYc7dz9Boz+YWFOwpzMPoe4uKnisu2cgJtFG6+3kajbavjMFgMstZ+9kHOBVc7gvF6+pLofEXX4LqSh5fIBDweVUMIUvEFlfXSKS1devYwbZvOwjTV/JlcoVSqVTIBfwqZrmIrVJzuNL6Q2uALVjpwZdp+3gCTUNjE53e9EqDUi7gMUhCW6PTNa8GdmCHkV6mbGkCZBxpadCQhF7camjTGVfX2Iq1d4AOCdKbOs3mLhNFVDFZbL3Famsz1q8a8OZuAOwA0I8CuxmH0WMCjS1KOZ8hhI2rtb0O47Fs4FVgOo73tEMvx3EyOgG9r18h4yVLDOiIE1nAa6AT5QVgEE+GHbyeKtFqcJ4k6jNPsBnYSdUQyeH4G2+eOg2O9qEuhCw0qF7XmawSZ8FbSHbOTTl6+xSMd8739VNtI2D4JPFuWl83ArpI2QVAFjiHgAsQUAhSTXguEulBNY+AS7AAAkYR8F4SQEeRAjI9vT8CvGSFDyhLH5KWcjJPYsBz2Xc2BeyUgCEy8WmyF8iiphv74ZTSgN/3URooDFBe7Mlp4fgoCLQ0KGRwrLDpJDCWBvb6yBJeeHBePDngnH60f9TGaiEQ9I1nANUBMNg5BAIfB9C8cPwKCHyi1MACyBHajeFQ0DeRBorUnA6YPbBHUQhAu9drB4FPkZ68EnoLPGlXKDg2mQFwxPr90ooygUwzhUhAn1LIZXwedevUVpvT5Q9OTKeAXVyOWsUWCRllMzOVmqmCgimNXAavHONegd5hj3928rMUcIhb02rRs1k1n8PwzchgULca6akCoeDc/NX0bki4BrVYz7n2xfXrXy5cq+DzeVDORH70KlQADjVoCi+mga8kN6xq8dwRNCDzSISD3hlheVKvJQvMRm9mbOvXUq7NWh2hdns0siQUliM59EPqYQfBjvDhzAtUK20ztEV6qEMbjB0QiZCc0kNDoeA34ZtZNy5fp3NejCTXoit2gw3lKrFFTeqhoXg08W32pf5O55iLJYFLMYdKJUZyq4HUw47dt1a/TLVGXwr43meB6lYrTO8cRvold/eaN7nkB6PPfA9wWK1aLczuHHBB//El948/rX1eS44RRT+TwC/LDpvN1gvlZPrZ+cR6ekj8ShC3UZEry2eczgGo9nhC/vhCONG90TeiuJ6Q3v4N/33ZBQOpg/GFqDtxZ+OPUN0fBEGct8cuh0J+f3x2bjwaTtxavO8Xru7En76VlZWxsfGJyflo+K+7i///Vcy/+vf0tGly+p+7d/59OH8s/gOVudqyjTYwEwAAAABJRU5ErkJggg==" ],
    "1": ["[撇嘴]","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAChVBMVEUAAADwxGHtwFvqulPtwFvrvVbpulDmtErls0nksUfgqj3epTfxx2XvxGDxx2XwxWHuwlzksEXhqz/hrD/gqj3gqDvxx2TyzF/z0FL12U712Ez110j110f11kTxz0XEiTejYSzepzjhqz7xx2X221j23Fv221X12lL12EqFPiF9NB+qbSrqwD3iqzjxx2Xxx2XGkkfImUD23V3232X24Gj24Wr23mLguUH0zDrptzndozPdpTXLji7xx2XpzWL35Hf35Xz24m/vvjXcojHLolr36Ib36o336pH0yjj0wzLkrDDboC7KjS7365L47Zz476L48aj47Jf354P0xzb0wS/boTD59LX59r70xTTzvSzgpjDXmyu5gjfDhCW8dhvAfSLeu3D5+Mb5+MTozHHIiivWoDHx0kiQUSXzuSjaniu4eCvKkkbNmFTJiSX110bwxzzzuyrqrCbYnCvZnSvrvFbmzKr////y5dTx5abhwpv37uP10UDzvy7ztibhoyjVmSrRpEXOky7ZsF/eu4369fHAgCr11EH0zjzUlyrqu1Xq2JvEhizZsn/isTf1zz3zsyLrxU3LurXArafky4vZpzL0wjHvyEl3TD9YIxOSb2R1QCPztCTspR3VmSqskYl8QBbp1ZBrMxXkuDvyrBzSmTKfXhnYrFCXVxjTlCrLjivw24GCWk6KTRfhvFrzsSHyqhvyrh69fiu0cyvcojLbmSS3dyvNjCiqaCyxcCzSjiOzciuraSzCeyjXozitbCzcozOxXiG1ZSO6bSXHgyjpryzAcyTZlCKvbiyoZyznqSjmnx6pZyylYyymZCylYyynZSzenSSpaCzQlCq9fSu+fyu3dyu9fSuCgSfDAAAA13RSTlMAQICvv////8+/hUAgmu//////758w////////////////v3D/////////////EL///////////////88Qz///////7///////////IP//////////z///////m///////////////////////////////30D/////////////YP//////////v+//////////////////////////////////////////7//////////Pv2D/gP9A7///gP///3D//////////9////9Yn3Dv/5+vMEBwgA7gIKUAAASASURBVEjH7ZX9X9JXFMedpS63StkkefjqKBBiuAoUjVw8GAriTOWbgtU1nSZgGVJjM8CyxLaZYA9ubOgehMo9IUvTSc7ptFra2kOtv2fnghM0y/28187r9eXFeb0+7+/53HO/99y4uP9kvBC/bn1CYmLSixuSX1pb/fLGTZtTUhIwkJSaSnnl1bQ15FQqdUt6Oo1GZzCJjMzXKBTW1ucg2zaBnM3mcDjsLC6Nx9zOf12QzWIlP0P+xg4qdecuoSgnNzdHJBayubQ8IPJ3syR7ClbVv0ml7uLz90qlMplMKs8Vc7IihCJbUpi2qn4L6PfJlEXFxUVKQETCCKFSl2gKS58CdkT0yrfK9peX768oqpQtEVqyRHNgpav4RX1FeVV1dXVVeVlxpVQu5nB5mNDpazQHl+vTwv4PHUao9khdXV09EG83QNJ4lJG3vUlBGjTG5Zu4fvNOPt+EUPMxeMLEEYQyITl+tEVwQqU2t1pOxupPpaQ08Q8h9I7V+m4zghr179WiNqv1dDNqZBK2fJ3d0W45EwNsTEjPONuBJUCgWgDOofM46XSiDKLrgtZuaLW8HwN8kMCkZyGnNRz70Id19d2oM5xcRD1El0tLGtxGS7S1pxJ7WwA4hhWXLp9HV+qqUWYkaUNXAVD1md2xnuITP1oEOj/2eJrQleqqMPCJx/PpP4C3fyDa2XVJGQDUgovPPB7P5+iLqvJMdNp6GZIv0eAi4BuILmJDUhfB4/phnVDAc60Wtvo6uogLeG7gRbu0GBj6KgawEQxaL0Jt4QLnysoqvoa2foMTaCt0iTS7fUMNUSDVRUCb8hC68e01dBY+viLld5EENg7vA3TJN9S9BGxNvQCeaOzeDoQOX69UKisrZdK9fkiu0hl4CbBxgeEGZxSgnLBBCS5bLMqV4/MglcrlOSJ8hngt4Eil1juCw93fLwHJFIWri2AAgc+bHEduTvjM8WAF2BGsud95cwkYoezOtxEtDBqXzRGKRTjEQg7WMwjCBgXshoBv1HRrCShlZWthFS1QIwtGgFAoXBwDDDDkChcIDo+ZxqPf0h6WQuXCBI/G5Wbh4HJpdPCDDWnVeuhRv+mHmI9vhNWjwwTBZPDoNBx0On491oMhXGAidDsGKCiUKHQqwaSAgCqD/h8FDAYT5ESPv1EBhhwBX39oatkc+ElSQ+o00zOswY6ZaYjJHpAP/oz/GvUOt294dur28kN9QDJH6maxYHrW7wflzCT8TGrGpu843MHhu/d+WTE20go1c3Z1ydCQReCy2WwSzN6p0fXZ77eCfv7ewvjKuTSi0czpSbVOq1Ll41CptDo1qTfj98+HFh48PfowYdbb+9S6SKj77CD3BnzgZ+HX1YbriNHY7jAAYydJ0g5qg8PrDvr6Z6cWHq4+vtNOWoz3vQ6DwWCGx+H1BkA+EZr67cGz7oeCgxaLsb3VjSMQCAZ98xMmsFPwnCuoFJCBgdHfIUbvHneaQlN/jK9xyRWc+bNjrKGh2+k0mUI3H5b+q3v00eO/njy59fhR3P8Rib8BnUXSb2/v3CkAAAAASUVORK5CYII=" ],
    "2": ["[色]", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAC/VBMVEUAAADvxGDuwl3uwV3rvVfrvVXpuFDms0nlskfjrkLirUDuwVzxx2Xxx2XyyGTwxGHvwF3uv03irUHhqz/gqjzdozXyzFv001n01VD12U312Ej11kTyzkfvxEXpuj7gqTvepTbaoDfxx2X23Fj23V3221X12lH100H0zTzepjbdpTXcozPwxmP232P24Gr11UP10T/0yzrntDjcojHaoC7wwmHmfy/hXRnjcSPvtUf24nH12XDojzzeSw3TNQDXXh3oozjhYhXxxD3plyfPMgDSXRPZni3ZOgDgVCDdPADmcSXNRBD12nbsslXjbEDgRwblbRbWOgTJLwDYchr65t/////fPQDhPwDGLADnrmHgZSPsknDvnoDKSQzany3xx2XtpUrkQQDlpmTRTgbZnSvlQgDnQwDx1ZjhdC7ttCrZnSzqRgDSXzD49LPwwnvINgTwuS3zuSjhpSnZnCrdmyTqvFXvxlHtRwDIOQzz3qz59bj48Kb0wjHzvCvzsyTwSQDMMQDsxZX5+Mb24o/0xTTztybXlibmrHz598L47Zn13oL0vy7sriX35n3stmP48q/47qD365T36YrgjCjysCDbnibVmSrntk7xz4vPUSD36pD354X35HjknED0yDbioiTPkSrmtEv15aPQkSnppB/EhivLjSrjrkLhrTPNgRbNghzNgyDNhCPNfhDhnh/yrR7Iiiu/YgDZkRjztCTmnx3DhCu8fSvXnWDv2L/fsYDZkBfzsiLyqhvclyG/fim5eivrvDXbp3DimRy5eCvQjybfqDvGdSDDmYC1dSvLeAuZPwCHMwDJdAmvbSvpszOxVgCPNgClPgDGhSizciupZyyjSwD4XQD/YAD/dCD/pnD99e/lz7/FbAatayz/uY/9+fHsvnGubSymZCzp2c//za//iED/fjD/sID5483OiSOoZyzTk1CoZiymZCz78uP237ioZizPiUDknyvemySlYyzpqCP67NXYnCrnrEfTlirQkyrimR3HgyXimR3imR0r2LPtAAAA/3RSTlMAUIC/z////7+vgDBAn///////348g/////////////58Qj//////////vYNr/////////n+//////////////////////z////////////////////////////////6//////YP//////7////////////49g/////////////////////3D/////////////////////j///////////QL////+A/7///////////////////4D//////////2D/////MED//+//////n////////1D//////////9//////YP////////+//+8g//////+AQP//3/+f36+fz1AxMk5cAAAEYUlEQVRIx2NgGJaAkYmZhZWNjZ2Dk4ubsGoeXj5+AQFWVkFBdnZ2ISFhEVH8ypn5+PjExCUkJSWlpKRlZOWE5OUVFHEqV1QCKhdXVlZRUVFWVQNpUdeQk9fU0sahnlsHpFxXVw8EdFWUgVqk9Q0MjTSNTbBawm1qZm5hqWdlbWNrZy9gpefg6GjmJK3vbGvn4uqmiE29hbuHp6eXgLmnu52Lt4+vu5+tp79zgKd7oF1QMKYORR1f95DQsHAgCPMMdImIjIoOjQHxwoH6g2LjTNA1xPMluEdHhycCQXiYu0tEUpRHtC2E624XkWwcl4IWWfx8su6e4YmpaWlpqeHuQRHpGZ5h4YlAXlqip0tEcGZcFqqjdPgl1BxBKrKzs9PC7SJycvM8QeqB3FT3oPyCwqLiEmT1pQJlUqqC/uGpadnl5dlhQRWVVdVmYYkgXnmiS4RzTW1dXDGyFcysMpKqugkgJfX1aQ0RjU1V1c3m4UAN9eV2EcGGLbWtRcVtCPWirKzSksq6VglhQDVhQRHtTR251Z1d5kBHhTdEBKsbtnS39hS7IbmIrQysobcv0CUooqKxqaOqf8LEST4ZDUEREZOBCaSlu3DK1GkIN01nk5EGOsmqd9KMmREz0zuA6qs7Z82eYzU3P98BlKLmATXMn7YArmEhuwFQg4renNmzOpMW5ebm9lcDLeido6dbJispBbVh/mKEJzjY1aWl1FSAVgB1TKiurp7QOXES0AI9UAqUljYwBGlYsngpkgYDaSlJZRU9kI6JnZ2dE2dNmt1rBUyyqpAUC/T0lCXLEBqWCxnoS0uuWLly1arVayBg9epVq1atBIK1ILCutnX9kg3IGjSAbpq6ESfYVLt5/Zat2+AaOIWcgFZM3bh9B1awc+Ouwt179u7bD9fAJX8AaMWBjQdDsYKdGw+1Ttmz+PARuIaj8kaGBuoGG48dxwqObezZvH7PvhNIaUlLvsXQQP/kxlOnsYBTG88ALdh7+CySBgXNc/M0DIo2nocouXARAiC88xsPAS24dPkKkgZRTc0aoI6TG68CDUy+dh0Gbty8FXp74x2gBesu30XJQArG52rmGR64A3SU63VkcO/+gztLdgN98PARigZRLeMCoI6ijRuvPn5y8+kNsOJnT5+/CJ1xaAtQ/cuHr9AKAW1joI6WefPvbHx9CyVMXxxasn7P3odv3qIXGyZxRQXdNS2ZZzbe2fkCovbdeyBx/9AWoPoPVzBLMpO4uMxaoJZ1d4Bp4SMQHDvkANJ1aAtQ/SNsZSVQR09hbW13d8+mtSfv3Dl58tAnoIb3h17iUM/A8Lm4uKintbAQqKsWSLYe8gVqeHBo35svuMr7I27FxfO/7q7bvHlz3e7d60Eavh3ae1YRT42S8r24eNrU+fOXLFmyZe+hvtD7Pw59JlBnLfj5a/GyZRsubd136dCMdz8O/SaiVhRdsHTptm3b/hz68enQX0Xia9Mjhw4dKiGp/v3XJjo8GxYA+YJAHcrOzm4AAAAASUVORK5CYII="],
    "3": ["[发呆]", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAC91BMVEUAAADuwl7uwl7uwl3rvVfouFDouFDksUbksUbcpDbdpDTksEXxx2Xxx2XvxGDswFvrvFbms0fjrkLhrD/epjfxx2Xxx2XxyV/yzlf101L12U7110n11UPvzUXswkPirDzgqTvbojHxx2Xqx2rz0WL22Vj221b33Fr22lL21kX0y0DovTrepjfdozTxx2X23V323mP232b24Gn10T/yyTvutj3dozPany3Kji3nv16BRha6lEH34W/343X35Hr1zDrvvjS8gSW0eiKbbTVdIwD35n/36If36o3365L1zz2fbBpkKgPZnzHwxWL47p/48KX57Jn354LUpzBxOArUmS3Rly+8fSr487P59rzJiyvZnSzboC7boTDWnzzPlTHs1bPp2tB2PheYc0r5+Mb598L59LfTq0GoZyvevITUoUvmyof////48/B6Syfv67qgdSvdvZj89/PWrGqIWDfXs12whWHSlSvQl0D27eTw5t/hzL+KVC3c0KH48aupfz3cwq7ozafqu1Xfsk7NkDPlxpqHMwCPQBDv4tZnMAyuZCaOSBWWTSDUtJ3YmynepzzKjDewdlHNn3ju47ChUxujVRzUr5DYrnvot0+lZkCnWyDMnVDSlSrGhTjNnmu/gDjy4s3OkSrPqI7Pkyi+eTK3cC2nXim3djfEhSvswTqwbiv24GrSjSbAgSvkilK0dEbuphy9fivyr0DwhWPpgV3Aaje3divhvVnmwEPpox25eSvcojHzhmr4jHDQeUfaglDrolv+wGmzYizFbT7alSKxcCv0kl38kXX+lnf+nnX9pm//sW703Xy8dhv8wWHzoS+5eSv0yjj3u033rFzfrDOraizpsC70xjT200H5rlPzsiPyrR7yqxuzciuraSzx13n1wDDzuirztybwryL1yDbzvSzFgiOtbCynUQW2ahH0wzLzvy7XoSvenCOmYyy9eRrhniGlYyzjpijxtSf75VPZnSv/71rpyEWubSv83UmoZiyvbiypZyy9fivr3LrbAAAA/XRSTlMAMHCfv8//vZ9wMCCA1f//////348Q//////////////+fcPv////////////vr///////////tRD////////////P////////////z7///////////////////4D/////////////////////////////////QP/////////////v////////////////SP//////////gP///4D/////v///////////////7////7///////////69g////////////cP////////////8w/////+f//////////4D///////////////////8w//9g////3///QP+fvyCAU51t7gAABKtJREFUSMdjYBiWgJGJmYWVjY2VnYOTi7Bqbh5ePj5+AQE2NjZBQSEhYRFuvMpFmcXExMQlJCWlpKWlZWTlBOUVFBTxaFFSFhNTUVVTV1dXU9MA6tGU0dJW0NHlxGW8Hki5voGhkZGRoYE+SIumjLGJqY6ZuQVW9byWVtb6hja2dkBga2NkoA7RYe+g4+hkgU29mLOLi7Wtq5u7h7u7m6utjaG+GkiHp4OXi7cPpg5fMX5Hb6AODz9/f3+/APdAO6AOkB1BwS4u3o4+6Op5xPhDQsOAOpzDIyIiwv39PIA6gK6S9XJxcbGKjIqOQQt+Mb7Y0Lj4hEQXl6Tk5OSUVP8Ad1dbI/00kPHpGZmhUVGokejLJxQal5WdnZPr4pKbB9QR7u/hZqeSDzK+oDA7Pi4kyhwlNfCzxcUVZQNBTjFEB8iKEpDxpYUgYZAVZUgamPlj48orsiurKrMLq4E6apIjagPc61xcEuuzwaABzYrGpubmluyq1ta2hOx2K5eOmuRUoIbO4K727Pru7p7s7MK4uN5eRND2scX2lxdmT2htbZ2QnT2xq2sSMJwCSiZPmZqd0wYUrMzOntYc0tsH1zCdrb8/Izt7BkRD+8wpGam1fh6zJk/OAdna2lqVnd3SHNc7G66BnW3OnJbs7HqIXPaUyXNrgX6eN3lyNtiGtpzs7Pn9zSELEBoE58xpAKpMWAi0PLti8uQivwAPN7AN2QkzZoAMmd/fvwhZw7zF07JhYOHkyVlA9YElkycvhAvGz5mzKBKhQShuyRJoAGa3L528DJT67Gw6Jy9th2mYO2dO5HIkDStWdnZOrABF3MKlkycrBwYCE/iqpsmTl/aAlRdOW7x4deQaJA0maztnzpy5bsK6yUBQAswPoAyhnwbkLJ07derEZUuWLF6/fANcg4j8xk2bt0yGgK3bbIBglaGBpbrG9iVAgSkzZ3Z2btm8I2wnXMMuBaFNu/ds2gsE+/arGAKBgYG+zXJgbjiwf+/ByZMPHtq3e9PhsCOIxK0gb3p0z55jx0+cPHVAXR8E1NVOn9kuLX321KmTJ44f27Nn97nlW88j0pKPjsOFi5dOnjx1VlJDQw0ENDSUz1yW1gTqAGs4em7H1itIiY9T5+o1e8/rMprA4kgKCpTPBGnKyBhrXbxxY+PNW7dX37mLpMFC18wBrAOsBQICiu7JXPe0v3Dt/oOHj27vuHMFpRyIMbt8/9oFT2OQFjDQ1paxuW7saf/42v0nD4EWPH12FzVT+5hdBeqwB2sBgqfPn78wARr/+CVE/eGVV9AKGi7d6KuvXoK0eBobG79+DgSLLjy+9vLVA5D6NyvT36KXM7uio68+uf/y2uML9vb2i0Aa3tkDjQerf38n/QNm0QfS8eDJq5cvr127BrHBHqT8EdA9z7CpB+qIivr46QFQz6v7mi+Afvj8+CHI+PVPcahnYCj7AtLy8OGDB4+/fvv2+fPNm7durV9959mV77jqBwuR3t6oj49u3rx5/8eP60DTd6zeujL9pwW+GkuxFwTev3nz5vDhyLCtd579fEugkrPgXLAoMjJy+fIwoPJfR34TVY+eL/sDBN/PM4wCCAAAqSE4p5hmtP0AAAAASUVORK5CYII="],
    "4": ["[得意]", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAC8VBMVEUAAADdpTjntk3pulLsvVjuwV3puVHntUzksUfhrD/irUHfqDrksUfxx2Xxx2Tuwl/tv1nmtErksEXirUHhrD/gqj3xx2Xxx2Xxy2Dz0Fzz0VP12FH12Ez12Er110f11kbwykHvxD/puj3gqjzgqz3xx2Xxx2X12Ff221j23Fr221X12lP12U/11kX11UP0zjzepTfxx2X23V323mL232b24Gj10kD0yjnntjXcozPxx2X24Wz243L35Hb35Xv24m/1zDr0wjLgqDPcojHboTDBgy336Ib36Yz36o/35oH20T/krDDboTD354T47Zv476P48aj11EH0yDf0wTDany7any7IskfEqVCKfz98c0CLhFG6s3jp46X59r359Lb365Ln02eajEBzYSA9NRJcThingh/EhyrZnSyIcDlMPhUPDgoAAABeWFLp6br5+MXo3IhcVCoeGQhfRBNXPxIAAAAAAAAxLy59e3qPioh7dXM+OTfKyqHKw4ZvaWhTT00VExIAAACmpaTz8vDPzMuYk5GAeXhmXlwvLyV9fGN8el2wrazW09J1bm1IQ0IAAACGgYAHBga+urm3ficQDAacmJYqJyahnJqRaxbbninXmyqskT1qZWMhHx66t4jzsiLioyfYnCzgqz5oWCGcmnf48q3zuyrztCTuqB3VmSrp5Kh8d1HyrB3Vmi4uKxjNoy3QkinKjCr11kSolTVdWTvo2HrWtDXYlSNNRyW5r2u4oDP0xzbzuCjyqxz0xTPzvy7BgivzvSzztibyryDyqhu9fivyrh7rpR72zzzgmyC7fCitbCvfqDqjWxDmwD3QjSS4eCqsaiztuTSOPQSHMwDpzEmxcSzjrDWaTgq0eiL+6la0cyutbCz1xjWeVhH441SvbiyubCy9hCT510SnZSyjXBH73UqpaCymZSzqsSzw2E/moSCpaCz85FD/71rmqinZniylYyzkpienZSypaCy2divTlyrRlCqwbyy+fiu/gSu4eCvVjDZLAAAA+3RSTlMAIGiPv8//37+vgEAQcP///////++fgO////////////////+/UN//////////////j//////////Pn////////////98w////////7///////////z//3////////////////////j///////////////UGC//////////////zD/////////////////r////7/v////////////////YFD///////+f////v///////////////////////////////3///////j+//////UP/////v//////+f/////yD//5///+8Q/////////+9w/7/PYHDP30CAgMEW1eYAAAR8SURBVEjHY2AYloCRiZmFlY2NnYOTi5uwah5eVj5+AQE2NjZBQSEhYRFRRvzKxcT5+CQkpaRlZGXl5BUUlYSVlVXwaFFV4+OTVNfQ1NTU0NLWkZXT1dNXUjYw4MKl3hBourqRsYmpqamJsZGGtoysvJ6ZuYWBgSUPVvVWQOM1ja1tbO3s7GztTY2NtHRAOhwcnZxdXLGrVzcytbFzc/fwcHfztLU3gejwMnf0dvbhweYeoHpbXw8//wB/fz8PXzuwDjndQP2gYO+QUHQdqnx80mHhEZFR0TGxsbFxAX7xvnYJiUnJIJCSlJoWko4WnuEZmVnZEJCTm5cH1JFfkI0ECouKkdWXlGZnl5VXVFaBJbOqgTpqsrLLamvr6hF6Shvg6oHKsxqbmlta2yDy7R0dnVlZXU3dFT29SLb0ISzIzu5vauqq6MmZgJDuamqa2F9bBecXTUJy0uTsKV1T+ivbpiLUT+2aOK2/JwfupOkzZiLSCM+s7NmtlbU5c2CyHbFz5/T3A0UQ6ufNn7kArmEh26IJZWVzEO5ZHLcka2pvFUIkc+my5TNXwDVwCSqkIIdh1sol/qtQAtVi6bLVM9fANTALKuguQpJfFeDvl78WyYB1jkAN6zfANXAIKmyU21QIk9/s5+cX774FriN5a1Dw0nmrtyFpEFLQk5PRnlWQDDRt+474eFDqs7NJ3A40Izllp5n+ruDd8/ZsS4NrUBFWDNSV1dEyMrG3tfP0dXPz9bSztbE2AeUJYC7yMt+7D6hh/X6Ep4UVvUBWaBiZQLIDULm9qYmRJijbbQQmV8cDBw8dTjsC18CkrKQfqAvWYWxqbW9vY29vDcxAmlrgbOrlsCt46bKjx/Yjoppb2cLcS09eFqzD2AQEjEF5VEdGTn5j4HGIi06cPIVIGqeVd+mbbQTqkNbS0DQCAXAxAFK/7sxZoAVAF507fwGhgdPgYtDxwI3ycrI60tpaIKANVA4saTYqXLp8xQFowerl568iJb6FBtf2mh8P1NOVk5WV0QEDUMmkuzHw+uUbN/ctXXbo8LZbt5FzkIvBxTvmx830NurKAfWAgBxQuZ7C9ct37zkcODhvz/Lz9x8ga1jo7LTvjrm+VyBQi668nJy8LlD52YeXgOofHdg97+jhc/cfo2bqNc7ewXuDHI57BQbq6ek9fPLkyZnrly9ffnjv6YHdy44ePnH/2XO0ItvH+cU+xztBDvrHvbzMTl4GgbsPX970Aqo/tOfVrdcX0Msl7pCQFweCgVrMzR0c3ry9cvbl27c3HwEDdN5RkPpTmCXfgpCQd0sP7HPcu/fOrl3HvY4fP35n39Ldy4DuP3Hr9WNsZeuC9yHzD+4G6gkGgX0HDizdfXDeodVA/2JXz8Dg6jJjxrtlB3fvXgoEu3cfXAZSvu38/dcfcNYn6TNnzvh4aN68ZcvmzZt36OjqY9tO3n/9yRVf/bZiJhDMmP/q2KtX286lnb91//MXQlXi12/rN2zYkLZ//8nzt76fciWqHv3x5efPn79+/XjAMArAAAALxRdg7E3pLAAAAABJRU5ErkJggg=="],
    "5": ["[流泪]", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAACdlBMVEUAAABdIwBdIwBdIwBdIwBdIwBdIwBdIwBdIwBdIwDwxWLuwl7tv1rrvVfqu1PmtUvls0jntk3ksEXdpDXxx2Xxx2TwxGDtv1ntwU3ksEXirUDdqD/DjC+DThfFnk7xyGXzz1v12VD12U312Er110b11kTxzEXuwz7puDuodyNnLgZdIwDcp0LAkENvNgmaZh7jxE723V723Fr221b12lPiwUCDTA3cojLcojLVmzjxx2W+jDathDPs1WP24Wz24Gn232R6RhTWqjDepTTaoC7xx2Xxx2XyyWL35Xz35Hf24nHQrkT11UL10D70yzn0wjLboS/boTD23mH354Lk0HuXbjn465T36pD36YqPXR/0yDft3IDRvHnf0pj48KX47Zn354XjymLQsU3PqjbPpC7NmyvQkibZnSv48qz47p/eoir59bjrsizuwl7z0E5+7NVj//+20q/Sw5Xm3a35+Mb598H487LPuli1xX6I9dDzuyropSLqvFXvxleI+N7U+tTS6pbzsyL10kD0zDv0xjTzvi3ztibany70wC/yrR7Xmyr0zjzzuSjysCHVmCnioCLPkiqI+NrT9sXR6I/IiyvT8rXjr0PR54jLiiiI9tXS7aLit1PGiSu/gCu+aQnfqDvR5YHFhSmHMwCH8s3yqhvcmSK+fiu5eSvcojK/hyvR4nm5eSqraivjrjq1dCvepzmxcCzkrTPR33KH78uzcyuraSyjXBKsayytayzQ12qH68enZSyubSynZSzQ0GN/6c7PyFx228p02cpj///KwVto8++4sl+km2Crt3HNkCqbmmhj//9j//9j//9j///ChCu7fCtj//933/QuAAAA0nRSTlMAEHAgv9Vg/++AQIC/v///v6+AMJ/v///////6j///////////////////MBC/////////////73Agz////////////6ow7//////////////P////////////////////////////////////3///////////////////UP////////////+I///f//////9Q////gP+/////////gP///////////2Bg////MP/vz5//////QP/P////t//v//r///+//8///7/f30CA359AQGBPrX63AAAD7klEQVRIx9XW/UMTdRgAcDL1hGpTNN5Mx3E7RCLrtikiuM1meTvuNoSCeeRWIhyImZVgskq33eYWDDQqV1IIbiRCLyoW5ksWvTsV/6Oeexm74a1+reenPd89n3ue723f23Jy/p/xiPrykizrjy5dprq+HFmRK77Ie+zxJzQarXblqvzVwnVWIMgSNZCLIMiy5XlrniwoKCzUFBVptcXFJWufWgrLudlaw3vr1utKS1G0rAzT4+UbKjZWwlWezra3qmc2AXn2OYIwGIwmFNNv3iLk1Vuz1Nds0+lq4YpI3XazxUoYTXWQ7Hi+wmbbWaVW/8KLul0GYnsdiPWknbJY6xGkciPNOJy2ht1VqvWlxkazvemll3c0t7ia7JR1z7rNGE4zrKqo2ibWk62vQOx1e1peJV/bV1/f1ta2f397B9ewczFYo9uDpGNvZ1dLa2U633SAW7TzvIJdGaC706MEWw5y1TUZ4PWCQ2j9vjcOC/HmW28f6el1N7cefUfMj8Eu+rxcxlDvFr6HmQjz+2LB8SMQ3W6PizwhA4ezz8dxyharCg9hxkYqC/AH+GDIy51U3CKNRl9mtCoAjJQBwqEI94FiIk0RAEWHnu7OruY06GfDA9EDg+mZ8rXlAkjtoaenu1f4JOwZYGjwVHoL2nIcNm05LRZ82Nvb6YYGTfZhJfB2fLQAVmr9OIYarBL42O3u8kA9SQ2n95AJPilmcJiJkIGnWfgykZT5TOq2wl2KemNK0E/rMZPhU7HgM5fLdTZ2ljJbF4AzGIp4Rz5PgxLWDy1MMiBJcu0Xo2YrcU4C/fBJ+yJDY2mQX7KBgRaoBE5QFFU7XmslDBI474At+OKJiS8XwIXRigC0wCQwbLFYascn4chdlAALE0XjHVPT6cM5+hXL0Lj+mFhwhmgkJscn4VTLgA/DRPGJrxXfpW9GnQ4QEjhnNBoBoGWYDMQGialvFWCr7RIfYGgJXERRFACG6S+L+ZXgADQYm7mqPKDVtiAbYGSAYVj7d+16HJdBn9Bg5vuMA3TSdsnJO86LBZf1EDiO07QMQtFIfGr2auYZ3d1wMMzLgBaKab+fuSbmP8BAsdnrix4CqxtAXJGAH4Jh+gMOGUTiHTduPvScuQBCAtcCEA4Hy/K3JBBP3Lg5/fCTDMSPEuB5lud5pzMsg9isWj0ITgK3wkIEg30Dt8X8pyz1sA8J3B4QIxTySeDn6zXZnvdzYsEvUR9ENBqJHBXzX7P/+Engt8HBxFAikYiN/S7mc/8G/vgzNjIyNjExNfPXP4M7ybtiwb1kzv378/Pz08l7Yn43eUcdJA+nQl5YyJPq4MFcKlITpuLBf/t/x98/vfwMU2RJ3AAAAABJRU5ErkJggg=="],
    "6": ["[害羞]", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAACylBMVEUAAADuwl7wxWHvw1/nt07qu1TpulLot0/mtUzhrD/gqjzfpznxxmPxx2Xxx2Xxx2TvxF7twFrrvFXmtErksEXjrT7hrD/cozPdpDbxx2XyymHy0Vb11U/22Ez12Er110j110b11UPyzUXrxUXmtELhrD7fqDrxx2Xwzl7211f221j23Fv22VX22lL22U711kTwzT/mvDvdpTfhqj323V723mL232b24Gn232T10D70yjnntzbdpDXboC/Tly7xx2X34m7343T35Hj35Xz0zDrwvzPgpzHboTD354X36Yv365H0wTDboC/wxWL47Zv476L48Kf47Jb10kD0zjz1xjXzvy7487L59br59rz487P0xDLzvCzWmiv221X35oH59Lj5+Mb598HztyjanivcojP11kbzuiroqyjy4pDgv2nx23bztSXYnCr2y1CZQwOfTAfw2Gnw57S5fT348au6eiyxayDBgR3CehzYnCrqu1WtYRblyGrMpGuhTg3n1qHIl1PWoSynVAyzahXzsiLtw0+8eCCvbSuwZhHioybZnS3wyUnqpyHWmSnmtUzssULNfSfPjiirZCbalzTBgSnMkSPvqR3Qkyr4wEz5rET7nT+yVxHsizT6pEL5t0jm0IzCjEL4u0r6p0P7mD3mpD32yTbyrR3TkyfLjivjr0P10Er5sUb8hDb9fDP7jzrOiSfUrWP4xE37lDzjcinJVhf8gTWrXw7yqxvGiCv8iDf+cC+fRQb+aSzkZCT+bi76oUD9eDH3zlH30lL1ZSjyryDxyDv5s0e7fCvvwjr3x077jjrpoh77kjvbliG5eSu3dyq5eivepjiraSznsDKzciupZyzdpDWoZyzHhiDJjCfqsSy6dRipZyymZCylZCz70Tv31EH/3kSlYyzZnSv1wjClYyymZSzenSSpZyzTliqvbiysayzFhivBgiu1dStmb0TfAAAA7nRSTlMAMHCfv8///8+fcDAggN//////////35cgEP/////////////////v/////////////++A////////////vxDP/////////8///////7f//////////////////4//////////QP////////////////////////+v7////////////////////2D///+v//////////+//////////////////////++////////////////////////////////////////H////////gP9Az+///5TvIP//////QID///+A7/9Qr/+/cM+AUIBgU6GzkgAABOFJREFUSMftlfs/m1ccx7syRteFYjXXpMWQJ8KESKjlRiOxJB5JVTKkCbEtcbKidNZO1aRsVjZt0coWhk2ZMUS6zK3aTVOXKaOjM1s3u3X/w07EKy413c997fNDnjzn+bzP93vO63y/Z9eux1JP7LaxfdLO/ilbB8c9j3Y/vfcZjJOz8z47excXV1e3Z/e772h/zgaDwXh4enl5+/hicQcO+vn7BzjsgOx+HoMJDArG4/HBCCHEB0vEhYYFBLwQvsP0gcGkiEgymRwVQQomePsScRRqdEzModht/S9iMEH4KBqdwWQy6DRyBB4JMROsuPiYw7Hb+j0QEpnOZCdwOAlsJp0WRbIQVG584jbES6t+BpvD4wv4/KQENoMWtRoDTRaKILHVvxfjQcBH0tlJgiMpR1NSBTwOJCLwBB8sTEosiU98ecv2YzBeaRG0dI4gQwp1LEPAS0ink0lplhBcWaI8c3NCTp4heDIjgXdEuqpjqfyktRBZcBViRbb80KbT4Ozkc9CTxuTwUyyANEPwyquv0SPxiDeWiLKEIqVctTGEjXNOGFC/DjM6KpUez82VSlPy8sGJtZwKQKFIlq06uQF4Y19WGABFb3IEKcdPnQbgLWlGXjEAJwIhcKYEgLNcRalctb61mXZvY73LAACa4lxoB6fgGgQ887+is2r4ey4OAuWqCisQbv8ONsz8xaJiuEt5/FxgHQmjQuDdyvWdfc/+QKgalJ2vUoOSwmrwfkZqHr8YqP3OV4HTVR/UgAtm4GLlJStg64KGgbLauvrL4EqDtgR8KODzPirx0zVeAZebGj8GJc0QaGn9xAp86oIS23KuNrWXgI7PGjvB57wkTgK+q677C9DT211X1CeEgL61fx1wpeCQ2gbDNfClsbdJ628+fYwgXX37V6BnoH1Q1/YwkIxDdIPtxp4e41D31WE2O51JG9E2dVzvuW7sqNe2CUWyUX1/zTrgdgNFagcNA0ajsaPp5jCTwaCTR7T1vfDd2FuvaxNLlBD42go4+H9DQcbqujuuDQwZBnVBNBqNHIXUNt4aGhiAi+pq4yqULaaadcAxIJrlPaJr6DYYbtXfHCNFRppLdFg7eNtguD2oHaaKZKX68fwJK+Ae4NZMQYZ1dQ0NjdoxhEQiwTaQhuRo4UCdLscLBhjVd05OrZ+lbwPiqCgyMlZb2zWMpEEhBEJIyOrA2IiXGAZoMU1Obzh8jjF3hCw0BIGCRrO8YWfyJZjf28Qic4DWmdkNQOx3MXFCFgXFEYlYX18fH2jGYolEHEpJpgq5EmWp3jSpmdtYQeEx8VwhNZmCgwgxC4vNgg8c9LPMfpiQfl4zu7moDyfegQSLQkGj74bizEIL1GeozWKLf1wzvaXR7ElM/F4khkjyOdAXjaKUGwsAzAth/rLSUb1Js3hva5+pgISEKxY2F8ICWJgvgMXQF8eVKJRwftPM4g8Ptz5IZCskIu7ShbWyWfhRqJCZ/eMzi7PbNdcKubxcppAIl1nzfUC9EL28BO2j+oudmsWftm/fmT/L5dlK2f1li5qhHU4/qZn+5d/uh9j9KpW8fFR5f2lpqVkJ3abqfM3ir3M7XEGZJ1WqysqV8hWTaWW8umZyRvPbvUdccu6/X6quvtvfX1OTPznzx59z/+kenfrrwYOJib+ndv0vi/4Bq6//QRictYIAAAAASUVORK5CYII="],
    "7": ["[闭嘴]", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAACwVBMVEUAAACBRSBaJBNaJBNaJBNaJBNaJBNaJBNaJBNaJBNaJBNaJBPqu1XntUzTq0BaJBOqbi/uwl7twFvsvlbqu1TpuFDmtErksEWIUyReJxPxx2Xxx2XLnlDwxGDuxlTuyEvqvkjNlji0dSrNjivRlC6ITxytaSa8dhvAex+8dhvEgiP22lP12U/12Ev110bkwT6FSBaqZxqZWRi8dhvZqTv23V/23Fv221bnyEjAfB7EhzjZsn/eu43VqXHXojXAfyn79vH////gsk324W/24Wz24Gj23mPw1Vn17ePJkEbani7frEzy5dTu1nT35X3343bbrD3RoWLRmivaoDDxx2XTpD/36Yz36IfmzKrJhyTaoC/twVzxx2XAfSP476D365PNmFTcpDTxx2X48q/p0H/qrCbZni3sv1nu2pDzvCvhpi7ZnSvXmyruwl7q5OKtkonBraf5+MX59LW3n5jzvi3ztybYnCv18fBkMiJ5TT/59rv48KeihHrUlCbzwC7kqyrrvVfyzknRmzDWyMSkcUPTpVODW07otTT0wTDzuinzsSGkYhnx6LHiw5tzORXNiyT0yTj0wzLztCThnyNvPzGXVxjbt3H47JjlxWquf1K2cRv0zDvntk7Ts1/59sDt02fyz0L10D7yrR3XmSfRlCrksEX11kXqylvl0pH354L35Hrty0L11UPQkSj10kD243P110j11EHJjSz0zjz0xjXyqxvDhSv35HfdxmDu23bZvkzgqjvuwjrawVXIrUXLr0Xu2Wzkx0W7eircozPRtkjLslHtz0brpB318NzdzIvSvGj8+vPk1qK0dCvqz1GwbyzepjjdpDTZtT6wbyzq4LmqaCzcozSsaiynZSzwuy/Zx3+tbCzgujvany2nZSynZSzTozTusymlYyy4gjKmZCzUoDHIrUXIrUXIqEHIrUXIrUVIRT+AAAAA63RSTlMAIIBVEP/vMECfj69AQBDXys/////////vx4Df/////////++fUDCf7////////////9+A/////////////0D//////////////2tg/////////58w////////IO//////UL/////vYP////+f3///////////IP///////////8////////////////////////////////////+P/////////8+///////////////////////////////////////+F////////////j/9Qn///3/+Av+8Q/////8/v/zD/UP+vv5/v/89YDG8bpgAABIlJREFUSMfNlv1fU1UYwBG8EAWTQDArIKjIw3anFdscTrbr2MTCaRZMZhsamsIqg0YZC8mKBprxYkW5TEd1FRiDyUsleJYg8toLhGUNiLJ46a/onHvnXoBpffql55fds8/3e57nOffsnAUE/L9jWWBg0PJ/wQcSKIJDfL4Luc0/H0oE3x50B2OEhYWFh4dzAoJWoBkC/fAh7OShRMSdkVEro6NjYlbdRRArVhNE6NLC8kDEc+6+597Y2Mi4eBT3JRBE4v0PPBhM+C0r6aE1IDkhjsvl8ngkyV+77mGA4pHV/oRHARspAoFAKOKuF4PUDZKNAKxJ88dLJTJKJgFgkzxdodwsBhspFBlbQPJjS/GPA5CJASoTgK2qbfLt4AlmSMmkYMeTi/mnEoCEBSgJyMpWq8QgwzXeCXI0i3LseloMZC5ABrS63K1gN+UeizWaPQuEZyI9ALUb5On2uhNSVCrYp3mW48Pvj93kIxzI8xXyC/TP+QjPx8azwgsHX8RCYdFetueX0FgGkg3Fev3L3gki40imh1cOEcSrqIfCEqMWj19D2/HgTlB6uLjMJ8XrUUfIN3ANb+IN+xYoLyzJKwcbKOptNDyUCkwVlUf1ek8Xu1ZG8cl4IM1khWPgncIi4wEtOM4I74Kq6pr82hN6z9Luj47nk6IUID2e8R5BvA8+QAmMdR8CsOUjglh3MseMhX1eNX0cfQQJgiy0jxKPnQSnPikpMupy1aeTma2144wFC/WffuYWPo85Q5NcgeJsghZoy88V5eUZdXXZDY3ysykp25toq0to9hJsNMkTKuWN6tw6ndFo1CFerWpJVwq5ZCttdwnnPcIqC93KEwkULSp1dm4dilzEb5MrBCIeyaftbdUVlQsFK5/kCpXpLaoGdTYKdQPmUQJeK221mdvRsnaUdnoJZjtOgY0vVKovv1KpGlswf2E9W1G7ofhoR7PUI3R14xTYUKTLL0LH1y34JyS8AOElmra1oRaQ0NnjFnq7utvsNGMIlBchhI7TCqVAeBn2QccVuwVXVFvfL41wC3u6TNUWK91K8rho1r6BQejYLBRdhkPDI9DRhBLgik70fOMWOF1d7WYbY2CeopDxLeaZp24mQUdO4neezff9qKm6DRn8KxCO4F09iOrCPDUA4VgFTtCf+IPXbk0bHa1hDPoShOMsN8jwfXCsxoATVCVe9f4B/ThqQobFbmUNxA1SN/jDlbU4wU/XAnxT/FxTbbbY7FZk/OLixxkeLWl9h9R51fcQ6NUUGGrakWKxNTlcjYxDOIHmx3yOM2LhOTOpKcivwIp5LdsG5uGEgeFLnVPLFgocZFQakDLh4kdQ3xCaahFf5fw1afHRNz2pL/it0jAG+8bZhUWfKElZR3+yc+r3pQ5XzqReXzbGvDjmRQywZWl6nFNJfs77Xn0Wyw3jFzfoauT6H9f8XnPTfzLc8BB0lDkYY7gPztz0Jk2bhecQP9fcfH4OGehx5hZ37/QsPAXnOjulPddn4dAQnL/lbf0XhPPsGceZdz/e3Ji5AXHm/wnvs9Kc//5/5G85Ljhvu1+W2gAAAABJRU5ErkJggg=="],
    "8": ["[睡]", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAACu1BMVEUAAADuwl7wxWHtwFvrvVjrvVbpuVDntUvls0nksEXcpDbepTecRgSZQwOZQwOfSgbxx2Txx2Xxx2XwxmLvxF7rwlvlsUbjrkLhrD/CfiGnVw6ZQwOZQwOZQwPvw17xx2XyymHyzlTz1lH12U712Ez110n110b11kTxz0btxEPouUHhqj3epznIiSjtv1nz0F3111j23Fj23Fr221b12lL12U/12Er21UP10T/vwTnWoTamVAmfTAnxx2Xxx2X23V723mL232f24Gr232X11kbYqDG/eR+9dx2ZQwOZQwPxx2X23Fz24W3243P35Hr35X3343X24nDCgB322lT23V/36Ib36o/254z35oH35HfHjSXHhh26chrani7wxWL47Zv476L48Kf47Zn11EL1zjz0yTf0wTDiqi/aoC7ZnSv465P487D59bv598DJm1uwbiuxayHZrkb100D1zDr0xjTzvy7ZnSv59Lb5+Ma3ezzXrU/zuSjcojDanizZnizVsXCoXRbr1Hn1yjn0xDLzvSzssSr11kvz7bq9h0y9gjnztyfgpCnYnCrcojLn1qGqaCv1xzbrrSbqu1XhypPgxYDgwnH10D3zuyrzsyPcnybhqz7tw0/ztSTnpCHwyEm3dyrx23Xt4azOoFDXr1jvyz/0vCvvqB3VmCrmtUz47p3y6KjyrB3WmSjPkirDhSrft0vSoDDNkCny45TKiyrw01jyqhvUkybw1WHfu1XlxmXzsiLyrx+9fSrhqz66eivmtTjjniCwbyvaoTLepjflrzfSjiOtayzdpDW0cyvamCHdpDW0dCupaCznsC++aQmraiznuDLmoB6mZCzaoC+3YgijTgXOix2mZCyHMwD63UrCcQ6PPwbZnSv851T/7VilYyzlpybvryOnZSylYyytayzTlirRlCrFhyu9fSuM0t74AAAA6XRSTlMAMICvv////8+/gFCa/+9oII/v///////v7++/zzCf/////////////////78QeP//////////////////EK///////////8+AUM////////////////////////8wv//////////////f////////////////v/////////9g//////////////////9w/////+//////////QP///////////////7ev/////+////////////////////+fz///pCD///9g3///70C///8g//9wYP///5//////7///gP//zzDfj89wgGGmaWcAAAS/SURBVEjH7ZX7W5NlGMenBST6WilIZjlgh5ciym3vDshq7EAnNgbswMAMxg7MAU32bgJuKGyjEodg5jZsRmViNVoSYgYrQTxAFHYysdJOdvgzut+NxkGofu7q+8uuXft+9nzv57nv5yGR/pNasfK22xMSE5PuWJW8mrQGiWntncu477p73fqU1AQCSNqQlnbPxns3bVqLIPfdv4x9M5lMTs/IzKRQaXQ064EHs7OzH4JF1uQs7X94HZn8yBYGk8lksDA2h4Zyeblb8xD+MnEefQzsDEG+UCQSifMFDIxCk6AFfIT/+BNPPrWU/2kyeUuhWCorksuLiktE+YUsNqd0tmZkSX+6QikqlqvUanWZSlMuFQtYBRWgbdtKn9m4/RbgWfALROUqdWWVVltVrVYVlQBBoaE6vcFYY9qxuOyV5HSMKSxWmbW1dfV1z1ksO0ENTIxKR624zV5j2rVoP9eTM1n5JRqztrEJ1EzE5u8WKVns2BIOZ8uehYFSMthMYbmqsrYpqr18pLUNQjExDp3Lc7k97S0LQq1ITXkeE0jl6qo6wv7Ci7CAZZ9cJhQoqLRopo793s55wOaEDI4imogADnTFtlJT/FembqPjoHfHPOClBAl1roQDh0AvH26LAz6D0R/o8c5t7ZHEV+hRQF1VWx+tob5RW62OARwJ12dw+4NHvclzPZT4KgANva+VVWsb65sOvV7fWFtlfuOYLAa86XO5jwf7vCfiwFtJWRKqgo/sVJnf1r7TjFjAX30YQVKFAhY7qxUxGdyeYKj/3TiwKsmKcrAwgvS2le1tRZBmOGpzG7Tde0zFST6C9BtghVD/wBywgYfS2IzW2Ubb934ltIZmN3F4xPdSODk/AIPzAB+XTlWcChM/tx4zm4nuK5I1RO15BVbYVn9g6HR4DkjT61AOm6X84MyZDzUqkEZeLpOKT22tqCiAKYKDcwwvBAxWlE7FGEqhVFZcBCqXlYjESoaCzYHmg131dIwMDUbiwEfZuT4dSqMAIRZKS0BSkRBmThEbUxwSBUf6wh/Hgc7ssziPKwGCVajMF4uFYnG+shD8VBhSq89FJAqNRsbiwLnx8wY9hKJRMQWDWSgQCApnrwEJqiMWIBJd6L0410uXxnNdEAoICoYpWCAFxqbG/HqD2+4IhIYiE/P6u3P8vA0HAhAOlcIGUcBOR6N+G1HB0OTE2Lxuzflk3A6ElUsgNA6HQ6MRdq6Vp3fZINBwqC9imZo/ccnOGqPNpefpAEEldLoEPrg6qw+H//cQgS5YPl041JecnxltBtzHs+q4XC7aMz09afXpY34INGrpurwQ2O50ttvd3QZc7+PxrJ9PgybB7rZH/V9MdH25+F76yuRs9xjdNoMLx/Ge6a+RK9/gbqPH3xEAf2/X1Vuvvk6Tqd3vMQJj666ZvjIzM8C1+x3B4RDx/1eXuoz3tLTs7/B7PHaj8dq3eTPfZXU7goERot6l/STS6u+9LQeDHQ6H33X97MnMGx3DYB+NWLp+WO6xyjnh9fb8+FMgEMSv37h2fCTUNwn2n3/5m/ftyC6vt9/bM3oUNHk63DthuXnxH57Ec7/+NjAwOBgORyK9EzfHpv7NM5oz9fsfhKYuk/5XVH8CHxvjDJ3fy60AAAAASUVORK5CYII="],
    "9": ["[大哭]", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAC7lBMVEUAAADvxGHwxWHtv1nrvVjqu1TpulLotk3mtUzls0nksUfms0nhqz7xxmPxx2Xxx2Xxx2Tuw17svlnlsUfhrT/hrD/gqj3boTHxx2Xxx2XzzGDxzFjxz1T01lD22Ez12En210f01Ufwy0Tqw0Hnt0HgqTvepjbxx2Xxx2T12Fj221f23Fr221X12lL22U/11kX21UP0zDvpvTvfqDjdpDXYnS/23Vz23mL232b24Gn10kD0yjrquDjboTC4llXxx2X24W324nH35Hj35Hr343X24W/uwDXdpDTYnS323V/35X7354X36Yz36o/1zz30wzLirC/boCzany3wxWL365L47Zz476T48Kb47qD47Jj21EH0yTf0wTD465X487P59bv59sD48an0xTPzvSzgoij35oH59Lf598P5+MbztyfZnSvTliv36IjqrijVmSrtwFv59bn1xzX0vy7ZnSv48qzzuyrUlyrqu1XzsiLpuVLrxU/ztCTkpifXojnupx3XminVmSrntUzyqxzNjyrksUbev02jXRe8fSzw2HC6fCCOPQXToS3GiCu+himHMwCcVBbiw2OVRwrUlCTirUHuz0y/jD2pZxnysSLSkCPAgCrFkjHs0WTJmTryryDvwjraqC6wbyucUg2/um/jnR+wbyvayVuLuLKFOw6cUg9ns9ymsJa3dyuycSu0uX5wqsRvk6WxhXngf1nojF7/q3H/sG//tm37zV//vGv+oHX+m3b+lXfCf2qRtslxuN6BsrizciuSq5uz2e693vCyoqn+pXPNhhn40U/w+PyEweNns9zj8fj////Z7PbCcQy/agmXgmOqaCxns9zG4/LPix3Dcg75ylDQ5/RpsdbDqJD7omj5rlX4wU385lLHexN6veDbmCHQtFKQyOZns9zjtTfquDJns9xns9xns9zIokj/71p5orBns9yubSypZiylZCy5eCqmZCyraiylYyzYnCropCDDgyqtayzBgiu4eCuwbyxd5muvAAAA+nRSTlMAMHCfv8///9+/r4AwIIDf///////vjyAQn////////////////59g7////////////////4j/////////zxDP/////////98w////////////76///////////////////////////////0D//98g////WP//z+//QP///3D//6+v//+///////////////////+/////////////////x////5//////////WP////////////////////////////////////+A////////QCD//////9//////////////QP//v1Dv////cP//n/9o/zC////fgIAg/h8+ZgAABKJJREFUSMdjYBiWgJGJmYWVjZ2Dk4ubh7BqXj5+AUEhITY2dnZhYWERUTFxvMolJAUEBKSkZWTl5OQVFJWUVURUVdXwaFHXACrX1NLW1tbS0dWTU9A3MDRSNTYxxWO8lKaZuYWlpaWFuZmWrpy8voGVtY2Jia0dVvX2AgKaZhYOjk7Ozk4urpbm2jp6IB2GbsYm7h5Y1Utpelo6enn7+Pr6eHu5OFiYgXX4WfsHBAZheiRYQErH09LJOyQ0LDwsItLX28kVoiPKLzomIBDDVUwCArraFi7esWFx8QnxcYmhQB0O5tq6QJ9bWSclpwSqoQW/hoCsjrljakhYWnpGRkZ6GlBHqoulpxbUiszArGxUBwnK6GlbOuWExoHUA3XEhcXmOIOtAPsiOTcrD1l9vqCgnK6ng5dvWEEGBBQkhvp4OVqYgd1kWFiUmZJVjKSBWUhGDuyi8HiohvgSiJtA3rbyK4wpzc0qQ9JQLqQI1YBkA4onSiuyshBBW8lWpQ/W4BsRlwBWnxAXHukD02DgF+1fWl2TVQvXwM2mBNLg4OUTmpgG1JGekFYSEZvj5Yisoa6+Aa6hkR2kARxtESVxBQUFcSVhwIhwdrTw1IFraKpHeIKT3UpfXtfMwtErJzYivKSkJDEsNCQHmDpAwQr2A1hDM1xDizBQg15rW3tHqk9IZGhERGhkSE6qE9BFQA1KnV3dQE8DNfQgafAzUJDr7evrn5Ca4xMSEuLrk5Pq7GhpDkxM3RP7+jqBwVrRNAmhYbKIX5S+/JS2vr6+qV6p3kCQ6uXk6GDhqTVlGlBsmltSUeb0phkzkTRYW+kryOnO6urra5vt7AzJEBae2nOAAl3dQC8kZ85t6mmHa1ATmQeyQlkEpKNrjqOjqwMwz3lWgayc2D1/vhvIC3UzF8A11KraGFrpL+yDgmmzLYDKzUC6IaBrUWZF0+L2JXANPMYi0UuXLYfJ902UMdPW6mxbAeMvX7kqt2nG6jWItORuvHblynXrN2zctHnL1m06QKALLDXktm/ZvGPnrt3r9+xdua+ufT9Spqs9sHLlwUMrD+/acQSoQU9Pqf7oJCP5Y9u3bj6yc9fhlQePn1h5YP8SpNR6cuXeU6fPQDUck1c+ew4IAuEazpw+vnfl+QsI9RdB6k9fAmvYekxfCaj+8pVz5wKuwjWcvrbyOooFB0+fPn1w5Y2bt25bRRkcPXfO6I7e3XNn3axv37p1a9XKQ0DZeytRNECEWgutDf383IBm37GyUjx37n6hf1Fy5oOVD0+fPo6i4dHKlQ8PPly5LDkmqTDa2nrGpDuGhtYGjy8/iUkuzayYu2/lvRMrVz5FLgSePV8JDNYXuaXJMf5JSXdeKhQWgqio0szqiqamF69Wrrx+Eq0ke/T6UW1WVk1maXJyUaFhTExMUVFRYSbQ+KamGW/evsNefBcHZWXlVmdmloJBJtB0oPLF79+8/YCrfhBvyMoKrJlbUV1dXVExfe7cprr7M/d/XPAJTxWU/Tmrvr4+JeULENyf9PX9/jffPhCo5DxM85qbm3t6vs5sf7//25ILxFSjdtnfgeDHjzU/GUYBGAAARyYUiHcGbUoAAAAASUVORK5CYII="],
    "10": ["[尴尬]", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAACQ1BMVEUAAADURDDkW0vjVULiSzbiQyriPSHfNBrXLhfeMxnfOyPog33nfHTlbmLnaFDjWkjjTjnXLxXRKhbpk5LpgnTmd23lbGDzfjn5jjT+myz+mSn+liX/lCL/kh72dxbuZBzlShPOJxXEIBLNNCbpmprok5Hoi4fyik/9nTn+oTT+ozf+nzD/kBz/ixb/gwzsXg+9VTO0UTq0UTrpmJfplZTxkV7+pTn+qD3+q0H/hg7/ggnOYCi9Z1O0UTq7RzHpmJfsj3r+r0f+skv5ewvVtabn2dG0UTq0UTr+tU/+uFT9u1f/iRLNi3z////59PLojIj9v179wmL/jRjaaSH6mjH9x2nseRv9yWzjvrXla160UTrFd2Xpjym6aRiaXBuqZx/coEvnsVu9gjbDij3op0uuNijlhB2AQQh4OwZyNwizdi7u5+LoycGqDQulCgr3jB2rhWOYdmxaJBNfJxDPmUmARxa8nYO+pJXMgCq5XEawPy6lCgqlCgqzZBWieFSISA1vPzH2ojvITyylCgrhPCLbzMJnLg3vVg71SgzzPw2lCgqWZjxkMiL/fwj9dgn7bgr5Ygv2UwzxOQ7BraeUUxf+fAj7agr5XgvzRA22EwyvjnX+egn8cgn2TwzxNA6rVQfKbxb3VwzcaAfvLw+mCgr6ZQr4WgviKA2lCgrOJxXVIQ2lCgrddxHshx28Fg2lCgrqLQ/dPA7JHQ2lCgqwEg3AHRHCZA1dIwDCHxLCHA7MKA7hcAlnKAGtDwylCgquEAumCgrvdHgrAAAAwXRSTlMAQICnv////8+/gyCI7////P6fp///////////////////xzBw7////////////////68Q////////////vyDP////////71D/////////v////////////794/////////////8///////////yD/////////////////cP///////6+v///////P/////////////////////////////////+////+/aP+P////UP///58Q7///gP////9ggP9A72QpcQAABDZJREFUSMftlf1fU1UcxzFj+BRyE8Q9gZMi9oi3bGwTrYHYHrg0lktLAUWTQ2uToIF1RLQiN2uDLfaAbAgMNiJFGBhNefrT+p67OTYV7edefX47r9f7fb/f7zn33JuX9x/Mjjd2vpnP4RTs2r1nx+vpvfveKtxfVJSfzykoKKAo6u1XO3sPFJccLCw9xOXy+AJhWflhSiQ6UrE9/867lcXvVYklELGUyxPI5IrqozT9/jZVPjhwrPLDKmWNiqRGKZFy+UK5WnOcrqVPnHwZ/9Gxj6skNSqttg6iVamUYi5fJlfX06caak9/8nJeqdLW6fQGg0GvA4U1jJrjjUxTI/2C8WklPF+lBdxkam42GQw6MKQ8gVn9WS3DMI2nn+tqX3HxGXGNVmcwNVtIQAFDIoUSn9MgNNWeyN3PkpJDUqWqTg/8WRKLhRg1Yp5AzgrMOTqnxBcHS3lsgTRPFJO+TiXh8s0pgaG/zOIrCgsFXAkpkOHPWpoNOpiCL0sL57OFnftL+RdaWlvbLj4TLrW3X74CPUl5wrRQ+1WWUFRkvtqBEOpEl1P814iknQwBghX4b2ibfev9LCq/1oG6rN9293R+l+IdvX09PZ3XiWA8er6JOff9D/hGRtiTX96PbjIN3d3dPQOkH+RoYG7BquO2lCczlsH7RP9I4Z8yws+csgFkZQYB6f7lEinQyzDs4jo5CE19efUdpwvfzQi7OQr0K8NYWQZ6agWb+Y3U6+fCUbs9Q8Nepw/jLaFAQwTmd4A624lAFsQe4QnlCr8nEPSGfKPZghs52L2zdqGLFgtbgbH23UP9pKOxcCAYCY3nCP776BQRmhxIZzKxM0C60ES6o0mnK0eghqbIxjBNN1GbTq+/wi6YQdRxDQr4oQCMEMXTW9tKVUMJR9e9ETRwm1wgOIe+wV4HmoBLCgVmYhHXeBzPZoQ/qMMe931ytiNnlOwdbWNPugUuHDuB1+mKzuE/M8JJERUec9c/eHCVz5VKyUdAfKGlpeVhmmcniM7jR1vv0i5RNRgKo1km4PO4JOQzYzaqNX62oZAvupA1AvQkWgyAoVGDInwogAhlZrlR4R4DnjQ0Hk3gpSxh+XHiTiDs8bsVauNfKxNms1xuNCo0fugnzS/YsD37xv2dfDIcGCLK09WV1adqtULj9o95oP8UDxMs5X4EjiQXgzOgTK2urIDhB9pDHh8D3heFLZpezhUqHs8vxoIz1YQHYyocHgrMDAcnI+zz47bsLUplbXR00RsLDs8EUgE6Bngoza+/+Klc29igIt7JWDCV2KSX4D7g52zPD5AxkiGnMxLxQiIRZxpfSOKsM87J5jS2PXG5QmxcQAMendvA02vb/R+WlzC2JeI+H7AsHU9uYDxrf8UvyA4Kto0mEnPxRGIeaDy7+ZqfnP3GLM7k7rr9X/1HNx+tQ9Y28/7Ps/wDL+fovb/vavkAAAAASUVORK5CYII="],
    "11": ["[发怒]", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAACK1BMVEUAAADkWUfjTjrjTzriQiffNBrgNRreMxrLJRTYLxjoi4fnfHTlbWHkXk7jTTnVLxbULBfRKha2Fg7ojIjogXjmdm3qbkvygT73ijP/myv+lyf+liX/lCH5dRjvZB/lTBHPKBXVLxrpmprplJLoi4f2k0j3mjT+ojf/ojP+njD/kB3/ihP8gxXwXw3KJRDpmJfpmprpl5bvjGH+pjr+qj/+rEP/hxD/fwjCHA7DHxKuEAyISC9dIwCbXTr+r0f+skv/hAy7GA2zGQ5/Sy1yNQb+tU/+uVX/ggn+ewj7bQqGIAaFHAauEAzojIi1Y0zahin9vFn9v179xGX/jhn1ewmFPAaqDQtnKwSIRAr9yWx4OwWZPgOtDwumCgrlc2ivZBrVkDzfqFSuczDLlEjzsFHifBr7aQr3WAu1EwylCgqlCgrla16KVCSkSAT9dwn5YgrdOwymCgrJgS6KTxnDYgmqDQvjV0X1ey2+hz7ZnUnrghn8cAqlCgriTzumZiH6Zgr1Sg1/RRPi2NL////bzMGmgGL28vDMtqLUdRaeYB+ieFTZLg3qkCuNThHs5uGabETidQ3sPA1aJBF0RjiTb2SihHq7nor3Ugz0RQ3yOw6lCgprMQxkMiK6Xgn9cwn4XQvxNw6zkXP1TgzwMw/Dq53zPw3Qv7OrWQzvLw/WLhfgJw7OKBW/axeaTgzNHQ2lCgr5hiHoKw7bOw/FIRPvVwyqDAqlCgqlCgqlCgoGkVu0AAAAuXRSTlMAQIC3///Pv3tAIIj6////758wn/////////////////+3cN///////////////xC////////////PEM/////////v///////////vIL///////////8////////+fMP//////////////QL///////9////9gn///////v+//////////////////////////////////////7///////////////////j/9g////gv///+///3BQr60lVUcAAARMSURBVEjH7ZX/X1NVGMdRISmBFYF24SKYuG/ALPcVOg4mGxtGjW3o3U7QAHN3hxYDgtJmbnOIKGgwvww0N9xEiYSJBfXn9ZyN4I4Q+7lXn9/OXp/3eT7P2TnPzcv7T2rf/gMH8vMLCt46WPj2m93vHCoqLi4pyadEQYHo3fdK97a/X1ZedPjIBwzDVFSyVUerRTU1x/ZAPjxeW3ZCLKGSypgKVl5X3yBSKApfYz/50ce1pyRKpUqlVqtUSomMqZTXabTVCl1j067+T9DpExKlWt9MpVerlFJKtGgbFIYzu8Q6ebwVGZUqfbOpjcrUrN8kzJb2s+jTjn8An9V+jpBVb2rrtNnsNltnm0mvVsoY1qHpOofQ2fM7Ux0qOyXjkNPUZrPbXS6X3W7rNOlVElmlvB4j9IWuuyfX/2V5uVjmRqjXZnf19fcBcqH/K5MeQl3kwO/hvWQgB/i66AgjFXOI63P1ccgHAEL9bc0qMWyCvhls9w+R4ZzbUHyYZSSqEYS4b8FxAQAf4np73Ub4ZRTa9vMGMiYAviv+vlKmVDdTN0KXwO+6jLI69wOcU8DPD5ErAuDHEjkFrmJjaytn7KeAq5/aOaObHmwgyIe6yfbR7is56gBgBIevRSLjYUybtofx9fGJG2E8uQkoBJn252cAJx6PgG7gmwBcwrfoYhw7s5FCU2T7ZI/lVzlYZhqfjmTkwwDcxncyi5/wjBlOiQ/NCpo4WNBSxzJW3Bq9O57xQCYcvncfAkYe4FEtALG5efJQAJjr5BXWR9Fo9Oc7m4CRLq5R4LEl7knE5ha6iQDQahzsNAWiD2gku91Ogej9SOQJnrTEg4nkXMorBCwtUMJJPU8jT/FVuHw36eJeZCKMuzItLKaIEAjQEpOw692JZ2F8Ga53Ly3xbOIWfp5NNL9Ezm8Bv4gaLGYgnhsf+XwYj8D70avdRq71iQ87MwWSi6llwSn9Kqoe1EIodtKJ8W2rCqRUSl6EMcYrXX8XWCXpLaCjRhS3AOFgKxmZDEaA2EqHwMuLM11m8Gc6WDIIL3hjTQMlNA45W1nBMG54SpOs3AEP2hKngaDAmuBvgEyKV574oNasqXPI5S+MiFuBazqjyfiDNFBqSSdIlJfX9JvidyCgSIvmMeLcYuk0ICszg7B/IkYDrRGSMwcKdQq/p50i5lGwSxmpdNoJb82T8S8sQQfp3EfdqHuV8HsCgNRLpWyLpR4QqxP5+ax/lQzvGBulZwxDvD/oaQ/E6y1xUIAiF2PJOepfJjtmAGjM6x2K8Ql/MOjJKOhPVDEvQ7TfpeX1nAe9TUwlYzyfyIrnY8kQbJ+ieUjPbsN1rLvbMBtKJmNUSXBn7WsGQjZ2H9+lw2RdMTuX1eLifMa+uk4e/vG670NTmpB13dQCKAVmCK9bhzhNe3yCOnoIyKtbpfKCm/QMvOEj1zT2J9nSlY2Of/UdLR3YSKfTA6V5/yurvwCRzMY+WzvWUgAAAABJRU5ErkJggg=="],
    "12": ["[调皮]", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAACAVBMVEUAAADirUHxxmLvw1/vwl7vw1/qu1TouE/mtUzjr0PhrD/epTjwxGHtv1rxx2XxyGTtwVvjs0fkr0LhrD/aoDDKjjHxx2Xx0Vb12U712Ev12Ef11kTxzkLswkPgqTvuwV3x0WH23Fn221X22lPqvzvfpjTdpDT23l723mP232b24Gn10T/0yznouTjTmC724m3343T35Xr0wTDWmiz35oD36Yn36o/boC7boDDu1njmyXHt14P476P47p347Zj11EH1zzz0yTboqifLkjO8dhvLlkLx5Kj487P48an0xDPzvCvGiSvDhjfbtIO+fin59bvzuCfLjSvSnjLOmlL79vH////Yr2rxzUzZnCrcojGrYBCdSQTgniLZnizkyKPpxVTYnCrYqUTu3cbWyMTq5OLkwmKjUwvzsiLhqj2LXEFaJBPBrafMkCrmoiCzbRfq1LjztCTVmSriu05jKxTAfR/yqxzVlijDgyiaWRiac17yrx+9fivupR2xbyuxcCvnsDHViRbebxLLPQvMNQjBLgatLwfURQnXVAzsti3SjiS4eCqqaCzFIwXHKgyREQCxEQPRLgSubSzWWDLig2bba0jdPwTlRAP0TADYOwXaYBO0ciuoZizWYUnkjHHddFavbizqo4ypaCy4DQTQSSvZSAfaliK1dSvmgBSnZSypaCy8fisx33D0AAAAq3RSTlMAMGuftc///9+9n3AggN//////748gEP//////////7////////4D/////////EP/////P/////+////////////////////////////////9A/////////9////9g//+//////////0j//////////6f////////////v/7+P////////////////Vf//////6v///////////5//////////////cP8wz4ARtSPbAAAEGElEQVRIx+2V61caRxjGvSRStSlgtS6XEgHJLisK4mXVEG6OiSyKqEFXMTHExLQWLTGiqSXxgtF4QatW66VKTTVN+1f2nUERiTX93NPnHD5wzvPb531n3pnJyPhPKjMr+9r1HNFnuXn5mZ92f37jC7FEIsnJEYmk0oKCLwuLrrR/lS0GFVMUJZPLFcqvC1QqVd4VSNZNsbhETaTRAqNQKEtVKt2tKz5foqYZPcuyeppWaykgygzlOl1uxaX+61AMzRhNlSCTkWXUmgRh1umqMi/3a2jWVF1TU1tbU1NtMurpJMHVfZxxLeGvb6i/bbHcsdbWVAKBq7LZHWYnV5VOZInFlFrPNiJQ0917zXcwwai10HmZwcVzXGHa8oNfw7Bu1NLa2oI8d9uarVAVS4rCEV6Oa08rqJhSsx2o877Pd78LNbXds1hJRDfqIBFOoedCgEQi09IlyAN+IFrQaYS+uNePFGV2B+/tEx6kANmSbpmGlqJWH9FD1NUGXVSb+nv9vcpETU7hUQpwM0cu0zAB9Hhg4AkAj1EnAZ4O+lF3ogn+mSCcz8g3Of1yCgPfDg0NfYeBJtxDw6B/MNhRqlAQYFjITwI3RN2QQAdGhrCe+L5HXc0WK/iJRpQYCDmF50kgV6RUQNOj6AUGBnydqMFivd3SFBiVSoO9/jG7w8WHwuNV54DUhgH9xEuS8BCNWax4kfDOUUr/CEkIjwdTgDKFnFIz/ejli6EfWhFqgNGorjSyNN7q8lLSQ3jcnQZoaP3o2MgIzMZTPH0wsQzsNJ4NvKwXgQI71ESpabYk0NgYqMf2SjyuZ2fChYHgRApggAiZVk3rjabEeYADQfwysg0u3jsZdv+YBPJUpRAhp4BgWKPRaIKfnjn1k4qg54jnVRLIV5XbcQQm4IhiMfSZ32aH2YOK+jyvk0CRasqBI2TU9PT0zGx0bu7Nm7no7Oz8AvyffgsBUNHi0vL5LPWozAZMyLFhJRaLra6urfwUjc4TgAREltZTDl2+bsphKLMpAJFRKxubP6+uzm1t/7Kza4MGXNABBOztp0xrRZ3O7MAZGFn59eDwDEj4SUD8woV2S0cIHKKIHf62CcAOBs784cX4/oUjWtHDTZldDjsgNgAOzgDih4L64utpN2Ymx70FAhB7FIC1tRgAW7un/uG9o+X0e+kBEDxGDABsvnuHge1dHuoh/v2Pr75CjpviebPZNb9xcPh7NApNH894Q1B/36V+kuH08jzvXJjf2Jjd2do+XojA56Hfy/1wtOsEzhnyekMz86Dj45kw2E+W4kfv/+l9qHguCIJz8lko8gcoMhmOnHjiR68+XPEEtT8CROgbxjpZnFjai/+5/IlHrqiwKhgMut0THs/S3vrrD//mGa1of/8XVntRxv8i+ht1dmWalU11TAAAAABJRU5ErkJggg=="],
    "13": ["[龇牙]", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAACEFBMVEUAAAB8PxRdIwBdIwBdIwB+QRVdIwBdIwBdIwBdIwBdIwBdIwBdIwBdIwBdIwBdIwDpuVHsv1rqulLqulPntUzxx2VyOg7QoUftwVvrvFPms0jJljtvNQjfpzjcojLxx2Xxx2Xxx2S5fC7yzFT01EzxzUbrxkXhrDx/SBDepjfcojLYoDXvzWL11Vn221X12k/12Ez12En110X11ELnuT3epzX23Vv23V/24Gb23mL10D7zyzrosjDVmS3wxWH24Wv24nD343X35HjvvjXboC7coTHctUy2dSqoZSrowGD36Yv354P25H3EhSmjVxGUPwbYnij0yTiNNQDJnlv47Zv465TOkSX0xjX0wC/any7q2ZzQrXb48Kf36o/0wzLzvCvfpCrvw1+8iVD59LT598L5+MbPoW735oC2bh3vtCjZnSuaSw+vcj7476LOmiznqibZnSr59brJl2GxZBLztSX48qvzuCjzsiLboTHipCPYnCzspx3WmCjksETyrBzPkirLjCnAexm/fSK/fii/eBCsWQDhnR/HjVHWrIC9dS/EgUPRl2m3Zxzyrx+wXgP////mxq3MjVrZqoPw3c7BdDfgupvy49bgwZ/yqhu9fiu2aAe5eSv69e/JgBCsayuxcSzUkiLly6+tayyxbyutayzblh2tbCzq1r/any63dyvOiBWnZSzZnSytayvYnCrNkCqh19OFAAAAsHRSTlMAIHCAMBCn7//PUI+/32BAQHCAv79Q3///////72QQYN///////////++GUP//////////////////////n5/////////P////9f///////////////////7//////////IP//////////QP//////v/////////8g/2D//7z/v//////////////////////////////////v/7///49Q///v/5/////vQP9gMN/vz3NoAssAAAQRSURBVEjH1ZXrWxpHFMZRQ1yTGq2x9ZJKAl6omihBuWNAXIOiyLIRoRbFxhvWUIpy0WCp2gyuRKBW21iaWKuiMWnSf7FnVx5cCNh+bN8P++zMvr89Z86c3eFw/uMqKCy6kjHBvVqMlVzL67+OgT5iz5RgWCmG3cjjv4YVXy8qxYouZoqwEi6nDCvOA5RiZZAVVlz+ccXNm5WVFRXlpVgBzF+l53PoCpPNJ59iVdU1oNra2lvYZ3U8DucGOyhLhVgh5/YdvgCrqm8ANTY2CT8XCJtbeNysSqQrUtZ6h8+/e6+pjVa76L5Y3NHUKZQ0t+YrUgVtl8rkIIVMeo4oVWqJpIuX0/+Az78nVWi03Tpdt1YjVwDCED0SvJeXzy9/qO8T9BsMA4PdGrm0zThkGiLMuQnwt0nlVSStR8MWw4BOK9czoxGrTYJ/ke2/zfjvmshHo1+ayFH78NiAroo0dYokpKln3DGBt2T6v+rnN7QptALy8eTU9GNyZtI+bJgdIh/CMpwkYbXN4fjXWQnVt0vlunlydGp6epR8MjXpsgyS8wppu+gb0mked7jxbzMCVFeL2mWawfk+zzToycK0B0LM34J1ixoXCZXV5sUJdogH1fUiyGjWYmcAkMc3PDbbrZHRpe0AwO8m2CH6axouA5RmmyOAE0tpf3lNjZgBxlywZlpTzKozgGXi6UVP1DQywKBh2McQU5M+l8UwqJXLzncbVu0NrnSlge9qaUCm0Q1YXL5Jj8cDfnojUkAHA4RWvk8DlbVK8X0oq3bWYHHZfT6f3QV7DRlBP4lSKQGwyooAwMgaaH39h5TW1+nx2rOU5gLZgBhdqjAARjbQAcAGRW1sRijq+dYWBbdbmxQ1swkXagGAaGiEBQhVSnEMUfH4j9s/xeM7u7vxePzn3efx+C/b23D7AqFAdM/4axpoEfYoO9bQZj5gASW80aDxtzRQJ+xUKScQ2skNvFxErwKhsGA/DSwJhWalKoY2cgMUQsHo3qr+94te6pX0mJUHCP2RC9hB6FkgFBQcspqvTqK2qlQJtEh9CLx0ohgEODg6ZgG8ZkmPVaVGKBbJBiKbCCWjoaD+pID9BdXhEpvVTMAObWQCkRj46Zqe7Gd+1L24mibgsfPFBXAaQef+5NEhNxNYeg3EuFWdAEdscev09HTG6XTCIBEGf/io7yz7P9OK42oHIESC3UKJN17m/X1vP/zzPcVxt99hs42736SYxKuk3xsN7R2c5PJDjNf4xJzfAYzN5l5edjv8fnh9KGjM4+dw/uwliImA138uL7jBfqA/eXeW91RseQ+IOxoARWl3eFV/1LfPveTc5bW8X6EVDieTI0aB/ujwuOCfzurWrr9WV41Go0Cgf3f8lvvvDvgzRpz/if4GfbTjBeHtY8IAAAAASUVORK5CYII="],
    "14": ["[微笑]", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAACmlBMVEUAAADksUjvw1/rvFbsv1ntwFXqulLntkzlskjksUbksEXhqz7xx2Xxx2Xxx2Xuwl7rvkvjrkHhqjzgqj3boDDxx2XyyWLy0Fv01Vj12VH12U712E312Er110f11kX11UPxzEDovkLcozPXnDLgqkLyzGD221j23Fr23V322lP10kDuvzrdpjbdpDXxx2Xxx2X23mD232b24Gn24W323mP110n0zTvquDXgqDTZni724nH35Hf35Xv35n/221XxwDTbozDbojH354T36Yn36o/465P10D70yzn0xTPkrDDaoC/24m/z4YHozXfp0H347Jr48an48Kb476D1zzz0yDb0wTDboC7Vpkm8dhvXq1b177b487LdsknAfSHMjSjvxz3zvSzbojHToUXRoWLVqXHAfynHjjv59bfNmFTbtIPEhzjAfB7zuCfanivuw1/12lHhu1bw4Mv////79vHJkEbbt3H5+MP0wzLzuyrprCfYnSvwyVXEgyn37uPiw5vztSXfoCfYmyrYnCzz3G7r2JfbqDDzvy7Znizqu1ToyF3g1tOOaF2AVkmtkonBrae3n5j18fDq1LjzsiLvyklkMiJaJBOihHrmzKrkoCHEhSq2gETksDL0yTjpqCPYnCzNlziTXjRgKRSkYhnyqxzSlyrOkSqqZxqLTRewbBryrR3LjSvhulS2cRvsz2aXVxjPkCjHiSnntj7lxmvTmzPgsjn0xjXyryDyqhu8fSvgqz65eSvalSG5eSq8fCuxXiHcqjvLhym6bCS2dSuxcSy1ZSLpox6raSzXoDS+cyazciuraSzCeymtbCyqaCzutiyvbiypZyypZyyqaCylYyymYyylYyzZnSypZyzSlirQkyqvbiysaizEhiu1dStJZLwQAAAA3nRSTlMAIHu33//////PmmBgyv//////r1Df////////////////z0AQ//////////+POO////////////8w/////////+///////////+//////////////////////////////r////////////////+///////////////9//////////YP////+/UP///////////////////////////5////////+//////+//////////////////z9+v//+A//////8w///l////gP//IP//EP9AWKdwcL+P38+PcHAEK71+AAAEpElEQVRIx+2V+1/TZRTHQeWSxoBlwu7j4m4u3dgYsI2LgNtoErdtPkqMKS4UtqxBbhYGMxyRlwxaQSDEpZQigXCjAr8CcRVUwO6X/6XzDF8MFLWfe/X5ZTuv1+f9Pef5fs85T0DAf1GBW7ZuCwoODgkJfW77jsBn2p8PI4WHhwcFRUREhIRGRpJf2Pl0+4sk0q6oaAqFSqMzmCx2TCSZHBv3RHt8GIm0O5rD5fF4XA6fihHBHrJQ+FL85v69+0i7orkicYJEkpAg5XH51EQgZEnJwtiUTcuBx3NECXKFMjVVqZADkrZKpCdn7N+E2EsiRXGkEkVmVvaBA9lZqQqJeJVQqTU5GS8/RgTuw36t8mDuK3n5BYV52ZkKrZgXE8NmCop0+hxD7KPnCCNF8XkS5SEEOnykOB8Tr5ZAYCyFFKZkw9GN/i2k3VSOWHEMobLjZvTakXIgAD5xsgJVlsp0eovBuuGDxL8eTjvFk7yBzG/abFXV6K3TxYW5q8FxZFSp7Y4z1rc3JAh/h5YmldcgsNhsZ5H5dHnBIfQuDqoqUCnUVFvnPLcO2BaUSONI30PVNp/KUH15fgmq8gUn0XmZzmU542zw+98PDmJQueJGdML2wYWLl8BTX16A6csXPrzyEcqA92Rpsjr9nbg9uPkhcOVjt9t9CYDiAlRh+wSCi5/6AEdTy7qatgazGFSOVI7Ml93YU43q8wtb0VlMuz9DbUXtAFx1dqwBISEApIkknehzbOlCrfmFeYdRGQ7c3ZVsX4ae3i/WgNAIFoPG5yU0oi+7wHIN5cKnPliCcNB1/bzAB/T1fuUHYgRMOoUrlXyN+ru7r6Njebibvinpv3HtRn8vUyDzZRgYXAMihwRMqIkn1jZ2ItT5bXZ2VmaqQhs1XIkGb0L7yTwuCwCt6wAVi0E/xRUlaKG5M0HQ4FpocA6FxvD1q8viHRk0+4FIGaSg8WF6JHKFQqlUKOQS7MczhCuym2q9I63frQHfk9tVLGYiFQgpzJtWCzMnFvEejqlK7cFnbjH/4P9w5D04BZ3azOGJpGKQVOQfa1m73QRHGB27tQbsIA/hFIxh4naabwf4tgAF+5mC8QlIgCua/NHf3UKhRg3ETYK4TeGngfhgpyWCn11DTPkSTI/NrOvWo8IknQwIIUHM0qhYNDqdAfWUzhFTbS6cwDh/Zx0QJ0xOB0LAAmKhmU6nJzLAzmTNThFz6bignun5xbvrJ6gho82uUxcJWEMTBGGMYWKxhfh/uh4K6hupWbyzcWnsz7in97RDEvYwQRBTCwsLc/C7kKNxObB/9P7M0sYtcM4AhEanlhWpSmexlyAmxnM09lV/y/3llUcXU4fBcM+k13h0arVMJktqa0vXaex6k6MW++eXHzy++jDhcOntGoB0Hg+4XSaHpdaL61n+abPl2mG1nrE4TCaXHuQCN9ibvD0j44vLP2++vn+xAlJrsVgc4LWAuwk/fnJx5sGTLoiUBqfTetXb5JPX29czPTAG5Sw95QraCYjTWVfXMj3dMmo0T84v/rryjEsu5bffB4zGwdYa89jk/B9/3v0392h83F+3QH+vLAX8L5/+AU0P0I19vQP/AAAAAElFTkSuQmCC"],
    "15": ["[难过]", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAB+1BMVEUAAADhqz7xxmLww1/uwl7puFDqulPntkzksEXms0nksEXwxGHxx2Txx2TtwFrls0Xir0HhrD/YnjDhrUjxzF/yz1bz1VD12Uz12Ej110b11kTxykrqwkTgqjvcozTxx2X221j23Fr221X12lP11UL0zjzqvjvdpDXcozP23V723mL232b24Wv10T/0zDvnuDnaoC7xx2Xz1ln343T35Hj35Xz24nD12VDvvjTjqjDboDD36IX26Iv36pD10D30yjj0wTDboi747p748KX26Jf100DlxWrNlTO8dhvBfinatGvz67D487T48arVmyr0xzTzvy7WmivkvE/EhzjNmFTKjDP59bvu02rAfSDzuCjZnivZnSziw5v////z6+PMlUDDgyrTpGf69fHOiyT0xDPzvCvrrifZnSvVpUfZsn/ztybgoSbZni3Jiyvix4bq1Ljzuim3n5iDW06tkonBrafu3cbPkSnztCPZnSnaoTaOaF1aJBOihHrczsXnpCHboTO4jGDuqB2we0SLTRftwzryqxzQkyq0bxpsMxX35YJ2OxWfXRjWlyfHhyryrx+9fCq6eivgmyCxcCu2dSutayzdpDWxXiG+dSmwbizqsi66bSbTmzWqaCy1ZCLVkSOoZiysaiymZSypZyymYyyraSymZCzYnSqubSu/fyuLf95GAAAAqXRSTlMAMHWft9f9/7+vhSDq/////+8gEP////////////+bUP//////////gP/////////Pz///////////7/////////////////////////////+v////////////UP//////////////3/////9g////////////////QP//////cP///////9/////////////P/6T/YN////////86///H6iD/eP+fv1CAOQP3fQAABDdJREFUSMftlftTWlcQx1ETSGwuEoMC11zL4xK8PNPwUnmjmEMiQjVYISGiiPURK7EtYGlNrSGpsUqVhGDUxLZ59M/snosRfIzpz51+ZxhmZ76fs7tnds/lcP6TqqtvOHeeyzt/4WJj3afdn9VfIgg+n8vl8XhNAsHlxuYz7VcaCIIQtrS0ikRiCdl2tYmiqPYzkM/hdKFUKpPJpHKFSCQhaeU1ilJ1nHG8UMqoNVqtRqNmpArIQuv0BpXq+pVT/V8QxA1GozWazGaT0aJVy+RWlujsUnXXneqH47VGs83ucNhtZqNWwwBB0k6Xu8vTfbKRc4RQwWhNNofX29Pj7XXYTBYgRGLSp8TEiarqCcIq0xj7biLkv3W7P+AFQggBGtDp9MGQx/Plseu/RLTK1ZZBhIbuIBTuHwbiqxHkh2BECSkinujdI0AD0QIJwHIvFrs/im4N9/fY42gsFhsfQwmdayI5Gf36SAI+XwQdTKHpGGjcj24PB/rQHTYYQtegppnZ6IPaBPw2EVQ0h+5jT2wafTMcmELzbHAPeZRBd2oyer0G4HIlGEBDsfGHCw9j81BTYBRBdd9+F/sepeFmU5lstnq1i9y2j8APuVzuRwD6ewD4CYKFCpDMLGUfHQKNFUA7h7All5tGfQHvKJpfwMHPyMMCywPVm73IwwBu+hcW8KPeHm8fGmODFfSYBfIDTw6BCzwdKVYwcK1PseVXNOX1Olbj6BmO1hJ0Bfhtrgo0+UixVarWDqKnaytrKNzb67CvAr7ybGVtRImH4zjgpHFNGgsejZEpO0zfqsl4MBqkTw/XCsB6FRAoaZwCCJN51QZaNZssMK54J0gaD1Mkk0/HawCXj5SIFDJYB4sJ7wNeCA0jU8BGkD4njMbMRn69cAi0U4+dkKJCaC0gWDo1Axt0kABa2FiO/34IPKIMekgBhJSBFcVSM1CPVXSQIAQtbBa2qi8RRbmULGGVS2UMw9wYBLWy/koCqChRfF6dpRdUpwuKwoRVIRf4S6xeUtivrCTIF8o1S9eh2g7qgSDFYtHVl6XSq/DOTvgV/BvAz3aQ3yxu1b4A3apOIHyQhIKTBWKQhDRApjT2z2Tyy4Xybu0Gdai63EGXUkeHS6UdCYgkSZr2efZK6+5kBBK8Lr85+si88GwDoU+X9gw0jc20z6dT6rf3Sgns3yzv/3H0FVj0ADERBL9Tp/OB2enU613Bie29BPiXin/+dfxdegBEyN3V6XLpK3KB3R2C+sFfePvu5NPXDkQy5IY0FU24wR7JVM5/d9rj2hGNLkVSyRBAoFAomYzg46Hf0/0czt3uaHRyZiaVSiXhB+7MBrRbKJ+s/6Oa30ez2aWNTEXgXt70l9++2T3jE7T4PjswkJ2dXQJtvo4Xi+X955/6JLY/Safn5tbj8UKxuL/14d98RpsX/2b1YZfzv1j9A/96bNAhJWPPAAAAAElFTkSuQmCC"],
    "16": ["[酷]", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAACGVBMVEUAAADuwl7wxWHvw1/vwl7ouFDpuVHksEXksUXdpTjfpznksEXxx2Xxx2XxyGHtwFzktE3ms0bjsEXirT3gqTvZnzHxx2Xxx2Xzz1r01VH12U712Er110f21kTxy0brvzrfqDrbojLuwV323Fn23Vz221T21EH0zjzYoTnhqz3232P24Gj10T/0yjnntDbdpTbWmSzTly7xx2X24XD35XntuzLhpy7boTDboTDTlCaqUgb36Ij36pDpy23SpFCvWwy2Ygn0wS/rw0747qLkw2jYqS7Iiij0yDa1aRn48bD49Lz0xDL0vS3anir35oC9fCq6cSX5+MbRpGDZsWnztyfZnjHw45TKk0u4oDSKeCZ7ZyE9MAxsURQAAAAPDQU+OBx8dUerpG3LuIC+ezPgxIo9NRKtkz8yIAqURgVqMwMLBwPsqCDYnCrzsSHXmyovKSBfTDvn4qyKblXzsyPhoCTZnS29l3XBnn7dybeahXLr4dZLPTD///9QUFAfHA+1tLO2jCDyqxvVmSnmykOxjm53c27zuyrLjituWETJq4/m2MtdVzOTf1bGoSvDhCpcUR/o2HnJuV/0xjSShDjn0V7yrh63dyv2zz3n1GnWvUHooh7bliG8fCvPjSa3dyqraSyraSyxcCupZyyoZyy+aQnpryvGeBKKNgH63EiqaCyHMwCpZyzx1UqmZCz95lH/71rZnSupaCy9fSuv9DJRAAAAs3RSTlMAMHCfus//v6RwMCCA3////////9+PEP////////////+f7///////94D///////+/EM///////8//////////////////////////////////////QP////////////////////////////+v//////////9g///////////////////////v///////////////////K//////+A//9D7/+PIP////////+A/6f//++/WOT1NM8AAAQUSURBVEjH7Zb9X1JnGMZbFmU136ihwBGKw0GB48tAjAcTyQR5OWLr6Ew7WHOlaaCJkqmzURtzW8NFIxeGSNLKarX1F+5+zoEOOmf7eZ9dv8B5zvV9rpv787ywb9//An20v+TAQYnk4KHDpUc+7D567OOy8vJyiURSUVlVJT1+4uie9k9KZDJZWXVNjVyhUBK1qkqpVH1yD2T/KZmsWqPRkBqNVisHhNKp1Oq6+j2mr9aQegNIrycxQhBGuqGxsal5V/+nsvIqUm8ymbFMBkB4oqXF0nq6eVd/mRXVmcw2W1ub7Uy72SQQKnuHY1figKxMexahM22dWO3onEB02ZHThYmd/mPgJw11qLvT7fF43ADYMNGIkNVIe30W5sSO9stkNVq9qcePes9jfYYutPWYDE6EuqBVLgfLMH3bCyqrlpMGs62/F32OAfhos5l6kV2qGLg4ODQ0dIlp2rYa2jmOCwwPX77yhR2NeM5/iVB3/zk7QoNXuby2R5RcK4xzo2PIPgJ+BLo+/n6Ym2BuFAGnKsQ349fBesE9gsZGuSIFmZDY2j7J2cL45NQkNz560+PuvAIP09NTheDwTGj2PVAvqc3PNhW5NXcbnDfd/QFucn7+VmRBeHEpPBESO3u4ovaiMH47Mr+4+BUQS/BwZ3FxLpKP+DocvSv26VAFdS/Aj3+DgW/zZfCAkDAUC0et34lAJUUM8i+WI9/P/zDJcUuXf+S4hbm5yH2+UYEuDDhFoMpIKPmOjy9HIsvwed/WA0UtTE8J/p8cLADxIkBHEfdWxB4GfjabHwQKT1e7Ej42GHUWAVKaIpTyh0t5x9IDs8lk+GUFI4GVAR2sPjYZjT8SuyRVrVKEQq69tgLM8MNfwQ4bSKN9PPAYtpAu4YiFkym/CJSqG3RGAhNaktTr9bBD9ST48baGxYoDgtE1/xNxcaulLvgVSoVcrtWQgvLHAEEZaQiAitLrGXEtHVe30FAUZAAiCL4Jfp0LAsLR1PpG0eIrbWxI0EYglArM8FIoBT/t5QOs2adFQHNdY0uCzyCUwIAaLDQh+HFBQQjIbhbvoPpWiyNB63AID1lzuVwDRa1iPy4oGt8WADrd+gwTq0YKMyrw536D/ri82J+MrmU3dhw0R1qB8LpoHTBGoyrX8fx5xwtXAtcP/lR2K7PznJkFwufwJlw0QLqc/eXL7hcwfcH/6u9H3yzDPIv5HMAkElDT2NhrCuxsENez9ftuhysQFpbFjMPx5u3rt298LJ5+Ip3derr78d33B4SwoFjMt0qtsmGYPbq2vrWR+af7oflkKMRYkmGsYDAJxaf9UM7mHldQ341QKHSXmZlJpZi1dHw9m/0z86FLrrQpnXY643G/fz376NXmv7pH+949Ab3L/Gf/KPwFmaZ/4uvs0FUAAAAASUVORK5CYII="],
    "17": ["[冷汗]", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAC+lBMVEUAAADksUftwFvtv1nrvFbpulLnt07mtUzksEXhrD/gqjzxxmPxx2Xxx2XwxWHtwVvovFbls0fjrkLhrD/dpDXcojPxx2Xxx2Xxx2XyymHyzlb01VH12Ev110j11UP0z0XrwD3gqTzxx2Xxx2Xzzl/111j23Fn221X12lL12U/110X11EH0zTvepjjdpDT23V323mL232X24Gn10kD0yzrquDjdpDXcozPNkC7xx2X24m/35Hf35XzxvzPjqjHcojHboC/NnD6vbByjXx+4gjvt1nn365H36Yz354TJkjOhXBSoZRjHjiXtxTv0yjj0wzLany3wxWLv0lWaVReHMwCXSgz476T47p347ZmQPwXMkib0yDb0wDDaoC3RsHHq25zPoWT59Ln487P48arpyFTmwEnesDT0xTPzvi3gpCu1ch2xdjDy4In5+Mb598LQli3mtzLvtSrZnSrTlivWqEny3nzlyHPbtmzx6LHJiyu8dhv0uyrprinix4bAgCnztibYnSzwzE3JkEbmzKqgcEl3PBXu3cbBradaJBNgKRTzuCjqrCbYnCrqu1XZq0T69fGtkon37uPq5OL1zz30wjHzsiLpuVLxxUzAfB7///+DW07ev3vaslzeu43WyMTzsyPkpSbNmFSOaF3LlDzy5dTppyHVmivSlSrmtUxkMiLEhSryqxzUlyryrR3q1LjWlCXVqXHQjSXEhzjiw5vJiB7yrx/yqhu9fivywzrtp0vObyz7W1n/WV37hEv2rjntphy5eiv7iFLZaTjkeDz5lUTyzkzkfTzdazveaDzyXlH/XVv8eU/2szbgmyC8fCqtbCvlrzf1z0L4nkH+Z1f9bVT1tzX3pz76iEn4oz71ujS3dyqsaizdpDX6j0b8dFG6eCqxcSz0xjX1vjK0cyuoZyzdpDX2sTivbiyoZizqsi6raSzmoSCpaCy+gB7any7tvTKiVwzZnSzZnSvaliKlYyzuriSoZizhoCWtayvTlirRlCqpaCy+fiu+fytCFIh4AAAA/nRSTlMAMHWfx///37+fcCCA3///////748gEJ//////////////YO//////////////gP//////////vxDP////////z////////////////////9+v////////////////////////////////////////////QP///////////////2D//////////////7/v//////////9A/////////////////////5+v////t//////////////v//////////+///////////////////+P//////////////9Q3////+////+f7///IP/q////cP//UO//YP+//0CPzzBwgGUfWE8AAATXSURBVEjH7ZV7WNNVGMdBhYTKAUkN2QaUsgvDwYZG46aY3ITNZAxkmzG5bCAF/sCIM9sQNXFaXPYjWYWzSKohICZkCKPLuslNLnJTNC6FARVFmZU9T+f343lgIGJ/9/T97/3t+znnfc/e8x4zs/+kzJctX7HCwvKBlVbW5vd3P/jQw6sIBIKNhaWlra2d3SOr7Ze0P/oYkUh0WOPoSCKRyRQnZ1s7FxerJZDHnyAS165zxUSl0UlkhhvT2cXdff0Sy691ZXl4stlsTw8WlQYJCsdrg/vGJ70X9T9FJK5jeXK5Pr6+Pj5ctocrlY4Tfv4Bm8wX9TtQWZsDt2x5emtQcIivD9eTFRoWti08gsf3D9h+9x7PQP+OSAGmKGF0THAIJHZi0c5YkdhfsmkhsYzoQNsRJYjcJXw2bpd0d3x0ECQSEmlJgQJBrEyeLFm94PiJREdqimBPqlD6HNTz0viYYF8fNguWkSYQpIv3SpCM+QmtWkN3zdyz74WsrKwXMWK3MCjE1zIbgLSI8Kh0vmI/sn1eNxAIJBqLuw8aoF6CBNwiNRQAZWAKSOIwZXJVMpJjAiwnHCBRPdjZIPfgocNhGCGNj84EuS8fyTsaCZyZIrH6GHLcBHjFhgyBV0FufkFeXl6kUgqBVKAsLIJR3rZwjQhVFCPIXI+8ZnGCAYESUKh9HTqOprwBa3gTlGpPYsBhEMFDFbpTJjkts8SABPCWVvs2vmaZNF5YBt7RFs0A6RhwuvzdWeA9SycIJMIl8TXfD9THC2PKgFarPQKjQ0CCARXlZ2aBlbZuDBINB7RFBQVFQC+MCQoF+TDMP6ktBUmwBl1lWrYJwKGQ6YkgTourEJTFBAVvBlUzYRxIx4FqU0BDgccElPm4oxRkBoeE2GAl4XgJdqzFFdX6OcBOA3Oil4OzuEMJtmLdqgcHsZxygcRLJodAjdIE4MGcSAdKwNlCbdU5kIlfiAQA4qo+OAfOe/H4clVtnf7DWcDK5QLcgkz/CO8MkMblcrE7l1iCRfUXGxoNsIQm5cezgLXLBiaH4vRJw8VP6+vrPzOe8IR2livt8y++/OrrhoZLzcaW4orWtvZZwN7lskjT0dnc1QB/7W7svOLIwsdAT2P3JexLb1+/qq5m4OpcL11z9+Nd6Bts7u7qut5oNIg7qDQ4NZwMxsbr3d3NvZ0tqKrpxjcmzWftfnlo6Eqfsbe3d7DTMIx20OlwMnGGDZ3GwUFjXwuK6qpHRk0A7283+snQ/u96enoM/Sg6RIZzjMGg8OEng6FlGEXVTQNjN01v0PoAf5SPouJhMYqiIgoDikJx08hQXGJYwdjo/Et9LeB7sUwGGZlIQ8Hk5sbRML2G+GK5Av4HrWPjC8aGeQAk+CIek6nRcDBpoJ0H/Qq1rrZiYmTy6sK5lCOR7JWLZUMinheTyYz9IZYnmll+xt9+9+j7USLZr5CLUZls6KcoOMCmUGhXq4or61pHJkcXG645CJKsUkBGPIWNv6nzmL22Eta7uN/M7OdfEOSYSqVWK6DUapUOs0/fGBv/9V7vg/cZBEFO/VasgyqG7sqm6baxyVs3l3iCMo4j5eUI8vvE6YmJ6RrlwMjYrdv3eeTs//gzNjY7W69Xtg2MjLf/9W+eUe+MO39D3bntbfa/cP0D6zgteZc893QAAAAASUVORK5CYII="],
    "18": ["[抓狂]", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAB+1BMVEUAAADwtDD1ujP0uTL1ujP1ujPztzH1ujP1ujP1ujPztzH1ujP1vjb1yjr10Ef12k/22Ev110j110X10D/1zTr1xjT221f23Vv11UL22lP23mH232b24Gr10kDnqSr24W3343T35Xn343b24nH35oD36In36o/0wzH0uTP36IX47Jf47p348KX48ar1zzz0yTfvty7487H5977zvCvioifssC7lym/59bn5+MbfuEPFjSTuxjzzuSjnqivoqyuOPQaHMwCVRwu9jlLr363kxFi+gyXtriTjpyehXi/dxpCzdirasUD0vy7ztSXgoCTZunCmZz/y7LnNpVeoZR3SojPcniTcwXzAlWCcVyGaUBjNn0LowTrzsiHVkx/NiRrXlh/msy/UrFDq2JKjWxDkoyDUkh/GgBbRjh3UkRvNqYHq1ILmw0vrph7RjBmxeEfx4pPyrh7MiBqxaxLJgxWqYxDyqxvGgRfuz0y4eR3GgRbuphrFfxXEfhTnoRvAehTp2c/////MlCXblBm1bxGsZQ/BehPhzL/w5t+sZQ/AehPAk3i+exm9dhO9dxOtQQDISwDnVwD0WwD/YACoXA2waRCPNgDdmRuyaxGdQQPSTwCoTQeyaxGlPgC9dhSxahCrZA+pYg+rZA+4cRKqYw+qYg+sZRDPiBarZBC6dBOB75dWAAAAqXRSTlMAIFCAv68QcM//j+////////////////////////+k////////////z///////////////RP//////////v//////////////////////////////////////////vYP///////5+Av///////////////////////3/+///+f/////3BA////MO///9+P////////IP//EP///1D//6+Av5//YN///+/P+p1QKwAABINJREFUSMfdlvtbEmkUx03XCyXOcIcBQm7Ogijg5J1kMAVTMUuxTIpaWaMUF5hkzaCCwLS21DLU8m6r+2fueUcdcB9rf+/7i/M+z/fD+Z5z3gGLin5KXSgu+QWptKS47P/dZeUVvAJVlP+YKbt4icer5FdVYbhAKBJLKnm8SyU/QMrBzselMplMKsUQIxdLACn+3seXgl1BEEqVSqUkZFIFBoSaD1Uun++v4FXiMqWmWgvS6VWAYDgQqEhF2fl+BaHSGYw1IKNBp1ECATVEfPJc4ldeJUaotCZzraXOUmuuMWlPiXorEKX/9V+0VWIypc5kttgbGhrsdbWIIGSocwhF2WwlZ/1XGhurpIS+qcnS3ILUDIRBpyKkWGtbO5RwNDZeOANc7WjHZCqtk3Z1XmMJu8Vs1Gq6ul003QZdUO6Oq2cKeDpwBaExOGlQz3W2hLmmqRcdnX2Qqd/r8VwpAC4PtOOQyGC+MYg8nTdRplsIHxpGbUv6He6Bgm2U+XxCBDTdGLl+7Tb47txsrusE++jdvr7h7jHUhN93Lw/cDzwQYlLiIc3ptv23/GEcAMofDOQz/R4YQ0BX3tNTN5I/dIsA8AYDExzwKCQSQtMqLWQaGXmMurA8gWRDrX2TJ6ujvFOhRxxwLywX4rA3vcFoHpkG/50/zDW30IS6W08BfyScB6IBtVCAMt3tdbFTAr/R0DWEnl2x7jExajoSjXIAExDJBZhikk3snH4Cl89k0OpVfewi6KewB4d/hmE4IB6tR5kmnfRo70ODwWQyGE4u+J/Ds+N0G58F4s844FlcDJlwCKXU6HU69n3QqAgC3iFceNJzZC7+nAOeJ2xQQoBh0q7eUXp0kBMcZsfg3SYd3kgy8YIDJhIesQgRw/T0y1dn9HLamYICkCideM0BmWzIWq8WCsdoenD+jP/N41Ha+QAlmmGyC/m7sZi18SHULLvkt/Nvjs3zb3vYKb1DBeayfxXc1vdZnwSI8eOr8GFpeeXjx5XlpQ/H50/QwUw4O1EArGbjAY+tHgGfl8B8qhUW+RTMhdLZxbXCCkwumcz5INL6MutcXlo6ftj4TLui6WQyVDAjmFI4QpGkYyrspFnbxvpsKhX7ssE+u6JTDpKkIszXgkBuqxzH1WQw7qQ3Nze/pEQiUb1YnFqHA701RaoFuJDvzjf9Oi0RENUaqZwKkL53KQ9fLBbzrVaJhPREt0IhSi7VVBO4NcqV2A6KZCZ7nRbjB2z9JElKkOBvP+Vw+KdyVkxnsRtlat/OKbDrkRPmlgajVBxyOxwU1Y9Egdvr9UeSObHC1NBSq5R7OGBvQCQ12S1azBreD7u9jmOB2x+ZmQuHJFg1WyHAXY0DBnrQQw+2xVgsFs/5WUUikZk0E4sxqAc9IZBscVdj7VsQpiRQk+H7q3t/g7aYQ1BiCx6P9l6k0ZTk1oHd/B4ysSCM2nu4jeiD7aOnJzraPlgrWvsn7YU95I4K7l5R5tv+YWL/PbeYzNednUxm9STA9j7DxHYXzn59L2Qya9/97VvNZBZ+pn8s/gWeH3JFUuF5DgAAAABJRU5ErkJggg=="],
    "19": ["[吐]", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAACOlBMVEUAAADgqj7wxWHvw1/jsUfUpErouFLntUzms0nepTbwxGHtv1rxx2Xxx2Xuxl3svliFVitaJBPToknms0nirUHbqT7aoTPRli/xx2Xtyk5jLhf12Ez12En110b11kTxzkXqwUXkuD/fqTrboTLxx2XrxGnQrFbNmVT221jbsUl3RBz221X12lL12U9vOhmBTh2xfyzdpDX232P23VzSqzjtuDPcozPTmDC2kkfs2XD343X24WzVozXJly2+hCvRlSvAfSC8dhvGhCP464/354T35Xqoaijxx2Xeu43JkEbGijXz5Zn47ZqjdyrZniz37uP////y5dT48Kb10kD1yjj1xDP0wC/boS7LiyzSp2vBrad0RjhlMyKkhnr69fHZsV/KjibVmCjjsTbzuyrZnSrNjyvq5OLBfirNkTCwbBqZWRi2cRvprinmzKqDW07Zsn/s03fhnyPztibZni3Lu7Xu3cbiw5vurSPqu1XPmT3WyMTzsyPaoDatkong1tPnpCHcojTSkSbq1Li/xoTa4qXCoEjyrBy5ijWvz5G6vW+5r2D20D721UK50Yfb1mj1zTv0yDfFhSzlvkjB0n/i12DzsCDGiizL03a9fCrxwTbw3WbV1Wvvpxy6eivZ9NWxXiHw22CycSvQ//+2dSutayzdpDWwbizj2ovS/PPdmCGsaizboTC2ZySqaCzjqC2+dCfvsyr84069cSb65VXAeSz52kbb6byqaCymYyz/7limZCzYnSqpZiy/fysw1AKBAAAAvnRSTlMAMHCfv8//36+AIIDV///////////6jyAQ/////////////6ZQ9f/////////////////////PEP/////////f////////76/////////P/////////////////////////////1D/////////////////YP/////v////QP///3D/////////////////////////////////////z////5///2Df/////7fv/zj/////////////eP+fv9eAezjNgwAABERJREFUSMftlf1bUmcYxzEdyxUoqTniVZyCgi9ozFCmPNhKsBeCw4ulhnIM57ANmrHELWlGFk7A0qFzHoPCLDXJnGtr/9vuc0DBl8v28659r4uLc+D7eb7PfV/PC432X1TWkeycj+j0j3OO5mZ92P3JseMMZl4+6wS9AFRYdLL4UPun2QwGg8lkn2JxuDy+QFhSKBKVHoJ8VlYuZkokFZWsfKmsilPNqqkVikTy3EOGZyVVzayrl8hOwVPlaYVc/nnDgf7jDIaktqa6Mj//jLKxqamuXlp1upJVqfqiubkl60A/U6VGIE1Fa+vZLxspgluTjDy3v5DzDLoGIXFbmxYhXfsFQChCePFiDaj20t5ZHWHkqZH4sh50RYt0hhQh4/D4RsxktlhK97S/jGFFHeC+eq2zq1uLrpNEYxNbZbPZenoxs92C9+0CsplCpOvW62+QE7562YHaDa1nlf3oq4GBrxFSO+1OvGVXAJOpQoNkAAnc1H+DygwXvlWjAXjrHBQj5HK78FuZAXlsGyIL+I4EuvRDqNzQrkYdXeSrXn8bIacHv5QBfJ/HsyGyYP01GPIGAHcM16GmYSqPJDReHE+3doQuBKCbIoaH4XsInTDoyMgfOm/+SP6qQ567+OgOcIzO5vnQPf2ObkOb1KkRKGmRx4OnO3u0QMDrReL0/zr009h9pN0e4koHUnv9Pek+5RQY+QI11SZKbejB+Pj4A1gmWjEIkY0FwLoL4JagbQKa8hCA8UdnqLWFkM1itu8BAhM8DhDiwaEhsu2Pft7WpBDWRjBEAeE0UBic4HOrpjTJAZsfPt7REy5/IgCLyT3t9zVnACEjn8eRSaZU/TP3y39JaxJ2qjEFzER2gNLC2QAZMSepq2tSTv6a0uQTGQcCqBm5/fPNv+0AoyJF0MiXLXQQU/V1oLm5ucXFRQls6+0AKMEVeZo+iUS9WNC4EK0gwlJJfVISadI/EVCSAVBC7Fl6LT0XzWKL0YUQ4aiSyaRSiVQqI+2k3xhcUJIB85F4xqYblfeGsKU5K+HgcjhVlCg76cdevJiFgOXYy4zV2vBKbp61rhAEIeJxQQIrQVgFYAe/MhodowJWM3dQrnxtjSAcRQTRz+fzeGFiZYV4LTAGgphpLBqNrvt98Ze7tmjDc7lzbRZLlIBPVBIm3mxsvCVehzBo0AIAea743oNmxGJRmE2hBOctzItY4UxsAvFGAQ39HYCC2NYfe8+lWxbLutls2nw3dUdXsQFzDwBBaHzriqUlemTrz/1HX6nF4rSbzaHNRCKBhUImE/auCNrg8vtdsYP8UDiOr7ntwKRkNyU22Gw/1Huwn0bre4W7nG5gKLndbq8pGHJF4vvnv63iv3Acd3q8Xq8bPtPT/vllR3zr/eohV9AIID24y3UXtOzTxGLx988+dCWebPH5rDMzYUckFjv3dPXfXKPFI39T6lul/a+k/gHyHaqXQ5nrUgAAAABJRU5ErkJggg=="],
    "20": ["[偷笑]", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAACDVBMVEUAAADwxWHwxWHuwl3ouFDqu1PntkzlskjirUDhrEDquk7qu1Txx2Xxx2Xyx2Ttv1ntxUvisUrirkLhrD3fpznRljHyzF7z0VT12U712Ev210j110Xy0Efuxj/qvDrhqzjy0l3221b23Fr22lP11UP10T7epzXwxmP23l/232T24Gr0zjzcozPcoTDfqDnQmS+xcSqtbR/HmU7x23X35X335Hf24nG/hCLKiif0xjTosTLgqDqHMwCgWRnx34f465L56oX35oLTqEKOPgfisCz2zTnboTDeu1XbuWzcwX21gUn48Kb47p2VSArAhi3brzr0yjj0wjH22VC/izv59Lfz7LX48q3buV70vy7irSrZnyfZni2raSv59rz5+Mbt4KnzuijfoSjUmSq1dSvk0pvzvCzztSS5dh/ryVXjzIblpyXZmyjWmir0yDfysSG7eyitYge3cxPqpyHjrkK+fRryqxvRlSrq15CyaQr+7GzgtT/yrh7OkCn+6Wb+52GzYCL95Fz941n94VTFhRnKjBu+cybWliawXxn93k/FhSn93En82UXouDDBgCn82EH81T3VnCG8fCv40DvnoR69fivuwTO7eivwwzTPkhyraSzsuTHsvTHbpCatbCzmtC2pZyytaiXAfBLlsiveqSfupxysYxGpYyHMiyC7dhCpZyytYgeoZyzTmB+zcCPSlh/VQtc3AAAAr3RSTlMAQICvx///v4BQECCX6v///////69A////////////v//////////P///////vMP///////////////2X/////////////////////////////////////////z////////4D/////IP////+P////////l///v///////////////////////////////////7///v/97//8w////3/9wEP////9Uta//z+/v/4/fuz4tHQAABDFJREFUSMftlftfUncYx10GZStUSOXiJVAIBZRMuehRdIpRVgKSKUO8MC+TIY8G20FdLNG8TFabaSaWmLfM3N+453skOTqy3/fa89t5vd7v5/l8z/d7vict7T9Z31xIv8jhcLkXL13OuPJV+tur13i8zExOVhaXm83nC67nnI+n83i83Lw8oVAkEkvyCwr5AkHROcoFxG9IZaSkxUJUSuQFAoXi+heCXbmJuExZWkaqVClDBQ1VoUKtKU/Fl1/j5UqVFdpblberqqp1qEiz9HpDocpYo9bUpujP8FoKq67e1NCIyndN+NDUbDbWtLTkpMiTW6y8QzVZ7tZR91rvmxqqdA+oh223qAdyq62m5V+prvJy7bKydqqy1fGIanJ0oPGYqpMVi+oohdnY2eX8/sxm8XhCaanORd3tdrtdVE83Gu1Uu1Jq11N6HNHb5+w/Jdzk5eGAag/1g9vtvkf1uB2tpkrqTqmsuA0Fs3Fg0KkZYvEZmcOiYmVZVf2POMDtRgtH1D/WlSmlwrYCucrY2Tvi/YklpGfmi6RKXaOplRHcjGBqrCYCbp/KZ+sd9WpYr4jDkYhwCSg4EoLjs2Anu2e1DQz2eTNOhFpOFiNUme53dCcGWPwAY1yWMM7K9IRLBFxDg6nVYnmEfM9DxAMAbVLhZyHo/flEuMTNl5BFVzfWY1+/o+MXGgLDodAEwARZAyNMeqdYglwisstKdbcDEAiAxQJQEQr9+vTpBND54pMJLCFbXiIWDoez9aBvGAaMM4H009+eTUdgRlwyO4tvaTD43JAU+PISiSgrPAdjutANQJ7Qz6an58U0LakIzxrxtQafL5wIRXyVXCIW8mnA4CHMQ5ojvrj4+wwYwuEl3LjR4FSUJRSQEfYAkOQQYZovIv7Hi5cwF1b7yJqDC3+eCJcFhSpchSgAJPmYfXp+nqFf/GWegTm1GRMNTi5HXyWPkqDGiiPEASBRChLNEfet0KDAgzGAibz+1eTZ0CiMZjQCMM1qbjW+XlmDiMqKKyCJPG+SwhPFug9DBYDQiebGlVhsA+gVDEQGLHvesi8AhcLmUzUDzWoeW3q3QcMG8scDtJvsD6hIXWOM0RBLNl9617wGSX5Z+zZ+6srTqNe3YCPZ/H3z9hbyVoYfDe74XbunP+raFjwFx83XsXnX9hoNdLMvwQejrr2z98w+fHidaN7lnPmA52NrBfEBhje4DuJn+PhHOpZoHqGRpiNOBif5d6Kuw6GzA/agi2m+TaJvrb232ToZfBTX63EdvDnLD338xCTf3ogAPTKA1Ys0wXcMWtdePMXVWkRo50vklwePa3QSuyN+uJn6tu9H/FMEIOLtGxkfn5wcX/Yaoh7t4VH8S7+T8r/XMP/RfkXF1JTBsBD1+z3ag834OT+s+D4A2Z6c1f5XWEerOfGv/RJ3d9P+rxT1D0zxqdG2yLntAAAAAElFTkSuQmCC"],
    "21": ["[可爱]", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAACE1BMVEUAAADhqz7wxWHwxGDrvFbnvFTntkzuwVzls0jms0ncozTwxGHtv1rxx2XuwVzlskXirD7fqDrfpzjYnjDgrUjxx2XzzF/0zFbz1FH12U712Ev12En110XvzUHtw0ffqDnZnjDxx2Xxx2T211n221X23Fn12lD11kP1zz3puTjdpTb23Fz23mL332b24Gr23V710j/0zDvaoC724nH35Hj35Xz343XuwDbiqS7coS/any/46Ij36o/35oL0xDP47Jj48Kb47p311EH0yjj0wjH365L48q359bv598D59LX0xjXzvy324W3HnFiVSxeHMwCOPga0fkP17bn5+MagXCGubRngszbzuirZnSvZnSzAkEzp0XTzvSzrrSbcojHw3YPdx5XOrnyyciv0yDb0wC/zuCjZni3xzEzjvGCkZDKVRgi/jkacUQzzsyPcnyjaoTbq2prVuojVpC7ztiXmpCLboTP6zGv+t2/7won71p75vV/3tlfyxjzXmSj0kWj2im35jXH7kXX+lXf+nHX+pXP/rnD9zIX+v2rznFHyrh7Qkyrzh2nIjyr0q1Xxg2fjrkL8xHPyklnyqxzHiCrSkSXAgSr6q2j7pGz42XX1tULzsCC9fCqubSvgmiCxcCu4eCutayzBhSnBhB+5ex2saiyoZizstCysaiymZSzooR6mYyymZCzYnSqubSvDhCu6eiuvbywM373hAAAAsXRSTlMAMHCix///1b+vgyCA3////++fIBD//////////////69Q7////////////////////8//////////7////////////////////////////////////////1D/////3/////////9g//f///////9A//////9w///////////////////////////f/////7/////////////////K/6T/YP////9A/+og/3ifv1CAgDBYkbOnAAAESElEQVRIx+2V+V9SWRTANYOKaZQ0lFWbfCwKjyUWIRbZBAXsoqi8CpwGHtk0opNYOi7TamZaY4jTTG6pNLbq/Ilz3gtZ0o/Nz/OZ8+EHPny+33vOvdxzblnZfzHKj1UcP85gnjh5ilX+dfqb099WQjAYTCazqop9prrmSPxsBYfDqa3jcnl8gVAoqq9isxvOHaF8dx7wRkwMgUkoRyprYjc0s45YvrZRrsCVShxXqMQYDwy1pqm5+cLZQ/kTHA7gSq1Or9cZtEqFHJPQRovRdLH8UL4Wk+NavdlssZjNVp0WV+UMGxgHN1JB8warpdVutztaLWY9ZUBVTpnLbTQdqOoYhyMR41prm93jbfd22B1tlCHH+FQKn99oOvfF8Z/ncDFVQG/pvISCXd0hr91hsRoYPQj19lEpwibicmlBlXU8MW4wX0HoEkI9oVCHvdV8NYiC8GmBXUSiRH9JgspKgUSu1H8fRNdC3T3oh5DX47B0oZgK60W9Tk2cTBiJ6yUJBgRURTdQVygUuoZ+pIUexFBhA+imUxZ3h6PEhSLhRqWQTwk/oU4QQnkhoBBLBpFUDZtIDhGFox1m1IOgCOivXvm5HYRbt9rhnCydMUroGwHBFkmNErfzwmnmAJXhztj4+Pgv3WC0ez2waatBqWicmJicnJwCITpdONlTTJGQX/fr3Xv3Hzx8NPO4w9vhyf0RszOPHj64f+/uk0hqbvppXjjJVAsH5udzwthjj53irbrAnbGcMP8EhIViQfrseV6YdThagddrlbN54XmJ8FuVTFpfEBbb2izAGwJ4QXiRTE8vFQS2ximc3BcWrXBZ9TptAFc17u/hRTiZziwXCVNqqZA78fvLlzOLf0A/0A2BQw9J6qgfn/3pT7xKL63khWp2i8wpFPAwsQrHA1qIADQdxfPphoi74ZDSy6t54Ta7SQMpBDwJJlcpcCoUKnmOh8tqIxPJ9NrKemESNbDj+wZ3gauCAByjxsCCiE4AFWU2XhfuUn9Di0vmBIPP20SbGBUSemwsoK3PCebSK7GipmM199loQyioR8F6gHl8ejIF0YjLBzt4lV6LrRdPgDPNEZ9LppaCso0GRQK+AHChaBD1UjydIPumuINYJqObMpxSKVCDIqCl0j741uJz+yk+E1stHTL9pr9Im0sDihOM4PbIyNYgAt4G69MF7bwtnQLDJjAgiUYmU09tIzpubsVtJM2/i2XffzmXroMRIW2+uEuj0TRltra3jD6b2x9OJIFfyX44OPqqTaZoOEK6bT5fPB73Ae32w/JQP6z/4bDhyiIIYyoc8ZMk6XaTpD8SDqdg+XQmezhfVnb5IjEUTSUSYSoSiRTgc3Ajsgfr34+ajwQo0WQylYQAOr22HMuuvjniCRr+SExPE0NDo6Oj79Yymxux7M7rrz2JrKeZzMLS0ubyykZsZ/3Tv3lGa4Z3d3f39vY+/V32f3yOfwCFPXpbbO3JOAAAAABJRU5ErkJggg=="],
    "22": ["[白眼]", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAACEFBMVEUAAABdIwBdIwBdIwBdIwB3OhFdIwBdIwBdIwBdIwBdIwCPUB1dIwDksEbrvVfmtEvot07aoDK4gDF7QRLuwVzrwFbqulPntkvis0Xxx2XuxmXyyGSFTR7uyFfwykzuxUqNUhjhqz3fpzn22lP12VD12U312En110f11kXtwjnQkyzdpzrxx2XwxWHWo0nBfSG8dhvRnDP23Fr23V7221bdpDTcojLaoC+4chepZyjNmFTAgCrGiCzv1Wn24Gj23mLly6rVqXHboTLvxGDzz1toMhtaJBPt5d779vHMlkXSoUP35Hf24m6tkon////osi7doS3Wmizw2Xf35X6DW07aoCzuuTC7ey3bz8zZsn/36ImYdmzLu7Xq1LjUlyf0xDLxx2X28OzYrl/465Tu3cbMjCf1xjT0wC7ZnSviw5v475/0yTj0wjH0uynipyrYmyrz0k324GrlyX/48KfjrTL1zDrzvSzwsibYnSr48rL48ar0zjz0uCboqCXot0712Ev354Lv2ob59brgszb11ELzsiL24nL5+MP36o710D3ztCTMjyru3Zz47Zn11kP36IfyqxzYmSjWmy310T/232b100DirUDXkyLyrh/upxy5eSvntDrgnCG1dCqraSyraSytayzboS+ubSzHhSKnZSzNkR+2dSvNkCylUgCraiuuXwb+3EP6yjT70jzOkCq9fStGjO/NAAAAsHRSTlMAMJ+/cBDv/8+EYCBAEECAUCCP////////gPP/////////n////////////zDX///////////vQP////////////9iYP////////////////+f//////////////////+//////////+////////+L//////////////////+6////////////////UP///////7////+/////v////1DvpNf//5r/QDD/bP/////vgF5rlkAAAASnSURBVEjH1ZX7V1pHFIVRQ/BRND6xEjWEp9jIeIFEBUWtJSoUSSma2BaqFjBcURFBECzG+AAT8Ro0aCvRYGI0Js2/2DPQJWik7Y/tZi3WwNrfnH1m5s6l0f7bysnNy7tGT/+m515n5Bdk9xcysPLT/vzkH1kJ+nVGQdEX+YxCZnFxScmN4tICRj6dlnOdQc8CXGPkwncZo7yisqqKxWJVMxhlTBotl1GYFchhflnDLr9ZW1tXV19fzyq/xeHcLs3Jy8naBNjZVSwuiMcXCEUNYrG4sfE2M5v9qztsdpMEIdRMSAkZl98MQyQRy+/eu9pfDNM3t9xqbVMgZXuHimhuKb/Z2YWQWC7vvsr/NZvdU42+Uavv9/ahfo22EpWr1d/qOpFkQK5/cEUe8BPiVjU29SrQd4ZmBOPvdbouZBzU6z+rwaxh98hUaAgqPNTpHqGaYQn6Qa3+Uaf7CZnMg3rj5T5+ZvdwpbWobeThfR02jY4hpW4EhrpfkMVqGzCOMy83wJOp2lGbLqnHaNQuQakxVCAnHJPGqQvAnYppHuHUSFBv0tSFZlx9qPOv8azb6pkzekszC1TUCrhSraEfdaVSSHzzM0iB08Eq+f1WW2DBm7lSv1ZOB2Uq7eITCeoa6e1UoJmleXs/Ujx6DPvwdNkPmVa84xlLVFUpBGB1cewJ3miERtcACDUld/qpaDkMwLre++wcuFFVL+RDBUPI/ny0r6/p+dqSz7URMrRXN1ZPC0SRMGl2rC94022XsOpwBa1meMPlW1pbA/+8fWzTsNohlfFSgGed2nqRboEVFQW5UqdmMWR3+XxLPvBvhBY12m2pjC/EkTBgEmcAOyIBj9jWGjbHNuwul8sO/k2DxqkiuCkAeqC2LOfAy+poRAgb59QYNkNjG6Ax7IcCBC8ojOz4U4AyAwhHhEEuAV0YFodDoOFFg2YVjjgXt7DjJm2OFcqUCfiXRVBCuq1dBQRk0Gi0ThW0HMSJ3LBxK1RMkQY4JGQKAqFyAgJaXdV2qKTQgSCZyOwJ7FLKofSychpwiSAXiO0OLcjZsa0iIBAuEHVboYXdPcVv50A353d3NCIS8nkyQqpKCT/V2J8sgBPtD5Wlj0Yjh/TvABHkcWVESrLUxRHZCacKUJb4q/Rhetk4mCIEfB6Py5Ul75mgEPwQCHewQu3FDzJOa7d81kqGMSEUBPlYQbDj+aM4EC4Qix9mPkCv5YNWqLEcEQEjFMBHKBIl85BWmyNZIFFEu1BCbgMinERSiuDpsR8Hoo4Sby5eAi/0szYz6QYEGNDy8k407CchD/ghUOLg0hVeelc/YJuwAuIPR6PRgbcmSENaJ3CeXWo/0Xp8+WJ6ZzQOeGxmK0mSbvfAycnJ2zDYPSl/vPX086uv22icdHhsE2az1W0C4P0Ztq9D/lii9c1Vl+u9caN+LuDweGxWIwAtZ9i+S+0dJa6aP5nqtdc7ORcIBBxnRyfvGz4k7bF44uBV1hfK1LjXq19YWQl8PPv4YZei9i1xiEP/m/du6dT4lsm0tQ+KxSxD8XjisOgfXtXM7gd/WCxKpUIB9sNT+r96v5ceP/v06fT4He1/oj8B876+JI6xCpsAAAAASUVORK5CYII="],
    "23": ["[傲慢]", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAB+FBMVEUAAADhqz/tvljvxGDvw1/qv1LouFHntUvls0nkr0PepTfeqUfwxGDxx2XxyGHuwlvqv1rksEXhrETapz3epjbksUfxx2Xy0lP22U/22Ez110j11kTpwULVnTTPlDPepTbgrDrWmi7FhCq8dhvMjirtykv33Vr221X12lHMjy7xx2XIizK3eCx7PxadXBnAfiT24Gf232LXrXfkyabHiSfdpDTxx2X///9vPzFaJBOXVxj343b24nHy1V7y5dSYdmxzORXjqzDboTDhu1v35oDkuFKOaF3Vlyb0xTPboC737uNkMiLLq4zRn0f364/Mkz7q28u9pJj0yDf0wS/Xmyv47p70zDrzvi3gpSzXmiv48av79vH1zjzzuCfZnyzq1Ljeu43eu2n487PUmSr10T70yjjqsCz23V/24WzKkkbs3KD59bnswzv100D1xzXlpCTZnCnani3UqF/5+MbiwnLrrSX11kb36If21ULzuyrzsiLdnifPnk759sD48Kb47Zj35Hrku0b0wzLztCTUmCrupx3mtUzyzkTyrh7yqxu7byqxXiHRjyTAeCz641W9fCry2mu6eivepjfptjq2ZyTkukDknh+ycSuqaCyzcivalSLtyEKubSyvbSuoZiypaCyqaCymZCylYyynZSytbCzRlCq6eiu+fithWGsKAAAAqHRSTlMAMH2vv////8+/UCCa7////////ZdA//////////////9A/////////xAQ/////////////8/P///////////////v///3///////////////////f/////6///////////////////////////////2D///////////////////////9w/6//////////////v3X/////n1v/////QLfv/59wMNfPg3AjqFDyAAAEPElEQVRIx+2V/18SdxzH1RTnKr9hcBzh6X3wDicOUBw5rabSAlvSIDgjsNQ7wRC4NBFoCUouDcXNmYmz5larf3Pvz2mCTud+3mPvH3gcj8fzee/363Of+1xJyX+ySsvOlVfIKis/qyr7/Gz6/IWL1TU1tRUyMOrq6uUNl87AFbWyGqWSIFQkqb6saWykmqqaT+fLLspohJC2hWFYHdGEcGkpqqH1ZPyLc4p6hNr07V8alEYTA3xHZ3s7MlNU1/kT+a8UtQbUabnS3f013dN7FaFrluvd3d+gvj6qv/REvlqDOiyWbgwNWG/g62/hD7pp67OfYJQrqlktGrTAXW99h24POdAdi+XOlVvfI7PT1We/ezxHmaJaxyBkkWoQOdyOg2sLQh4bN2y/d2w9FQola6IPoGvI4b2NO0DdR2af0+W3jxx9iOXVSoIxNqIHEvQQjY6N4gzS9Tgv2LiJkbtHdkNNDakLBAfQ5H08kQE9CrnxikEzA5oKeyKcPyo+LhIu1LaoWFOvtQ1NPhjsNKDpmZD3CULTDzsQ0qjDvojLPysWt7hREZOEuTbp6U7PgOAeNcClgSLVcd7pSiSfioWlvSQ7EIbcT36YnH40M/NsbD41lK6VLyh1WBAWE5mo+LywprIWLATTQylv6NkM8NAgNWftNQZY4pOwJBZW9sfKFyAEgum5lNs7FgqFxrzQYC59RFgeL4SoqgyrSR1jhBAp97zX6513A2/tCZoYVnUo3NQWCbyaJBhTsMc6N5RyQ2EeN2B0IIThyWHBXBDq+DipYqFFGgypMB+skFUQZExa1kRypVio98VhJjZg7O0BBcqaHnC8zEK14IlgM/mTK6t0kSBACJWOCRiDoEANYHqNphtz0AAicP7lFfP6odDQNMVDC4JlAiZjMNj7kwPoBSbHEFJkTwRHWKJ/PhQ2mn7x8PEYGFgxXV3Lbi7kGGZh4dWrF5BAkCbaWn9d2NxUk9MXVsdgKpZhgF9jcwwrxxnk+w1golX9dmEvdVGLAgwFBqFj6exajoVT4zLdKJcr4z4nJEguL63ni166DWoiAkOp1SSpkmdf5nTSwUSqIQAMhBOs7ORfF+3W1n6KAyMMyq+b2RYCYFh/dTws8TjBkn73TfEbtEH1uSKCj4/H27KaXCwGtDoOvGefhwS7b4++1F3UhMsmePip7GYuLlUYbu9xYh4G2sr/duwwK7XbJ7jFiKDJalQ8sDzv83mEyOInfm/7+Ln0GBsu2zCt8/g8UILgxHgCzwP8738/+rCR4CCJLYLLZnNhPHMqD8bIyLA/keA4Fy6O28dx3pP5kpLmfnFkNuP3g5WA3318R7+798dp34fWBlEUo7PJZCaTSQK9vLSznt97++4fPkHN90RxXHwa3YpGt3ZWaX1+9/32WR+5539qtVqzmTas6/PvP7z7N5/R1uaPH6A+vmkt+b+k+gu74IHsi2XjbwAAAABJRU5ErkJggg=="],
    "24": ["[饿]", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAACBFBMVEUAAADwxGHwxWHuwFvrvVjouFDouVDksEXms0nqulLSlzPxx2Txx2TuwFrmtErksEXiqz3fqDrdpDXYnjDgrUjxx2XzzF/wz1Xy1FD12Ev110f11kT11ULyyz/qwUDluD/xx2X22VT221X23Fj12lH12U/200DpujnepTbcojH23l/23mL232X23Fv1zz30yTfaoC7xx2Xz1ln24Gn24W724nL35HXzwTHjqzHboTD35n735oT36Yr0wzHaojL47JT47Zz476D10T70zTv0xzTzvizpznXTokrLlUHmzJT59bn38K7OkCjVlyfjsjXfpCzbnyzWmiu8dhvTplr48afku1XGhiHztibZnSzAgCnmzKru3cbasV7jv17eu43q1LjJkEbzuyrqqyXw12/y5dT////AfSH38/H0yznztCTYnCrZni3wyE3ark3fvWzOn2LLkTTAfB3zuSnzsB/puVKtkomGXlK3n5iYdmzq5OLkoyTcojRaJBNvPzHyqhzxz0fds1DBjlO9lW/yrR3Qkyrv1WqpZhmwbBrFhCxjKxSaWRjoyWNzORXJiizgtELZqD2/eyuycSuxXiHfmiCsaiu2ZyTUjyO4dyqvbSu6bSbnwkj64E60cyv/71qvbiyqaCz42UX96FPpsi6saiyraizUmCzmoB6qaCymYyzYnSqnZSy+fysp7mapAAAArHRSTlMAJHCfv9f/v6+AMOr//////++ZIBCk/////////////2D//////////4D////////Pz//////////l//////////////////////////////+v////+///UP///////////////////////2D//////////0D///////9w///////////f////////////////v///n////1v///////9A////6iBA//94v8+AzhYAHAAABDFJREFUSMftlWtXWlcQhm3SkKioRBPlppaLiAeQNNxRULloohBPdzUG8QYRFZKYFKttlaCpqcUkxJMjVhElGGPt5U929jmKGF02n7v6fpu13mfPzF4zexcV/Rf1xaXLX17hcK5cvVZc8hnu4lJuGYjDKS+vqOBdr6y60H7jJpfLra7hCwRCoUhcW1fP4/EuQr4qBbtEIpVJ5fIGzChqG3lKZdMFx1dLZAShUqsIjUwCiEjcrG1UKm/dONf/NZd7W0bo9Aaj0aDXqQmZnCVMZqWl5Fx/tUSj1hutLa2tLVajQccSimatzWy3nG3kJrdartEZrK1t7R3tbW2tVqNOxRAOp8tttp+p6hKXK5epDdbOrjtdd7t7Ohiixu7x3hM7tDZ3L/nNJ9dfyuVLCL21C2F9293TB0Q/E9yvhRQDJPngFHC5rKZBozN2Id+gf9CHhnCOYYRG/KNj6D50EQiSllMJysoEckL/EPnGQ6HQuA/1dPe1TaBRCCbHkHnK5g73Rh6dSvBYIFUZnqCRENYImu7u60RPmWAUeXBNwcitAqC/TCiAlp+hccbjR3e6+4bQIBOE0HdOlyk6Q0ZOrvZ7zuMjIDQ5Ozc7GWIBf+iHuR9/CvkQbiI8H1nIA8UMoALAPxeLxeb8qKunYwjdnYXgeYjtOhyPnNzsNc6iUCAl9EvoRQzrKZrua+9EY89x8DPyMMCy92UeuFouFgokhO6XiRUG+HWivb2tNYFWcbCCGo8ATwGgEAnkGrVhCb1aja2uoGnwt7xGK29iq6+QV+FkgeQJUOEQCRtgUoEATUzDLMH89U/giMTTZIqG495EIQA1yTUqneFh/5NhZlytRr369lv7Wq1I7JhyuaMzca/vBODVKiCFFBNGKyO8EoRG2nA04O6BmXiSygOVPBOTAhNLw3iBmA3SSJkVgopwC3HfuzywwGt0QgpMPKMpHRbeUuzHCXBF4fg6lcoDJUrelEOMibf0Rg0sNUHgpWb8TAJc0W+bWyezZFGanAyRprczMiz+GrVBp6mkvRHuFBIsx6mdgqVbUN7TYqKOTmQa5FgUfax0ry0ACdZ3UoUvwHWlCRN1dHpRgJWkKf7u7i5/e42iI2yC7PvCDWpSmm1A5Cg6ba+vt6fpjcWMSKzI5TJ7u7loGDrIvjv9yFjsH2zaqeZMgq0jIc+JFY5mp9aFG4CCsvsfT78CB3Z71ObSKva210D8vZwD7FPH/t93Dv/49F16BIQJEChiL5NrdoIb7CbWv3mYOvv0VZLkBzcgLi0jl8sG9sAAe37qvMe1iSTNUTcwrExuxr4M/Z7vLyp6YImQwWgg4MYKBKJgh+Op7Nn6j1X1ZwSQ8ABWOIxPX/dlD/+66OM6AASg+WBwfn7dm9jcye5v/csnV1L50uPxJBMJH7W5s596/znfaNXB34y2Phb9L1b/ALWod6zTj8TqAAAAAElFTkSuQmCC"],
    "25": ["[困]", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAACEFBMVEUAAADuwVzuwVzwxGHsv1nqu1Hntk/ms0njrUDdpTbYnjPmtFDxx2Xxx2Xvx17twFrjrkPhqj3eqTjepjfgqTzxx2XxzGXy1Gnz3mzz3Gby22Py2l/y2FvyzlDrxEnnsj3dozLZnS3z33H04XT04nvy01TtwEDZnizIiizxx2X05IL15ob05H/y1VfyyUbouDrZnSvZnSvxx2X154v16JD26pTaniz265j27Z337aL376XywDriqC/38Kv487T38a7yy0rzxkLyvTf59r7z3Wnzwj3yuTDkoCL5+MX5+MbyzUzzvTTytCncnynUlyrUmCry2oHtxFHqqyfOkSr16q/ysSTcmiTMiyjHiSvot0/jqEDsph6/fyvpuVLqzWrenkHeu2nr14fztyzyrh/TkCTGhCexcSvdp0/XmD/YmD/Afyq7eyvQlTq+fivIkTXbv3zyqhu4dinAjjDPqWjgx5ikcjWOWSLOsXmybyrv3XG0iSj///+OaF1aJBP18fDl17OYdmzVpzWsaiy7m0uDW07Lu7WraSuubSuujC2ogyHs4cPz7N7OsE2lgh/gz6j6+PC8nza3kEK2lSqlYyylYyzanzDn0VbXukPEojDQsznkykzhmh+lYyzs113gxUWoZizbojKlYyzXuzHCnQy9lgHltzXZnizqryzAiwW8egO0eBv4zz/z31fJiyulYyylYyyONHG7AAAAsHRSTlMAMHyvv////8KAUCCX5///////n0D////////////////F//////+PEBD/////////MM/////v////////////////////////////////YP///+//////gKf//9/v//////////8w/////4//v///////////////////////////IP////9A////////////////33D///////+n//9+38X/////3////////69V7x+oYYAAAAP9SURBVEjH7ZX7X1JnHMdN81JbqKdA4JwjyK3GTRwYN0FQLnHRbiKbtCYIbqM1sdZEaVnaQFMzOWYOzFab62Jz/+K+zzl5ODaW+3mvfX77vF6f9+v7+T48PKem5r+oI7V1R+sbGhubmo4dPzz90ccneM3N9QhoaWltxU6eOiTO5/MFgjahUCTGCbJdgmHSjg8gtSf4gjaZXKFQyOUyoQgnlKQKk0pPn6ke/6SOz2+TK9QaJK0CEDGuI/WdUkNHV9X8p3yBTKE2mrpBJqNGrZDDECBUUsPZrn/Ka0xmi9Vms1rMgABBz7D3VCPqmLzF5nA6nb0Oq6WbIQily90HxPt71PIFQjrv7Edy9tqAUCtkHjgsvdfnN3S8d558vkiuNZohfy4QCJzrdzqsZpNGS48IukPhgcHzB4CjPGbABQGPd6GfJtCItovt7aQStvBdGrzMLXWkuVmMNqiXIDUOBQJoxDsrcem9ochw9DMO8HkzTyTTGhtGGLUMAdBr3bcjeugUi17hAF/UEx659uqX+xqFSr1x1o64+xJjydQ4mz/VcBEH4Kuvkb5BGoJKHKvqS0SG09cqZ8oA31YUh0YcK7EnIrH09coKjSQhkl39rqIJpyPOsRgAmfQkCzS10MCNm9/f+gE0NXFj1GGLcywGlTKp7AFALJyemcrd/hF0Z3Zm1GaNz0zk7r6z9xhgrgIEdbhHNjOfu3P7/v2fclMzExZzN7J3GYuFwmOZdL7AAq0uJSESLiw+yCEtLSzGzd2mhcWlfdvJAJVKmJskcM/yysLD1Vxudn7lkQlu975dWynafZGxzCTFAicxVVBJiD2PVhgVp40ajXqataoQrJDJr7PAY6lET+pw8caTzWKxuPlzaVqt1SqmWetFjcrUVuVySzE3bIE/3dimtcE8A09LjG1HZ5RJUc8qd+kXaZ87SBOlUmnDA2GZTOgRgYW4244GZLLUXA2nU49XDwSBi0UeIS0PepngnXG5vfQGSeo557aeOWsIIUJH4LhYLBaJSi9ebOsIHZNHRwQDCtx/3DFDDxAuEhAYU/r1N6QdMqhHeVQoemAAjPjd8DLkdeuDpFKp1L3anM2tPlh+pWLzfooaP/gKdBmAsAPiCpKdrx+iX3j19Y7XzuRjee4RMTpvGHjpQ4hbr3+zBpdi6eabnZAvgfrHspzfgNVpg+FSwhfqA2b7Fq0n3kQY5f1Z6nm19/jx4OBAJAxMaPft8vza8ttdOp6J5qmt6u/38cvJpD8SCYfDoV0Q3SZTnqT+3p+9In9Eo9Hh2BgjSMeSEF8vfOATVLieTqdT0aS/XC4nU5Cm1vcO+ciNX7symc1m8/k8pP/c2vs3n9G5wjNae+M1/4vRX1vbjmknPpq/AAAAAElFTkSuQmCC"],
    "26": ["[惊恐]", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAACJVBMVEUAAADlaFvlb2TkXU3iSDLhQSngNhzgNhzfNBrfNx7bNR7SMB68dhu8dhu8dhvIezfOczrTdEPjWUXjTTjYMhTJTxm+cRq8dhu8dhvYdir7ki/+myv+mCf+lCL9ixv1dRfLZBe8dhvHUBjAfynZsn/u3cbmzKrVqXHNgCD4njT+oDL+nS7vkCXCeR3q1Li8dhv89vH////y5dTJkEbRgyH+pzz+pDfRoWK8dhvlmjj+rUPdjCjNmFTEhzjHfyL+skv37uPnpUXMii6wMBDmcmf18fDGtK63n5jq5OLeu43g1tOtkomtJg+mCgpoNidaJBOvfUp5TT+mCgqtDwzlZFLliyaYdmyHSRfus1V2OxXDHw6lCgqlCgrxdTOJYVWzbhrQkDT9yWyXVxjMbxfoSA2lCgr1vmDcnkJsMxXqXA/2Tgy3FAulCgrvZCP/jhn8WBvTKRClCgrVahf/wqz+hln5UBbkOQ6lCgr+qT/9xWX9vVrJdxjueg3+ZBr/6+P9ZS3zRA3/gwv/ihP/kh/+tlH9wWD9uVXegxr3hhP/gAj+eQn+e0v/rpD/hg/9cQn+pIL/fQj/0sG7GQ6lCgqlCgr9dgnXLhjzYwz7Zwv7bQr5YQv4WgvzPQ/mKg7kexHxNw7wLw/KJBTLIBDCdBnlbg/3VAz0SA2sDQrGIhPfPxDXIg2lCgqzEQvbdRK/HBHiw5vQWhapDQviZRGsDwylCgqlCgrdJg5L9qU2AAAAt3RSTlMAIHCfx///37+ve0AgZYCX3///+//vnxD////////////vMP///////////////9f//////////7//////////////v/f//////////2D/////7xD//////////3D//////////9////////8w/////4///////7////////////////////////////////////9AIP+f/////////////+f///////+A///P///f//+A/6SfUP+w8p1OAAAD9klEQVRIx+2V/V9SZxjGWSWzF20q6d0Q0/BAghrIiwtCyq0XKqKg0nraHNN0giOWUxDTsAzTCg3H5EXrBClp2DJdf9+eczgcDkltP++z66dzf/heXM/9vPJ4/zl9sWPnrl1F/C+Ld+/Z+0/svpLS/V+VlZdXFBXxsQSCA5WlpSVVn8KrKiGjg18LhdWimkO1mbKutDB/uA7E9QQhkQIcaZDJ5I1NuG4mmnF9tFBIVR1IFUpKLSpQa7QNTdDK1t8UMFRCq5KRQgzHdHo4ztYGKNneL4gVWUApgTYjiE+wNQFHtxn2Q70yJwOcBCmnVsG+j/gdZdDMAaTQDhJOXQ/ffrRY35UBwfx46vSZsyZsIM6dP501mOCCOc+wExuYfzx70WK5eAkbLlkslsunsokXrDZuwJUrV7NjvoY5Swd0wnXq40y2pxvoJjeg/HtRE2Rm5QeK6/rR3vQT9XGembXuHnSLY6ioqBHpQaXIGjqg194HP2cTWsTQ73CiAZbfW/GLSyRvAxWR6aED+ux2e3vX9UwPEjEcvO1wo19Zw54iytDQBqAymeoNXTRv722HLroGuDP429Aw8rCG3fxDLpFQ6z3WRu/O9k6Kt4/4mHr07tj4+D0/QqyhmD9x/0G1TKOb7DzZ19lrz/APA0ZdQ+NU46PpmcdK5ZMhZ77BVS3X6owB34g9y/smjV6tUOR6Oh2cxRvwHqfrYv70UzwmHEE5Rlhep5VVP7g/MTf2DLc+G0LzOcMcNSa51ks5fA+xfAHMa2R0wMwYNd/PQuh31iAI4gjcBeWYDAR8AYxjXiunA8Jj49jwJJTr4Q/BAo5wibBDo9MZaem8GhnmqYBg5PHg4OxtZM2tg7snnHHIscWrw/JqtDIhxeOAaCw+NLS4xFmHw25BcGaadggbr+r1erVafQRLPTX1/G44Gok7/C/IvN33MrFAO2rUsE3JV/HllUWSTOV65vFeJ1ajwZm5iVEQt5pMRE4SkwpvDCpgDb3h7Fbby0Q8Egw/ZzasUnmCIFqyF4AYME+mUd6Re31DEIsE15ljqpBSYzEwh/w49JBkIi8AR7wNrcYi62CieRUk19dHIXMG8WEYJpdSuWVmjkQo1BNfAPhToSQMMBoOB4OvkvgqVODD8I5cSnMOA6MN7Fh+n5mY7mg0GonE+pN0RfNvtl+Vm2nnsKP/Tney+30MKx6PL/fX1ta+W6V5W4HLdTOVcq84HI5lWg7Hit+/iKeHXEsV5nk8sxWlBX6/fwXLT9EUvuREaMv2iRdlwINQ2v2CEUn9ewgh61+febPMtxBCzsTaB0qJUArjG7bPP3PzW1aU06bZ9i+e0QHzxpbH49m4Oc/7X6z+BtQDj17RpQejAAAAAElFTkSuQmCC"],
    "27": ["[流汗]", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAACH1BMVEUAAADpuFHxxmPtwV3wxGHrvVbouE7mtEvlsUbksUXirUDfqDzxx2Tvwl7svljswlDlsUbirEDhqz7xx2Xxx2XyymD00Fj22lT12lH12U312Er110jx0Enrw0TmtD3hqDjfpzrcozPy1V323Fr23V723mH221f11kT1zD7cojLdpDTkr0XxxmP24Gn24Wz343L232X1zj/0vjXdpDTani335Xz354L36Ij354XssC/coC/Tly335Hj36o347Zj47p71yTv0uTHtpSz48KP486/59Lf48Kj365L110b100P0wjj0sCzzoCPHii359br5+Mb0pSXylx3Znizuwl23eCqkWxG/iDLLmVLq14710UDnkiDZnyzYnCrFkjOHMwCyfEjy7Lr598H0tS7zniHzixXFhCTas0ndu1rbumW+ij6OPgnk06HzkBiAQAe/gyPx5aL0qSjSdhZ4OwaHSAvYmijUsHzPliu8eyC3ZhGxcxzSliqdSgb0xjrx56mubi3HoGfKnUTasDvflyaieFSabESwcCi+hyrMtqKSVRHKmjqPUQ328On///+FSxmWVh+uiWh4OwbZyLl4Owb0rCmpZxZ4OwZ8OQXm2tB4Owa9dRqRYDXzmx/JYgiaWSHcojLzkxrzhRLydQiPUBrycAWpaCzZni3pcQqqaCzmiRnzgA60bympZyzxeQumZCzccxLsew/JdBypZyzJkEbJiyuzcitZbaehAAAAtXRSTlMAEGCPtd//77+fcCD////////PUNf//////////////++A/////////98wOO//////////YP///////5///////////////////////1X/////73D//////////7P//////////////////////////////////////3D/////////////2///////////EP9Q/5f//7///+//////Ne////8g/7/P/+///////5////+A/7+vkMIFXAAABDBJREFUSMftlf1bUmcYx60ZK0XRreTA0VjyctCUAwdBI0SOIPKWQUMdkVhAuBwxfCSZxZi61DmPtaK2iEyNZVDOdNsfuOc5dgWa2m/7Yde+13V+4Lq+n+d+ee7npqzsP6gjRz8pP8bhcD49fqKi8uP2o+Xcqqrqah6Px6mpqa39rOLIofbPT3K5p+rq+BiGCYR4fcPpWtEXZw5JphzaG8USqVQqEcsQQshPi0RNzQf4z7ZwuY1iaauCJEmFQimBCE6oKJFa3bZ/9i3cOr6kldRo29s7tBpSIRXzWeKcWnd+v/O5yK/Qd3QauroMhk6tXqEUoxhGulun+7CQSng+JmnVtxtM5p4es6Wrt0MPY2BCq83ucOp0F/YCJ7l1ArGS7DBY+i5C9Zm7OrVkq0QGQ8hpl1t3ac+VfMk9JWzw9A8MftVzkVWfxdCuIZUohNfucF/2Xdnd0JaqesGQH2n4KgtcexcC1W0MBEPXfWd3Bajm4QJxeOTrG6P+0W92ABNbxbucIjeju0Icq7bhmBiV/O3wDlEKqKjYGBiPl1RRyeGxAFvzLf/oVbbqHaB+ItHf/10/AJO3i0AFpwEBSlLbazL3DfuHr/WZTQZUA2+SLezOTQDGS3I6wUnacNRVTSe8hu9TP7AXAbs0BUtKTCepGfDjXTBbBI5z7BCQSRV6LSQsFrPF1NUL73rK759ja5gE8/PgpxKghvJahSgnDZwMdjSgXzPi9y9gbJd+BovMErhXAtByAsdkUnb0OpHa4fgt+IdkAjgbxnNgiWHug19KgIAR5oTB2Sb1Gq22Q6vV6ElFY5idcK89Du4zzAPwsAjUpikvgQs4A1A3oKZGoH1gYG5uLhqNJuKPwDzDLILHxS7VdtNGm1X4yP9eYWW4+ONX8BvDMOBJ8R5E3WlKReAN09PT4fACDDPUKBFPI/miiUxmHEA/cxe8B5pFImcgCZMSCjC+TMxKxmcfNSG3B1zgKQKeFoGyJpE7RkPCihAM47NrQ4BDv8pOx7Lj4AHq0uOS2VDPZNOIIHCIIAmFOG4lbHI7nQ5GngGkJ8sl7+G5OgIJu9xGwCisrARBeJHfubK69uzO+NLDF6XzfUY9E8rGAlRSBREIwc/mlSepQCwI/bncWOr3PW/6pe5yKOty0FTSKFd5vV6V3JikaIcrG0H+9dSrF3uA5ue6fGglGHMEaMoORVF0wBFzukMF5H/95oOtUXZBp8sXQu6gK5Z2OAIORzrmCrojqxs7/j/22WRtPl9+oxCKuLNBpzMYzLpXQqvo+Nzm/n64+y75Zt6uFQohpHx+tYBOz61vpd5sH7CNK6+gILm1tY2xDNQmso+9Ts0uH7zw25ri8Zn821zm1uLi4Nb65pYn9Wr73qF/KW0v4/GJiURm8M9MwuNJzX7EziZ2+/xf16OJhGf27+3lsv/1L+kfLC5pMbhMsJgAAAAASUVORK5CYII="],
    "28": ["[憨笑]", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAACIlBMVEUAAADEhi+HMwCHMgCFLwCJNAGHMgCTRxeINAKINAGBKgC2cybRmDnirkPlsUfirkTGhymoZiyoYiOELwCraCfgtlbqwFfpuVDkt0e3dSl+JQD1zWnyyGbyx2byyGOvaRmJNALXqUTzzlTuxUzWnC/jrj7fqDvzzl/332HDhCXuzEn23Ff33FD22k722Uj64EvisjbKiyXpvDvbpzrcoTDxx2Xz1Fr23Vv65Gf/7mr232j520T20j/vwjfYnS7ZnjDxx2X24Wz343b35Hn21kT1yjjuuzHfpi/ZnSz45oH46Yr465H56YX100H57pf58KX58ar57p71zjv1xjT587H697v8/Mn49sP1wzDrtCvsvlj343Lw45/iz5vbxI/v57P0vy7krC3ZnSvYnCvuwV7hxXSXThjQp3COPQeVRgjWoy30uSj453zz4oqRQxK+kV7p0nm+fir0vCvsribWmirru1bVsWD//9y2gkj+9p93GQDDhDjHlC30tSPeoifWmSq4gjyfWSHlpybTtH+ycizzsCDlsEb0rhzXmCXLjSrTkSTBgyu+fyu3bxnCgTW5dyq7dhvwqBu1dCvfqjzMiyTv2bz05M347dz58ePAfBzloB+0cyvZuKDcwrLfyb7HjkqqaCzboTGQQxSnWg+oZyyfOwC4RwHqWADwYwX/YADKSwCsaiyraSzSly7DZxHWag/mZwqlYi33vCimZCzIiiu2diui4fNhAAAAtnRSTlMACH277eWlMEH02D0QGEMmAxyv/+37//3/+P8zj+r////////6/6L/////////////////M8j//////////+BRT/////////93//////////////////////9///////////+f8P///////////////////6nZ////////////9P///////7j//+n/8Ob//////9Rp/////////53/////T7n//4f/////////ZI3////V/8W1soSlGgIAAAPbSURBVEjH7ZX7X1JnGMBlpaFxETFBVng00INcj5gkgo6bxP16AKUL0DINwoHO2gpNi+FIFJtJmLacqTi62vb/7T3Y9gkE9tl+7vvb4fN8z/M87/PynJqaL/xXcF+dOFlbd+rvR/yJk/UNdfgqAr62HtBwmkAkkciE0w31teCHuipCI56CIzdRm8+00Gh0WiujiYyrwZ+qWtTXZ88x26D2jvOANojF7iThqoWTzzKZXTCd083l8QVCEdLTwxZ39laOJ11gdvVJ4Iv9UhiWcPlC4YBMLhIPDlWK/+Ycs0sCK5QqlUqpkMJcPl+glmmGtaxLFeP7JFKlTm8w6I06pQKWAMN0ZDSWaxeLV6iMZovVarEZjCoFyCFQm+wOYJSpiniB2ceVKvU2J+pyo07LkcHDivKMaAfJx4RRZgcf9urMl69cveZ2oU6bQefta6d3Yyl8/sD10tMlfsvkc2Gl4cYYgwHddLlQi1l/ZpzBmLglsGs8QW2g5HAbR1s6+Fxp6HZ4fHJyjHrVhVpt341BEc74eI9J44lOBaaL+yZ836LmSxTGGWjyzp0r0F03av1h5sd7/f33Ic6A3RGNzc4Vd0GinRdgwgPwcpd7fv4aagFCez+3m9oGBF9sIVA8jFFaNxCkoZm7l1G36+FDp9VmvvGo5SKXd1+kxoR4YLpI+IluEoAevLrbNqsTRVEr6FlXmLZAgB1TLLH4c6mgBqekCOkNNosFDM4M5uCVSj6NrpwgU2M1eUNGgxkALkeocDkE2ORA08cENiZwYalXpTPq9eAuqbwKuJAAGzUQko9LBLtJLeDRxWJxewExxi0MrVzjC8YTyFKR0MmWgxQ8JLW8fO9zlpdX0n5MWOU8KRJ+EfeAFMK1yNP1TObZEZlMZn396c2sH2thI/K8SOgVizR2k5CV3tzaevEPW1ubm79mhz2gomTry+KFtM2W22UD2ux8+LfPCIfDaQRreTXyhFB8+4bEIoddZue0QdQidtKzWMvJR69K/nS4be0wMLTpHYgKQbt7gF0Iok6kONEglqCZcmxjsPw+h8aeBAa0t587ODjY/313IpX1g/gEkn99fOm9Cfh9Ho18Lb2zt39QIPc2lV3A4pP5pjLrjLAd8Ec9DsdiNv3ufS6Xe//ubRr5FP+BUm7NEIER9Hkc/iQnnQKkkcWRw3hidS3/ocJ6BYZ2Khj1REcWZgELU4exeGKDk/9YcR0TLs0BJRY8LBDDwtdW8q8oVdZ973QgAF4dx1jdWOSs5D++xFX/BvVeH5xjJREE4URWWpub/iW8oBCH3vyx9Hhp6c/nrym4L5/x/8VfSohb4nIyGr4AAAAASUVORK5CYII="],
    "29": ["[大兵]", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAACOlBMVEUAAAATehATehATehATehATehATehAbaxATehATeRATdhATehATdBAXcRMWcBMVbRMUaRIRZhESaxESbRATehATehAUbhEZchURZREQZBATcRA3gjRon2VPj0kedRwSYBESXhKivZDG3cWvz699rHtAiz4NTQ0LPwsMRQxTlFLR5NCPu44seicNUQwTehDd692Gp30sbiAifB12m2AQUw82bydFci4TehASYhIKPAqWr34TehAZbhcPaw5kkE4INwgVVxUTShFdekcUWRRCbSy1vYQTXBMlYBw0YCPAwILRxX/dzoeJlU7614b+24ekqVry0nyJpUzLw22PlyyGnShPhBovhBlkiB98eyHboTHgpzjkrDjyuSrmuS+8tC3JtDL4zWXqvW27eyvepTb0wC/0xjP0zTu4pjIAGABxijq+zGS9x1VAVhoPIwTpwDf0yTf0wjHzvS350oTTmz/aoDD10T+ZjSlsbyv24Gj343T23mDmz1I9SBQfLwjGqDH50oTdpDTnri/11kTXwkj23Fj12k/12EjBgiv11EHjqiy1dCvIn1z40YPSli/epC+ubCzermfSrjPYnCu0dCv50oRpTBc5KRBGMhSXdSGsaiynZSzaoCueUw1uUCJdRB2HYS2saiv50oTany2pZBTAgh6HMwBDKg53WCaQZyk/LRI5KRD50oTptC6SQQXLjilPOBdcSCXZnSz40oTEhSvYnCqrbCo5KRDQkyrRlCo5KRA5KRCwkli+fis5KRDN0xmgAAAAvnRSTlMAMIC33//PEGX//1D//////////0Cf////////////////////////////////j///////////7////yD//////////////////////////////1D//////xD//////////8ff////////////////////kJ//////////////pFD//////////////zRw//+///+neP/////nIP//////YMXP/////////4/v/////6+/IDC/lJ9A72Dvz4C/mxoWWgAABApJREFUSMfllf9fEnccx1H5qBAIBwp3oEJmIoplhXgg5DkUXYk515elrlaKbGt5QLI5t1U6RaTCRXVU+CW3uWwz3dastbX/be/PmQSCbj9vr194HI/n897vz/vzuTuB4L+ZnNw8IUIoPy8351/QBYUYRiKxCP/kF/4TvwdwkURaJJXJCYVSgpCweNfblwAuVRUVSaVqtYwgKVIjQrm78Plwd21pWTkIm4ZOT0hQyW68dm/Fvsr9fAW1miCrDNWUZkcjH4mNFTUVtWUmXjCVy8k6g6GKVO5gHEBi7cGa2nIVvwaput4oI6lqg4EkD5n2ZOGLkehwxcFSlUr1etH1R0AwY6HB0liQrSFlZU2tckuQqiuxQFt5QZTZVCGSaGv3lSvfVCi1yUnabLVCSxY1aspSwFi7X5lSocxmInXV1moaBHtGiRwksRuNDmVKBZPtKG1otjJYkGsaM0bksBvLHakViuptLc3NZkYPayAVKG1QxblCkcNucqRWkBJle98ymJ0gtLaSBBKWNKVMFCGJQ4H5pCAjCLutrcHFMPp2S4eehMMrTM42D8lJwoGzJZjrCDh62ra2BoYxt1padKTLJUsewyakcrroTZ4XdFXWZuBp3dG3j3VYOyztVSTpZBiRMNkRzThdbypQBitsF/B615Hjxzs7MK9nGEaDkgIBgh53pVAoCIKqqzNTPO9saT3m7jpxSA/3Zxjx1mgLGpFETrtcepqmKYqEAM7zQLV3dnd1dTIMLRejA8ld4x9jjUpB0FsBnOcZxtX+Tre75zAAeSkn8N2Tp04jPmKJRKNSQmtyuUyj0fD/ne5x95x5L+00ne3t63//3MlTlAOlR0JRdWfOnf/AfeFi+tEY6Osf9Ax5P8Rp/uhjnEuXPuEvLw+zPn934Eq6MNLb7/ewwU8vA/HZ6OeQ0dGxL76Eq6+ush6fvy9wLV243jvu97FDwQmv9+vJsVHI2OTkVOi81xscYj2D/dMXAtuO60Av9MQGwxOh0NQkn6mpUGgiDDx0NBO5EbiZLtyKjkNPQ2BgBQdw4PkC/unZb7YLgoEoLsEboIQwDvztq7dhBbHZO3czhOvRqN+HDV7BCYfZexzHxe+PRx48vBbIeA2MJGYGfSw2gmGcYHB4jovPL8S5+OIjwVKmcPZbbHhYdnjuu+9x5paXf+AWHq/MP+F+FPy0JMhm8F2tPl3ezNO1+xy3Pr+4ss79vH0fNo1fYolVn8fDziSgQGLV4/HBIuILYCwG7mZ9v16JYQUcHB+MJ7KOjccrNwK/Zn+DP/stFotFZ1Yh44m1SGR24znHPVlfcC/t+FV5MfL7GmR6ejoSebDxUCB4+QfM9s+bu325Xtx6defixqtHz14/kS//el4g+D/nbyhuTRATHsiMAAAAAElFTkSuQmCC"],
    "30": ["[奋斗]", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAACZ1BMVEUAAAD1AQH7AADeAQHHAwPxAQHfAgLHAwPGAwPvxGDntk3wxWHvxGDrvVfqulLltEnlskjepjfirULQlDHFBwTxxmTvxGDxx2TuwVrtwk/pwEXir0HdpDTSDgX00Vf12U/12Ez22Ur210j110X11UPvykbfqjvZni/epjbQAgLGAwP23Fj23Vz12lP20kDuwDrltDffpzfaki7YTyjtczzvok/2slH3uVz3vWP22Gv24W324Gn232X23mH0zjzWiCnScSTCGAnVGg/tGxb2Hhz3JiT3LSv3NTT4Q0L5UVD5Xl36aWj7eXnBGAnGAwPfmDzKGAz4PTz4SEfhGhP5WFfDRRLAMA7RXx3YnC68dhvSo2D////91NT7x8b5wLnaUiT5mX34lGn3jFbbglT37uPAfB7zuynfpS7YnSvVmCvuwl7bpTPkx5fNmFTcuX35+Mb59bf48an47Jj36If24nLHiSrmzKrzvSzusSfYnSvZuJLp2svw4Z3fumHDhCnKkkXGijbzwC7ztiblpibcozTuzEyviHBrKQCxXiDTokeISBZ6OBDJhiT1wTDt5d9xKwCQWTbBgCmdbVDzsSHcoCzSlir59PDp0YP0xjX0wzLztCT221XSmTTKsJ/cxrPTpVPBoo/VqXH0yjjuqB310D/Ypj/37J/yqxzVlyjNkCroyWP365H0yDbMjiv35oD26I335HbirUH1zDrVkyS8fCryrh++fivlnx/AgSuxbyvGgy7Ceyu0cyuqaCzrtjKqaCy7byb96FWsaiyoZiy3aCSnZSzany795FCpZyymZCynZSyvbyvAgCufyvmxAAAAzXRSTlMA3/yfQP///xAQUI+/7///v59gEGhApP//////rzD////////////fQP/v/////////yDP////////////////3+/////////////////PMP//////////v/////////////////////9w3///////////////////7/////////////+A/////////////////////zD/////////////////////////3/////////+//////8//p2v///8w/9P///9Q/7fP/++AIJe//uPZ1QAABHpJREFUSMfllulbU0cYxRGqKWgTaaoJBLjZCNYsEBTbEogbyGLTIlZxSGmrhXBpQLZAUGSHJmoiRNBmoVu4ECsJ0hBAJCCkblX/qL5zwyNhsX36tT2fcmfOb94zk5m5Nyrq/6Id0Tti3vk3QHT0zl2MmHe374yN273nPSaTyWLtjX+fHW6LwQDjg+3s+/ZzOFwuNyEhIZHF4vF4SXG4NfltwL49HA4nJYUgCL5AKBKnJvIkkrQD0LFz14eMg1sixe7GdqlUJpNJpXKCD4giPUOpTGJHgZ+xZdaZhw5nZR058tHHn2SrVDm5gAiAUKcrjx5LZjAObgmUfPzEybz8UwWFRcWnPwWdLi4qLDiVn3fyhEajYXyWvNn/+XFNCQD5BWdKgQAVF5WeKchfAzRbxo89pNGUnM3DJYD4AoT9UCDvbAkGNJmbgP2crHPnIRNNFJaCCsN+XOD8ubKjFzatJ4fDQ+Va7ZcVX5V9/Q3WxYuXLh0u+7aiQqutRFW6arJmA/AdJ0WParVYdehyfX19Q2NTs6EFta41GdvIK+wIfxyXK5Cgq3RvO0Ll1zDQ0Ym66BZtN+rp7SP7I2fAHeAnojrc+b3JZEaotqHxOkI3TDfbtTiSxaprI9MilojJFPGlFgS9twZNpqFa1NVwDdmumkyDtwEoR6RVNzxC3llPxEwAgIVsldq7g4ODt+8C8AO6fAv/1mpbUZXdoXNGZupnpor4rtxRZGvV/nhj6Kcu9HMjVGj95eZQe+WvCGW4ARgj11d2L4sS8eW5qnGEUF1dN0LdExNNHfRDF0JVGRQGPPd+iwAUIgEhyzHcv14Ftu6Opommyeb7o/jBoqfEai8N+CIriIWENFdlmGp+MNkEmnzQPDWdDVsWNjnsWK8VAy1vgN95lBgyyXKzp6cAATVPgV+FtzgcCspv79ENe2Y6IwC1QiQkXLKcbAMgWNMG8Muk9CmCKRh7hz0tgQggHZcgpLJcFSAggwHyyKRy8IsgkcPonPV0zq0vqyRdrRALaSJHpcrGJ472EwKhOJzI6ZkPPFz/4yQZbigBhAuQsGRSF0Hgm4AuAIlmAgtvALZSYvcraELukoblkhOp+keLPkrtxgVmPbbg0vpmilcue9WYAISQYxGEZNGMNeoPF5gPPo7YrQeUSocbCIwI+FiSFbN5hTewOiAAPy7QGVyIPEAX9MtAUGJAgBEmwuiPBlYFCjVMgA60sQDcGXq9zuH1UwqoIqZGYfREsEN+7IdAY4HQHxsPdf9ItdFhd/vVlCJjxfxkfFVIUWq/1x72e2yhp5vvmWcj1TorRnyQhhCo1X432K2QH/yW0GP2ZoCNCaN1GYbnPQez107be8E/Zgm9WNp6c7OfkSNtuifmRULhwLL2GHUw/CzOv50fiCSS7Bsdf241Yul0eHSwzwS3ybOmmiukPr3N2YvldA7T9kAo9Ofb32WZ8SRJjvSNzWKNzc9YgsHQ05d/+/rL7E+7N+Pz+VpaOgOBYPDFq5f//Mq8U/Pw9ZwtMPf61cLSf/Mr4i+ddOjaJtqlkAAAAABJRU5ErkJggg=="],
    "31": ["[咒骂]", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAACOlBMVEUAAADntUzwxmPwxWLrvVjtwV7puFDmtUzksUXouE/gq0DbpD3xx2Xxx2Xxx2Tuwlzqvlflskbgrz7bpjvdpDX004Tyzlb110712Ev12En110f11kTyzUXnxEXgqTvbojXxz1/221b23Fr12lD11EL0zDvovDrdpDbLjCrAfyv23V723mL24GbUlCm1ZiexXiG7biXXnCzNkC724Wz343T35Hj35X324nDAfyrbojHYnCzQlETSmzfWokn36Ib36Yz365L0yTj0wjLirTPcozPwxWLis1Pu2X347Zr48KT47qDLkDL100D1zz30wC/boC7kvEXlvk66cDHs05X59rv487P48an0xjbzuiripCf35oDOmVf04rD5+Mb5+MPrzmzZnCrZnzTHik3CgjfqrijjxpfmyHjQr0nztCTYnCvwyE3jwYj48qzAjkRsNgteJQGUZyfSupXv67qpfk7zsSGEVSHm1p/HqVTirUG0kUXizamgdSbpox7mtUzyrBzZtn3XlyXFhSnDgiK8dhvBexzx5dn////xqRu3divVqXHu3caeWTCxaBWxcSuZSQiHMwCPOwajVg799/Hq2Mi0gGDgmx6xcCvDmYC4eCqsayulZkClPgDSUwL2YQP/YADZlSCtbCzajmD/dyW0cyuoZizboTD8jEj/17+vbi7ASADhVQD/pnDQcBP88deqXxKqaCzSn4CmZCy8jHDbbA7////bt4z////89uzRihvYvKXdw67////FhiqpaCwZzgXNAAAAvnRSTlMAMHCfv8//37+fcCCA5///////+o8Q////////////n////////////4D/////////vBD/////////z////////////9+v+///////////////////////////////////QP////////9g//////////////////+A/////6//////////////3/////+///////////+P//9I////////7////5/v//////////////+P//+A/1Cv/3DPr3AwveN5zwAABENJREFUSMftlftfUmccx9UWK11HwQqVRA8IGiIn5e6Fi5iBCt4QBHId85KlS5uazTEVDx26a5qp89bUijbNbe7iNve/7fsckltm+3mvfX7gBa/X5/29PV+eJyHhP6nEpGOfHGexPj1xMjnx4+6Uz05hqalpaSwWi81mc9JPpxxpP3MMA53lcrkZmVm8c9lsDp+fcwSSdArDcnFcIBDguFCYkcXLE4n5+QXnjwifi0sKpUiFElzIzeTxREUy4kJxyaH+4xiGC6RyhVKlUirU0kIBLswUXyAITZG2NOUwf1lZeUWuQqXTGwx6nUohl0rwdLCLjZUmbdX7OS5WE0hll8wWi6XGrNcp1dJagkjn1VmNNlN9aTyRhGENjWllTYSs2W63tzjMBp2ympA1QOd1Imerq/503PgxjIsXqt06DyG73Nb2ud1h1l8hiEZog5dnddpa68n22IKws0KBVKkzt3iIq21AtFgMHURFoQAN12qsbO0kS2O2ITU1QyiRqwwWe1sT0QWE3dFNNKmvXcvmMjXZelzk9SjgZNqNDFSRwWFv62VS2PuuEl/c7O/vHwgBkKI4CqhOywoBzbe+hBRMBplssB+JA00Yba1DJBk5jHbWjSzU86VhMAzehpLsLZbu7hHkv4m6hiZiaroDAGSQf8WEHIUh2ftqDDrVyMDw19mwHwzgJXPCwDescwBI5EzI/ttwDn0WdBBqOGzhQYaxokgTJ9h1vAwYq2JkeHhg3NHX56gBv1shh32CKR0ABTFAphBqUrr1BrO5psaM/KEE6KhDwEQ0YOVB1xKpWulGu4e2D/woQbZJaxKhsQ6NTfiigTyoCREKlVsHcqvAL8U5kxTIL2aAAk0E4BjreFnQhaSxlvLXVl9Roj9EYzlFdXTdpT3UJFQ0FPDdCwM5HCekyBQKG6h3mqxFse8/oGn67sNHlAta8Goeh4FkvljEpJiknkxNTT/tuO/xeMZHZ8A++2xq6gk1ARXNaZ5HlptvMlqBEFOPppBu0SHNzj9EPwGAigoWFiO7VMWvNEJRYuopA0wPzs/PP/sWfV1aXlldptaGxgILL6KWLznf5BRZ8w6AsKa/W18FARAo2tiMAkpe5tuAiAOWll7Rr8G/Qs1BgmDMzXFHa6p0Gp3vekCx33wP1vXXP8Dnlj8Q8AU3Y//UVdpOm9Po0UyH/G9WVsNaodYCc8EXcddGolbb6dymZ98y/uXVaL8/4N3YWYy/l67X87dpuos5iB9fRfzr4z4v+H96/+pLBv9lF0W9nf6ZngmH331Ab7s2djYPuVt/Qf4el5+ifqXpAztFNcNyBA/zJ/xG//6SJDt71vwA7O7ubm3Bnu5510Zp+o8PvQ8lxSRJujohKFrqvb0575omuPPnX2c+/KS0I6SXnnF5vd6JIs3CRvDx4sceuf3S8t6KAp9PA/Z7z//+N89oSfv+edD+YknC/2L0D3kssbBN/ZikAAAAAElFTkSuQmCC"],
    "32": ["[疑问]", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAACNFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAADcpT7svljxxWLsv1rrvFfpt1LntUjgqjzls0nirUIAAADvxGDxx2Xxx2TwxFbswkvjr0PfrEDboDLouFDvw1/zzV/21Fr221b12lH12U722Ur110f11kT100HltjnepzjxxmP23Vz23mH0yznXnC3EfR8AAAD232b24Wz343H11ELcrTPTmCfMiyfHhCPXmyosIAr35Hj36IX35X3Aeh+8dhuabR/465H47Zr476HSnjrBfyfeu4337uP////q1LjNmFS9eRrRkSbar07ctWDu2Ib487D59Lr48arkv13y5dTmzKqsZhNgPQ9INQ/wxWPKkUbv4KX5+MXEhSqqlHju3cbpzHjVqXHav6+lZkCtc1Dm29W/v7/iw5uNPxCGMgBpTSDQjzHSo2B9MgZfJADIdg65cB7BcxbEhzjhzL/Erp9wMAjAdhfIdg7Idg7cpULZsn+8jHDr1pXz6K/OgBPIdg779fHIdxDksESOaFDq0IjIpY/YezfrwDvDehzmhE/qujP20T7VkDrOfzT3i27ptS70yDfaliD1zjz/uWv/sG3+p2/+nXX9knXymVzrrCXhoyPzvi342Wv40VP8wmP5sF31uT7ztibyrx/zsyPtpx3Wjx7Idg7cozP0xzX1wjHzuinhmhvIdg7osCrcoCn0xDPyqxvIdg65eCqsaiz4n2WxcCuraSytayytWwmnZSynUQSsZybenCSmZCysaywW0E0wAAAAvHRSTlMAv/+AKN9AIHCqz////9OvcGhgz///////XDrf//////////////8Q////pBCf////////////UP//////7///////////////3///////////////v1D///////////////////////////+AWCD///////+/////////7/+fv///////QP//////////////////////////////////////1Yj/////j/////9g/+///4D//8//MP+Ppy8xy70AAAQjSURBVEjH7ZX/X1JXGMexmuYUW4WoWRflW5crE26iQzhDu3ZTU9CsRjh12ZT8lrY8ac60VYj4FS1Dmg0UAy01zWnl+ud2zr1AOuw1f98+P8Dl8v4853nO85x7BYL/hOIOYR0+KH7k8FecIe6gjvhDEX0BSDia+HVScrJQmHLsm4SwIT7++JcMJ06KRKLUVLFYLBSmpaWnZAiOxMXF8bZ98FOZItHpM4REIsnKlsrkYkW6MuVUNLEY/GwiwgmSVKlIkiA4C6VQKnPUXBnfxsfwJ1F0MlejRdLkkoQkiz6Xp8vXFaR8hzfp+H48odLoC7EMWo2KVBgBp/zv980H87lag8lUVFxkMhXqtecBU3KBZS+WgrJydWy9iaLT4vT0SxWVZovFUlVsKqwGzGWWU82Vq9diuvaDKEnHJ2C9brNZzMWmWhDmWfbH2JTOZiYbQWlNXV1NKWCwo6oeNCD0pxuNN1n251jDiSQjaOLDNQHGYrOZK8BF9KPZbm9k2Zu3rt7K2GvIbAElkQRKQCtnqEPXbe1tN7hbeeUdtzt3dTjJ2IXZO3fwZxeIGn6524xSYlu7Ida9qOVoD+hF9+/b7ffRVy/owzX0slExsOVX2/WK/gcRx7EeLqNme/tdroo+c3ERwwxE+KZuWF+FVAkHw4aHvKGxrf03LuNHqHeXgDXsuAy6YaoGSwnDHRSmgVb0z8Djx5hpBZVFpkLDedCFN2qgBIAn0CHFcsAh3pAmzP/cpgugFo2GQa9RAsCUWgEwOp1w2IU1HDUoFNEEBqygGk2fXpurSh5hABh1jo054fgE1iQMV52S5s4DVryPbJ0VjBj0ejTgKvLM1PTTZzMzY889cNaLNPu56HTKlYfGqKEBZTAy9UKrwTwh+X0OWV7+4fX19/vnFwJwMTK1r5QON+0cxbM3+nx66kUuOnQEOkFSGe1yB0NL88tc415HpzxDqXyz8gQlOzPz7On0HElyODqjMrmbWvX6/Gs6MPh212gIAlwEJ2eYIxAtyeJ5F4UX8C+sb+wePfUi7OmzWVrgu3cvU7M4ZaNdD/N4gcDmn7sNr2F1UbHZ8ggO0zJpRDIZzfNL82togd2HVA3zNFpDoaketYemZbyys+UuN8/71/K39iwwBB0SAj1f9HCccrvkcpqm5Y7t7XPUxCrPT269F+w1KGipNEtCwDfBCYpyI9FlHz5su1a9PL+58XHveXsQmKBccpkDeryh1WAQzYALGa5Q3iUfF/+fvKADLntDQWoc7viWvN4QlqOsTMHhC/mxvEBwD/YvL3gCsGDF41viFQohHIVf33r/cZ/HdscibtzgqwJk8cxj+RG9EFjf3PpLvf97pHNoCEVKyClAWpnd2dmZ1DEI/9T5b28odUZOuU5XW8usr298uq0+2GstYQirU/C/Ivob0UKX63Ab1jEAAAAASUVORK5CYII="],
    "33": ["[嘘]", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAB+FBMVEUAAACWSxaHMwCHMwCHMwCHMwCHMwCHMwCHMwCHMwCYThjpuFDxx2WqZSW5dyrpvVPmt1DltEnepzjTmDLanDDwxGHvw17xyGWgWRbSmTbuyFHuxkrfqTrirkDepjfjrkLwxGHyzV3001j22lP12U712Er110X11kPux0LqwDzepDTYnjDvw1/xx2X23Fj23Vz23V/232L100H0zTzqujXeoS/CgSe8dhvLkTH34nX24m/24GjRkyzAfB/OiyXksTXiqz735oP35n735HnjpinboC7ZnizVqXH49PH////u3cbKkkXaqVD36o736Ifq1Ljgv5Tsty7vuzLXmSjRoWL27ePx35D47JX0xTPYnCvxx2TSr4bixn748ajs0Hf0wS/osCzanizdtmr48q7476HNmFTzvSzZnSuDW05aJBNvPzH59LjLu7VkMiKYdmzztya3n5iCRRbu2IXrvFbx5Kr47ZzFhytgKRT0yDbzuinzsSH598Dpym6qZxr1zz3zsyTUoUf0yjjqpB710T/Idg7yrR3WmCzEhirksEX110jSlSrUkyjPhBf0zDryqxu9fivlwGzaliG2byTDdRXepjjUjyGraSzhqzKwbyvUjRqraizboTKoZizany2mZCzLexHhmhzqrielYyzZnSvBcxb46Ib22U/1yzmZYwdUAAAAqHRSTlMAMKO//99AEM9oIEBcx/////9gECCE9//////////vnxD/////////////jzDf/////////0D/////////////cP//////n////////////////4D//////1Df////////7///////////////////////3/////////////////////////+/v//f/////9///4BAz//v/////7/fMGD///9Qr69AQEA35SZ0AAAEaUlEQVRIx9WV61saRxTGjRI1toJ35GYSF3YDaRdWkJGLKChtiELU1EIaARUKWpKS2mi8FcUdbYlAoxaDtPHSVv03O7M8Chgv/dieb2ef9/ec95ydOVNW9t+OW+UVvNvlled5VfltHq+66MPFqOBxcecsr0ZyhFRcCdRUVpWV3eHxaj7hopJXjfKqyprrfX1ay+MLBIK6+no+r7ah8YYumppbhHWtIrFYIpEIpK0iWdvdpmvk95qFQuH9dgKFXK4gSeqBUiZVPbyyymefIzmt1jAMo6FpAiFUh1YnVbV1XmEeycUiPeiqMxiNJkZNy5Vm0G3p6VGpeq/Qt0u6AY4uq60PISIuAf06lf2Ly/Xt3eDLR47HA2DQ6bIZBED/xOEYAmB4RGV/+pF/pKel4CsHilE9+NrttOnBY5wNAYtn2G5/dmE+3wjbCU0XGMUSx3Mw5nX7wACXOPTA4x+3T5TOqll4X06bAMhLnoDJQNAHhvLZt0DnCfWHS9q419KiINQc8Ghq+rvnYDLi5YAXL6e/54BoOFz8B5tbxAqCMWJLr6anp38AYxHvDLY0hbJWoPX4o6UlfhSQCpoxDqKmX3GS1xHv7BxqGgFvgFk7719YDE8UjUggIOUIMKCxjk6hApNLCFhGY33x8s1PQBlDwEp/uDCo3joJB9h8+R83sBQJzPisq/kf10PF4p7Qylr44Tlwt44lFYTG2OeaWZ0DA2ORSGAZQotBIALdZiWZB9Y3fj4HfqnvIPGUDDanO+gNBALeoAWKYL2RQUcwgYB5PwLMb4sBKoE99Vmd7tlgMDjrhubXcMOkoQnuyOIe1jfnCoCMpUg5KoEIl9PtdjuX4eoSTDLq/BlP4SmlSwAtRSrktAYRNqvV5XIJ4WTEAjV5R2wK/bjFtEVfBMQ7cAlMGPpw1MNJrxmeXaI4B8z9WpiSTBmjyAQmGJMRhwy+C5ohwd1TNsW1sKYvTKlXqkux2BTBXVCTySSFM+5N+ECRKBTY4m8XdoVUNq/twDUQQqvVGrUK+lybUIn1qAN/KLqetvB3CmfjN9VIPIYJBUKUmUwmCX22Tbilo7AhXGB9jb9bdPgaVD2eFCYQongPcSwbMhBuUSwyhDtIW7LbRUBjm2qEIzCSSCgSe1BozECdltPjDtayuyUbs0H13u+Ja1mEIIYk96CYyUA2hvxg/Xpan9suvdS/Y2I+hRDMUAhQJ6E2fqbP5P64sP+aJuzjIQ7RxliWTUIxASGWL2D9Vnb31sU98yFPeObj8eE91LREDpP+M30ut//xJvswEe6PhkJ+LD/YkNGKA3i4EF1Besuleo6wH0VXDqDlndPAEKQSHiwi+SE/t/vn5du48a9wuH8PDkZmrUZaQbFb8DC9Zsnmaq9+gp69DUMYCbj7GCJBacdhUp/N7e5f+wQ9haKloMuolpMdqXEIsrX7N7xZO8iR22aiE+giH8G/a258qpugyOs0aHABzxHc/heP+07n8fHxycnJ6elp505T2f8h/gGGn4gMElc4wwAAAABJRU5ErkJggg=="],
    "34": ["[晕]", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAACE1BMVEUAAADgqj7wxWHvw1/qulLpulLntkzksEXms0nms0nwxGHxx2XuwV3vxF/tv1nhsUbirUHdozPcozXRli/xx2Xxx2XzzF/10FD12lD12U712Ev110n110b11kTzzkTuwj7quTzgqTrZnjDuwVzxx2T22Vj33V3221X11ULxzUHdozPcozP33mT24Wn10kD1zDrany7TmDDxx2X24nL35Hn24m/0wzPfqy/45YD36Yj365D10D7xx2Xvz0/SnzWwaRydSQTAiUXz0X/48KT47p747Zj354Psxk3LjyivZBGpXA7Ggx3ZnSvZoC6jUwvJmVD38rTKlDO0cCLauXbLoGH59bn48avAgi26eB/gsjW4cBPZnizeuVnhxHPewoLo16H5+MXu4q6vbSvivErftDnpvzfqsi7cojHlxFbizJXv0WTXmSjTkCTGhynEjDT24o7Vqk71zzzblyC9fCrnpCDdnyevWxvztCPboTP0x0ninR/qqiT0uyryrBzQkyrWsGP0yTj4yFP0xzX0wS/9yXP7kHT5jXDzoVr1vD3ngFn/uGz0h2ryimTzqzHPbz/OdjzukFP/r3DxpVLUhkDyrx/9lHf+nHX/qnH+o3PvqBy6eiv7xmKtayv1rlf3lmfztyi1dSuubCv0vi2qaCyoZiypaCzUmCymZCyXQgL830v/71qubCvYnSupZizYnCqwbyzAgSuRRi6rAAAAsXRSTlMAMHCfz///v6+AIIDn/////++bIBD/////////////////r0jv////////gP/////PEM////////////+v////////////////////////////////////////WP//////////////3/////////////////////9w///////f////////////////////////////////////z/+i/////1j/Or//QHD///+Av9e/74BSXa5LAAAEPElEQVRIx+2V/V9SdxTHNZVqS/FhKAqYVCCi3JtDQGDqSUQRL1fTfKDUiFLzgQwBSfM2xdJ8SKthzeUSNZ3W2vYn7nwvCT7N9vNeOz+e+3mfc+73e875JiT8Jy3xTFJycoog+ey584lfV3/z7YXU1LS0lBSBQCAUpmdkZp0q/y5JJBJlZ+eIc/MkUln+xYJ0ufzSKcjlKyhXKJRKpaIQGalMVVQgl6uLTwmfrVCWaNBKSpSISKQqii5Qq6+Wnqj/XiQicm0ZmlanIQhP6A3qjMQT9Rheoy03Gk0mo7Fcq+MJmcrME8d/5AdRdkVlFQBUXau21FhNtWVI1Nnq0WNvYBzHqjojElWy8MUamyw1hLi+74AGx6Ujx39FVIn+5saWG9eQu9HaVmMqb0dPh81pu0kI5tYhIClViKk7jV3dt1133MA2NVmsnQD1dyvuOXvMvSywTN+hBGmpHcDe15J/uO3qB+hvbbNWgX2gzo6eHnoQYOhQiqS0ChY8ugf4lb3jcvHAMMBDTQfxFHkNACPM1QPAhbQiAKG2GXytLperhQe6ADo1AB48WW8DgD/AxI/2ckqdE+CurhnYbpern4VRV5MFAa3GDvUGmcrAQn3QzzyKAedTxnigc/8Uu1vbokDsYMeDjwfjJ3tOkE9K0pQ95K+CbWlqs1j5kpS2qCcwEeQGn8SAswJKZocO0hddPza21LRZ8OKMAA+wO3LvOWyGST0BbHFASMlsANcHqquHTdYaNKvJWIv3VlkhFk9NjXlD00cBs6rIHi129Omwie++soEvrTL6bGb2OQE8cSDdqxqbG41+n53Hhq3FDtfcr496ns0sLL4IckPtB4BJanZhYW5paWn55av5p/sDoXz90/Ly8hwCCy/DnMcXAzLTL5oRmJlZWXnzFgGtTqchesX8/Nuf36zwALfa/ksMeCQvoMcWY0AJP6Jkrt/tA4svuHHfWnwTyZ0hb/6v7wnw6p2SN5SL8yRT8wR4/3o9zA1FNuK91CfX02aVTJqTkysWFxYqCgtRzq8anOnn+s31IMf5IgeGrljdGyKETCrJyxUjhGoiR713klxCmBuJrB3o1tIM9TQSFCaRSiR5aBJejhuARj0mWPW5tw5OULHagISXUmEWhKSoRjllpjE+X9CQ+8OhES3tU/dOhyYxCTIqIlZRlNlLh3h9mBt3bx9ZNDtqJPQhmvYiQ1E9hh4vjeH1pJ4w549s/3Z0L91yqHs3EZmk0Qy7u7tOGuWbUb1ve+346st0OHonENGHQqGbCFTt8fJo/A8nLddiB+Nfn0BmepoAHR8n1kl4/N+T4vNVZTCBx8F1hPywCxV7JDp2hHv70z+9D1m/M0zAHw4Gg5vOj3sTYW51xOd2f9465Qna+YMZHAwEAn60kSFPJOL+vPG1JzHzic1m83g87b5I5M+1jX/zjGbt/EXs08ZWwv/G29/FmoSgW5+YnAAAAABJRU5ErkJggg=="]
  };
  //工具类
  var tool = new function () {

    //格式化时间戳
    //format格式如下：
    //yyyy-MM-dd hh:mm:ss 年月日时分秒(默认格式)
    //yyyy-MM-dd 年月日
    //hh:mm:ss 时分秒
    this.formatTimeStamp = function (timestamp, format) {
      if (!timestamp) {
        return 0;
      }
      var formatTime;
      format = format || 'yyyy-MM-dd hh:mm:ss';
      var date = new Date(timestamp * 1000);
      var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds() //秒
      };
      if (/(y+)/.test(format)) {
        formatTime = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
      } else {
        formatTime = format;
      }
      for (var k in o) {
        if (new RegExp("(" + k + ")").test(formatTime))
          formatTime = formatTime.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
      return formatTime;
    };

    //根据群类型英文名转换成中文名
    this.groupTypeEn2Ch = function (type_en) {
      var type_ch = null;
      switch (type_en) {
        case 'Public':
          type_ch = '公开群';
          break;
        case 'ChatRoom':
          type_ch = '聊天室';
          break;
        case 'Private':
          type_ch = '讨论组';
          break;
        case 'AVChatRoom':
          type_ch = '直播聊天室';
          break;
        default:
          type_ch = type_en;
          break;
      }
      return type_ch;
    };
    //根据群类型中文名转换成英文名
    this.groupTypeCh2En = function (type_ch) {
      var type_en = null;
      switch (type_ch) {
        case '公开群':
          type_en = 'Public';
          break;
        case '聊天室':
          type_en = 'ChatRoom';
          break;
        case '讨论组':
          type_en = 'Private';
          break;
        case '直播聊天室':
          type_en = 'AVChatRoom';
          break;
        default:
          type_en = type_ch;
          break;
      }
      return type_en;
    };
    //根据群身份英文名转换成群身份中文名
    this.groupRoleEn2Ch = function (role_en) {
      var role_ch = null;
      switch (role_en) {
        case 'Member':
          role_ch = '成员';
          break;
        case 'Admin':
          role_ch = '管理员';
          break;
        case 'Owner':
          role_ch = '群主';
          break;
        default:
          role_ch = role_en;
          break;
      }
      return role_ch;
    };
    //根据群身份中文名转换成群身份英文名
    this.groupRoleCh2En = function (role_ch) {
      var role_en = null;
      switch (role_ch) {
        case '成员':
          role_en = 'Member';
          break;
        case '管理员':
          role_en = 'Admin';
          break;
        case '群主':
          role_en = 'Owner';
          break;
        default:
          role_en = role_ch;
          break;
      }
      return role_en;
    };
    //根据群消息提示类型英文转换中文
    this.groupMsgFlagEn2Ch = function (msg_flag_en) {
      var msg_flag_ch = null;
      switch (msg_flag_en) {
        case 'AcceptAndNotify':
          msg_flag_ch = '接收并提示';
          break;
        case 'AcceptNotNotify':
          msg_flag_ch = '接收不提示';
          break;
        case 'Discard':
          msg_flag_ch = '屏蔽';
          break;
        default:
          msg_flag_ch = msg_flag_en;
          break;
      }
      return msg_flag_ch;
    };
    //根据群消息提示类型中文名转换英文名
    this.groupMsgFlagCh2En = function (msg_flag_ch) {
      var msg_flag_en = null;
      switch (msg_flag_ch) {
        case '接收并提示':
          msg_flag_en = 'AcceptAndNotify';
          break;
        case '接收不提示':
          msg_flag_en = 'AcceptNotNotify';
          break;
        case '屏蔽':
          msg_flag_en = 'Discard';
          break;
        default:
          msg_flag_en = msg_flag_ch;
          break;
      }
      return msg_flag_en;
    };
    //将空格和换行符转换成HTML标签
    this.formatText2Html = function (text) {
      var html = text;
      if (html) {
        html = this.xssFilter(html);//用户昵称或群名称等字段会出现脚本字符串
        html = html.replace(/ /g, "&nbsp;");
        html = html.replace(/\n/g, "<br/>");
      }
      return html;
    };
    //将HTML标签转换成空格和换行符
    this.formatHtml2Text = function (html) {
      var text = html;
      if (text) {
        text = text.replace(/&nbsp;/g, " ");
        text = text.replace(/<br\/>/g, "\n");
      }
      return text;
    };
    //获取字符串(UTF-8编码)所占字节数
    //参考：http://zh.wikipedia.org/zh-cn/UTF-8
    this.getStrBytes = function (str) {
      if (str == null || str === undefined) return 0;
      if (typeof str != "string") {
        return 0;
      }
      var total = 0, charCode, i, len;
      for (i = 0, len = str.length; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode <= 0x007f) {
          total += 1;//字符代码在000000 – 00007F之间的，用一个字节编码
        } else if (charCode <= 0x07ff) {
          total += 2;//000080 – 0007FF之间的字符用两个字节
        } else if (charCode <= 0xffff) {
          total += 3;//000800 – 00D7FF 和 00E000 – 00FFFF之间的用三个字节，注: Unicode在范围 D800-DFFF 中不存在任何字符
        } else {
          total += 4;//010000 – 10FFFF之间的用4个字节
        }
      }
      return total;
    };


    //防止XSS攻击
    this.xssFilter = function (val) {
      val = val.toString();
      val = val.replace(/[<]/g, "&lt;");
      val = val.replace(/[>]/g, "&gt;");
      val = val.replace(/"/g, "&quot;");
      //val = val.replace(/'/g, "&#039;");
      return val;
    };

    //去掉头尾空白符
    this.trimStr = function (str) {
      if (!str) return '';
      str = str.toString();
      return str.replace(/(^\s*)|(\s*$)/g, "");
    };
    //判断是否为8位整数
    this.validNumber = function (str) {
      str = str.toString();
      return str.match(/(^\d{1,8}$)/g);
    };
    this.getReturnError = function (errorInfo, errorCode) {
      if (!errorCode) {
        errorCode = -100;
      }
      var error = {
        'ActionStatus': ACTION_STATUS.FAIL,
        'ErrorCode': errorCode,
        'ErrorInfo': errorInfo + "[" + errorCode + "]"
      };
      return error;
    };
    //设置cookie
    //name 名字
    //value 值
    //expires 有效期(单位：秒)
    //path
    //domain 作用域
    this.setCookie = function (name, value, expires, path, domain) {
      var exp = new Date();
      exp.setTime(exp.getTime() + expires * 1000);
      document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    };
    //获取cookie
    this.getCookie = function (name) {
      var result = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
      if (result != null) {
        return unescape(result[2]);
      }
      return null;
    };
    //删除cookie
    this.delCookie = function (name) {
      var exp = new Date();
      exp.setTime(exp.getTime() - 1);
      var value = this.getCookie(name);
      if (value != null)
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    };
    //根据名字获取url参数值
    this.getQueryString = function (name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    };
    //判断IE版本号，ver表示版本号
    this.isIE = function (ver) {
      var b = document.createElement('b')
      b.innerHTML = '<!--[if IE ' + ver + ']><i></i><![endif]-->'
      return b.getElementsByTagName('i').length === 1;
    };
    //判断浏览器版本
    // this.getBrowserInfo = function () {
    //     var Sys = {};
    //     var ua = navigator.userAgent.toLowerCase();
    //     log.info('navigator.userAgent=' + ua);
    //     var s;
    //     (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
    //         (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
    //             (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
    //                 (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
    //                     (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
    //     if (Sys.ie) {//Js判断为IE浏览器
    //         return {
    //             'type': 'ie',
    //             'ver': Sys.ie
    //         };
    //     }
    //     if (Sys.firefox) {//Js判断为火狐(firefox)浏览器
    //         return {
    //             'type': 'firefox',
    //             'ver': Sys.firefox
    //         };
    //     }
    //     if (Sys.chrome) {//Js判断为谷歌chrome浏览器
    //         return {
    //             'type': 'chrome',
    //             'ver': Sys.chrome
    //         };
    //     }
    //     if (Sys.opera) {//Js判断为opera浏览器
    //         return {
    //             'type': 'opera',
    //             'ver': Sys.opera
    //         };
    //     }
    //     if (Sys.safari) {//Js判断为苹果safari浏览器
    //         return {
    //             'type': 'safari',
    //             'ver': Sys.safari
    //         };
    //     }
    //     return {
    //         'type': 'unknow',
    //         'ver': -1
    //     };
    // };

  };

  //日志对象
  var log = new function () {

    var on = false;

    this.setOn = function (onFlag) {
      on = onFlag;
    };

    this.getOn = function () {
      return on;
    };

    this.error = function (logStr) {
      try {
        on && console.error(logStr);
      } catch (e) {
      }
    };
    this.warn = function (logStr) {
      try {
        on && console.warn(logStr);
      } catch (e) {
      }
    };
    this.info = function (logStr) {
      try {
        on && console.info(logStr);
      } catch (e) {
      }
    };
    this.debug = function (logStr) {
      try {
        on && console.debug(logStr);
      } catch (e) {
      }
    };
  };
  //获取unix时间戳
  var unixtime = function (d) {
    if (!d) d = new Date();
    return Math.round(d.getTime() / 1000);
  };
  //时间戳转日期
  var fromunixtime = function (t) {
    return new Date(t * 1000);
  };
  //获取下一个消息序号
  var nextSeq = function () {
    if (curSeq) {
      curSeq = curSeq + 1;
    } else {
      curSeq = Math.round(Math.random() * 10000000);
    }
    return curSeq;
  };
  //产生随机数
  var createRandom = function () {
    return Math.round(Math.random() * 4294967296);
  };

  //获取ajax请求对象
  var getXmlHttp = function () {
    var xmlhttp = null;
    if (window.XMLHttpRequest) {
      xmlhttp = new XMLHttpRequest();
    } else {
      try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
      } catch (e) {
        try {
          xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {
          return null;
        }
      }
    }
    return xmlhttp;
  }
  //发起ajax请求
  var ajaxRequest = function (meth, url, req, timeout, isLongPolling, cbOk, cbErr) {

    var xmlHttpObj = getXmlHttp();

    var error, errInfo;
    if (!xmlHttpObj) {
      errInfo = "创建请求失败";
      var error = tool.getReturnError(errInfo, -1);
      log.error(errInfo);
      if (cbErr) cbErr(error);
      return;
    }
    //保存ajax请求对象
    xmlHttpObjSeq++;
    xmlHttpObjMap[xmlHttpObjSeq] = xmlHttpObj;

    xmlHttpObj.open(meth, url, true);
    xmlHttpObj.onreadystatechange = function () {
      if (xmlHttpObj.readyState == 4) {
        xmlHttpObjMap[xmlHttpObjSeq] = null;//清空
        if (xmlHttpObj.status == 200) {
          if (cbOk) cbOk(xmlHttpObj.responseText);
          xmlHttpObj = null;
          curLongPollingRetErrorCount = curBigGroupLongPollingRetErrorCount = 0;
        } else {
          xmlHttpObj = null;
          //避免刷新的时候，由于abord ajax引起的错误回调
          setTimeout(function(){
            var errInfo = "请求服务器失败,请检查你的网络是否正常";
            var error = tool.getReturnError(errInfo, -2);
            //if (!isLongPolling && cbErr) cbErr(error);
            if (cbErr) cbErr(error);
          },16);
        }
      }
    };
    xmlHttpObj.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    //设置超时时间
    if (!timeout) {
      timeout = ajaxDefaultTimeOut;//设置ajax默认超时时间
    }
    if (timeout) {
      xmlHttpObj.timeout = timeout;
      xmlHttpObj.ontimeout = function (event) {
        xmlHttpObj = null;
        //var errInfo = "请求服务器超时";
        //var error = tool.getReturnError(errInfo, -3);
        //if (cbErr) cbErr(error);
      };
    }
    //
    xmlHttpObj.send(req);
  }
  //发起ajax请求（json格式数据）
  var ajaxRequestJson = function (meth, url, req, timeout, isLongPolling, cbOk, cbErr) {
    ajaxRequest(meth, url, JSON.stringify(req), timeout, isLongPolling, function (resp) {
      var json = null;
      //if (resp) eval('json=('+resp+');');//将返回的json字符串转换成json对象
      //if (resp) json=eval('('+resp+')');//将返回的json字符串转换成json对象
      if (resp) json = JSON.parse(resp);//将返回的json字符串转换成json对象
      if (cbOk) cbOk(json);
    }, cbErr);
  }
  //判断用户是否已登录
  var isLogin = function () {
    return ctx.sdkAppID && ctx.identifier;
  };
  //检查是否登录
  var checkLogin = function (cbErr, isNeedCallBack) {
    if (!isLogin()) {
      if (isNeedCallBack) {
        var errInfo = "请登录";
        var error = tool.getReturnError(errInfo, -4);

        if (cbErr) cbErr(error);
      }
      return false;
    }
    return true;
  };

  //检查是否访问正式环境
  var isAccessFormalEnv = function () {
    return isAccessFormaEnvironment;
  };

  //根据不同的服务名和命令，获取对应的接口地址
  var getApiUrl = function (srvName, cmd, cbOk, cbErr) {
    var srvHost = SRV_HOST;
    if (isAccessFormalEnv()) {
      srvHost = SRV_HOST.FORMAL.COMMON;
    } else {
      srvHost = SRV_HOST.TEST.COMMON;
    }

    //if (srvName == SRV_NAME.RECENT_CONTACT) {
    //    srvHost = SRV_HOST.TEST.COMMON;
    //}

    if (srvName == SRV_NAME.PIC) {
      if (isAccessFormalEnv()) {
        srvHost = SRV_HOST.FORMAL.PIC;
      } else {
        srvHost = SRV_HOST.TEST.PIC;
      }
    }

    var url = srvHost + '/' + SRV_NAME_VER[srvName] + '/' + srvName + '/' + cmd + '?websdkappid=' + SDK.APPID + "&v=" + SDK.VERSION;

    if (isLogin()) {
      if (cmd == 'login') {
        url += '&identifier=' + encodeURIComponent(ctx.identifier) + '&usersig=' + ctx.userSig;
      } else {
        if (ctx.tinyid && ctx.a2) {
          url += '&tinyid=' + ctx.tinyid + '&a2=' + ctx.a2;
        } else {
          if (cbErr) {
            log.error("tinyid或a2为空[" + srvName + "][" + cmd + "]");
            cbErr(tool.getReturnError("tinyid或a2为空[" + srvName + "][" + cmd + "]", -5));
            return false;
          }
        }
      }
      url += '&contenttype=' + ctx.contentType;
    }
    url += '&sdkappid=' + ctx.sdkAppID + '&accounttype=' + ctx.accountType + '&apn=' + ctx.apn + '&reqtime=' + unixtime();
    return url;
  };

  //获取语音下载url
  var getSoundDownUrl = function (uuid, senderId) {
    var soundUrl = null;
    if (authkey && ipList[0]) {
      soundUrl = "http://" + ipList[0] + "/asn.com/stddownload_common_file?authkey=" + authkey + "&bid=" + DOWNLOAD_FILE.BUSSINESS_ID + "&subbid=" + ctx.sdkAppID + "&fileid=" + uuid + "&filetype=" + DOWNLOAD_FILE_TYPE.SOUND + "&openid=" + senderId + "&ver=0";
    } else {
      log.error("拼接语音下载url不报错：ip或者authkey为空");
    }
    return soundUrl;
  };

  //获取文件下载地址
  var getFileDownUrl = function (uuid, senderId, fileName) {
    var fileUrl = null;
    if (authkey && ipList[0]) {
      fileUrl = "http://" + ipList[0] + "/asn.com/stddownload_common_file?authkey=" + authkey + "&bid=" + DOWNLOAD_FILE.BUSSINESS_ID + "&subbid=" + ctx.sdkAppID + "&fileid=" + uuid + "&filetype=" + DOWNLOAD_FILE_TYPE.FILE + "&openid=" + senderId + "&ver=0&filename=" + encodeURIComponent(fileName);
    } else {
      log.error("拼接文件下载url不报错：ip或者authkey为空");
    }
    Resources.downloadMap["uuid_"+uuid] = fileUrl;
    return fileUrl;
  };

  //获取文件下载地址
  var getFileDownUrlV2 = function (uuid, senderId, fileName, downFlag, receiverId, busiId, type) {
    var options = {
      "From_Account": senderId,//"identifer_0",       // 类型: String, 发送者tinyid
      "To_Account": receiverId,//"identifer_1",         // 类型: String, 接收者tinyid
      "os_platform": 10,                      // 类型: Number, 终端的类型 1(android) 2(ios) 3(windows) 10(others...)
      "Timestamp": unixtime().toString(),     // 类型: Number, 时间戳
      "Random": createRandom().toString(),    // 类型: Number, 随机值
      "request_info": [                       // 类型: Array
        {
          "busi_id": busiId,                   // 类型: Number, 群(1) C2C(2) 其他请联系sdk开发者分配
          "download_flag": downFlag,      // 类型: Number, 申请下载地址标识  0(申请架平下载地址)  1(申请COS平台下载地址)  2(不需要申请, 直接拿url下载(这里应该不会为2))
          "type": type,                      // 类型: Number, 0(短视频缩略图), 1(文件), 2(短视频), 3(ptt), 其他待分配
          "uuid": uuid,                   // 类型: Number, 唯一标识一个文件的uuid
          "version": VERSION_INFO.SERVER_VERSION, // 类型: Number, 架平server版本
          "auth_key": authkey,            // 类型: String, 认证签名
          "ip": ipList[0]                 // 类型: Number, 架平IP
        }
      ]
    };
    //获取下载地址
    proto_applyDownload(options,function(resp){
      if(resp.error_code == 0 && resp.response_info){
        Resources.downloadMap["uuid_"+options.uuid] = resp.response_info.url;
      }
      if(onAppliedDownloadUrl){
        onAppliedDownloadUrl({
          uuid : options.uuid,
          url : resp.response_info.url,
          maps : Resources.downloadMap
        });
      }
    }, function(resp){
      log.error("获取下载地址失败",options.uuid)
    });
  };


  //重置ajax请求
  var clearXmlHttpObjMap = function () {
    //遍历xmlHttpObjMap{}
    for (var seq in xmlHttpObjMap) {
      var xmlHttpObj = xmlHttpObjMap[seq];
      if (xmlHttpObj) {
        xmlHttpObj.abort();//中断ajax请求(长轮询)
        xmlHttpObjMap[xmlHttpObjSeq] = null;//清空
      }
    }
    xmlHttpObjSeq = 0;
    xmlHttpObjMap = {};
  };

  //重置sdk全局变量
  var clearSdk = function () {

    clearXmlHttpObjMap();

    //当前登录用户
    ctx = {
      sdkAppID: null,
      appIDAt3rd: null,
      accountType: null,
      identifier: null,
      identifierNick: null,
      userSig: null,
      contentType: 'json',
      apn: 1
    };
    opt = {};

    curSeq = 0;

    //ie8,9采用jsonp方法解决ajax跨域限制
    jsonpRequestId = 0;//jsonp请求id
    //最新jsonp请求返回的json数据
    jsonpLastRspData = null;

    apiReportItems = [];

    MsgManager.clear();
  };

  //登录
  var _login = function (loginInfo, listeners, options, cbOk, cbErr) {

    clearSdk();

    if (options) opt = options;
    if (opt.isAccessFormalEnv == false) {
      isAccessFormaEnvironment = opt.isAccessFormalEnv;
    }
    if (opt.isLogOn == false) {
      log.setOn(opt.isLogOn);
    }
    /*
     if(opt.emotions){
     emotions=opt.emotions;
     webim.Emotions= emotions;
     }
     if(opt.emotionDataIndexs){
     emotionDataIndexs=opt.emotionDataIndexs;
     webim.EmotionDataIndexs= emotionDataIndexs;
     }*/

    if (!loginInfo) {
      if (cbErr) {
        cbErr(tool.getReturnError("loginInfo is empty", -6));
        return;
      }
    }
    if (!loginInfo.sdkAppID) {
      if (cbErr) {
        cbErr(tool.getReturnError("loginInfo.sdkAppID is empty", -7));
        return;
      }
    }
    if (!loginInfo.accountType) {
      if (cbErr) {
        cbErr(tool.getReturnError("loginInfo.accountType is empty", -8));
        return;
      }
    }

    if (loginInfo.identifier) {
      ctx.identifier = loginInfo.identifier.toString();
    }
    if (loginInfo.identifier && !loginInfo.userSig) {
      if (cbErr) {
        cbErr(tool.getReturnError("loginInfo.userSig is empty", -9));
        return;
      }
    }
    if (loginInfo.userSig) {
      ctx.userSig = loginInfo.userSig.toString();
    }
    ctx.sdkAppID = loginInfo.sdkAppID;
    ctx.accountType = loginInfo.accountType;

    if (ctx.identifier && ctx.userSig) {//带登录态
      //登录
      proto_login(
          function (identifierNick) {
            MsgManager.init(
                listeners,
                function (mmInitResp) {
                  if (cbOk) {
                    mmInitResp.identifierNick = identifierNick;
                    cbOk(mmInitResp);
                  }
                }, cbErr
            );
          },
          cbErr
      );
    } else {//不带登录态，进入直播场景sdk
      MsgManager.init(
          listeners,
          cbOk,
          cbErr
      );
    }
  };

  //初始化浏览器信息
  // var initBrowserInfo = function () {
  //     //初始化浏览器类型
  //     BROWSER_INFO = tool.getBrowserInfo();
  //     log.info('BROWSER_INFO: type=' + BROWSER_INFO.type + ', ver=' + BROWSER_INFO.ver);
  //     if (BROWSER_INFO.type == "ie") {
  //         if (parseInt(BROWSER_INFO.ver) < 10) {
  //             lowerBR = true;
  //         }
  //     }
  // };

  //接口质量上报
  var reportApiQuality = function (cmd, errorCode, errorInfo) {
    if (cmd == 'longpolling' && (errorCode == longPollingTimeOutErrorCode || errorCode == longPollingKickedErrorCode)) {//longpolling 返回60008错误可以视为正常,可以不上报
      return;
    }
    var eventId = CMD_EVENT_ID_MAP[cmd];
    if (eventId) {
      var reportTime = unixtime();
      var uniqKey = null;
      var msgCmdErrorCode = {
        'Code': errorCode,
        'ErrMsg': errorInfo
      };
      if (ctx.a2) {
        uniqKey = ctx.a2.substring(0, 10) + "_" + reportTime + "_" + createRandom();
      } else if (ctx.userSig) {
        uniqKey = ctx.userSig.substring(0, 10) + "_" + reportTime + "_" + createRandom();
      }

      if (uniqKey) {

        var rptEvtItem = {
          "UniqKey": uniqKey,
          "EventId": eventId,
          "ReportTime": reportTime,
          "MsgCmdErrorCode": msgCmdErrorCode
        };

        if (cmd == 'login') {
          var loginApiReportItems = [];
          loginApiReportItems.push(rptEvtItem);
          var loginReportOpt = {
            "EvtItems": loginApiReportItems,
            "MainVersion": SDK.VERSION,
            "Version": "0"
          };
          proto_reportApiQuality(loginReportOpt,
              function (resp) {
                loginApiReportItems = null;//
              },
              function (err) {
                loginApiReportItems = null;//
              }
          );
        } else {
          apiReportItems.push(rptEvtItem);
          if (apiReportItems.length >= maxApiReportItemCount) {//累计一定条数再上报
            var reportOpt = {
              "EvtItems": apiReportItems,
              "MainVersion": SDK.VERSION,
              "Version": "0"
            };
            proto_reportApiQuality(reportOpt,
                function (resp) {
                  apiReportItems = [];//清空
                },
                function (err) {
                  apiReportItems = [];//清空
                }
            );
          }
        }

      }
    }
  };

  // REST API calls
  //上线
  var proto_login = function (cbOk, cbErr) {
    ConnManager.apiCall(SRV_NAME.OPEN_IM, "login", {"State": "Online"},
        function (loginResp) {
          if (loginResp.TinyId) {
            ctx.tinyid = loginResp.TinyId;
          } else {
            if (cbErr) {
              cbErr(tool.getReturnError("TinyId is empty", -10));
              return;
            }
          }
          if (loginResp.A2Key) {
            ctx.a2 = loginResp.A2Key;
          } else {
            if (cbErr) {
              cbErr(tool.getReturnError("A2Key is empty", -11));
              return;
            }
          }
          var tag_list = [
            "Tag_Profile_IM_Nick"
          ];
          var options = {
            'From_Account': ctx.identifier,
            'To_Account': [ctx.identifier],
            'LastStandardSequence': 0,
            'TagList': tag_list
          };
          proto_getProfilePortrait(
              options,
              function (resp) {
                var nick, gender, allowType;
                if (resp.UserProfileItem && resp.UserProfileItem.length > 0) {
                  for (var i in resp.UserProfileItem) {
                    for (var j in resp.UserProfileItem[i].ProfileItem) {
                      switch (resp.UserProfileItem[i].ProfileItem[j].Tag) {
                        case 'Tag_Profile_IM_Nick':
                          nick = resp.UserProfileItem[i].ProfileItem[j].Value;
                          if (nick) ctx.identifierNick = nick;
                          break;
                      }
                    }
                  }
                }
                if (cbOk) cbOk(ctx.identifierNick);//回传当前用户昵称
              }, cbErr);
        }
        , cbErr);
  };
  //下线
  var proto_logout = function (type , cbOk, cbErr) {
    if (!checkLogin(cbErr, false)) {//不带登录态
      clearSdk();
      if (cbOk) cbOk({
        'ActionStatus': ACTION_STATUS.OK,
        'ErrorCode': 0,
        'ErrorInfo': 'logout success'
      });
      return;
    }
    if(type == "all"){
      ConnManager.apiCall(SRV_NAME.OPEN_IM, "logout", {},
          function (resp) {
            clearSdk();
            if (cbOk) cbOk(resp);
          },
          cbErr);
    }else{
      ConnManager.apiCall(SRV_NAME.OPEN_IM, "longpollinglogout", { LongPollingId  : LongPollingId },
          function (resp) {
            clearSdk();
            if (cbOk) cbOk(resp);
          },
          cbErr);
    }
  };
  //发送消息，包括私聊和群聊
  var proto_sendMsg = function (msg, cbOk, cbErr) {
    if (!checkLogin(cbErr, true)) return;
    var msgInfo = null;

    switch (msg.sess.type()) {
      case SESSION_TYPE.C2C:
        msgInfo = {
          'From_Account': ctx.identifier,
          'To_Account': msg.sess.id().toString(),
          'MsgTimeStamp': msg.time,
          'MsgSeq': msg.seq,
          'MsgRandom': msg.random,
          'MsgBody': []
        };
        break;
      case SESSION_TYPE.GROUP:
        var subType = msg.getSubType();
        msgInfo = {
          'GroupId': msg.sess.id().toString(),
          'From_Account': ctx.identifier,
          'Random': msg.random,
          'MsgBody': []
        };
        switch (subType) {
          case GROUP_MSG_SUB_TYPE.COMMON:
            msgInfo.MsgPriority = "COMMON";
            break;
          case GROUP_MSG_SUB_TYPE.REDPACKET:
            msgInfo.MsgPriority = "REDPACKET";
            break;
          case GROUP_MSG_SUB_TYPE.LOVEMSG:
            msgInfo.MsgPriority = "LOVEMSG";
            break;
          case GROUP_MSG_SUB_TYPE.TIP:
            log.error("不能主动发送群提示消息,subType=" + subType);
            break;
          default:
            log.error("发送群消息时，出现未知子消息类型：subType=" + subType);
            return;
            break;
        }
        break;
      default:
        break;
    }

    for (var i in msg.elems) {
      var elem = msg.elems[i];
      var msgContent = null;
      var msgType = elem.type;
      switch (msgType) {
        case MSG_ELEMENT_TYPE.TEXT://文本
          msgContent = {'Text': elem.content.text};
          break;
        case MSG_ELEMENT_TYPE.FACE://表情
          msgContent = {'Index': elem.content.index, 'Data': elem.content.data};
          break;
        case MSG_ELEMENT_TYPE.IMAGE://图片
          var ImageInfoArray = [];
          for (var j in elem.content.ImageInfoArray) {
            ImageInfoArray.push(
                {
                  'Type': elem.content.ImageInfoArray[j].type,
                  'Size': elem.content.ImageInfoArray[j].size,
                  'Width': elem.content.ImageInfoArray[j].width,
                  'Height': elem.content.ImageInfoArray[j].height,
                  'URL': elem.content.ImageInfoArray[j].url
                }
            );
          }
          msgContent = {'UUID': elem.content.UUID, 'ImageInfoArray': ImageInfoArray};
          break;
        case MSG_ELEMENT_TYPE.SOUND://
          log.warn('web端暂不支持发送语音消息');
          continue;
          break;
        case MSG_ELEMENT_TYPE.LOCATION://
          log.warn('web端暂不支持发送地理位置消息');
          continue;
          break;
        case MSG_ELEMENT_TYPE.FILE://
          msgContent = {
            'UUID': elem.content.uuid,
            'FileName': elem.content.name,
            'FileSize': elem.content.size,
            'DownloadFlag' : elem.content.downFlag
          };
          break;
        case MSG_ELEMENT_TYPE.CUSTOM://
          msgContent = {'Data': elem.content.data, 'Desc': elem.content.desc, 'Ext': elem.content.ext};
          msgType = MSG_ELEMENT_TYPE.CUSTOM;
          break;
        default :
          log.warn('web端暂不支持发送' + elem.type + '消息');
          continue;
          break;
      }
      msgInfo.MsgBody.push({'MsgType': msgType, 'MsgContent': msgContent});
    }
    if (msg.sess.type() == SESSION_TYPE.C2C) {//私聊
      ConnManager.apiCall(SRV_NAME.OPEN_IM, "sendmsg", msgInfo, cbOk, cbErr);
    } else if (msg.sess.type() == SESSION_TYPE.GROUP) {//群聊
      ConnManager.apiCall(SRV_NAME.GROUP, "send_group_msg", msgInfo, cbOk, cbErr);
    }
  };
  //长轮询接口
  var proto_longPolling = function (options, cbOk, cbErr) {
    if(!isAccessFormaEnvironment && typeof stopPolling !="undefined" && stopPolling == true){
      return;
    }
    if (!checkLogin(cbErr, true)) return;
    ConnManager.apiCall(SRV_NAME.OPEN_IM, "longpolling", options, cbOk, cbErr, longPollingDefaultTimeOut, true);
  };

  //长轮询接口(拉取直播聊天室新消息)
  var proto_bigGroupLongPolling = function (options, cbOk, cbErr, timeout) {
    ConnManager.apiCall(SRV_NAME.BIG_GROUP_LONG_POLLING, "get_msg", options, cbOk, cbErr, timeout);
  };

  //拉取未读c2c消息接口
  var proto_getMsgs = function (cookie, syncFlag, cbOk, cbErr) {
    if (!checkLogin(cbErr, true)) return;
    ConnManager.apiCall(SRV_NAME.OPEN_IM, "getmsg", {'Cookie': cookie, 'SyncFlag': syncFlag},
        function (resp) {

          if (resp.MsgList && resp.MsgList.length) {
            for (var i in resp.MsgList) {
              tempC2CMsgList.push(resp.MsgList[i]);
            }
          }
          if (resp.SyncFlag == 1) {
            proto_getMsgs(resp.Cookie, resp.SyncFlag, cbOk, cbErr);
          } else {
            resp.MsgList = tempC2CMsgList;
            tempC2CMsgList = [];
            if (cbOk) cbOk(resp);
          }
        },
        cbErr);
  };
  //C2C消息已读上报接口
  var proto_c2CMsgReaded = function (cookie, c2CMsgReadedItem, cbOk, cbErr) {
    if (!checkLogin(cbErr, true)) return;
    var tmpC2CMsgReadedItem = [];
    for (var i in c2CMsgReadedItem) {
      var item = {
        'To_Account': c2CMsgReadedItem[i].toAccount,
        'LastedMsgTime': c2CMsgReadedItem[i].lastedMsgTime
      };
      tmpC2CMsgReadedItem.push(item);
    }
    ConnManager.apiCall(SRV_NAME.OPEN_IM, "msgreaded", {
      C2CMsgReaded: {
        'Cookie': cookie,
        'C2CMsgReadedItem': tmpC2CMsgReadedItem
      }
    }, cbOk, cbErr);
  };

  //删除c2c消息
  var proto_deleteC2CMsg = function (options, cbOk, cbErr) {
    if (!checkLogin(cbErr, true)) return;

    ConnManager.apiCall(SRV_NAME.OPEN_IM, "deletemsg", options,
        cbOk, cbErr);
  };

  //拉取c2c历史消息接口
  var proto_getC2CHistoryMsgs = function (options, cbOk, cbErr) {
    if (!checkLogin(cbErr, true)) return;
    ConnManager.apiCall(SRV_NAME.OPEN_IM, "getroammsg", options,
        function (resp) {
          var reqMsgCount = options.MaxCnt;
          var complete = resp.Complete;
          var rspMsgCount = resp.MaxCnt;
          var msgKey = resp.MsgKey;
          var lastMsgTime = resp.LastMsgTime;

          if (resp.MsgList && resp.MsgList.length) {
            for (var i in resp.MsgList) {
              tempC2CHistoryMsgList.push(resp.MsgList[i]);
            }
          }
          var netxOptions = null;
          if (complete == 0) {//还有历史消息可拉取
            if (rspMsgCount < reqMsgCount) {
              netxOptions = {
                'Peer_Account': options.Peer_Account,
                'MaxCnt': reqMsgCount - rspMsgCount,
                'LastMsgTime': lastMsgTime,
                'MsgKey': msgKey
              };
            }
          }

          if (netxOptions) {//继续拉取
            proto_getC2CHistoryMsgs(netxOptions, cbOk, cbErr);
          } else {
            resp.MsgList = tempC2CHistoryMsgList;
            tempC2CHistoryMsgList = [];
            if (cbOk) cbOk(resp);
          }
        },
        cbErr);
  };

  //群组接口
  //创建群组
  //协议参考：https://www.qcloud.com/doc/product/269/1615
  var proto_createGroup = function (options, cbOk, cbErr) {
    if (!checkLogin(cbErr, true)) return;
    var opt = {
      //必填    群组形态，包括Public（公开群），Private（私密群），ChatRoom（聊天室），AVChatRoom（互动直播聊天室）。
      'Type': options.Type,
      //必填    群名称，最长30字节。
      'Name': options.Name
    };
    var member_list = [];

    //Array 选填  初始群成员列表，最多500个。成员信息字段详情参见：群成员资料。
    for (var i = 0; i < options.MemberList.length; i++) {
      member_list.push({'Member_Account': options.MemberList[i]})
    }
    opt.MemberList = member_list;
    //选填    为了使得群组ID更加简单，便于记忆传播，腾讯云支持APP在通过REST API创建群组时自定义群组ID。详情参见：自定义群组ID。
    if (options.GroupId) {
      opt.GroupId = options.GroupId;
    }
    //选填    群主id，自动添加到群成员中。如果不填，群没有群主。
    if (options.Owner_Account) {
      opt.Owner_Account = options.Owner_Account;
    }
    //选填    群简介，最长240字节。
    if (options.Introduction) {
      opt.Introduction = options.Introduction;
    }
    //选填    群公告，最长300字节。
    if (options.Notification) {
      opt.Notification = options.Notification;
    }
    //选填    最大群成员数量，最大为10000，不填默认为2000个。
    if (options.MaxMemberCount) {
      opt.MaxMemberCount = options.MaxMemberCount;
    }
    //选填    申请加群处理方式。包含FreeAccess（自由加入），NeedPermission（需要验证），DisableApply（禁止加群），不填默认为NeedPermission（需要验证）。
    if (options.ApplyJoinOption) {//
      opt.ApplyJoinOption = options.ApplyJoinOption;
    }
    //Array 选填  群组维度的自定义字段，默认情况是没有的，需要开通，详情参见：自定义字段。
    if (options.AppDefinedData) {
      opt.AppDefinedData = options.AppDefinedData;
    }
    //选填    群头像URL，最长100字节。
    if (options.FaceUrl) {
      opt.FaceUrl = options.FaceUrl;
    }
    ConnManager.apiCall(SRV_NAME.GROUP, "create_group", opt,
        cbOk, cbErr);
  };

  //创建群组-高级接口
  //协议参考：https://www.qcloud.com/doc/product/269/1615
  var proto_createGroupHigh = function (options, cbOk, cbErr) {
    if (!checkLogin(cbErr, true)) return;
    ConnManager.apiCall(SRV_NAME.GROUP, "create_group", options,
        cbOk, cbErr);
  };

  //修改群组基本资料
  //协议参考：https://www.qcloud.com/doc/product/269/1620
  var proto_modifyGroupBaseInfo = function (options, cbOk, cbErr) {
    if (!checkLogin(cbErr, true)) return;

    ConnManager.apiCall(SRV_NAME.GROUP, "modify_group_base_info", options,
        cbOk, cbErr);
  };

  //申请加群
  var proto_applyJoinGroup = function (options, cbOk, cbErr) {
    if (!checkLogin(cbErr, true)) return;

    ConnManager.apiCall(SRV_NAME.GROUP, "apply_join_group", {
          'GroupId': options.GroupId,
          'ApplyMsg': options.ApplyMsg,
          'UserDefinedField': options.UserDefinedField
        },
        cbOk, cbErr);
  };

  //申请加入大群
  var proto_applyJoinBigGroup = function (options, cbOk, cbErr) {
    var srvName;
    if (!checkLogin(cbErr, false)) {//未登录
      srvName = SRV_NAME.BIG_GROUP;
    } else {//已登录
      srvName = SRV_NAME.GROUP;
    }
    ConnManager.apiCall(srvName, "apply_join_group", {
          'GroupId': options.GroupId,
          'ApplyMsg': options.ApplyMsg,
          'UserDefinedField': options.UserDefinedField
        },
        function (resp) {
          if (resp.JoinedStatus && resp.JoinedStatus == 'JoinedSuccess') {
            if (resp.LongPollingKey) {
              MsgManager.setBigGroupLongPollingOn(true);//开启长轮询
              MsgManager.setBigGroupLongPollingKey(resp.LongPollingKey);//更新大群长轮询key
              MsgManager.setBigGroupLongPollingMsgMap(options.GroupId, 0);//收到的群消息置0
              MsgManager.bigGroupLongPolling();//开启长轮询
            } else {//没有返回LongPollingKey，说明申请加的群不是直播聊天室(AVChatRoom)
              cbErr && cbErr(tool.getReturnError("Join Group succeed; But the type of group is not AVChatRoom: groupid=" + options.GroupId, -12));
              return;
            }
          }
          if (cbOk) cbOk(resp);
        }
        , function (err) {

          if (cbErr) cbErr(err);
        });
  };

  //处理加群申请(同意或拒绝)
  var proto_handleApplyJoinGroupPendency = function (options, cbOk, cbErr) {
    if (!checkLogin(cbErr, true)) return;

    ConnManager.apiCall(SRV_NAME.GROUP, "handle_apply_join_group", {
          'GroupId': options.GroupId,
          'Applicant_Account': options.Applicant_Account,
          'HandleMsg': options.HandleMsg,
          'Authentication': options.Authentication,
          'MsgKey': options.MsgKey,
          'ApprovalMsg': options.ApprovalMsg,
          'UserDefinedField': options.UserDefinedField
        },
        cbOk,
        function (err) {
          if (err.ErrorCode == 10024) {//apply has be handled
            if (cbOk) {
              var resp = {
                'ActionStatus': ACTION_STATUS.OK,
                'ErrorCode': 0,
                'ErrorInfo': '该申请已经被处理过'
              };
              cbOk(resp);
            }
          } else {
            if (cbErr) cbErr(err);
          }
        }
    );
  };

  //主动退群
  var proto_quitGroup = function (options, cbOk, cbErr) {
    if (!checkLogin(cbErr, true)) return;

    ConnManager.apiCall(SRV_NAME.GROUP, "quit_group", {
          'GroupId': options.GroupId
        },
        cbOk, cbErr);
  };

  //退出大群
  var proto_quitBigGroup = function (options, cbOk, cbErr) {
    var srvName;
    if (!checkLogin(cbErr, false)) {//未登录
      srvName = SRV_NAME.BIG_GROUP;
    } else {//已登录
      srvName = SRV_NAME.GROUP;
    }
    ConnManager.apiCall(srvName, "quit_group",
        {'GroupId': options.GroupId},
        function (resp) {
          //重置当前再请求中的ajax
          //clearXmlHttpObjMap();
          //退出大群成功之后需要重置长轮询信息
          MsgManager.resetBigGroupLongPollingInfo();
          if (cbOk) cbOk(resp);
        },
        cbErr);
  };
  //查找群(按名称)
  var proto_searchGroupByName = function (options, cbOk, cbErr) {
    ConnManager.apiCall(SRV_NAME.GROUP, "search_group", options, cbOk, cbErr);
  };

  //获取群组公开资料
  var proto_getGroupPublicInfo = function (options, cbOk, cbErr) {
    if (!checkLogin(cbErr, true)) return;

    ConnManager.apiCall(SRV_NAME.GROUP, "get_group_public_info", {
          'GroupIdList': options.GroupIdList,
          'ResponseFilter': {
            'GroupBasePublicInfoFilter': options.GroupBasePublicInfoFilter
          }
        },
        function (resp) {
          resp.ErrorInfo = '';
          if (resp.GroupInfo) {
            for (var i in resp.GroupInfo) {
              var errorCode = resp.GroupInfo[i].ErrorCode;
              if (errorCode > 0) {
                resp.ActionStatus = ACTION_STATUS.FAIL;
                resp.GroupInfo[i].ErrorInfo = "[" + errorCode + "]" + resp.GroupInfo[i].ErrorInfo;
                resp.ErrorInfo += resp.GroupInfo[i].ErrorInfo + '\n';
              }
            }
          }
          if (resp.ActionStatus == ACTION_STATUS.FAIL) {
            if (cbErr) {
              cbErr(resp);
            }
          } else if (cbOk) {
            cbOk(resp);
          }

        },
        cbErr);
  };

  //获取群组详细资料--高级
  //请求协议参考：https://www.qcloud.com/doc/product/269/1616
  var proto_getGroupInfo = function (options, cbOk, cbErr) {
    if (!checkLogin(cbErr, true)) return;

    var opt = {
      'GroupIdList': options.GroupIdList,
      'ResponseFilter': {
        'GroupBaseInfoFilter': options.GroupBaseInfoFilter,
        'MemberInfoFilter': options.MemberInfoFilter
      }
    };
    if (options.AppDefinedDataFilter_Group) {
      opt.ResponseFilter.AppDefinedDataFilter_Group = options.AppDefinedDataFilter_Group;
    }
    if (options.AppDefinedDataFilter_GroupMember) {
      opt.ResponseFilter.AppDefinedDataFilter_GroupMember = options.AppDefinedDataFilter_GroupMember;
    }
    ConnManager.apiCall(SRV_NAME.GROUP, "get_group_info", opt,
        cbOk, cbErr);
  };

  //获取群组成员-高级接口
  //协议参考：https://www.qcloud.com/doc/product/269/1617
  var proto_getGroupMemberInfo = function (options, cbOk, cbErr) {
    if (!checkLogin(cbErr, true)) return;

    ConnManager.apiCall(SRV_NAME.GROUP, "get_group_member_info", {
          'GroupId': options.GroupId,
          'Offset': options.Offset,
          'Limit': options.Limit,
          'MemberInfoFilter': options.MemberInfoFilter,
          'MemberRoleFilter': options.MemberRoleFilter,
          'AppDefinedDataFilter_GroupMember': options.AppDefinedDataFilter_GroupMember
        },
        cbOk, cbErr);
  };


  //增加群组成员
  //协议参考：https://www.qcloud.com/doc/product/269/1621
  var proto_addGroupMember = function (options, cbOk, cbErr) {
    if (!checkLogin(cbErr, true)) return;

    ConnManager.apiCall(SRV_NAME.GROUP, "add_group_member", {
          'GroupId': options.GroupId,
          'Silence': options.Silence,
          'MemberList': options.MemberList
        },
        cbOk, cbErr);
  };
  //修改群组成员资料
  //协议参考：https://www.qcloud.com/doc/product/269/1623
  var proto_modifyGroupMember = function (options, cbOk, cbErr) {
    if (!checkLogin(cbErr, true)) return;
    var opt = {};
    if (options.GroupId) {
      opt.GroupId = options.GroupId;
    }
    if (options.Member_Account) {
      opt.Member_Account = options.Member_Account;
    }
    //Admin或者Member
    if (options.Role) {
      opt.Role = options.Role;
    }
    // AcceptAndNotify代表解收并提示消息，Discard代表不接收也不提示消息，AcceptNotNotify代表接收消息但不提示
    if (options.MsgFlag) {
      opt.MsgFlag = options.MsgFlag;
    }
    if (options.ShutUpTime) {//禁言时间
      opt.ShutUpTime = options.ShutUpTime;
    }
    if (options.NameCard) {//群名片,最大不超过50个字节
      opt.NameCard = options.NameCard;
    }
    if (options.AppMemberDefinedData) {//群成员维度的自定义字段，默认情况是没有的，需要开通
      opt.AppMemberDefinedData = options.AppMemberDefinedData;
    }
    ConnManager.apiCall(SRV_NAME.GROUP, "modify_group_member_info", opt,
        cbOk, cbErr);
  };
  //删除群组成员
  //协议参考：https://www.qcloud.com/doc/product/269/1622
  var proto_deleteGroupMember = function (options, cbOk, cbErr) {
    if (!checkLogin(cbErr, true)) return;

    ConnManager.apiCall(SRV_NAME.GROUP, "delete_group_member", {
          'GroupId': options.GroupId,
          'Silence': options.Silence,
          'MemberToDel_Account': options.MemberToDel_Account,
          'Reason': options.Reason
        },
        cbOk, cbErr);
  };
  //解散群组
  //协议参考：https://www.qcloud.com/doc/product/269/1624
  var proto_destroyGroup = function (options, cbOk, cbErr) {
    if (!checkLogin(cbErr, true)) return;

    ConnManager.apiCall(SRV_NAME.GROUP, "destroy_group", {
          'GroupId': options.GroupId
        },
        cbOk, cbErr);
  };
  //转让群组
  //协议参考：https://www.qcloud.com/doc/product/269/1633
  var proto_changeGroupOwner = function (options, cbOk, cbErr) {
    if (!checkLogin(cbErr, true)) return;
    ConnManager.apiCall(SRV_NAME.GROUP, "change_group_owner", options, cbOk, cbErr);
  };
  //获取用户所加入的群组-高级接口
  //协议参考：https://www.qcloud.com/doc/product/269/1625
  var proto_getJoinedGroupListHigh = function (options, cbOk, cbErr) {
    if (!checkLogin(cbErr, true)) return;

    ConnManager.apiCall(SRV_NAME.GROUP, "get_joined_group_list", {
          'Member_Account': options.Member_Account,
          'Limit': options.Limit,
          'Offset': options.Offset,
          'GroupType': options.GroupType,
          'ResponseFilter': {
            'GroupBaseInfoFilter': options.GroupBaseInfoFilter,
            'SelfInfoFilter': options.SelfInfoFilter
          }
        },
        cbOk, cbErr);
  };
  //查询一组UserId在群中的身份
  //协议参考：https://www.qcloud.com/doc/product/269/1626
  var proto_getRoleInGroup = function (options, cbOk, cbErr) {
    if (!checkLogin(cbErr, true)) return;

    ConnManager.apiCall(SRV_NAME.GROUP, "get_role_in_group", {
          'GroupId': options.GroupId,
          'User_Account': options.User_Account
        },
        cbOk, cbErr);
  };
  //设置取消成员禁言时间
  //协议参考：https://www.qcloud.com/doc/product/269/1627
  var proto_forbidSendMsg = function (options, cbOk, cbErr) {
    if (!checkLogin(cbErr, true)) return;

    ConnManager.apiCall(SRV_NAME.GROUP, "forbid_send_msg", {
          'GroupId': options.GroupId,
          'Members_Account': options.Members_Account,
          'ShutUpTime': options.ShutUpTime//单位为秒，为0时表示取消禁言
        },
        cbOk, cbErr);
  };

  //发送自定义群系统通知
  var proto_sendCustomGroupNotify = function (options, cbOk, cbErr) {
    if (!checkLogin(cbErr, true)) return;
    ConnManager.apiCall(SRV_NAME.GROUP, "send_group_system_notification", options,
        cbOk, cbErr);
  };

  //拉取群消息接口
  var proto_getGroupMsgs = function (options, cbOk, cbErr) {
    if (!checkLogin(cbErr, true)) return;
    ConnManager.apiCall(SRV_NAME.GROUP, "group_msg_get", {
          "GroupId": options.GroupId,
          "ReqMsgSeq": options.ReqMsgSeq,
          "ReqMsgNumber": options.ReqMsgNumber
        },
        cbOk, cbErr);
  };
  //群消息已读上报接口
  var proto_groupMsgReaded = function (options, cbOk, cbErr) {
    if (!checkLogin(cbErr, true)) return;
    ConnManager.apiCall(SRV_NAME.GROUP, "msg_read_report", {
          'GroupId': options.GroupId,
          'MsgReadedSeq': options.MsgReadedSeq
        },
        cbOk, cbErr);
  };
  //end

  //好友接口
  //处理好友接口返回的错误码
  var convertErrorEn2ZhFriend = function (resp) {
    var errorAccount = [];
    if (resp.Fail_Account && resp.Fail_Account.length) {
      errorAccount = resp.Fail_Account;
    }
    if (resp.Invalid_Account && resp.Invalid_Account.length) {
      for (var k in resp.Invalid_Account) {
        errorAccount.push(resp.Invalid_Account[k]);
      }
    }
    if (errorAccount.length) {
      resp.ActionStatus = ACTION_STATUS.FAIL;
      resp.ErrorCode = ERROR_CODE_CUSTOM;
      resp.ErrorInfo = '';
      for (var i in errorAccount) {
        var failCount = errorAccount[i];
        for (var j in resp.ResultItem) {
          if (resp.ResultItem[j].To_Account == failCount) {

            var resultCode = resp.ResultItem[j].ResultCode;
            resp.ResultItem[j].ResultInfo = "[" + resultCode + "]" + resp.ResultItem[j].ResultInfo;
            resp.ErrorInfo += resp.ResultItem[j].ResultInfo + "\n";
            break;
          }
        }
      }
    }
    return resp;
  };
  //添加好友
  var proto_applyAddFriend = function (options, cbOk, cbErr) {
    if (!checkLogin(cbErr, true)) return;
    ConnManager.apiCall(SRV_NAME.FRIEND, "friend_add", {
          'From_Account': ctx.identifier,
          'AddFriendItem': options.AddFriendItem
        },
        function (resp) {
          var newResp = convertErrorEn2ZhFriend(resp);
          if (newResp.ActionStatus == ACTION_STATUS.FAIL) {
            if (cbErr) cbErr(newResp);
          } else if (cbOk) {
            cbOk(newResp);
          }
        }, cbErr);
  };
  //删除好友
  var proto_deleteFriend = function (options, cbOk, cbErr) {
    if (!checkLogin(cbErr, true)) return;
    ConnManager.apiCall(SRV_NAME.FRIEND, "friend_delete", {
          'From_Account': ctx.identifier,
          'To_Account': options.To_Account,
          'DeleteType': options.DeleteType
        },
        function (resp) {
          var newResp = convertErrorEn2ZhFriend(resp);
          if (newResp.ActionStatus == ACTION_STATUS.FAIL) {
            if (cbErr) cbErr(newResp);
          } else if (cbOk) {
            cbOk(newResp);
          }
        }, cbErr);
  };
  //获取好友申请
  var proto_getPendency = function (options, cbOk, cbErr) {
    if (!checkLogin(cbErr, true)) return;
    ConnManager.apiCall(SRV_NAME.FRIEND, "pendency_get", {
          "From_Account": ctx.identifier,
          "PendencyType": options.PendencyType,
          "StartTime": options.StartTime,
          "MaxLimited": options.MaxLimited,
          "LastSequence": options.LastSequence
        },
        cbOk, cbErr);
  };
  //删除好友申请
  var proto_deletePendency = function (options, cbOk, cbErr) {
    if (!checkLogin(cbErr, true)) return;
    ConnManager.apiCall(SRV_NAME.FRIEND, "pendency_delete", {
          "From_Account": ctx.identifier,
          "PendencyType": options.PendencyType,
          "To_Account": options.To_Account

        },
        function (resp) {
          var newResp = convertErrorEn2ZhFriend(resp);
          if (newResp.ActionStatus == ACTION_STATUS.FAIL) {
            if (cbErr) cbErr(newResp);
          } else if (cbOk) {
            cbOk(newResp);
          }
        }, cbErr);
  };
  //处理好友申请
  var proto_responseFriend = function (options, cbOk, cbErr) {
    if (!checkLogin(cbErr, true)) return;
    ConnManager.apiCall(SRV_NAME.FRIEND, "friend_response", {
          'From_Account': ctx.identifier,
          'ResponseFriendItem': options.ResponseFriendItem
        },
        function (resp) {
          var newResp = convertErrorEn2ZhFriend(resp);
          if (newResp.ActionStatus == ACTION_STATUS.FAIL) {
            if (cbErr) cbErr(newResp);
          } else if (cbOk) {
            cbOk(newResp);
          }
        }, cbErr);
  };
  //我的好友
  var proto_getAllFriend = function (options, cbOk, cbErr) {
    if (!checkLogin(cbErr, true)) return;
    ConnManager.apiCall(SRV_NAME.FRIEND, "friend_get_all", {
          'From_Account': ctx.identifier,
          'TimeStamp': options.TimeStamp,
          'StartIndex': options.StartIndex,
          'GetCount': options.GetCount,
          'LastStandardSequence': options.LastStandardSequence,
          'TagList': options.TagList
        },
        cbOk, cbErr);
  };

  //资料接口
  //查看个人资料
  var proto_getProfilePortrait = function (options, cbOk, cbErr) {
    if (!checkLogin(cbErr, true)) return;
    ConnManager.apiCall(SRV_NAME.PROFILE, "portrait_get", {
          'From_Account': ctx.identifier,
          'To_Account': options.To_Account,
          //'LastStandardSequence':options.LastStandardSequence,
          'TagList': options.TagList
        },
        function (resp) {
          var errorAccount = [];
          if (resp.Fail_Account && resp.Fail_Account.length) {
            errorAccount = resp.Fail_Account;
          }
          if (resp.Invalid_Account && resp.Invalid_Account.length) {
            for (var k in resp.Invalid_Account) {
              errorAccount.push(resp.Invalid_Account[k]);
            }
          }
          if (errorAccount.length) {
            resp.ActionStatus = ACTION_STATUS.FAIL;
            resp.ErrorCode = ERROR_CODE_CUSTOM;
            resp.ErrorInfo = '';
            for (var i in errorAccount) {
              var failCount = errorAccount[i];
              for (var j in resp.UserProfileItem) {
                if (resp.UserProfileItem[j].To_Account == failCount) {
                  var resultCode = resp.UserProfileItem[j].ResultCode;
                  resp.UserProfileItem[j].ResultInfo = "[" + resultCode + "]" + resp.UserProfileItem[j].ResultInfo;
                  resp.ErrorInfo += "账号:" + failCount + "," + resp.UserProfileItem[j].ResultInfo + "\n";
                  break;
                }
              }
            }
          }
          if (resp.ActionStatus == ACTION_STATUS.FAIL) {
            if (cbErr) cbErr(resp);
          } else if (cbOk) {
            cbOk(resp);
          }
        },
        cbErr);
  };

  //设置个人资料
  var proto_setProfilePortrait = function (options, cbOk, cbErr) {
    if (!checkLogin(cbErr, true)) return;
    ConnManager.apiCall(SRV_NAME.PROFILE, "portrait_set",
        {
          'From_Account': ctx.identifier,
          'ProfileItem': options.ProfileItem
        },
        function (resp) {
          for (var i in options.ProfileItem) {
            var profile = options.ProfileItem[i];
            if (profile.Tag == 'Tag_Profile_IM_Nick') {
              ctx.identifierNick = profile.Value;//更新昵称
              break;
            }
          }
          if (cbOk) cbOk(resp);
        }
        , cbErr);
  };

  //增加黑名单
  var proto_addBlackList = function (options, cbOk, cbErr) {
    if (!checkLogin(cbErr, true)) return;
    ConnManager.apiCall(SRV_NAME.FRIEND, "black_list_add", {
          'From_Account': ctx.identifier,
          'To_Account': options.To_Account
        },
        function (resp) {
          var newResp = convertErrorEn2ZhFriend(resp);
          if (newResp.ActionStatus == ACTION_STATUS.FAIL) {
            if (cbErr) cbErr(newResp);
          } else if (cbOk) {
            cbOk(newResp);
          }
        }, cbErr);
  };

  //删除黑名单
  var proto_deleteBlackList = function (options, cbOk, cbErr) {
    if (!checkLogin(cbErr, true)) return;
    ConnManager.apiCall(SRV_NAME.FRIEND, "black_list_delete", {
          'From_Account': ctx.identifier,
          'To_Account': options.To_Account
        },
        function (resp) {
          var newResp = convertErrorEn2ZhFriend(resp);
          if (newResp.ActionStatus == ACTION_STATUS.FAIL) {
            if (cbErr) cbErr(newResp);
          } else if (cbOk) {
            cbOk(newResp);
          }
        }, cbErr);
  };

  //我的黑名单
  var proto_getBlackList = function (options, cbOk, cbErr) {
    if (!checkLogin(cbErr, true)) return;
    ConnManager.apiCall(SRV_NAME.FRIEND, "black_list_get", {
          'From_Account': ctx.identifier,
          'StartIndex': options.StartIndex,
          'MaxLimited': options.MaxLimited,
          'LastSequence': options.LastSequence
        },
        cbOk, cbErr);
  };

  //获取最近联系人
  var proto_getRecentContactList = function (options, cbOk, cbErr) {
    if (!checkLogin(cbErr, true)) return;
    ConnManager.apiCall(SRV_NAME.RECENT_CONTACT, "get", {
          'From_Account': ctx.identifier,
          'Count': options.Count
        },
        cbOk, cbErr);
  };

  //上传图片或文件
  var proto_uploadPic = function (options, cbOk, cbErr) {
    if (!checkLogin(cbErr, true)) return;
    if (isAccessFormalEnv()) {
      cmdName = 'pic_up';
    } else {
      cmdName = 'pic_up_test';
    }
    ConnManager.apiCall(SRV_NAME.PIC, cmdName, {
          'App_Version': VERSION_INFO.APP_VERSION,
          'From_Account': ctx.identifier,
          'To_Account': options.To_Account,
          'Seq': options.Seq,
          'Timestamp': options.Timestamp,
          'Random': options.Random,
          'File_Str_Md5': options.File_Str_Md5,
          'File_Size': options.File_Size,
          'File_Type': options.File_Type,
          'Server_Ver': VERSION_INFO.SERVER_VERSION,
          'Auth_Key': authkey,
          'Busi_Id': options.Busi_Id,
          'PkgFlag': options.PkgFlag,
          'Slice_Offset': options.Slice_Offset,
          'Slice_Size': options.Slice_Size,
          'Slice_Data': options.Slice_Data
        },
        cbOk, cbErr);
  };

  //获取语音和文件下载IP和authkey
  var proto_getIpAndAuthkey = function (cbOk, cbErr) {
    if (!checkLogin(cbErr, true)) return;
    ConnManager.apiCall(SRV_NAME.OPEN_IM, "authkey", {}, cbOk, cbErr);
  };

  //接口质量上报
  var proto_reportApiQuality = function (options, cbOk, cbErr) {
    if (!checkLogin(cbErr, true)) return;
    ConnManager.apiCall(SRV_NAME.IM_OPEN_STAT, "web_report", options, cbOk, cbErr);
  };


  var proto_getLongPollingId = function (options, cbOk, cbErr) {
    if (!checkLogin(cbErr, true)) return;
    ConnManager.apiCall( SRV_NAME.OPEN_IM, "getlongpollingid",{},
        function (resp) {
          cbOk && cbOk(resp);
        }, cbErr);
  }


  var proto_applyDownload = function (options, cbOk, cbErr) {
    //把下载地址push到map中
    ConnManager.apiCall( SRV_NAME.PIC, "apply_download", options, cbOk, cbErr);
  }

  //end
  // initBrowserInfo();
  // singleton object ConnManager
  var ConnManager = lowerBR == false
      ? new function () {
        var onConnCallback = null;        //回调函数
        this.init = function (onConnNotify, cbOk, cbErr) {
          if (onConnNotify) onConnCallback = onConnNotify;
        };
        this.callBack = function (info) {
          if (onConnCallback) onConnCallback(info);
        };
        this.clear = function () {
          onConnCallback = null;
        };
        //请求后台服务接口
        this.apiCall = function (type, cmd, data, cbOk, cbErr, timeout, isLongPolling) {
          //封装后台服务接口地址
          var url = getApiUrl(type, cmd, cbOk, cbErr);
          if (url == false) return;
          //发起ajax请求
          ajaxRequestJson("POST", url, data, timeout, isLongPolling, function (resp) {
            var errorCode = null, tempErrorInfo = '';
            if(cmd=='pic_up'){
              data.Slice_Data='';
            }
            var info = "\n request url: \n" + url + "\n request body: \n" + JSON.stringify(data) + "\n response: \n" + JSON.stringify(resp);
            //成功
            if (resp.ActionStatus == ACTION_STATUS.OK) {
              log.info("[" + type + "][" + cmd + "]success: " + info);
              if (cbOk) cbOk(resp);//回调
              errorCode = 0;
              tempErrorInfo = '';
            } else {
              errorCode = resp.ErrorCode;
              tempErrorInfo = resp.ErrorInfo;
              //报错
              if (cbErr) {
                resp.SrcErrorInfo = resp.ErrorInfo;
                resp.ErrorInfo = "[" + type + "][" + cmd + "]failed: " + info;
                if (cmd != 'longpolling' || resp.ErrorCode != longPollingTimeOutErrorCode) {
                  log.error(resp.ErrorInfo);
                }
                cbErr(resp);
              }
            }
            reportApiQuality(cmd, errorCode, tempErrorInfo);//接口质量上报
          }, function (err) {
            cbErr && cbErr(err);
            reportApiQuality(cmd, err.ErrorCode, err.ErrorInfo);//接口质量上报
          });
        };
      }
      : new function () {
        var onConnCallback = null;        //回调函数
        this.init = function (onConnNotify, cbOk, cbErr) {
          if (onConnNotify) onConnCallback = onConnNotify;
        };
        this.callBack = function (info) {
          if (onConnCallback) onConnCallback(info);
        };
        this.clear = function () {
          onConnCallback = null;
        };
        //请求后台服务接口
        this.apiCall = function (type, cmd, data, cbOk, cbErr, timeout, isLongPolling) {
          //封装后台服务接口地址
          var url = getApiUrl(type, cmd, cbOk, cbErr);
          if (url == false) return;
          //发起jsonp请求
          var reqId = jsonpRequestId++,
              cbkey = 'jsonpcallback', // the 'callback' key
              cbval = 'jsonpRequest' + reqId, // the 'callback' value
              script = document.createElement('script'),
              loaded = 0;

          window[cbval] = jsonpCallback;
          script.type = 'text/javascript';
          url = url + "&" + cbkey + "=" + cbval + "&jsonpbody=" + encodeURIComponent(JSON.stringify(data));
          script.src = url;
          script.async = true;

          if (typeof script.onreadystatechange !== 'undefined') {
            // need this for IE due to out-of-order onreadystatechange(), binding script
            // execution to an event listener gives us control over when the script
            // is executed. See http://jaubourg.net/2010/07/loading-script-as-onclick-handler-of.html
            script.event = 'onclick';
            script.htmlFor = script.id = '_jsonpRequest_' + reqId;
          }

          script.onload = script.onreadystatechange = function () {
            if ((this.readyState && this.readyState !== 'complete' && this.readyState !== 'loaded') || loaded) {
              return false;
            }
            script.onload = script.onreadystatechange = null;
            script.onclick && script.onclick();
            // Call the user callback with the last value stored and clean up values and scripts.
            var resp = jsonpLastRspData;
            var info = "\n request url: \n" + url + "\n request body: \n" + JSON.stringify(data) + "\n response: \n" + JSON.stringify(resp);
            if (resp.ActionStatus == ACTION_STATUS.OK) {
              log.info("[" + type + "][" + cmd + "]success: " + info);
              cbOk && cbOk(resp);
            } else {
              resp.ErrorInfo = "[" + type + "][" + cmd + "]failed " + info;
              if (cmd != 'longpolling' || resp.ErrorCode != longPollingTimeOutErrorCode) {
                log.error(resp.ErrorInfo);
              } else {
                log.warn("[" + type + "][" + cmd + "]success: " + info);
              }
              cbErr && cbErr(resp);
            }
            jsonpLastRspData = undefined;
            document.body.removeChild(script);
            loaded = 1;
          };

          // Add the script to the DOM head
          document.body.appendChild(script);
        };
      };
  // class Session
  var Session = function (type, id, name, icon, time, seq) {
    this._impl = {
      skey: Session.skey(type, id),
      type: type,
      id: id,
      name: name,
      icon: icon,
      unread: 0,//未读消息数
      isAutoRead: false,
      time: time >= 0 ? time : 0,
      curMaxMsgSeq: seq >= 0 ? seq : 0,
      msgs: [],
      isFinished : 1
    };
  };
  Session.skey = function (type, id) {
    return type + id;
  };
  Session.prototype.type = function () {
    return this._impl.type;
  };
  Session.prototype.id = function () {
    return this._impl.id;
  };
  Session.prototype.name = function () {
    return this._impl.name;
  };
  Session.prototype.icon = function () {
    return this._impl.icon;
  };
  Session.prototype.unread = function (val) {
    if(typeof val !== 'undefined'){
      this._impl.unread = val;
    }else{
      return this._impl.unread;
    }
  };
  Session.prototype.isFinished = function (val) {
    if(typeof val !== 'undefined'){
      this._impl.isFinished = val;
    }else{
      return this._impl.isFinished;
    }
  };
  Session.prototype.time = function () {
    return this._impl.time;
  };
  Session.prototype.curMaxMsgSeq = function (seq) {
    if(typeof seq !== 'undefined'){
      this._impl.curMaxMsgSeq = seq;
    }else{
      return this._impl.curMaxMsgSeq;
    }
  };
  Session.prototype.msgCount = function () {
    return this._impl.msgs.length;
  };
  Session.prototype.msg = function (index) {
    return this._impl.msgs[index];
  };
  Session.prototype.msgs = function () {
    return this._impl.msgs;
  };
  Session.prototype._impl_addMsg = function (msg) {
    this._impl.msgs.push(msg);
    //if (!msg.isSend && msg.time > this._impl.time)
    if (msg.time > this._impl.time)
      this._impl.time = msg.time;
    //if (!msg.isSend && msg.seq > this._impl.curMaxMsgSeq)
    if (msg.seq > this._impl.curMaxMsgSeq)
      this._impl.curMaxMsgSeq = msg.seq;
    //自己发送的消息不计入未读数
    if (!msg.isSend && !this._impl.isAutoRead) {
      this._impl.unread++;
    }
  };
  //class C2CMsgReadedItem
  var C2CMsgReadedItem = function (toAccount, lastedMsgTime) {
    this.toAccount = toAccount;
    this.lastedMsgTime = lastedMsgTime;
  }
  // class Msg
  var Msg = function (sess, isSend, seq, random, time, fromAccount, subType, fromAccountNick) {
    this.sess = sess;
    this.subType = subType >= 0 ? subType : 0;//消息类型,c2c消息时，type取值为0；group消息时，type取值0和1，0-普通群消息，1-群提示消息
    this.fromAccount = fromAccount;
    this.fromAccountNick = fromAccountNick ? fromAccountNick : fromAccount;
    this.isSend = Boolean(isSend);
    this.seq = seq >= 0 ? seq : nextSeq();
    this.random = random >= 0 ? random : createRandom();
    this.time = time >= 0 ? time : unixtime();
    this.elems = [];
  };
  Msg.prototype.getSession = function () {
    return this.sess;
  };
  Msg.prototype.getType = function () {
    return this.subType;
  };
  Msg.prototype.getSubType = function () {
    return this.subType;
  };
  Msg.prototype.getFromAccount = function () {
    return this.fromAccount;
  };
  Msg.prototype.getFromAccountNick = function () {
    return this.fromAccountNick;
  };
  Msg.prototype.getIsSend = function () {
    return this.isSend;
  };
  Msg.prototype.getSeq = function () {
    return this.seq;
  };
  Msg.prototype.getTime = function () {
    return this.time;
  };
  Msg.prototype.getRandom = function () {
    return this.random;
  };
  Msg.prototype.getElems = function () {
    return this.elems;
  };
  //文本
  Msg.prototype.addText = function (text) {
    this.addElem(new webim.Msg.Elem(MSG_ELEMENT_TYPE.TEXT, text));
  };
  //表情
  Msg.prototype.addFace = function (face) {
    this.addElem(new webim.Msg.Elem(MSG_ELEMENT_TYPE.FACE, face));
  };
  //图片
  Msg.prototype.addImage = function (image) {
    this.addElem(new webim.Msg.Elem(MSG_ELEMENT_TYPE.IMAGE, image));
  };
  //地理位置
  Msg.prototype.addLocation = function (location) {
    this.addElem(new webim.Msg.Elem(MSG_ELEMENT_TYPE.LOCATION, location));
  };
  //文件
  Msg.prototype.addFile = function (file) {
    this.addElem(new webim.Msg.Elem(MSG_ELEMENT_TYPE.FILE, file));
  };
  //自定义
  Msg.prototype.addCustom = function (custom) {
    this.addElem(new webim.Msg.Elem(MSG_ELEMENT_TYPE.CUSTOM, custom));
  };
  Msg.prototype.addElem = function (elem) {
    this.elems.push(elem);
  };
  Msg.prototype.toHtml = function () {
    var html = "";
    for (var i in this.elems) {
      var elem = this.elems[i];
      html += elem.toHtml();
    }
    return html;
  };

  // class Msg.Elem
  Msg.Elem = function (type, value) {
    this.type = type;
    this.content = value;
  };
  Msg.Elem.prototype.getType = function () {
    return this.type;
  };
  Msg.Elem.prototype.getContent = function () {
    return this.content;
  };
  Msg.Elem.prototype.toHtml = function () {
    var html;
    html = this.content.toHtml();
    return html;
  };

  // class Msg.Elem.Text
  Msg.Elem.Text = function (text) {
    this.text = tool.xssFilter(text);
  };
  Msg.Elem.Text.prototype.getText = function () {
    return this.text;
  };
  Msg.Elem.Text.prototype.toHtml = function () {
    return this.text;
  };

  // class Msg.Elem.Face
  Msg.Elem.Face = function (index, data) {
    this.index = index;
    this.data = data;
  };
  Msg.Elem.Face.prototype.getIndex = function () {
    return this.index;
  };
  Msg.Elem.Face.prototype.getData = function () {
    return this.data;
  };
  Msg.Elem.Face.prototype.toHtml = function () {
    var faceUrl = null;
    var index = emotionDataIndexs[this.data];
    var emotion = emotions[index];
    if (emotion && emotion[1]) {
      faceUrl = emotion[1];
    }
    if (faceUrl) {
      // return "<img src='" + faceUrl + "'/>";
      return  `__face_${faceUrl}__`;
    } else {
      return this.data;
    }
  };

  // 地理位置消息 class Msg.Elem.Location
  Msg.Elem.Location = function (longitude, latitude, desc) {
    this.latitude = latitude;//纬度
    this.longitude = longitude;//经度
    this.desc = desc;//描述
  };
  Msg.Elem.Location.prototype.getLatitude = function () {
    return this.latitude;
  };
  Msg.Elem.Location.prototype.getLongitude = function () {
    return this.longitude;
  };
  Msg.Elem.Location.prototype.getDesc = function () {
    return this.desc;
  };
  Msg.Elem.Location.prototype.toHtml = function () {
    return '经度=' + this.longitude + ',纬度=' + this.latitude + ',描述=' + this.desc;
  };

  //图片消息
  // class Msg.Elem.Images
  Msg.Elem.Images = function (imageId) {
    this.UUID = imageId;
    this.ImageInfoArray = [];
  };
  Msg.Elem.Images.prototype.addImage = function (image) {
    this.ImageInfoArray.push(image);
  };
  Msg.Elem.Images.prototype.toHtml = function () {
    var smallImage = this.getImage(IMAGE_TYPE.SMALL);
    var bigImage = this.getImage(IMAGE_TYPE.LARGE);
    var oriImage = this.getImage(IMAGE_TYPE.ORIGIN);
    if (!bigImage) {
      bigImage = smallImage;
    }
    if (!oriImage) {
      oriImage = smallImage;
    }
    return "<img src='" + smallImage.getUrl() + "#" + bigImage.getUrl() + "#" + oriImage.getUrl() + "' style='CURSOR: hand' id='" + this.getImageId() + "' bigImgUrl='" + bigImage.getUrl() + "' onclick='imageClick(this)' />";

  };
  Msg.Elem.Images.prototype.getImageId = function () {
    return this.UUID;
  };
  Msg.Elem.Images.prototype.getImage = function (type) {
    for (var i in this.ImageInfoArray) {
      if (this.ImageInfoArray[i].getType() == type) {
        return this.ImageInfoArray[i];
      }
    }
    return null;
  };
  // class Msg.Elem.Images.Image
  Msg.Elem.Images.Image = function (type, size, width, height, url) {
    this.type = type;
    this.size = size;
    this.width = width;
    this.height = height;
    this.url = url;
  };
  Msg.Elem.Images.Image.prototype.getType = function () {
    return this.type;
  };
  Msg.Elem.Images.Image.prototype.getSize = function () {
    return this.size;
  };
  Msg.Elem.Images.Image.prototype.getWidth = function () {
    return this.width;
  };
  Msg.Elem.Images.Image.prototype.getHeight = function () {
    return this.height;
  };
  Msg.Elem.Images.Image.prototype.getUrl = function () {
    return this.url;
  };

  // class Msg.Elem.Sound
  Msg.Elem.Sound = function (uuid, second, size, senderId, receiverId, downFlag,  chatType) {
    this.uuid = uuid;//文件id
    this.second = second;//时长，单位：秒
    this.size = size;//大小，单位：字节
    this.senderId = senderId;//发送者
    this.receiverId = receiverId;//接收方id
    this.downFlag = downFlag;//下载标志位
    this.busiId = chatType == SESSION_TYPE.C2C ? 2 : 1;//busi_id ( 1：群    2:C2C)

    //根据不同情况拉取数据
    //是否需要申请下载地址  0:到架平申请  1:到cos申请  2:不需要申请, 直接拿url下载
    if(downFlag !== undefined && busiId !== undefined){
      getFileDownUrlV2(uuid, senderId, second, downFlag,receiverId,  this.busiId , UPLOAD_RES_TYPE.SOUND);
    }else{
      this.downUrl = getSoundDownUrl(uuid, senderId, second);//下载地址
    }
  };
  Msg.Elem.Sound.prototype.getUUID = function () {
    return this.uuid;
  };
  Msg.Elem.Sound.prototype.getSecond = function () {
    return this.second;
  };
  Msg.Elem.Sound.prototype.getSize = function () {
    return this.size;
  };
  Msg.Elem.Sound.prototype.getSenderId = function () {
    return this.senderId;
  };
  Msg.Elem.Sound.prototype.getDownUrl = function () {
    return this.downUrl;
  };
  Msg.Elem.Sound.prototype.toHtml = function () {
    if (BROWSER_INFO.type == 'ie' && parseInt(BROWSER_INFO.ver) <= 8) {
      return '[这是一条语音消息]demo暂不支持ie8(含)以下浏览器播放语音,语音URL:' + this.downUrl;
    }
    return '<audio id="uuid_'+this.uuid+'" src="' + this.downUrl + '" controls="controls" onplay="onChangePlayAudio(this)" preload="none"></audio>';
  };

  // class Msg.Elem.File
  Msg.Elem.File = function (uuid, name, size, senderId, receiverId, downFlag, chatType) {
    this.uuid = uuid;//文件id
    this.name = name;//文件名
    this.size = size;//大小，单位：字节
    this.senderId = senderId;//发送者
    this.receiverId = receiverId;//接收方id
    this.downFlag = downFlag;//下载标志位

    this.busiId = chatType == SESSION_TYPE.C2C ? 2 : 1;//busi_id ( 1：群    2:C2C)
    //根据不同情况拉取数据
    //是否需要申请下载地址  0:到架平申请  1:到cos申请  2:不需要申请, 直接拿url下载
    if(downFlag !== undefined && busiId !== undefined){
      getFileDownUrlV2(uuid, senderId, name, downFlag,receiverId,  this.busiId , UPLOAD_RES_TYPE.FILE);
    }else{
      this.downUrl = getFileDownUrl(uuid, senderId, name);//下载地址
    }
  };
  Msg.Elem.File.prototype.getUUID = function () {
    return this.uuid;
  };
  Msg.Elem.File.prototype.getName = function () {
    return this.name;
  };
  Msg.Elem.File.prototype.getSize = function () {
    return this.size;
  };
  Msg.Elem.File.prototype.getSenderId = function () {
    return this.senderId;
  };
  Msg.Elem.File.prototype.getDownUrl = function () {
    return this.downUrl;
  };
  Msg.Elem.File.prototype.getDownFlag = function () {
    return this.downFlag;
  };
  Msg.Elem.File.prototype.toHtml = function () {
    var fileSize, unitStr;
    fileSize = this.size;
    unitStr = "Byte";
    if (this.size >= 1024) {
      fileSize = Math.round(this.size / 1024);
      unitStr = "KB";
    }
    return '<a href="javascript" onclick="webim.onDownFile("'+this.uuid+'")" title="点击下载文件" ><i class="glyphicon glyphicon-file">&nbsp;' + this.name + '(' + fileSize + unitStr + ')</i></a>';
  };

  // class Msg.Elem.GroupTip 群提示消息对象
  Msg.Elem.GroupTip = function (opType, opUserId, groupId, groupName, userIdList) {
    this.opType = opType;//操作类型
    this.opUserId = opUserId;//操作者id
    this.groupId = groupId;//群id
    this.groupName = groupName;//群名称
    this.userIdList = userIdList ? userIdList : [];//被操作的用户id列表
    this.groupInfoList = [];//新的群资料信息，群资料变更时才有值
    this.memberInfoList = [];//新的群成员资料信息，群成员资料变更时才有值
    this.groupMemberNum = null;//群成员数，操作类型为加群或者退群时才有值
  };
  Msg.Elem.GroupTip.prototype.addGroupInfo = function (groupInfo) {
    this.groupInfoList.push(groupInfo);
  };
  Msg.Elem.GroupTip.prototype.addMemberInfo = function (memberInfo) {
    this.memberInfoList.push(memberInfo);
  };
  Msg.Elem.GroupTip.prototype.getOpType = function () {
    return this.opType;
  };
  Msg.Elem.GroupTip.prototype.getOpUserId = function () {
    return this.opUserId;
  };
  Msg.Elem.GroupTip.prototype.getGroupId = function () {
    return this.groupId;
  };
  Msg.Elem.GroupTip.prototype.getGroupName = function () {
    return this.groupName;
  };
  Msg.Elem.GroupTip.prototype.getUserIdList = function () {
    return this.userIdList;
  };
  Msg.Elem.GroupTip.prototype.getGroupInfoList = function () {
    return this.groupInfoList;
  };
  Msg.Elem.GroupTip.prototype.getMemberInfoList = function () {
    return this.memberInfoList;
  };
  Msg.Elem.GroupTip.prototype.getGroupMemberNum = function () {
    return this.groupMemberNum;
  };
  Msg.Elem.GroupTip.prototype.setGroupMemberNum = function (groupMemberNum) {
    return this.groupMemberNum = groupMemberNum;
  };
  Msg.Elem.GroupTip.prototype.toHtml = function () {
    var text = ""
    var maxIndex = GROUP_TIP_MAX_USER_COUNT - 1;
    switch (this.opType) {
      case GROUP_TIP_TYPE.JOIN://加入群
        // text += this.opUserId + "邀请了";
        for (var m in this.userIdList) {
          text += this.userIdList[m] + ",";
          if (this.userIdList.length > GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
            text += "等" + this.userIdList.length + "人";
            break;
          }
        }
        text += " 来了";
        break;
      case GROUP_TIP_TYPE.QUIT://退出群
        text += this.opUserId + "离开了";
        break;
      case GROUP_TIP_TYPE.KICK://踢出群
        text += this.opUserId + "将";
        for (var m in this.userIdList) {
          text += this.userIdList[m] + ",";
          if (this.userIdList.length > GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
            text += "等" + this.userIdList.length + "人";
            break;
          }
        }
        text += "踢出该群";
        break;
      case GROUP_TIP_TYPE.SET_ADMIN://设置管理员
        text += this.opUserId + "将";
        for (var m in this.userIdList) {
          text += this.userIdList[m] + ",";
          if (this.userIdList.length > GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
            text += "等" + this.userIdList.length + "人";
            break;
          }
        }
        text += "设为管理员";
        break;
      case GROUP_TIP_TYPE.CANCEL_ADMIN://取消管理员
        text += this.opUserId + "取消";
        for (var m in this.userIdList) {
          text += this.userIdList[m] + ",";
          if (this.userIdList.length > GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
            text += "等" + this.userIdList.length + "人";
            break;
          }
        }
        text += "的管理员资格";
        break;


      case GROUP_TIP_TYPE.MODIFY_GROUP_INFO://群资料变更
        text += this.opUserId + "修改了群资料：";
        for (var m in this.groupInfoList) {
          var type = this.groupInfoList[m].getType();
          var value = this.groupInfoList[m].getValue();
          switch (type) {
            case GROUP_TIP_MODIFY_GROUP_INFO_TYPE.FACE_URL:
              text += "群头像为" + value + "; ";
              break;
            case GROUP_TIP_MODIFY_GROUP_INFO_TYPE.NAME:
              text += "群名称为" + value + "; ";
              break;
            case GROUP_TIP_MODIFY_GROUP_INFO_TYPE.OWNER:
              text += "群主为" + value + "; ";
              break;
            case GROUP_TIP_MODIFY_GROUP_INFO_TYPE.NOTIFICATION:
              text += "群公告为" + value + "; ";
              break;
            case GROUP_TIP_MODIFY_GROUP_INFO_TYPE.INTRODUCTION:
              text += "群简介为" + value + "; ";
              break;
            default:
              text += "未知信息为:type=" + type + ",value=" + value + "; ";
              break;
          }
        }
        break;

      case GROUP_TIP_TYPE.MODIFY_MEMBER_INFO://群成员资料变更(禁言时间)
        text += this.opUserId + "修改了群成员资料:";
        for (var m in this.memberInfoList) {
          var userId = this.memberInfoList[m].getUserId();
          var shutupTime = this.memberInfoList[m].getShutupTime();
          text += userId + ": ";
          if (shutupTime != null && shutupTime !== undefined) {
            if (shutupTime == 0) {
              text += "取消禁言; ";
            } else {
              text += "禁言" + shutupTime + "秒; ";
            }
          } else {
            text += " shutupTime为空";
          }
          if (this.memberInfoList.length > GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
            text += "等" + this.memberInfoList.length + "人";
            break;
          }
        }
        break;

      case GROUP_TIP_TYPE.READED://消息已读
        /**/
        Log.info("消息已读同步")
        break;
      default:
        text += "未知群提示消息类型：type=" + this.opType;
        break;
    }
    return text;
  };

  // class Msg.Elem.GroupTip.GroupInfo，变更的群资料信息对象
  Msg.Elem.GroupTip.GroupInfo = function (type, value) {
    this.type = type;//群资料信息类型
    this.value = value;//对应的值
  };
  Msg.Elem.GroupTip.GroupInfo.prototype.getType = function () {
    return this.type;
  };
  Msg.Elem.GroupTip.GroupInfo.prototype.getValue = function () {
    return this.value;
  };

  // class Msg.Elem.GroupTip.MemberInfo，变更的群成员资料信息对象
  Msg.Elem.GroupTip.MemberInfo = function (userId, shutupTime) {
    this.userId = userId;//群成员id
    this.shutupTime = shutupTime;//群成员被禁言时间，0表示取消禁言，大于0表示被禁言时长，单位：秒
  };
  Msg.Elem.GroupTip.MemberInfo.prototype.getUserId = function () {
    return this.userId;
  };
  Msg.Elem.GroupTip.MemberInfo.prototype.getShutupTime = function () {
    return this.shutupTime;
  };

  // 自定义消息类型 class Msg.Elem.Custom
  Msg.Elem.Custom = function (data, desc, ext) {
    this.data = data;//数据
    this.desc = desc;//描述
    this.ext = ext;//扩展字段
  };
  Msg.Elem.Custom.prototype.getData = function () {
    return this.data;
  };
  Msg.Elem.Custom.prototype.getDesc = function () {
    return this.desc;
  };
  Msg.Elem.Custom.prototype.getExt = function () {
    return this.ext;
  };
  Msg.Elem.Custom.prototype.toHtml = function () {
    return this.data;
  };

  // singleton object MsgStore
  var MsgStore = new function () {
    var sessMap = {};//跟所有用户或群的聊天记录MAP
    var sessTimeline = [];//按时间降序排列的会话列表
    window.msgCache = {};//消息缓存，用于判重
    //C2C
    this.cookie = "";//上一次拉取新c2c消息的cookie
    this.syncFlag = 0;//上一次拉取新c2c消息的是否继续拉取标记

    var visitSess = function (visitor) {
      for (var i in sessMap) {
        visitor(sessMap[i]);
      }
    };
    // window.msgCache = msgCache;
    //消息查重
    var checkDupMsg = function (msg) {
      var dup = false;
      var first_key = msg.sess._impl.skey;
      var second_key = msg.isSend + msg.seq + msg.random;
      var tempMsg = msgCache[first_key] && msgCache[first_key][second_key];
      if (tempMsg){
        dup = true;
      }
      if (msgCache[first_key]) {
        msgCache[first_key][second_key] = {time: msg.time};
      } else {
        msgCache[first_key] = {};
        msgCache[first_key][second_key] = {time: msg.time};
      }
      return dup;
    };

    this.sessMap = function () {
      return sessMap;
    };
    this.sessCount = function () {
      return sessTimeline.length;
    };
    this.sessByTypeId = function (type, id) {
      var skey = Session.skey(type, id);
      if (skey === undefined || skey == null) return null;
      return sessMap[skey];
    };
    this.delSessByTypeId = function (type, id) {
      var skey = Session.skey(type, id);
      if (skey === undefined || skey == null) return false;
      if (sessMap[skey]) {
        delete sessMap[skey];
        delete msgCache[skey];
      }
      return true;
    };
    this.resetCookieAndSyncFlag = function () {
      this.cookie = "";
      this.syncFlag = 0;
    };

    //切换将当前会话的自动读取消息标志为isOn,重置其他会话的自动读取消息标志为false
    this.setAutoRead = function (selSess, isOn, isResetAll) {
      if (isResetAll)
        visitSess(function (s) {
          s._impl.isAutoRead = false;
        });
      if (selSess) {
        selSess._impl.isAutoRead = isOn;//
        if (isOn) {//是否调用已读上报接口
          selSess._impl.unread = 0;

          if (selSess._impl.type == SESSION_TYPE.C2C) {//私聊消息已读上报
            var tmpC2CMsgReadedItem = [];
            tmpC2CMsgReadedItem.push(new C2CMsgReadedItem(selSess._impl.id, selSess._impl.time));
            //调用C2C消息已读上报接口
            proto_c2CMsgReaded(MsgStore.cookie,
                tmpC2CMsgReadedItem,
                function (resp) {
                  log.info("[setAutoRead]: c2CMsgReaded success");
                },
                function (err) {
                  log.error("[setAutoRead}: c2CMsgReaded failed:" + err.ErrorInfo);
                });
          } else if (selSess._impl.type == SESSION_TYPE.GROUP) {//群聊消息已读上报
            var tmpOpt = {
              'GroupId': selSess._impl.id,
              'MsgReadedSeq': selSess._impl.curMaxMsgSeq
            };
            //调用group消息已读上报接口
            proto_groupMsgReaded(tmpOpt,
                function (resp) {
                  log.info("groupMsgReaded success");

                },
                function (err) {
                  log.error("groupMsgReaded failed:" + err.ErrorInfo);

                });
          }
        }
      }
    };

    this.c2CMsgReaded = function (opts, cbOk, cbErr) {
      var tmpC2CMsgReadedItem = [];
      tmpC2CMsgReadedItem.push(new C2CMsgReadedItem(opts.To_Account, opts.LastedMsgTime));
      //调用C2C消息已读上报接口
      proto_c2CMsgReaded(MsgStore.cookie,
          tmpC2CMsgReadedItem,
          function (resp) {
            if (cbOk) {
              log.info("c2CMsgReaded success");
              cbOk(resp);
            }
          },
          function (err) {
            if (cbErr) {
              log.error("c2CMsgReaded failed:" + err.ErrorInfo);
              cbErr(err);
            }
          });
    };

    this.addSession = function (sess) {
      sessMap[sess._impl.skey] = sess;
    };
    this.delSession = function (sess) {
      delete sessMap[sess._impl.skey];
    };
    this.addMsg = function (msg) {
      if (checkDupMsg(msg)) return false;
      var sess = msg.sess;
      if (!sessMap[sess._impl.skey]) this.addSession(sess);
      sess._impl_addMsg(msg);
      return true;
    };
    this.updateTimeline = function () {
      var arr = new Array;
      visitSess(function (sess) {
        arr.push(sess);
      });
      arr.sort(function (a, b) {
        return b.time - a.time;
      });
      sessTimeline = arr;
    };
  };
  // singleton object MsgManager
  var MsgManager = new function () {

    var onMsgCallback = null;//新消息(c2c和group)回调

    var onGroupInfoChangeCallback = null;//群资料变化回调
    //收到新群系统消息回调列表
    var onGroupSystemNotifyCallbacks = {
      "1": null,
      "2": null,
      "3": null,
      "4": null,
      "5": null,
      "6": null,
      "7": null,
      "8": null,
      "9": null,
      "10": null,
      "11": null,
      "15": null,
      "255": null
    };
    //监听好友系统通知函数
    var onFriendSystemNotifyCallbacks={
      "1":null,
      "2":null,
      "3":null,
      "4":null,
      "5":null,
      "6":null,
      "7":null,
      "8":null
    };

    var onProfileSystemNotifyCallbacks= {
      "1" :null
    };

    var onMsgReadCallback = null;

    //普通长轮询
    var longPollingOn = false;//是否开启普通长轮询
    var isLongPollingRequesting = false;//是否在长轮询ing
    var notifySeq = 0;//c2c通知seq
    var noticeSeq = 0;//群消息seq

    //大群长轮询
    var onBigGroupMsgCallback = null;//大群消息回调
    var bigGroupLongPollingOn = false;//是否开启长轮询
    var bigGroupLongPollingStartSeq = 0;//请求拉消息的起始seq(大群长轮询)
    var bigGroupLongPollingHoldTime = 90;//客户端长轮询的超时时间，单位是秒(大群长轮询)
    var bigGroupLongPollingKey = null;//客户端加入群组后收到的的Key(大群长轮询)
    var bigGroupLongPollingMsgMap = {};//记录收到的群消息数


    var getLostGroupMsgCount = 0;//补拉丢失的群消息次数
    //我的群当前最大的seq
    var myGroupMaxSeqs = {};//用于补拉丢失的群消息

    var groupSystemMsgsCache = {};//群组系统消息缓存,用于判重

    //设置长轮询开关
    //isOn=true 开启
    //isOn=false 停止
    this.setLongPollingOn = function (isOn) {
      longPollingOn = isOn;
    };
    this.getLongPollingOn = function () {
      return longPollingOn;
    };

    //重置长轮询变量
    this.resetLongPollingInfo = function () {
      longPollingOn = false;
      notifySeq = 0;
      noticeSeq = 0;
    };

    //设置大群长轮询开关
    //isOn=true 开启
    //isOn=false 停止
    this.setBigGroupLongPollingOn = function (isOn) {
      bigGroupLongPollingOn = isOn;
    };
    //设置大群长轮询key
    this.setBigGroupLongPollingKey = function (key) {
      bigGroupLongPollingKey = key;
    };
    //重置大群长轮询变量
    this.resetBigGroupLongPollingInfo = function () {
      bigGroupLongPollingOn = false;
      bigGroupLongPollingStartSeq = 0;
      bigGroupLongPollingKey = null;
      bigGroupLongPollingMsgMap = {};
    };

    //设置群消息数据条数
    this.setBigGroupLongPollingMsgMap = function (groupId, count) {
      var bigGroupLongPollingMsgCount = bigGroupLongPollingMsgMap[groupId];
      if (bigGroupLongPollingMsgCount) {
        bigGroupLongPollingMsgCount = parseInt(bigGroupLongPollingMsgCount) + count;
        bigGroupLongPollingMsgMap[groupId] = bigGroupLongPollingMsgCount;
      } else {
        bigGroupLongPollingMsgMap[groupId] = count;
      }
    };

    //重置
    this.clear = function () {

      onGroupInfoChangeCallback = null;
      onGroupSystemNotifyCallbacks = {
        "1": null,//申请加群请求（只有管理员会收到）
        "2": null,//申请加群被同意（只有申请人能够收到）
        "3": null,//申请加群被拒绝（只有申请人能够收到）
        "4": null,//被管理员踢出群(只有被踢者接收到)
        "5": null,//群被解散(全员接收)
        "6": null,//创建群(创建者接收)
        "7": null,//邀请加群(被邀请者接收)
        "8": null,//主动退群(主动退出者接收)
        "9": null,//设置管理员(被设置者接收)
        "10": null,//取消管理员(被取消者接收)
        "11": null,//群已被回收(全员接收)
        "15": null,//群已被回收(全员接收)
        "255": null//用户自定义通知(默认全员接收)
      };
      onFriendSystemNotifyCallbacks = {
        "1": null,//好友表增加
        "2": null,//好友表删除
        "3": null,//未决增加
        "4": null,//未决删除
        "5": null,//黑名单增加
        "6": null,//黑名单删除
        "7": null,//未决已读上报
        "8": null//好友信息(备注，分组)变更
      };
      onProfileSystemNotifyCallbacks = {
        "1": null//资料修改
      };
      //重置普通长轮询参数
      onMsgCallback = null;
      longPollingOn = false;
      notifySeq = 0;//c2c新消息通知seq
      noticeSeq = 0;//group新消息seq

      //重置大群长轮询参数
      onBigGroupMsgCallback = null;
      bigGroupLongPollingOn = false;
      bigGroupLongPollingStartSeq = 0;
      bigGroupLongPollingKey = null;
      bigGroupLongPollingMsgMap = {};

      groupSystemMsgsCache = {};

      ipList = [];//文件下载地址
      authkey = null;//文件下载票据
      expireTime = null;//票据超时时间
    };

    //初始化文件下载ip和票据
    var initIpAndAuthkey = function (cbOk, cbErr) {
      proto_getIpAndAuthkey(function (resp) {
            ipList = resp.IpList;
            authkey = resp.AuthKey;
            expireTime = resp.ExpireTime;
            if (cbOk) cbOk(resp);
          },
          function (err) {
            log.error("initIpAndAuthkey failed:" + err.ErrorInfo);
            if (cbErr) cbErr(err);
          }
      );
    };

    //初始化我的群当前最大的seq，用于补拉丢失的群消息
    var initMyGroupMaxSeqs = function (cbOk, cbErr) {
      var opts = {
        'Member_Account': ctx.identifier,
        'Limit': 1000,
        'Offset': 0,
        'GroupBaseInfoFilter': [
          'NextMsgSeq'
        ]
      };
      proto_getJoinedGroupListHigh(opts, function (resp) {
            if (!resp.GroupIdList || resp.GroupIdList.length == 0) {
              log.info("initMyGroupMaxSeqs: 目前还没有加入任何群组");
              if (cbOk) cbOk(resp);
              return;
            }
            for (var i = 0; i < resp.GroupIdList.length; i++) {
              var group_id = resp.GroupIdList[i].GroupId;
              var curMaxSeq = resp.GroupIdList[i].NextMsgSeq - 1;
              myGroupMaxSeqs[group_id] = curMaxSeq;
            }

            if (cbOk) cbOk(resp);

          },
          function (err) {
            log.error("initMyGroupMaxSeqs failed:" + err.ErrorInfo);
            if (cbErr) cbErr(err);
          }
      );
    };

    //补拉群消息
    var getLostGroupMsgs = function (groupId, reqMsgSeq, reqMsgNumber) {
      getLostGroupMsgCount++;
      //发起一个拉群群消息请求
      var tempOpts = {
        'GroupId': groupId,
        'ReqMsgSeq': reqMsgSeq,
        'ReqMsgNumber': reqMsgNumber
      };
      //发起一个拉群群消息请求
      log.warn("第" + getLostGroupMsgCount + "次补齐群消息,参数=" + JSON.stringify(tempOpts));
      MsgManager.syncGroupMsgs(tempOpts);
    };

    //更新群当前最大消息seq
    var updateMyGroupCurMaxSeq=function(groupId,msgSeq){
      //更新myGroupMaxSeqs中的群最大seq
      var curMsgSeq=myGroupMaxSeqs[groupId]
      if(curMsgSeq){//如果存在，比较大小
        if(msgSeq>curMsgSeq){
          myGroupMaxSeqs[groupId]=msgSeq;
        }
      }else{//不存在，新增
        myGroupMaxSeqs[groupId]=msgSeq;
      }
    };

    //添加群消息列表
    var addGroupMsgList = function (msgs, new_group_msgs) {
      for (var p in msgs) {
        var newGroupMsg = msgs[p];
        //发群消息时，长轮询接口会返回用户自己发的群消息
        //if(newGroupMsg.From_Account && newGroupMsg.From_Account!=ctx.identifier ){
        if (newGroupMsg.From_Account) {
          //false-不是主动拉取的历史消息
          //true-需要保存到sdk本地session,并且需要判重
          var msg = handlerGroupMsg(newGroupMsg, false, true);
          if (msg) {//不为空，加到新消息里
            new_group_msgs.push(msg);
          }
          //更新myGroupMaxSeqs中的群最大seq
          updateMyGroupCurMaxSeq(newGroupMsg.ToGroupId,newGroupMsg.MsgSeq);
        }
      }
      return new_group_msgs;
    };

    //处理收到的群普通和提示消息
    var handlerOrdinaryAndTipC2cMsgs = function (eventType, groupMsgArray) {
      var groupMsgMap = {};//保存收到的C2c消息信息（群号，最小，最大消息seq，消息列表）
      var new_group_msgs = [];
      var minGroupMsgSeq = 99999999;
      var maxGroupMsgSeq = -1;
      for (var j in groupMsgArray) {

        var groupMsgs = groupMsgMap[groupMsgArray[j].ToGroupId];
        if (!groupMsgs) {
          groupMsgs = groupMsgMap[groupMsgArray[j].ToGroupId] = {
            "min": minGroupMsgSeq,//收到新消息最小seq
            "max": maxGroupMsgSeq,//收到新消息最大seq
            "msgs": []//收到的新消息
          };
        }
        //更新长轮询的群NoticeSeq
        if (groupMsgArray[j].NoticeSeq > noticeSeq) {
          log.warn("noticeSeq=" + noticeSeq + ",msgNoticeSeq=" + groupMsgArray[j].NoticeSeq);
          noticeSeq = groupMsgArray[j].NoticeSeq;
        }
        groupMsgArray[j].Event = eventType;
        groupMsgMap[groupMsgArray[j].ToGroupId].msgs.push(groupMsgArray[j]);//新增一条消息
        if (groupMsgArray[j].MsgSeq < groupMsgs.min) {//记录最小的消息seq
          groupMsgMap[groupMsgArray[j].ToGroupId].min = groupMsgArray[j].MsgSeq;
        }
        if (groupMsgArray[j].MsgSeq > groupMsgs.max) {//记录最大的消息seq
          groupMsgMap[groupMsgArray[j].ToGroupId].max = groupMsgArray[j].MsgSeq;
        }
      }

      for (var groupId in groupMsgMap) {
        var tempCount = groupMsgMap[groupId].max - groupMsgMap[groupId].min + 1;//收到的新的群消息数
        var curMaxMsgSeq = myGroupMaxSeqs[groupId];//获取本地保存的群最大消息seq
        if (curMaxMsgSeq) {//存在这个群的最大消息seq
          //高并发情况下，长轮询可能存在丢消息，这时需要客户端通过拉取群消息接口补齐下
          //1、如果收到的新消息最小seq比当前最大群消息seq大于1，则表示收到的群消息发生跳跃，需要补齐
          //2、收到的新群消息seq存在不连续情况，也需要补齐
          if (groupMsgMap[groupId].min - curMaxMsgSeq > 1 || groupMsgMap[groupId].msgs.length < tempCount) {
            //发起一个拉群群消息请求
            log.warn("发起一次补齐群消息请求,curMaxMsgSeq=" + curMaxMsgSeq + ", minMsgSeq=" + groupMsgMap[groupId].min + ", maxMsgSeq=" + groupMsgMap[groupId].max + ", msgs.length=" + groupMsgMap[groupId].msgs.length + ", tempCount=" + tempCount);
            getLostGroupMsgs(groupId, groupMsgMap[groupId].max, groupMsgMap[groupId].max - curMaxMsgSeq);
            //更新myGroupMaxSeqs中的群最大seq
            updateMyGroupCurMaxSeq(groupId,groupMsgMap[groupId].max);
          } else {
            new_group_msgs = addGroupMsgList(groupMsgMap[groupId].msgs, new_group_msgs);
          }
        } else {//不存在该群的最大消息seq
          log.warn("不存在该群的最大消息seq，群id=" + groupId);
          //高并发情况下，长轮询可能存在丢消息，这时需要客户端通过拉取群消息接口补齐下
          //1、收到的新群消息seq存在不连续情况，也需要补齐
          if (groupMsgMap[groupId].msgs.length < tempCount) {
            //发起一个拉群群消息请求
            log.warn("发起一次补齐群消息请求,minMsgSeq=" + groupMsgMap[groupId].min + ", maxMsgSeq=" + groupMsgMap[groupId].max + ", msgs.length=" + groupMsgMap[groupId].msgs.length + ", tempCount=" + tempCount);
            getLostGroupMsgs(groupId, groupMsgMap[groupId].max, tempCount);
            //更新myGroupMaxSeqs中的群最大seq
            updateMyGroupCurMaxSeq(groupId,groupMsgMap[groupId].max);
          } else {
            new_group_msgs = addGroupMsgList(groupMsgMap[groupId].msgs, new_group_msgs);
          }
        }
      }
      if (new_group_msgs.length) {
        MsgStore.updateTimeline();
      }
      if (onMsgCallback && new_group_msgs.length) onMsgCallback(new_group_msgs);

    };

    //处理收到的群普通和提示消息
    var handlerOrdinaryAndTipGroupMsgs = function (eventType, groupMsgArray) {
      var groupMsgMap = {};//保存收到的群消息信息（群号，最小，最大消息seq，消息列表）
      var new_group_msgs = [];
      var minGroupMsgSeq = 99999999;
      var maxGroupMsgSeq = -1;
      for (var j in groupMsgArray) {

        var groupMsgs = groupMsgMap[groupMsgArray[j].ToGroupId];
        if (!groupMsgs) {
          groupMsgs = groupMsgMap[groupMsgArray[j].ToGroupId] = {
            "min": minGroupMsgSeq,//收到新消息最小seq
            "max": maxGroupMsgSeq,//收到新消息最大seq
            "msgs": []//收到的新消息
          };
        }
        //更新长轮询的群NoticeSeq
        if (groupMsgArray[j].NoticeSeq > noticeSeq) {
          log.warn("noticeSeq=" + noticeSeq + ",msgNoticeSeq=" + groupMsgArray[j].NoticeSeq);
          noticeSeq = groupMsgArray[j].NoticeSeq;
        }
        groupMsgArray[j].Event = eventType;
        groupMsgMap[groupMsgArray[j].ToGroupId].msgs.push(groupMsgArray[j]);//新增一条消息
        if (groupMsgArray[j].MsgSeq < groupMsgs.min) {//记录最小的消息seq
          groupMsgMap[groupMsgArray[j].ToGroupId].min = groupMsgArray[j].MsgSeq;
        }
        if (groupMsgArray[j].MsgSeq > groupMsgs.max) {//记录最大的消息seq
          groupMsgMap[groupMsgArray[j].ToGroupId].max = groupMsgArray[j].MsgSeq;
        }
      }

      for (var groupId in groupMsgMap) {
        var tempCount = groupMsgMap[groupId].max - groupMsgMap[groupId].min + 1;//收到的新的群消息数
        var curMaxMsgSeq = myGroupMaxSeqs[groupId];//获取本地保存的群最大消息seq
        if (curMaxMsgSeq) {//存在这个群的最大消息seq
          //高并发情况下，长轮询可能存在丢消息，这时需要客户端通过拉取群消息接口补齐下
          //1、如果收到的新消息最小seq比当前最大群消息seq大于1，则表示收到的群消息发生跳跃，需要补齐
          //2、收到的新群消息seq存在不连续情况，也需要补齐
          if (groupMsgMap[groupId].min - curMaxMsgSeq > 1 || groupMsgMap[groupId].msgs.length < tempCount) {
            //发起一个拉群群消息请求
            log.warn("发起一次补齐群消息请求,curMaxMsgSeq=" + curMaxMsgSeq + ", minMsgSeq=" + groupMsgMap[groupId].min + ", maxMsgSeq=" + groupMsgMap[groupId].max + ", msgs.length=" + groupMsgMap[groupId].msgs.length + ", tempCount=" + tempCount);
            getLostGroupMsgs(groupId, groupMsgMap[groupId].max, groupMsgMap[groupId].max - curMaxMsgSeq);
            //更新myGroupMaxSeqs中的群最大seq
            updateMyGroupCurMaxSeq(groupId,groupMsgMap[groupId].max);
          } else {
            new_group_msgs = addGroupMsgList(groupMsgMap[groupId].msgs, new_group_msgs);
          }
        } else {//不存在该群的最大消息seq
          log.warn("不存在该群的最大消息seq，群id=" + groupId);
          //高并发情况下，长轮询可能存在丢消息，这时需要客户端通过拉取群消息接口补齐下
          //1、收到的新群消息seq存在不连续情况，也需要补齐
          if (groupMsgMap[groupId].msgs.length < tempCount) {
            //发起一个拉群群消息请求
            log.warn("发起一次补齐群消息请求,minMsgSeq=" + groupMsgMap[groupId].min + ", maxMsgSeq=" + groupMsgMap[groupId].max + ", msgs.length=" + groupMsgMap[groupId].msgs.length + ", tempCount=" + tempCount);
            getLostGroupMsgs(groupId, groupMsgMap[groupId].max, tempCount);
            //更新myGroupMaxSeqs中的群最大seq
            updateMyGroupCurMaxSeq(groupId,groupMsgMap[groupId].max);
          } else {
            new_group_msgs = addGroupMsgList(groupMsgMap[groupId].msgs, new_group_msgs);
          }
        }
      }
      if (new_group_msgs.length) {
        MsgStore.updateTimeline();
      }
      if (onMsgCallback && new_group_msgs.length) onMsgCallback(new_group_msgs);

    };

    //处理新的群提示消息
    var handlerGroupTips = function (groupTips) {
      var new_group_msgs = [];
      for (var o in groupTips) {
        var groupTip = groupTips[o];
        //添加event字段
        groupTip.Event = LONG_POLLINNG_EVENT_TYPE.GROUP_TIP;
        //更新群消息通知seq
        if (groupTip.NoticeSeq > noticeSeq) {
          noticeSeq = groupTip.NoticeSeq;
        }
        var msg = handlerGroupMsg(groupTip, false, true);
        if (msg) {
          new_group_msgs.push(msg);
        }
      }
      if (new_group_msgs.length) {
        MsgStore.updateTimeline();
      }
      if (onMsgCallback && new_group_msgs.length) onMsgCallback(new_group_msgs);
    };

    //处理新的群系统消息
    //isNeedValidRepeatMsg 是否需要判重
    var handlerGroupSystemMsgs = function (groupSystemMsgs, isNeedValidRepeatMsg) {
      for (var k in groupSystemMsgs) {
        var groupTip = groupSystemMsgs[k];
        var groupReportTypeMsg = groupTip.MsgBody;
        var reportType = groupReportTypeMsg.ReportType;
        //当长轮询返回的群系统消息，才需要更新群消息通知seq
        if (isNeedValidRepeatMsg == false && groupTip.NoticeSeq && groupTip.NoticeSeq > noticeSeq) {
          noticeSeq = groupTip.NoticeSeq;
        }
        var toAccount = groupTip.GroupInfo.To_Account;
        //过滤本不应该给自己的系统消息
        /*if (!toAccount || toAccount != ctx.identifier) {
         log.error("收到本不应该给自己的系统消息: To_Account=" + toAccount);
         continue;
         }*/
        if (isNeedValidRepeatMsg) {
          //var key=groupTip.ToGroupId+"_"+reportType+"_"+groupTip.MsgTimeStamp+"_"+groupReportTypeMsg.Operator_Account;
          var key = groupTip.ToGroupId + "_" + reportType + "_" + groupReportTypeMsg.Operator_Account;
          var isExist = groupSystemMsgsCache[key];
          if (isExist) {
            log.warn("收到重复的群系统消息：key=" + key);
            continue;
          }
          groupSystemMsgsCache[key] = true;
        }

        var notify = {
          "SrcFlag": 0,
          "ReportType": reportType,
          "GroupId": groupTip.ToGroupId,
          "GroupName": groupTip.GroupInfo.GroupName,
          "Operator_Account": groupReportTypeMsg.Operator_Account,
          "MsgTime": groupTip.MsgTimeStamp,
          "groupReportTypeMsg" : groupReportTypeMsg
        };
        switch (reportType) {
          case GROUP_SYSTEM_TYPE.JOIN_GROUP_REQUEST://申请加群(只有管理员会接收到)
            notify["RemarkInfo"] = groupReportTypeMsg.RemarkInfo;
            notify["MsgKey"] = groupReportTypeMsg.MsgKey;
            notify["Authentication"] = groupReportTypeMsg.Authentication;
            notify["UserDefinedField"] = groupTip.UserDefinedField;
            notify["From_Account"] = groupTip.From_Account;
            notify["MsgSeq"] = groupTip.ClientSeq;
            notify["MsgRandom"] = groupTip.MsgRandom;
            break;
          case GROUP_SYSTEM_TYPE.JOIN_GROUP_ACCEPT://申请加群被同意(只有申请人自己接收到)
          case GROUP_SYSTEM_TYPE.JOIN_GROUP_REFUSE://申请加群被拒绝(只有申请人自己接收到)
            notify["RemarkInfo"] = groupReportTypeMsg.RemarkInfo;
            break;
          case GROUP_SYSTEM_TYPE.KICK://被管理员踢出群(只有被踢者接收到)
          case GROUP_SYSTEM_TYPE.DESTORY://群被解散(全员接收)
          case GROUP_SYSTEM_TYPE.CREATE://创建群(创建者接收, 不展示)
          case GROUP_SYSTEM_TYPE.INVITED_JOIN_GROUP_REQUEST://邀请加群(被邀请者接收)
          case GROUP_SYSTEM_TYPE.QUIT://主动退群(主动退出者接收, 不展示)
          case GROUP_SYSTEM_TYPE.SET_ADMIN://群设置管理员(被设置者接收)
          case GROUP_SYSTEM_TYPE.CANCEL_ADMIN://取消管理员(被取消者接收)
          case GROUP_SYSTEM_TYPE.REVOKE://群已被回收(全员接收, 不展示)
            break;
          case GROUP_SYSTEM_TYPE.READED://群消息已读同步
            break;
          case GROUP_SYSTEM_TYPE.CUSTOM://用户自定义通知(默认全员接收)
            notify["MsgSeq"] = groupTip.MsgSeq;
            notify["UserDefinedField"] = groupReportTypeMsg.UserDefinedField;
            break;
          default:
            log.error("未知群系统消息类型：reportType=" + reportType);
            break;
        }

        if (isNeedValidRepeatMsg) {
          if (reportType == GROUP_SYSTEM_TYPE.JOIN_GROUP_REQUEST) {
            //回调
            if (onGroupSystemNotifyCallbacks[reportType]) onGroupSystemNotifyCallbacks[reportType](notify);
          }
        } else {
          //回调
          if (onGroupSystemNotifyCallbacks[reportType]) {
            if(reportType == GROUP_SYSTEM_TYPE.READED){
              var arr = notify.groupReportTypeMsg.GroupReadInfoArray;
              for(var i = 0 , l = arr.length; i < l ; i++){
                var item = arr[i];
                onGroupSystemNotifyCallbacks[reportType](item);
              }
            }else{
              onGroupSystemNotifyCallbacks[reportType](notify);
            }
          }
        }
      }//loop
    };


    //处理新的好友系统通知
    //isNeedValidRepeatMsg 是否需要判重
    var handlerFriendSystemNotices = function (friendSystemNotices, isNeedValidRepeatMsg) {
      var friendNotice, type, notify;
      for (var k in friendSystemNotices) {
        friendNotice = friendSystemNotices[k];
        type = friendNotice.PushType;
        //当长轮询返回的群系统消息，才需要更新通知seq
        if (isNeedValidRepeatMsg == false && friendNotice.NoticeSeq && friendNotice.NoticeSeq > noticeSeq) {
          noticeSeq = friendNotice.NoticeSeq;
        }
        notify = {'Type': type};
        switch (type) {
          case FRIEND_NOTICE_TYPE.FRIEND_ADD://好友表增加
            notify["Accounts"] = friendNotice.FriendAdd_Account;
            break;
          case FRIEND_NOTICE_TYPE.FRIEND_DELETE://好友表删除
            notify["Accounts"] = friendNotice.FriendDel_Account;
            break;
          case FRIEND_NOTICE_TYPE.PENDENCY_ADD://未决增加
            notify["PendencyList"] = friendNotice.PendencyAdd;
            break;
          case FRIEND_NOTICE_TYPE.PENDENCY_DELETE://未决删除
            notify["Accounts"] = friendNotice.FrienPencydDel_Account;
            break;
          case FRIEND_NOTICE_TYPE.BLACK_LIST_ADD://黑名单增加
            notify["Accounts"] = friendNotice.BlackListAdd_Account;
            break;
          case FRIEND_NOTICE_TYPE.BLACK_LIST_DELETE://黑名单删除
            notify["Accounts"] = friendNotice.BlackListDel_Account;
            break;
            /*case FRIEND_NOTICE_TYPE.PENDENCY_REPORT://未决已读上报

             break;
             case FRIEND_NOTICE_TYPE.FRIEND_UPDATE://好友数据更新

             break;
             */
          default:
            log.error("未知好友系统通知类型：friendNotice=" + JSON.stringify(friendNotice));
            break;
        }

        if (isNeedValidRepeatMsg) {
          if (type == FRIEND_NOTICE_TYPE.PENDENCY_ADD) {
            //回调
            if (onFriendSystemNotifyCallbacks[type]) onFriendSystemNotifyCallbacks[type](notify);
          }
        } else {
          //回调
          if (onFriendSystemNotifyCallbacks[type]) onFriendSystemNotifyCallbacks[type](notify);
        }
      }//loop
    };

    //处理新的资料系统通知
    //isNeedValidRepeatMsg 是否需要判重
    var handlerProfileSystemNotices = function (profileSystemNotices, isNeedValidRepeatMsg) {
      var profileNotice, type, notify;
      for (var k in profileSystemNotices) {
        profileNotice = profileSystemNotices[k];
        type = profileNotice.PushType;
        //当长轮询返回的群系统消息，才需要更新通知seq
        if (isNeedValidRepeatMsg == false && profileNotice.NoticeSeq && profileNotice.NoticeSeq > noticeSeq) {
          noticeSeq = profileNotice.NoticeSeq;
        }
        notify = {'Type': type};
        switch (type) {
          case PROFILE_NOTICE_TYPE.PROFILE_MODIFY://资料修改
            notify["Profile_Account"] = profileNotice.Profile_Account;
            notify["ProfileList"] = profileNotice.ProfileList;
            break;
          default:
            log.error("未知资料系统通知类型：profileNotice=" + JSON.stringify(profileNotice));
            break;
        }

        if (isNeedValidRepeatMsg) {
          if (type == PROFILE_NOTICE_TYPE.PROFILE_MODIFY) {
            //回调
            if (onProfileSystemNotifyCallbacks[type]) onProfileSystemNotifyCallbacks[type](notify);
          }
        } else {
          //回调
          if (onProfileSystemNotifyCallbacks[type]) onProfileSystemNotifyCallbacks[type](notify);
        }
      }//loop
    };

    //处理新的群系统消息(用于直播大群长轮询)
    var handlerGroupSystemMsg = function (groupTip) {
      var groupReportTypeMsg = groupTip.MsgBody;
      var reportType = groupReportTypeMsg.ReportType;
      var toAccount = groupTip.GroupInfo.To_Account;
      //过滤本不应该给自己的系统消息
      //if(!toAccount || toAccount!=ctx.identifier){
      //    log.error("收到本不应该给自己的系统消息: To_Account="+toAccount);
      //    continue;
      //}
      var notify = {
        "SrcFlag": 1,
        "ReportType": reportType,
        "GroupId": groupTip.ToGroupId,
        "GroupName": groupTip.GroupInfo.GroupName,
        "Operator_Account": groupReportTypeMsg.Operator_Account,
        "MsgTime": groupTip.MsgTimeStamp
      };
      switch (reportType) {
        case GROUP_SYSTEM_TYPE.JOIN_GROUP_REQUEST://申请加群(只有管理员会接收到)
          notify["RemarkInfo"] = groupReportTypeMsg.RemarkInfo;
          notify["MsgKey"] = groupReportTypeMsg.MsgKey;
          notify["Authentication"] = groupReportTypeMsg.Authentication;
          notify["UserDefinedField"] = groupTip.UserDefinedField;
          notify["From_Account"] = groupTip.From_Account;
          notify["MsgSeq"] = groupTip.ClientSeq;
          notify["MsgRandom"] = groupTip.MsgRandom;
          break;
        case GROUP_SYSTEM_TYPE.JOIN_GROUP_ACCEPT://申请加群被同意(只有申请人自己接收到)
        case GROUP_SYSTEM_TYPE.JOIN_GROUP_REFUSE://申请加群被拒绝(只有申请人自己接收到)
          notify["RemarkInfo"] = groupReportTypeMsg.RemarkInfo;
          break;
        case GROUP_SYSTEM_TYPE.KICK://被管理员踢出群(只有被踢者接收到)
        case GROUP_SYSTEM_TYPE.DESTORY://群被解散(全员接收)
        case GROUP_SYSTEM_TYPE.CREATE://创建群(创建者接收, 不展示)
        case GROUP_SYSTEM_TYPE.INVITED_JOIN_GROUP_REQUEST://邀请加群(被邀请者接收)
        case GROUP_SYSTEM_TYPE.QUIT://主动退群(主动退出者接收, 不展示)
        case GROUP_SYSTEM_TYPE.SET_ADMIN://群设置管理员(被设置者接收)
        case GROUP_SYSTEM_TYPE.CANCEL_ADMIN://取消管理员(被取消者接收)
        case GROUP_SYSTEM_TYPE.REVOKE://群已被回收(全员接收, 不展示)
          break;
        case GROUP_SYSTEM_TYPE.CUSTOM://用户自定义通知(默认全员接收)
          notify["MsgSeq"] = groupTip.MsgSeq;
          notify["UserDefinedField"] = groupReportTypeMsg.UserDefinedField;
          break;
        default:
          log.error("未知群系统消息类型：reportType=" + reportType);
          break;
      }
      //回调
      if (onGroupSystemNotifyCallbacks[reportType]) onGroupSystemNotifyCallbacks[reportType](notify);

    };

    //处理C2C EVENT 消息通道Array
    var handlerC2cNotifyMsgArray = function(arr){
      for(var i =0,l=arr.length; i<l ;i++){
        handlerC2cEventMsg(arr[i]);
      }
    }

    //处理C2C EVENT 消息通道Item
    var handlerC2cEventMsg = function (notify) {
      var subType = notify.SubMsgType;
      switch (subType) {
        case C2C_EVENT_SUB_TYPE.READED://已读通知
          break;
        default:
          log.error("未知C2c系统消息：reportType=" + reportType);
          break;
      }
      // stopPolling = true;
      //回调onMsgReadCallback
      if(notify.ReadC2cMsgNotify.UinPairReadArray && onC2cEventCallbacks[subType]){
        for(var i = 0 ,l = notify.ReadC2cMsgNotify.UinPairReadArray.length; i < l ; i++){
          var item = notify.ReadC2cMsgNotify.UinPairReadArray[i];
          onC2cEventCallbacks[subType](item);
        }
      }
    };

    //长轮询
    this.longPolling = function (cbOk, cbErr) {


      var opts = {
        'Timeout': longPollingDefaultTimeOut/1000,
        'Cookie': {
          'NotifySeq': notifySeq,
          'NoticeSeq': noticeSeq
        }
      };
      if(LongPollingId){
        opts.Cookie.LongPollingId = LongPollingId;
        doPolling();
      }else{
        proto_getLongPollingId({},function(resp){
          LongPollingId = opts.Cookie.LongPollingId = resp.LongPollingId;
          //根据回包设置超时时间，超时时长不能>60秒，因为webkit手机端的最长超时时间不能大于60s
          longPollingDefaultTimeOut = resp.Timeout > 60 ? longPollingDefaultTimeOut : resp.Timeout * 1000 ;
          doPolling();
        });
      }

      function doPolling(){
        proto_longPolling(opts, function (resp) {
          for (var i in resp.EventArray) {
            var e = resp.EventArray[i];
            switch (e.Event) {
              case LONG_POLLINNG_EVENT_TYPE.C2C://c2c消息通知
                //更新C2C消息通知seq
                notifySeq = e.NotifySeq;
                log.warn("longpolling: received new c2c msg");
                //获取新消息
                MsgManager.syncMsgs();
                break;
              case LONG_POLLINNG_EVENT_TYPE.GROUP_COMMON://普通群消息通知
                log.warn("longpolling: received new group msgs");
                handlerOrdinaryAndTipGroupMsgs(e.Event, e.GroupMsgArray);
                break;
              case LONG_POLLINNG_EVENT_TYPE.GROUP_TIP://（全员广播）群提示消息
                log.warn("longpolling: received new group tips");
                handlerOrdinaryAndTipGroupMsgs(e.Event, e.GroupTips);
                break;
              case LONG_POLLINNG_EVENT_TYPE.GROUP_SYSTEM://（多终端同步）群系统消息
                log.warn("longpolling: received new group system msgs");
                //false 表示 通过长轮询收到的群系统消息，可以不判重
                handlerGroupSystemMsgs(e.GroupTips, false);
                break;
              case LONG_POLLINNG_EVENT_TYPE.FRIEND_NOTICE://好友系统通知
                log.warn("longpolling: received new friend system notice");
                //false 表示 通过长轮询收到的好友系统通知，可以不判重
                handlerFriendSystemNotices(e.FriendListMod, false);
                break;
              case LONG_POLLINNG_EVENT_TYPE.PROFILE_NOTICE://资料系统通知
                log.warn("longpolling: received new profile system notice");
                //false 表示 通过长轮询收到的资料系统通知，可以不判重
                handlerProfileSystemNotices(e.ProfileDataMod, false);
                break;
              case LONG_POLLINNG_EVENT_TYPE.C2C_COMMON://c2c消息通知
                noticeSeq = e.C2cMsgArray[0].NoticeSeq;
                //更新C2C消息通知seq
                log.warn("longpolling: received new c2c_common msg",noticeSeq);
                handlerOrdinaryAndTipC2cMsgs(e.Event, e.C2cMsgArray);
                break;
              case LONG_POLLINNG_EVENT_TYPE.C2C_EVENT://c2c已读消息通知
                noticeSeq = e.C2cNotifyMsgArray[0].NoticeSeq;
                log.warn("longpolling: received new c2c_event msg");
                handlerC2cNotifyMsgArray(e.C2cNotifyMsgArray);
                break;
              default:
                log.error("longpolling收到未知新消息类型: Event=" + e.Event);
                break;
            }
          }
          var successInfo = {
            'ActionStatus': ACTION_STATUS.OK,
            'ErrorCode': 0
          };
          updatecLongPollingStatus(successInfo);
        }, function (err) {
          //log.error(err);
          updatecLongPollingStatus(err);
          if (cbErr) cbErr(err);
        });
      }
    };


    //大群 长轮询
    this.bigGroupLongPolling = function (cbOk, cbErr) {

      var opts = {
        'StartSeq': bigGroupLongPollingStartSeq,//请求拉消息的起始seq
        'HoldTime': bigGroupLongPollingHoldTime,//客户端长轮询的超时时间，单位是秒
        'Key': bigGroupLongPollingKey//客户端加入群组后收到的的Key
      };

      proto_bigGroupLongPolling(opts, function (resp) {

        var msgObjList = [];
        bigGroupLongPollingStartSeq = resp.NextSeq;
        bigGroupLongPollingHoldTime = resp.HoldTime;
        bigGroupLongPollingKey = resp.Key;

        if (resp.RspMsgList && resp.RspMsgList.length > 0) {
          var msgCount = 0, msgInfo, event, msg;
          for (var i = resp.RspMsgList.length - 1; i >= 0; i--) {
            msgInfo = resp.RspMsgList[i];
            //如果是已经删除的消息或者发送者帐号为空或者消息内容为空
            //IsPlaceMsg=1
            if (msgInfo.IsPlaceMsg || !msgInfo.From_Account || !msgInfo.MsgBody || msgInfo.MsgBody.length == 0) {
              continue;
            }

            event = msgInfo.Event;//群消息类型
            switch (event) {
              case LONG_POLLINNG_EVENT_TYPE.GROUP_COMMON://群普通消息
                log.info("bigGroupLongPolling: return new group msg");
                msg = handlerGroupMsg(msgInfo, false, false);
                msg && msgObjList.push(msg);
                msgCount = msgCount + 1;
                break;
              case LONG_POLLINNG_EVENT_TYPE.GROUP_TIP://群提示消息
              case LONG_POLLINNG_EVENT_TYPE.GROUP_TIP2://群提示消息
                log.info("bigGroupLongPolling: return new group tip");
                msg = handlerGroupMsg(msgInfo, false, false);
                msg && msgObjList.push(msg);
                //msgCount=msgCount+1;
                break;
              case LONG_POLLINNG_EVENT_TYPE.GROUP_SYSTEM://群系统消息
                log.info("bigGroupLongPolling: new group system msg");
                handlerGroupSystemMsg(msgInfo);
                break;
              default:
                log.error("bigGroupLongPolling收到未知新消息类型: Event=" + event);
                break;
            }
          } // for loop
          if (msgCount > 0) {
            MsgManager.setBigGroupLongPollingMsgMap(msgInfo.ToGroupId, msgCount);
            // log.warn("current bigGroupLongPollingMsgMap: " + JSON.stringify(bigGroupLongPollingMsgMap));
          }
        }
        curBigGroupLongPollingRetErrorCount = 0;
        //返回连接状态
        var successInfo = {
          'ActionStatus': ACTION_STATUS.OK,
          'ErrorCode': CONNECTION_STATUS.ON,
          'ErrorInfo': 'connection is ok...'
        };
        ConnManager.callBack(successInfo);

        if (cbOk) cbOk(msgObjList);
        else if (onBigGroupMsgCallback) onBigGroupMsgCallback(msgObjList);//返回新消息

        //重新启动长轮询
        bigGroupLongPollingOn && MsgManager.bigGroupLongPolling();

      }, function (err) {
        //
        if (err.ErrorCode != longPollingTimeOutErrorCode) {
          log.error(err.ErrorInfo);
          //记录长轮询返回错误次数
          curBigGroupLongPollingRetErrorCount++;
        }
        if (err.ErrorCode != longPollingKickedErrorCode) {
          //登出
          // alert("多实例登录，被kick");

          // if (onKickedEventCall) {onKickedEventCall();}
          /*    return;
           proto_logout(function(){
           if (onKickedEventCall) {onKickedEventCall();}
           });*/
        }
        //累计超过一定次数，不再发起长轮询请求
        if (curBigGroupLongPollingRetErrorCount < LONG_POLLING_MAX_RET_ERROR_COUNT) {
          bigGroupLongPollingOn && MsgManager.bigGroupLongPolling();
        } else {
          var errInfo = {
            'ActionStatus': ACTION_STATUS.FAIL,
            'ErrorCode': CONNECTION_STATUS.OFF,
            'ErrorInfo': 'connection is off'
          };
          ConnManager.callBack(errInfo);
        }
        if (cbErr) cbErr(err);

      }, bigGroupLongPollingHoldTime * 1000);
    };

    //更新连接状态
    var updatecLongPollingStatus = function (errObj) {
      if (errObj.ErrorCode == 0 || errObj.ErrorCode == longPollingTimeOutErrorCode) {
        curLongPollingRetErrorCount = 0;
        longPollingOffCallbackFlag = false;
        var errorInfo;
        var isNeedCallback = false;
        switch (curLongPollingStatus) {
          case CONNECTION_STATUS.INIT:
            isNeedCallback = true;
            curLongPollingStatus = CONNECTION_STATUS.ON;
            errorInfo = "create connection successfully(INIT->ON)";
            break;
          case CONNECTION_STATUS.ON:
            errorInfo = "connection is on...(ON->ON)";
            break;
          case CONNECTION_STATUS.RECONNECT:
            curLongPollingStatus = CONNECTION_STATUS.ON;
            errorInfo = "connection is on...(RECONNECT->ON)";
            break;
          case CONNECTION_STATUS.OFF:
            isNeedCallback = true;
            curLongPollingStatus = CONNECTION_STATUS.RECONNECT;
            errorInfo = "reconnect successfully(OFF->RECONNECT)";
            break;
        }
        var successInfo = {
          'ActionStatus': ACTION_STATUS.OK,
          'ErrorCode': curLongPollingStatus,
          'ErrorInfo': errorInfo
        };
        isNeedCallback && ConnManager.callBack(successInfo);
        longPollingOn && MsgManager.longPolling();
      } else if( errObj.ErrorCode == longPollingKickedErrorCode){
        //登出
        // alert("多实例登录，被kick");
        // if (onKickedEventCall) {onKickedEventCall();}
        //     return;
        // proto_logout(function(){
        //     if (onKickedEventCall) {onKickedEventCall();}
        // });
      }else {
        //记录长轮询返回解析json错误次数
        curLongPollingRetErrorCount++;
        log.warn("longPolling接口第" + curLongPollingRetErrorCount + "次报错: " + errObj.ErrorInfo);
        //累计超过一定次数
        if (curLongPollingRetErrorCount <= LONG_POLLING_MAX_RET_ERROR_COUNT) {
          setTimeout(startNextLongPolling, 100);//
        } else {
          curLongPollingStatus = CONNECTION_STATUS.OFF;
          var errInfo = {
            'ActionStatus': ACTION_STATUS.FAIL,
            'ErrorCode': CONNECTION_STATUS.OFF,
            'ErrorInfo': 'connection is off'
          };
          longPollingOffCallbackFlag == false && ConnManager.callBack(errInfo);
          longPollingOffCallbackFlag = true;
          log.warn(longPollingIntervalTime + "毫秒之后,SDK会发起新的longPolling请求...");
          setTimeout(startNextLongPolling, longPollingIntervalTime);//长轮询接口报错次数达到一定值，每间隔5s发起新的长轮询
        }
      }
    };

    //处理收到的普通C2C消息
    var handlerOrdinaryAndTipC2cMsgs = function (eventType, C2cMsgArray) {
      //处理c2c消息
      var notifyInfo = [];
      msgInfos = C2cMsgArray;//返回的消息列表
      // MsgStore.cookie = resp.Cookie;//cookies，记录当前读到的最新消息位置

      for (var i in msgInfos) {
        var msgInfo = msgInfos[i];
        var isSendMsg, id, headUrl;
        if (msgInfo.From_Account == ctx.identifier) {//当前用户发送的消息
          isSendMsg = true;
          id = msgInfo.To_Account;//读取接收者信息
          headUrl = '';
        } else {//当前用户收到的消息
          isSendMsg = false;
          id = msgInfo.From_Account;//读取发送者信息
          headUrl = '';
        }
        var sess = MsgStore.sessByTypeId(SESSION_TYPE.C2C, id);
        if (!sess) {
          sess = new Session(SESSION_TYPE.C2C, id, id, headUrl, 0, 0);
        }
        var msg = new Msg(sess, isSendMsg, msgInfo.MsgSeq, msgInfo.MsgRandom, msgInfo.MsgTimeStamp, msgInfo.From_Account);
        var msgBody = null;
        var msgContent = null;
        var msgType = null;
        for (var mi in msgInfo.MsgBody) {
          msgBody = msgInfo.MsgBody[mi];
          msgType = msgBody.MsgType;
          switch (msgType) {
            case MSG_ELEMENT_TYPE.TEXT:
              msgContent = new Msg.Elem.Text(msgBody.MsgContent.Text);
              break;
            case MSG_ELEMENT_TYPE.FACE:
              msgContent = new Msg.Elem.Face(
                  msgBody.MsgContent.Index,
                  msgBody.MsgContent.Data
              );
              break;
            case MSG_ELEMENT_TYPE.IMAGE:
              msgContent = new Msg.Elem.Images(
                  msgBody.MsgContent.UUID
              );
              for (var j in msgBody.MsgContent.ImageInfoArray) {
                var tempImg = msgBody.MsgContent.ImageInfoArray[j];
                msgContent.addImage(
                    new Msg.Elem.Images.Image(
                        tempImg.Type,
                        tempImg.Size,
                        tempImg.Width,
                        tempImg.Height,
                        tempImg.URL
                    )
                );
              }
              break;
            case MSG_ELEMENT_TYPE.SOUND:
              if (msgBody.MsgContent) {
                msgContent = new Msg.Elem.Sound(
                    msgBody.MsgContent.UUID,
                    msgBody.MsgContent.Second,
                    msgBody.MsgContent.Size,
                    msgInfo.From_Account,
                    msgInfo.To_Account,
                    msgBody.MsgContent.Download_Flag,
                    SESSION_TYPE.C2C
                );
              } else {
                msgType = MSG_ELEMENT_TYPE.TEXT;
                msgContent = new Msg.Elem.Text('[语音消息]下载地址解析出错');
              }
              break;
            case MSG_ELEMENT_TYPE.LOCATION:
              msgContent = new Msg.Elem.Location(
                  msgBody.MsgContent.Longitude,
                  msgBody.MsgContent.Latitude,
                  msgBody.MsgContent.Desc
              );
              break;
            case MSG_ELEMENT_TYPE.FILE:
            case MSG_ELEMENT_TYPE.FILE + " ":
              msgType = MSG_ELEMENT_TYPE.FILE;
              if (msgBody.MsgContent) {
                msgContent = new Msg.Elem.File(
                    msgBody.MsgContent.UUID,
                    msgBody.MsgContent.FileName,
                    msgBody.MsgContent.FileSize,
                    msgInfo.From_Account,
                    msgInfo.To_Account,
                    msgBody.MsgContent.Download_Flag,
                    SESSION_TYPE.C2C
                );
              } else {
                msgType = MSG_ELEMENT_TYPE.TEXT;
                msgContent = new Msg.Elem.Text('[文件消息下载地址解析出错]');
              }
              break;
            case MSG_ELEMENT_TYPE.CUSTOM:
              try {
                var data = JSON.parse(msgBody.MsgContent.Data);
                if (data && data.userAction && data.userAction == FRIEND_WRITE_MSG_ACTION.ING) {//过滤安卓或ios的正在输入自定义消息
                  continue;
                }
              } catch (e) {
              }

              msgType = MSG_ELEMENT_TYPE.CUSTOM;
              msgContent = new Msg.Elem.Custom(
                  msgBody.MsgContent.Data,
                  msgBody.MsgContent.Desc,
                  msgBody.MsgContent.Ext
              );
              break;
            default :
              msgType = MSG_ELEMENT_TYPE.TEXT;
              msgContent = new Msg.Elem.Text('web端暂不支持' + msgBody.MsgType + '消息');
              break;
          }
          msg.elems.push(new Msg.Elem(msgType, msgContent));
        }

        if (msg.elems.length > 0 && MsgStore.addMsg(msg)) {
          notifyInfo.push(msg);
        }
      } // for loop
      if (notifyInfo.length > 0)
        MsgStore.updateTimeline();
      if (notifyInfo.length > 0) {
        if (onMsgCallback) onMsgCallback(notifyInfo);
      }
    };

    //发起新的长轮询请求
    var startNextLongPolling = function () {
      longPollingOn && MsgManager.longPolling();
    };

    //处理未决的加群申请消息列表
    var handlerApplyJoinGroupSystemMsgs = function (eventArray) {
      for (var i in eventArray) {
        var e = eventArray[i];
        switch (e.Event) {
          case LONG_POLLINNG_EVENT_TYPE.GROUP_SYSTEM://（多终端同步）群系统消息
            log.warn("handlerApplyJoinGroupSystemMsgs： handler new group system msg");
            //true 表示 解决加群申请通知存在重复的问题（已处理的通知，下次登录还会拉到），需要判重
            handlerGroupSystemMsgs(e.GroupTips, true);
            break;
          default:
            log.error("syncMsgs收到未知的群系统消息类型: Event=" + e.Event);
            break;
        }
      }
    };

    //拉取c2c消息(包含加群未决消息，需要处理)
    this.syncMsgs = function (cbOk, cbErr) {
      var notifyInfo = [];
      var msgInfos = [];
      //读取C2C消息
      proto_getMsgs(MsgStore.cookie, MsgStore.syncFlag, function (resp) {
        //拉取完毕
        if (resp.SyncFlag == 2) {
          MsgStore.syncFlag = 0;
        }
        //处理c2c消息
        msgInfos = resp.MsgList;//返回的消息列表
        MsgStore.cookie = resp.Cookie;//cookies，记录当前读到的最新消息位置

        for (var i in msgInfos) {
          var msgInfo = msgInfos[i];
          var isSendMsg, id, headUrl;
          if (msgInfo.From_Account == ctx.identifier) {//当前用户发送的消息
            isSendMsg = true;
            id = msgInfo.To_Account;//读取接收者信息
            headUrl = '';
          } else {//当前用户收到的消息
            isSendMsg = false;
            id = msgInfo.From_Account;//读取发送者信息
            headUrl = '';
          }
          var sess = MsgStore.sessByTypeId(SESSION_TYPE.C2C, id);
          if (!sess) {
            sess = new Session(SESSION_TYPE.C2C, id, id, headUrl, 0, 0);
          }
          var msg = new Msg(sess, isSendMsg, msgInfo.MsgSeq, msgInfo.MsgRandom, msgInfo.MsgTimeStamp, msgInfo.From_Account);
          var msgBody = null;
          var msgContent = null;
          var msgType = null;
          for (var mi in msgInfo.MsgBody) {
            msgBody = msgInfo.MsgBody[mi];
            msgType = msgBody.MsgType;
            switch (msgType) {
              case MSG_ELEMENT_TYPE.TEXT:
                msgContent = new Msg.Elem.Text(msgBody.MsgContent.Text);
                break;
              case MSG_ELEMENT_TYPE.FACE:
                msgContent = new Msg.Elem.Face(
                    msgBody.MsgContent.Index,
                    msgBody.MsgContent.Data
                );
                break;
              case MSG_ELEMENT_TYPE.IMAGE:
                msgContent = new Msg.Elem.Images(
                    msgBody.MsgContent.UUID
                );
                for (var j in msgBody.MsgContent.ImageInfoArray) {
                  var tempImg = msgBody.MsgContent.ImageInfoArray[j];
                  msgContent.addImage(
                      new Msg.Elem.Images.Image(
                          tempImg.Type,
                          tempImg.Size,
                          tempImg.Width,
                          tempImg.Height,
                          tempImg.URL
                      )
                  );
                }
                break;
              case MSG_ELEMENT_TYPE.SOUND:
                // var soundUrl = getSoundDownUrl(msgBody.MsgContent.UUID, msgInfo.From_Account);
                if (msgBody.MsgContent) {
                  msgContent = new Msg.Elem.Sound(
                      msgBody.MsgContent.UUID,
                      msgBody.MsgContent.Second,
                      msgBody.MsgContent.Size,
                      msgInfo.From_Account,
                      msgInfo.To_Account,
                      msgBody.MsgContent.Download_Flag,
                      SESSION_TYPE.C2C
                  );
                } else {
                  msgType = MSG_ELEMENT_TYPE.TEXT;
                  msgContent = new Msg.Elem.Text('[语音消息]下载地址解析出错');
                }
                break;
              case MSG_ELEMENT_TYPE.LOCATION:
                msgContent = new Msg.Elem.Location(
                    msgBody.MsgContent.Longitude,
                    msgBody.MsgContent.Latitude,
                    msgBody.MsgContent.Desc
                );
                break;
              case MSG_ELEMENT_TYPE.FILE:
              case MSG_ELEMENT_TYPE.FILE + " ":
                msgType = MSG_ELEMENT_TYPE.FILE;
                // var fileUrl = getFileDownUrl(msgBody.MsgContent.UUID, msgInfo.From_Account, msgBody.MsgContent.FileName);
                if (msgBody.MsgContent) {
                  msgContent = new Msg.Elem.File(
                      msgBody.MsgContent.UUID,
                      msgBody.MsgContent.FileName,
                      msgBody.MsgContent.FileSize,
                      msgInfo.From_Account,
                      msgInfo.To_Account,
                      msgBody.MsgContent.Download_Flag,
                      SESSION_TYPE.C2C
                  );
                } else {
                  msgType = MSG_ELEMENT_TYPE.TEXT;
                  msgContent = new Msg.Elem.Text('[文件消息下载地址解析出错]');
                }
                break;
              case MSG_ELEMENT_TYPE.CUSTOM:
                try {
                  var data = JSON.parse(msgBody.MsgContent.Data);
                  if (data && data.userAction && data.userAction == FRIEND_WRITE_MSG_ACTION.ING) {//过滤安卓或ios的正在输入自定义消息
                    continue;
                  }
                } catch (e) {
                }

                msgType = MSG_ELEMENT_TYPE.CUSTOM;
                msgContent = new Msg.Elem.Custom(
                    msgBody.MsgContent.Data,
                    msgBody.MsgContent.Desc,
                    msgBody.MsgContent.Ext
                );
                break;
              default :
                msgType = MSG_ELEMENT_TYPE.TEXT;
                msgContent = new Msg.Elem.Text('web端暂不支持' + msgBody.MsgType + '消息');
                break;
            }
            msg.elems.push(new Msg.Elem(msgType, msgContent));
          }

          if (msg.elems.length > 0 && MsgStore.addMsg(msg)) {
            notifyInfo.push(msg);
          }
        } // for loop

        //处理加群未决申请消息
        handlerApplyJoinGroupSystemMsgs(resp.EventArray);

        if (notifyInfo.length > 0)
          MsgStore.updateTimeline();
        if (cbOk) cbOk(notifyInfo);
        else if (notifyInfo.length > 0) {
          if (onMsgCallback) onMsgCallback(notifyInfo);
        }

      }, function (err) {
        log.error("getMsgs failed:" + err.ErrorInfo);
        if (cbErr) cbErr(err);
      });
    };


    //拉取C2C漫游消息
    this.getC2CHistoryMsgs = function (options, cbOk, cbErr) {

      if (!options.Peer_Account) {
        if (cbErr) {
          cbErr(tool.getReturnError("Peer_Account is empty", -13));
          return;
        }
      }
      if (!options.MaxCnt) {
        options.MaxCnt = 15;
      }
      if (options.MaxCnt <= 0) {
        if (cbErr) {
          cbErr(tool.getReturnError("MaxCnt should be greater than 0", -14));
          return;
        }
      }
      if (options.MaxCnt > 15) {
        if (cbErr) {
          cbErr(tool.getReturnError("MaxCnt can not be greater than 15", -15));
          return;
        }
        return;
      }
      if (options.MsgKey == null || options.MsgKey === undefined) {
        options.MsgKey = '';
      }
      var opts = {
        'Peer_Account': options.Peer_Account,
        'MaxCnt': options.MaxCnt,
        'LastMsgTime': options.LastMsgTime,
        'MsgKey': options.MsgKey
      };
      //读取c2c漫游消息
      proto_getC2CHistoryMsgs(opts, function (resp) {
        var msgObjList = [];
        //处理c2c消息
        msgInfos = resp.MsgList;//返回的消息列表
        var sess = MsgStore.sessByTypeId(SESSION_TYPE.C2C, options.Peer_Account);
        if (!sess) {
          sess = new Session(SESSION_TYPE.C2C, options.Peer_Account, options.Peer_Account, '', 0, 0);
        }
        for (var i in msgInfos) {
          var msgInfo = msgInfos[i];
          var isSendMsg, id, headUrl;
          if (msgInfo.From_Account == ctx.identifier) {//当前用户发送的消息
            isSendMsg = true;
            id = msgInfo.To_Account;//读取接收者信息
            headUrl = '';
          } else {//当前用户收到的消息
            isSendMsg = false;
            id = msgInfo.From_Account;//读取发送者信息
            headUrl = '';
          }
          var msg = new Msg(sess, isSendMsg, msgInfo.MsgSeq, msgInfo.MsgRandom, msgInfo.MsgTimeStamp, msgInfo.From_Account);
          var msgBody = null;
          var msgContent = null;
          var msgType = null;
          for (var mi in msgInfo.MsgBody) {
            msgBody = msgInfo.MsgBody[mi];
            msgType = msgBody.MsgType;
            switch (msgType) {
              case MSG_ELEMENT_TYPE.TEXT:
                msgContent = new Msg.Elem.Text(msgBody.MsgContent.Text);
                break;
              case MSG_ELEMENT_TYPE.FACE:
                msgContent = new Msg.Elem.Face(
                    msgBody.MsgContent.Index,
                    msgBody.MsgContent.Data
                );
                break;
              case MSG_ELEMENT_TYPE.IMAGE:
                msgContent = new Msg.Elem.Images(
                    msgBody.MsgContent.UUID
                );
                for (var j in msgBody.MsgContent.ImageInfoArray) {
                  var tempImg = msgBody.MsgContent.ImageInfoArray[j];
                  msgContent.addImage(
                      new Msg.Elem.Images.Image(
                          tempImg.Type,
                          tempImg.Size,
                          tempImg.Width,
                          tempImg.Height,
                          tempImg.URL
                      )
                  );
                }
                break;
              case MSG_ELEMENT_TYPE.SOUND:

                // var soundUrl = getSoundDownUrl(msgBody.MsgContent.UUID, msgInfo.From_Account);

                if (msgBody.MsgContent) {
                  msgContent = new Msg.Elem.Sound(
                      msgBody.MsgContent.UUID,
                      msgBody.MsgContent.Second,
                      msgBody.MsgContent.Size,
                      msgInfo.From_Account,
                      msgInfo.To_Account,
                      msgBody.MsgContent.Download_Flag,
                      SESSION_TYPE.C2C
                  );
                } else {
                  msgType = MSG_ELEMENT_TYPE.TEXT;
                  msgContent = new Msg.Elem.Text('[语音消息]下载地址解析出错');
                }
                break;
              case MSG_ELEMENT_TYPE.LOCATION:
                msgContent = new Msg.Elem.Location(
                    msgBody.MsgContent.Longitude,
                    msgBody.MsgContent.Latitude,
                    msgBody.MsgContent.Desc
                );
                break;
              case MSG_ELEMENT_TYPE.FILE:
              case MSG_ELEMENT_TYPE.FILE + " ":
                msgType = MSG_ELEMENT_TYPE.FILE;
                // var fileUrl = getFileDownUrl(msgBody.MsgContent.UUID, msgInfo.From_Account, msgBody.MsgContent.FileName);

                if (msgBody.MsgContent) {
                  msgContent = new Msg.Elem.File(
                      msgBody.MsgContent.UUID,
                      msgBody.MsgContent.FileName,
                      msgBody.MsgContent.FileSize,
                      msgInfo.From_Account,
                      msgInfo.To_Account,
                      msgBody.MsgContent.Download_Flag,
                      SESSION_TYPE.C2C
                  );
                } else {
                  msgType = MSG_ELEMENT_TYPE.TEXT;
                  msgContent = new Msg.Elem.Text('[文件消息下载地址解析出错]');
                }
                break;
              case MSG_ELEMENT_TYPE.CUSTOM:
                msgType = MSG_ELEMENT_TYPE.CUSTOM;
                msgContent = new Msg.Elem.Custom(
                    msgBody.MsgContent.Data,
                    msgBody.MsgContent.Desc,
                    msgBody.MsgContent.Ext
                );

                break;
              default :
                msgType = MSG_ELEMENT_TYPE.TEXT;
                msgContent = new Msg.Elem.Text('web端暂不支持' + msgBody.MsgType + '消息');
                break;
            }
            msg.elems.push(new Msg.Elem(msgType, msgContent));
          }
          MsgStore.addMsg(msg);
          msgObjList.push(msg);
        } // for loop

        MsgStore.updateTimeline();
        if (cbOk) {

          var newResp = {
            'Complete': resp.Complete,
            'MsgCount': msgObjList.length,
            'LastMsgTime': resp.LastMsgTime,
            'MsgKey': resp.MsgKey,
            'MsgList': msgObjList
          };
          sess.isFinished(resp.Complete);
          cbOk(newResp);
        }

      }, function (err) {
        log.error("getC2CHistoryMsgs failed:" + err.ErrorInfo);
        if (cbErr) cbErr(err);
      });
    };

    //拉群历史消息
    //不传cbOk 和 cbErr，则会调用新消息回调函数
    this.syncGroupMsgs = function (options, cbOk, cbErr) {
      if (options.ReqMsgSeq <= 0) {
        if (cbErr) {
          var errInfo = "ReqMsgSeq must be greater than 0";
          var error = tool.getReturnError(errInfo, -16);
          cbErr(error);
        }
        return;
      }
      var opts = {
        'GroupId': options.GroupId,
        'ReqMsgSeq': options.ReqMsgSeq,
        'ReqMsgNumber': options.ReqMsgNumber
      };
      //读群漫游消息
      proto_getGroupMsgs(opts, function (resp) {
        var notifyInfo = [];
        var group_id = resp.GroupId;//返回的群id
        var msgInfos = resp.RspMsgList;//返回的消息列表
        var isFinished = resp.IsFinished;

        if (msgInfos == null || msgInfos === undefined) {
          if (cbOk) {
            cbOk([]);
          }
          return;
        }
        for (var i = msgInfos.length - 1; i >= 0; i--) {
          var msgInfo = msgInfos[i];
          //如果是已经删除的消息或者发送者帐号为空或者消息内容为空
          //IsPlaceMsg=1
          if (msgInfo.IsPlaceMsg || !msgInfo.From_Account || !msgInfo.MsgBody || msgInfo.MsgBody.length == 0) {
            continue;
          }
          var msg = handlerGroupMsg(msgInfo, true, true,isFinished);
          if (msg) {
            notifyInfo.push(msg);
          }
        } // for loop
        if (notifyInfo.length > 0)
          MsgStore.updateTimeline();
        if (cbOk) cbOk(notifyInfo);
        else if (notifyInfo.length > 0) {
          if (onMsgCallback) onMsgCallback(notifyInfo);
        }

      }, function (err) {
        log.error("getGroupMsgs failed:" + err.ErrorInfo);
        if (cbErr) cbErr(err);
      });
    };

    //处理群消息(普通消息+提示消息)
    //isSyncGroupMsgs 是否主动拉取群消息标志
    //isAddMsgFlag 是否需要保存到MsgStore，如果需要，这里会存在判重逻辑
    var handlerGroupMsg = function (msgInfo, isSyncGroupMsgs, isAddMsgFlag ,isFinished) {
      if (msgInfo.IsPlaceMsg || !msgInfo.From_Account || !msgInfo.MsgBody || msgInfo.MsgBody.length == 0) {
        return null;
      }
      var isSendMsg, id, headUrl, fromAccountNick;
      var group_id = msgInfo.ToGroupId;
      var group_name = group_id;
      if (msgInfo.GroupInfo) {//取出群名称
        if (msgInfo.GroupInfo.GroupName) {
          group_name = msgInfo.GroupInfo.GroupName;
        }
      }
      //取出成员昵称
      fromAccountNick = msgInfo.From_Account;
      if (msgInfo.GroupInfo) {
        if (msgInfo.GroupInfo.From_AccountNick) {
          fromAccountNick = msgInfo.GroupInfo.From_AccountNick;
        }
      }
      if (msgInfo.From_Account == ctx.identifier) {//当前用户发送的消息
        isSendMsg = true;
        id = msgInfo.From_Account;//读取接收者信息
        headUrl = '';
      } else {//当前用户收到的消息
        isSendMsg = false;
        id = msgInfo.From_Account;//读取发送者信息
        headUrl = '';
      }
      var sess = MsgStore.sessByTypeId(SESSION_TYPE.GROUP, group_id);
      if (!sess) {
        sess = new Session(SESSION_TYPE.GROUP, group_id, group_name, headUrl, 0, 0);
      }
      if(typeof isFinished !=="undefined") {
        sess.isFinished(isFinished || 0);
      }
      var subType = GROUP_MSG_SUB_TYPE.COMMON;//消息类型
      //群提示消息,重新封装下
      if (LONG_POLLINNG_EVENT_TYPE.GROUP_TIP == msgInfo.Event || LONG_POLLINNG_EVENT_TYPE.GROUP_TIP2 == msgInfo.Event) {
        subType = GROUP_MSG_SUB_TYPE.TIP;
        var groupTip = msgInfo.MsgBody;
        msgInfo.MsgBody = [];
        msgInfo.MsgBody.push({
              "MsgType": MSG_ELEMENT_TYPE.GROUP_TIP,
              "MsgContent": groupTip
            }
        );
      } else if (msgInfo.MsgPriority) {//群点赞消息
        if (msgInfo.MsgPriority == GROUP_MSG_PRIORITY_TYPE.REDPACKET) {
          subType = GROUP_MSG_SUB_TYPE.REDPACKET;
        } else if (msgInfo.MsgPriority == GROUP_MSG_PRIORITY_TYPE.LOVEMSG) {
          subType = GROUP_MSG_SUB_TYPE.LOVEMSG;
        }

      }
      var msg = new Msg(sess, isSendMsg, msgInfo.MsgSeq, msgInfo.MsgRandom, msgInfo.MsgTimeStamp, msgInfo.From_Account, subType, fromAccountNick);
      var msgBody = null;
      var msgContent = null;
      var msgType = null;
      for (var mi in msgInfo.MsgBody) {
        msgBody = msgInfo.MsgBody[mi];
        msgType = msgBody.MsgType;
        switch (msgType) {
          case MSG_ELEMENT_TYPE.TEXT:
            msgContent = new Msg.Elem.Text(msgBody.MsgContent.Text);
            break;
          case MSG_ELEMENT_TYPE.FACE:
            msgContent = new Msg.Elem.Face(
                msgBody.MsgContent.Index,
                msgBody.MsgContent.Data
            );
            break;
          case MSG_ELEMENT_TYPE.IMAGE:
            msgContent = new Msg.Elem.Images(
                msgBody.MsgContent.UUID
            );
            for (var j in msgBody.MsgContent.ImageInfoArray) {
              msgContent.addImage(
                  new Msg.Elem.Images.Image(
                      msgBody.MsgContent.ImageInfoArray[j].Type,
                      msgBody.MsgContent.ImageInfoArray[j].Size,
                      msgBody.MsgContent.ImageInfoArray[j].Width,
                      msgBody.MsgContent.ImageInfoArray[j].Height,
                      msgBody.MsgContent.ImageInfoArray[j].URL
                  )
              );
            }
            break;
          case MSG_ELEMENT_TYPE.SOUND:
            if (msgBody.MsgContent) {
              msgContent = new Msg.Elem.Sound(
                  msgBody.MsgContent.UUID,
                  msgBody.MsgContent.Second,
                  msgBody.MsgContent.Size,
                  msgInfo.From_Account,
                  msgInfo.To_Account,
                  msgBody.MsgContent.Download_Flag,
                  SESSION_TYPE.GROUP
              );
            } else {
              msgType = MSG_ELEMENT_TYPE.TEXT;
              msgContent = new Msg.Elem.Text('[语音消息]下载地址解析出错');
            }
            break;
          case MSG_ELEMENT_TYPE.LOCATION:
            msgContent = new Msg.Elem.Location(
                msgBody.MsgContent.Longitude,
                msgBody.MsgContent.Latitude,
                msgBody.MsgContent.Desc
            );
            break;
          case MSG_ELEMENT_TYPE.FILE:
          case MSG_ELEMENT_TYPE.FILE + " ":
            msgType = MSG_ELEMENT_TYPE.FILE;
            var fileUrl = getFileDownUrl(msgBody.MsgContent.UUID, msgInfo.From_Account, msgBody.MsgContent.FileName);

            if (msgBody.MsgContent) {
              msgContent = new Msg.Elem.File(
                  msgBody.MsgContent.UUID,
                  msgBody.MsgContent.FileName,
                  msgBody.MsgContent.FileSize,
                  msgInfo.From_Account,
                  msgInfo.To_Account,
                  msgBody.MsgContent.Download_Flag,
                  SESSION_TYPE.GROUP
              );
            } else {
              msgType = MSG_ELEMENT_TYPE.TEXT;
              msgContent = new Msg.Elem.Text('[文件消息]地址解析出错');
            }
            break;
          case MSG_ELEMENT_TYPE.GROUP_TIP:
            var opType = msgBody.MsgContent.OpType;
            msgContent = new Msg.Elem.GroupTip(
                opType,
                msgBody.MsgContent.Operator_Account,
                group_id,
                msgInfo.GroupInfo.GroupName,
                msgBody.MsgContent.List_Account
            );
            if (GROUP_TIP_TYPE.JOIN == opType || GROUP_TIP_TYPE.QUIT == opType) {//加群或退群时，设置最新群成员数
              msgContent.setGroupMemberNum(msgBody.MsgContent.MemberNum);
            } else if (GROUP_TIP_TYPE.MODIFY_GROUP_INFO == opType) {//群资料变更
              var tempIsCallbackFlag = false;
              var tempNewGroupInfo = {
                "GroupId": group_id,
                "GroupFaceUrl": null,
                "GroupName": null,
                "OwnerAccount": null,
                "GroupNotification": null,
                "GroupIntroduction": null
              };
              var msgGroupNewInfo = msgBody.MsgContent.MsgGroupNewInfo;
              if (msgGroupNewInfo.GroupFaceUrl) {
                var tmpNGIFaceUrl = new Msg.Elem.GroupTip.GroupInfo(
                    GROUP_TIP_MODIFY_GROUP_INFO_TYPE.FACE_URL,
                    msgGroupNewInfo.GroupFaceUrl
                );
                msgContent.addGroupInfo(tmpNGIFaceUrl);
                tempIsCallbackFlag = true;
                tempNewGroupInfo.GroupFaceUrl = msgGroupNewInfo.GroupFaceUrl;
              }
              if (msgGroupNewInfo.GroupName) {
                var tmpNGIName = new Msg.Elem.GroupTip.GroupInfo(
                    GROUP_TIP_MODIFY_GROUP_INFO_TYPE.NAME,
                    msgGroupNewInfo.GroupName
                );
                msgContent.addGroupInfo(tmpNGIName);
                tempIsCallbackFlag = true;
                tempNewGroupInfo.GroupName = msgGroupNewInfo.GroupName;
              }
              if (msgGroupNewInfo.Owner_Account) {
                var tmpNGIOwner = new Msg.Elem.GroupTip.GroupInfo(
                    GROUP_TIP_MODIFY_GROUP_INFO_TYPE.OWNER,
                    msgGroupNewInfo.Owner_Account
                );
                msgContent.addGroupInfo(tmpNGIOwner);
                tempIsCallbackFlag = true;
                tempNewGroupInfo.OwnerAccount = msgGroupNewInfo.Owner_Account;
              }
              if (msgGroupNewInfo.GroupNotification) {
                var tmpNGINotification = new Msg.Elem.GroupTip.GroupInfo(
                    GROUP_TIP_MODIFY_GROUP_INFO_TYPE.NOTIFICATION,
                    msgGroupNewInfo.GroupNotification
                );
                msgContent.addGroupInfo(tmpNGINotification);
                tempIsCallbackFlag = true;
                tempNewGroupInfo.GroupNotification = msgGroupNewInfo.GroupNotification;
              }
              if (msgGroupNewInfo.GroupIntroduction) {
                var tmpNGIIntroduction = new Msg.Elem.GroupTip.GroupInfo(
                    GROUP_TIP_MODIFY_GROUP_INFO_TYPE.INTRODUCTION,
                    msgGroupNewInfo.GroupIntroduction
                );
                msgContent.addGroupInfo(tmpNGIIntroduction);
                tempIsCallbackFlag = true;
                tempNewGroupInfo.GroupIntroduction = msgGroupNewInfo.GroupIntroduction;
              }

              //回调群资料变化通知方法
              if (isSyncGroupMsgs == false && tempIsCallbackFlag && onGroupInfoChangeCallback) {
                onGroupInfoChangeCallback(tempNewGroupInfo);
              }

            } else if (GROUP_TIP_TYPE.MODIFY_MEMBER_INFO == opType) {//群成员变更
              var memberInfos = msgBody.MsgContent.MsgMemberInfo;
              for (var n in memberInfos) {
                var memberInfo = memberInfos[n];
                msgContent.addMemberInfo(
                    new Msg.Elem.GroupTip.MemberInfo(
                        memberInfo.User_Account, memberInfo.ShutupTime
                    )
                );
              }
            }
            break;
          case MSG_ELEMENT_TYPE.CUSTOM:
            msgType = MSG_ELEMENT_TYPE.CUSTOM;
            msgContent = new Msg.Elem.Custom(
                msgBody.MsgContent.Data,
                msgBody.MsgContent.Desc,
                msgBody.MsgContent.Ext
            );
            break;
          default :
            msgType = MSG_ELEMENT_TYPE.TEXT;
            msgContent = new Msg.Elem.Text('web端暂不支持' + msgBody.MsgType + '消息');
            break;
        }
        msg.elems.push(new Msg.Elem(msgType, msgContent));
      }

      if (isAddMsgFlag == false) {//不需要保存消息
        return msg;
      }

      if (MsgStore.addMsg(msg)) {
        return msg;
      } else {
        return null;
      }
    };

    //初始化
    this.init = function (listeners, cbOk, cbErr) {
      if (!listeners.onMsgNotify) {
        log.warn('listeners.onMsgNotify is empty');
      }
      onMsgCallback = listeners.onMsgNotify;

      if (listeners.onBigGroupMsgNotify) {
        onBigGroupMsgCallback = listeners.onBigGroupMsgNotify;
      } else {
        log.warn('listeners.onBigGroupMsgNotify is empty');
      }

      if (listeners.onC2cEventNotifys) {
        onC2cEventCallbacks = listeners.onC2cEventNotifys;
      } else {
        log.warn('listeners.onC2cEventNotifys is empty');
      }
      if (listeners.onGroupSystemNotifys) {
        onGroupSystemNotifyCallbacks = listeners.onGroupSystemNotifys;
      } else {
        log.warn('listeners.onGroupSystemNotifys is empty');
      }
      if (listeners.onGroupInfoChangeNotify) {
        onGroupInfoChangeCallback = listeners.onGroupInfoChangeNotify;
      } else {
        log.warn('listeners.onGroupInfoChangeNotify is empty');
      }
      if (listeners.onFriendSystemNotifys) {
        onFriendSystemNotifyCallbacks = listeners.onFriendSystemNotifys;
      } else {
        log.warn('listeners.onFriendSystemNotifys is empty');
      }
      if (listeners.onProfileSystemNotifys) {
        onProfileSystemNotifyCallbacks = listeners.onProfileSystemNotifys;
      } else {
        log.warn('listeners.onProfileSystemNotifys is empty');
      }
      if (listeners.onKickedEventCall) {
        onKickedEventCall = listeners.onKickedEventCall;
      } else {
        log.warn('listeners.onKickedEventCall is empty');
      }

      if (listeners.onAppliedDownloadUrl) {
        onAppliedDownloadUrl = listeners.onAppliedDownloadUrl;
      } else {
        log.warn('listeners.onAppliedDownloadUrl is empty');
      }

      if (!ctx.identifier || !ctx.userSig) {
        if (cbOk) {
          var success = {
            'ActionStatus': ACTION_STATUS.OK,
            'ErrorCode': 0,
            'ErrorInfo': "login success(no login state)"
          };
          cbOk(success);
        }
        return;
      }

      //初始化
      initMyGroupMaxSeqs(
          function (resp) {
            log.info('initMyGroupMaxSeqs success');
            //初始化文件
            initIpAndAuthkey(
                function (initIpAndAuthkeyResp) {
                  log.info('initIpAndAuthkey success');
                  if (cbOk) {
                    log.info('login success(have login state))');
                    var success = {
                      'ActionStatus': ACTION_STATUS.OK,
                      'ErrorCode': 0,
                      'ErrorInfo': "login success"
                    };
                    cbOk(success);
                  }
                  MsgManager.setLongPollingOn(true);//开启长轮询
                  longPollingOn && MsgManager.longPolling(cbOk);
                }, cbErr);
          }, cbErr);
    };

    //发消息（私聊或群聊）
    this.sendMsg = function (msg, cbOk, cbErr) {
      proto_sendMsg(msg, function (resp) {
        //私聊时，加入自己的发的消息，群聊时，由于seq和服务器的seq不一样，所以不作处理
        if (msg.sess.type() == SESSION_TYPE.C2C) {
          if (!MsgStore.addMsg(msg)) {
            var errInfo = "sendMsg: addMsg failed!";
            var error = tool.getReturnError(errInfo, -17);
            log.error(errInfo);
            if (cbErr) cbErr(error);
            return;
          }
          //更新信息流时间
          MsgStore.updateTimeline();
        }
        if (cbOk) cbOk(resp);
      }, function (err) {
        if (cbErr) cbErr(err);
      });
    };
  };

  //上传文件
  var FileUploader = new function () {
    this.fileMd5 = null;
    //获取文件MD5
    var getFileMD5 = function (file, cbOk, cbErr) {

      //FileReader pc浏览器兼容性
      //Feature   Firefox (Gecko) Chrome  Internet Explorer   Opera   Safari
      //Basic support 3.6 7   10                      12.02   6.0.2
      var fileReader = null;
      try {
        fileReader = new FileReader();//分块读取文件对象
      } catch (e) {
        if (cbErr) {
          cbErr(tool.getReturnError('当前浏览器不支持FileReader', -18));
          return;
        }
      }
      //file的slice方法，注意它的兼容性，在不同浏览器的写法不同
      var blobSlice = File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice;
      if (!blobSlice) {
        if (cbErr) {
          cbErr(tool.getReturnError('当前浏览器不支持FileAPI', -19));
          return;
        }
      }

      var chunkSize = 2 * 1024 * 1024;//分块大小，2M
      var chunks = Math.ceil(file.size / chunkSize);//总块数
      var currentChunk = 0;//当前块数
      var spark = new SparkMD5();//获取MD5对象

      fileReader.onload = function (e) {//数据加载完毕事件

        var binaryStr = "";
        var bytes = new Uint8Array(e.target.result);
        var length = bytes.byteLength;
        for (var i = 0; i < length; i++) {
          binaryStr += String.fromCharCode(bytes[i]);//二进制转换字符串
        }
        spark.appendBinary(binaryStr);
        currentChunk++;
        if (currentChunk < chunks) {
          loadNext();//读取下一块数据
        } else {
          this.fileMd5 = spark.end();//得到文件MD5值
          if (cbOk) {
            cbOk(this.fileMd5);
          }
        }
      };
      //分片读取文件
      function loadNext() {
        var start = currentChunk * chunkSize, end = start + chunkSize >= file.size ? file.size : start + chunkSize;
        //根据开始和结束位置，切割文件
        var b = blobSlice.call(file, start, end);
        //readAsBinaryString ie浏览器不兼容此方法
        //fileReader.readAsBinaryString(blobSlice.call(file, start, end));
        fileReader.readAsArrayBuffer(b);//ie，chrome，firefox等主流浏览器兼容此方法

      }

      loadNext();//开始读取
    };
    //提交上传图片表单(用于低版本IE9以下)
    this.submitUploadFileForm = function (options, cbOk, cbErr) {
      var errInfo;
      var error;
      var formId = options.formId;
      var fileId = options.fileId;
      var iframeNum = uploadResultIframeId++;
      var iframeName = "uploadResultIframe_" + iframeNum;
      var toAccount = options.To_Account;
      var businessType = options.businessType;

      var form = document.getElementById(formId);
      if (!form) {
        errInfo = "获取表单对象为空: formId=" + formId + "(formId非法)";
        error = tool.getReturnError(errInfo, -20);
        if (cbErr) cbErr(error);
        return;
      }

      var fileObj = document.getElementById(fileId);
      if (!fileObj) {
        errInfo = "获取文件对象为空: fileId=" + fileId + "(没有选择文件或者fileId非法)";
        error = tool.getReturnError(errInfo, -21);
        if (cbErr) cbErr(error);
        return;
      }
      //fileObj.type="file";//ie8下不起作用，必须由业务自己设置
      fileObj.name = "file";

      var iframe = document.createElement("iframe");
      iframe.name = iframeName;
      iframe.id = iframeName;
      iframe.style.display = "none";
      document.body.appendChild(iframe);

      var cmdName;
      if (isAccessFormalEnv()) {
        cmdName = 'pic_up';
      } else {
        cmdName = 'pic_up_test';
      }
      var uploadApiUrl = "https://pic.tim.qq.com/v4/openpic/" + cmdName + "?tinyid=" + ctx.tinyid + "&a2=" + ctx.a2 + "&sdkappid=" + ctx.sdkAppID + "&accounttype=" + ctx.accountType + "&contenttype=http";
      form.action = uploadApiUrl;
      form.method = 'post';
      //form.enctype='multipart/form-data';//ie8下不起作用，必须由业务自己设置
      form.target = iframeName;

      function createFormInput(name, value) {
        var tempInput = document.createElement("input");
        tempInput.type = "hidden";
        tempInput.name = name;
        tempInput.value = value;
        form.appendChild(tempInput);
      }

      createFormInput("App_Version", VERSION_INFO.APP_VERSION);
      createFormInput("From_Account", ctx.identifier);
      createFormInput("To_Account", toAccount);
      createFormInput("Seq", nextSeq().toString());
      createFormInput("Timestamp", unixtime().toString());
      createFormInput("Random", createRandom().toString());
      createFormInput("Busi_Id", businessType);
      createFormInput("PkgFlag", UPLOAD_RES_PKG_FLAG.RAW_DATA.toString());
      createFormInput("Auth_Key", authkey);
      createFormInput("Server_Ver", VERSION_INFO.SERVER_VERSION.toString());
      createFormInput("File_Type", options.fileType);


      //检测iframe.contentWindow.name是否有值
      function checkFrameName() {
        var resp;
        try {
          resp = JSON.parse(iframe.contentWindow.name) || {};
        } catch (e) {
          resp = {};
        }
        if (resp.ActionStatus) {//上传接口返回
          // We've got what we need. Stop the iframe from loading further content.
          iframe.src = "about:blank";
          iframe.parentNode.removeChild(iframe);
          iframe = null;

          if (resp.ActionStatus == ACTION_STATUS.OK) {
            cbOk && cbOk(resp);
          } else {
            cbErr && cbErr(resp);
          }
        } else {
          setTimeout(checkFrameName, 100);
        }
      }

      setTimeout(checkFrameName, 500);

      form.submit();//提交上传图片表单
    };
    //上传图片或文件(用于高版本浏览器，支持FileAPI)
    this.uploadFile = function (options, cbOk, cbErr) {

      var file_upload = {
        //初始化
        init: function (options, cbOk, cbErr) {
          var me = this;
          me.file = options.file;
          //分片上传进度回调事件
          me.onProgressCallBack = options.onProgressCallBack;
          //停止上传图片按钮
          if (options.abortButton) {
            options.abortButton.onclick = me.abortHandler;
          }
          me.total = me.file.size;//文件总大小
          me.loaded = 0;//已读取字节数
          me.step = 1080 * 1024;//分块大小，1080K
          me.sliceSize = 0;//分片大小
          me.sliceOffset = 0;//当前分片位置
          me.timestamp = unixtime();//当前时间戳
          me.seq = nextSeq();//请求seq
          me.random = createRandom();//请求随机数
          me.fromAccount = ctx.identifier;//发送者
          me.toAccount = options.To_Account;//接收者
          me.fileMd5 = options.fileMd5;//文件MD5
          me.businessType = options.businessType;//图片或文件的业务类型，群消息:1; c2c消息:2; 个人头像：3; 群头像：4;
          me.fileType = options.fileType;//文件类型，不填为默认认为上传的是图片；1：图片；2：文件；3：短视频；4：PTT

          me.cbOk = cbOk;//上传成功回调事件
          me.cbErr = cbErr;//上传失败回调事件

          me.reader = new FileReader();//读取文件对象
          me.blobSlice = File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice;//file的slice方法,不同浏览器不一样

          me.reader.onloadstart = me.onLoadStart;//开始读取回调事件
          me.reader.onprogress = me.onProgress;//读取文件进度回调事件
          me.reader.onabort = me.onAbort;//停止读取回调事件
          me.reader.onerror = me.onerror;//读取发生错误回调事件
          me.reader.onload = me.onLoad;//分片加载完毕回调事件
          me.reader.onloadend = me.onLoadEnd;//读取文件完毕回调事件
        },
        //上传方法
        upload: function () {
          var me = file_upload;
          //读取第一块
          me.readBlob(0);
        },
        onLoadStart: function () {
          var me = file_upload;
        },
        onProgress: function (e) {
          var me = file_upload;
          me.loaded += e.loaded;
          if (me.onProgressCallBack) {
            me.onProgressCallBack(me.loaded, me.total);
          }
        },
        onAbort: function () {
          var me = file_upload;
        },
        onError: function () {
          var me = file_upload;
        },
        onLoad: function (e) {
          var me = file_upload;
          if (e.target.readyState == FileReader.DONE) {
            var slice_data_base64 = e.target.result;
            //注意，一定要去除base64编码头部
            var pos = slice_data_base64.indexOf(",");
            if (pos != -1) {
              slice_data_base64 = slice_data_base64.substr(pos + 1);
            }
            //封装上传图片接口的请求参数
            var opt = {
              'From_Account': me.fromAccount,
              'To_Account': me.toAccount,
              'Busi_Id': me.businessType,
              'File_Type': me.fileType,
              'File_Str_Md5': me.fileMd5,
              'PkgFlag': UPLOAD_RES_PKG_FLAG.BASE64_DATA,
              'File_Size': me.total,
              'Slice_Offset': me.sliceOffset,
              'Slice_Size': me.sliceSize,
              'Slice_Data': slice_data_base64,
              'Seq': me.seq,
              'Timestamp': me.timestamp,
              'Random': me.random
            };

            //上传成功的成功回调
            var succCallback = function (resp) {
              if (resp.IsFinish == 0) {
                me.loaded = resp.Next_Offset;
                if (me.loaded < me.total) {
                  me.readBlob(me.loaded);
                } else {
                  me.loaded = me.total;
                }
              } else {

                if (me.cbOk) {
                  var tempResp = {
                    'ActionStatus': resp.ActionStatus,
                    'ErrorCode': resp.ErrorCode,
                    'ErrorInfo': resp.ErrorInfo,
                    'File_UUID': resp.File_UUID,
                    'File_Size': resp.Next_Offset,
                    'URL_INFO': resp.URL_INFO,
                    'Download_Flag':resp.Download_Flag
                  };
                  if (me.fileType == UPLOAD_RES_TYPE.FILE) {//如果上传的是文件，下载地址需要sdk内部拼接
                    tempResp.URL_INFO = getFileDownUrl(resp.File_UUID, ctx.identifier, me.file.name);
                  }
                  me.cbOk(tempResp);
                }
              }
              Upload_Retry_Times = 0;
            };
            //上传失败的回调
            var errorCallback = function(resp){
              if(Upload_Retry_Times < Upload_Retry_Max_Times){
                Upload_Retry_Times ++;
                setTimeout(function(){
                  proto_uploadPic(opt,succCallback,errorCallback);
                },1000);
              }else{
                me.cbErr(resp);
              }
              //me.cbErr
            };
            //分片上传图片接口
            proto_uploadPic(opt, succCallback,errorCallback);
          }
        },
        onLoadEnd: function () {
          var me = file_upload;
        },
        //分片读取文件方法
        readBlob: function (start) {
          var me = file_upload;
          var blob, file = me.file;
          var end = start + me.step;
          if (end > me.total) {
            end = me.total;
            me.sliceSize = end - start;
          } else {
            me.sliceSize = me.step;
          }
          me.sliceOffset = start;
          //根据起始和结束位置，分片读取文件
          blob = me.blobSlice.call(file, start, end);
          //将分片的二进制数据转换为base64编码
          me.reader.readAsDataURL(blob);
        },
        abortHandler: function () {
          var me = file_upload;
          if (me.reader) {
            me.reader.abort();
          }
        }
      };

      //读取文件MD5
      getFileMD5(options.file,
          function (fileMd5) {
            log.info('fileMd5: ' + fileMd5);
            options.fileMd5 = fileMd5;
            //初始化上传参数
            file_upload.init(options, cbOk, cbErr);
            //开始上传文件
            file_upload.upload();
          },
          cbErr
      );
    };
  };


  //web im 基础对象

  //常量对象

  //会话类型
  webim.SESSION_TYPE = SESSION_TYPE;

  webim.MSG_MAX_LENGTH = MSG_MAX_LENGTH;

  //c2c消息子类型
  webim.C2C_MSG_SUB_TYPE = C2C_MSG_SUB_TYPE;

  //群消息子类型
  webim.GROUP_MSG_SUB_TYPE = GROUP_MSG_SUB_TYPE;

  //消息元素类型
  webim.MSG_ELEMENT_TYPE = MSG_ELEMENT_TYPE;

  //群提示消息类型
  webim.GROUP_TIP_TYPE = GROUP_TIP_TYPE;

  //图片类型
  webim.IMAGE_TYPE = IMAGE_TYPE;

  //群系统消息类型
  webim.GROUP_SYSTEM_TYPE = GROUP_SYSTEM_TYPE;

  //好友系统通知子类型
  webim.FRIEND_NOTICE_TYPE = FRIEND_NOTICE_TYPE;

  //群提示消息-群资料变更类型
  webim.GROUP_TIP_MODIFY_GROUP_INFO_TYPE = GROUP_TIP_MODIFY_GROUP_INFO_TYPE;

  //浏览器信息
  webim.BROWSER_INFO = BROWSER_INFO;

  //表情对象
  webim.Emotions = webim.EmotionPicData = emotions;
  //表情标识符和index Map
  webim.EmotionDataIndexs = webim.EmotionPicDataIndex = emotionDataIndexs;

  //腾讯登录服务错误码(托管模式)
  webim.TLS_ERROR_CODE = TLS_ERROR_CODE;

  //连接状态
  webim.CONNECTION_STATUS = CONNECTION_STATUS;

  //上传图片业务类型
  webim.UPLOAD_PIC_BUSSINESS_TYPE = UPLOAD_PIC_BUSSINESS_TYPE;

  //最近联系人类型
  webim.RECENT_CONTACT_TYPE = RECENT_CONTACT_TYPE;

  //上传资源类型
  webim.UPLOAD_RES_TYPE = UPLOAD_RES_TYPE;


  /**************************************/

  //类对象
  //
  //工具对象
  webim.Tool = tool;
  //控制台打印日志对象
  webim.Log = log;

  //消息对象
  webim.Msg = Msg;
  //会话对象
  webim.Session = Session;
  //会话存储对象
  webim.MsgStore = {
    sessMap: function () {
      return MsgStore.sessMap();
    },
    sessCount: function () {
      return MsgStore.sessCount();
    },
    sessByTypeId: function (type, id) {
      return MsgStore.sessByTypeId(type, id);
    },
    delSessByTypeId: function (type, id) {
      return MsgStore.delSessByTypeId(type, id);
    },
    resetCookieAndSyncFlag: function () {
      return MsgStore.resetCookieAndSyncFlag();
    }
  };

  webim.Resources = Resources;

  /**************************************/

  // webim API impl
  //
  //基本接口
  //登录
  webim.login = webim.init = function (loginInfo, listeners, opts, cbOk, cbErr) {

    //初始化连接状态回调函数
    ConnManager.init(listeners.onConnNotify, cbOk, cbErr);

    //设置ie9以下浏览器jsonp回调
    if (listeners.jsonpCallback) jsonpCallback = listeners.jsonpCallback;
    //登录
    _login(loginInfo, listeners, opts, cbOk, cbErr);
  };
  //登出
  //需要传长轮询id
  //这样登出之后其他的登录实例还可以继续收取消息
  webim.logout = webim.offline = function (cbOk, cbErr) {
    return proto_logout('instance',cbOk, cbErr);
  };

  //登出
  //这种登出方式，所有的实例都将不会收到消息推送，直到重新登录
  webim.logoutAll = function (cbOk, cbErr) {
    return proto_logout('all',cbOk, cbErr);
  };


  //消息管理接口
  //发消息接口（私聊和群聊）
  webim.sendMsg = function (msg, cbOk, cbErr) {
    return MsgManager.sendMsg(msg, cbOk, cbErr);
  };
  //拉取未读c2c消息
  webim.syncMsgs = function (cbOk, cbErr) {
    return MsgManager.syncMsgs(cbOk, cbErr);
  };
  //拉取C2C漫游消息
  webim.getC2CHistoryMsgs = function (options, cbOk, cbErr) {
    return MsgManager.getC2CHistoryMsgs(options, cbOk, cbErr);
  };
  //拉取群漫游消息
  webim.syncGroupMsgs = function (options, cbOk, cbErr) {
    return MsgManager.syncGroupMsgs(options, cbOk, cbErr);
  };

  //上报c2c消息已读
  webim.c2CMsgReaded = function (options, cbOk, cbErr) {
    return MsgStore.c2CMsgReaded(options, cbOk, cbErr);
  };

  //上报群消息已读
  webim.groupMsgReaded = function (options, cbOk, cbErr) {
    return proto_groupMsgReaded(options, cbOk, cbErr);
  };

  //设置聊天会话自动标记已读
  webim.setAutoRead = function (selSess, isOn, isResetAll) {
    return MsgStore.setAutoRead(selSess, isOn, isResetAll);
  };

  //群组管理接口
  //
  //创建群
  webim.createGroup = function (options, cbOk, cbErr) {
    return proto_createGroup(options, cbOk, cbErr);
  };
  //创建群-高级接口
  webim.createGroupHigh = function (options, cbOk, cbErr) {
    return proto_createGroupHigh(options, cbOk, cbErr);
  };
  //申请加群
  webim.applyJoinGroup = function (options, cbOk, cbErr) {
    return proto_applyJoinGroup(options, cbOk, cbErr);
  };
  //处理加群申请(同意或拒绝)
  webim.handleApplyJoinGroupPendency = function (options, cbOk, cbErr) {
    return proto_handleApplyJoinGroupPendency(options, cbOk, cbErr);
  };

  //删除加群申请
  webim.deleteApplyJoinGroupPendency = function (options, cbOk, cbErr) {
    return proto_deleteC2CMsg(options, cbOk, cbErr);
  };

  //主动退群
  webim.quitGroup = function (options, cbOk, cbErr) {
    return proto_quitGroup(options, cbOk, cbErr);
  };
  //搜索群组(根据名称)
  webim.searchGroupByName = function (options, cbOk, cbErr) {
    return proto_searchGroupByName(options, cbOk, cbErr);
  };
  //获取群组公开资料(根据群id搜索)
  webim.getGroupPublicInfo = function (options, cbOk, cbErr) {
    return proto_getGroupPublicInfo(options, cbOk, cbErr);
  };
  //获取群组详细资料-高级接口
  webim.getGroupInfo = function (options, cbOk, cbErr) {
    return proto_getGroupInfo(options, cbOk, cbErr);
  };
  //修改群基本资料
  webim.modifyGroupBaseInfo = function (options, cbOk, cbErr) {
    return proto_modifyGroupBaseInfo(options, cbOk, cbErr);
  };
  //获取群成员列表
  webim.getGroupMemberInfo = function (options, cbOk, cbErr) {
    return proto_getGroupMemberInfo(options, cbOk, cbErr);
  };
  //邀请好友加群
  webim.addGroupMember = function (options, cbOk, cbErr) {
    return proto_addGroupMember(options, cbOk, cbErr);
  };
  //修改群成员资料
  webim.modifyGroupMember = function (options, cbOk, cbErr) {
    return proto_modifyGroupMember(options, cbOk, cbErr);
  };
  //删除群成员
  webim.deleteGroupMember = function (options, cbOk, cbErr) {
    return proto_deleteGroupMember(options, cbOk, cbErr);
  };
  //解散群
  webim.destroyGroup = function (options, cbOk, cbErr) {
    return proto_destroyGroup(options, cbOk, cbErr);
  };
  //转让群组
  webim.changeGroupOwner = function (options, cbOk, cbErr) {
    return proto_changeGroupOwner(options, cbOk, cbErr);
  };

  //获取我的群组列表-高级接口
  webim.getJoinedGroupListHigh = function (options, cbOk, cbErr) {
    return proto_getJoinedGroupListHigh(options, cbOk, cbErr);
  };
  //获取群成员角色
  webim.getRoleInGroup = function (options, cbOk, cbErr) {
    return proto_getRoleInGroup(options, cbOk, cbErr);
  };
  //设置群成员禁言时间
  webim.forbidSendMsg = function (options, cbOk, cbErr) {
    return proto_forbidSendMsg(options, cbOk, cbErr);
  };
  //发送自定义群系统通知
  webim.sendCustomGroupNotify = function (options, cbOk, cbErr) {
    return proto_sendCustomGroupNotify(options, cbOk, cbErr);
  };

  //进入大群
  webim.applyJoinBigGroup = function (options, cbOk, cbErr) {
    return proto_applyJoinBigGroup(options, cbOk, cbErr);
  };
  //退出大群
  webim.quitBigGroup = function (options, cbOk, cbErr) {
    return proto_quitBigGroup(options, cbOk, cbErr);
  };

  //资料关系链管理接口
  //
  //获取个人资料接口，可用于搜索用户
  webim.getProfilePortrait = function (options, cbOk, cbErr) {
    return proto_getProfilePortrait(options, cbOk, cbErr);
  };
  //设置个人资料
  webim.setProfilePortrait = function (options, cbOk, cbErr) {
    return proto_setProfilePortrait(options, cbOk, cbErr);
  };
  //申请加好友
  webim.applyAddFriend = function (options, cbOk, cbErr) {
    return proto_applyAddFriend(options, cbOk, cbErr);
  };
  //获取好友申请列表
  webim.getPendency = function (options, cbOk, cbErr) {
    return proto_getPendency(options, cbOk, cbErr);
  };
  //删除好友申请
  webim.deletePendency = function (options, cbOk, cbErr) {
    return proto_deletePendency(options, cbOk, cbErr);
  };
  //处理好友申请
  webim.responseFriend = function (options, cbOk, cbErr) {
    return proto_responseFriend(options, cbOk, cbErr);
  };
  //获取我的好友
  webim.getAllFriend = function (options, cbOk, cbErr) {
    return proto_getAllFriend(options, cbOk, cbErr);
  };
  //删除好友
  webim.deleteFriend = function (options, cbOk, cbErr) {
    return proto_deleteFriend(options, cbOk, cbErr);
  };
  //拉黑
  webim.addBlackList = function (options, cbOk, cbErr) {
    return proto_addBlackList(options, cbOk, cbErr);
  };
  //删除黑名单
  webim.deleteBlackList = function (options, cbOk, cbErr) {
    return proto_deleteBlackList(options, cbOk, cbErr);
  };
  //获取我的黑名单
  webim.getBlackList = function (options, cbOk, cbErr) {
    return proto_getBlackList(options, cbOk, cbErr);
  };

  //获取最近会话
  webim.getRecentContactList = function (options, cbOk, cbErr) {
    return proto_getRecentContactList(options, cbOk, cbErr);
  };

  //图片或文件服务接口
  //
  //上传文件接口（高版本浏览器）
  webim.uploadFile = webim.uploadPic = function (options, cbOk, cbErr) {
    return FileUploader.uploadFile(options, cbOk, cbErr);
  };
  //提交上传图片表单接口（用于低版本ie）
  webim.submitUploadFileForm = function (options, cbOk, cbErr) {
    return FileUploader.submitUploadFileForm(options, cbOk, cbErr);
  };
  //上传图片或文件(Base64)接口
  webim.uploadFileByBase64 = webim.uploadPicByBase64 = function (options, cbOk, cbErr) {
    //请求参数
    var opt = {
      'To_Account': options.toAccount,
      'Busi_Id': options.businessType,
      'File_Type': options.File_Type,
      'File_Str_Md5': options.fileMd5,
      'PkgFlag': UPLOAD_RES_PKG_FLAG.BASE64_DATA,
      'File_Size': options.totalSize,
      'Slice_Offset': 0,
      'Slice_Size': options.totalSize,
      'Slice_Data': options.base64Str,
      'Seq': nextSeq(),
      'Timestamp': unixtime(),
      'Random': createRandom()
    };
    return proto_uploadPic(opt, cbOk, cbErr);
  };

  //设置jsonp返回的值
  webim.setJsonpLastRspData = function (rspData) {
    jsonpLastRspData = typeof (rspData) == "string" ? JSON.parse(rspData) : rspData;
  };

  //获取长轮询ID
  webim.getLongPollingId = function (options, cbOk, cbErr) {
    return proto_getLongPollingId(options, cbOk, cbErr);
  };

  //获取下载地址
  webim.applyDownload = function (options, cbOk, cbErr) {
    return proto_applyDownload(options, cbOk, cbErr);
  };

  //获取下载地址
  webim.onDownFile = function (uuid) {
    window.open(Resources.downloadMap["uuid_"+uuid]);
  };

  //检查是否登录
  webim.checkLogin = function (cbErr, isNeedCallBack) {
    return checkLogin(cbErr, isNeedCallBack);
  };
})(webim);

export default webim
