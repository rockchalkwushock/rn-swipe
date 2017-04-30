/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */

import React, { Component } from 'react';
import {
  Animated,
  LayoutAnimation,
  PanResponder,
  UIManager,
  View,
} from 'react-native';
import {
  rotateCard,
  SCREEN_WIDTH,
  SWIPE_MIN_THRESHOLD,
  SWIPE_OUT_DURATION,
} from './utils';

class Deck extends Component {
  // default values for component.
  static defaultProps = {
    onSwipeLeft: () => {},
    onSwipeRight: () => {},
  }
  constructor(props) {
    super(props);
    this.position = new Animated.ValueXY();
    // This is it's own self-contained object.
    // I will never use setState on this!!!
    // https://facebook.github.io/react-native/docs/panresponder.html
    this.panResponder = PanResponder.create({
      // Configurable callbacks:
      // Called whenever user puts finger on screen.
      onMoveShouldSetPanResponder: () => true,
      // Called whenever user moves finger on screen.
      onPanResponderMove: (event, gesture) => {
        this.position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      // Called whenever user removes finger from screen.
      onPanResponderRelease: (event, gesture) => {
        // amount of logic here can get unruly
        // use helper functions!!!
        if (gesture.dx > SWIPE_MIN_THRESHOLD) {
          this._forceSwipe('right');
        } else if (gesture.dx < -SWIPE_MIN_THRESHOLD) {
          this._forceSwipe('left');
        } else {
          this._resetPosition();
        }
      },
    });

    this.state = { index: 0 };
  }
  componentWillReceiveProps(nextProps) {
    // is this the exact same array
    // does not compare objects within the array.
    if (nextProps.data !== this.props.data) {
      this.setState({ index: 0 });
    }
  }
  componentWillUpdate() {
    // This long piece of logic is for Android devices.
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }
  _forceSwipe(direction) {
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(this.position, {
      toValue: { x , y: 0},
      duration: SWIPE_OUT_DURATION, // milliseconds for animation to happen
    }).start(() => { this._onSwipeComplete(direction)});
  }
  _getCardStyle() {
    return rotateCard(this.position, SCREEN_WIDTH)
  }
  _onSwipeComplete(direction) {
    const { data, onSwipeLeft, onSwipeRight } = this.props;
    const { index } = this.state;
    const card = data[index];
    direction === 'right' ? onSwipeRight(card) : onSwipeLeft(card);
    // Programmatically updating the position value (mutating)
    this.position.setValue({ x: 0, y: 0 });
    // Index the data array of cards.
    this.setState({ index: index + 1 });
  }
  _renderCards() {
    const { data, renderCard, noCards } = this.props;
    const { index } = this.state;
    if (index >= data.length) {
      return noCards();
    }
    return data.map((item, j) => {
      if (j < index) {
        return null;
      } else if (j === index) {
        return (
          <Animated.View
            key={j}
            style={[this._getCardStyle(), styles.cardStyle]}
            {...this.panResponder.panHandlers}
          >
            {renderCard(item)}
          </Animated.View>
        );
      }
      return (
        <Animated.View
          key={j}
          style={[styles.cardStyle, { top: 10 * (j - index)}]}
        >
          {renderCard(item)}
        </Animated.View>
      );
      // postfix map with reverse function to reverse order of array
      // due to position absolute.
    }).reverse();
  }
  _resetPosition() {
    Animated.spring(this.position, { toValue: { x: 0, y: 0 } }).start();
  }
  render() {
    return (
      <View>
        {this._renderCards()}
      </View>
    );
  }
}

const styles = {
  cardStyle: {
    position: 'absolute',
    width: SCREEN_WIDTH,
  }
}

export default Deck;
