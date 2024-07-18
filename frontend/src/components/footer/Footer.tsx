import { Box, Typography, useTheme } from "@mui/material";

const Footer = () => {
  const theme = useTheme();
  return (
    <footer>
      <Box
        sx={{
          width: '100%',
          height: '60px',
          backgroundColor: theme.palette.primary.main,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center', 
          position: 'fixed',
          bottom: 0,
          left: 0,
        }}
      >
        <Typography variant="h6" component="p" sx={{ textAlign: 'center' }}>
          Made with ❤ by
          <span style={{ color: theme.palette.warning.main }} >
             BB
          </span>
        </Typography>
      </Box>
    </footer>
  );
};

export default Footer;
