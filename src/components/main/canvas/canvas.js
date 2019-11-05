import React from 'react';
import './canvas.css';

function Canvas(props) {
  const nbOfItems = props.arrayToDisplay.length;
  const maxValue = props.maxValue;

  const arrayToDisplay = props.arrayToDisplay.map((element, i) => {
    const itemStyle = {
      width: 800 / nbOfItems - 5 + 'px',
      height: (element * /*this.calcHeight()*/ 500) / maxValue,
      backgroundColor: 'black'
    };

    return <div style={itemStyle} key={i}></div>;
  });

  if (arrayToDisplay.length > 0) {
    const itemStyle = {
      width: 800 / nbOfItems - 5 + 'px',
      height: arrayToDisplay[2].props.style.height,
      backgroundColor: 'blue'
    };
    arrayToDisplay[2] = <div key={2} style={itemStyle}></div>;
  }

  return <div id="canvas">{arrayToDisplay}</div>;
}

export default Canvas;
