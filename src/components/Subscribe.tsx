import React from 'react';
import { FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
import { messaging } from "../init-fcm";

interface IProps {
    topicName: string | undefined;
    className?: string;
}

interface IState {
    subsState: number;
}

let tokenStr : string | null = null;

const registerPushListener = () =>
  navigator.serviceWorker.addEventListener("message", ({ data }) => {
  const noty = data.firebaseMessaging.payload.notification;
  console.log(noty);
  new Notification(noty.title, noty);
  }
);

class Subscribe extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            subsState: -1
        };

        this.subscribe = this.subscribe.bind(this);
        this.unsubscribe = this.unsubscribe.bind(this);
    }
    
    async componentDidMount() {
        this.setState({ subsState: -1 });
        if (await messaging.getToken() === window.localStorage.getItem('push_last_token') && window.localStorage.getItem('push_is_subscribed') === '1') {
            this.setState({ subsState: 2 });
        } else {
            this.setState({ subsState: 0 });
        }
    }

    /*
    componentWillUnmount() {
    }
    */

    subscribe = async (): Promise<void> => {
        messaging.requestPermission()
            .catch(function(err) {
                console.log("Unable to get permission to notify.", err);
                return null;
            });
        this.setState({ subsState: 1 });
        if (Notification.permission !== 'granted') {
            alert("Check your browser notification settings");
            this.setState({ subsState: 0 });
            return;
        }
        tokenStr = await messaging.getToken();
        if (tokenStr === null) {
            alert("Error while getting token");
            this.setState({ subsState: 0 });
        } else {
            registerPushListener();
            
            fetch('https://iid.googleapis.com/iid/v1/'+tokenStr+'/rel/topics/'+this.props.topicName, {
              method: 'POST',
              headers: new Headers({
                'Authorization': 'key=server-key'
              })
            }).then(response => {
              if (response.status < 200 || response.status >= 400) {
                console.log('Error subscribing to topic: '+response.status + ' - ' + response.text());
                this.setState({ subsState: 0 });
                return;
              }
              console.log('Subscribed to "'+tokenStr+'"');
              window.localStorage.setItem('push_is_subscribed', '1');
              window.localStorage.setItem('push_last_token', tokenStr as string);
              window.localStorage.setItem('push_topic', this.props.topicName as string);
  
              prompt("Subscribed to " + this.props.topicName + "\nYour token: ", tokenStr as string);
              this.setState({ subsState: 2 });
            }).catch(error => {
              console.error(error);
              this.setState({ subsState: 0 });
              return;
            })
        }
    }
    
    unsubscribe() {
        messaging.getToken().then((currentToken) => {
            messaging.deleteToken(currentToken).then(() => {
              console.log('Token deleted.');
              this.setState({ subsState: 0 });
              window.localStorage.setItem('push_is_subscribed', '0');
              window.localStorage.setItem('push_last_token', '0');
              window.localStorage.setItem('push_topic', '0');
              alert("Your token is deleted");
            }).catch((err) => {
              console.log('Unable to delete token. ', err);
            });
          }).catch((err) => {
            console.log('Error retrieving Instance ID token. ', err);
          });
    };

    render() {
        switch (this.state.subsState) {
            case 0: return (
            <Button variant="contained"
                    color="secondary"
                    onClick={this.subscribe}
                    className={this.props.className} >

                <NotificationsActiveIcon fontSize="small" />

                &nbsp;&nbsp;&nbsp;&nbsp;

                <FormattedMessage
                    id="notifications.subscribe"
                    defaultMessage="Subscribe" />
                {" to " + this.props.topicName}
            </Button>
            );
            case 1: return (
                <Button variant="outlined"
                        color="secondary"
                        className={this.props.className} >
        
                    <CircularProgress
                        size="18px"
                        color="secondary" />
        
                    &nbsp;&nbsp;&nbsp;&nbsp;
        
                    <FormattedMessage
                        id="notifications.registration"
                        defaultMessage="Registration..." />
                </Button>
            );
            case 2: return (
                <Button variant="outlined"
                        color="secondary"
                        onClick={this.unsubscribe}
                        className={this.props.className} >

                    <NotificationsOffIcon fontSize="small" />
        
                    &nbsp;&nbsp;&nbsp;&nbsp;
        
                    <FormattedMessage
                        id="notifications.unsubscribe"
                        defaultMessage="Unsubscribe" />
                </Button>
            );
            default: return (<span className="shimmer shimmer-button"/>);
        }
    }
  }

export { Subscribe };