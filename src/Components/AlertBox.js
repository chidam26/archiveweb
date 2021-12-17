import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';


const AlertBox = ({ severity, message, clearError, title }) => {


  return (
    <div>
      <Alert severity={severity} onClose={clearError}>
        <AlertTitle>{title || 'Error'}</AlertTitle>
        {message}
      </Alert>
    </div>
  );
};

export default AlertBox;