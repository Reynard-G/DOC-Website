export const itemNameToMinecraftName = (itemName) => {
  let item = itemName.split('#')[0];
  item = item.split(':')[0];
  item = item.replace(/([A-Z])/g, (match, letter, index) => (index !== 0 ? '_' + letter : letter)).toLowerCase();
  item = item.replace(/(\D*)(\d+)/, '$1_$2');
  return item;
};

export const limitData = (data, limit) => {
  return {
    labels: data.labels.slice(0, limit),
    datasets: data.datasets.map((dataset) => ({
      ...dataset,
      data: dataset.data.slice(0, limit),
      sell_quantity: dataset.sell_quantity.slice(0, limit),
      buy_quantity: dataset.buy_quantity.slice(0, limit),
      backgroundColor: dataset.backgroundColor.slice(0, limit),
      borderColor: dataset.borderColor.slice(0, limit),
    })),
  };
};