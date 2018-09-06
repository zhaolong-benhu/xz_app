/**
 * Created by zhaolong on 2017/03/16.
 * File description:书包-列表
 */
import React,{
     Component
} from 'react'
import {
     ScrollView,
     View,
     TouchableHighlight,
     Text,
     SwipeableListView,
     StyleSheet,
     Image,
     InteractionManager
 } from 'react-native'
import formatListViewDataSource from './formatListViewDataSource'
import {global_width,global_height} from '../../util/screen'


export default class WantHome extends React.Component {

static defaultProps={
    want:[
        {id:"104",thumbnail:'http://img2.xz.veimg.cn/classroomclass/201652511232428555.jpg',title:"长租公寓成本管理",study_num:'17',real_price:'480'},
        {id:"105",thumbnail:'http://img2.xz.veimg.cn/classroomclass/20165251123s2428555.jpg',title:"长租公寓成本管理",study_num:'18',real_price:'580'},
        {id:"106",thumbnail:'http://img2.xz.veimg.cn/classroomclass/201652511232s428555.jpg',title:"长租公寓成d本管理",study_num:'19',real_price:'180'},
        {id:"106",thumbnail:'http://img2.xz.veimg.cn/classroomclass/201652511232s428555.jpg',title:"长租公寓成d本管理",study_num:'19',real_price:'180'},
    ]
}

constructor(props){
    super(props);
}
componentDidMount(){
    this.setState({
      dataSource: this.props.want
    });
}
ContinueBuy(){
    alert("该课程已售馨，请明天早点再来...");
}
DeleteCourse(){
    alert("删除成功！");
}
renderCourse(rowData){
    return (
      <View style={styles.coursecontainer}>
        <Image
          source={{uri: 'http://img2.xz.veimg.cn/classroomclass/20161020147223975.jpg'}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.coursetitle}>{this.props.want[0].title}</Text>
          <Text style={styles.year}>57人学过</Text>
          <Text style={styles.real_price}>¥998.00</Text>
        </View>
      </View>
    );
}
renderQuickActions(rowData, sectionID, rowID){
    return (
      <View style={styles.listcontainer}>
        <TouchableHighlight onPress={()=>this.ContinueBuy()}>
          <View style={styles.continuebuy}>
            <Text style={styles.continuetext}>续购</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={()=>this.DeleteCourse()}>
          <View style={styles.delete}>
            <Text style={styles.continuetext2}>删除课程</Text>
          </View>
        </TouchableHighlight>
      </View>
    )
}
  render () {
      console.log("zhaolong");
    let ds = SwipeableListView.getNewDataSource();
    // let obj = formatListViewDataSource(this.props.want);
    ds = ds.cloneWithRowsAndSections(this.props.want);
    if (!this.props.want.length) {
      return (
        <View>
          <Text style={styles.emptytext}>暂无任何内容，请选择其他书包课程</Text>
        </View>
      )
    } else {
      return (
        <ScrollView>
          <SwipeableListView
            bounceFirstRowOnMount
            maxSwipeDistance={145}
            dataSource={ds}
            renderQuickActions={(rowData, sectionID, rowID)=>this.renderQuickActions(rowData, sectionID, rowID)}
            renderRow={()=>this.renderCourse()}
          />
        </ScrollView>
      )
    }
  }
}
var styles = StyleSheet.create({
    container:{
        flex:1
    },
    head:{
        paddingTop:10,
        borderWidth:1,
        borderColor:'#ECECEC',
        flexDirection:"row",
    },
    title:{
        fontSize:18,
        color:'#333333',
        marginLeft:160,
        height:30
    },
    selectedText:{
        marginLeft:90,
        marginTop:3,
        color:'#167fda',
        fontSize:13,
    },
    icon:{
        width:12,
        height:12
    },
    coursecontainer:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    thumbnail: {
      width: 100,
      height: 60,
    },
    listView: {
      padding: 10,
      backgroundColor: '#F5FCFF',
    },
    rightContainer: {
       height:60,
       flex: 1,
       paddingLeft:5,
       borderBottomWidth:1,
       marginTop:15,
    },
    coursetitle: {
      fontSize: 15,
      color:'#333333',
    },
    year: {
    },
    real_price:{
      color:'red',
  },
  listcontainer:{
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
  },
  continuebuy:{
      backgroundColor: 'green',
      flex: 1,
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: 10
  },
  continuetext:{
     color: '#ffa60b',
     fontSize: 16
 },
 delete:{
       backgroundColor: 'red',
       flex: 1,
       alignItems: 'center',
       flexDirection: 'row',
       paddingHorizontal: 10
 },
 continuetext2:{
    color: 'white',
    fontSize: 16
},
emptytext:{
    fontSize: 18,
    color:'#333333',
    width:global_width,
    textAlign:'center',
    marginTop:global_height/3,
}
})
