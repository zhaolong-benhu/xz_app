/**
 * Created by qzy on 11/04/2017.
 * File description:
 */
//模块+页面+action
//公共
export const TEST = 'test';
export const LOADING_START = 'loading_start';
export const LOADING_END = 'loading_end';

//用户
export const USER_INFO_SUCCESS = 'user_info_success';
export const USER_REGISTER_SUCCESS = 'user_register_success';
export const MOBILE_SEND_SUCCESS = 'mobile_send_success';
export const MOBILE_CODE_SUCCESS = 'mobile_code_success';
export const USER_FORGOTPASSWORD_SUCCESS = 'Forgot_password_success';

//首页
export const HOME_SEARCH_SUCCESS = 'search_success';
export const HOME_SEARCH_FAIL = 'search_fail';
export const HOME_SEARCH = 'search';

export const BANNER_SUCCESS = 'banner_success';
export const BANNER_FAIL = 'banner_fail';
export const BANNER = 'banner';

export const HOME_FREECOURSE_SUCCESS = 'free_success';
export const HOME_FREECOURSE_FAIL = 'free_fail';
export const HOME_FREECOURSE = 'free';

export const HOME_ONLINECOURSE_SUCCESS = 'online_success';
export const HOME_ONLINECOURSE_FAIL = 'online_fail';
export const HOME_ONLINECOURSE = 'online';

export const HOME_OPENCOURSE_SUCCESS = 'open_success';
export const HOME_OPENCOURSE_FAIL = 'open_fail';
export const HOME_OPENCOURSE = 'open';

export const HOME_TEACHER_SUCCESS = 'teacher_success';
export const HOME_TEACHER_FAIL = 'teacher_fail';
export const HOME_TEACHER = 'teacher';

export const HOME_CERTIFICATE_SUCCESS = 'certificate_success';
export const HOME_CERTIFICATE_FAIL = 'certificate_fail';
export const HOME_CERTIFICATE = 'certificate';

//直播
export const LIVE_LIVECAST_GET_SUCCESS = 'live_liveCast_get_success';
export const LIVE_LIVECAST_LIVECAST_CLEAR_LIVE_LIST = 'live_liveCast_clear_live_list';

export const LIVE_LIVECAST_GET_FAIL = 'live_liveCast_get_fail';
export const LIVE_LIVECAST_GET = 'live_liveCast_get';

export const LIVE_LIVECAST_ADD_REMIND_SUCCESS = 'live_liveCast_add_remind_success';
export const LIVE_LIVECAST_ADD_REMIND_FAIL = 'live_liveCast_add_remind_fail';
export const LIVE_LIVECAST_DELETE_REMIND_SUCCESS = 'live_liveCast_delete_remind_success';
export const LIVE_LIVECAST_DELETE_REMIND_FAIL = 'live_liveCast_delete_remind_fail';
export const LIVE_LIVECAST_ADD_FAVORITE_SUCCESS = 'live_liveCast_add_favorite_success';
export const LIVE_LIVECAST_DELETE_FAVORITE_SUCCESS = 'live_liveCast_delete_favorite_success';


export const LIVE_LIVECAST_GET_LIVE_WATCH_ROOM = 'live_livecast_get_live_watch_room';
export const LIVE_LIVECAST_CHANGE_LIVE_ROOM_FAVORITE = 'live_livecast_change_live_room_favorite';
export const LIVE_LIVECAST_GET_THEME = 'live_livecast_get_theme';
export const LIVE_LIVECAST_CLOSE_THEME_MODAL = 'live_livecast_close_theme_modal';
export const LIVE_LIVECAST_PASS_ID_STATUS_TO_ROOM = 'live_livecast_pass_id_status_to_room';

export const LIVE_FOLLOWING_SUCCESS= 'live_follow_success';
export const LIVE_FOLLOWING_FAIL = 'live_follow_fail';
export const LIVE_FOLLOWING = 'live_follow';

export const LIVE_ADDCANCELFOLLOW_SUCCESS= 'live_addcancelfollow_success';
export const LIVE_ADDCANCELFOLLOW_FAIL = 'live_addcancelfollow_fail';
export const LIVE_ADDCANCELFOLLOW = 'live_addcancelfollow';

export const LIVE_COURSEWARE_SUCCESS= 'live_courseware_success';
export const LIVE_COURSEWARE_FAIL = 'live_courseware_fail';
export const LIVE_COURSEWARE = 'live_courseware';

export const LIVE_USERINFO_SUCCESS= 'live_userinfo_success';
export const LIVE_USERINFO_FAIL = 'live_userinfo_fail';
export const LIVE_USERINFO = 'live_userinfo';

export const LIVEROOMDETAIL_SUCCESS= 'liveroomdetail_success';
export const LIVEROOMDETAIL_FAIL = 'liveroomdetail_fail';
export const LIVEROOMDETAIL = 'liveroomdetail';

