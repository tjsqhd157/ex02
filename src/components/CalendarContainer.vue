<template>
    <div class="calendar-container">
      <!-- 캘린더 상단 제목 -->
      <div class="calendar-header">
        <h2>{{ title }}</h2>
      </div>
  
      <!-- 캘린더 본체 -->
      <div class="calendar-body">
        <Calendar />
      </div>
    </div>
  </template>
  
  <script>
  import Calendar from "./Calendar.vue";
  
  export default {
    name: "CalendarContainer",
    components: {
      Calendar,
    },
    props: {
      title: {
        type: String,
        default: "달력 보기",
      },
    },
  };
  </script>
  
  <style scoped>
  /* 전체 테두리 스타일 */
  .calendar-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 90%; /* 컨테이너 전체 너비 */
    max-width: 900px; /* 최대 너비 제한 */
    margin: 50px auto; /* 페이지 중앙 배치 */
    padding: 20px;
    background: #fff; /* 배경색 */
    border: 1px solid #ddd; /* 테두리 */
    border-radius: 10px; /* 둥근 모서리 */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
  }
  
  /* 상단 제목 스타일 */
  .calendar-header {
    width: 100%;
    text-align: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #ddd; /* 제목과 캘린더 사이 선 */
  }
  
  .calendar-header h2 {
    font-size: 1.5rem;
    color: #333;
    margin: 0;
  }
  
  /* 캘린더 본체 스타일 */
  .calendar-body {
    width: 100%;
    padding: 10px 0;
  }
  </style>
  