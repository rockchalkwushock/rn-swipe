/**
 * Function for returning rotation animation.
 *
 * @param {Object} pos position object
 * @param {Number} width device screen width
 * @returns {Object} Object containing updated rotation values.
 */
const rotateCard = (pos, width) => {
  const rotate = createRotation(pos, width);
  return {
    ...pos.getLayout(),
    transform: [{ rotate }],
  };
};

/**
 * Function for processing interpolation of movement.
 *
 * @param {Object} { x } x direction movement object.
 * @param {Number} w device screen width.
 * @returns {Object} Animation object containing interpolation values.
 */
const createRotation = ({ x }, w) => (
  x.interpolate({
    inputRange: [-w * 2, 0, w * 2],
    outputRange: ['-120deg', '0deg', '120deg'],
  })
);

export default rotateCard;
