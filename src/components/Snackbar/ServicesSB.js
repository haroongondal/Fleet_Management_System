import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

export default function PositionedSnackbar() {
  const [state, setState] = React.useState({
    open: true,
    vertical: 'top',
    horizontal: 'left',
  });

  const { vertical, horizontal, open } = state;



  const handleClose = () => {
    setState({ ...state, open: false });
  };


  return (
    <div>
      {/* {buttons} */}
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="Car Services Outdated"
        key={vertical + horizontal}
      />
    </div>
  );
}
