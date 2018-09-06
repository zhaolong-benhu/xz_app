
/**
 * Created by zhaolong on 2017/05/03.
 * File description:导师
 */

'use strict'
import React ,{
    Component
} from "react";

import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableWithoutFeedback
} from 'react-native';
import {global_width,global_height} from '../../util/screen';
import {Scene, Router, Actions} from 'react-native-router-flux';
import {glo_url} from '../../api/global';

export default class Tutor extends React.Component{
    state={
        default_thumb:require('../../static/images/study/course_defaultbg.jpg'),
    }
    render(){
        return(
            <View style={styles.container}>
            {this.props.list.map((value,index) => {
                return <View style={styles.coursecontainer} key={"list"+index}>
                        <TouchableWithoutFeedback onPress={()=>Actions.XZWebView({title:value.name,url:glo_url+'/neixun/'+value.id})}>
                            <View style={styles.view}>
                                {(()=>{
                                    if(value.thumb && value.thumb != ""){
                                        return <Image source={{uri:value.thumb}} style={styles.thumb}/>
                                    }else {
                                        return <Image source={this.state.default_thumb} style={styles.thumb}/>
                                    }
                                })()}
                                <View style={styles.rightContainer}>
                                    <Text style={styles.coursetitle} numberOfLines={1}>{value.name}</Text>
                                    <Text style={styles.learnnum} numberOfLines={3}>{value.description}人感兴趣</Text>
                              </View>
                            </View>
                        </TouchableWithoutFeedback>
                </View>
            })}
            </View>
        )
    }
}
var styles = StyleSheet.create({
    container:{
        paddingBottom:20
    },
    coursecontainer:{
        paddingBottom:10,
        backgroundColor:'#FFFFFF'
    },
    view:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
		marginLeft:10
    },
    thumb:{
        width: 100,
        height: 70
    },
    rightContainer: {
       height:70,
       flex: 1,
       marginLeft:10,
       borderBottomWidth:1,
       borderColor:'#ECECEC'
    },
    coursetitle: {
      fontSize: 15,
      color:'#333333'
    },
    learnnum: {
        fontSize:12,
        color:'#ABABAB',
        paddingTop:5,
        paddingBottom:5
    },
    real_price:{
        color:'red',
        fontSize:15
    }
});
