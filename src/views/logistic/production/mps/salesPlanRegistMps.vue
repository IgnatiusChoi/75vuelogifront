<template>
  <div>
    <salesPlanRegistMps />
    <hr/>
    <BarChart />
  </div>
</template>
<script>
import salesPlanRegistMps from '@/components/logistic/production/mps/salesPlanRegistMps.vue'
import BarChart from '@/components/common/chart/Chart.vue'

export default {
  components: {
    salesPlanRegistMps,
    BarChart
  },
}
</script>
