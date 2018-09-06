import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import Swiper from 'react-native-swiper';
import {Actions} from 'react-native-router-flux';
import {global_width,global_height} from '../../util/screen'

export default class NewFeature extends Component {

    render() {
        return (
            <Swiper loop={false}>
                <View style={styles.item}>
                    <Image style={styles.guide} source={{uri:'http://img.zcool.cn/community/01bc5256ab12356ac7256cb0c9b6e3.jpg'}}/>
                </View>
                <View style={styles.item}>
                    <Image style={styles.guide} source={{uri:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1495276849027&di=95744fb3247565897401607f71e6bde9&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F17%2F41%2F08%2F66S58PIC6NY_1024.jpg'}}/>

                </View>
                <View style={styles.item}>
                    <Image style={styles.guide} source={{uri:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1495276849026&di=da453f24270e8e93bd81e010b85dde38&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01926255c9f74d32f8755e66208691.png'}}/>
                </View>
                <TouchableOpacity style={styles.item} onPress={()=>Actions.Home()}>
                <View style={styles.item}>
                    <Image style={styles.guide} source={{uri:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1495276849026&di=ff399d4d4d7167b26fe856402296b308&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01ca90555c698f0000009c5055be80.jpg'}}/>
                    <View style={styles.start}>
                        <Text style={styles.text}>进入云课堂</Text>
                    </View>
                </View>
                </TouchableOpacity>
            </Swiper>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center'
    },
    guide:{
        width:global_width,
        height:global_height,
    },
    start:{
            position:'absolute',
            bottom:60,
            left:(global_width-100)/2,
            height:30,
            width:100,
            backgroundColor:'#369470',
            textAlign:'center',
            color:'#FFFFFF',
    },
    text:{
        textAlign:'center',
        lineHeight:25,
    },
});
