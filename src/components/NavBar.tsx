import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function NavBar() {
  const { i18n } = useTranslation();
  const [ukButtonDisabled, setUkButtonDisabled] = useState(false);
  const [enButtonDisabled, setEnButtonDisabled] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    if (i18n.language === 'uk-UA') {
      setUkButtonDisabled(true);
      setEnButtonDisabled(false);
    }
    if (i18n.language === 'uk') {
      setEnButtonDisabled(true);
      setUkButtonDisabled(false);
    }
  };

  useEffect(() => {
    changeLanguage(window.navigator.language);
  }, []);

  return (
    <Box>
      <Button
        variant="outlined"
        size="small"
        onClick={() => changeLanguage('uk-UA')}
        disabled={ukButtonDisabled}
      >
        Укр
      </Button>
      <Button
        variant="outlined"
        size="small"
        onClick={() => changeLanguage('uk')}
        disabled={enButtonDisabled}
      >
        En
      </Button>
    </Box>
  );
}
