import React from 'react';
import { ListItemIcon, ListItemText } from '@material-ui/core';
import { RouteComponentProps } from '@reach/router';
import { IRelease } from '../../models';
import { ArchiveOutlined } from '../Icons';
import { LoadShimmer } from '../Load-Shimmer';
import { useStylesRelease } from './helpers';
import { GetCurrentLocale } from '../../utils';

interface FileNameProps extends RouteComponentProps {
    release: IRelease;
    showLoader?: boolean;
}

const FileName: React.SFC<FileNameProps> = ({ release, showLoader }) => {
    const classes = useStylesRelease();

    const releaseDate = new Date(Date.parse(release.date)).toLocaleDateString(GetCurrentLocale(), {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour:"numeric",
        minute: "numeric",
        second: "numeric"
    });

    return release ? (<>

        <ListItemIcon>
            <ArchiveOutlined className={classes.icon} />
        </ListItemIcon>
        {
            !showLoader && (<>
                <ListItemText
                    primary={release.file_name}
                    secondary={releaseDate.charAt(0).toUpperCase() + releaseDate.slice(1)}
                />
            </>)
        }

        {/* Loading Placeholder */}
        {
            showLoader && (<>
                <ListItemText
                    primary={<LoadShimmer />}
                    secondary={<LoadShimmer />}
                />
            </>)
        }
    </>
    ) : null;

}

export { FileName };
