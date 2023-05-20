
<template>
  <div >

    <!-- 사업장 추가 모달창 -->

    <b-modal size="lg"
             v-model="isModal"
             title="사업장 추가"
             style="font-family: '배달의민족 도현'"
             @ok="onModalOk"
    >
      <b-container>
        <b-row class="my-1" v-for="(field,index) in inputFields" :key="index" style="font-family: '배달의민족 도현'">
          <b-col sm="4">
            <label :for="`field-${field}`">{{ field.label }} :</label>
          </b-col>
          <b-col sm="6">
            <template v-if="field.label.includes('월일')">
              <b-input-group class="mb-md-1" style="width: 170px; margin: 0 10px 0 10px;">
                <b-form-input v-model="form[field.key]"
                              type="text"
                              placeholder="YYYY-MM-DD"
                              autocomplete="off"
                              show-decade-nav />
                <b-input-group-append style="height: 37px;">
                  <b-form-datepicker
                      v-model="form[field.key]"
                      show-decade-nav
                      button-only
                      button-variant="primary"
                      right
                      size="sm"
                      locale="en-US"
                      aria-controls="example-input"
                  />
                </b-input-group-append>
              </b-input-group>
            </template>

            <template v-else-if="field.key === 'companyCode' && !field.label.includes('월일')">
              <div role="group">
                <b-form-input
                    id="input-live"
                    v-model="name"
                    :state="nameState"
                    aria-describedby="input-live-help input-live-feedback"
                    placeholder=" ex) OOO-XXXX "
                    trim
                ></b-form-input>

                <b-form-invalid-feedback id="input-live-feedback">
                  1글자 이상 입력해요 혼나기 싫으면
                </b-form-invalid-feedback>

              </div>
            </template>

            <template v-else>
              <b-form-input :id="`field-${field}`" :field="field" v-model="form[field.key]" />
            </template>
          </b-col>
        </b-row>
      </b-container>
    </b-modal>

    <!-- 사업장 수정 모달창 -->

    <b-modal size="lg"
             v-model="isEditModal"
             title="사업장 정보 수정"
             style="font-family: '배달의민족 도현'"
             @ok="onModalUpdateOk"
    >
      <b-container>
        <b-row class="my-1" v-for="(field,index) in inputFields" :key="index" style="font-family: '배달의민족 도현'">
          <b-col sm="4">
            <label :for="`field-${field}`">{{ field.label }} :</label>
          </b-col>
          <b-col sm="6">
            <template v-if="field.label.includes('월일')">
              <b-input-group class="mb-md-1" style="width: 170px; margin: 0 10px 0 10px;">
                <b-form-input v-model="selectedRowForUpdate[index+4][1]"
                              type="text"
                              placeholder="YYYY-MM-DD"
                              autocomplete="off"
                              show-decade-nav />
                <b-input-group-append style="height: 37px;">
                  <b-form-datepicker
                      v-model="selectedRowForUpdate[index+4][1]"
                      show-decade-nav
                      button-only
                      button-variant="outline-primary"
                      right
                      size="sm"
                      locale="en-US"
                      aria-controls="example-input"
                  />
                </b-input-group-append>
              </b-input-group>
            </template>

            <!--            <template v-else-if="field.key === 'workplaceCode'">
                          <div role="group">
                            <b-form-input
                                id="input-live"
                                v-model="name"
                                :state="nameState"
                                aria-describedby="input-live-help input-live-feedback"
                                placeholder=" ex) OOO-XXXX "
                                trim

                            ></b-form-input>

                            <b-form-invalid-feedback id="input-live-feedback">
                              1글자 이상 입력해요 혼나기 싫으면
                            </b-form-invalid-feedback>
                            &lt;!&ndash;                <b-form-text id="input-live-help">Your full name.</b-form-text>&ndash;&gt;
                          </div>
                        </template>-->

            <template v-else>
              <b-form-input :id="`field-${field}`" :field="field" v-model="selectedRowForUpdate[index+4][1]" />
            </template>
          </b-col>
        </b-row>
      </b-container>
    </b-modal>


    <!--테이블안에 버튼넣기 -->
    <div  class="col-md-12 padding">
      <button-list
          :active-button="activeButtons"
          @closeModal="isModal = false"
          @add="addWorkplace"
          @delete="deleteWorkplace"
          @edit="editWorkplace"
      />
    </div>

    <!-- 테이블 -->
    <div >
      <workplace-info-grid
          @selected-item="onSelectedItem"
          @selected-for-update="selectedForUpdate"
      >
        <template v-slot:header>
          <h2
              class="mb-md-1 margin"
              style=" width: 150px"
          >
            사업장 목록
          </h2>

        </template>
      </workplace-info-grid>
    </div>
    <workplace-detail-info-grid>
      <template v-slot:header>
        <h2
            class="mb-md-1 margin"
        >사업장 정보</h2>
      </template>
    </workplace-detail-info-grid>

    <!-- 테이블 끝 -->


  </div>
