/**
 * Created by Same on 11/7/17.
 */
import { PropTypes } from 'react';
import { requireNativeComponent, View,NativeModules} from 'react-native';

var live = {
    propTypes: {
        ...View.propTypes,
        url: PropTypes.string,
        barrage:PropTypes.string,
    },
};

module.exports = requireNativeComponent('RCTLive', live);
