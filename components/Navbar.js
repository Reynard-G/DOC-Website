import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';

import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import InsertChartRoundedIcon from '@mui/icons-material/InsertChartRounded';
import PieChartRoundedIcon from '@mui/icons-material/PieChartRounded';
import StackedLineChartRoundedIcon from '@mui/icons-material/StackedLineChartRounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import ExploreRoundedIcon from '@mui/icons-material/ExploreRounded';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const NavBar = () => {
  const [chartDropdownOpen, setChartDropdownOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [mobileDrawerChartOpen, setMobileDrawerChartOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const toggleChartDropdown = () => {
    setChartDropdownOpen(!chartDropdownOpen);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    toggleChartDropdown();
  };

  const toggleMobileDrawer = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const handleMobileDrawerChartClick = () => {
    setMobileDrawerChartOpen(!mobileDrawerChartOpen);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.75 }}
      className="flex items-center"
    >
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/dept_commerce.png"
              alt="Department of Commerce Logo"
              width={40}
              height={40}
            />
            <Typography variant="h6" className="font-bold">
              Department of Commerce
            </Typography>
          </Link>
          <div className="grow" />
          <div className="hidden gap-0 sm:flex">
            <Button
              endIcon={<KeyboardArrowDownIcon />}
              onClick={handleMenuClick}
              color="inherit"
            >
              Charts
            </Button>
            <Menu
              elevation={0}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              open={chartDropdownOpen}
              onClose={() => setChartDropdownOpen(false)}
            >
              <MenuItem onClick={() => (window.location.href = '/charts/inflation')} >
                <InsertChartRoundedIcon fontSize='large' sx={{ mr: 1 }} />
                <ListItemText
                  primary="Inflation Tracker"
                  secondary="Historical inflation of DC since 2022"
                />
              </MenuItem>
              <MenuItem onClick={() => (window.location.href = '/charts/popularItems')}>
                <PieChartRoundedIcon fontSize='large' sx={{ mr: 1 }} />
                <ListItemText
                  primary="Item Demand"
                  secondary="Top 10 most popular items sold in DC"
                />
              </MenuItem>
              <MenuItem>
                <StackedLineChartRoundedIcon fontSize='large' sx={{ mr: 1 }} />
                <ListItemText primary="Chart 3" secondary="This is a description for the chart 3" />
              </MenuItem>
            </Menu>
            <Button className="px-4" color="inherit" href="https://tracker.milklegend.xyz/">
              Item Price Tracker
            </Button>
            <Button className="px-4" color="inherit" href="https://maps.milklegend.xyz/">
              Maps
            </Button>
          </div>
          <div className="sm:hidden">
            <IconButton aria-label="Navbar Button" color="inherit" onClick={toggleMobileDrawer}>
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
        {
          mobileDrawerOpen && (
            <Drawer anchor="right" open={mobileDrawerOpen} onClose={toggleMobileDrawer}>
              <div className="flex justify-start">
                <IconButton onClick={toggleMobileDrawer}>
                  <ChevronRightIcon />
                </IconButton>
              </div>
              <Divider />
              <List>
                <ListItemButton onClick={handleMobileDrawerChartClick}>
                  <ListItemIcon>
                    <InsertChartRoundedIcon fontSize='medium' />
                  </ListItemIcon>
                  <ListItemText primary="Charts" />
                  {mobileDrawerChartOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={mobileDrawerChartOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => (window.location.href = '/charts/inflation')}>
                      <ListItemIcon>
                        <InsertChartRoundedIcon fontSize='medium' />
                      </ListItemIcon>
                      <ListItemText primary="Inflation Tracker" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => (window.location.href = '/charts/popularItems')}>
                      <ListItemIcon>
                        <PieChartRoundedIcon fontSize='medium' />
                      </ListItemIcon>
                      <ListItemText primary="Item Demand" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                        <StackedLineChartRoundedIcon fontSize='medium' />
                      </ListItemIcon>
                      <ListItemText primary="Chart 3" />
                    </ListItemButton>
                  </List>
                </Collapse>
                <ListItemButton onClick={() => (window.location.href = 'https://tracker.milklegend.xyz')}>
                  <ListItemIcon>
                    <AttachMoneyRoundedIcon fontSize='medium' />
                  </ListItemIcon>
                  <ListItemText primary="Item Price Tracker" />
                </ListItemButton>
                <ListItemButton onClick={() => (window.location.href = 'https://maps.milklegend.xyz')}>
                  <ListItemIcon>
                    <ExploreRoundedIcon fontSize='medium' />
                  </ListItemIcon>
                  <ListItemText primary="Maps" />
                </ListItemButton>
              </List>
            </Drawer>
          )
        }
      </AppBar>
    </motion.div>
  );
};

export default NavBar;
