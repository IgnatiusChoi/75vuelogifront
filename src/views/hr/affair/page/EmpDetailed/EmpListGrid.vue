<template>
  <div>
    <b-card title="HOW 직원정보 관리 ❓" v-if="hideHow!==false">
      <b-card-text>직원목록에서 직원을 클릭하면 상세정보조회가 가능합니다.</b-card-text>
      <div>

        <b-card-text>자세한건
          <b-link href="https://www.google.com/" target="_blank">원장님</b-link>
          에게 문의하세요.
        </b-card-text>
        <b-button
          size="sm"
          variant="outline-danger"
          @click="hideHow=false"
        >
          닫기
        </b-button>
      </div>
    </b-card>
    <b-row>
      <b-col
        md="2"
        sm="4"
        class="my-1"
      >
        <b-form-group
          class="mb-0"
        >
          <label class="d-inline-block text-sm-left mr-50">페이지 수</label>
          <b-form-select
            id="perPageSelect"
            v-model="perPage"
            size="sm"
            :options="pageOptions"
            class="w-50"
          />
        </b-form-group>
      </b-col>
      <b-col
        md="4"
        sm="8"
        class="my-1"
      >
        <b-form-group
            label="정렬"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            label-for="sortBySelect"
            class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-select
              id="sortBySelect"
              v-model="sortBy"
              :options="sortOptions"
              class="w-75"
            >
              <template v-slot:first>
                <option value="">
                  -- none --
                </option>
              </template>
            </b-form-select>
            <b-form-select
              v-model="sortDesc"
              size="sm"
              :disabled="!sortBy"
              class="w-25"
            >
              <option :value="false">
                Asc
              </option>
              <option :value="true">
                Desc
              </option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col
        md="6"
        class="my-1"
      >
        <b-form-group
            label="전체 검색"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            label-for="filterInput"
            class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
                id="filterInput"
                v-model="filter"
                type="search"
                placeholder="검색어"
            />
            <b-input-group-append>
              <b-button
                :disabled="!filter"
                @click="filter = ''"
              >
                Clear
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

      <transition class="start">
        <b-col cols="12">
          <b-table
              striped
              hover
              responsive
              :per-page="perPage"
              :current-page="currentPage"
              :items="items"
              :fields="fields"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              :sort-direction="sortDirection"
              :filter="filter"
              :filter-included-fields="filterOn"
              @filtered="onFiltered"
              @row-clicked="onRowEmpDetailRouting"
          >
            <template #cell(button)="data">
              <button @click="abc">asdf</button>
            </template>
            <template #cell(avatar)="data">
              <b-avatar :src="require(`@/assets/images/avatars/${data.item.empCode}.png`)"/>
            </template>
            <!--                      <template #cell(status)="data">
                                    <b-badge :variant="status[1][data.value]">
                                      {{ status[0][data.value] }}
                                    </b-badge>
                                  </template>-->
          </b-table>
        </b-col>
      </transition>

      <b-col
        cols="12"
      >
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="center"
          size="sm"
          class="my-0"
        />
      </b-col>
    </b-row>

    <!--    <b-table striped hover :items="items"></b-table>-->
  </div>
</template>

<script>
import {
  BAvatar,
  BBadge,
  BButton,
  BCard,
  BCardText,
  BCol,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BInputGroup,
  BInputGroupAppend,
  BLink,
  BPagination,
  BRow,
  BTable
} from 'bootstrap-vue'

import {mapState} from "vuex";
import router from "@/router";

export default {
  components: {
    BTable,
    BAvatar,
    BBadge,
    BRow,
    BCol,
    BFormGroup,
    BFormSelect,
    BPagination,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BButton,
    BCard,
    BLink,
    BCardText,
  },

  // and in data
  data() {
    return {
      hideHow: true,
      perPage: 5,
      pageOptions: [3, 5, 10],
      totalRows: 0,
      currentPage: 1,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      infoModal: {
        id: 'info-modal',
        title: '',
        content: '',
      },
      fields: [
        {
          key: 'empCode', label: '고유ID',
        },
        {
          key: 'avatar', label: '사진',
        },
        {key: 'empName', label: '이름', sortable: true},
        {key: 'birthDate', label: '생일', sortable: true},
        {key: 'detailCodeName', label: '부서', sortable: true},
        {key: 'gender', label: '성별', sortable: true},
      ],
      items: [],
    }
  },
  computed: {
    ...mapState({ empList : state => state.hr.emp.allEmpList.empList }),
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => ({ text: f.label, value: f.key }))
    },
  },
  beforeCreate() {
    console.log('beforecreate')
    this.$store.dispatch('hr/emp/GET_ALL_EMP_LIST');
  },

  mounted() {
    const timeout = setTimeout(() => {
      this.items = this.empList;
      this.totalRows = this.empList.length;
    }, 500)
  },

  methods: {
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`
      this.infoModal.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    resetInfoModal() {
      this.infoModal.title = ''
      this.infoModal.content = ''
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    onRowEmpDetailRouting(items) {
      this.$store.dispatch('hr/emp/GET_EMP_DETAIL',items.empCode);
      router.push(`/hr/emp-detail/?empCode=${items.empCode}`)
      console.log(this.$route.params);
    }
  }
}

</script>

<style>
.start-enter-from {
  opacity: 0;
}

.start-enter-active {
  transition: all 3s;
}

.start-enter-to {
  opacity: 1;
}
</style>
