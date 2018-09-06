/**
 * Created by qzy on 01/04/2017.
 * File description:
 */
import React, {Component, PropTypes,} from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  Modal,
  StyleSheet,
  TouchableHighlight,
  Text,
  Image,
  TextInput
} from 'react-native';
import {global_width, global_height, platform} from '../../util';
import {
  CourseTitle,
  CourseChapter,
  Alert,
  ReviewModal,
  ToolBar,
  renderIf,
  Loading,
  ScoreRightBtn
} from '../../components'
import {connect} from 'react-redux';
import {
  getDetail,
  addReview,
  toggleState,
  toggleCategory,
  toggleProgress,
  chooseCategory,
  fetchExam,
  chooseProgress,
  refreshFalse
} from '../../actions'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Orientation from 'react-native-orientation';
import {Actions} from 'react-native-router-flux';
class CourseDetail extends Component {
  state = {
    modalVisible: false,
    totalProgress: 0,
  }
  static defaultProps = {
    openScore: false,
  };

  componentWillMount() {
    // console.log(this.props.sort)
    const {course_id, cert_id, product_id, _type, lecture_id, sort} = this.props
    this.props.getDetail(course_id, cert_id, product_id, _type, lecture_id, sort)
  }

  componentWillReceiveProps(nextProps) {
    //打开评价
    if (this.props.openScore !== nextProps.open) {
      this.setState({modalVisible: nextProps.openScore})
    }

    // // 只允许竖屏
    Orientation.lockToPortrait();
    //进度和分类选择后刷新数据
    if (this.props.choosedCategoryID !== nextProps.choosedCategoryID || this.props.choosedProgressID !== nextProps.choosedProgressID) {

      const {course_id, cert_id, product_id} = nextProps
      this.props.getDetail(course_id, cert_id, product_id, 2, nextProps.choosedCategoryID, nextProps.choosedProgressID)
    }
    //返回刷新重新获取数据
    if (nextProps.refresh === true) {
      console.log(1)
      // Actions.refresh()
      const {course_id, cert_id, product_id, _type, lecture_id, sort} = this.props
      // this.props.refreshFalse()
      this.props.getDetail(course_id, cert_id, product_id, _type, lecture_id, sort)
    }
  }

//滚到顶部
  scrollTo() {
    console.log(platform)
    this._scrollView.scrollTo({x: 0, y: platform === 'android' ? 335 : 325, animated: false})
  }

