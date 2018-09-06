/**
 * Created by qzy on 04/05/2017.
 * File description:评论弹窗
 */
import React, {Component,} from 'react';
import {
	View,
	Modal,
	StyleSheet,
	TouchableHighlight,
  TouchableWithoutFeedback,
	Text,
	TextInput
} from 'react-native';
import StarRating from 'react-native-star-rating';
import {Actions} from 'react-native-router-flux';
import {global_width}  from '../../util/screen'
import {Alert} from '../../components'
import {post} from '../../helpers/helpers'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
class ReviewModal extends Component {
	addScore = async () => {
		const {star, description, editable} = this.props.review
		if (star && description) {
			Actions.refresh({openScore: false})
			//类型整理
			if (editable) {
				let type = 0;
				if (this.props._type === 5) {
					type = 1
				}
				if (this.props._type === 1 || this.props._type === 4) {
					type = 2
				}
				if (this.props._type === 6) {
					type = 3
				}
				await post('mv1/user/reviews/add', {
					star,
					description,
					type,
					id: this.props.course_id || this.props.product_id,
					resource_name: this.props.course.name,
				})
			}
		} else {
			Alert('请输入评价')
		}
	}
	changeStar = (rating) => this.props.addReview({rating, editable: true, description: this.props.review.description})
	changeText = (description) => this.props.addReview({rating: this.props.review.star, editable: true, description})

	render() {
		return (
			<Modal
				transparent={true}
				visible={this.props.modalVisible}
				animationType={"fade"}
			  onRequestClose={()=>{}}
			>
				<View style={styles.wrapper}>

					<View style={styles.innerWrapper}>
            <TouchableWithoutFeedback onPress={()=>{this.props.close()}}>
              <Icon name="close" size={28} color="#aaa" style={{backgroundColor: 'transparent',alignSelf:'flex-end'}} />
            </TouchableWithoutFeedback>
						<View style={{padding: 20}}>
							<StarRating
								disabled={!this.props.review.editable}
								maxStars={5}
								rating={parseInt(this.props.review.star)}
								selectedStar={this.changeStar}
								starColor={'gold'}
								starSize={30}
							/>
							<Text style={{textAlign: 'center', marginTop: 15}}>
								{
									this.props.review.star === 1 ? "非常不满意" :
										this.props.review.star === 2 ? "不满意" :
											this.props.review.star === 3 ? "一般" :
												this.props.review.star === 4 ? "满意" :
													this.props.review.star === 5 ? "非常满意" : null
								}
							</Text>
						</View>
						<TextInput
							editable={this.props.review.editable}
							multiline={true}
							style={styles.textInput}
							underlineColorAndroid="transparent"
							autoCapitalize='none'
							placeholder="请写下您的评价，限200字"
							maxLength={200}
							value={this.props.review.description}
              blurOnSubmit={true}
							onChangeText={this.changeText}
						/>
						<TouchableHighlight
							underlayColor="#a9d9d4"
							onPress={this.addScore}
						  style={{alignItems:'center',justifyContent:'center',height:45,}}
						>
							<Text style={styles.title}>确定</Text>
						</TouchableHighlight>
					</View>
				</View>
			</Modal>
		)
	}
}
const styles = StyleSheet.create({
	innerWrapper: {backgroundColor: 'rgb(255,255,255)', borderRadius: 6, width: global_width * 0.85, paddingTop:0,},
	wrapper: {backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', flex: 1,},
	icon: {position: 'absolute', right: 6, top: 6},
	title: {textAlign: 'center', fontSize: 18, color: '#157eda'},
	textInput: {textAlignVertical: 'top', height: 120, backgroundColor: '#eee', padding: 10, fontSize: 16},
	item: {width: 128, height: 79, margin: 8}
})
export default ReviewModal;
