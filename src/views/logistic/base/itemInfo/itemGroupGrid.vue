<template>
  <div>
    <h1> 품목군 관리 </h1>

    <b-button variant="primary" class="mr-1" @click="searchItemList">조회</b-button>
    <b-button variant="primary" class="mr-1" @click="null">추가</b-button>
    <b-button variant="primary" class="mr-1" @click="">수정</b-button>
    <b-button variant="primary" class="mr-1" @click="null">삭제</b-button>
    <div>
      <b-table
          style="max-height: 300px; overflow: auto; width: 100%"
          responsive
          selectable
          :items="null"
          :fields="this.tableColumns"
          class="mb-0 scrollStyle"
      />
    </div>
  </div>
</template>
<script>
import {
  BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink, BFormRadioGroup, BCardText,
  BBadge, BDropdown, BDropdownItem, BPagination, BTooltip, BFormDatepicker, BInputGroup, BInputGroupAppend, BTab, BTabs,
} from 'bootstrap-vue'
import { mapState } from 'vuex'
export default {
  components: {
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
    BCardText,
    BTab, BTabs,
  },
  data() {
    return {
      tableColumns: [
        { key: 'itemCode', label: '품목군코드', sortable: true },
        { key: 'itemName', label: '품목군명', sortable: true },
        { key: 'description', label: '비고', sortable: true },
      ],
    }
  },
  setup() {
  },
  created() {
  },
  computed: {
    ...mapState('logi/base', ['itemGroupList'])
  },
  methods: {
    searchItemList(){
      this.$store.dispatch('logi/base/searchItemList')
    }
  }
}
</script>
