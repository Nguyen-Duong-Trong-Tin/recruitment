import { getMonthNow, getYearNow } from "./handleTime";

export const updateChart = (chart) => {
  const length = chart.length;
  const arrayChartTime = chart[length - 1].date.split('-');
  const maxChartMonth = arrayChartTime[0];
  const maxChartYear = arrayChartTime[1];
  const monthNow = getMonthNow();
  const yearNow = getYearNow();

  if (maxChartYear < yearNow || maxChartMonth < monthNow) {
    chart.push({
      date: `${monthNow}-${yearNow}`,
      quantity: 1
    });
    
    return chart;
  }

  ++chart[length - 1].quantity;

  return chart;
}