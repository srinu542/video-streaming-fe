import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';// Circular Progress component

const styles = () => ( {
  loader: {
    '& div': {
      margin: '0 auto ',
    },
    width: '100%',
    height: '100%',
    position: 'fixed',
    background: 'rgba(0,0,0,0.8)',
    zIndex: '9999',
    top: '0',
    left: '0',
    display: 'flex',
    alignItems: 'center',
  },
} );

const Pageloader = ( props ) => {
  const { classes } = props;

  return (
    <div className={ classes.loader }>
      <CircularProgress />
    </div>
  );
};

Pageloader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles( styles )( Pageloader );
