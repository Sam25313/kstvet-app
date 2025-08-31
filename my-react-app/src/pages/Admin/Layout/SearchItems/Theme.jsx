import { createTheme } from '@mui/material/styles';

const myTheme = createTheme({
  palette: {
    mode: 'dark', 
    background: {
      default: '#121212', 
      paper: '#1d1d1d', 
    },
  },
});

export default myTheme;