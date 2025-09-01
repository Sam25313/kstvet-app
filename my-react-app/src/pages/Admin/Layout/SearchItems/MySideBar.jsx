import * as React from 'react';
import { Drawer, Box, Typography, Divider } from '@mui/material';
import { SidebarClasses, useLocale, useSidebarState } from 'react-admin';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventIcon from '@mui/icons-material/Event';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import ChurchIcon from '@mui/icons-material/Church';
import { IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';



const drawerWidthOpen = 240;
const drawerWidthClosed = 70;


const MySidebar = ({ children }) => {
  const [open, setOpen] = useSidebarState();
  useLocale(); 

  const toggleSidebar = () => setOpen(!open);

  return (
    <Drawer
      variant="permanent"
      open={open}
      onClose={toggleSidebar}
      classes={SidebarClasses}
      sx={{
        width: open ? drawerWidthOpen : drawerWidthClosed,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
         width: open ? drawerWidthOpen : drawerWidthClosed,
          boxSizing: 'border-box',
          background: ' #cc5500 ',
          color: '#fff',
          transition: 'width 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
          overflowX: 'hidden',
        },
      }}
    >
      {/* Sidebar Header */}
      <Box sx={{ p: 2, textAlign: open ? 'left' : 'center', flexShrink: 0 }}>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{  overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0, }}
        >
          {open ? 'KSTVET CU' : 'CU'}
        </Typography>
      </Box>

      <Box sx={{ flexShrink: 0 }}>
     <IconButton onClick={toggleSidebar} sx={{ color: '#fff' }}>
        {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)', flexShrink: 0 }}/>

       {/* Admin Dashboard Section Title */}
      {open && (
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Admin Dashboard
          </Typography>
        </Box>
      )}

  
      {/* Children (React Admin Menu) */}
      <Box sx={{ p: 1, flexGrow: 1, overflowY: 'auto'}}>{children}</Box>

       <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />
    </Drawer>
  );
};

export default MySidebar;
