/**
 * Created by zhaolong on 2017/03/30.
 * File description:个人中心-个人设置-修改昵称
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
    BackAndroid,
    TextInput,
    ToastAndroid,
    TouchableWithoutFeedback,
    TouchableOpacity,
    NativeModules,
    StatusBar,
} from 'react-native';
// const ImagePicker = NativeModules.ImageCropPicker;
import ImagePicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';
import { connect } from 'react-redux';
import {api_feedback} from '../../api/global';
import {Scene, Router,Actions} from 'react-native-router-flux';
import {global_width,global_height} from '../../util/screen';
import {Alert} from '../../components';
import {fetchFeedback} from '../../actions/UserInfo';

class Feedback extends Component{
    state={
        strFeedback:"",
        deleteImg:require('../../static/images/user/deleteImg.png'),
        choiceImg:require('../../static/images/user/choicephoto.png'),
        image: null,
        images: null,
        base64: null,
        inputText:'',
        inputValue:'',
    }
    constructor(props){
        super(props);
        this.inputText="";
        //监听安卓返回键
        BackAndroid.addEventListener('hardwareBackPress', function() {
          Actions.pop();
          return true;
        });
    }

    //提交
    CommitFeedback(){
        if(this.state.inputValue.length == 0){
            Alert("反馈意见内容不能为空！");
        }else {
            this._convertImageToBase64(this.state.base64);
        }
    }
    componentWillReceiveProps(nextProps,nextState){
        // if(this.props.feedback != nextProps.feedback){
        //     Alert("提交成功！");
        // }
    }
    //选择手机相册图片
    CDhoicephoto(){
        this.pickSingle(true);
    }
    //删除选择的图片
    DeleteChoicphone(){
        this.setState({image:null});
    }
    //将图片转成base64
    _convertImageToBase64(img) {
        if (!img) {
            this.props.fetchFeedback(this.state.inputValue,null);
            Alert("提交成功！");
            Actions.Me();
            return;
        }
        RNFS.readFile(img, 'base64')
            .then((content) => {
                // content 为base64数据
                // this.fetchData(api_feedback,content);
                var pic = "data:image/jpeg;base64,"+content;
                this.props.fetchFeedback(this.state.inputValue,pic);
                Alert("提交成功！");
                Actions.Me();
            })
            .catch((err) => {
                console.log("reading error: " + err);
            });
    }
    renderDeleteicon(){
        return <TouchableWithoutFeedback onPress={()=>this.DeleteChoicphone()}>
            <Image style={styles.deleteImg} source={this.state.deleteImg} />
        </TouchableWithoutFeedback>
    }
    renderImage(image) {
      return <Image style={styles.imgone} source={image} />
    }
    renderAsset(image) {
      return this.renderImage(image);
    }
    //选择相册
    pickSingle(cropit, circular=false) {
      ImagePicker.openPicker({
        width: 500,
        height: 500,
        cropping: cropit,
        cropperCircleOverlay: circular,
        compressImageMaxWidth: 640,
        compressImageMaxHeight: 480,
        compressImageQuality: 0.5,
        compressVideoPreset: 'MediumQuality',
      }).then(image => {
        console.log('received image', image);
        this.setState({
          image: {uri: image.path, width: image.width, height: image.height, mime: image.mime},
          images: null
        });
        //将图片转成base64
        // this._convertImageToBase64(image.path);
        this.setState({base64:image.path});
      }).catch(e => {
        console.log(e);
        Alert(e.message ? e.message : e);
      });
    }

    OnSearchBoxChanged(text){
        this.setState({inputValue:text});
        this.inputText = text;
        if(this.inputText.length>200)//限制反馈内容字数超过200个字
        {
            var str = this.inputText.substr(0,200);
            this.setState({inputValue:str});
       }
    }
    render(){
        var str = '<';
        return(
            <View style={styles.containter}>
                <StatusBar barStyle='dark-content'/>
                <View style={styles.info}>
                    <TextInput style={styles.searchBox}
                     ref="searchText"
                     multiline={true}
                     autoFocus={true}
                     numberOfLines = {4}
                     placeholder="请输入内容......"
                     value={this.state.inputValue}
                     underlineColorAndroid = {'transparent'}
                     onChangeText={
                       (text) => {
                         this.setState({strFeedback:text,inputValue:text});
                         this.OnSearchBoxChanged(text)
                       }
                     }
                     clearButtonMode='always'
                     />
                    <View style={styles.photos}>
                        <View style={styles.photolist}>
                            {/* <Image style={styles.imgone} source={{uri:'http://p0.qhmsg.com/dr/220__/t01293a36b20308ac12.jpg'}}/> */}
                            {/* <Image style={styles.deleteImg} source={this.state.deleteImg}/> */}
                            {this.state.image ? this.renderAsset(this.state.image) : null}
                            {this.state.image ? this.renderDeleteicon() : null}
                        </View>
                    </View>
                    <TouchableWithoutFeedback onPress={()=>this.CDhoicephoto()}>
                        <Image style={styles.choicephoto} source={this.state.choiceImg}/>
                    </TouchableWithoutFeedback>
                </View>
                <TouchableOpacity style={styles.save}  onPress={()=>this.CommitFeedback()}>
                    <View style={styles.saveText}>
                        <Text style={styles.text}>提交</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = ({userInfo}) => {
	return {
        feedback:userInfo.feedback,
	}
}

export default connect(mapStateToProps, { fetchFeedback })(Feedback)

var styles = StyleSheet.create({
    containter:{
        backgroundColor:'#EEEEEE',
        width:global_width,
        height:global_height,
        position:'absolute',
        top:0,
    },
    userHead:{
        position:'absolute',
        right:30,
        width:30,
        height:30,
    },
    info:{
        width:global_width-20,
        height:190,
        backgroundColor:'#FFFFFF',
        borderRadius:5,
        marginLeft:10,
        marginRight:10,
        marginTop:70,
    },
    imgone:{
        width:global_width/5-35,
        height:global_width/5-35,
        marginTop:5,
        resizeMode: 'contain'
    },
    deleteImg:{
        width:15,
        height:15,
        top:0,
        marginLeft:-7,
    },
    img:{
        marginLeft:10,
        width:global_width/5-35,
        height:global_width/5-35,
        marginTop:5,
    },
    searchBox:{
        borderWidth:1,
        borderColor:'#FFFFFF',
        borderRadius:5,
        backgroundColor:'#FFFFFF',
        borderBottomWidth:0,
        marginLeft:10,
        marginRight:10,
        height:90
    },
    photos:{
        marginLeft:10,
        marginTop:10,
        paddingRight:10,
        backgroundColor:'#FFFFFF',
        height:global_width/5,
    },
    photolist:{
        marginTop:0,
        flexDirection:"row",
        backgroundColor:'#FFFFFF',
        borderBottomWidth:1,
        borderColor:'#ECECEC',
        height:global_width/5-25,
    },
    choicephoto:{
        position:'absolute',
        marginTop:152,
        right:10,
        top:8,
        width:18,
        height:18,
    },
    save:{
        backgroundColor:'#157EDA',
        borderRadius:5,
        height:40,
        width:global_width-20,
        marginLeft:10,
        marginRight:10,
        marginTop:25,
    },
    saveText:{
        height:40,
        width:global_width-20,
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    text:{
        color:'#FFFFFF',
        fontSize:16,
    }
})
