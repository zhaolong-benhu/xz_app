import {
  Dimensions,
  AlertIOS,
  ToastAndroid,
  Platform
} from 'react-native'

const global_width = Dimensions.get('window').width; //full width
const global_height = Dimensions.get('window').height; //full height

export {
    global_width,
    global_height
};
