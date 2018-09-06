/**
 * Created by qzy on 28/04/2017.
 * File description:所有学习的行为
 */
import * as helpers from '../helpers/helpers';
import {
	STUDY_COURSEDETAIL_GET_DETAIL_SUCCESS,
	STUDY_COURSEDETAIL_ADD_REVIEW,
	STUDY_COURSEDETAIL_TOGGLE_OPENSTATE,
	STUDY_COURSEDETAIL_TOGGLE_CATEGORY,
	STUDY_COURSEDETAIL_TOGGLE_PROGRESS,
	STUDY_COURSEDETAIL_CHOOSE_CATEGORY,
	STUDY_COURSEDETAIL_GET_EXAM_QUESTIONS_SUCCESS,
	LOADING_END,
    LOADING_START,
	STUDY_COURSEDETAIL_CHOOSE_EXAM_QUESTIONS,
	STUDY_COURSEDETAIL_SAVE_EXAM_QUESTIONS_SUCCESS,
	STUDY_COURSEDETAIL_BACK_AND_REFRESH,
	STUDY_COURSEDETAIL_CHOOSE_PROGRESS,
  	STUDY_EXAM_PREV_QUESTION,
  	STUDY_EXAM_NEXT_QUESTION,
  	STUDY_EXAM_RESET_QUESTION,
  	REFRESH_FALSE,
  	COURSE_LIST_REFRESH_TRUE,
} from './types';
import {Actions} from 'react-native-router-flux';
import {post} from '../helpers/helpers';
import {Alert} from '../components';
export function getDetail(course_id, cert_id, product_id, type, lecture_id, sort) {
	return async (dispatch) => {

		let _type = 0;
		if(type === 5 ) {
			_type = 1
		}
		if(type === 1 ) {
			_type = 2
		}
		if(type === 6 ) {
			_type = 3
		}
    dispatch({
      type:REFRESH_FALSE,
    })
		//获取详情
    dispatch({
      type:LOADING_START,
    })
		let detail = await post('mv1/user/index/learn-course',{course_id, cert_id, product_id, type, lecture_id, sort});


		if( type !== 2) {
			//获取评论
			let review = await post('mv1/user/reviews/get-review',{
				resource_id: course_id || product_id,
				type:_type,
			})
			if(review) {
			  dispatch({
          type: STUDY_COURSEDETAIL_GET_DETAIL_SUCCESS,
          payload: {detail, review},
        })
      }
		}else {
			//ihma获取分类
			let category = await post('mv1/user/index/ihma-cert-module',{
				cert_id
			})
			if(category) {
			  dispatch({
          type: STUDY_COURSEDETAIL_GET_DETAIL_SUCCESS,
          payload: {detail, category, lecture_id, sort},
        })
      }
		}
    dispatch({
      type:LOADING_END,
    })
	}
}
//添加评论
export function addReview(review)  {
	return {
		type: STUDY_COURSEDETAIL_ADD_REVIEW,
		payload: review,
	}
}
//展开关闭章节详情
export function toggleState(id) {
	return {
		type: STUDY_COURSEDETAIL_TOGGLE_OPENSTATE,
		payload: id
	}
}
//展开关闭分类
export function toggleCategory() {
	return {
		type: STUDY_COURSEDETAIL_TOGGLE_CATEGORY,
	}
}
//选择进度排序
export function toggleProgress() {
	return {
		type: STUDY_COURSEDETAIL_TOGGLE_PROGRESS,
	}
}
export function chooseProgress(id) {
	return {
		type: STUDY_COURSEDETAIL_CHOOSE_PROGRESS,
		payload: id
	}
}
//选择分类
export function chooseCategory(id) {
	return {
		type: STUDY_COURSEDETAIL_CHOOSE_CATEGORY,
		payload: id,
	}
}
//获取考试题目
export function fetchExam(course_id, progress_id, cert_id, product_id) {
	return async (dispatch) => {
	  dispatch({type:LOADING_START})
		let examinationQuestion = await post('mv1/user/index/test-question',{course_id, progress_id})
		if(examinationQuestion.length === 0) {
      dispatch({type:LOADING_END})
      Alert("该课程没有考试题目，无需考试")
      dispatch(backAndRefresh())
		} else if (examinationQuestion == -1) {
      dispatch({type:LOADING_END})
    } else {
      dispatch({
        type: STUDY_COURSEDETAIL_GET_EXAM_QUESTIONS_SUCCESS,
        payload: examinationQuestion,
      })
      dispatch({type:LOADING_END})
      Actions.CourseExam({
        course_id,
        cert_id,
        progress_id,
        product_id,
      })
    }
	}
}
//选择答案
export function chooseItem(id, type, examNum) {
	const switchVal = {
		item_a: 0,
		item_b: 1,
		item_c: 2,
		item_d: 3,
		item_e: 4,
		item_f: 5,
	}
	return {
		type: STUDY_COURSEDETAIL_CHOOSE_EXAM_QUESTIONS,
		payload: { id: switchVal[id], type, examNum }
	}
}
//提交答案
export function saveTest(course_id,progress_id,cert_id,question_data,product_id) {
	return async (dispatch) => {
	  dispatch(resetQuestion())
	  dispatch({type:LOADING_START})
		let testResult = await post('mv1/user/index/save-test-result',{ course_id, progress_id, cert_id, question_data, product_id, version:'1.0.3'})
		dispatch({
			type: STUDY_COURSEDETAIL_SAVE_EXAM_QUESTIONS_SUCCESS,
			payload: testResult,
		})
    dispatch({type:LOADING_END})
	}
}
//返回详情页面并刷新
export function backAndRefresh() {
	return {
		type: STUDY_COURSEDETAIL_BACK_AND_REFRESH,
	}
}

//上一题
export function previousQuestion() {
  return {
    type: STUDY_EXAM_PREV_QUESTION
  }
}
//下一题
export function nextQuestion() {
  return {
    type: STUDY_EXAM_NEXT_QUESTION
  }
}
//重置题目
export function resetQuestion() {
  return {
    type: STUDY_EXAM_RESET_QUESTION
  }
}
//不刷新列表
export function refreshFalse() {
  return {
    type:  REFRESH_FALSE
  }
}
//刷新列表
export function refreshList() {
  return {
    type:  COURSE_LIST_REFRESH_TRUE
  }
}
