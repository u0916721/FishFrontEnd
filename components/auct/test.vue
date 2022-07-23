<template>
<div v-if="loaded">
  <Bar
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  props: {
    chartId: {
      default: 'bar-chart'
    },
    datasetIdKey: {
      default: 'label'
    },
    width: {
      default: 400
    },
    height: {
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      default: () => {}
    },
    plugins: {
      default: () => {}
    },
    // Type checker throws a warning, I dont care it works
    xAxis: null,
    yAxis: null,
    label: "",
  },
  data() {
    return {
      chartData: {
        labels: [ 'January', 'February', 'March' , 'January', 'February', 'March' ],
        datasets: [ {label: this.label,
          backgroundColor: '#f87979', data: [40, 545, 12, 40, 20, 12] } ]
      },
      chartOptions: {
        responsive: true
      },
      loaded: false,
    }
  },
    created()
  { 


  },
  mounted()
  { 
    let swag = [ 'January', 'February', 'March'];
    let swagger = this.xAxis;
    this.chartData = {
        labels: this.xAxis,
        datasets: [{label: this.label,
          backgroundColor: '#f87979', data: this.yAxis}]
      };
    this.loaded = true;
  },
    computed()
  { 

  },
}
</script>