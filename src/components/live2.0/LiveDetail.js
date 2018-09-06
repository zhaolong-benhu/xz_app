/**
 * Created by zhaolong on 2017/10/18.
 * File description:直播详情
 */

'use strict'

import React,{Component} from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
}from 'react-native';
import  {AnchorInformation,LiveIntroduce,LiveRecommend} from '../../components';

export default class LiveDetail extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        const data = this.props.data;
        return(
            <View style={styles.container}>
            {data && data.id ?
                <AnchorInformation data={data} type="1"/>
                :
                null
            }
                {/* <AnchorInformation data={this.props.data} type="1"/> */}
                <LiveIntroduce data={this.props.data}/>
                {/* <LiveRecommend/> */}
            </View>
        )
    }
}

const styles= StyleSheet.create({
    container:{
        flex:1,
    }
})
