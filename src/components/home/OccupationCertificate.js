/**
 * Created by zhaolong on 2017/03/21.
 * File description:首页-IHMA证书
 */
'use strict'

import React from "react";

import {Image, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import {Icon} from "native-base";
import {connect} from "react-redux";
import {fetchOccupationCertificateData} from "../../actions/OccupationCertificate";
import {global_width} from "../../util/screen";
import {Actions} from "react-native-router-flux";
import {glo_url} from "../../api/global";
class OccupationCertificate extends React.Component {
  componentWillMount() {
    this.props.fetchOccupationCertificateData();
  }

  render() {
    const {certificateData} = this.props;
    return (
        <View>
          {certificateData &&
          <View style={styles.container}>
            <View style={styles.head}>
              <Text style={styles.text1}>{this.props.title}</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.text2} onPress={() => Actions.XZWebView({title: 'IHMA证书', url: glo_url + '/ihma/'})}>更多{this.props.title}</Text>
                <Icon style={{color: '#157eda', fontSize: 15}} name="ios-arrow-forward-outline"/>
              </View>
            </View>
            <View style={styles.list}>
              {certificateData.map((value, index) => {
                return <TouchableWithoutFeedback key={index} onPress={() => Actions.XZWebView({
                  title: value.name,
                  url: glo_url + '/ihmaDetail/' + value.id
                })}>
                  <View style={styles.nav} key={'all_ihmas' + index}>
                    <View>
                      <Image source={{uri: value.thumb}} style={styles.img}/>
                    </View>
                    <Text style={styles.name} onPress={() => this.Go()}>
                      {value.name}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              })}
            </View>
          </View>
          }
        </View>
    )
  }
}
var styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 5,
    borderColor: '#ECECEC'
  },
  head: {
    paddingHorizontal: 10,
    height: 34,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: "#ECECEC",
    borderBottomWidth: 0.5,
  },
  title: {
    marginTop: 10,
  },
  title2: {
    fontSize: 14,
    marginTop: 10,
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nav: {
    paddingTop: 10,
    width: global_width / 3,
    borderColor: "#ECECEC",
    borderRightWidth: 0.5,
    alignItems: 'center'
  },
  img: {
    width: global_width / 3 - 25,
    height: (global_width / 3 - 25) * 1.375,
  },
  name: {
    width: global_width / 3 - 10,
    textAlign: 'center',
    color: '#333333',
    marginVertical: 10,
    fontSize: 11,
  },
  text2: {
    color: '#999',
    fontSize: 12,
    marginRight: 4,
  },
  text1: {
    fontSize: 15,
    color: '#333',
  },
})

const mapStateToProps = ({occupationCertificate}) => {
  return {
    certificateData: occupationCertificate.certificateData
  }
}

export default connect(mapStateToProps, {fetchOccupationCertificateData})(OccupationCertificate)
