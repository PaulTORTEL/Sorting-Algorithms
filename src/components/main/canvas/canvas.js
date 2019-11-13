import React from 'react';
import './canvas.css';

function Canvas(props) {
  const nbOfItems = props.arrayToDisplay.length;
  const { maxValue, highlightedItems } = props;

  const arrayToDisplay = props.arrayToDisplay.map((element, i) => {
    const item = highlightedItems.find(el => {
      return el.index === i;
    });

    const itemStyle = {
      width: `${800 / nbOfItems - 5}px`,
      height: (element * /* this.calcHeight() */ 500) / maxValue,
      backgroundColor: item ? item.color : 'black'
    };

    return <div style={itemStyle} key={i} />;
  });

  return <div id="canvas">{arrayToDisplay}</div>;
}

export default Canvas;
