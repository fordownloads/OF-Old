import { Theme } from "@material-ui/core";
import { makeStyles } from "../../components";

const drawerWidth = 300;

export const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
    },
    drawerContainer: {
        // Stops device list from shifting when scrollbar is visible
        marginRight: `calc(-1 * (${drawerWidth - 8}px - 100%))`,
        [theme.breakpoints.up('xs')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    drawerStickySearch: {
        background: 'var(--grey-1)',
        top: 0,
        position: 'sticky',
        zIndex: 1,
    },
    clearSearch: {
        marginRight: '5px',
        cursor: 'pointer'
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        backgroundColor: 'var(--orange-1)',
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
        alignItems: 'baseline'
    },
    menuButton: {
        marginRight: theme.spacing(0.5),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    header: {
        width: '100%',
        minHeight: '50px',
        height: '100%',
    },
    headerContent: {
        width: '100%',
        display: 'flex',
    },
    headerContentRight: {
        display: 'flex',
        alignItems: 'center'
    },
    brand: {
        fontFamily: 'Euclid',
        fontWeight: 500,
        fontSize: '1.1rem',
        lineHeight: '1rem',
    },
    recoverySmall: {
        fontWeight: 400,
        fontSize: '.8rem',
    },
    drawerPaper: {
        overflowX: 'hidden',
        width: `${drawerWidth}px`,
        boxShadow: '0 0 5px black'
    },
    routeContent: {
        flexGrow: 1,
        height: '100%',
        padding: theme.spacing(1),
        [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(3),
        },
        minHeight: 'calc(100vh - 112px)'
    },
    headerControls: {
        display: 'flex',
        alignItems: 'center'
    },
    listNotFound: {
        display: 'flex',
        textAlign: 'center',
        padding: theme.spacing(1)
    },
    formControl: {
        minWidth: 64,
        marginRight: '-8px',
        [theme.breakpoints.up('sm')]: {
            marginRight: '-16px',
        },
        marginLeft: theme.spacing(3),
        outline: 'none'
    },
    listItem: {
        borderLeft: '3px solid transparent'
    },
    listItemSelected: {
        borderLeft: '3px solid var(--orange-1)'
    },
    selectIcon: {
        fontSize: '20px',
        marginTop: '2px',
        color: 'white',
        transition: 'all .2s ease'
    }
}));
