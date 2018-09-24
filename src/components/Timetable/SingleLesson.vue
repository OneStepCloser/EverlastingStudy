<template>
  <div class="singleLesson">
    <div class="line" style="font-size: 1.1em; font-weight: 600">{{lesson.discipline}}{{lesson.auditorium !== '' ? ', ' :''}}{{lesson.auditorium}}</div>
    <div class="line extra">{{lesson.kindOfWork}}</div>
    <div class="line extra">{{lesson.lecturer}}</div>
  </div>
</template>

<script>
  export default {
    name: "SingleLesson",
    props: {
      lesson: {
        type: Object,
        default: () =>{
          return {
            discipline: '',
            kindOfWork: '',
            auditorium: '',
            lecturer: '',
          }
        }
      }
    }
  }
</script>

<style scoped>
  .singleLesson {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .line{
    word-break: break-word;
    width: 100%
  }
  .extra{
    opacity: 0.7;
  }
</style>
