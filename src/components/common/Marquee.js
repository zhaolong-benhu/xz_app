/**
 * Created by qzy on 26/05/2017.
 * File description:
 */
import React, {Component} from "react";
import {Animated, Text, View} from "react-native";
import {global_width, global_height} from "../../util";
export default class MarqueeLabel extends Component {

  state = {
    x: new Animated.Value(100),
    opacity: 0,
  }

  startAnimation = (event) => {
    Animated.timing(this.state.x, {
      toValue: - (this.props.width ? this.props.width+500 : global_width+200),
      duration: 12000
    }).start();
  }

  render() {
    const opacityAnimation = this.state.x.interpolate({
      inputRange: [-10, 0],
      outputRange: [1, .3],
    });
    const animatedStyle = {
      opacity: opacityAnimation,
      transform: [
        {
          translateX: this.state.x,
        },
      ],
    }

    return (
        <Animated.View style={[styles.bgViewStyle,{top:this.props.row.positionY * (this.props.height || global_height) * 0.2,width:(this.props.width || global_width)+200}]} onLayout={(event) => this.startAnimation(event)}>
            <Animated.Text style={[styles.textContainerStyle,animatedStyle]}>{this.props.row.text}</Animated.Text>
        </Animated.View>
    )
  }
}

const styles = {
  bgViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    overflow: 'scroll',
    backgroundColor: 'transparent',
    position:'absolute',
    right:-200,
    width:global_width+200,
  },
  textContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    color: 'yellow',
    fontSize:20,
  }
};
