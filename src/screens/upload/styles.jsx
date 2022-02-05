
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
    maxWidth: "300px"
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
      background: '#0AA7F7',
      textTransform: 'uppercase',
      color: '#fff',
      padding: '10px 12px',
      position: 'fixed',
      bottom: '0',
      right: '0',
      margin: '0px 20px 20px 0px',
      borderRadius: '50%',
      zIndex: '10',
      letterSpacing: '1px',
      boxShadow: '0px 0px 5px #0EF7F750',
      cursor: 'pointer',
      textDecoration: 'none',
      transition: 'all 0.5s ease-in-out',
      '&:hover': {
        transform: 'scale(1.1)',
      },
    },
  },
} );

export default styles;
