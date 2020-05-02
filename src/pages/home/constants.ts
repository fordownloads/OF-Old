import { Theme } from "@material-ui/core";
import { makeStyles } from "../../components";

const drawerWidth = 300;

export const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        // height: '100%',
        // minHeight: 'calc(100vh - 50px)'
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
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerContentRight: {
        display: 'flex',
        alignItems: 'center'
    },
    brand: {
        fontFamily: 'Euclid',
        fontWeight: 500,
        fontSize: '15pt'
    },
    recoverySmall: {
        fontFamily: 'Euclid',
        fontWeight: 400,
        fontSize: '10pt'
    },
    drawerPaper: {
        width: drawerWidth,
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
}));
