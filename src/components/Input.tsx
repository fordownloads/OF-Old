import React from 'react';
import { createStyles, InputAdornment, makeStyles, TextField, Theme, TextFieldProps } from '@material-ui/core';

export interface InputProps {
    id?: string;
    label: string;
    startIcon?: JSX.Element;
    endIcon?: JSX.Element;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: theme.spacing(2),
        },
    }),
);

const Input: React.SFC<TextFieldProps & InputProps> = ({ id, label, startIcon, endIcon, ...rest }) => {
    const classes = useStyles();
    return (
        <TextField
            label={label}
            id={id || label}
            className={classes.root}
            {...rest}
            InputProps={{
                startAdornment: startIcon && (
                    <InputAdornment position="start">
                        {startIcon}
                    </InputAdornment>
                ),
                endAdornment: endIcon && (
                    <InputAdornment position="end">
                        {endIcon}
                    </InputAdornment>
                ),
            }}
        />
    );
}

export { Input };
