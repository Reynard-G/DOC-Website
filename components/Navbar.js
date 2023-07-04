import { useContext } from 'react';
import { chartDropdownContext } from 'pages/_app';

import { Navbar, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/navbar';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/dropdown';
import { Image } from '@nextui-org/image';
import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';
import { motion } from "framer-motion";
import { icons } from './Icons';

const NavBar = () => {
  const { chartDropdownOpen, setChartDropdownOpen } = useContext(chartDropdownContext);

  const toggleChartDropdown = () => {
    setChartDropdownOpen(!chartDropdownOpen);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.75 }}
      className="flex align-center"
    >
      <Navbar
        shouldHideOnScroll
        isBlurred
        maxWidth="lg"
        className="bg-transparent"
      >
        <NavbarMenuToggle
          className="sm:hidden"
        />
        <NavbarBrand
          as={Link}
          href="/"
          className="text-inherit"
        >
          <Image
            alt="milklegend"
            src="/milklegend.png"
            className="mr-2 opacity-100"
          />
          <p className="text-inherit font-bold">DOC Analytics</p>
        </NavbarBrand>
        <NavbarContent className="hidden gap-0 sm:flex">
          <Dropdown
            aria-label="Chart Menu"
            isOpen={chartDropdownOpen}
            onOpenChange={toggleChartDropdown}
          >
            <NavbarItem>
              <DropdownTrigger>
                <Button className="text-base" endContent={icons.chevronDown({ size: "1rem" })} radius="full" variant="light">
                  Charts
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              aria-label="Chart Menu"
              className="w-[340px]"
            >
              <DropdownItem
                key="inflation_chart"
                onClick={() => window.location.href = "/charts/inflation"}
                description="Historical inflation of DC since 2022"
                startContent={icons.barChart({ size: "2rem" })}
              >
                Inflation Tracker
              </DropdownItem>
              <DropdownItem
                key="popular_items_chart"
                onClick={() => window.location.href = "/charts/popularItems"}
                description="Top 10 most popular items sold in DC"
                startContent={icons.pieChart({ size: "2rem" })}
              >
                Item Demand
              </DropdownItem>
              <DropdownItem
                key="chart3"
                description="This is a description for the chart 3"
                startContent={icons.lineChart({ size: "2rem" })}
              >
                Chart 3
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <NavbarItem as={Link} className="px-4" color="foreground" href="https://tracker.milklegend.xyz/">
            Item Price Tracker
          </NavbarItem>
          <NavbarItem as={Link} className="px-4" color="foreground" href="https://maps.milklegend.xyz/">
            Maps
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu>
          <NavbarMenuItem key="Item Price Tracker">
            <Link color="foreground" className="w-full" href="https://tracker.milklegend.xyz/" size="lg">
              Item Price Tracker
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem key="Maps">
            <Link color="foreground" className="w-full" href="https://maps.milklegend.xyz/" size="lg">
              Maps
            </Link>
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
    </motion.div>
  );
};

export default NavBar;
