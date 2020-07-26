import { DialogContent, DialogTitle } from '@material-ui/core';
import React from "react";
import { FormattedMessage } from 'react-intl';
import { IRelease } from '../../models';
import { CopyToClipboard, GetSelectedLocale, StopEvent } from '../../utils';
import { HyperLink, IconButton } from "../Icons";
import { Modal } from '../Modal';

export const BuildHyperLink = (release: IRelease) => {
    const locale = GetSelectedLocale();
    const [modal, setModal] = React.useState(false);
    const toggleModal = () => setModal(!modal);
    const url = `${window.location.origin}/${locale}/build/${release.codename}/${release.build_type}/${release.version}`;
    
    function onCopyClick(e: any) {
        StopEvent(e);
        toggleModal();
        CopyToClipboard(url);
    }

    return (
        <>
            <IconButton onClick={onCopyClick} color="primary" style={{color: "white", margin: "-12px 0"}} >
                <HyperLink fontSize="small" />
            </IconButton>
            <Modal
                showModal={modal}
                toggleModal={toggleModal}
            >
                <DialogTitle>
                    <FormattedMessage
                        id="copy.info"
                        defaultMessage="Info" />
                </DialogTitle>
                <DialogContent dividers>
                    <FormattedMessage
                        id="release.copy"
                        defaultMessage="Link copied to clipboard!" />
                    <br />
                    <a className="link orange selectable" href={url} target="_blank" rel="noopener nofollow noreferrer" >
                        {url}
                    </a>
                </DialogContent>
            </Modal>
        </>
    );
}
