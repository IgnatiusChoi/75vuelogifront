<template>
  <component :is="'b-card'">
    <b-tabs pills>
      <b-tab
          active
      >
        <template #title>
          <feather-icon
              icon="CornerDownRightIcon"
              size="16"
              class="mr-0 mr-sm-50"
          />
          <span class="d-none d-sm-inline">품목 관리</span>
        </template>
        <!-- 내용물 컴포넌트 -->
        <itemGrid /> <!--가져온 vue 객체의 태그를 선언-->
      </b-tab>

      <b-tab >
        <template #title>
          <feather-icon
              icon="CornerDownRightIcon"
              size="16"
              class="mr-0 mr-sm-50"
          />
          <span class="d-none d-sm-inline">품목군 관리</span>
        </template>
        <!-- 내용물 컴포넌트 -->
        <itemGroupGrid/>
      </b-tab>
    </b-tabs>
  </component>

</template>

<script>
import {
  BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink, BFormRadioGroup, BCardText,
  BBadge, BDropdown, BDropdownItem, BPagination, BTooltip, BFormDatepicker, BInputGroup, BInputGroupAppend,
} from 'bootstrap-vue'
import itemGrid from '@/views/logistic/base/itemInfo/ItemGrid.vue'
import itemGroupGrid from '@/views/logistic/base/itemInfo/itemGroupGrid.vue'
import { mapActions, mapState } from 'vuex'

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
    itemGrid,
    itemGroupGrid
  },
  computed: {
  },
  data: () => ({
  }),

  watch: {},
  mounted() {
    },

  methods: {},
}
</script>

<style lang="scss" scoped>

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

