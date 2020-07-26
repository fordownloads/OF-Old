import React from 'react';
import { DialogContent, DialogTitle, Button } from '@material-ui/core';
import { RouteComponentProps } from '@reach/router';
import { FormattedMessage } from 'react-intl';
import { IRelease } from '../../models';
import { BugReportIcon } from '../Icons';
import { Modal } from '../Modal';
import { useStylesRelease } from './helpers';
import { SplitMsg } from './Split-Msg';

interface BugsProps extends RouteComponentProps {
    release: IRelease;
    showLoader?: boolean;
}

const Bugs: React.SFC<BugsProps> = ({ release, showLoader }) => {
    const classes = useStylesRelease();
    const [showModal, toggleModal] = React.useState(false);
    const handleModal = () => toggleModal(!showModal);
    const Title = () => (
        <FormattedMessage
            id="release.bugs"
            defaultMessage="Bugs" />
    );

    return release?.bugs ? (<>
        {showLoader ? ( <span className={"shimmer-button " + classes.outlinedButton}/> ) : (
            <Button variant="outlined"
                color="secondary"
                onClick={handleModal}
                className={classes.outlinedButton + ' ' + classes.bug}
                startIcon={<BugReportIcon/>} >
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
                <SplitMsg msg={release.bugs} />
            </DialogContent>
        </Modal>
    </>
    ) : null;

}

export { Bugs };
