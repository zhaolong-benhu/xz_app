/**
 * Created by qzy on 01/04/2017.
 * File description:
 */
import React, {Component, PropTypes,} from 'react';
import {
	View,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text
} from 'react-native';
import {Container, Button} from 'native-base';
import {global_width } from '../../util/screen';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { renderIf, Loading } from '../../components'
import {backAndRefresh, refreshList} from '../../actions';
class ExamResult extends Component {
	render() {
		if(!this.props.loading) {
			const {course_title, test_time, score, test_right, test_error, test_result} = this.props.examResult
			return (
				<Container style={{paddingTop: 64, paddingBottom: 50}}>

					<View style={styles.titleWrapper}>
						<Text style={styles.title}>{course_title}</Text>
						<Text style={styles.info}>测试时间: {test_time}</Text>
						<Text style={styles.info}>正确：{test_right}题 | 错误：{test_error}题 | 得分：{score}分</Text>
					</View>

					<View style={styles.resultWrapper}>
						<Text style={styles.resultTitle}>答题卡</Text>
						<View style={styles.resultContainer}>
							{
								test_result && this.props.examQuestions && this.props.examQuestions.map((item, index) =>
									<View style={[styles.round, test_result[item.id].is_right == 1 ? styles.green : '']} key={index}>
										<Text style={styles.resultText}>{index + 1}</Text>
									</View>)
							}
						</View>
					</View>

					{/*<Button onPress={() => Actions.ExamResult()} disabled={ this.props.scores < 6 } style={{*/}
						{/*borderRadius: 4,*/}
						{/*position: 'absolute',*/}
						{/*bottom: 90,*/}
						{/*width: global_width * 0.4,*/}
						{/*justifyContent: 'center',*/}
						{/*marginLeft: global_width * 0.05*/}
					{/*}}>*/}
						{/*<Text style={styles.text}>测试结果</Text>*/}
					{/*</Button>*/}
					<Button onPress={() => {
	            this.props.backAndRefresh()
	            this.props.refreshList()
							Actions.popTo('CourseDetail')
	          } }  style={{
							borderRadius: 4,
							position: 'absolute',
							bottom: 40,
							width: global_width * 0.9,
							justifyContent: 'center',
							marginLeft: global_width * 0.05
						}}>
							<Text style={styles.text}>返回</Text>
						</Button>
				</Container>
			);
		}else{
			return <Loading />
		}
	}
}
const styles = StyleSheet.create({
	titleWrapper: {backgroundColor: '#ebf4fd', paddingHorizontal: 9, paddingVertical: 15},
	title: {color: '#333', fontSize: 18, marginBottom: 13},
	info: {color: '#666', fontSize: 12, marginBottom: 9},
	round: {
		width: 51,
		height: 51,
		backgroundColor: '#f24a4c',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 40,
		marginHorizontal: 8,
		marginVertical: 8,
	},
	green: {
		backgroundColor: '#7fcb54',
	},
	text: {color: '#fff', fontSize: 18},
	resultText: {color: '#fff', fontSize: 28},
	resultWrapper: {paddingHorizontal: 9, paddingVertical: 15},
	resultTitle: {color: '#333', fontSize: 18, marginBottom: 13},
	resultContainer: {flexDirection: 'row', flexWrap: 'wrap'},
})

const mapStateToProps = ({ examResult, common ,exam }) => {
	return {
		examResult: examResult,
		examQuestions: exam.examQuestions,
    loading:common.loading,
	}
}

export default connect(mapStateToProps,{backAndRefresh, refreshList})(ExamResult)
