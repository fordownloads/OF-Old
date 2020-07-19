import {
    Accordion, AccordionDetails, AccordionSummary, createStyles,
    List, ListItem, ListItemIcon, ListItemText, makeStyles, Theme, Typography
} from '@material-ui/core';
import { navigate, RouteComponentProps } from '@reach/router';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { apiGetDeviceByCode } from '../apis';
import { IDevice } from '../models';
import { GetSelectedLocale } from '../utils';
import {
    ExpandMore, PermDeviceInformationOutlinedIcon,
    PermIdentityOutlinedIcon, ReportProblemOutlined
} from './Icons';
import { LoadShimmer } from './Load-Shimmer';
import { Subscribe } from './Subscribe';

interface DeviceInfoProps extends RouteComponentProps {
    code?: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        details: {
            padding: '5px 10px 10px',
        },
        list: {
            display: 'flex',
            width: '100%',
            [theme.breakpoints.down('sm')]: {
                flexDirection: 'column'
            },
        },
        root: {
            width: '100%',
            backgroundColor: '#2a2a2a',
            userSelect: 'text'
        },
        icon: {
            color: '#ddd',
        },
        notmaintained: {
            color: '#ffc459',
        },
        notmaintainedIcon: {
            fontSize: '1rem',
            marginBottom: '-0.2rem',
            marginRight: '2px',
        },
        iconM5: {
            color: '#ddd',
            marginRight: '5px'
        },
        flexText: {
            display: 'flex',
            alignItems: 'center'
        },
        subsButton: {
            margin: '0 0 24px 24px',
        },
    }),
);

const DeviceInfo: React.SFC<DeviceInfoProps> = ({ code }) => {
    const classes = useStyles();
    const locale = GetSelectedLocale();
    const [device, setDeviceDetail] = useState<IDevice>({} as IDevice);
    const isDifferentDevice = code && device.codename !== code;

    useEffect(() => {
        if (code && isDifferentDevice) {
            apiGetDeviceByCode(code)
                .then(data => {
                    setDeviceDetail(data);
                })
                .catch(() => {
                    navigate(`/${locale}/404`);
                });
        }
    }, [code, locale, isDifferentDevice]);

    const maintainer = device.maintainer?.name;
    let maintainPrimaryText: JSX.Element | null = null;
    let maintainSecondaryText: JSX.Element | null = null;

    switch (device.maintained) {

        case 1:
            maintainPrimaryText = (
                <FormattedMessage
                    id="maintain.status.maintained"
                    defaultMessage="Maintained"
                />
            );

            maintainSecondaryText = (
                <FormattedMessage
                    id="maintain.by.current"
                    defaultMessage="Maintainer: {maintainer}"
                    values={{ maintainer }}
                />
            );
            break;

        case 2:
            maintainPrimaryText = (
                <FormattedMessage
                    id="maintain.status.maintainedWithoutDevice"
                    defaultMessage="Maintained without having device in hands"
                />
            );

            maintainSecondaryText = (
                <FormattedMessage
                    id="maintain.by.current"
                    defaultMessage="Maintainer: {maintainer}"
                    values={{ maintainer }}
                />
            );

            break;

        case 3:
            maintainPrimaryText = (
                <span className={classes.notmaintained} >
                    <ReportProblemOutlined className={classes.notmaintainedIcon} />&nbsp;
                    <FormattedMessage
                        id="maintain.status.notMaintained"
                        defaultMessage="Not Maintained!"
                    />
                </span>
            );

            maintainSecondaryText = (
                <FormattedMessage
                    id="maintain.by.previous"
                    defaultMessage="Previous Maintainer: {maintainer}"
                    values={{ maintainer: maintainer || 'None' }}
                />
            );
            break;

        default: break;
    }

    const showLoader = !device?.fullname || isDifferentDevice;

    return (
        <Accordion
            defaultExpanded
            className={classes.root}
        >

            <AccordionSummary
                id="device-info"
                expandIcon={<ExpandMore className={classes.icon} />}
                aria-controls="device-info-content"
            >
                <Typography
                    component="div"
                    className="shimmer-wrapper"
                >
                    {
                        !showLoader && (<>
                            {device.fullname + " "}
                            <FormattedMessage
                                id="device.info"
                                defaultMessage="(Device Info)" />
                        </>)
                    }

                    {/* Loading Placeholder */}
                    {
                        showLoader && <LoadShimmer />
                    }
                </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.details} >
                <List
                    component="ul"
                    className={classes.list}
                >
                    <ListItem >
                        <ListItemIcon>
                            <PermDeviceInformationOutlinedIcon className={classes.icon} />
                        </ListItemIcon>

                        {
                            !showLoader && (<>
                                <ListItemText
                                    primary={device.oem}
                                    secondary={device.codename}
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

                    </ListItem>
                    <ListItem >
                        <ListItemIcon>
                            <PermIdentityOutlinedIcon className={classes.icon} />
                        </ListItemIcon>

                        {
                            !showLoader && (<>
                                <ListItemText
                                    primary={maintainPrimaryText}
                                    secondary={maintainSecondaryText}
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
                    </ListItem>
                </List>
            </AccordionDetails>
            <Subscribe topicName={code} className={classes.subsButton} />
        </Accordion>
    );
}

export { DeviceInfo };
