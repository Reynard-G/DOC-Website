import pool from 'lib/db';

import { useState, useEffect } from 'react';
import { Decimal } from 'decimal.js-light';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Layout from 'components/Layout';
import ChartContainer from 'components/ChartContainer';

import { itemNameToMinecraftName, limitData } from '@/utils/utils';

export default function PopularItemsChart({ sellQuantityData, buyQuantityData, colors }) {
  const [selectedTransactionType, setSelectedTransactionType] = useState('SELL');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedChartItemCount, setSelectedChartItemCount] = useState(10);
  const [chartData, setChartData] = useState({ "datasets": [], "labels": [] });
  const [chartOptions, setChartOptions] = useState({});
  const [allChartData, setAllChartData] = useState({});
  const [transactionTypeMenuAnchor, setTransactionTypeMenuAnchor] = useState(null);
  const [monthsMenuAnchor, setMonthsMenuAnchor] = useState(null);
  const [itemsMenuAnchor, setItemsMenuAnchor] = useState(null);

  const transactionTypes = ['SELL', 'BUY'];
  const numberOfItems = [10, 20, 30, 40, 50];

  useEffect(() => {
    const data = selectedTransactionType === 'SELL' ? sellQuantityData : buyQuantityData;

    setSelectedMonth(data[0].month);

    let monthlyChartData = {};

    for (const item of data) {
      const { month, item_name } = item;

      if (!monthlyChartData[month]) {
        monthlyChartData[month] = {
          labels: [],
          datasets: [
            {
              label: 'Sales',
              data: [],
              sell_quantity: [],
              buy_quantity: [],
              total_sell_quantity: 0,
              total_buy_quantity: 0,
              sell_items: [],
              buy_items: [],
              backgroundColor: [],
              borderColor: [],
              borderWidth: 1,
            },
          ],
        };
      }

      const monthlySellQuantityData = sellQuantityData.filter((item) => item.month === month);
      const monthlyBuyQuantityData = buyQuantityData.filter((item) => item.month === month);

      monthlyChartData[month].labels.push(item_name);

      monthlyChartData[month].datasets[0].sell_quantity = monthlySellQuantityData.map((item) => Number(item.total_sell_quantity));
      monthlyChartData[month].datasets[0].buy_quantity = monthlyBuyQuantityData.map((item) => Number(item.total_buy_quantity));

      monthlyChartData[month].datasets[0].total_sell_quantity = monthlySellQuantityData.reduce((acc, item) => acc + Number(item.total_sell_quantity), 0);
      monthlyChartData[month].datasets[0].total_buy_quantity = monthlyBuyQuantityData.reduce((acc, item) => acc + Number(item.total_buy_quantity), 0);

      monthlyChartData[month].datasets[0].sell_items = monthlySellQuantityData.map((item) => item.item_name);
      monthlyChartData[month].datasets[0].buy_items = monthlyBuyQuantityData.map((item) => item.item_name);

      const minecraftName = itemNameToMinecraftName(item_name);
      const color = colors.find((color) => color.item_name === minecraftName);
      monthlyChartData[month].datasets[0].backgroundColor.push(`rgba(${color.rgb}, 0.2)`);
      monthlyChartData[month].datasets[0].borderColor.push(`rgba(${color.rgb}, 1)`);
    }

    setAllChartData(monthlyChartData);
  }, [sellQuantityData, buyQuantityData, colors]);

  useEffect(() => {
    if (!allChartData[selectedMonth]) return;

    const topNData = limitData(allChartData[selectedMonth], selectedChartItemCount);

    topNData.datasets[0].data = selectedTransactionType === 'SELL' ? topNData.datasets[0].sell_quantity : topNData.datasets[0].buy_quantity;

    topNData.labels = selectedTransactionType === 'SELL' ? topNData.datasets[0].sell_items : topNData.datasets[0].buy_items;

    const rgb = selectedTransactionType === 'SELL' ? topNData.datasets[0].sell_items.map((item) => colors.find((color) => color.item_name === itemNameToMinecraftName(item)).rgb) : topNData.datasets[0].buy_items.map((item) => colors.find((color) => color.item_name === itemNameToMinecraftName(item)).rgb);
    topNData.datasets[0].backgroundColor = rgb.map((rgb) => `rgba(${rgb}, 0.2)`);
    topNData.datasets[0].borderColor = rgb.map((rgb) => `rgba(${rgb}, 1)`);

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
              const label = context.dataset.label;
              const value = context.raw;
              const totalItemQuantity = selectedTransactionType === 'SELL' ? context.dataset.sell_quantity.slice(0, selectedChartItemCount).reduce((acc, quantity) => acc + quantity, 0) : context.dataset.buy_quantity.slice(0, selectedChartItemCount).reduce((acc, quantity) => acc + quantity, 0);
              const percentage = new Decimal(value).dividedBy(totalItemQuantity).times(100).toNumber();
              
              return `${label}: ${percentage.toFixed(2)}%`;
            },
            footer: (context) => {
              const dataset = context[0].dataset;
              const totalQuantity = selectedTransactionType === 'SELL' ? dataset.sell_quantity : dataset.buy_quantity;
              
              return `Total: ${totalQuantity[context[0].dataIndex]}`;
            },
          },
        },
      },
    });
  }, [selectedMonth, selectedChartItemCount, selectedTransactionType]);

  const openTransactionTypeMenu = (event) => {
    setTransactionTypeMenuAnchor(event.currentTarget);
  };

  const openMonthsMenu = (event) => {
    setMonthsMenuAnchor(event.currentTarget);
  };

  const openItemsMenu = (event) => {
    setItemsMenuAnchor(event.currentTarget);
  };

  const closeMenu = () => {
    setTransactionTypeMenuAnchor(null);
    setMonthsMenuAnchor(null);
    setItemsMenuAnchor(null);
  };

  const handleTransactionTypeSelection = (event, transactionType) => {
    setSelectedTransactionType(transactionType);
    closeMenu();
  };

  const handleMonthSelection = (event, month) => {
    setSelectedMonth(month);
    setChartData(allChartData[month]);
    closeMenu();
  };

  const handleItemCountSelection = (event, itemCount) => {
    setSelectedChartItemCount(itemCount);
    closeMenu();
  };

  return (
    <Layout title="DOC - Popular Items">
      <ChartContainer
        type="doughnut"
        data={chartData}
        options={chartOptions}
        chartTitle="Most Popular Items"
        chartSubtitle="The top most popular items in DC monthly"
        chartDescription={`
          The chart shows the ratio of items sold by individual companies to the total number of items sold by the top 10 companies in a given month.
          An "item sold" refers to a transaction where a company successfully sells a product to a customer.
          Calculation: (Items Sold in Month / Total Items Sold by Top 10 in Month) * 100
        `}
        dropdowns={
          <>
            <Button variant="text" onClick={openTransactionTypeMenu} className="justify-center w-full my-4">
              <Typography variant="body1">
                <strong>Transaction Type:</strong> {selectedTransactionType}
              </Typography>
            </Button>
            <Menu
              anchorEl={transactionTypeMenuAnchor}
              open={Boolean(transactionTypeMenuAnchor)}
              onClose={closeMenu}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
              {transactionTypes.map((transactionType) => (
                <MenuItem key={transactionType} onClick={(event) => handleTransactionTypeSelection(event, transactionType)}>
                  {transactionType}
                </MenuItem>
              ))}
            </Menu>
            <Button variant="text" onClick={openMonthsMenu} className="justify-center w-full mb-4">
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
                <strong># of Items:</strong> {selectedChartItemCount}
              </Typography>
            </Button>
            <Menu
              anchorEl={itemsMenuAnchor}
              open={Boolean(itemsMenuAnchor)}
              onClose={closeMenu}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
              {numberOfItems.map((item) => (
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
  const sellQuantityData = await pool.query(`
    SELECT
      item_name,
      total_sell_quantity,
      month
      FROM (
        SELECT item_name,
          SUM(sell_item_quantity) AS total_sell_quantity,
          DATE_FORMAT(created_at, '%Y-%m') AS month,
          ROW_NUMBER() OVER (PARTITION BY DATE_FORMAT(created_at, '%Y-%m') ORDER BY SUM(sell_item_quantity) DESC) AS row_num
        FROM chestshops
        WHERE DATE_FORMAT(created_at, '%Y-%m') <= DATE_FORMAT(NOW(), '%Y-%m')
        GROUP BY item_name, month
      ) AS subquery
      WHERE row_num <= 50
      ORDER BY month DESC, total_sell_quantity DESC;
  `);

  const buyQuantityData = await pool.query(`
    SELECT
      item_name,
      total_buy_quantity,
      month
      FROM (
        SELECT item_name,
          SUM(buy_item_quantity) AS total_buy_quantity,
          DATE_FORMAT(created_at, '%Y-%m') AS month,
          ROW_NUMBER() OVER (PARTITION BY DATE_FORMAT(created_at, '%Y-%m') ORDER BY SUM(buy_item_quantity) DESC) AS row_num
        FROM chestshops
        WHERE DATE_FORMAT(created_at, '%Y-%m') <= DATE_FORMAT(NOW(), '%Y-%m')
        GROUP BY item_name, month
      ) AS subquery
      WHERE row_num <= 50
      ORDER BY month DESC, total_buy_quantity DESC;
  `);

  const colors = await pool.query(`
    SELECT
      item_name,
      rgb
    FROM item_colors
  `);

  return {
    props: {
      sellQuantityData: JSON.parse(JSON.stringify(sellQuantityData)),
      buyQuantityData: JSON.parse(JSON.stringify(buyQuantityData)),
      colors: JSON.parse(JSON.stringify(colors)),
    },
    revalidate: 600,
  };
}