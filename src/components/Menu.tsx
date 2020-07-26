import React from 'react';
import MuiMenu from '@material-ui/core/Menu';

interface IProps {
  children: any;
}
interface IState {
  place: any;
  show: boolean;
}

class Menu extends React.Component<IProps, IState> {
  constructor(props: IProps, context: any){
      super(props, context);
      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.state = {
          show: false,
          place: null
      }
  }

  handleShow = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({
      show: true,
      place: event.currentTarget
    });
  };

  handleClose = () => {
    this.setState({
      show: false,
      place: null
    });
  };

  render() {
    return (
        <MuiMenu
          anchorEl={this.state.place}
          keepMounted
          open={this.state.show}
          onClose={this.handleClose}
        >
          {this.props.children}
        </MuiMenu>
    );
  }
}

export { Menu };