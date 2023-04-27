<template>
  <div>
    <estimate-info-table></estimate-info-table>
    <hr/>
    <estimate-info-detail></estimate-info-detail>
  </div>
</template>

<script>
// eslint-disable-next-line import/extensions
import EstimateInfoDetail from '@/components/logistic/sales/estimate/estimateInfo/EstimateInfoDetail.vue'
// eslint-disable-next-line import/extensions
import EstimateInfoTable from '@/components/logistic/sales/estimate/estimateInfo/EstimateInfoTable'

export default {
  components: {
    EstimateInfoTable,
    EstimateInfoDetail,
  },
}
</script>
