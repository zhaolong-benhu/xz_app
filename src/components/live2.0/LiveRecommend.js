/**
 * Created by zhaolong on 2017/10/24.
 * File description:主播推荐
 */

'use strict'

import React,{Component} from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    ListView,
    ToastAndroid,
} from 'react-native';
import {Actions} from "react-native-router-flux";
import {glo_url} from "../../api/global";
import {global_width,global_height} from "../../util/screen";

export default class LiveRecommend extends React.Component {

    static defaultProps={
        dataSource:[{
            pic:require('../../static/images/live/castCover.jpg'),
            title:"手把手教你做好防控1",
            id:1754
        },{
            pic:require('../../static/images/live/castCover.jpg'),
            title:"国宾接待之前厅欢送篇",
            id:1370
        },{
            pic:require('../../static/images/live/castCover.jpg'),
            title:"管理层这么做就赢了",
            id:1754
        },{
            pic:require('../../static/images/live/castCover.jpg'),
            title:"顾客就是上帝",
            id:1370
        }],
    };
    constructor(props) {
        super(props);

        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource:ds
        }
    }
    componentDidMount(){
        this._genRows();
    }
    _genRows(){
        this.setState({dataSource:this.state.dataSource.cloneWithRows(this.props.dataSource)});
    }
    //查看更多
    lookMore(){
        Actions.XZWebView({
         title: "在线课程",
         url: glo_url + "/kecheng/list/0-1-0"
     });
    }
    //点击主播推荐的课程
    onPressRows(id){
        Actions.XZWebView({
         title: "在线课程",
         url: glo_url + "/kecheng/"+id
     });
    }
    renderList(rowData:object, sectionID: number, rowID: number){
        return(
            <TouchableOpacity style={styles.list} onPress={()=> this.onPressRows(rowData.id)}>
                <View>
                    <Image source={rowData.pic} style={styles.pic}/>
                    <Text style={styles.title}>{rowData.title}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.head}>
                    <Text>主播推荐</Text>
                    <TouchableOpacity onPress={()=>this.lookMore()}>
                        <Text style={styles.more}>更多</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <ListView
                        style={styles.listview}
                        dataSource={this.state.dataSource}
                        renderRow={this.renderList.bind(this)}
                        horizontal={true}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    paddingTop:5,
    paddingLeft:5,
    paddingRight:5,
    paddingBottom:5,
  },
  head:{
      flexDirection:'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  },
  more:{

  },
  listview:{
      width:global_width,
  },
  list:{
      height:125,
      paddingTop:5,
      paddingRight:5,
  },
  pic:{
    width:global_width/3+20,
    height:100,
 },
 title:{
     fontSize:12,
 }
});
