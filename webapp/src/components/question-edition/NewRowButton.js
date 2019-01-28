import React from 'react';
import DEFINITIONS from '../../definitions'
const CREATE_ROWS_ROUTE = `${DEFINITIONS.SERVER_HOST}/rows`

class NewRowButton extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      result: []
    };
  }

  render() {
    return (
      <td>
        <form onSubmit={this.onSubmit}>
          <button>
            <img className="QuestionEditorView-img"
              src={require('../../assets/plus_green.png')}
              alt="Images"/>
          </button>
        </form>
      </td>
    );
  }

  onSubmit () {
    fetch(CREATE_ROWS_ROUTE, { method: 'POST' })
      .then(res => res.json())
      .then(response => {
        this.setState({ isLoaded: true, result: response.result });
      },
      error => {
        this.setState({ isLoaded: true, error });
      })
  }
}

export default NewRowButton;
