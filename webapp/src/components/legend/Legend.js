import React from 'react';
import './Legend.css';

class Legend extends React.Component {
  render() {
    return (
      <div>
        <h1>Legend</h1>
        <ul>
          <li className="Legend-items">
            <button>
              <img className="QuestionEditorView-img"
                src={require('../../assets/plus_green.png')}
                alt="Images"/>
              </button>  Add row/columns
          </li>
          <li className="Legend-items">
            <button>
              <img className="QuestionEditorView-img"
                src={require('../../assets/plus_black.png')}
                alt="Images"/>
            </button>  Add image
          </li>
        </ul>
      </div>
    );
  }
}

export default Legend;
