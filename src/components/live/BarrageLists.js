/**
 * Created by qzy on 26/05/2017.
 * File description:弹幕列表
 */

import React, {Component} from "react";
import { ScrollView, View,StyleSheet } from "react-native";
import {MarqueeLabel} from "../../components";
import {global_width,global_height,platform} from "../../util";


class BarrageLists extends Component {
  render() {
    if(platform === "ios"){
      return (
          <ScrollView style={[styles.wrapper,this.props.width ? {top:40,width:this.props.width,height:this.props.height*0.6}:{}]}>
            {
              this.props.data.map((row, i) => <MarqueeLabel removeBarrage={this.props.removeBarrage} row={row} key={row.positionY*Math.random()*10} {...this.props}/>)
            }
          </ScrollView>
      );
    }else{
      return (
          <View style={[styles.wrapper, this.props.width ? {top:40,width:this.props.width,height:this.props.height*0.7}: {} ]}>
            {
              this.props.data.map((row, i) => <MarqueeLabel removeBarrage={this.props.removeBarrage} row={row} key={row.positionY} height={this.props.height} width={this.props.width}/>)
            }
          </View>
      );
    }

  }
}
export default BarrageLists

const styles = StyleSheet.create({
  wrapper:{
    position:'absolute',
    top:60,
    height:global_height*0.4,
    width:global_width,
    zIndex:9,
  }
})
