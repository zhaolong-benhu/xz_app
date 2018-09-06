/**
 * Created by qzy on 11/04/2017.
 * File description:
 */
import { combineReducers } from 'redux';
import test from './test';
import common from './common';
import auth from './auth';
import live from './live';
import search from './search';
import banner from './banner';
import freeCourse from './freeCourse';
import onLineCourse from './onLineCourse';
import openCourse from './openCourse';
import teacher from './teacher';
import occupationCertificate from './occupationCertificate';
import liveWatchRoom from './liveWatchRoom';
import myCourse from './myCourse';
import myCertificate from './myCertificate';
import myIhma from './myIhma';
import myOpenclass from './myOpenclass';
import myActivity from './myActivity';
import deleteCourse from './deleteCourse';
import liveFollow from './liveFollow';
import orderList from './orderList';
import userInfo from './userInfo';
import course from './course';
import courseReview from './courseReview';
import category from './category';
import exam from './exam';
import examResult from './examResult';
import livePay from './livePay';
import liveChatRoom from './liveChatRoom';
import courseList from './courseList';
import router from './router';
import coursewareList from './coursewareList';
import anchorRoomUserinfo from './anchorRoomUserinfo';
import liveroomDetail from './liveroomDetail';
import passwordRoom from './passwordRoom';
import historicalReviewList from './historicalReviewList';
import videoDetail from './videoDetail';


export default combineReducers({
		common,
		search,
		banner,
		freeCourse,
		onLineCourse,
		openCourse,
		teacher,
		occupationCertificate,
		myCourse,
		myCertificate,
		myIhma,
		myOpenclass,
		myActivity,
		deleteCourse,
		test,
		live,
		liveWatchRoom,
		liveFollow,
		user: auth,
		userInfo,
		orderList,
		course,
		courseReview,
		category,
		exam,
		examResult,
		livePay,
		liveChatRoom,
    	courseList,
		router,
		coursewareList,
		anchorRoomUserinfo,
		liveroomDetail,
		passwordRoom,
		historicalReviewList,
		videoDetail,
});
