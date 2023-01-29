<template>
  <div id="dynamic-charts"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import axios from 'axios';

let option: echarts.EChartsOption;
let charts: echarts.ECharts;

function run(rawData) {
  // var countries = ['Australia', 'Canada', 'China', 'Cuba', 'Finland', 'France', 'Germany', 'Iceland', 'India', 'Japan', 'North Korea', 'South Korea', 'New Zealand', 'Norway', 'Poland', 'Russia', 'Turkey', 'United Kingdom', 'United States'];
  const countries = ['Finland', 'France', 'Germany', 'Iceland', 'Norway', 'Poland', 'Russia', 'United Kingdom'];
  const datasetWithFilters: echarts.DatasetComponentOption[] = [];
  const seriesList: echarts.SeriesOption[] = [];
  echarts.util.each(countries, function (country) {
    const datasetId = 'dataset_' + country;
    datasetWithFilters.push({
      id: datasetId,
      fromDatasetId: 'dataset_raw',
      transform: {
        type: 'filter',
        config: {
          and: [
            { dimension: 'Year', gte: 1950 },
            { dimension: 'Country', '=': country },
          ],
        },
      },
    });
    seriesList.push({
      type: 'line',
      datasetId: datasetId,
      showSymbol: false,
      name: country,
      endLabel: {
        show: true,
        formatter: function (params: any) {
          return params.value[3] + ': ' + params.value[0];
        },
      },
      labelLayout: {
        moveOverlap: 'shiftY',
      },
      emphasis: {
        focus: 'series',
      },
      encode: {
        x: 'Year',
        y: 'Income',
        label: ['Country', 'Income'],
        itemName: 'Year',
        tooltip: ['Income'],
      },
    });
  });

  option = {
    animationDuration: 10000,
    dataset: [
      {
        id: 'dataset_raw',
        source: rawData,
      },
      ...datasetWithFilters,
    ],
    title: {
      text: 'Income of Germany and France since 1950',
    },
    tooltip: {
      order: 'valueDesc',
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      nameLocation: 'middle',
    },
    yAxis: {
      name: 'Income',
    },
    grid: {
      right: 140,
    },
    series: seriesList,
  };

  charts.setOption(option);
}

onMounted(() => {
  charts = echarts.init(document.getElementById('dynamic-charts') as HTMLElement);
  const axiosInstance = axios.create({});
  axiosInstance.get('charts/data/asset/data/life-expectancy-table.json').then((res) => {
    run(res.data);
  });
});
</script>

<style scoped>
#dynamic-charts {
  width: 700px;
  height: 500px;
}
</style>
