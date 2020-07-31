import React from 'react';
import { navigate, useLocation } from '@reach/router';
import { sortBy } from 'lodash';
import { apiGetAllLanguages } from '../../apis';
import { FormControl, MenuItem, Select } from '../../components';
import { STORAGE } from '../../core';
import { ILanguage } from '../../models';
import { GetSelectedLocale } from '../../utils';
import { useStyles } from './style';
import KeyboardArrowDownRoundedIcon from '@material-ui/icons/KeyboardArrowDownRounded';

const LanguageToggle: React.SFC = () => {
    const classes = useStyles();
    const { pathname } = useLocation();
    const currentLocale = GetSelectedLocale();
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
        navigate(url);
    };

    function getEmoji() {
        const lang = langs?.find(f => f.code === locale);
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
                value={locale} IconComponent={KeyboardArrowDownRoundedIcon}
                onChange={handleChange}
                classes={{ icon: classes.selectIcon }}
                renderValue={() => getEmoji()}
            >
                {
                    langs.map(m => (
                        <MenuItem
                            key={m.code}
                            value={m.code}
                            className={classes.listItem}
                            classes={{ selected: classes.listItemSelected }}
                        >
                            {m.emoji} &nbsp;&nbsp; {m.name}
                        </MenuItem>
                    ))
                }

            </Select>
        </FormControl>
    ) : null;
}

export { LanguageToggle };
