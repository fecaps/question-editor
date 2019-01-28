import React from 'react';
import DEFINITIONS from '../../definitions';
import './UpsertRowLabel.css';

class UpsertRowLabel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      result: {},
      value: null
    };
  }

  render() {
    return (
      <td>
        <form onBlur={this.onBlur.bind(this)}>
          <input type="text"
            name="value"
            placeholder={ this.props.item || '-' }
            value={this.state.value}
            onChange={this.onChange.bind(this)}>
            </input>
          </form>
      </td>
    )
  }

  onChange(event) {
    this.setState({ value: event.target.value })
  }

  onBlur() {
    const ROUTE = DEFINITIONS.SERVER_HOST +
      '/rows/' + this.props.position + '/labels'

    fetch(ROUTE, {
        method: 'PUT',
        body: JSON.stringify({
          label: this.state.value
        }),
        headers:{
          'Content-Type': 'application/json'
        }
    })
      .then(res => res.json())
      .then(response => {
        this.setState({ isLoaded: true, result: response.result });
        window.location.reload();
      },
      error => {
        this.setState({ isLoaded: true, error });
      })
  }
}

export default UpsertRowLabel;
