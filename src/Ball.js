/* eslint-disable no-console */

import React, { Component } from 'react';
import {
  Animated,
  View,
} from 'react-native';

class Ball extends Component {
  // cwm:
  componentWillMount() {
    // instantiate a new position.
    // this is the starting position of the ball.
    // if I want to know where my ball is I can inspect
    // the ValueXY.
    this.position = new Animated.ValueXY(0,0); // we are actually saying { x: 0 y: 0 }
    // Animated.spring() is being used to change
    // the current position to the value we give it.
    // NOTE: it is changing the position over X amount of time.
    console.log(this.position); // {"x":207.21411816902008,"y":518.2512312243966}
    // Interesting that it does not match the value passed
    // Wonder if that has to do with the device & pixel ratio?
    Animated.spring(this.position, {
      toValue: { x: 200, y: 500 },
    }).start();
  }
  render() {
    // Whatever we wrap with Animated.View is what will
    // take on the animation characteristics we have built.
    // ONLY Animated.View can take in the position values NOT View.
    // properties are passed to 'style'
    return (
      <Animated.View style={this.position.getLayout()}>
        <View style={styles.ball} />
      </Animated.View>
    );
  }
}

const styles = {
  ball: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 30,
    borderColor: 'black',
  },
};

export default Ball;
