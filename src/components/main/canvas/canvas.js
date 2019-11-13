import React from 'react';
import './canvas.css';
import PropTypes from 'prop-types';

function Canvas(props) {
  const { maxValue, highlightedItems, arrayToDisplay, colors } = props;
  const nbOfItems = arrayToDisplay.length;

  const arrayToRender = arrayToDisplay.map((element, i) => {
    let color = colors.default;
    if (Object.keys(highlightedItems).length > 0) {
      const { fixedLower, fixedUpper, analyzed } = highlightedItems;

      if (i >= fixedLower && i <= fixedUpper) {
        color = colors.fixedColor;
      } else if (analyzed.find(el => el.index === i) !== undefined) {
        color = colors.analyzedColor;
      }
    }

    const itemStyle = {
      width: `${800 / nbOfItems - 5}px`,
      height: (element * /* this.calcHeight() */ 500) / maxValue,
      backgroundColor: color
    };

    return <div style={itemStyle} key={i} />;
  });

  return <div id="canvas">{arrayToRender}</div>;
}

Canvas.propTypes = {
  arrayToDisplay: PropTypes.arrayOf(PropTypes.number).isRequired,
  maxValue: PropTypes.number.isRequired,
  highlightedItems: PropTypes.objectOf(PropTypes.array).isRequired,
  colors: PropTypes.objectOf(PropTypes.string).isRequired
};

export default Canvas;
