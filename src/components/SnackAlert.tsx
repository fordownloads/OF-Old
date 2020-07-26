import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { isMobile } from '../utils';
import Slide from '@material-ui/core/Slide';
import Grow from '@material-ui/core/Grow';

interface IState {
    icon: any;
    message: string;
    show: boolean;
}

class SnackAlert extends React.Component<null, IState> {
  constructor(props: null, context: any){
      super(props, context);
      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.state = {
          show: false,
          icon: "error",
          message: "error"
      }
  }

  handleShow(pIcon: any, pMessage: string) {
    this.setState({ show: true, icon: pIcon, message: pMessage })
  }

  handleClose(event?: React.SyntheticEvent, reason?: string){
    if (reason !== 'clickaway')
      this.setState({ show: false });
  }

  render(){
    return (
        <Snackbar open={this.state.show} autoHideDuration={4000} onClose={this.handleClose}
          TransitionComponent={isMobile ? Slide : Grow} key={this.state.message}>

          <Alert style={isMobile ? {width: '100vw', margin: '8px'} : {minWidth: '256px', margin: '24px'}} 
                 elevation={16} variant="filled" severity={this.state.icon}>
                 {this.state.message}
          </Alert>
          
        </Snackbar>
    );
  }
}

export { SnackAlert };
