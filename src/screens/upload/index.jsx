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

  const inputFile = React.useRef( null );

  const triggerInput = () => {
    inputFile.current.click();
  };


  const dropVideo = async ( e ) => {
    const file = e.target.files[0];
    setVideo( undefined );
    setErrorMessage( undefined );
    const videoo = file;
    const readFile = new FileReader();
    setFile(file)
    if ( file.size >= ( 30 * 1024 * 1024 ) ) {
      setErrorMessage( 'File size below 30MB accepted.' );
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
    }
  };
  return (
    <div className={classes.box}>
      <Header title={"Upload"}/>
      <Paper className={classes.videoPreview} elevation={3}>
        { loading && <Pageloader/>}
        {
          ( errorMessage && (
          <Typography variant="body1" data-testid="error">
            {' '}
            { errorMessage }
            {' '}
          </Typography>
          ) )
        }

        <div className={ `${classes.uploadBox} ${errorMessage !== '' && classes.marginTop}` }>
          <div onClick={ triggerInput } className={ classes.uploadBorder }>
            <i className="las la-file-video" />
            <div className={ classes.uploadBtn }>
              {/* Trigger file input when click on below span */}
              <span role="button" aria-hidden="true">
                <input data-testid="uploadFile" accept="video/*" type="file" ref={ inputFile } onChange={ dropVideo } />
                <p>Click to browse the video</p>
              </span>
            </div>
          </div>
        </div>
        
        {' '}
        {
          ( video && (
            <div className={classes.videoPreviewBox} data-testid="video-preview">
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
              <Button type="submit" variant="contained" className = {classes.Button} data-testid="upload-file-api" onClick={() => uploadVideo(file)}>Upload</Button>
            </div>
          ) )
        }
      </Paper>
      <Typography className={ classes.title } variant="h2" component="h2">
        <Link data-testid = "home-page-link" to="/" title="home page link">
          <HomeIcon/>
          <span>Home</span>
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
