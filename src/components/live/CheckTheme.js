/**
 * Created by qzy on 27/03/2017.
 * File description:主题选择
 */
import React, {Component,} from 'react';
import {
	StyleSheet,
	View,
	Image,
	Button,
	Text,
	TouchableWithoutFeedback,
	TouchableHighlight,
	TouchableOpacity,
	Dimensions,
	Modal,
} from 'react-native';
import _ from 'lodash';
import CheckBox from 'react-native-checkbox';

const styles = StyleSheet.create({
	wrapper: {marginTop:25},
	innerWrapper:{justifyContent:'flex-start',marginBottom:10},
	labelStyle:{color:'black'},
	checkboxStyle:{width:15,height:15,},
})
class CheckTheme extends Component {

	renderCheck() {
		// const chunked = _.chunk(this.props.theme,3);
		return this.props.theme.map((item, i ) =>{
					return (<View style={{}} key={item.id}>
						<CheckBox
							label={item.theme_name}
							labelStyle={styles.labelStyle}
							checkboxStyle={styles.checkboxStyle}
							uncheckedImage={require('../../static/images/live/check.png')}
							checkedImage={require('../../static/images/live/checked.png')}
							onChange={(checked) => this.props.onCheck( item.id, !checked)}
						/>
					</View>
				)
		})
	}

	render() {
		return (
			<View style={styles.wrapper}>
				{this.renderCheck()}
			</View>
		);
	}
}

export default CheckTheme
