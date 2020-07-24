import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

interface IProps {
    icon: any;
    message: string;
    showAlert: boolean;
    toggleAlert?: () => void;
}
interface IState {
    icon: any;
    message: string;
    show: boolean;
}

class SnackAlert extends React.Component<IProps, IState> {
  constructor(props: IProps, context: any){
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
    if (reason !== 'clickaway') {
      this.setState({ show: false });
    }
  }

  render(){
    return (
        <Snackbar open={this.state.show} autoHideDuration={4000} onClose={this.handleClose}>
          <Alert style={{minWidth: '256px'}} elevation={6} variant="filled" severity={this.state.icon}>
            {this.state.message}
          </Alert>
        </Snackbar>
    );
  }
}

export { SnackAlert };
