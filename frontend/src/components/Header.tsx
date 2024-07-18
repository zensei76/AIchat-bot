
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Logo from './shared/Logo';
import { useAuth } from '../context/AuthContext';
import NavigationLink from './shared/NavigationLink';
import { useThemeContext } from '../context/ThemeContext';
import { useTheme } from '@mui/material/styles'; // MUI's useTheme hook
import { Button } from '@mui/material';
import { MdDarkMode, MdOutlineLightMode } from 'react-icons/md';

const Header = () => {
  const auth = useAuth();
  const { isDarkMode, toggleTheme } = useThemeContext(); // Custom theme hook
  const appTheme = useTheme(); // MUI's theme hook

  return (
    <AppBar
      sx={{
        backgroundColor: appTheme.palette.background.default,
        position: 'static',
        boxShadow: 'none',
        color: appTheme.palette.text.primary,
        // borderBottom: `2px solid ${appTheme.palette.secondary.light}`,
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Logo />
        <div>
          {auth?.isLoggedIn ? (
            <>
              <NavigationLink
                to='/chat'
                text='Go To Chat'
                bg='transparent'
                textColor={appTheme.palette.secondary.main}
                border={`4px solid ${appTheme.palette.secondary.main}`}
              />
              <NavigationLink
                to='/'
                text='Logout'
                onClick={auth.logout}
                bg={appTheme.palette.primary.dark}
                textColor={appTheme.palette.text.primary}
                border={`4px solid ${appTheme.palette.primary.dark}`}
              />
            </>
          ) : (
            <>
              <NavigationLink
                to='/login'
                text='Login'
                bg='transparent'
                textColor={appTheme.palette.secondary.main}
                border={`4px solid ${appTheme.palette.secondary.main}`}
              />
              <NavigationLink
                to='/signup'
                text='Signup'
                bg={appTheme.palette.secondary.main}
                textColor={appTheme.palette.background.default}
                border={`4px solid ${appTheme.palette.secondary.main}`}
              />
            </>
          )}
          {/* Theme Toggle Button */}
          <Button onClick={toggleTheme}>
            {isDarkMode ? (
              <MdOutlineLightMode size='2em' color={appTheme.palette.text.primary} />
            ) : (
              <MdDarkMode size='2em' color={appTheme.palette.text.primary} />
            )}
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
