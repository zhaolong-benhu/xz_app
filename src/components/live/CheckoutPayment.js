/**
 * Created by qzy on 27/03/2017.
 * File description:支付弹窗
 */
import React, {Component,} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Modal,
} from 'react-native';
import {Alert,Loading} from '../../components';
import {onSendMsg} from '../../components/common/base'
import {global_width,global_height,platform}  from '../../util';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native-elements'
import {post} from '../../helpers/helpers'
import Alipay from 'react-native-yunpeng-alipay';
import {Actions} from 'react-native-router-flux';
import {parseQueryString} from '../../util'
var InAppUtils = require('NativeModules').InAppUtils
const styles = StyleSheet.create({
  innerWrapper: {backgroundColor: 'rgb(255,255,255)', borderRadius: 6, width: global_width * 0.80},
  wrapper: {backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', flex: 1,zIndex:120,position:'absolute'},
  icon: {position: 'absolute', right: 6, top: 6},
  title: {textAlign: 'center', paddingBottom: 25, fontSize: 24},
  item: {width: 128, height: 79, margin: 8},
  titleWrapper: {
    paddingHorizontal: 12,
    height: 40,
    backgroundColor: '#fff',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

class CheckoutPayment extends Component {
  state = {
    isLogin: false,
    loading: false,
  }
  loadStart = () => {
    this.setState({loading:true})
  }
  loadEnd = () => {
    this.setState({loading:false})
    this.props.toggleCheckoutModal()
  }
  choosePay = (payCode) => () => {
    // if (!this.props.openChoosePay) {
    //   this.props.toggleChoosePay()
    // }
    // if (this.props.openChoosePay) {
    //   this.props.choosePay(payCode)
    //   this.props.toggleChoosePay()
    // }
  }

  renderPay(payTo) {
    return (
        <View style={{flexDirection: 'row', marginTop: 2}}>
          <View style={{width: global_width * 0.05}}>
            <View style={{borderRadius:15,width:30,height:30,overflow:'hidden',marginTop:10}}>
              <Image source={{uri: payTo === "alipay" ?
                      "https://api.9first.com/images/bank/bank-alipay.jpg" :
                      "https://api.9first.com/images/bank/bank-weixin.jpg"
                      }}
                     style={{width:30,height:30,borderRadius:15,overflow:'hidden'}}/>
            </View>
          </View>
          <Button
              backgroundColor="transparent"
              title={payTo === "alipay" ? '支付宝' : '微信支付'}
              textStyle={{color: '#333'}}
              iconRight
              icon={{name: 'keyboard-arrow-right', type: 'MaterialIcons', size: 26, color: '#999'}}
              buttonStyle={{width: global_width * 0.65, justifyContent: 'space-between'}}
              containerStyle={{width: global_width * 0.7,}}
              onPress={this.choosePay(payTo === "alipay" ? 'alipay' : 'wechat')}
          />
        </View>
    )
  }

  renderAliPay() {
    // if (this.props.openChoosePay || this.props.payTo === 'alipay') {
    //   return this.renderPay('alipay')
    // }
    this.renderPay('alipay')
  }

  renderWechat() {
    if (this.props.openChoosePay || this.props.payTo === 'wechat') {
      return this.renderPay('wechat')
    }
  }
  //ios类目支付
  iosPay = async () => {
    var payType = this.props.livePay.payType
    var userid = 0
    var order_id=0
    var price=0.00
    var prdPrefix = 'com.xianzhi.liveRoom.ticket.pub.class'
    if (payType === "redPocket") {  //如果是红包支付，创建红包订单
       let res = await post('mv1/user/order/create-red-order', {
         live_id: this.props.liveRoomInfo.room_id,
         money: this.props.payNumber,
         source:6,
       })
       price=this.props.payNumber+'.00'
       order_id = res.order_id
       userid=this.props.liveUserinfoData.user_id || 0
       prdPrefix = 'com.xianzhi.liveRoom.red.package.pub.class'
    }else{
      const res = await post('mv1/user/order/create-red-order', {
        live_id:this.props.live_id,
        money:this.props.price,
        source:6,
        id:this.props.id,
        order_type:14
      })
      price = this.props.price
      order_id = res.order_id
    }
    //订单信息
    const products = ([prdPrefix+'.'+price])

    this.loadStart()
    InAppUtils.loadProducts(products, (error, products) => {
      if(error) {
        Alert('订单没有找到')
        this.loadEnd()
      }
      // 购买产品
      // Alert(JSON.stringify(products))
      if(products && products.length>0){
        InAppUtils.purchaseProduct(products[0].identifier, (error, response) => {
        if(error) {
          Alert('暂时不能进行支付~')
          this.loadEnd()
          return
        }
        if (response && response.productIdentifier) {
          // 核对订单
          InAppUtils.receiptData(async (error, receiptData)=> {
            if(error) {
              Alert('订单没有找到');
                this.loadEnd()
            } else {
              //核对单发后端
              let res = await post('/pay/respond/apple-return',{receipt:receiptData, order_id: order_id , t_userid:userid, type: payType === "redPocket" ? '1' : '2'})
              if(res){
                //成功支付后，发送红包信息
                if (payType === "redPocket") {
                  //红包的头像和数量
                  const {loginInfo, avChatRoomId} = this.props.liveChatRoom
                  const clearInput = this.props.clearInput
                  const payText = payType === "barrage" ? this.props.text : this.props.payNumber
                  let redPocketString = JSON.stringify({
                    redPocketNum: payText,
                    userIcon: this.props.liveRoomInfo.user_thumb,
                    userName: this.props.liveRoomInfo.nick_name,
                  })
                  onSendMsg(redPocketString, 3, loginInfo, avChatRoomId)
                  clearInput()
                  console.log('打赏支付成功')
                }else{
                    this.props.onPay()
                }
                this.loadEnd()
                console.log('门票支付成功')
              }else{
                Alert('订单没有找到');
                  this.loadEnd()
              }
            }
          });
        }
      });
      }
    });
  }


  //支付宝支付
  aliPay = async () => {
    try {
        const payType = this.props.livePay.payType
        const pay_bank = 'client_alipay'
        const live_id = this.props.id
        const id = this.props.id
        const alipayParams=null
      //门票
      if (payType == "ticket") {
            const res = await post('mv1/user/order/create-red-order', {
              live_id:this.props.live_id,
              money:this.props.price,
              source:6,
              id:this.props.id,
              order_type:14
            })
            this.props.toggleCheckoutModal()
            //订单信息
            const order_id = res.order_id
            const user_id = res.order_list.user_id
            const pay_type = 32
            alipayParams = await post('pay', {order_id, pay_bank, pay_type, user_id, live_id,id})
        }else{
            if (payType !== "barrage") {  //如果是红包支付，创建红包订单
               let res = await post('mv1/user/order/create-red-order', {
                 live_id: this.props.liveRoomInfo.room_id,
                 money: this.props.payNumber,
                 source:6,
               })
               this.props.getOrderSuccess(res)
             }
             //传递的内容
             const {order_id} = payType === 'barrage' ? this.props.livePay.barrageInfo : this.props.livePay.orderInfo
             const user_id = this.props.user.user_id
             const pay_type = payType === "barrage" ? 31 : 30
             alipayParams = await post('pay', {order_id, pay_bank, pay_type, user_id, live_id,id})
             //todo  这个不能关闭modal的bug，未知原因
             this.props.toggleCheckoutModal(null)
         }

          const isPay=false
          const msg = await Alipay.pay(alipayParams.params)
          if(platform==='ios'){
            isPay = msg[0].resultStatus == "9000"
          }
          else{
            const re = /resultStatus={(\d+)/, //只匹配一次
                  result=re.exec(msg);
            if(result.length>1 && parseInt(result[1])=="9000"){
              isPay=true
            }
          }
          if (isPay) {
            if(payType==='ticket'){
                this.props.onPay()
                console.log('门票支付成功')
            }else{
                const payText = payType === "barrage" ? this.props.text : this.props.payNumber
                const {loginInfo, avChatRoomId} = this.props.liveChatRoom
                const clearInput = this.props.clearInput
                //成功支付后，发送弹幕
                if (payType === "barrage") {
                  // console.log(payText, 1, loginInfo, avChatRoomId)
                  onSendMsg(JSON.stringify({"barrageTxt":payText}), 1, loginInfo, avChatRoomId)
                  clearInput()
                  console.log('弹幕支付成功')
                }
                //成功支付后，发送红包信息
                if (payType === "redPocket") {
                  //红包的头像和数量
                  let redPocketString = JSON.stringify({
                    redPocketNum: payText,
                    userIcon: this.props.liveRoomInfo.user_thumb,
                    userName: this.props.liveRoomInfo.nick_name,
                  })
                  onSendMsg(redPocketString, 3, loginInfo, avChatRoomId)
                  clearInput()
                  console.log('打赏支付成功')
                }
            }
            if(platform=='ios'){
              // todo 打开吧 给后端发送同步订单
              let resString = parseQueryString(`${msg[0].result }'`)
              resString.sign = `${resString.sign}"`
              post('pay/respond/client-alipay-return', {...resString})
            }else{
              msg=msg.split(';')
              if(msg.length>0 && msg[2]){
                msg=msg[2].replace(/^result=\{(.+)\}$/, '$1')
                let resString = parseQueryString(`${msg}`)
                // console.log('androidss:'+JSON.stringify(resString))
                post('pay/respond/client-alipay-return', {...resString})
              }
            }
          }
      } catch (err) {
        this.props.toggleCheckoutModal(null)
        Alert('您已取消支付~')
    }
  }

  render() {
    const {payType} = this.props.livePay;
    return (
        <View style={{width:this.props.isFull ? global_height : global_width,height:this.props.isFull ? global_width:global_height,zIndex:120,position:'absolute',top:0,left:0}}>
            {
            this.props.showCheckoutModal ?
            <View style={[styles.wrapper,{width:this.props.isFull ? global_height : global_width,height:this.props.isFull ? global_width:global_height}]}>
              <View style={styles.innerWrapper}>
                <TouchableOpacity onPress={() => this.props.toggleCheckoutModal()} style={{
                  position: 'absolute',
                  right: 10,
                  top: 0,
                  width: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 30,
                }}>
                  <Ionicons name="md-close" size={24} color="#999" style={{marginTop: 10}}/>
                </TouchableOpacity>
                <View style={{alignItems: 'center', marginVertical: 20,}}>
                  <Text style={{fontSize: 18, color: '#333', lineHeight: 40}}>收银台</Text>
                  <Text style={{color: '#999', marginTop: 20}}>
                    {payType === 'barrage' ? "弹幕支付" :payType === "ticket"? "门票支付" : "直播红包"}
                  </Text>
                  <Text style={{lineHeight: 40, color: 'red', fontSize: 30, marginVertical: 20}}>
                     {payType === 'barrage' ?
                      this.props.livePay.textPayNums :
                      payType === "ticket" ?
                      this.props.price:
                      this.props.payNumber}
                  </Text>
                  <View style={{borderTopWidth: 1, borderTopColor: '#eee', width: global_width * 0.7, paddingTop: 8}}>
                    {this.renderAliPay()}
                    {/*{this.renderWechat()}*/}
                  </View>

                  <Button
                      backgroundColor="transparent"
                      title={platform==='ios' ? this.state.loading ? '正在支付中...' : '立即支付' : '立即支付' }
                      textStyle={{color: '#167fda'}}
                      buttonStyle={{borderRadius: 4, width: 120,}}
                      onPress={platform==='ios' ? !this.state.loading ? this.iosPay : null : this.aliPay}
                  />

                </View>
              </View>
            </View>
            : null
          }

        </View>
    );
  }
}

export default CheckoutPayment
