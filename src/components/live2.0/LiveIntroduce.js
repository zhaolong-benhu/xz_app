/**
 * Created by zhaolong on 2017/10/24.
 * File description:直播介绍
 */

'use strict'

import React,{Component} from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
}from 'react-native';
import {connect} from "react-redux";
// import {fetchLiveroomUserinfo} from '../../actions/AnchorRoom';
import {Alert} from "../../components";

export default class LiveIntroduce extends React.Component {
    state={
    };

    static defaultProps={
    };
    constructor(props) {
        super(props);
    }
    componentWillMount(){
        // this.props.fetchLiveroomUserinfo(this.props.id);
    }
    componentWillReceiveProps(nextProps){
        //直播间主播信息
        // if(this.props.liveUserinfoData != nextProps.liveUserinfoData){
        //       this.setState({liveUserinfo:nextProps.liveUserinfoData.userInfo});
        // }
    }
    render(){
        var data = this.props.data;
        return(
            <View>
                {data ?
                    <View style={styles.container}>
                        <Text style={styles.introduce}>主播介绍</Text>
                        <View style={styles.infos}>
                            <Text>主播姓名：</Text><Text>{data.name}</Text>
                        </View>
                        <View style={styles.infos}>
                            <Text>主播标签：</Text>
                            {data.label && data.label.map((v,i)=>{
                                return <Text  key={i} style={i == 0 ? null:styles.rank}>{v}</Text>
                            })}
                        </View>
                        <View style={styles.infos}>
                            <Text>主播介绍：{data.introduction}</Text>
                        </View>
                        <View style={styles.infos}>
                            <Text>擅长领域：{data.adept}</Text>
                        </View>
                    </View>
                    :
                    null
                }
            </View>
        )
    }
}

// const mapStateToProps = ({anchorRoomUserinfo,liveroomDetail}) => {
// 	return {
//         liveUserinfoData:anchorRoomUserinfo.liveUserinfoData
// 	}
// }
// export default connect(mapStateToProps, {fetchLiveroomUserinfo})(LiveIntroduce)

const styles = StyleSheet.create({
  container: {
    paddingVertical:12,
    paddingHorizontal:12,
  },
  introduce:{
    fontSize:15,
    color:'#000',
  },
  infos:{
    flexDirection:'row',
    marginTop:5,
  },
  rank:{
    marginLeft:10,
  },
});
