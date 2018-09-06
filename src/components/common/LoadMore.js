/**
 * Created by zhaolong on 2017/04/14.
 * File description:ListView和SwipeListView 加载更多底部组件
 */
import React, {
    Component
} from 'react';
import {
      View,
      Text,
      StyleSheet,
} from 'react-native';

export default class LoadMore extends Component {
      constructor(props) {
          super(props);
      }
      render() {
          return (
              <View style={styles.footer}>
                {(()=>{
                    if(!this.props.hideTitle){
                        return <Text style={styles.footerTitle}>{this.props.isLoadAll ? '已加载全部' : '正在加载更多……'}</Text>
                    }
                })()}
              </View>
          )
      }
  }
  const styles = StyleSheet.create({
      footer: {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: 30,
        //   backgroundColor:'red',
        //   paddingBottom:20
      },
      footerTitle: {
          marginLeft: 10,
          fontSize: 15,
          color: 'gray'
      }
  })
