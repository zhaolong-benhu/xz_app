/**
 * Created by zhaolong on 2017/10/18.
 * File description:课件
 */

'use strict'

import React,{Component} from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    ToastAndroid,
}from 'react-native';
import ResponsiveImage from "react-native-responsive-image";
import {global_width,global_height} from "../../util/screen";
import {Tips,Alert} from '../../components';

export default class Courseware extends Component {

    constructor(props) {
        super(props);
    }
    render(){
        var pptList = this.props.data;
        return(
                <View>
                    {pptList && pptList.livePpt && pptList.livePpt.length>0?
                            <ScrollView style={styles.container}>
                                <View>
                                    {pptList.livePpt.map((v,i)=>{
                                            return <View style={styles.list} key={i}>
                                                 <ResponsiveImage source={{uri:v}} style={styles.img} resizeMode={"cover"}/>
                                            </View>
                                        })
                                    }
                                </View>
                            </ScrollView>
                        :
                        <Tips text="很抱歉，该主播暂时还未上传课件~"/>
                     }
                </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    list:{
      width:global_width,
      height:200,
      paddingTop:5,
      paddingLeft:5,
      paddingRight:5,
      backgroundColor:'#FFFFFF',
    },
    img:{
      width:global_width-10,
      height:190,
    },
})
