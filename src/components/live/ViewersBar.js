/**
 * Created by qzy on 26/03/2017.
 * File description:在线用户头像列表和人数
 */
import React, {Component, PropTypes,} from 'react';
import {
	StyleSheet,
	View,
	Image,
	Button,
	Text,
	TouchableWithoutFeedback,
	TouchableHighlight,
	ListView,
	ScrollView,
} from 'react-native';
import { Avatar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import InvertibleScrollView from 'react-native-invertible-scroll-view';
const styles = StyleSheet.create({
  container:{flexDirection: 'row',},
	avatar: {width: 35, height: 35,borderRadius:20},
	wrapper: {flexDirection: 'row', alignItems: 'center', flex: 1, marginLeft: 6, },
	scrollView: {flexDirection: 'row', overflow: 'hidden',},
	viewer: {
		minWidth: 40,
		height: 20,
		backgroundColor: 'rgba(0,0,0,0.5)',
		flexDirection: 'row',
		paddingHorizontal: 8,
		paddingVertical: 5,
		borderRadius: 20,
		marginLeft: 10
	},
	textWrapper: {alignSelf: 'center'},
	text: {color: 'white', marginLeft: 4, alignSelf: 'center'}
})

class ViewersBar extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			dataSource: new ListView.DataSource({
				rowHasChanged: (r1, r2) => r1 !== r2,
			}),
		};
	}
	componentWillMount() {
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(this.props.userIcons, this.props.userIcons.map((row, index) => index)),
		});
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(nextProps.userIcons, nextProps.userIcons.map((row, index) => index)),
		});
	}

	_renderRow(row) {
		return (
			<View style={{borderRadius: 20,width: 35, height: 35,marginHorizontal: 2, overflow:'hidden'}}>
				<Image source={{ uri: row }} style={styles.avatar}/>
			</View>
		)
	}

	render() {
		return (
			<View style={styles.wrapper}>
				<ScrollView style={styles.scrollView} horizontal={true} keyboardShouldPersistTaps={true}>
					<ListView
						renderScrollComponent={props => <InvertibleScrollView {...props} inverted/>}
						dataSource={this.state.dataSource}
						renderRow={this._renderRow.bind(this)}
						style={styles.container}
						enableEmptySections={true}
            horizontal={true}
						showsHorizontalScollIndicator={true}
					/>
				</ScrollView>

				<View style={styles.viewer}>
					<Icon name="user" size={14} color="#fff" style={styles.textWrapper}/>
					<Text style={styles.text}>{this.props.MemberNum}</Text>
				</View>
			</View>
		);
	}
}

export default ViewersBar
