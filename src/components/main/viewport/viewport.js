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
      highlightedItems: [],
      speed: 250
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
    const fixedColor = 'purple';
    const analyzedColor = 'green';
    let firstFixedItemIndex = -1;

    for (const step of resultSteps) {
      const highlightedItems = [];

      // TODO: big refacto needed to
      step.item1.color = analyzedColor;
      step.item2.color = analyzedColor;

      if (step.item1.isFixed) {
        firstFixedItemIndex = step.item1.index;
      } else if (step.item2.isFixed) {
        firstFixedItemIndex = step.item2.index;
      }

      highlightedItems.push(step.item1, step.item2);

      if (firstFixedItemIndex > -1) {
        for (let i = firstFixedItemIndex; i < step.currArray.length; i += 1) {
          highlightedItems.push({
            index: i,
            color: fixedColor
          });
        }
      }

      this.setState({
        sortedArray: step.currArray,
        highlightedItems
      });
      await this.sleep(this.state.speed);
    }

    const highlightedItems = [];
    for (let i = 0; i < resultSteps.length; i += 1) {
      highlightedItems.push({
        index: i,
        color: fixedColor
      });
    }
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
      highlightedItems: []
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
          max={1000}
          value={speed}
          onChange={this.handleChangeSpeed}
        />
        <Canvas
          arrayToDisplay={arrayToDisplay}
          maxValue={this.state.maxValue}
          highlightedItems={highlightedItems}
        />
      </Container>
    );
  }
}

export default Viewport;
