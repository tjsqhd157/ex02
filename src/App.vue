<template>
  <div id="app">
    <CalendarContainer title="2024년 일정 관리" />
  </div>
</template>

<script>
import CalendarContainer from "./components/CalendarContainer.vue";

export default {
  name: "App",
  components: {
    CalendarContainer,
  },
};
</script>

<style>
#app {
  font-family: "Arial", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  background-color: #f4f4f4; /* 전체 배경 */
}
</style>
