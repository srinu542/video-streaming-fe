import React from 'react';
import compose from 'recompose/compose';
import playIcon from '../../assets/images/play-icon.png';
import Typography from '@material-ui/core/Typography';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

function Header(props) {
  const { classes, title } = props;
  return (
    <Typography className={ classes.heading } data-testid = "header" variant="h2" component="h2">
      <div className={ classes.playHover }>
        <img src={ playIcon } alt="play video icon" />
      </div>
      <span>Videos Streaming - {title}</span>
    </Typography>
  ); 
}


Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

const enhance = compose(
  withStyles( styles ),
);

export default enhance( Header );
