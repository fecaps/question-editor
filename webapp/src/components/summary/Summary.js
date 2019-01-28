import React from 'react';
import SummaryOption from './SummaryOption';
import './Summary.css';
import DEFINITIONS from '../../definitions'
const STATISTICS_ROUTE = `${DEFINITIONS.SERVER_HOST}/statistics`

class Summary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      result: {}
    };
  }

  componentDidMount() {
    fetch(STATISTICS_ROUTE)
      .then(res => res.json())
      .then(response => {
        this.setState({ isLoaded: true, result: response.result });
      },
      error => {
        this.setState({ isLoaded: true, error });
      })
  }

  render() {
    const { error, isLoaded, result } = this.state;

    if (error) {
      return <div>Statistics error: {error}</div>;
    }

    if (!isLoaded) {
      return <div>Loading statistics</div>;
    }

    return (
      <div>
        <h1>Question Summary View</h1>
        <div className="Summary-header">
          Summary
        </div>
        <div className="Summary-options">
          <SummaryOption
            label="Number of rows"
            value={`${result.amountOfRows || 0 }`}>
          </SummaryOption>

          <SummaryOption
            label="Number of columns"
            value={`${result.amountOfColumns || 0 }`}>
          </SummaryOption>

          <SummaryOption
            label="Number of images uploaded"
            value={`${result.amountOfImages || 0 }`}>
          </SummaryOption>

          <SummaryOption
            label="Longest row label"
            value={`${result.lengthOfLongestRowString || 0 }`}>
          </SummaryOption>

          <SummaryOption
            label="Longest column label"
            value={`${result.lengthOfLongestColumnString || 0 }`}>
          </SummaryOption>

          <SummaryOption
            label="Shortest row label"
            value={`${result.lengthOfShortestRowString || 0 }`}>
          </SummaryOption>

          <SummaryOption
            label="Shortest column label"
            value={`${result.lengthOfShortestColumnString || 0 }`}>
          </SummaryOption>
        </div>
      </div>
    );
  }
}

export default Summary;
