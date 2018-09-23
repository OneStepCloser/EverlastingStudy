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
      <el-date-picker v-model="startDate"
                      style="margin-top: 16px"
                      type="date">

      </el-date-picker>
      <el-table :data="allLessons"
                style="width: 90%; margin-top: 24px"
                border>
        <el-table-column
          label="Начало"
          width="150"
          fixed
          prop="start">
        </el-table-column>
        <el-table-column
          label="Понедельник">
          <template slot-scope="scope">
            <single-lesson :lesson="scope.row.MON"></single-lesson>
          </template>
        </el-table-column>
        <el-table-column
          label="Вторник">
          <template slot-scope="scope">
            <single-lesson :lesson="scope.row.TUE"></single-lesson>
          </template>
        </el-table-column>
        <el-table-column
          label="Среда">
          <template slot-scope="scope">
            <single-lesson :lesson="scope.row.WED"></single-lesson>
          </template>
        </el-table-column>
        <el-table-column
          label="Четверг">
          <template slot-scope="scope">
            <single-lesson :lesson="scope.row.THU"></single-lesson>
          </template>
        </el-table-column>
        <el-table-column
          label="Пятница">
          <template slot-scope="scope">
            <single-lesson :lesson="scope.row.FRI"></single-lesson>
          </template>
        </el-table-column>
        <el-table-column
          label="Суббота">
          <template slot-scope="scope">
            <single-lesson :lesson="scope.row.SAT"></single-lesson>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import SingleLesson from './SingleLesson'
  export default {
    name: "timetable",
    data() {
      return {
        mail: null,
        startDate: '2018.09.10',
        finishDate: '2018.09.16',
      }
    },
    components:{SingleLesson},
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
      }
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
      this.$store.dispatch('loadLessons', {fromDate: this.startDate, toDate: this.finishDate})
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
