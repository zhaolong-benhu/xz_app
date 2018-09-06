/**
 * Created by zhaolong on 2017/03/21.
 * File description:菜单分类遮罩层
 */

'use strict'
import React ,{
    Component
} from "react";

import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';
import {global_width,global_height} from '../../util/screen'

export default class Mask extends Component{

    render(){
        return(
            <View style={styles.containter}>
                <Text  style={styles.containter} onPress={()=>this.props.callbackParent()}></Text>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    containter:{
        backgroundColor:'#666666',
        width:global_width,
        height:global_height,
        position:'absolute',
        top:40,
        opacity:0.8,
    },
    text:{
        width:global_width,
        height:global_height,
    }
})
