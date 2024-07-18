import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <footer>
      <Box
        sx={{
          width: '100%',
          height: '60px',
          backgroundColor: '#f2edea',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center', // Center the content
          position: 'fixed',
          bottom: 0,
          left: 0,
        }}
      >
        <Typography variant="h6" component="p" sx={{ textAlign: 'center' }}>
          Made with ❤ by{' '}
          <span style={{ color: '#6C6774' }} >
            BB
          </span>
        </Typography>
      </Box>
    </footer>
  );
};

export default Footer;
