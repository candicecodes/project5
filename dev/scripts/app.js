import React from 'react';
import ReactDOM from 'react-dom';
import Donut from './donut';

const donuts = ['Sourcream Glazed', 'Honey Dip', 'Boston Cream'];

class App extends React.Component {
    render() {
      return (
        <div>
          {donuts.map(donut => {
            return (
              <Donut />
            )
          })}
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
