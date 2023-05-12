<template>

  <div class="chart-container">
    <canvas id="graph" :style="{ width: chartWidth + 'px', height: chartHeight + 'px' }"></canvas>
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

import {mapState} from "vuex";

ChartJS.pluginService.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  data() {
    return {
      mpsCountData: [],
      chartWidth: 50,
      chartHeight: 50,
      loaded: false,
      chartData: {
        labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        datasets: [
          {
            data: [],
            backgroundColor: [
              'rgba(255,4,4,0.7)',
              'rgba(54, 162, 235, 0.7)',
              'rgba(255, 206, 86, 0.7)',
              'rgba(75, 192, 192, 0.7)',
              'rgba(153, 102, 255, 0.7)',
              'rgba(255, 159, 64, 0.7)',
              'rgba(242,255,64,0.7)',
              'rgba(64,96,255,0.7)',
              'rgba(105,255,64,0.7)',
              'rgba(0,255,218,0.7)',
              'rgba(240,2,255,0.7)',
              'rgba(54,9,178,0.7)',
            ],
            borderColor: [
              'rgba(255,4,4,0.7)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(242,255,64,0.7)',
              'rgba(64,96,255,0.7)',
              'rgba(105,255,64,0.7)',
              'rgba(0,255,218,0.7)',
              'rgba(240,2,255,0.7)',
              'rgba(54,9,178,0.7)',
            ],
            borderWidth: 1,
          },
        ],
      },
      chartOptions: {
        title: {
          display: true,
          text: '월별 MPS 등록 수(계획일 기준)',
          fontSize: 20,
        },
        responsive: true,
        legend:{
          display : false
        }
      }
    }
  },

  computed: {
    ...mapState('logi/mps', ['MpsCount']),
  },

  watch:{
    MpsCount(newMpsCount) {
      const countMap = {};

      newMpsCount.forEach((value) => {
        countMap[value] = (countMap[value] || 0) + 1;
      });

      this.chartData.datasets[0].data = Array.from({ length: 12 }, (_, index) => countMap[index + 1] || 0);

      // 그래프 데이터 업데이트
      this.updateChart();
    },
  },

  methods: {
    updateChart() {
      const canvas = document.getElementById('graph');
      const data = this.chartData;
      const options = this.chartOptions;

      // 기존 그래프 삭제
      if (this.chart) {
        this.chart.destroy();
      }

      // 새로운 그래프 생성
      this.chart = new Chart(canvas, {
        type: 'bar',
        data: data,
        options: options,
      });
    },
  },

  created() {
    this.$store.dispatch('logi/mps/SEARCH_MPS_LIST')
  },

  mounted() {

    this.updateChart();

  }
}
</script>

<style>
.chart-container {
  display: flex;
  justify-content: center;
  height: 100vh; /* 화면 전체 높이로 설정 */
  width: 1500px;
}
</style>


