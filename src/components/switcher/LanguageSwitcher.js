import {FormControl, MenuItem, Select} from "@mui/material";
import {useTranslation} from "react-i18next";

const LanguageSwitcher = () => {
    const {i18n} = useTranslation();

    const handleChange = (event) => i18n.changeLanguage(event.target.value);

    return (
        <FormControl size="small">
            <Select value={i18n.language}
                    onChange={handleChange}
                    sx={{fontSize: '0.875rem'}}>
                <MenuItem value='en'
                          selected={i18n.language === 'en'}
                          sx={{fontSize: '0.875rem'}}>EN</MenuItem>
                <MenuItem value='lt'
                          selected={i18n.language === 'lt'}
                          sx={{fontSize: '0.875rem'}}>LT</MenuItem>
            </Select>
        </FormControl>
    );
}

export default LanguageSwitcher;