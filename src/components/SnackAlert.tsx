import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

interface SAProps {
    icon: any;
    message: string;
    showAlert: boolean;
    toggleAlert?: () => void;
}

const SnackAlert: React.SFC<SAProps> = ({ showAlert, icon, message, toggleAlert }) => {
  const [open, setOpen] = React.useState(showAlert);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason !== 'clickaway') {
        toggleAlert && toggleAlert();
        setOpen(false);
    }
  };

  return (
      <Snackbar open={open || showAlert} autoHideDuration={6000} onClose={handleClose}>
        <Alert elevation={6} variant="filled" onClose={handleClose} severity={icon}>{message}</Alert>
      </Snackbar>
  );
}

export { SnackAlert };
