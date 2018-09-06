/**
 * Created by zhaolong on 2017/10/18.
 * File description:全屏课件
 */

'use strict'

import React,{Component} from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableWithoutFeedback,
    ToastAndroid
}from 'react-native';
import Swiper from 'react-native-swiper';
import ResponsiveImage from "react-native-responsive-image";
import {global_width,global_height} from "../../util/screen";
import {Tips} from "../../components";

export default class FullScreenCourseware extends Component {
    state = {
    }
    static defaultProps = {
    }
    constructor(props) {
        super(props);
    }
    componentDidMount(){
    }
    render(){
        var pptList = this.props.data;
        return(
            <View style={styles.container}>
                {pptList && pptList.livePpt && pptList.livePpt.length>0?
                    <Swiper
                     height={global_width}
                     width={global_height+10}
                     dot={<View style={styles.dot}/>}
                     activeDot={<View style={styles.activeDot}/>}
                     paginationStyle={styles.paginationStyle}
                     showsPagination
                     showsButtons
                     >
                    {pptList.livePpt.map((v, i) => {
                            return <TouchableWithoutFeedback key={i}>
                                    <ResponsiveImage source={{uri:v}} style={styles.slide} resizeMode={"cover"}/>
                            </TouchableWithoutFeedback>
                        })}
                    </Swiper>
                    :
                    <Tips text={!this.props.isAnchor ? "主播未上传课件哦~" : "您还未上传课件哦~"}/>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        // flex:1,
        width:global_height+10,
        height:global_width,
        backgroundColor:'#FFFFFF',
    },
    dot: {
        // width:0,
        // height:0,
        backgroundColor: 'rgba(255,255,255,.4)',
        width: 5,
        height: 5,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3
    },
    activeDot: {
        backgroundColor: '#fff',
        width: 5,
        height: 5,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3
    },
    paginationStyle: {
        bottom: 10,
        left: null,
        right: 10
    },
    wrapper: {},
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 180,
        backgroundColor: '#9DD6EB',
        resizeMode: Image.resizeMode.cover,
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },

})
