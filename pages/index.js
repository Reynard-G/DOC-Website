import React from 'react';

import Layout from 'components/Layout';
import HeroSection from 'components/HeroSection';

import ChartDropdownContext from 'pages/context';

export default function Home() {
  const [chartDropdownOpen, setChartDropdownOpen] = React.useState(false);
  const chartDropdownState = { chartDropdownOpen, setChartDropdownOpen };

  return (
    <>
      <ChartDropdownContext.Provider value={chartDropdownState}>
        <Layout title="DOC Analytics">
          <HeroSection />
        </Layout>
      </ChartDropdownContext.Provider>
    </>
  );
};
