import React from 'react';
import DEFINITIONS from '../../definitions';
import './QuestionEditionView.css';
import NewColumnButton from './NewColumnButton';
import NewRowButton from './NewRowButton';
import UpsertColumnLabel from './UpsertColumnLabel';
import UpsertRowLabel from './UpsertRowLabel';
import AddColumnImageButton from './AddColumnImageButton';
import AddRowImageButton from './AddRowImageButton';

const DATA_ROUTE = `${DEFINITIONS.SERVER_HOST}`;

class QuestionEditionView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      result: {
        rows: [],
        columns: [],
        columnsLabel: [],
        rowsLabel: [],
        columnsImage: [],
        rowsImage: []
      }
    };
  }

  componentDidMount() {
    fetch(DATA_ROUTE)
      .then(res => res.json())
      .then(response => {
        this.setState({ isLoaded: true, result: response.result });
      },
      error => {
        this.setState({ isLoaded: true, error });
      })
  }

  render() {
    return (
      <div>
        <h1>Question Edition View</h1>
        <table className="QuestionEditorView-table">
          <tbody>
            <tr>
              <th>#</th>
              <th>#</th>
              {this.state.result.columnsLabel.map((_, index) => {
                return (
                  <AddColumnImageButton
                    item={this.state.result.columns[index]}>
                  </AddColumnImageButton>
                );
              })}
              <NewColumnButton></NewColumnButton>
            </tr>
            <tr>
              <td>#</td>
              <td>#</td>
              {this.state.result.columnsLabel.map((item, index) => {
                return (
                  <UpsertColumnLabel
                    item={item}
                    position={this.state.result.columns[index]}>
                  </UpsertColumnLabel>
                );
              })}
            </tr>
            {this.state.result.rows.map((item, index) => {
              return (
                <tr>
                  <AddRowImageButton
                    item={this.state.result.rows[index]}>
                  </AddRowImageButton>
                  <UpsertRowLabel
                    item={this.state.result.rowsLabel[index]}
                    position={item}>
                  </UpsertRowLabel>
                  {this.state.result.columns.map(_ => {
                    return (
                      <td>
                        <input type="radio"></input>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            <tr>
              <NewRowButton></NewRowButton>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default QuestionEditionView;
