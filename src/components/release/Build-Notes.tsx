import React from 'react';
import {
    DialogContent, DialogTitle, Button
} from '@material-ui/core';
import { RouteComponentProps } from '@reach/router';
import { FormattedMessage } from 'react-intl';
import { IRelease } from '../../models';
import { SpeakerNotesOutlined } from '../Icons';
import { LoadShimmer } from '../Load-Shimmer';
import { Modal } from '../Modal';
import { useStylesRelease } from './helpers';
import { SplitMsg } from './Split-Msg';

interface BuildNotesProps extends RouteComponentProps {
    release: IRelease;
    showLoader?: boolean;
}

const BuildNotes: React.SFC<BuildNotesProps> = ({ release, showLoader }) => {
    const classes = useStylesRelease();
    const [showModal, toggleModal] = React.useState(false);
    const handleModal = () => toggleModal(!showModal);
    const Title = () => (
        <FormattedMessage
            id="release.buildNotes"
            defaultMessage="Build Notes" />
    );

    return (<>
        {showLoader ? ( <span className={"shimmer-button " + classes.outlinedButton}/> ) : (
            <Button variant="outlined"
                color="secondary"
                onClick={handleModal}
                className={classes.outlinedButton}
                startIcon={<SpeakerNotesOutlined/>} >
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
                <SplitMsg msg={release.notes} />
            </DialogContent>
        </Modal>
    </>)

}

export { BuildNotes };
