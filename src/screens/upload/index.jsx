import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import compose from 'recompose/compose';
import axios from 'axios';
import styles from './styles';
import Pageloader from '../loader';
import { Link } from 'react-router-dom';
import { Button, Paper} from '@material-ui/core';
import { StyledDropZone } from 'react-drop-zone'
import 'react-drop-zone/dist/styles.css'
import HomeIcon from '@mui/icons-material/Home';
import Header from '../header'

// Read Service url from env file
const API_URL = "http://localhost:3030";

const UploadVideo = ( props ) => {
  const { classes, history } = props;

  const [errorMessage, setErrorMessage] = React.useState( '' );
  const [message, setMessage] = React.useState( '' );
  const [loading, setLoading] = React.useState( false );
  const [video, setVideo] = React.useState( undefined );
  const [file, setFile] = React.useState();

  const dropVideo = async ( file ) => {
    setVideo( undefined );
    setErrorMessage( undefined );
    const videoo = file;
    const readFile = new FileReader();
    setFile(file)
    if ( !videoo ) return;
    if ( videoo.size >= 30000000 ) {
      setErrorMessage( 'File size must be less than 30MB.' );
    } else {
      await readFile.readAsDataURL( videoo );
      readFile.onload = async ( file ) => {
        videoo.source = file.target.result;
        setVideo( {
          title: videoo.name,
          sources: [videoo.source],
          size: videoo.size ,
          type: videoo.type,
        } );
      };
    }
  };
  
  // Upload video Once selected file
  const uploadVideo = async ( file ) => {
    if ( file !== undefined ) {
      const fileData = file;
      const filename = fileData.name;
      const parts = filename.split( '.' );
      const extension = parts[parts.length - 1];
      const fileExtensions = ['mp4', 'avi', 'mov', 'mpg', '3gp', '3g2', 'ogv', 'mkv', 'wmv', 'webm', 'flv'];
      if ( fileExtensions.indexOf( extension.toLowerCase() ) === -1 ) { // Checking file type
        setErrorMessage( 'Sorry, this file type is not permitted. You can only upload video files' );
      } else {
        const filesize = fileData.size;
        const videoSize = filesize / 1024 / 1024;
        if ( videoSize <= 100 ) { // Checking File size
          setLoading( true );
          const data = new FormData();
          data.append( 'video', fileData );
          // Uplaod video api
          await axios.post( `${API_URL}/uploadVideo`, data )
            .then( ( res ) => {
              setLoading( false );
              setMessage('File Uploaded Success.');
              history.push( '/' );
            } ).catch( () => {
              setLoading( false );
              setErrorMessage( 'Something went wrong, please try after sometime' );
            } );
        } else {
          setErrorMessage( 'Make sure your video file is not exceeding 100 MB and try to upload again.' );
        }
      }
    }
  };
  return (
    <div className={classes.box}>
      <Header title={"Upload"}/>
      <Paper className={classes.videoPreview} elevation={3}>
        { loading && <Pageloader/>}
        {
          ( errorMessage && (
          <Typography variant="body1">
            {' '}
            { errorMessage }
            {' '}
          </Typography>
          ) )
        }
        <label
          htmlFor="contained-button-file"
        >
          <StyledDropZone 
            accept="video/*"
            onDrop={dropVideo}
            label={video !== undefined && video.name !== undefined ? video.name : 'Click or drop your file here'}
          />
        </label>
        {' '}
        {
          ( video && (
            <div className={classes.videoPreviewBox}>
              <div className={classes.metedata}>
                <Typography>
                  <Typography className={classes.titleHeading} component="span">Name: </Typography>
                  <span>{video.title }</span>
                </Typography>
                <Typography>
                  <Typography className={classes.titleHeading} component="span">Size: </Typography>
                  <span>
                    { (video.size / 1000000 ).toFixed(2) }
                    {' '}
                    MB.
                  </span>
                </Typography>
                <Typography>
                  <Typography className={classes.titleHeading} component="span">Type: </Typography>
                  <span>{video.type }</span>
                </Typography>
                {
                  ( message && (
                  <Typography variant="caption">
                    {' '}
                    { message }
                    {' '}
                  </Typography>
                  ) )
                }
              </div>
              <video autoPlay muted className={classes.video} controls>
                <track />
                <source src={video.sources[0]} />
              </video>
              <Button type="submit" variant="contained" color="primary" onClick={() => uploadVideo(file)}>Upload</Button>
            </div>
          ) )
        }
      </Paper>
      <Typography className={ classes.title } variant="h2" component="h2">
        <Link to="/" title="home page link">
          <HomeIcon/>
        </Link>
      </Typography>
    </div>
  );
};

// Checking prop types for component
UploadVideo.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const enhance = compose(
  withStyles( styles ),
  withRouter,
);

export default enhance( UploadVideo );
