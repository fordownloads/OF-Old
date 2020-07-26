import React from 'react';
import {
    Button, CircularProgress, DialogContent,
    DialogTitle
} from '@material-ui/core';
import { RouteComponentProps } from '@reach/router';
import { FormattedMessage } from 'react-intl';
import { Modal, PoweredBy } from '..';
import { IRelease } from '../../models';
import { Donations } from '../Donation';
import { GetAppIconOutlined, LaunchIcon } from '../Icons';
import { LoadShimmer } from '../Load-Shimmer';
import { OpenOutside } from '../Open-Outside';
import { useStylesRelease } from './helpers';

interface DownloadsProps extends RouteComponentProps {
    release: IRelease;
    showLoader?: boolean;
}

const Downloads: React.SFC<DownloadsProps> = ({ release, showLoader }) => {
    let tmoDownload: NodeJS.Timeout;
    const classes = useStylesRelease();
    const [showModal, toggleModal] = React.useState(false);
    const [tmoDirectLink, toggleTmoDirectLink] = React.useState(false);
    const handleModal = () => {
        clearTimeout(tmoDownload);
        toggleTmoDirectLink(false);
        toggleModal(!showModal);
    };

    const Title = () => (
        <FormattedMessage
            id="release.download"
            defaultMessage="Downloads" />
    );

    if (showModal) {
        tmoDownload = setTimeout(() => toggleTmoDirectLink(true), 2500);
    }

    return release ? (<>
        {showLoader ? ( <span className={"shimmer-button " + classes.outlinedButton}/> ) : (
            <Button variant="contained" disableElevation
                color="secondary"
                onClick={handleModal}
                className={classes.outlinedButton}
                startIcon={<GetAppIconOutlined/>} >
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
            <DialogContent dividers>
                {
                    !tmoDirectLink && (
                        <Button
                            variant="outlined"
                            color="secondary"
                            className={classes.downloadButton}
                            startIcon={<CircularProgress size="18px" color="secondary" />} >
                            <FormattedMessage
                                id="modal.fetchLink"
                                defaultMessage="Fetching Links" />
                        </Button>
                    )
                }
                {
                    tmoDirectLink && (<>
                        <Button
                            color="secondary"
                            variant="contained" disableElevation
                            className={classes.downloadButton}
                            startIcon={<GetAppIconOutlined />} >
                            <OpenOutside
                                className="link no-hover inheritColor"
                                href={release.direct_url || release.url} >
                                <FormattedMessage
                                    id="modal.directLink"
                                    defaultMessage="Direct Link"
                                />
                            </OpenOutside>
                        </Button>

                        {
                            release?.sf?.url && (<>
                                <Button
                                    color="secondary"
                                    variant="outlined" disableElevation
                                    className={classes.downloadButton}
                                    startIcon={<LaunchIcon />} >
                                    <OpenOutside
                                        href={release?.sf?.url}
                                        className="link no-hover inheritColor"
                                    >
                                        <FormattedMessage
                                            id="modal.mirrorLink"
                                            defaultMessage="Mirror Link"
                                        />
                                    </OpenOutside>

                                </Button>
                            </>)
                        }
                    </>)
                }
                <br />
                <div className="links-in-dwld">
                    <PoweredBy />
                    <Donations className="link flexd v-center" />
                </div>
            </DialogContent>
        </Modal>
    </>
    ) : null;

}

export { Downloads };
