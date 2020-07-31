import {
    DialogContent, DialogTitle, Button
} from '@material-ui/core';
import { RouteComponentProps } from '@reach/router';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { IRelease } from '../../models';
import { DescriptionOutlined } from '../Icons';
import { Modal } from '../Modal';
import { useStylesRelease } from './helpers';
import { SplitMsg } from './Split-Msg';

interface ChangeLogsProps extends RouteComponentProps {
    release: IRelease;
    showLoader?: boolean;
}

const ChangeLogs: React.SFC<ChangeLogsProps> = ({ release, showLoader }) => {
    const [showModal, toggleModal] = React.useState(false);
    const handleModal = () => toggleModal(!showModal);
    const classes = useStylesRelease();
    const Title = () => (
        <FormattedMessage
            id="release.changeLogs"
            defaultMessage="Change Logs" />
    );

    return (<>
        {showLoader ? ( <span className={"shimmer-button " + classes.outlinedButton}/> ) : (
            <Button variant="outlined"
                color="secondary"
                onClick={handleModal}
                className={classes.outlinedButton}
                startIcon={<DescriptionOutlined/>} >
                <Title />
            </Button>
        ) }

        <Modal
            showModal={showModal}
            toggleModal={handleModal}
        >
            <DialogTitle>
                <Title />
            </DialogTitle>
            <DialogContent dividers className="selectable">
                <SplitMsg msg={release.changelog} />
            </DialogContent>
        </Modal>
    </>)
}

export { ChangeLogs };
