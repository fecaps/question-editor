import React, { Component } from 'react';
import Summary from
  './components/summary/Summary'
import QuestionEditionView from
  './components/question-edition/QuestionEditionView'
import Legend from
  './components/legend/Legend'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <section className="App-container">
          <div className="App-left-half">
            <QuestionEditionView></QuestionEditionView>
          </div>
          <div className="App-right-half">
            <Summary></Summary>
          </div>
          <div className="App-left-half">
            <Legend></Legend>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
