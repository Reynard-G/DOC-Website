import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Menu,
  MenuItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import { Menu as MenuIcon, KeyboardArrowDown } from '@mui/icons-material';

import InsertChartRoundedIcon from '@mui/icons-material/InsertChartRounded';
import PieChartRoundedIcon from '@mui/icons-material/PieChartRounded';
import StackedLineChartRoundedIcon from '@mui/icons-material/StackedLineChartRounded';

const NavBar = () => {
  const [chartDropdownOpen, setChartDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const toggleChartDropdown = () => {
    setChartDropdownOpen(!chartDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    toggleChartDropdown();
  };

  useEffect(() => {
    setMobileMenuOpen(chartDropdownOpen);
  }, [chartDropdownOpen]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.75 }}
      className="flex align-center"
    >
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/milklegend.png"
              alt="MilkLegend Logo"
              width={40}
              height={40}
              className="rounded-xl"
            />
            <Typography variant="h6" className="font-bold">
              DOC Analytics
            </Typography>
          </Link>
          <div className="flex-grow" />
          <div className="hidden gap-0 sm:flex">
            <Button
              endIcon={<KeyboardArrowDown />}
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
            <IconButton aria-label="Navbar Button" onClick={toggleMobileMenu} color="inherit">
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="flex flex-col gap-0 sm:hidden"
          >
            <Button
              endIcon={<KeyboardArrowDown />}
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
              <MenuItem onClick={() => (window.location.href = '/charts/inflation')}>
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
          </motion.div>
        )}
      </AppBar>
    </motion.div>
  );
};

export default NavBar;
