import { createContext } from 'react';

const chartDropdownContext = createContext({
  chartDropdownOpen: false,
  setChartDropdownOpen: () => { },
});

export default chartDropdownContext;