</template>

<script>

import WorkplaceInfoGrid from '@/components/logistic/info/BasicInfo/WorkplaceInfoGrid'
import WorkplaceDetailInfoGrid from '@/components/logistic/info/BasicInfo/WorkplaceDetailInfoGrid'
import buttonList from '@/components/logistic/info/BasicInfo/ButtonList'
import Vue from "vue";
import {mapActions, mapState} from "vuex";
import Modal from '@/components/logistic/info/BasicInfo/Modal'
import tableColumnsData from "@/components/logistic/info/BasicInfo/WorkplaceColumnData";

export default {
  components: {

    WorkplaceInfoGrid,
    WorkplaceDetailInfoGrid,
    buttonList,
    Modal,
    tableColumnsData,

  },
  computed: {
    inputFieldKeys() {
      // inputFields 배열을 순회하면서 form 객체의 초기값을 설정
      return this.inputFields.reduce((acc, curr) => {
        acc[curr] = '';
        return acc;
      }, {});
    },
    check(){
      console.log(this.form)
      console.log("this.form")
    },

    nameState() {
      return this.name.length > 0 ? true : false
    }

  },

  data() {
    return {
      activeButtons: "workplace",
      addBtStatus:'',
      isModal: false,
      isEditModal: false,
      tableColumns: tableColumnsData,
      inputFields : [],
      selectedRow : '',
      selectedRowForUpdate: '',
      form: [],
      name: '',
    }
  },

  watch: {

  },

  created() {
    this.form = this.inputFieldKeys;
  },

  mounted() {
    console.log(this.form)
    console.log("this.form")

  },
  methods: {

    onSelectedItem(item){
      console.log(item)
      console.log("item")

      this.selectedRow = item
      console.log(this.selectedRow)
      console.log("this.selectedRow")

    },

    selectedForUpdate(item){
      this.selectedRowForUpdate = Object.entries(item[0])
    },

    async onModalOk(){
      await this.$store.dispatch('logi/compInfo/INSERT_WORKPLACE', this.form)
      this.$store.dispatch('logi/compInfo/SEARCH_WORKPLACE_LIST')
    },

    async onModalUpdateOk(){
      await this.$store.dispatch('logi/compInfo/UPDATE_WORKPLACE', this.selectedRowForUpdate )
      this.$store.dispatch('logi/compInfo/SEARCH_WORKPLACE_LIST')
    },

    async addWorkplace() {
      this.isModal = true,
          console.log(this.isModal)
      console.log("this.isModal")

      this.inputFields = [...tableColumnsData[0].tableColumns, ...tableColumnsData[0].detailTableColumns].map(col => {
        return {
          label: col.label,
          key: col.key,
        };
      }),
          console.log("dd")
      console.log(this.inputFields)
    },

    async deleteWorkplace() {
      await this.$store.dispatch('logi/compInfo/DELETE_WORKPLACE', this.selectedRow)
      this.$store.dispatch('logi/compInfo/SEARCH_WORKPLACE_LIST')
    },

    async editWorkplace() {
      this.isEditModal = true
    },
  }

}
</script>

<style lang="scss" scoped>

.padding{
  margin-bottom: 2rem;
}

.margin{
  margin-left: 1rem;
  margin-top: 1rem;
}

</style>

<style lang="scss">



.scrollStyle::-webkit-scrollbar-track
{
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  background-color: rgba(50,60,150,1);
  border-radius: 10px;
  box-shadow: inset 0px 0px 5px rgba(50,50,150,1);
}

.scrollStyle::-webkit-scrollbar
{
  width: 10px;
  background-color: rgba(50,50,150,0);
}

.scrollStyle::-webkit-scrollbar-thumb
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
