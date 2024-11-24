<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  margin: 0;
  padding: 0;
  background-color: rgba(37, 205, 148, 1); /* 기본 배경색 */
  min-height: 100vh; /* 전체 화면 높이 유지 */
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
</style>