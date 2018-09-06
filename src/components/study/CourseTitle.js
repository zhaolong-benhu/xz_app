/**
 * Created by qzy on 05/04/2017.
 * File description:课程标题
 */

import React from 'react';
import {
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { global_width } from '../../util/screen'

const CourseTitle = ({name,course_info,percent}) =>
	<View style={styles.wrapper}>
		<View style={{width: global_width*0.75}}>
			<Text style={styles.title}>{name}</Text>
			<Text style={styles.subTitle}>学习课程 --> 考试 --> 考试成绩</Text>
		</View>
		<View style={styles.round}>
			<Text style={styles.percent}>{percent}%</Text>
		</View>
	</View>

const styles = StyleSheet.create({
	wrapper: {
		marginTop:4,
		flexDirection: 'row',
		paddingHorizontal: 8,
		justifyContent: 'space-between',
		minHeight: 75,
		borderBottomWidth: 10,
		borderBottomColor: '#eee',
		alignItems: 'center'
	},
	title: {fontSize: 16, color: '#333', marginBottom: 8},
	subTitle: {fontSize: 12, color: '#ababab',},
	round: {
		borderWidth: 2,
		borderColor: '#add8fd',
		borderRadius: 100,
		justifyContent: 'center',
		width: 40,
		height: 40,
		alignItems: 'center'
	},
	percent: {fontSize: 12, color: '#167fda'}
});

export default CourseTitle
