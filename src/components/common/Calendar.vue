<template>
  <v-row style="font-family: '배달의민족 도현'">
    <v-col cols="12" sm="8">
      <v-app>
        <div
            class="ma-4"
            style="height: 100%"
        >
          <v-menu
              v-model="selectedOpen"
              :close-on-content-click="false"
              :activator="selectedElement"
              offset-x
          >
            <v-card min-width="200px">
              <v-toolbar
                  color="purple accent-4"
                  dark
              >
                <v-toolbar-title>
                  {{ selectedEvent.name }}
                </v-toolbar-title>
              </v-toolbar>
              <v-card-text style="font-size: 15px;" v-for="e in vCardText">
                {{ e.label }} : {{ selectedEvent[e.key] }} <br/>
              </v-card-text>
            </v-card>
          </v-menu>
          <v-calendar
              :events="this.calendarData"
              :event-color="getEventColor"
              @click:event="showEvent"
              :type="type"
              :now="todayIs"
              :value="this.date.from"
          ></v-calendar>
        </div>

      </v-app>
    </v-col>

    <v-col cols="12" sm="4">
      <MonthPicker :default-month="date.monthIndex" @change="showDate"/>
      <br/>
      <hr/>
      <div>
        <b-table
            :items="mrpGatheringCalendar"
            class="editable-table"
            hover
            :fields="fields"
        />
      </div>
    </v-col>
  </v-row>
</template>


<script>
import {mapActions, mapState} from "vuex";
import {mrpGatheringList, mrpGatheringResult} from "@/components/logistic/production/fields";
import {MonthPicker} from "vue-month-picker"
import {MonthPickerInput} from "vue-month-picker";

export default {
  name: 'App',
  components: {
    MonthPicker,
    MonthPickerInput
  },
  data: () => {
    return {
      focus: '',
      eventColors: {},
      type: 'month',
      selectedOpen: false,
      selectedElement: undefined,
      selectedEvent: {},
      date: {
        from: null,
        to: null,
        month: null,
        year: null
      },
      calendarData: [],
      fields: mrpGatheringResult,
      vCardText: mrpGatheringList,
      events: [
        {
          name: 'Event 1',
          start: '2022-04-01',
          timed: false,
        },
        {
          name: 'Event 2',
          start: '2023-06-04',
          end: '2023-06-10',
        },
        {
          name: 'Event 3',
          start: '2022-04-04T05:00:00',
          end: '2022-04-04T07:00:00',
          timed: true,
        },
        {
          name: 'Event 4',
          start: '2022-04-08T08:00:00',
          end: '2022-04-08T10:00:00',
          timed: true,
        },
      ],
    };
  },
  methods: {
    ...mapActions('logi/mrp', ['SEARCH_MRP_GATHERING_CALENDAR']),

    showDate(date) {
      this.date = date;
      this.SEARCH_MRP_GATHERING_CALENDAR(date.monthIndex)
          .then(() => {
            this.calendarData = this.mrpGatheringCalendar.map(event => ({
              ...event,
              start: event.claimDate,
              end: event.dueDate,
              name: event.itemName,
            }));
            console.log(this.calendarData)
            console.log("this.calendarData")
            console.log(this.date.from)
            console.log("this.date.from")
          })
    },

    getEventColor(event) {
      if (!this.eventColors[event.mrpGatheringSeq]) {
        const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        this.eventColors[event.mrpGatheringSeq] = randomColor;
      }

      return this.eventColors[event.mrpGatheringSeq];
    },


    showEvent({nativeEvent, event}) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        requestAnimationFrame(() =>
            requestAnimationFrame(
                () => (this.selectedOpen = true)
            )
        );
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        requestAnimationFrame(() =>
            requestAnimationFrame(() => open())
        );
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
  },
  computed: {
    ...mapState('logi/mrp', ['searchMrpGatheringList', "mrpGatheringCalendar"]),

    todayIs() {
      const date = new Date(this.currentDate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      this.today = `${year}-${month}-${day}`;
    },
  },
};

// export default {

//   data: () => ({
//     today: '',
//     defaultMonth:null,
//
//

//     events: [
//       {
//         title: 'Vacation',
//         details: 'Going to the beach!',
//         date: '2023-06-10',
//         open: false
//       },
//     ],
//
//   }),
//

//
//
//     eventsMap() {
//       const map = {}
//       this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e))
//       return map
//     }
//   },
//
//   methods: {
//     ...mapActions('logi/mrp', ['SEARCH_MRP_GATHERING_CALENDAR']),
//
//
//     open(event) {
//       console.log(event)
//       console.log("event")
//
//         event.open = true;
//     },
//     rowSelect(){
//
//       console.log(this.calendarData)
//       console.log("this.calendarData")
//     }
//   },
// }
</script>


<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';

.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  width: 100%;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
}

.card-position {
  width: 50vh;
  align-items: center;
}

</style>
