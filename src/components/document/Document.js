
/**
 * Created by zhaolong on 2017/05/03.
 * File description:智库
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

export default class Document extends React.Component{
    state={
        extension0:require('../../static/images/icon/icon_doc.png'),
        extension1:require('../../static/images/icon/icon_docx.png'),
        extension2:require('../../static/images/icon/icon_et.png'),
        extension3:require('../../static/images/icon/icon_pdf.png'),
        extension4:require('../../static/images/icon/icon_pot.png'),
        extension5:require('../../static/images/icon/icon_pps.png'),
        extension6:require('../../static/images/icon/icon_ppt.png'),
        extension7:require('../../static/images/icon/icon_pptx.png'),
        extension8:require('../../static/images/icon/icon_rtf.png'),
        extension9:require('../../static/images/icon/icon_txt.png'),
        extension10:require('../../static/images/icon/icon_wps.png'),
        extension11:require('../../static/images/icon/icon_xls.png'),
        extension12:require('../../static/images/icon/icon_xlsx.png'),
    }
    render(){
        return(
            <View style={styles.container}>
            {this.props.list.map((value,index) => {
                return <View style={styles.coursecontainer} key={"list"+index}>
                        <TouchableWithoutFeedback onPress={()=>Actions.XZWebView({title:value.title,url:glo_url+'/papers/'+value.id})}>
                            <View style={styles.view}>
                            {(()=>{
                                switch (value.extension) {
                                    case 'doc':
                                    {
                                        return <Image source={this.state.extension0} style={styles.thumb}/>
                                    }break;
                                    case 'docx':
                                    {
                                        return <Image source={this.state.extension1} style={styles.thumb}/>
                                    }break;
                                    case 'et':
                                    {
                                        return <Image source={this.state.extension2} style={styles.thumb}/>
                                    }break;
                                    case 'pdf':
                                    {
                                        return <Image source={this.state.extension3} style={styles.thumb}/>
                                    }break;
                                    case 'pot':
                                    {
                                        return <Image source={this.state.extension4} style={styles.thumb}/>
                                    }break;
                                    case 'pps':
                                    {
                                        return <Image source={this.state.extension5} style={styles.thumb}/>
                                    }break;
                                    case 'ppt':
                                    {
                                        return <Image source={this.state.extension6} style={styles.thumb}/>
                                    }break;
                                    case 'pptx':
                                    {
                                        return <Image source={this.state.extension7} style={styles.thumb}/>
                                    }break;
                                    case 'rtf':
                                    {
                                        return <Image source={this.state.extension8} style={styles.thumb}/>
                                    }break;
                                    case 'txt':
                                    {
                                        return <Image source={this.state.extension9} style={styles.thumb}/>
                                    }break;
                                    case 'wps':
                                    {
                                        return <Image source={this.state.extension10} style={styles.thumb}/>
                                    }break;
                                    case 'xls':
                                    {
                                        return <Image source={this.state.extension11} style={styles.thumb}/>
                                    }break;
                                    case 'xlsx':
                                    {
                                        return <Image source={this.state.extension12} style={styles.thumb}/>
                                    }break;
                                    default:
                                    {
                                        return <Image source={this.state.extension3} style={styles.thumb}/>
                                    }
                                }
                            })()}

                                <View style={styles.rightContainer}>
                                    <Text style={styles.coursetitle} numberOfLines={1}>{value.title}</Text>
                                    <View style={styles.info}>
                                        <Text style={styles.learnnum}>{value.view_count}人阅读</Text>
                                        <Text style={styles.add_time}>上传时间:{value.add_time}</Text>
                                    </View>
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
        paddingBottom:20,
    },
    coursecontainer:{
        paddingBottom:10,
        backgroundColor:'#FFFFFF',
    },
    view:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
		marginLeft:10,
        borderBottomWidth:1,
        borderColor:'#ECECEC',
    },
    thumb:{
        width: 45,
        height: 60,
    },
    rightContainer: {
       height:70,
       flex: 1,
       marginLeft:10,

    },
    coursetitle: {
      fontSize: 15,
      color:'#333333',
    },
    info:{
        flexDirection: 'row',
        paddingTop:25,
    },
    learnnum: {
        fontSize:12,
        color:'#000',
        paddingBottom:5,
    },
    add_time:{
        marginLeft:10,
        fontSize:12,
        color:'#ababab'
    }
});
