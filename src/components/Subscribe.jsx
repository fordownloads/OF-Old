import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import IconButton from '@material-ui/core/IconButton';
import { messaging, push_server } from "../init-fcm";
import { SnackAlert } from './SnackAlert';
import { Menu } from './Menu';
import MenuItem from '@material-ui/core/MenuItem';

/* all notifications logic by fordownloads */

let tokenStr = null, prevTopic = null;

const pushSupported = ("Notification" in window) && messaging !== null;

class Subscribe extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            subsState: -1
        };

        this.intl = this.props.intl;
        this.subscribe = this.subscribe.bind(this);
        this.unsubscribe = this.unsubscribe.bind(this);
        this.deleteToken = this.deleteToken.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        if (prevTopic !== props.topicName) {
            prevTopic = props.topicName;            
            try {
                const topics = JSON.parse(window.localStorage.getItem('push_topics'));
                return { subsState:
                    (topics !== null && topics !== undefined && topics.hasOwnProperty(props.topicName) === true) ?
                    2 : 0 };
            } catch {
                return { subsState: 0 };
            }
        }
        return null;
    }

    shouldComponentUpdate = () => pushSupported;

    snackRef = (obj) => this.handleShow = obj && obj.handleShow;

    menuRef = (obj) => { 
        this.menuShow =  obj && obj.handleShow;
        this.menuClose =  obj && obj.handleClose;
    };

    componentDidMount = () => prevTopic = null;

    showAlert = (icon, msg, params = {}) => this.handleShow(icon, this.intl.formatMessage(msg, params));

    storage(tok, top) {
        window.localStorage.setItem('push_last_token', tok);
        window.localStorage.setItem('push_topics', JSON.stringify(top));
    }

    subscribe = async () => {
        this.setState({ subsState: 1 });
        await messaging.requestPermission().catch((err) => console.log("Unable to get permission to notify: ", err));

        if (Notification.permission !== 'granted') {
            this.showAlert("info", {id: 'push.alerts.check'});
            this.setState({ subsState: 0 });
            return;
        }

        tokenStr = await messaging.getToken();

        if (tokenStr === null) { //failed to get token
            this.showAlert("error", {id: 'push.alerts.e_token'});
            this.setState({ subsState: 0 });
        } else {
            fetch(push_server+'/?action=sub&token='+tokenStr+'&topic='+this.props.topicName, { method: 'GET' })
            .then(async res => {
              const topicsSubbed = await res.json();
              if (res.status !== 200 || topicsSubbed === null) {
                this.showAlert("error", {id: 'push.alerts.e_sub'});
                this.setState({ subsState: 0 });
                return;
              }

              this.storage(tokenStr, topicsSubbed);
              this.showAlert("success", {id: 'push.alerts.subscribed'}, {device: this.props.topicName });
              this.setState({ subsState: 2 });

            })
            .catch(err => {
              console.log(err);
              this.showAlert("error", {id: 'push.alerts.e_server'});
              this.setState({ subsState: 0 });
            })
        }
    }
    
    unsubscribe = async () => {
        this.setState({ subsState: 1 });

        const currentToken = await messaging.getToken();

        if (currentToken === null) { //failed to get token
            this.showAlert("error", {id: 'push.alerts.e_token'});
            this.setState({ subsState: 2 });
        } else {

            fetch(push_server+'/?action=unsub&token='+currentToken+'&topic='+this.props.topicName, { method: 'GET' })
            .then(async res => {
              const topicsSubbed = await res.json();
              if (res.status !== 200 || topicsSubbed === null) {
                this.showAlert("error", {id: 'push.alerts.e_unsub'});
                this.setState({ subsState: 2 });
                return;
              }

              this.storage(currentToken, topicsSubbed);
              this.showAlert("success", {id: 'push.alerts.unsubscribed'}, {device: this.props.topicName });
              this.setState({ subsState: 0 });

            })
            .catch(err => {
              console.log(err);
              this.showAlert("error", {id: 'push.alerts.e_server'});
              this.setState({ subsState: 2 });
            })
        
        }
    }
    
    deleteToken = async () => {
        this.setState({ subsState: 1 });
        
        messaging.getToken().then((currentToken) => {
            messaging.deleteToken(currentToken).then(() => {
              this.setState({ subsState: 0 });
              this.storage(null, {});
              this.showAlert("success", {id: 'push.alerts.deleted'});
            }).catch((err) => {
              console.log(err);
              this.showAlert("error", {id: 'push.alerts.e_unsub'});
            });
          }).catch((err) => {
            console.log(err);
            this.showAlert("error", {id: 'push.alerts.e_token'});
          });
          
        this.menuClose();
    }

    renderButton(){
        switch (this.state.subsState) {
            case 0: return (
            <Button variant="contained" disableElevation
                    color="secondary"
                    onClick={this.subscribe}
                    startIcon={<NotificationsActiveIcon />} >

                    <FormattedMessage
                        id="push.subscribe"
                        defaultMessage="Subscribe to {device} updates"
                        values={{ device: this.props.topicName }} />
            </Button>
            );
            case 1: return (
                <Button variant="outlined"
                        color="secondary"
                        startIcon={<CircularProgress size="18px" color="secondary" />} >

                        <FormattedMessage
                            id="push.registration"
                            defaultMessage="Registration..." />
                </Button>
            );
            case 2: return (
                <Button variant="outlined"
                        color="secondary"
                        onClick={this.unsubscribe}
                        startIcon={<NotificationsOffIcon />} >

                        <FormattedMessage
                            id="push.unsubscribe"
                            defaultMessage="Unsubscribe"
                            values={{ device: this.props.topicName }}  />
                </Button>
            );
            default: return (<span className="shimmer shimmer-button"/>);
        }
    }
    
    render() {
        if (pushSupported)
            return (<>
                <div className="placeholder-button">
                    {this.renderButton()}
                    { this.state.subsState !== -1 && (
                        <IconButton color="secondary" aria-label="Delete token" style={{ marginLeft: '8px' }} onClick={this.menuShow}>
                            <DeleteOutlineOutlinedIcon fontSize='small' />
                        </IconButton>
                    ) }
                </div>
                <SnackAlert ref={this.snackRef}/>
                <Menu ref={this.menuRef}>
                    <MenuItem onClick={this.deleteToken}>
                        <DeleteOutlineOutlinedIcon fontSize='small' className="iconMenu" />
                        <FormattedMessage
                                id="push.deleteConfirm"
                                defaultMessage="Unsubscribe from all updates" />
                    </MenuItem>
                </Menu>
            </>);
        return(null);
    }
  }

export default injectIntl(Subscribe);