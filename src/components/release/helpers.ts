import { makeStyles, createStyles } from ".."; import { Theme } from "@material-ui/core";

export const useStylesRelease = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            backgroundColor: theme.palette.primary.main,
        },
        list: {
            width: '100%',
        },
        icon: {
            color: '#ddd'
        },
        iconM5: {
            marginRight: '5px'
        },
        version: {
            display: 'flex',
            alignItems: 'center'
        },
        details: {
            padding: '5px 10px 10px',
            userSelect: 'text'
        },
        nestedList: {
            display: 'flex',
            [theme.breakpoints.down('sm')]: {
                flexWrap: 'wrap'
            },
        },
        bug: {
            color: '#ff5e5e',
            borderColor: '#ff5e5e66',
            backgroundColor: '#ff5e5e11',
            '&:hover': {
                borderColor: '#ff5e5e',
            },
        },
        outlinedButton: {
            margin: '8px 0 8px 16px'
        },
        downloadButton: {
            margin: '8px 16px 8px 0'
        },
        summary: {
            width: '100%',
            display: 'flex',
            placeContent: 'space-between'
        }
    }),
);
