import { Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_MIN_THRESHOLD  = SCREEN_WIDTH * 0.25;
const SWIPE_OUT_DURATION = 250;

export {
  SCREEN_WIDTH,
  SWIPE_MIN_THRESHOLD,
  SWIPE_OUT_DURATION,
};
