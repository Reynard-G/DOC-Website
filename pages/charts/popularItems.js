import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { Decimal } from 'decimal.js-light';

import { Dropdown, Button, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import Layout from 'components/Layout';
import ChartContainer from 'components/ChartContainer';

const fetcher = (url) => fetch(url).then((res) => res.json());

const calculateMonthTotalSellQuantity = (monthlyData, month) => {
  return monthlyData
    .filter((item) => item.month === month)
    .reduce((sum, item) => sum + parseInt(item.total_sell_quantity), 0);
};

function itemNameToMinecraftName(itemName) {
  let item = itemName.split('#')[0];
  item = item.split(':')[0];
  item = item.replace(/([A-Z])/g, (match, letter, index) => {
    if (index !== 0) {
      return '_' + letter;
    }
    return letter;
  }).toLowerCase();
  item = item.replace(/(\D*)(\d+)/, '$1_$2');
  return item;
}

function limitData(data, limit) {
  return {
    labels: data.labels.slice(0, limit),
    datasets: data.datasets.map((dataset) => {
      return {
        ...dataset,
        data: dataset.data.slice(0, limit),
        total_sell_quantity: dataset.total_sell_quantity.slice(0, limit),
        backgroundColor: dataset.backgroundColor.slice(0, limit),
        borderColor: dataset.borderColor.slice(0, limit),
      };
    }),
  };
}

const PopularItemsChart = () => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [allChartData, setAllChartData] = useState({});
  const [chartItemCount, setChartItemCount] = useState(10);

  const apiDataUrl = `/api/popularItems?monthly=true&limit=50`;
  const { data: data } = useSWR(apiDataUrl, fetcher, { revalidateOnFocus: false });
  const apiColorsUrl = `/api/itemColors`;
  const { data: colors } = useSWR(apiColorsUrl, fetcher, { revalidateOnFocus: false });

  useEffect(() => {
    const fetchData = async () => {
      if (data && colors) {
        if (!selectedMonth) {
          setSelectedMonth(data[0].month);
        }

        if (Object.keys(allChartData).length === 0) {
          const monthlyChartData = {};

          data.forEach(async (item) => {
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
            monthlyChartData[month].datasets[0].data.push(
              new Decimal(total_sell_quantity)
                .dividedBy(calculateMonthTotalSellQuantity(data, month))
                .times(100)
                .toNumber()
            );
            monthlyChartData[month].datasets[0].total_sell_quantity.push(total_sell_quantity);

            const color = colors.find((color) => color.item_name === itemNameToMinecraftName(item_name));
            monthlyChartData[month].datasets[0].backgroundColor.push(
              `rgba(${color.rgb}, 0.2)`
            );
            monthlyChartData[month].datasets[0].borderColor.push(
              `rgba(${color.rgb}, 1)`
            );
          });

          setAllChartData(monthlyChartData);
        }

        if (allChartData[Object.keys(allChartData)[0]] && chartItemCount != chartData[Object.keys(chartData)[0]].length) {
          setChartData(limitData(allChartData[selectedMonth], chartItemCount));
          setChartOptions({
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 0.7,
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                callbacks: {
                  label: (context) => {
                    const label = context.dataset.label || '';

                    if (label) {
                      return ` ${label}: ${context.formattedValue}%`;
                    }
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
        }
      }
    };

    fetchData();
  }, [data, selectedMonth, chartData, allChartData, chartItemCount, chartOptions, colors]);

  const handleMonthSelection = (month) => {
    setSelectedMonth(month);
    setChartData(allChartData[month]);

  };

  const handleItemCountSelection = (itemCount) => {
    setChartItemCount(itemCount);
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
            <Dropdown>
              <DropdownTrigger>
                <Button variant="flat" className="justify-center w-full my-4">
                  <p className="text-center">
                    <strong>Selected Month:</strong> {selectedMonth}
                  </p>
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Months"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={[selectedMonth]}
                onSelectionChange={(month) => handleMonthSelection(month.currentKey)}
              >
                {Object.keys(allChartData).map((month) => (
                  <DropdownItem key={month}>
                    {month}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="flat" className="justify-center w-full mb-4">
                  <p className="text-center">
                    <strong># of Items:</strong> {chartItemCount}
                  </p>
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Items Count"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={[chartItemCount]}
                onSelectionChange={(itemCount) => handleItemCountSelection(itemCount.currentKey)}
              >
                {[10, 20, 30, 40, 50].map((item) => (
                  <DropdownItem key={item} textValue={item}>
                    {item}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </>
        }
      >
      </ChartContainer>
    </Layout>
  );
};

export default PopularItemsChart;
