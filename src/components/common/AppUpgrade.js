/**
 * Created by zhaolong on 2017/12/15.
 * File description:App提醒用户升级
 */

'use strict'
import React ,{Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    TouchableWithoutFeedback,
    TouchableNativeFeedback,//仅限安卓平台
    Linking
} from 'react-native';
import {global_width, global_height,platform} from '../../util';
import {Actions} from "react-native-router-flux";
import ResponsiveImage from "react-native-responsive-image";

export default class AppUpgrade extends Component{
    state={
        bg:require('../../static/images/live/rocket.png'),
        close_icon:require('../../static/images/live/close.png'),
    }
    goDownloadPage(){
        this.props.onClose();
        setTimeout(()=>{
            Linking.openURL(this.props.url);
        },100);
    }
    render(){
        return(
          <View style={styles.container}>
                <View style={platform === "android" ? styles.card_android : styles.card}>
                    <TouchableOpacity onPress={()=>this.props.onClose()}>
                        <ResponsiveImage source={this.state.bg} style={styles.rocket}/>
                    </TouchableOpacity>

                    {/* <TouchableOpacity style={styles.close} onPress={()=>this.props.onClose()}>
                        <Image source={this.state.close_icon} style={styles.close_icon}/>
                    </TouchableOpacity> */}
                </View>
                <View style={styles.box}>
                    <Text style={styles.title}>新版本上线</Text>
                    {this.props.content.map((v,i)=>{
                        return <Text style={styles.updateText} key={i}>{v}</Text>
                    })}
                    <TouchableOpacity style={styles.btn} onPress={()=>this.goDownloadPage()}>
                        <Text style={styles.btnText}>立即更新</Text>
                    </TouchableOpacity>
                </View>
          </View>
        )
    }
}

var styles = StyleSheet.create({
    container:{
        position:'absolute',
        zIndex:9999,
        backgroundColor:'rgba(0,0,0,0.7)',
        width:global_width,
        height:global_height,
        top:0,
        left:0,
        justifyContent:'center',
    },
    card:{
        width:global_width*0.8+20,
        marginLeft:global_width*0.1-10,
        backgroundColor:'rgba(0,0,0,0)',
        zIndex:999999,
    },
    card_android:{
        width:global_width*0.8+20,
        marginLeft:global_width*0.1-10,
        backgroundColor:'rgba(0,0,0,0)',
        zIndex:999999,
        marginTop:-35,
    },
    rocket:{
        width:global_width*0.8+20,
        height:230,
    },
    close:{
        position:'absolute',
        top:17,
        right:0,
    },
    close_icon:{
        width:36,
        height:36,
    },
    box:{
        width:global_width*0.8+20,
        // height:250,
        backgroundColor:'#fff',
        borderRadius:10,
        marginTop:-30,
        marginLeft:global_width*0.1-10,
        paddingHorizontal:10,
    },
    title:{
        marginTop:40,
        justifyContent:'center',
        textAlign:'center',
        fontSize:16,
    },
    updateText:{
        marginTop:5,
        justifyContent:'center',
        marginLeft:30,
        fontSize:13,
    },
    btn:{
        width:global_width*0.3,
        marginLeft:(global_width*0.8-global_width*0.3)/2,
        height:30,
        marginTop:15,
        marginBottom:15,
        backgroundColor:'#84ccff',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:15,
    },
    btnText:{
        color:'#fff',
        fontSize:14,
    }

})
