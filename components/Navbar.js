import { useContext } from 'react';
import chartDropdownContext from 'pages/context';

import { Image, Navbar, NavbarMenuToggle, NavbarBrand, NavbarContent, NavbarItem, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Link } from '@nextui-org/react';
import { motion } from "framer-motion";
import { icons } from './Icons';

const NavBar = () => {
  const { chartDropdownOpen, setChartDropdownOpen } = useContext(chartDropdownContext);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.75 }}
      className="flex align-items-center py-4"
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
            className="flex-auto mr-2 opacity-100"
          />
          <p className="font-bold sm:block text-inherit">DOC Analytics</p>
        </NavbarBrand>
        <NavbarContent className="hidden gap-0 sm:flex">
          <Dropdown
            aria-label="Chart Menu"
            isOpen={chartDropdownOpen}
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
                key="chart2"
                description="This is a description for the chart 2"
                startContent={icons.lineChart({ size: "2rem" })}
              >
                Chart 2
              </DropdownItem>
              <DropdownItem
                key="chart3"
                description="This is a description for the chart 3"
                startContent={icons.pieChart({ size: "2rem" })}
              >
                Chart 3
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <NavbarItem
            as={Link}
            className="px-4"
            color="foreground"
            href="https://tracker.milklegend.xyz/"
          >
            Item Price Tracker
          </NavbarItem>
          <NavbarItem
            as={Link}
            className="px-4"
            color="foreground"
            href="https://maps.milklegend.xyz/"
          >
            Maps
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </motion.div>
  );
};

export default NavBar;
