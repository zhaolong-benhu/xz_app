/**
 * Created by qzy on 05/04/2017.
 * File description:
 */
import React, {Component,} from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {Scene, Router, Actions} from 'react-native-router-flux';
import {global_width, global_height} from '../../util/screen'
import CheckBox from 'react-native-checkbox';
import { ExamRightIndicator,renderIf, Loading }  from '../../components'
import {Container, Content, Button, Text} from 'native-base';
import { connect } from 'react-redux';
import { chooseItem, saveTest, previousQuestion, nextQuestion} from '../../actions'

class CourseExam extends Component {
  componentWillReceiveProps(props) {
    // console.log(props)
  }
//获得用户所有回答
  getAllAnswer() {
    let allAnswer = {}
    this.props.examQuestions.map(question => {
      const val = question.myAnswer.join(',')
      const key = question.id
      allAnswer[key] = val
    })
    return allAnswer;
  }
  render() {
    if(this.props.examQuestions && this.props.loading === false) {
      console.log(this.props)
      const { total, examQuestions, cert_id, course_id, progress_id, nowQuestionNum, product_id} = this.props
      const keys = ['item_a','item_b','item_c','item_d','item_e','item_f']
      return (
          <View style={styles.wrapper}>
          <ScrollView >
            <ExamRightIndicator examNum={nowQuestionNum} total={total} />
            <View style={styles.innerWrapper}>
              <View style={styles.textWrapper}>
                <Text style={styles.text}>
                  {examQuestions[nowQuestionNum].title}
                </Text>
                <Text>
                  {examQuestions[nowQuestionNum].type == 1 ?"单选题": "多选题"}
                </Text>
              </View>
              {
                keys.map( (key, index) => {
                  return (
                      renderIf(examQuestions[nowQuestionNum][key],
                          <CheckBox
                              label={examQuestions[nowQuestionNum][key]}
                              checked={new Set(examQuestions[nowQuestionNum].myAnswer).has(index + 1)}
                              onChange={ () => this.props.chooseItem(key, examQuestions[nowQuestionNum].type, nowQuestionNum) }
                              checkedImage={
                                examQuestions[nowQuestionNum].type == 1 ?
                                    require('../../static/images/study/Checked.png') :
                                    require('../../static/images/study/sqc.png')
                              }
                              uncheckedImage={
                                examQuestions[nowQuestionNum].type == 2 ?
                                    require('../../static/images/study/squc.png'):
                                    require('../../static/images/study/Unchecked.png')
                              }
                              checkboxStyle={styles.checkboxStyle}
                              labelStyle={styles.labelStyle}
                              containerStyle={styles.containerStyle}
                              key={key}
                              labelLines={2}
                          />
                      )
                  )
                })
              }
            </View>
            {
              nowQuestionNum != 0 ?
                  <Button
                      onPress={() => this.props.previousQuestion()}
                      style={styles.btn}
                  >
                    <Text>上一题</Text>
                  </Button>
                  : null
            }
            {
              nowQuestionNum === total -1 ?
                  <Button
                      onPress={() => {
                        Actions.ExamResult()
                        const allAnswer = this.getAllAnswer()
                        this.props.saveTest(
                            course_id,
                            progress_id,
                            cert_id,
                            allAnswer,
                            product_id,
                        )
                      }}
                      disabled={ !examQuestions[nowQuestionNum].myAnswer.length > 0}
                      style={styles.btn}
                  >
                    <Text>提交</Text>
                  </Button> :
                  <Button
                      onPress={() =>
                          this.props.nextQuestion()
                          // Actions.CourseExam({
                          //   examNum: this.props.examNum + 1,
                          //   cert_id,
                          //   course_id,
                          //   progress_id
                          // })
                      }
                      disabled={ !examQuestions[nowQuestionNum].myAnswer.length > 0}
                      style={styles.btn}
                  >
                    <Text>下一题</Text>
                  </Button>
            }
          </ScrollView>
          </View>
      );
    } else {
      return (
          <Loading />
      )
    }
  }
}

const mapStateToProps = ({ exam, common }) => {
  return {
    examQuestions: exam.examQuestions,
    total: exam.total,
    loading:common.loading,
    nowQuestionNum:exam.nowQuestionNum,
  }
}


const styles = {
  checkboxStyle:{width: 18, height: 18},
  labelStyle:{fontSize: 14, color: '#333'},
  textWrapper:{ marginBottom: 28},
  containerStyle:{marginBottom: 20,},
  text:{fontSize: 18,marginBottom: 10,},
  innerWrapper:{marginVertical: 20, paddingHorizontal: global_width * 0.05, },
  wrapper:{paddingTop:64},
  btn:{
    borderRadius: 4,
    width: global_width * 0.9,
    justifyContent: 'center',
    marginLeft: global_width * 0.05,
    marginBottom:20,
  }
}

export default connect(mapStateToProps, { chooseItem, saveTest, previousQuestion, nextQuestion,})(CourseExam)
