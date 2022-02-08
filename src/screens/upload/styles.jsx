
const styles = ( theme ) => ( {
  box: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  container: {
    padding: '20px',
    textAlign: 'center',
  },
  videoPreview: {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    marginTop: "50px",
    maxWidth: "280px"
  },
  videoPreviewBox: {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
  },
  video: { 
    marginBottom: "20px",
  },
  titleHeading: {
    fontWeight: "bold",
  }, 
  metedata: {
    marginBottom: "10px",
  },
   /* Title section style start */
  title: {
    fontSize: '25px',
    fontWeight: '600',
    '& a': {
      float: 'right',
      fontSize: '13px',      
      display: 'flex',
      alignItems: 'center',
      background: '#32BEA6',
      textTransform: 'uppercase',
      color: '#fff',
      padding: '10px 12px',
      position: 'fixed',
      bottom: '0',
      right: '0',
      margin: '0px 20px 20px 0px',
      borderRadius: '50px',
      zIndex: '10',
      letterSpacing: '1px',
      boxShadow: '0px 0px 5px #32BEA650',
      cursor: 'pointer',
      textDecoration: 'none',
      transition: 'all 0.5s ease-in-out',
      '& span':{
        paddingLeft: '5px',
        paddingTop: '3px',
      },
      '&:hover': {
        transform: 'scale(1.1)',
      },
    },
  },
  uploadBox: {
    textAlign: 'center',
    width: '280px',
    '& i': {
      marginTop: '10px',
      fontSize: '50px',
      color: '#d4d3d3',
    },
  },
  uploadBorder: {
    border: '2px dashed #d4d3d3',
    cursor: 'pointer',
    borderRadius: '10px',
  },
  /* Upload text Style */
  uploadBtn: {
    fontSize: '14px',
    marginTop: '10px',
    '& span': {
      display: 'inline-block',
      '& input': {
        display: 'none',
      },
      '& p': {
        margin: '0px',
        marginBottom: '10px',
        display: 'inline-block',
        color: '#4192cc',
        fontWeight: '600',
        fontFamily: 'sans-serif',
        cursor: 'pointer',
      },
    },
  },
} );

export default styles;