  render() {
    return (
        <View>
          <StatusBar
              barStyle='dark-content'
          />
          {
            this.props._type !== 2 ?
                <ReviewModal {...this.props} modalVisible={this.state.modalVisible} close={()=>this.setState({modalVisible:false})} />
                : null
          }
          {
            this.props.course && (
                <ScrollView
                    ref={(scrollView) => {
                      this._scrollView = scrollView;
                    }}
                    style={{marginTop: 64, paddingBottom: 0}}
                    keyboardShouldPersistTaps={true}
                    canCancelContentTouches={this.props.categoryState ? false : true}
                >
                  <Image style={{width: global_width, height: 250,}} source={{uri: this.props.course.pic}}
                         resizeMode="contain"/>
                  <CourseTitle {...this.props.course} percent={this.props.percent}/>
                  {
                    renderIf(this.props._type === 2,
                        <ToolBar {...this.props} scrollTo={this.scrollTo.bind(this)}/>
                    )}
                  {
                    this.props.course.course_info.map(item =>
                        <CourseChapter
                            {...item}
                            product_id={this.props.product_id}
                            cert_id={this.props.cert_id}
                            course_id={this.props.course_id}
                            fetchExam={this.props.fetchExam}
                            toggle={this.props.toggleState}
                            key={item.course.id}
                            _type={this.props._type}
                        />)
                  }
                </ScrollView>)
          }
          {
            this.props.category &&
            renderIf(this.props.categoryState, <View style={styles.modal}>
                  <View style={{width: global_width * 0.5, alignItems: 'center'}}>
                    <View style={styles.triangle}/>
                    <View style={styles.categoryWrapper}>
                      <TouchableHighlight
                          onPress={() => {
                            this.props.chooseCategory(0)
                          }}>
                        <View style={styles.textWrapper}>
                          <Text style={styles.category}>
                            全部分类
                          </Text>
                        </View>
                      </TouchableHighlight>
                      {
                        this.props.category.map((category, i, all) =>
                            <TouchableHighlight underlayColor={'rgba(255,255,255,0.4)'} key={category.id} onPress={() => {
                              this.props.chooseCategory(category.id)
                            }}>
                              <View style={[styles.textWrapper, i === all.length - 1 ? styles.borderZero : null]}>
                                <Text style={styles.category}>
                                  {category.name}
                                </Text>
                              </View>
                            </TouchableHighlight>
                        )
                      }
                    </View>
                  </View>
                </View>
            )
          }
          {
            renderIf(this.props.progressState, <View style={[styles.modal, {alignItems: 'flex-end'}]}>
                  <View style={{width: global_width * 0.5, alignItems: 'center',}}>
                    <View style={styles.triangle}/>
                    <View style={styles.categoryWrapper}>
                      <TouchableHighlight underlayColor={'rgba(255,255,255,0.4)'} onPress={() => {
                        this.props.chooseProgress(0)
                      }}>
                        <View style={styles.textWrapper}>
                          <Text style={styles.category}>
                            默认
                          </Text>
                        </View>
                      </TouchableHighlight>
                      <TouchableHighlight underlayColor={'rgba(255,255,255,0.4)'} onPress={() => {
                        this.props.chooseProgress(1)
                      }}>
                        <View style={styles.textWrapper}>
                          <Text style={styles.category}>
                            进度降序
                            {"  "}
                            <FontAwesome name={ "long-arrow-down"} color="#aaa"/>
                          </Text>
                        </View>
                      </TouchableHighlight>
                      <TouchableHighlight underlayColor={'rgba(255,255,255,0.4)'} onPress={() => {
                        this.props.chooseProgress(2)
                      }}>
                        <View style={[styles.textWrapper, styles.borderZero]}>
                          <Text style={styles.category}>
                            进度升序
                            {"  "}
                            <FontAwesome name={ "long-arrow-up"} color="#aaa"/>
                          </Text>

                        </View>
                      </TouchableHighlight>
                    </View>
                  </View>
                </View>
            )
          }
          {
            renderIf(this.props.loading, <Loading />)
          }
        </View>
    )
  }
}

const styles = StyleSheet.create({
  innerWrapper: {backgroundColor: 'rgb(255,255,255)', borderRadius: 6, width: global_width * 0.85, paddingTop: 20,},
  wrapper: {backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', flex: 1,},
  icon: {position: 'absolute', right: 6, top: 6},
  title: {textAlign: 'center', paddingBottom: 25, fontSize: 18, lineHeight: 45, height: 45, color: '#157eda'},
  item: {width: 128, height: 79, margin: 8},
  categoryWrapper: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    width: global_width * 0.45,
    marginLeft: global_width * 0.02,
    borderRadius: 4,
    position: 'relative',
    top: -8,
  },
  modal: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 3,
    width: global_width,
    height: global_height - (platform === 'android' ? 122 : 110),
    position: 'absolute',
    bottom: 0,
  },
  category: {
    textAlign: 'center',
  },
  textWrapper: {
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    width: global_width * 0.45,
    height: 40,
    justifyContent: 'center',
  },
  borderZero: {
    borderBottomWidth: 0
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 15,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'white'
  },
})

const mapStateToProps = ({course, courseReview, category, common}) => {
  return {
    percent: course.percent,
    course: course.coursePackage,
    review: courseReview,
    category: category.category,
    categoryState: category.toggleCategory,
    progressState: category.toggleProgress,
    choosedCategoryID: category.choosedCategoryID,
    choosedCategoryName: category.choosedCategoryName,
    choosedProgressID: category.choosedProgressID,
    choosedProgressName: category.choosedProgressName,
    loading: common.loading,
    refresh: course.refresh,
  }
}

export default connect(mapStateToProps, {
  getDetail,
  addReview,
  toggleState,
  toggleCategory,
  toggleProgress,
  chooseCategory,
  fetchExam,
  chooseProgress,
  refreshFalse,
})(CourseDetail)
