import React from 'react';
import './SummaryOption.css';

class SummaryOption extends React.Component {
  render() {
    return (
      <div className="SummaryOption-item">
        {this.props.label}: {this.props.value}
      </div>
    );
  }
}

export default SummaryOption;
