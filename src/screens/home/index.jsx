import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Typography, IconButton, Dialog, DialogActions, DialogContent, Container
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import styles from './styles';
import playIcon from '../../assets/images/play-icon.png';
import Pageloader from '../loader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CloseIcon from '@mui/icons-material/Close';
import { Paper } from '@mui/material';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import Header from '../header'

const API_URL = "http://localhost:3030";

const ListVideos = ( props ) => {
  const { classes } = props;

  const [videoList, setVideoList] = React.useState();
  const [videLink, setVideoLink] = React.useState( '' );
  const [loading, setLoading] = React.useState( true );

  useEffect( () => {
    // GET request For videos list
    axios.get( `${API_URL}/getVideosThumnail` )
      .then( ( response ) => {
        setLoading( false );
        setVideoList( response.data );
      } )
  }, [] );

  // Play Video in dialog box
  const openVideo = ( filename ) => {
    setVideoLink( {name: filename, link: `${API_URL}/uploads/videos/${filename}`} );
  };

  return (
    <Typography variant="body1" component="div">
      {loading === true && <Pageloader />}
      <div>
        <div className={ `${classes.title} ${classes.box}` }>
          <Header title="Home"/>
          <Link data-testid = "upload-page-link" to="/upload" title="upload video page link"> 
            <DriveFolderUploadIcon/>
            <span>Upload</span>
          </Link>
        </div>
        <Container>
          {videoList !== undefined && (
            videoList.length > 0 ? (
              <Grid container display="flex" justifyContent="center" alignItems="center"
                data-testid="video-list" spacing={{ xs: 2, md: 5 }} columns={{ xs: 2, sm: 8, md: 12 }}>
                {
                  videoList.map( ( video, index ) => (
                    <Grid data-testid="video-list-card" item xs={2} sm={4} md={3.8} key={index}>
                      <Paper sx={{ maxWidth: 345, borderRadius: 2 }} className={classes.card} elevation={5} >
                        <CardContent onClick={ () => openVideo( video.convertedname ) } className={ classes.listBox }>
                          <CardMedia
                            component="img"
                            height="180"
                            image={`${API_URL}/uploads/thumbnails/${video.thumbnail_name}`}
                            alt="thumbnails"
                            className={ classes.img}
                          />
                          <div className={ classes.playHover }>
                            <img src={ playIcon } alt="play video icon" />
                          </div>
                        </CardContent>
                        <Typography className={ classes.videoTitle }>{video.thumbnail_name.replace(/_|.png/g, " ")}</Typography>
                      </Paper>
                    </Grid>
                  ) )
                }
              </Grid>
            ) : (
              <div className={ classes.noData } data-testid="no-data">
                <span><i className="las la-exclamation-triangle" /></span>
                <p>Sorry no videos are available at this time.</p>
              </div>
            )
          )}
        </Container>
      </div>
      {/* Play video popup */}
      <Dialog
        open={ videLink !== undefined && videLink !== '' }
        onClose={ () => { setVideoLink( '' ); } }
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        className={ classes.videoDialog }
        data-testid="video-popup"
        scroll="body"
      >
        <DialogActions>
          <IconButton onClick={ () => { setVideoLink( '' ); } }>
            <CloseIcon/>
          </IconButton>
        </DialogActions>

        <DialogContent>
          <video controls autoPlay>
            <source src={ videLink.link.toString()}/>
          </video>
        </DialogContent>
      </Dialog>
    </Typography>
  );
};

// Checking prop types for component
ListVideos.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles( styles )( ListVideos );
