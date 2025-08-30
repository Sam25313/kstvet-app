import * as React from 'react';
import { Menu, MenuItemLink, useGetIdentity } from 'react-admin';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import EventIcon from '@mui/icons-material/Event';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Typography, Divider, Box } from '@mui/material';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import SourceIcon from '@mui/icons-material/Source';
import SmsIcon from '@mui/icons-material/Sms';

const MyMenu = () => {
  const { identity, isLoading } = useGetIdentity();

  if (isLoading) return null;

  return (
    <Menu
      sx={{
        '& .RaMenuItemLink-root': {
          borderRadius: 1,
          mb: 0.5,
          '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.04)',
          },
        },
      }}
    >
      {identity ? (
        [
          <Menu.Item to="/" primaryText="Home" leftIcon={<HomeIcon />} key="home" />,
          <Menu.Item to="/admin" primaryText="Dashboard" leftIcon={<DashboardIcon />} key="dashboard" />,
          <Menu.ResourceItem name="ministries" icon={MenuBookIcon} key="ministries" />,
          <Menu.ResourceItem name="sermons" icon={SourceIcon} key="sermons" />,
          <Menu.ResourceItem name="events" icon={EventIcon} key="events" />,
          <MenuItemLink to="/admin/bulk-sms" primaryText="Bulk SMS" leftIcon={<SmsIcon />} key="bulk-sms" />,
          <Divider sx={{ my: 1 }} key="divider1" />,
          <Menu.ResourceItem name="users" icon={Diversity2Icon} key="users" />,
          <Divider sx={{ my: 1 }} key="divider2" />,
          <Menu.Item to="/admin/settings" primaryText="Settings" leftIcon={<AdminPanelSettingsIcon />} key="settings" />,
        ]
      ) : (
        [
          <Menu.Item to="/" primaryText="Home" leftIcon={<HomeIcon />} key="home-public" />,
          <Menu.Item to="/about" primaryText="About Us" leftIcon={<GroupIcon />} key="about" />,
          <Menu.Item to="/ministries" primaryText="Ministries" leftIcon={<GroupIcon />} key="ministries-public" />,
          <Menu.Item to="/events" primaryText="Events" leftIcon={<EventIcon />} key="events-public" />,
          <Menu.Item to="/sermons" primaryText="Sermons" leftIcon={<MenuBookIcon />} key="sermons-public" />,
          <Menu.Item to="/contact" primaryText="Contact" leftIcon={<GroupIcon />} key="contact" />,
        ]
      )}
    </Menu>
  );
};

export default MyMenu;