export const LIVE_ROOMVALID_SUCCESS= 'liveroomvalid_success';
export const LIVE_ROOMVALID_FAIL = 'liveroomvalid_fail';
export const LIVE_ROOMVALID = 'liveroomvalid';

export const LIVE_ROOMHISTORYVALID_SUCCESS= 'liveroomhistoryvalid_success';
export const LIVE_ROOMHISTORYVALID_FAIL = 'liveroomhistoryvalid_fail';
export const LIVE_ROOMHISTORYVALID = 'liveroomhistoryvalid';

export const LIVE_ROOMVALIDPASSWORD_SUCCESS= 'liveroomvalidpassword_success';
export const LIVE_ROOMVALIDPASSWORD_FAIL = 'liveroomvalidpassword_fail';
export const LIVE_ROOMVALIDPASSWORD = 'liveroomvalidpassword';

export const LIVE_HISTORICALREVIEW_SUCCESS= 'livehistoryreview_success';
export const LIVE_HISTORICALREVIEW_FAIL = 'livehistoryreview_fail';
export const LIVE_HISTORICALREVIEW = 'livehistoryreview';

export const LIVE_VIDEODETAIL_SUCCESS= 'livevideodetail_success';
export const LIVE_VIDEODETAIL_FAIL = 'livevideodetail_fail';
export const LIVE_VIDEODETAIL = 'livevideodetail';


export const LIVE_LIVECAST_TOGGLE_PAYMODAL = 'live_livecast_toggle_payModal';

export const LIVE_LIVECAST_RANDOM_PAY = 'live_livecast_random_pay';
export const LIVE_LIVECAST_CHANGE_PAY = 'live_livecast_change_pay';

export const LIVE_LIVECAST_TOGGLE_CHECKOUTMODAL = 'live_livecast_toggle_ckeckoutModal';
export const LIVE_LIVECAST_CHOOSE_PAY = 'live_livecast_choose_pay';
export const LIVE_LIVECAST_TOGGLE_CHOOSE_PAY = 'live_livecast_toggle_choose_pay';

export const LIVE_LIVECAST_GET_ORDER = 'live_livecast_get_order';
export const LIVE_LIVECAST_GET_ALIPAY_PARAMS = 'live_livecast_get_aliPay_params';

export const LIVE_LIVECAST_QUIT_CHAT_GROUP = 'live_livecast_quit_chat_group';
export const LIVE_LIVECAST_EMIT_ONE_MESSAGE_BY_WATCHER = 'live_livecast_emit_one_message_by_watcher';
export const LIVE_LIVECAST_ALTER_USER_NUM = 'live_livecast_alter_user_num';
export const LIVE_LIVECAST_GET_LIVE_BARRAGE = 'live_livecast_get_live_barrage';
export const LIVE_LIVECAST_EMIT_ONE_BARRAGE = 'live_livecast_emit_one_barrage';
export const LIVE_LIVECAST_GET_BARRAGE_ORDER = 'live_livecast_get_barrage_order';
export const LIVE_LIVECAST_LIVEROOM_PUSH_USER_ICON = 'live_livecast_liveroom_push_user_icon';
export const LIVE_LIVECAST_LIVEROOM_PUSH_RED_POCKET = 'live_livecast_liveroom_red_pocket';
export const LIVE_LIVECAST_LIVEROOM_REMOVE_RED_POCKET = 'live_livecast_liveroom_remove_red_pocket';
export const LIVE_LIVECAST_LIVEROOM_SET_REDPACKET_NUM = 'live_livecast_liveroom_set_redpocket_num';
export const LIVE_LIVECAST_LIVEROOM_ADD_RED_POCKET_TO_CASTER = 'live_livecast_liveroom_add_red_pocket_to_caster';
export const LIVE_LIVECAST_GET_BARRAGE = 'live_livecast_get_barrage';
export const LIVE_LIVECAST_LIVEROOM_SET_BARRAGE = 'live_livecast_liveroom_set_barrage';
export const LIVE_LIVECAST_LIVEROOM_REMOVE_BARRAGE = 'live_livecast_liveroom_remove_barrage';
export const LIVE_LIVECAST_LIVECAST_BARRAGE_PRICE_CHANGED = 'live_livecast_barrage_price_changed';
export const LIVE_LIVECAST_CLEAR_LIVE_ROOM = 'live_livecast_clear_live_room';


export const LIVE_LIVECAST_CASTER_IS_ONLINE= 'live_livecast_caster_is_online';
export const LIVE_STOP_VIDEO_PLAY = 'live_stop_video_play';

//书包
export const STUDY_MYCOURSE_SUCCESS = 'study_mycourse_success';
export const STUDY_MYCOURSE_FAIL = 'study_mycourse_fail';
export const STUDY_MYCOURSE = 'study_mycourse';

