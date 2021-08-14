import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


export default function SimpleModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [cars]=React.useState(props.cars);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const goTo = () => {
    window.location.replace('/vehiclemaintenance')
  };

  const body = (
    
        <div style={modalStyle} className={classes.paper}>
        <h2 id="simple-modal-title">Cars Details</h2>
        <p id="simple-modal-description">
          <table>
                  <th>Car Reg no.</th>
                  <th>Action</th>
            {cars.map((values) =>{
              if(values!=0){
                return(
                  <tr>
                  <th>{values}</th>
                  <th><Button onClick={goTo} variant="contained" color="secondary">Done</Button></th>
              </tr>
                )
              }

            })}
          </table>
        </p>
        
      </div>
    )

  

  return (
    <div>

      <Button onClick={handleOpen} variant="contained" color="secondary">View Cars</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
