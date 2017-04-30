# RN-Swipe

Stephen Grider React-Native tutorial on animation.

## My Notes

Questions to ask when performing any animation:

> 1. _Where is the item right now?_
> 1. _Where is the element moving to?_
> 1. _Which element are we moving?_

Should use `Animated.View` for performing this.

Animation is not handled via `state` or `this.setState()`.

Animation is completely separate of the component's `state`.

### Component Hierarchy

`<Ball />` --- `Animated.ValueXY()` ---> `<Animated.View />`

### Component Lifecycle

1. Ball + Animated.View rendered.
1. View inspects its props...finds animated value.
1. AnimatedXY starts changing.
1. View sees updated value from AnimatedXY.
1. View updates its styling.

If you ever believe you will be working with **gestures** use `<Animated/>`!

## Demo

Demo was filmed using [`kap`](https://getkap.co) & iOS emulator on iPhone 6s running iOS 10.3.

![demo](https://github.com/rockchalkwushock/rn-swipe/blob/master/demo/iPhone6s.gif "Demo")
