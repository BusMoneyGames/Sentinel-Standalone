import React from 'react';

class LoggingButton extends React.Component {
    state = {
        pollingCount: 0,
    };

    handleClick = () => {
      console.log('this is:', this);
      let res = window.ipcRenderer.sendSync('synchronous-message', "ping");
      console.log(res)
    }
    
    componentDidMount()
    {
        this.timer = setInterval(()=> this.tick(), 1000);

    }

    componentWillUnmount()
    {
        this.timer = null; // here...
    }
    tick = () => {

        this.setState({pollingCount: this.state.pollingCount + 1})
    }

    render() {
      return (
        <button onClick={this.handleClick}>
          Click me {this.state.pollingCount}
        </button>
      );
    }
  }

export default LoggingButton;