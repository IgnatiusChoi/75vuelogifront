<template>
  <div>
    <Mps />
    <hr/>
    <BarChart />
  </div>
</template>
<script>
import Mps from '@/components/logistic/production/mps/Mps.vue'
import BarChart from '@/components/common/chart/Chart.vue'

export default {
  components: {
    Mps,
    BarChart
  },
}
</script>
