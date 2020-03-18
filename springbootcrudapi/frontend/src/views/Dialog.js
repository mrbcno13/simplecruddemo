import React from 'react'
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';

import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';

import CloseIcon from '@material-ui/icons/Close';

const SlideTransition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} mountOnEnter unmountOnExit/>;
});

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    textDecoration: 'none',
    borderRadius: '0px',
    backgroundColor: theme.palette.background.paper,
  },
  margin: {
    margin: theme.spacing(1),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noPadding: {
    padding: theme.spacing(0),
  },
  maximizeOnMobile: {
    height: '55%',
    width: '50%',
    [theme.breakpoints.down('xs')]: {
      height: '100%',
      width: '100%',
    },
  }
}));

function Dialog({children, open=false, title, handleClose, maximizeOnMobile}) {
  let classes = useStyles();
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <SlideTransition in={open}>
        <div className={clsx(classes.paper, classes.noPadding, maximizeOnMobile ? classes.maximizeOnMobile : '')}>
          <Grid container spacing={0}>
            <Grid item xs={12} id="transition-modal-title">
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Typography className={classes.margin} align="left" variant="subtitle2" component="h1">{title}</Typography>
                </Grid>
                <Grid item>
                  <IconButton className={classes.button} aria-label="close" size='small' onClick={handleClose}>
                    <CloseIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              {children}
            </Grid>
          </Grid>
        </div>
      </SlideTransition>
    </Modal>
  )
}

export default React.memo(Dialog)
