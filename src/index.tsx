import render from './about.js';
import './style.css'
import React from "react";
import ReactDOM from "react-dom";

interface State {
  name: string
}
interface Props {
  name: string
}

class HelloMessage extends React.Component<Props, State> {
  render() {
    return (
      <div>
        Hello {this.props.name}
      </div>
    );
  }
}

ReactDOM.render(
  <HelloMessage name="Taylor" />,
  document.getElementById('app')
);
  
// const x = async () => await fetch('http://localhost:8080');
// x().then(res => console.log(res));