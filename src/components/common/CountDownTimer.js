/**
 * Created by same on 2017/04/24.
 * File description:倒计时
 */

'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
} from 'react-native';

export default class CountDownTimer extends Component {
    static propTypes = {
        onEnd: React.PropTypes.func,
        onSend: React.PropTypes.func,
        second: React.PropTypes.number,
        start: React.PropTypes.bool
    }
    constructor(props) {
        super(props);
        //默认都是0
        let second = this.props.second || 0;
        this.state = {
            second: second,
            first:true,
            start:false
        }
    }
    componentWillReceiveProps(nextProps){
      if(this.props.start!=nextProps.start){
        if(nextProps.start){
          this._startCountDownTimer();
        }
      }
    }
    componentWillUnmount() {
        this._stopCountDownTimer();   //结束倒计时
    }
    /**
     * 开始倒计时
     * @private
     */
    _startCountDownTimer() {
        this.setState({
            start: true
        })
        const {second} = this.state;
        // console.log("剩余 " + second + "秒");
        this.interval = setInterval(() => {
            if (second != 0) {
                if (this.state.second == 1) {
                    this._endCountDownTimer();
                } else {    //秒不为0
                    this.setState({
                        second: this.state.second - 1
                    });
                }
            } else {
               this._endCountDownTimer();
            }
        }, 1000);
    }

    //倒计时结束调用
    _endCountDownTimer(){
        if (this.props.second != 0 || this.props.second != undefined) {
            this.props.onEnd();
        }
        this.setState({
            first:false,
            start: false,
            second:this.props.second,
        })
        this._stopCountDownTimer();
    }
    /**
     *  页面关闭时,停止倒计时
     */
    componentWillUnmount(){
        this.interval && clearInterval(this.interval);
    }
    _stopCountDownTimer(){
        this.interval && clearInterval(this.interval);
    }
    /**
     *  当传入的数字是一位数,在前面补0,凑足2位
     * @param data    天,时,分,秒
     * @returns {*}
     * @private
     */
    _addNumber(data) {
        if (data != 0 && data != undefined) {
            if (data < 10) {
                return '0' + data;
            }
            return data;
        } else {
            return '00';
        }
    }
    render() {
        return (
            <View style={[styles.container,this.props.style]}>
              {this.state.start ?
                <Text style={[styles.btn, this.props.textTimeStyle]}>
                    {this._addNumber(this.state.second) + '秒重新获取'}
                </Text>
                :
                <TouchableHighlight underlayColor={'rgba(255,255,255,0.4)'} style={[styles.btn,this.props.textBtnStyle]} onPress={()=> this.props.onSend()}>
                  <View>
    							      <Text style={styles.btnText}>{this.state.first? '发送' : '获取'}验证码</Text>
                  </View>
    						</TouchableHighlight>
              }
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
    },
    btnText: {color: '#FAFAFA', fontSize: 12},
  	btn: {backgroundColor: '#fff', paddingHorizontal: 8, paddingVertical: 9, borderRadius: 3,}
})
