/**
 * Created by qzy on 25/05/2017.
 * File description:
 */
import React from 'react';
import {Text, View,} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {global_height, global_width, platform} from '../../util'
import {Badge} from 'react-native-elements'

const KeyBoardMaskInput = ({text, emitPayText, togglePayText, money, needBadge, ifNotAuthedToLogin, alert}) => {
  const style = {
    flex: 1,
    zIndex: 100,
    position: 'absolute',
    top: 0,
    left: 0,
    height: global_height,
    width: global_width
  }
  return (
      <View>
        {platform == 'ios' ?
            <View style={style}>
              <View style={{flex: 1}}/>
              <View>
                <View style={{flexDirection: 'row', backgroundColor: '#fff', alignItems: 'center'}}>
                  {
                    needBadge ?
                        <Badge
                            containerStyle={{backgroundColor: emitPayText ? '#f06292' : '#ccc', marginHorizontal: 14,}}
                            value={'弹'}
                            onPress={() => {
                              if(ifNotAuthedToLogin()){
                                togglePayText()
                              }
                            }}
                            textStyle={{color: 'white'}}
                        /> : null
                  }
                  {
                    emitPayText ?
                        <Text style={{
                          left: 0,
                          right: 0,
                          height: 45,
                          backgroundColor: '#fff',
                          color: '#999',
                          fontSize: 16,
                          flex: 1,
                          lineHeight: 45,
                          marginLeft: 4,
                        }}>{text.length > 0 ? text : "直播间发送弹幕(" + money + "元人民币)"}</Text> :
                        <Text style={{
                          left: 0,
                          right: 0,
                          height: 45,
                          backgroundColor: '#fff',
                          color: '#999',
                          fontSize: 16,
                          flex: 1,
                          lineHeight: 45,
                          marginLeft: 4,
                        }}>{text.length > 0 ? text : "说点什么？"}</Text>
                  }
                </View>
                <KeyboardSpacer/>
              </View>
            </View>
            :
            <View style={{
              width: global_width,
              height: 45,
              backgroundColor: 'red',
              position: 'absolute',
              top: global_height - 75,
              left: 0,
            }}>
              <View style={{
                flexDirection: 'row',
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
                height: 45,
              }}>
                {
                  needBadge ?
                      <Badge
                          containerStyle={{
                            backgroundColor: emitPayText ? '#cc3232' : '#aaa',
                            marginHorizontal: 14,
                            borderWidth: 0.5,
                            borderColor: '#888'
                          }}
                          value={'弹'}
                          onPress={() => {
                            ifNotAuthedToLogin() ? togglePayText() : null
                          }}
                          textStyle={{color: 'white'}}
                      /> : null
                }
                {
                  emitPayText ?
                      <Text style={{
                        left: 0,
                        right: 0,
                        backgroundColor: '#fff',
                        color: '#999',
                        fontSize: 16,
                        flex: 1,
                        marginLeft: 4,
                      }}>{text.length > 0 ? text : "直播间发送弹幕(" + money + "元人民币)"}</Text> :
                      <Text style={{
                        left: 0,
                        right: 0,
                        backgroundColor: '#fff',
                        color: '#999',
                        fontSize: 16,
                        flex: 1,
                        marginLeft: 4,
                      }}>{text.length > 0 ? text : "说点什么？"}</Text>
                }
              </View>
              <KeyboardSpacer/>
            </View>
        }

      </View>
  )
}
export default KeyBoardMaskInput