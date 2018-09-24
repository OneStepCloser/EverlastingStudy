<template>
  <div>
    <div v-if="!currMail" class="unauthorised-outer">
      <el-card class="email-card">
        Введите почту:
        <el-input v-model="mail">
        </el-input>
        <el-button @click="auth()">
          Сохранить
        </el-button>
      </el-card>
    </div>
    <div v-else style="display: flex; flex-direction: column; justify-content: center; align-items: center">
      <div
        style="margin-top: 16px; display: flex; flex-direction: row; justify-content: flex-end; align-items: center; width: 100%">
            <span>
              {{currMail}}
            </span>
        <el-button style="margin: 0 16px" @click="logout()"><</el-button>
      </div>
      <el-date-picker v-model="dates"
                      type="daterange"
                      align="center"
                      :picker-options="{
                        firstDayOfWeek: 1,
                      }"
                      :disabled="pickerDisabled"
                      @change="picked"
                      start-placeholder="Начальная дата"
                      end-placeholder="Конечная дата"
                      style="margin-top: 16px"
                      value-format="yyyy.MM.dd"
                      format="yyyy.MM.dd"/>
      <el-table :data="allLessons"
                style="width: 90%; margin-top: 24px"
                border>
        <el-table-column
          label="Начало"
          width="150"
          fixed
          prop="start">
        </el-table-column>

        <el-table-column v-for="(l, i) in labels"
                         :label="l"
                         :key="i">
          <template slot-scope="scope">
            <single-lesson :lesson="scope.row[l]"></single-lesson>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import SingleLesson from './SingleLesson'
  import Vue from 'vue'
  import moment from 'moment'

  export default {
    name: "timetable",
    data() {
      return {
        mail: null,
        dates: ['2018.09.10', '2018.09.16'],
        labels: [],
        pickerDisabled: false
      }
    },

    components: {SingleLesson},
    methods: {
      auth() {
        if (!this.mail.match(/.*@edu\.hse\.ru$|.*@hse\.ru$/))
          this.$store.dispatch('showErrorToastWithMessage', 'Введите почту домена @edu.hse.ru или @hse.ru');
        else
          this.$store.dispatch('addCurrentMail', this.mail);
      },
      logout() {
        this.mail = "";
        this.$store.dispatch('removeCurrentMail');
      },
      getDates(start, stop) {
        let dateArray = [];
        let currentDate = moment(start);
        let stopDate = moment(stop);
        while (currentDate <= stopDate) {
          dateArray.push(moment(currentDate).format('YYYY.MM.DD'));
          currentDate = moment(currentDate).add(1, 'days');
        }
        return dateArray;
      },
      loadLessons(start, finish) {
        this.labels = this.getDates(start, finish);
        return this.$store.dispatch('loadLessons', {fromDate: start, toDate: finish});
      },
      dowNumToString(num) {
        switch (num) {
          case 1:
            return 'Понедельник';
          case 2:
            return 'Вторник';
          case 3:
            return 'Среда';
          case 4:
            return 'Четверг';
          case 5:
            return 'Пятница';
          case 6:
            return 'Суббота';
          case 0:
            return 'Воскресенье';
        }
      },
      picked() {
        this.pickerDisabled = true;
        this.loadLessons(this.dates[0], this.dates[1])
          .then(() => {
            this.pickerDisabled = false
          })
      },
    },
    computed: {
      currMail() {
        return this.$store.getters.getCurrentMail
      },
      allLessons() {
        console.log('alllessong', this.$store.getters.getAllLessons);
        return this.$store.getters.getAllLessons
      },

    },
    created() {
      this.loadLessons(this.dates[0], this.dates[1]);
    },


  }
</script>

<style scoped lang="scss">
  .unauthorised-outer {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
  }

  .email-card {
    width: 40%
  }
</style>
