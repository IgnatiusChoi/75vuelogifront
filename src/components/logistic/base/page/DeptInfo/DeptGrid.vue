<template>

  <!-- Table Container Card -->
    <b-card
            no-body
            style="font-family: '배달의민족 도현'; max-height: 500px"
            class="scrollStyle"
    >

        <div class="m-2">

            <b-row>
                <!-- Table Top -->
                <b-col
                        cols="12"
                        md="6"
                        class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
                        style="min-width: 1200px;"
                >
                    <h2 v-html="title" />

                </b-col>
            </b-row>
        </div>

        <b-row />
        <div
                style="overflow-y: auto; overflow-x: auto; max-height: 210px;"
                class="scrollStyle"
        >
            <b-table
                    ref="table"
                    :items="deptInfo"
                    :fields="fieldsData"
                    style="overflow: auto; width: 100%"
                    show-empty
                    empty-text="No matching records found"
                    selectable
            />
        </div>
        <div class="mx-2 mb-2">
            <b-row />
        </div>
    </b-card>
</template>
<script>
import {
    BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink,
    BBadge, BDropdown, BDropdownItem, BPagination, BTooltip,
    BTableLite, BFormDatepicker, BInputGroup, BInputGroupAppend,
} from 'bootstrap-vue'
import BCardCode from '@core/components/b-card-code/BCardCode.vue'
import {  mapState } from 'vuex'

export default {
    components: {
        BCardCode,
        BTableLite,
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

    },
    props: ['title', 'fields'],
    computed: {
        ...mapState('logi/base',['deptInfo']),
    },
    data() {
        return {
            gridData: [],
            fieldsData: [],
            selectMode: 'single',
        }
    },
    watch: {
    },
    created() {
        this.fieldsData=this.fields;
        this.$store.dispatch('logi/base/GET_DEPT_INFO')
    },
    mounted() {
        /*    if (this.columnWidth === undefined) {
          this.$refs.table.style.width = this.columnWidth
        } */
    },
}
</script>

<style
    lang="scss"
    scoped
>
.per-page-selector {
  width: 90px;
}

.invoice-filter-select {
  min-width: 190px;

  ::v-deep .vs__selected-options {
    flex-wrap: nowrap;
  }

  ::v-deep .vs__selected {
    width: 100px;
  }
}
</style>

<style lang="scss">
@import '../../../../../@core/scss/vue/libs/vue-select';
@import '../../../../../assets/scss/modal';
@import '../../../../../assets/scss/scrollStyle';
</style>