export const STUDY_CERTIFICATE_SUCCESS = 'study_mycertificate_success';
export const STUDY_CERTIFICATE_FAIL = 'study_mycertificate_fail';
export const STUDY_CERTIFICATE = 'study_mycertificate';

export const STUDY_MYIHMA_SUCCESS = 'study_myihma_success';
export const STUDY_MYIHMA_FAIL = 'study_myihma_fail';
export const STUDY_MYIHMA = 'study_myihma';

export const STUDY_MYOPENCLASS_SUCCESS = 'study_myopenclass_success';
export const STUDY_MYOPENCLASS_FAIL = 'study_myopenclass_fail';
export const STUDY_MYOPENCLASS = 'study_myopenclass';

export const STUDY_MYACTIVITY_SUCCESS = 'study_myactivity_success';
export const STUDY_MYACTIVITY_FAIL = 'study_myactivity_fail';
export const STUDY_MYACTIVITY = 'study_myactivity';

export const STUDY_DELETECOURSE_SUCCESS = 'study_deletecourse_success';
export const STUDY_DELETECOURSE_FAIL = 'study_deletecourse_fail';
export const STUDY_DELETECOURSE = 'study_deletecourse';

//用户中心
export const USER_USERINFO_SUCCESS = 'user_userinfo_success';
export const USER_USERINFO_FAIL = 'user_userinfo_fail';
export const USER_USERINFO = 'user_userinfo';

export const USER_UPLOADAVATAR_SUCCESS = 'user_uploadavatar_success';
export const USER_UPLOADAVATAR_FAIL = 'user_uploadavatar_fail';
export const USER_UPLOADAVATAR = 'user_uploadavatar';

export const USER_MODIFYNICKNAME_SUCCESS = 'user_modifynickname_success';
export const USER_MODIFYNICKNAME_FAIL = 'user_modifynickname_fail';
export const USER_MODIFYNICKNAME = 'user_modifynickname';

export const USER_ORDERLIST_SUCCESS = 'user_orderlist_success';
export const USER_ORDERLIST_FAIL = 'user_orderlist_fail';
export const USER_ORDERLIST = 'user_orderlist';

export const USER_FEEDBACK_SUCCESS = 'user_feedback_success';
export const USER_FEEDBACK_FAIL = 'user_feedback_fail';
export const USER_FEEDBACK = 'user_feedback';

export const UPUDAE_USER_AVATAR = 'update_useravatar';
export const UPUDAE_USER_NAME = 'update_username';



// 学习
export const STUDY_COURSEDETAIL_GET_DETAIL_SUCCESS = 'study_courseList_get_detail_success';
export const STUDY_COURSEDETAIL_ADD_REVIEW = 'study_courseDetail_add_review';
export const STUDY_COURSEDETAIL_TOGGLE_OPENSTATE = 'study_courseDetail_toggle_openState';
export const STUDY_COURSEDETAIL_TOGGLE_CATEGORY = 'study_courseDetail_toggle_category';
export const STUDY_COURSEDETAIL_TOGGLE_PROGRESS= 'study_courseDetail_toggle_proress';
export const STUDY_COURSEDETAIL_CHOOSE_CATEGORY= 'study_courseDetail_choose_category';
export const STUDY_COURSEDETAIL_GET_EXAM_QUESTIONS_SUCCESS= 'study_courseDetail_get_exam_questions_success';
export const STUDY_COURSEDETAIL_CHOOSE_EXAM_QUESTIONS= 'study_courseDetail_choose_exam_questions';
export const STUDY_COURSEDETAIL_SAVE_EXAM_QUESTIONS_SUCCESS= 'study_courseDetail_save_exam_questions';
export const STUDY_COURSEDETAIL_BACK_AND_REFRESH= 'study_courseDetail_back_and_refresh';
export const STUDY_COURSEDETAIL_CHOOSE_PROGRESS= 'study_courseDetail_choose_progress';
export const STUDY_EXAM_PREV_QUESTION= 'study_exam_prev_question';
export const STUDY_EXAM_NEXT_QUESTION= 'study_exam_next_question';
export const STUDY_EXAM_RESET_QUESTION= 'study_exam_reset_question';
export const REFRESH_FALSE= 'refresh_false';
export const COURSE_LIST_REFRESH_FALSE= 'course_list_refresh_false';
export const COURSE_LIST_REFRESH_TRUE= 'course_list_refresh_true';

//路由
export const ROUTER_HIDE_SCORERIGHTBTN= 'router_hide_scoreRightBtn';
export const ROUTER_SHOW_SCORERIGHTBTN= 'router_show_scoreRightBtn';
export const LIVE_LIVECAST_LIVECAST_BACK_AND_OPEN_THEME_MODAL= 'live_livecast_back_and_open_theme_modal';
