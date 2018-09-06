/**
 * Created by zhaolong on 2017/03/21.
 * File description:首页-菜单分类
 */

'use strict'
import React ,{
    Component
} from "react";

import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native';
import {global_width,global_height} from '../../util/screen'

export default class CourseScreen extends Component{

    static defaultProps={
        list:[
            {name:"精品课",style:"styles.text"},
            {name:"专业证书",style:"styles.text"},
            {name:"IHMA证书",style:"styles.text"},
            {name:"线下公开课",style:"styles.text"}
        ]
    };
    render(){
        return(
            <View style={styles.containter}>
                {this.props.list.map((value,index)=>{
                    if(index != 3){
                        return <View style={styles.text} key={'list'+index}>
                          <Text onPress={()=>this.props.callbackParent(index)} style={styles.text3}>{value.name}</Text>
                        </View>
                    }else {
                      return <View style={styles.text2} key={'list'+index}>
                        <Text onPress={()=>this.props.callbackParent(index)} style={styles.text3}>{value.name}</Text>
                      </View>
                        // return <Text key={'list'+index} style={styles.text2} onPress={()=>this.props.callbackParent(index)}>{value.name}</Text>
                    }
                })}
            </View>
        )
    }
}


var styles = StyleSheet.create({
    containter:{
        position:'absolute',
        top: 47,
        width: 106,
        right: 0,
        backgroundColor: '#FFFFFF',
        borderRadius:5,
    },
    text3:{
	    fontSize:16,
	    color:'#333333',
	    textAlign:'center',
    },
    text:{
        width:106,
        borderColor:'#ECECEC',
        borderBottomWidth :1,
        alignSelf :'center',
        alignItems :'center',
        paddingTop:5,
        paddingBottom:5,
    },
    text2:{
        width:106,
        // fontSize:16,
        // color:'#333333',
        alignSelf :'center',
        alignItems :'center',
        // textAlign:'center',
        paddingTop:5,
        paddingBottom:5,
    },

})
