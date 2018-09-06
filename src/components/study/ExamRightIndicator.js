/**
 * Created by qzy on 06/04/2017.
 * File description:右侧按钮
 */
import React, {Component,} from 'react';
import {
	View,
	ScrollView,
	StatusBar,
	Text
} from 'react-native';

class ExamRightIndicator extends Component {
	static defaultProps = {};

	render() {
		return (
			<View style={{flexDirection:'row',alignItems:'flex-end',justifyContent:'flex-end',marginTop:4,marginRight:8}}>
				<Text style={{color:'#f24a4c',fontSize:14}}>{this.props.examNum + 1}</Text>
				<Text style={{color:'#ababab',fontSize:12}}>/{this.props.total}</Text>
			</View>
		);
	}
}

export default ExamRightIndicator
