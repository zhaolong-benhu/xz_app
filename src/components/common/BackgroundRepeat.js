/**
 * Created by qzy on 10/04/2017.
 * File description:
 */
import React from 'react';
import {
	View,
	Image,
	Dimensions
} from 'react-native';

export default ({imgWidth, imgHeight, source}) => {
	let images = [],
		winWidth = Dimensions.get('window').width;
		winHeight = Dimensions.get('window').height;
	for ( let j = 0; j < Math.ceil(winHeight / imgHeight); j++) {
		for (let i = 0; i < Math.ceil(winWidth / imgWidth); i++) {
			images.push(
				<Image source={source} key={`${j}+${i}`} />
			)
		}
	}

	return (
		<View style={{flex: 1, flexDirection: 'row',flexWrap:'wrap'}}>
			{
				images.map((img) => img)
			}
		</View>
	)
}
