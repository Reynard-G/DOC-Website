import pool from 'lib/db';
import { useState, useEffect } from 'react';
import { Decimal } from 'decimal.js-light';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Layout from 'components/Layout';
import ChartContainer from 'components/ChartContainer';

const calculateMonthTotalSellQuantity = (monthlyData, month) => {
  return monthlyData
    .filter((item) => item.month === month)
    .reduce((sum, item) => sum + parseInt(item.total_sell_quantity), 0);
};

const itemNameToMinecraftName = (itemName) => {
  let item = itemName.split('#')[0];
  item = item.split(':')[0];
  item = item.replace(/([A-Z])/g, (match, letter, index) => (index !== 0 ? '_' + letter : letter)).toLowerCase();
  item = item.replace(/(\D*)(\d+)/, '$1_$2');
  return item;
};

const limitData = (data, limit) => {
  return {
    labels: data.labels.slice(0, limit),
    datasets: data.datasets.map((dataset) => ({
      ...dataset,
      data: dataset.data.slice(0, limit),
      total_sell_quantity: dataset.total_sell_quantity.slice(0, limit),
      backgroundColor: dataset.backgroundColor.slice(0, limit),
      borderColor: dataset.borderColor.slice(0, limit),
    })),
  };
};

export default function PopularItemsChart({ data, colors }) {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [chartData, setChartData] = useState({ "datasets": [], "labels": [] });
  const [chartOptions, setChartOptions] = useState({});
  const [allChartData, setAllChartData] = useState({});
  const [chartItemCount, setChartItemCount] = useState(10);
  const [monthsMenuAnchor, setMonthsMenuAnchor] = useState(null);
  const [itemsMenuAnchor, setItemsMenuAnchor] = useState(null);

  useEffect(() => {
    // Set default month to the latest month
    setSelectedMonth(data[0].month);

    const monthlyChartData = {};

    for (const item of data) {
      const { month, item_name, total_sell_quantity } = item;

      if (!monthlyChartData[month]) {
        monthlyChartData[month] = {
          labels: [],
          datasets: [
            {
              label: 'Sales',
              data: [],
              total_sell_quantity: [],
              backgroundColor: [],
              borderColor: [],
              borderWidth: 1,
            },
          ],
        };
      }

      monthlyChartData[month].labels.push(item_name);
      const sellQuantityPercentage = new Decimal(total_sell_quantity)
        .dividedBy(calculateMonthTotalSellQuantity(data, month))
        .times(100)
        .toNumber();
      monthlyChartData[month].datasets[0].data.push(sellQuantityPercentage);
      monthlyChartData[month].datasets[0].total_sell_quantity.push(total_sell_quantity);

      const minecraftName = itemNameToMinecraftName(item_name);
      const color = colors.find((color) => color.item_name === minecraftName);
      monthlyChartData[month].datasets[0].backgroundColor.push(`rgba(${color.rgb}, 0.2)`);
      monthlyChartData[month].datasets[0].borderColor.push(`rgba(${color.rgb}, 1)`);
    }

    setAllChartData(monthlyChartData);
  }, [data, colors]);

  useEffect(() => {
    if (!allChartData[selectedMonth]) return;

    const topNData = limitData(allChartData[selectedMonth], chartItemCount);
    const totalPercentage = topNData.datasets[0].data.reduce((acc, percentage) => acc + percentage, 0);
    topNData.datasets[0].data = topNData.datasets[0].data.map((percentage) => (percentage / totalPercentage) * 100);

    setChartData(topNData);
    setChartOptions({
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 0.7,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const label = context.dataset.label || '';
              return label ? ` ${label}: ${context.formattedValue}%` : '';
            },
            footer: (context) => {
              const dataset = context[0].dataset;
              const totalSellQuantity = dataset.total_sell_quantity;
              return `Total Sold: ${totalSellQuantity[context[0].dataIndex]}`;
            },
          },
        },
      },
    });
  }, [allChartData, selectedMonth, chartItemCount]);

  const openMonthsMenu = (event) => {
    setMonthsMenuAnchor(event.currentTarget);
  };

  const openItemsMenu = (event) => {
    setItemsMenuAnchor(event.currentTarget);
  };

  const closeMenu = () => {
    setMonthsMenuAnchor(null);
    setItemsMenuAnchor(null);
  };

  const handleMonthSelection = (event, month) => {
    setSelectedMonth(month);
    setChartData(allChartData[month]);
    closeMenu();
  };

  const handleItemCountSelection = (event, itemCount) => {
    setChartItemCount(itemCount);
    closeMenu();
  };

  return (
    <Layout title="Item Demand">
      <ChartContainer
        type="doughnut"
        data={chartData}
        options={chartOptions}
        chartTitle="Highest Selling Items"
        chartSubtitle="Top 10 Demanded Items Sold by Companies"
        chartDescription={`
          The chart shows the ratio of items sold by individual companies to the total number of items sold by the top 10 companies in a given month.
          An "item sold" refers to a transaction where a company successfully sells a product to a customer.
          Calculation: (Items Sold in Month / Total Items Sold by Top 10 in Month) * 100
        `}
        dropdowns={
          <>
            <Button variant="text" onClick={openMonthsMenu} className="justify-center w-full my-4">
              <Typography variant="body1">
                <strong>Selected Month:</strong> {selectedMonth}
              </Typography>
            </Button>
            <Menu
              anchorEl={monthsMenuAnchor}
              open={Boolean(monthsMenuAnchor)}
              onClose={closeMenu}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
              {Object.keys(allChartData).map((month) => (
                <MenuItem key={month} onClick={(event) => handleMonthSelection(event, month)}>
                  {month}
                </MenuItem>
              ))}
            </Menu>

            <Button variant="text" onClick={openItemsMenu} className="justify-center w-full mb-4">
              <Typography variant="body1">
                <strong># of Items:</strong> {chartItemCount}
              </Typography>
            </Button>
            <Menu
              anchorEl={itemsMenuAnchor}
              open={Boolean(itemsMenuAnchor)}
              onClose={closeMenu}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
              {[10, 20, 30, 40, 50].map((item) => (
                <MenuItem key={item} onClick={(event) => handleItemCountSelection(event, item)}>
                  {item}
                </MenuItem>
              ))}
            </Menu>
          </>
        }
      />
    </Layout>
  );
};

export async function getStaticProps() {
  const data = await pool.query(`
    SELECT
      item_name,
      total_sell_quantity,
      month
      FROM (
        SELECT item_name,
          SUM(sell_item_quantity) AS total_sell_quantity,
          DATE_FORMAT(created_at, '%Y-%m') AS month,
          ROW_NUMBER() OVER (PARTITION BY DATE_FORMAT(created_at, '%Y-%m') ORDER BY SUM(sell_item_quantity) DESC) AS row_num
        FROM historical_prices
        WHERE DATE_FORMAT(created_at, '%Y-%m') <= DATE_FORMAT(NOW(), '%Y-%m')
        GROUP BY item_name, month
      ) AS subquery
      WHERE row_num <= 50
      ORDER BY month DESC, total_sell_quantity DESC;
  `);

  const colors = await pool.query(`
    SELECT
      item_name,
      rgb
    FROM item_colors
  `);

  return {
    props: {
      data: JSON.parse(JSON.stringify(data)),
      colors: JSON.parse(JSON.stringify(colors)),
    },
    revalidate: 600,
  };
}