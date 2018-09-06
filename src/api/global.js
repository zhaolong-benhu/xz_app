/**
 * Created by zhaolong on 2017/03/03.
 * File description:api公共接口
 */
'use strict'
export const glo_url = 'http://app.9first.com';

//用户
export const api_sso_captcha = 'http://sso.9first.com/user/captcha';
export const api_order_list = 'mv1/user/order/order-list';

//首页
export const api_search = 'mv1/home/search';
export const api_banner = 'mv1/home/topad';
export const api_freecouse = 'mv1/home/freecouse';
export const api_course = 'mv1/home/course';
export const api_opencourse = 'mv1/home/opencourse';
export const api_teacher = 'mv1/home/teacher';
export const api_cert = 'mv1/home/cert';

//书包
export const api_mycourse = 'mv1/user/index/courselist';
export const api_mycertificate = 'mv1/user/index/classroomlist';
export const api_myihma = 'mv1/user/index/ihmalist';
export const api_myopenclass = 'mv1/user/index/openclasslist';
export const api_myactivity = 'mv1/user/index/activitylist';
export const api_deletecourse = 'mv1/user/index/delete-course';

//上传用户头像
export const api_userInfoDetail = 'mv1/user/info/detail';
export const api_updateavatar = 'mv1/user/account/updateavatar';
export const api_modifyNickname = 'mv1/user/account/basic';
export const api_feedback = 'mv1/user/info/addfeedback-app';

//直播
export const api_isLiveUser = 'mv1/user/live/is-live-user';
export const api_addUserTheme = 'mv1/live/add-user-theme';
export const api_livelist = 'mv1/user/favorite/live-user-list';
export const api_changeliveFavorite = 'mv1/user/favorite/add';


//直播间
export const api_coursewarelist = 'mv1/live/ppt';
export const api_liveUserinfo = 'mv1/live/user-info';
export const api_liveRoomDetail = 'mv1/live/live-info';
export const api_liveroomValid = 'mv1/live/valid';
export const api_liveroomValidpassword = 'mv1/live/valid-password';
export const api_historyreviewlist = 'mv1/live/get-history-live';
export const api_videodetail = 'mv1/live/history-live-info';


// 直播人数翻倍
export const times = 9
