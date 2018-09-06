/**
 * Created by qzy on 26/03/2017.
 * File description:聊天
 */
import React, {Component,} from 'react';
import {ListView, StyleSheet, Text, View, Image} from 'react-native';
import InvertibleScrollView from 'react-native-invertible-scroll-view';
import {Badge,} from 'native-base';

const styles = StyleSheet.create({
  wrapper: {
      paddingHorizontal: 5,
      marginBottom: 5
  },
  container: {
      flexDirection: 'column',
  },
  row: {
      marginBottom: 1,
  },
  badge:{
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      height:20,
  },
  text: {
      color: '#737373',
      fontSize: 12
  }
})

class Chat extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      }),
    };
  }

  componentWillMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.props.data, this.props.data.map((row, index) => index).reverse()),
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.data, nextProps.data.map((row, index) => index).reverse()),
    });
  }
  renderFace(row) {
      let arr = row.split(/(__face_data:image\/png;base64\,[\a-z\d\/+]+={0,3}__)/gi)
      return arr.map( (val, i) => {
        if(val.match(/data:image\/png;base64/)){
          return <Image source={{uri: val.match(/__face_(\S+)__/)[1]}} key={i} style={{width:18,height:18}}/>
        }if (val === "") {
          return null
        }else{
          return <Text style={styles.text} key={i}>{val}</Text>
        }
      })
  }

  _renderRow(row) {
    return(
       <View key={row} style={styles.row}>
           <Badge style={{backgroundColor: 'rgba(0,0,0,0)',justifyContent: 'center'}}>
             {
               row.match(/data:image\/png;base64/) ?
                   <View style={{flexDirection:'row', alignItems: 'center', }}>
                     {this.renderFace(row)}
                   </View>
               :
               <Text style={styles.text}>{row}</Text>
             }
           </Badge>
       </View>
    )
  }

  render() {
    return (
        <View style={[styles.wrapper,this.props.style || {}]}>
          <ListView
              renderScrollComponent={props => <InvertibleScrollView {...props} inverted/>}
              dataSource={this.state.dataSource}
              renderRow={this._renderRow.bind(this)}
              style={styles.container}
              enableEmptySections={true}
          />
        </View>
    );
  }
}

export default Chat
