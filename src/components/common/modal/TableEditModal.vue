<template>
  <div class="paymentModal">
    <div class="overlay" />
    <div
      class="card"
      style=" min-height:300px; min-width: 500px; max-width: 80vw; border-radius: 10px;"
    >
      <b-card-header
        class="header"
        style="padding:13px 10px 0 0"
      >
        <h4 style="margin:auto">
          추가할 행의 데이터를 적어주십시오.
        </h4>
      </b-card-header>
      <hr style="border-top:1px rgba(93, 93, 93, 0.5) solid; width:100%">

      <b-card-body class="modal-body" />
      <div
        style="max-height: 500px; overflow-y: scroll"
        class="scrollStyle"
      >
        <template v-for="(row, index) in tableRowData">
          <template v-if="row.dataType === 'selectToInput' && !row.hide">
            <b-col
              cols="12"
              md="10"
              class="d-flex align-items-center justify-content-start mb-1 mb-md-1"
            >
              <div style="width: 190px; ">
                <label style="font-size: 15px; float:right">{{ row.label }} : &nbsp</label>
              </div>
              <b-form-select
                v-model="row.value"
                :options="row.options"
                style="width: 200px; font-size: 15px; font-family: 'Yu Gothic';"
                :value="row.value"
              />
            </b-col>
            <b-col
              cols="12"
              md="10"
              class="d-flex align-items-center justify-content-start mb-1 mb-md-1"
            >
              <div style="width: 190px; ">
                <label style="font-size: 15px; float:right">{{ row.To.label }} : &nbsp</label>
              </div>
              <b-form-input
                v-model="row.value"
                :placeholder="row.label"
                style="width: 200px;"
                :value="row.value"
                :disabled="row.disabled"
              />
            </b-col>
          </template>
          <b-col
            v-if="row.dataType !== 'selectToInput' && !row.hide"
            cols="12"
            md="10"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-1"
          >
            <div style="width: 190px; ">
              <label style="font-size: 15px; float:right">{{ row.label }} : &nbsp</label>
            </div>
            <b-form-input
              v-if="!row.hide && row.dataType === 'input' || row.dataType === undefined "
              v-model="row.value"
              :placeholder="row.label"
              style="width: 200px;"
              :value="row.value"
              :disabled="row.disabled"
            />

            <b-form-select
              v-else-if="!row.hide && row.dataType === 'select'"
              v-model="row.value"
              :options="row.options"
              style="width: 200px; font-size: 15px; font-family: 'Yu Gothic';"
              :value="row.value"
            />
            <b-input-group
              v-else-if="!row.hide && row.dataType === 'date'"
              style="width: 200px;"
            >
              <b-form-input
                v-model="row.value"
                type="text"
                disabled
                autocomplete="off"
                show-decade-nav
                :value="row.value"
              />
              <b-input-group-append style="height: 37px;">
                <b-form-datepicker
                  v-model="row.value"
                  show-decade-nav
                  button-only
                  button-variant="outline-primary"
                  right
                  size="sm"
                  locale="en-US"
                  aria-controls="example-input"
                  :disabled="row.disabled"
                />
              </b-input-group-append>
            </b-input-group>
          </b-col>
        </template>
      </div>

      <b-card-footer class="modal-footer">
        <b-button
          variant="primary"
          size="md"
          class="mb-md-1"
          @click="closeModal"
        >
          취소
        </b-button>
        <b-button
          variant="primary"
          size="md"
          class="mb-md-1"
          @click="inputModal"
        >
          입력
        </b-button>
      </b-card-footer>

    </div>
  </div>
</template>
<script>
import {
  BDropdownDivider, BCard, BCardHeader, BCardBody, BCardFooter, BCol, BButton,
  BFormInput, BFormSelect, BFormDatepicker, BInputGroup, BInputGroupAppend,
} from 'bootstrap-vue'

export default {
  components: {
    BDropdownDivider,
    BCard,
    BCardHeader,
    BCardBody,
    BCardFooter,
    BCol,
    BButton,
    BFormInput,
    BFormSelect,
    BFormDatepicker,
    BInputGroup,
    BInputGroupAppend,
  },
  props: ['tableRowData'],
  data() {
    return {
    }
  },
  methods: {
    closeModal() {
      this.$emit('close', false)
    },
    inputModal() {
      const rowData = []
      const data = {}
      let toData = null
      let toKeyName = null
      let originKey = null
      let originValue = null
      let isTo = false
      this.tableRowData.map(e => {
        const { key, value } = e
        data[key] = value
        if (e.To !== undefined) {
          isTo = true
          const { toKey } = e.To
          toKeyName = toKey// to
          originKey = e.key// origin
          e.options.filter(option => {
            if (option.value === e.value) {
              toData = option.value// to
              originValue = option.text// origin
            }
          })
        }
      })
      if (isTo) {
        data[toKeyName] = toData// to
        data[originKey] = originValue// origin
      }
      rowData.push(data)
      console.log(rowData)

      this.$emit('input-modal', rowData)
    },
  },
}
</script>
<style lang="scss">
    @import '../../../assets/scss/modal';
    #scrollStyle::-webkit-scrollbar-track
    {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
      background-color: rgba(50,60,150,1);
      border-radius: 10px;
      box-shadow: inset 0px 0px 5px rgba(50,50,150,1);
    }

    #scrollStyle::-webkit-scrollbar
    {
      width: 10px;
      background-color: rgba(50,50,150,0);
    }

    #scrollStyle::-webkit-scrollbar-thumb
    {
      background-clip: padding-box;
      border: 4px solid transparent;
      border-radius: 10px;
      /*    background-image: -webkit-gradient(linear,
      left bottom,
      left top,
      color-stop(0.44, rgb(122,153,217)),
      color-stop(0.72, rgb(73,125,189)),
      color-stop(0.86, rgb(28,58,148)));*/
      background-color: #7367f0;
    }
</style>
