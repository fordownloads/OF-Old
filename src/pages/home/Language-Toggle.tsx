import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useLocation } from '@reach/router';
import { sortBy } from 'lodash';
import { apiGetAllLanguages } from '../../apis';
import { STORAGE } from '../../core';
import { ILanguage } from '../../models';
import { GetCurrentLocale } from '../../utils';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            maxWidth: 80,
            margin: theme.spacing(1),
            marginLeft: theme.spacing(2),
        },
    }),
);

const LanguageToggle: React.SFC = () => {
    const classes = useStyles();
    const { pathname } = useLocation();
    const currentLocale = GetCurrentLocale();
    const [langs, setLang] = React.useState([] as ILanguage[]);
    const [locale, setLocale] = React.useState(currentLocale);

    React.useLayoutEffect(() => {
        apiGetAllLanguages()
            .then(data => {
                setLang(sortBy(data, d => d.name));
            });
    }, []);

    const handleChange = ({ target: { value } }: any) => {
        setLocale(value);
        STORAGE.set('langof', value);
        const path = (pathname || '').split('/')
            .filter(Boolean).slice(1).join('/');
        const url = `/${value}${path ? `/${path}` : ''}`;
        window.location.replace(url);
    };

    function getEmoji() {
        const lang = (langs || []).find(f => f.code === locale);
        return lang ? lang.emoji : null;
    }

    return langs?.length ? (
        <FormControl
            size="small"
            variant="outlined"
            className={classes.formControl}
        >
            <Select
                displayEmpty
                value={locale}
                onChange={handleChange}
                renderValue={() => getEmoji()}
            >
                {
                    langs.map(m => (
                        <MenuItem
                            key={m.code}
                            value={m.code}
                        >
                            {m.emoji} {m.name}
                        </MenuItem>
                    ))
                }

            </Select>
        </FormControl>
    ) : null;
}

export { LanguageToggle };