/**
 * Created by qzy on 04/05/2017.
 * File description:
 */

import React, {Component, PropTypes,} from 'react';
import {
	View,
	ScrollView,
	StatusBar,
	Modal,
	StyleSheet,
	TouchableHighlight,
	Text,
	TextInput
} from 'react-native';
import {global_width, global_height} from '../../util/screen'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StarRating from 'react-native-star-rating';
import {Actions} from 'react-native-router-flux';
import {Alert} from '../../components'
import {post} from '../../helpers/helpers'
class ToolBar extends Component {
	reGetDetail = () => {
		this.props.scrollTo()
		this.props.toggleProgress()
	}
	render() {

		return (
			<View style={{flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#eee'}}>
				<TouchableHighlight style={styles.tool} underlayColor={'rgba(255,255,255,0.4)'} onPress={ () => {
					this.props.scrollTo()
					this.props.toggleCategory()
				}}>
					<View style={styles.wrapper}>
						<Text style={ this.props.categoryState ? styles.blue : styles.normal }>
							{this.props.choosedCategoryName ? this.props.choosedCategoryName : '分类'}
						</Text>
						<Ionicons
							name={this.props.categoryState ? "ios-arrow-up" : "ios-arrow-down"}
	            color={this.props.categoryState ? "#157eda" : "#aaa"}
							size={16}
							style={{marginLeft: 4,}}
						/>
					</View>
				</TouchableHighlight>

				<TouchableHighlight
					underlayColor={'rgba(255,255,255,0.4)'}
					style={styles.tool}
					onPress={ this.reGetDetail }>
					<View style={styles.wrapper}>
						<Text style={this.props.progressState ? styles.blue : styles.normal}>
							{this.props.choosedProgressName ? this.props.choosedProgressName : '默认'}
						</Text>
					</View>
				</TouchableHighlight>
			</View>
		)
	}
}
const styles = StyleSheet.create({
	tool: {
		flex: 1,
		alignItems: 'center',
		height: 44,
		justifyContent: 'center',
		borderRightColor: '#eee',
		borderRightWidth: 1
	},
	wrapper: {
		flexDirection: 'row'
	},
	blue: {
		fontSize: 15,
		color: '#157eda',
	},
	normal: {
		fontSize: 15,
		color: '#666',
	},
})
export default ToolBar;