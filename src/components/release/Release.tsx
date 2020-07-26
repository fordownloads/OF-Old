import { navigate, RouteComponentProps } from '@reach/router';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { apiGetRelease } from '../../apis';
import { usePreviousProps } from '../../hooks';
import { EReleaseType, IRelease } from '../../models';
import { GetSelectedLocale, StopEvent } from '../../utils';
import { ExpandMore, LabelImportantOutlinedIcon } from '../Icons';
import { LinkLocale } from '../Link-Locale';
import { LoadShimmer } from '../Load-Shimmer';
import {
    Accordion, AccordionDetails, AccordionSummary,
    Button, Divider, ListItem, MaterialList, Typography
} from '../React-Material';
import { Bugs } from './Bugs';
import { BuildHyperLink } from './Build-Hyperlink';
import { BuildNotes } from './Build-Notes';
import { ChangeLogs } from './Change-Logs';
import { Downloads } from './Downloads';
import { FileName } from './File-Name';
import { FileSize } from './File-Size';
import { useStylesRelease } from './helpers';
import { MD5 } from './MD5';

interface ReleaseProps extends RouteComponentProps {
    code?: string;
    version: string;
    type: EReleaseType;
    expanded?: boolean;
    onClick?: () => void;
    showAllBuild?: boolean;
    defaultExpanded?: boolean;
}

const Release: React.SFC<ReleaseProps> = props => {
    const { code, version, type, onClick,
        expanded, defaultExpanded, showAllBuild } = props;
    const classes = useStylesRelease();
    const locale = GetSelectedLocale();
    const prevProps = usePreviousProps({ code, version, type });
    const [release, setReleaseDetail] = React.useState<IRelease>({} as IRelease);
    const isDifferentDevice = code && release?.codename !== code;

    React.useEffect(() => {
        if (code && prevProps?.code !== code) {
            apiGetRelease(code, type, version)
                .then(data => setReleaseDetail(data))
                .catch(() => {
                    showAllBuild && navigate(`/${locale}/404`);
                });
        }
    }, [code, type, version, prevProps, locale, showAllBuild]);

    const _version = release?.version || version;
    const showLoader = Boolean(!release?.codename || isDifferentDevice);

    return (<>
        <Accordion
            expanded={expanded}
            className={classes.root}
            defaultExpanded={defaultExpanded}
            onChange={() => onClick && onClick()}
        >
            <AccordionSummary
                id={_version}
                expandIcon={<ExpandMore className={classes.icon} />}
                aria-controls={`${_version} [ ${release.date} ]`}
            >
                <div className={classes.summary}>
                    <Typography className={classes.version} >
                        <LabelImportantOutlinedIcon
                            fontSize="small"
                            className={classes.icon + ' ' + classes.iconM5}
                        />
                        {
                            !showLoader && (_version)
                        }

                        {/* Loading Placeholder */}
                        {
                            showLoader && <LoadShimmer />
                        }
                    </Typography>
                    <span onClick={StopEvent} >
                        {
                            release && <BuildHyperLink {...release} />
                        }
                        {
                            showAllBuild && (
                                <LinkLocale
                                    to={`/device/${code}`}
                                    className="link"
                                >
                                    <Button color="secondary">
                                        <FormattedMessage
                                            id="release.allBuild"
                                            defaultMessage="Show All Builds" />
                                    </Button>
                                </LinkLocale>
                            )
                        }
                    </span>

                </div>

            </AccordionSummary>

            <AccordionDetails className={classes.details} >
                <MaterialList component="nav" className={classes.list} >

                    <ListItem >
                        <FileName
                            release={release}
                            showLoader={showLoader}
                        />
                    </ListItem>

                    <Divider />

                    <ListItem >
                        <FileSize
                            release={release}
                            showLoader={showLoader}
                        />
                    </ListItem>

                    <Divider />

                    <ListItem >
                        <MD5
                            release={release}
                            showLoader={showLoader}
                        />
                    </ListItem>

                    <MaterialList
                        component="div"
                        className={classes.nestedList} >

                        <Downloads
                            release={release}
                            showLoader={showLoader}
                        />

                        {
                            release?.changelog &&
                            <ChangeLogs
                                release={release}
                                showLoader={showLoader}
                            />
                        }

                        {
                            release?.notes &&
                            <BuildNotes
                                release={release}
                                showLoader={showLoader}
                            />
                        }

                        {
                            release?.bugs &&
                            <Bugs
                                release={release}
                                showLoader={showLoader}
                            />
                        }
                    </MaterialList>

                </MaterialList>
            </AccordionDetails>
        </Accordion>

    </>);
}

export { Release };
