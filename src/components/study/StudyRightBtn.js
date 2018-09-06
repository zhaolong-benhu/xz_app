/**
 * Created by qzy on 01/04/2017.
 * File description:
 */
import React, {Component, PropTypes,} from 'react';
import {
	AppRegistry,
	ListView,
	StyleSheet,
	Text,
	TouchableHighlight,
	View,
	Image,
} from 'react-native';
class StudyRightBtn extends Component {
	static propTypes = {};
	static defaultProps = {};

	render() {
		return (
			<View style={styles.head}>
				<Text style={styles.title}>书包</Text>
				<Text style={styles.selectedText} onPress={() => this.OnPressScreen()}>{this.state.selectedText}</Text>
				<Image style={styles.icon} source={this.props.selectedIcon}/>
			</View>
		);
	}
}

const styles = StyleSheet.create({

	})
export default StudyRightBtn
