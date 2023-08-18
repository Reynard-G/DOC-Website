import pool from 'lib/db';
import Layout from 'components/Layout';
import ChartContainer from 'components/ChartContainer';

export default function InflationChart({ data }) {
  // Extracting the necessary information from the data
  const labels = data.slice(1).map((entry) => `${entry.month} ${entry.year}`);
  const basketCostData = data.map((entry) => parseFloat(entry.total_basket_cost));

  // Calculating the percentage change and numerical change from the first recorded data
  const percentageChangeData = basketCostData.slice(1).map((entry, index) => {
    return ((entry - basketCostData[index]) / basketCostData[index]) * 100;
  });

  const chartData = {
    labels: labels,
    datasets: [
      {
        type: 'line',
        label: ' Percentage Change (vs. Previous Month)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        fill: false,
        tension: 0.3,
        data: percentageChangeData,
        yAxisID: 'y',
      },
    ],
  };

  // Add 2 different y axes, 1 for percentage change and 1 for numerical change
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      tooltip: {
        intersect: false,
        mode: 'index',
        callbacks: {
          // Format the tooltip to show the percentage change and numerical change
          label: function (context) {
            var label = context.dataset.label || '';

            if (label) {
              label += ': ';
            }

            if (context.parsed.y !== null) {
              if (context.dataset.type === 'bar') {
                label += Number(context.parsed.y).toLocaleString("en-US", { style: "currency", currency: "USD" });
              } else if (context.dataset.type === 'line') {
                label += Number(context.parsed.y / 100).toLocaleString("en-US", { style: "percent", minimumFractionDigits: 2 });
              }
            }

            return label;
          }
        }
      },
    },
    hover: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      x: {
        type: 'category',
        position: 'bottom',
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      y: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, ticks) {
            return new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2 }).format(value / 100);
          }
        }
      }
    },
  };

  return (
    <Layout title="Inflation Tracker">
      <ChartContainer
        type="line"
        data={chartData}
        options={chartOptions}
        chartTitle="Inflation Tracker"
        chartSubtitle="The historical inflation of DC since April 2022"
        chartDescription={`
          The inflation of the DC economy is calculated by the total stacks of the top 50 items sold during August 2022 & the average price per stack of the current month.
          The total price of all the items is added together to form the total basket cost of the current month.
          This is then calculated in comparison to the previous month's total basket cost and the oldest recorded basket cost, August 2022.
          <br>
          <br>
          <strong>A list of these items are the following: </strong>
          BakedPotato,
          Charcoal,
          Leather,
          Granite,
          GrayConcrete,
          AcaciaLog,
          MagentaConcrete,
          RedWool,
          Bricks,
          Melon,
          GreenConcrete,
          Beetroot,
          Diorite,
          Deepslate,
          SmoothStone,
          LightBlueConcrete,
          PurpleConcrete,
          WhiteConcrete,
          YellowConcrete,
          Pumpkin,
          WhiteWool,
          BlueConcrete,
          CyanConcrete,
          CookedBeef,
          BlackConcrete,
          JungleLog,
          LimeConcrete,
          BrownConcrete,
          LightGrayConcrete,
          BirchLog,
          PinkConcrete,
          CobbledDeepslate,
          Carrot,
          Coal,
          Gunpowder,
          GoldIngot,
          DriedKelpBlock,
          Gravel,
          Netherrack,
          IronIngot,
          QuartzBlock,
          OakLog,
          DarkOakLog,
          SpruceLog,
          SugarCane,
          Dirt,
          Stone,
          Cobblestone,
          Sand,
          FireworkRocket#1S
        `}
      />
    </Layout>
  );
};

export async function getStaticProps() {
  const data = await pool.query(`
    SELECT
      month,
      year,
      total_basket_cost
    FROM inflation
    ORDER BY STR_TO_DATE(CONCAT(year, month), '%Y %M') ASC;
  `);

  return {
    props: {
      data: JSON.parse(JSON.stringify(data)),
    },
    revalidate: 600,
  };
}