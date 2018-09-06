/**
 * Created by qzy on 26/03/2017.
 * File description:弹幕弹出
 */
import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";
import {Button, CheckBox, ListItem} from "native-base";
import {global_height, global_width} from "../../util";
import {post} from "../../helpers/helpers";
import {onSendMsg} from '../../components/common/base'

class BarragesPopup extends Component {
  _onPress = (id) => () => {
    this.props.set_barrage(id)
  }
  _submit = async () => {
    const {loginInfo, avChatRoomId} = this.props.liveChatRoom
    this.props.toggleSettingPopup()
    let res = await post('mv1/user/live/set-barrage', {live_id: this.props.id, barrage_id: this.props.barrages.set_barrage})
    onSendMsg(JSON.stringify({type:'barragePriceChanged',val:res.barrage_amount}), 3, loginInfo, avChatRoomId);
  }

  render() {
    return (
        <View
            style={{
              width: global_width,
              height: 120,
              position: 'absolute',
              top: global_height - 170,
              backgroundColor: 'rgba(0,0,0,0.7)',
              justifyContent: 'space-around',
              paddingVertical: 10,
              alignItems: 'center',
            }}>
          <Text style={{color: '#fff', marginTop: 10}}>提问价格（弹幕提问）</Text>
          <View style={{flexDirection: 'row'}}>
            {
              this.props.barrages.barrage_amount_a ? <ListItem style={{borderBottomWidth: 0}}>
                <CheckBox checked={this.props.barrages.set_barrage === 'a'} onPress={this._onPress('a')}/>
                <Text style={{
                  color: '#fff',
                  marginLeft: 4
                }}>{this.props.barrages.barrage_amount_a == 0 ? "免费" : this.props.barrages.barrage_amount_a}</Text>
              </ListItem> : null
            }

            {
              this.props.barrages.barrage_amount_b ? <ListItem style={{borderBottomWidth: 0}}>
                <CheckBox checked={this.props.barrages.set_barrage === 'b'} onPress={this._onPress('b')}/>
                <Text style={{color: '#fff', marginLeft: 4}}>{this.props.barrages.barrage_amount_b}元</Text>
              </ListItem> : null
            }

            {
              this.props.barrages.barrage_amount_c ? <ListItem style={{borderBottomWidth: 0}}>
                <CheckBox checked={this.props.barrages.set_barrage === 'c'} onPress={this._onPress('c')}/>
                <Text style={{color: '#fff', marginLeft: 4}}>{this.props.barrages.barrage_amount_c}元</Text>
              </ListItem> : null
            }

            {
              this.props.barrages.barrage_amount_d ? <ListItem style={{borderBottomWidth: 0}}>
                <CheckBox checked={this.props.barrages.set_barrage === 'd'} onPress={this._onPress('d')}/>
                <Text style={{color: '#fff', marginLeft: 4}}>{this.props.barrages.barrage_amount_d}元</Text>
              </ListItem> : null
            }

          </View>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Button rounded light bordered small
                    style={{alignSelf: 'center'}}
                    onPress={this._submit}>
              <Text style={{color: '#fff'}}>保存</Text>
            </Button>
          </View>
        </View>
    )
  }
}

export default BarragesPopup

const styles = StyleSheet.create({
  popupMenuText: {
    fontSize: 18,
    color: '#fff',
  },
  menuOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
