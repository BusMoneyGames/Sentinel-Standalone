import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup'

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
        <ButtonGroup size="small" orientation="vertical" color="primary"
        variant="text"
        >
        <Button variant="contained" onClick={this.handleClick}>
          Click me {this.state.pollingCount}
        </Button>

        <Button variant="contained"onClick={this.handleClick}>
          Second One {this.state.pollingCount}
        </Button>
        

        </ButtonGroup>
      );
    }
  }

export default LoggingButton;