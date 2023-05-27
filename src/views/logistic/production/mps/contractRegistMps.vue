<template>
  <div>
    <contractRegistMps />
    <hr/>
    <BarChart />
  </div>
</template>
<script>
import contractRegistMps from '@/components/logistic/production/mps/contractRegistMps.vue'
import BarChart from '@/components/common/chart/Chart.vue'

export default {
  components: {
    contractRegistMps,
    BarChart
  },
}
</script>
