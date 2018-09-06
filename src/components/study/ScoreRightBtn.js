/**
 * Created by qzy on 02/05/2017.
 * File description:评价弹窗
 */
import React, {Component,} from 'react';
import {
  View,
  TouchableHighlight,
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {renderIf} from '../../components';

const openScore = () => Actions.refresh({'openScore': true})

class ScoreRightBtn extends Component {
  render() {
    return (
        renderIf(this.props.show, <View style={this.props.containerStyle}>
          <TouchableHighlight onPress={ openScore } underlayColor="#a9d9d4">
            <SimpleLineIcons name="pencil" size={20} color="#333"/>
          </TouchableHighlight>
        </View>)
    )
  }
}

const mapStateToProps = ({router}) => {
  return {
    show: router.show,
  }
}

export default connect(mapStateToProps, null)(ScoreRightBtn)