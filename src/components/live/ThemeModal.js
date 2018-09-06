/**
 * Created by qzy on 27/03/2017.
 * File description:
 */
import React, {Component} from "react";
import {Image, Modal, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View} from "react-native";
import {global_width} from "../../util/screen";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Hr from "react-native-hr";
import CheckTheme from "./CheckTheme";
import {Alert} from '../../components';
import {post} from "../../helpers/helpers";
import {api_addUserTheme} from "../../api/global";
import {Actions} from "react-native-router-flux";
import ResponsiveImage from 'react-native-responsive-image';

const styles = StyleSheet.create({
  innerWrapper: {
    backgroundColor: 'rgb(255,255,255)',
    borderRadius: 6,
    width: global_width * 0.85,
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 20
  },
  wrapper: {backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', flex: 1,},
  icon: {position: 'absolute', right: 6, top: 6},
  title: {textAlign: 'center', paddingBottom: 25, fontSize: 24},
  item: {margin: 8}
})

class ThemeModal extends Component {

  state = {
    check: new Set(),
    timeOver: false,
  }

  componentWillMount() {
    if (this.props.timeOver == 3) {
      this.setState({timeOver: true,})
    }
    if (this.props.timeOver == 2 || this.props.timeOver == 1 || this.props.timeOver == 4) {
      this.setState({timeOver: false,})
    }
  }

  componentWillReceiveProps(nextProps) {
    // 1:直播中
    // 2:预告
    // 3:直播结束
    // 4:已过预告时间，但未直播
    if (this.props.timeOver !== nextProps.timeOver) {
      if (nextProps.timeOver == 3) {
        this.setState({timeOver: true,})
      }
      if (nextProps.timeOver == 2 || nextProps.timeOver == 1 || nextProps.timeOver == 4) {
        this.setState({timeOver: false,})
      }
    }
  }

  _onPressButton() {
    if (this.state.check.size > 0) {
      const checkArr = Array.from(this.state.check)
      post(api_addUserTheme, {ids: checkArr})
      this.setState({check: new Set()})
    }
    // if (this.props.timeOver == 3 || this.props.timeOver == 2) {
    //   Actions.pop()
    // }
    this.props.close()
  }

  _check = (id, check) => {
    const checkSet = this.state.check
    if (check === true) {
      checkSet.add(id)
    }
    if (check === false) {
      checkSet.delete(id)
    }
    this.setState({check: checkSet})
  }

  render() {
    return (
        <Modal
            animationType={"none"}
            transparent={true}
            visible={this.props.themeModalShow}
            onRequestClose={() => {
              console.log('close')
            }}
        >{ <View style={styles.wrapper}>
          <View style={styles.innerWrapper}>
            {
              this.props.data ?
                  this.state.timeOver ?
                      <View>
                        <TouchableOpacity onPress={this._onPressButton.bind(this)} style={{alignSelf: 'flex-end'}}>
                          <Icon name="close" size={28} color="#999"/>
                        </TouchableOpacity>
                        <Text style={styles.title}>往期回顾</Text>
                        <ScrollView>
                          <View style={{flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20,alignItems:'center',justifyContent:'center'}}>
                          {
                            this.props.data.review_data.length > 0 ? this.props.data.review_data.map((item, i) => {
                              return <TouchableHighlight
                                  underlayColor={'rgba(255,255,255,0.4)'}
                                  style={{alignItems:'center',}}
                                  onPress={() => {
                                    if (item.mp4_sd_url) {
                                      this.props.close()
                                      Actions.WatchPastVideo({video_address: item.mp4_sd_url, title: item.file_name})
                                    }
                                  }} key={i}>
                                <View style={{alignItems:'center',margin:8,}}>
                                  <ResponsiveImage source={{uri:item.face_url}}
                                         style={{width: global_width * 0.3, height: (global_width * 0.3) / 1.6,}}/>
                                  <Text style={{marginTop:4,}}>{item.file_name.length>8?item.file_name.substr(0,8):item.file_name}</Text>
                                </View>
                              </TouchableHighlight>
                            })
                            :
                            <Text style={{marginTop:4}}>主播比较懒，没有留下任何课程！去看看其他课程~</Text>
                          }
                          </View>
                        </ScrollView>
                        <Hr lineColor='#cfcfcf' text='你喜欢什么样的主题' textStyle={{fontSize: 20,}}/>
                        <CheckTheme {...this.props.data} onCheck={this._check}/>
                      </View> :
                      <View>
                        <TouchableOpacity onPress={this._onPressButton.bind(this)} style={{alignSelf: 'flex-end'}}>
                          <Icon name="close" size={28} color="#999"/>
                        </TouchableOpacity>
                        <Text style={styles.title}>直播主题</Text>
                        <Text style={{lineHeight: 20, marginBottom: 25}}>{this.props.data.theme_content}</Text>
                        <Hr lineColor='#cfcfcf' text='你喜欢什么样的主题' textStyle={{fontSize: 20,}}/>
                        <CheckTheme {...this.props.data} onCheck={this._check}/>
                      </View>
                  : null
            }
          </View>
        </View> }

        </Modal>
    );
  }
}

export default ThemeModal
