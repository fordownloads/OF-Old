import React from 'react';
import { FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';

interface IProps {
    topicName: string | undefined;
    className?: string;
}
interface IState {
    subsState: number;
}

class Subscribe extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            subsState: -1
        };

        this.subscribe = this.subscribe.bind(this);
        this.unsubscribe = this.unsubscribe.bind(this);
    }
    
    componentDidMount() {
        this.setState({ subsState: 0 });
    }
    /*
    componentWillUnmount() {
    }
    */
    subscribe() {
        alert("Subscribed to " + this.props.topicName);
        this.setState({ subsState: 2 });
    };
    unsubscribe() {
        this.setState({ subsState: 0 });
        alert("Unsubscribed from " + this.props.topicName);
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