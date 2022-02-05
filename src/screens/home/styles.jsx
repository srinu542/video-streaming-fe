const styles = ( ) => ( {
  box: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  container: {
    maxWidth: '1170px',
    padding: '0 15px',
    margin: '0px auto',
  },
  uploadBody: {
    padding: '60px 0px',
    background: '#e2f1ed',
    height: '100vh',
  },
  containerDiv: {
    background: '#fff',
    padding: '30px',
    boxShadow: '0px 3px 10px rgb(0 0 0 / 10%)',
    borderRadius: '10px',
  },
  /* Title section style start */
  title: {
    fontSize: '25px',
    marginBottom: '20px',
    marginLeft: '20px',
    fontWeight: '600',
    '& a': {
      float: 'right',
      fontSize: '13px',
      background: '#0AA7F7',
      color: '#fff',
      padding: '10px 12px',
      borderRadius: '50px',
      letterSpacing: '1px',
      boxShadow: '0px 0px 5px #0EF7F750',
      position: 'fixed',
      bottom: '0',
      right: '0',
      margin: '0px 20px 20px 0px',
      zIndex: '10',
      cursor: 'pointer',
      textDecoration: 'none',
      transition: 'all 0.5s ease-in-out',
      '&:hover': {
        transform: 'scale(1.1)',
      },
    },
  },
  logo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& img': {
      marginRight: '10px',  
      width: '50px',
      height: '50px',
    }
  },
  /* Title section style end */
  /* thumbnail section style start */
  card:{
    paddingBottom: '5px',
  },
  listBox: {
    margin: '0',
    padding: '5px !important',
    position: 'relative',
    '& figure': {
      margin: '0px',
      lineHeight: '0px',
      '& img': {
        width: '100%',
        height: '180px',
        objectFit: 'cover',
      },
    },
    '&:hover': {
      '& > div': {
        display: 'block',
      },
    },
  },
  img: {
    borderRadius: '5px',
  },
  playHover: {
    top: '38%',
    left: '41%',
    color: '#fff',
    width: '40px',
    cursor: 'pointer',
    display: 'none',
    position: 'absolute',
    textAlign: 'center',
    lineHeight: '30px',
    borderRadius: '10px',
    '& img': {
      width: '100%',
    },
  },
  /* thumbnail section style end */
  /* No videos section style start */
  noData: {
    padding: '30px',
    background: '#fff',
    textAlign: 'center',
    '& span': {
      '& i': {
        fontSize: '80px',
      },
    },
    '& p': {
      fontWeight: '600',
      margin: '10px 0px 0px',
      fontSize: '20px',
    },
  },
  /* No videos section style end */
  /* videos dialog style start */
  videoDialog: {
    '& div': {
      padding: '0px !important',
      '& video': {
        maxWidth: '100%',
      },
    },
  },
  videoTitle: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '5px 0px 10px 10px',
  }
  /* videos dialog style end */
} );

export default styles;
