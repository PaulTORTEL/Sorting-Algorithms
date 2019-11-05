import React, { Component } from 'react';
import './viewport.css';
import { Container, Select, Button } from 'semantic-ui-react';
import ArrayService from '../../../services/array.service';
import Canvas from '../canvas/canvas';

class Viewport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      algorithm: '',
      arrayToSort: [],
      maxValue: -1,
      sortedArray: []
    };
    this.options = [
      { key: 'bubble', text: 'Bubble sort', value: 'bubble' },
      { key: 'merge', text: 'Merge sort', value: 'merge' },
      { key: 'quick', text: 'Quick sort', value: 'quick' }
    ];
  }

  handleChange = (e, { value }) => {
    this.setState({ algorithm: value });
  };

  handleClickSort = () => {
    const { arrayToSort } = this.state;
    const sortedArray = ArrayService.quickSort(arrayToSort);
    this.setState({ sortedArray });
  };

  handleClickNewArray = () => {
    const maxValue = 30;
    const items = 101;
    const generatedArray = ArrayService.generateArray(items, 1, maxValue);

    this.setState({
      arrayToSort: generatedArray,
      maxValue,
      sortedArray: []
    });
  };

  render() {
    const { sortedArray, arrayToSort } = this.state;
    const arrayToDisplay = sortedArray.length > 0 ? sortedArray : arrayToSort;

    return (
      <Container>
        <Button className="blue" onClick={this.handleClickNewArray}>
          New array
        </Button>
        <Select
          options={this.options}
          placeholder="Select the algorithm"
          onChange={this.handleChange}
          value={this.state.algorithm}
        />
        <Button className="green" onClick={this.handleClickSort}>
          Sort
        </Button>
        <Canvas
          arrayToDisplay={arrayToDisplay}
          maxValue={this.state.maxValue}
        />
      </Container>
    );
  }
}

export default Viewport;
