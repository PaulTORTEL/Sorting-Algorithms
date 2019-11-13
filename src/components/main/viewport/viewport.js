import React, { Component } from 'react';
import './viewport.css';
import { Container, Select, Button } from 'semantic-ui-react';
import ArrayService from '../../../services/array.service';
import Canvas from '../canvas/canvas';

class Viewport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      algorithm: 'bubble',
      arrayToSort: [],
      maxValue: -1,
      sortedArray: [],
      nbOfItems: 3,
      highlightedItems: {},
      speed: 100,
      colors: {
        fixedColor: 'purple',
        analyzedColor: 'green',
        default: 'black'
      }
    };
    this.options = [
      { key: 'bubble', text: 'Bubble sort', value: 'bubble' },
      { key: 'merge', text: 'Merge sort', value: 'merge' },
      { key: 'quick', text: 'Quick sort', value: 'quick' }
    ];
  }

  handleChangeAlgo = (e, { value }) => {
    this.setState({ algorithm: value });
  };

  sleep = time => {
    return new Promise(resolve => setTimeout(resolve, time));
  };

  extractBubblyResult = async resultSteps => {
    let fixedLower = -1;
    let fixedUpper = -1;

    for (const step of resultSteps) {
      const highlightedItems = {};

      if (step.item2.isFixed) {
        fixedLower = step.item2.index;
        if (fixedUpper === -1) {
          fixedUpper = fixedLower;
        }
      }

      if (fixedLower !== -1) {
        highlightedItems.fixedLower = fixedLower;
        highlightedItems.fixedUpper = fixedUpper;
      }

      highlightedItems.analyzed = [step.item1, step.item2];

      this.setState({
        sortedArray: step.currArray,
        highlightedItems
      });
      await this.sleep(this.state.speed);
    }
    const { length } = this.state.sortedArray;
    const highlightedItems = {
      fixedLower: 0,
      fixedUpper: length - 1
    };

    this.setState({
      highlightedItems
    });
  };

  handleClickSort = () => {
    const { arrayToSort } = this.state;

    let resultSteps = [];

    switch (this.state.algorithm) {
      case 'bubble':
        resultSteps = ArrayService.bubbleSort(arrayToSort);
        this.extractBubblyResult(resultSteps);
        break;
      case 'merge':
        resultSteps = ArrayService.mergeSort(arrayToSort);
        break;
      case 'quick':
        resultSteps = ArrayService.quickSort(arrayToSort);
        break;
      default:
        resultSteps = ArrayService.mergeSort(arrayToSort);
        break;
    }
  };

  handleClickNewArray = () => {
    const maxValue = 100;
    const items = this.state.nbOfItems;

    const generatedArray = ArrayService.generateArray(items, 1, maxValue);

    this.setState({
      arrayToSort: generatedArray,
      maxValue,
      sortedArray: [],
      highlightedItems: {}
    });
  };

  handleChangeRange = e => {
    this.setState({ nbOfItems: e.target.value });
  };

  handleChangeSpeed = e => {
    this.setState({ speed: e.target.value });
  };

  render() {
    const {
      sortedArray,
      arrayToSort,
      nbOfItems,
      highlightedItems,
      colors,
      speed
    } = this.state;
    const arrayToDisplay = sortedArray.length > 0 ? sortedArray : arrayToSort;
    return (
      <Container>
        <input
          type="range"
          min={3}
          max={100}
          value={nbOfItems}
          onChange={this.handleChangeRange}
        />
        <Button className="blue" onClick={this.handleClickNewArray}>
          New array
        </Button>
        <Select
          options={this.options}
          placeholder="Select the algorithm"
          onChange={this.handleChangeAlgo}
          value={this.state.algorithm}
        />
        <Button className="green" onClick={this.handleClickSort}>
          Sort
        </Button>
        <input
          type="range"
          min={1}
          max={500}
          value={speed}
          onChange={this.handleChangeSpeed}
        />
        <Canvas
          arrayToDisplay={arrayToDisplay}
          maxValue={this.state.maxValue}
          highlightedItems={highlightedItems}
          colors={colors}
        />
      </Container>
    );
  }
}

export default Viewport;
