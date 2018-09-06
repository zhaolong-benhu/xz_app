/**
 * Created by qzy on 20/03/2017.
 * File description:
 */
import React, { Component } from 'react';
import { Platform,BackAndroid,ToastAndroid } from 'react-native';
import Router from './Router';
import { Provider } from 'react-redux';
import reducers from './reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import devTools from 'remote-redux-devtools';
let enhancer;
function confirgureStore() {
	if (__DEV__ && Platform.OS === 'ios') {
		enhancer = compose(
			applyMiddleware(ReduxThunk),
			devTools({
				name: Platform.OS,
				hostname: 'localhost',
				port: 5678,
			}),
		);
	} else {
		enhancer = compose(
			applyMiddleware(ReduxThunk),
		);
	}

	return createStore(reducers, enhancer);
}
var ga = this.ga = null;
class App extends Component {
	componentWillMount() {
			if (Platform.OS === 'android') {
			 BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
		 }
	}
	onBackAndroid = () => {
    if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
      //最近2秒内按过back键，可以退出应用。
    	BackAndroid.exitApp();
    }
    this.lastBackPressed = Date.now();
		ToastAndroid.show('再按一次退出应用',ToastAndroid.SHORT)
    return true;
  };
	render() {
		const store = confirgureStore();
		return (
			<Provider store={store}>
				<Router />
			</Provider>
		)
	}
}

export default App;
