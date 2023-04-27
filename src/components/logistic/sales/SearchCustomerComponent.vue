<template>
  <div>
    <b-button
      v-b-modal.companyCode
      variant="primary"
      size="md"
      class="mb-md-1 ml-1"
    >
      회사코드로 검색
    </b-button>
    <b-modal
      id="companyCode"
      title="Scrollable Content"
      cancel-variant="outline-secondary"
    >
      <b-card
        class="scrollStyle"
        style="margin:auto; overflow-y: scroll; height: 50vh; padding-left: 50px"
      >
        <b-form-radio-group
          v-model="searchCompanyCodeOption"
          :options="options"
          class="demo-inline-spacing mb-1"
          value-field="value"
          text-field="text"
          disabled-field="disabled"
        />
        <b-table
          hover
          selectable
          :select-mode="'single'"
          :fields="fields"
          :items="customerCodeList"
          @row-clicked="companyCodeClick"
        />
      </b-card>
    </b-modal>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import {
  BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink,
  BBadge, BDropdown, BDropdownItem, BPagination, BTooltip,
  BTableLite, BFormDatepicker, BInputGroup, BInputGroupAppend, BFormRadioGroup,
} from 'bootstrap-vue'
import BCardCode from '@core/components/b-card-code/BCardCode'
import vSelect from 'vue-select'

export default {
  components: {
    BCardCode,
    BTableLite,
    vSelect,
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,
    BTooltip,
    BFormDatepicker,
    BInputGroup,
    BInputGroupAppend,
    BFormRadioGroup,
  },
  computed: {
    ...mapState({
      customerCodeList: state => state.hr.company.companyCodeList,
    }),
  },
  watch: {
    searchCompanyCodeOption(newValue) {
      if (newValue !== '') {
        const searchOption = { searchCondition: newValue, workplaceCode: 'BRC-01' }
        this.$store.dispatch('hr/company/searchCustomerList', searchOption)
      }
    },
  },
  methods: {
    companyCodeClick(payload) {
      console.log('companyClick')
      this.$emit('get-customer', payload.customerCode, payload.customerName)
    },
  },
  data() {
    return {
      searchCompanyCodeOption: '',
      options: [
        { text: '전체', value: 'ALL', disabled: false },
        { text: '근무지별', value: 'WORKPLACE', disabled: false },
      ],
      fields: [
        { key: 'customerCode', label: '화사코드' },
        { key: 'customerName', label: '고객사명' },
      ],
    }
  },
}
</script>

<style scoped>

</style>
