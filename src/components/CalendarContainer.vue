<template>
    <div class="calendar-container">
      <div class="header">
        <div class="logo">
          <span><img src="@/assets/images/checked_green.png" /></span> DoitU
        </div>
        <div class="navigation">
          <button class="calendar-btn" @click="goToMain">Calendar</button>
          <div class="status-filters">
            <button class="status all">All</button>
            <button class="status working">
              🔥 Working..! <span class="count">2</span>
            </button>
            <button class="status done">
              🌈 Done..! <span class="count">0</span>
            </button>
          </div>
        </div>
      </div>
  
      <!-- 캘린더 추가 -->
      <div class="calendar-content">
        <Calendar />
      </div>
    </div>
  </template>
  
  <script>
  // Calendar 컴포넌트를 가져옵니다.
  import Calendar from "@/components/Calendar.vue";
  
  export default {
    name: "CalendarContainer",
    methods:{
      goToMain(){
        this.$router.push("/mainContainer"); 
      },
    },
    components: {
      Calendar, // 캘린더 컴포넌트 등록
    },
  };
  </script>
  
  <style scoped>
  /* 전체 컨테이너 스타일 */
  .calendar-container {
    background-color: #f4f4f4; /* 밝은 회색 배경 */
    padding: 15px 30px;
    border-radius: 10px;
    margin: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  /* 상단 헤더 스타일 */
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .logo {
    font-size: 24px;
    font-weight: bold;
    color: rgba(37, 205, 148, 1);
    display: flex;
    align-items: center;
  }
  
  .logo span {
    font-size: 18px;
    margin-right: 5px;
  }
  
  .navigation {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  
  .calendar-btn {
    background-color: #66bb6a;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 20px;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  .calendar-btn:hover {
    background-color: #43a047;
  }
  
  .status-filters {
    display: flex;
    gap: 10px;
  }
  
  .status {
    background-color: white;
    color: #43a047;
    border: none;
    padding: 10px 15px;
    border-radius: 20px;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  
  .status .count {
    background-color: #e0e0e0;
    color: #43a047;
    padding: 3px 7px;
    border-radius: 50%;
    font-size: 12px;
    font-weight: bold;
  }
  
  .status:hover {
    background-color: #e8f5e9;
    color: #2e7d32;
  }
  
  /* 캘린더 컨텐츠 스타일 */
  .calendar-content {
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  </style>
  