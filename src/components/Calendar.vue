<template>
    <div class="calendar-wrapper">
      <vc-calendar
        v-model="currentDate"
        :is-expanded="true"
      >
        <template #day-content="{ day }">
          <div class="calendar-cell" @click="onDayClick(day)">
            <!-- 날짜 표시 -->
            <div class="date">{{ day.day }}</div>
  
            <!-- 감정 이모지 -->
            <div v-if="getDayData(day.date)?.emoji" class="emoji">
              {{ getDayData(day.date).emoji }}
            </div>
  
            <!-- 이벤트 목록 -->
            <div v-if="getDayData(day.date)?.events" class="events">
              <div
                v-for="(event, index) in getDayData(day.date).events"
                :key="index"
                class="event"
              >
                {{ event }}
              </div>
            </div>
          </div>
        </template>
      </vc-calendar>
  
      <!-- 모달 컴포넌트 -->
      <EventModal
        v-if="isModalOpen"
        :is-visible="isModalOpen"
        :day-data="selectedDayData"
        :formatted-date="selectedDate"
        @close="handleModalClose"
      />
    </div>
  </template>
  
  <script>
  import EventModal from "./EventModal.vue";
  
  export default {
    name: "Calendar",
    components: {
      EventModal,
    },
    data() {
      return {
        currentDate: new Date(),
        isModalOpen: false,
        selectedDayData: null,
        selectedDate: "",
        dayData: [
          {
            date: "2024-11-11",
            emoji: "😡",
            events: ["화남", "회의 취소"],
          },
          {
            date: "2024-11-12",
            emoji: "😭",
            events: ["슬픈 일 있음"],
          },
          {
            date: "2024-11-20",
            emoji: "😊",
            events: ["루틴 성공", "운동 완료"],
          },
        ],
      };
    },
    methods: {
      getDayData(date) {
        const formattedDate = date.toISOString().split("T")[0];
        return this.dayData.find((d) => d.date === formattedDate);
      },
      onDayClick(day) {
        const formattedDate = day.date.toISOString().split("T")[0];
        this.selectedDayData = this.getDayData(day.date) || { events: [] };
        this.selectedDate = formattedDate;
        this.isModalOpen = true;
      },
      handleModalClose({ emoji, diary }) {
        console.log("감정:", emoji, "일기:", diary);
        this.isModalOpen = false;
      },
    },
  };
  </script>
  
  <style scoped>
  /* 캘린더 전체 스타일 */
  .calendar-wrapper {
    max-width: 800px;
    margin: 50px auto;
  }
  
  /* 날짜 셀 스타일 */
  .calendar-cell {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 5px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    border: 1px solid #f0f0f0;
    border-radius: 5px;
    background-color: #fff;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .calendar-cell:hover {
    background-color: #e3f2fd; /* 호버 시 하늘색 배경 */
  }
  
  /* 날짜 표시 스타일 */
  .date {
    font-size: 0.9rem;
    color: #333;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  /* 이모지 스타일 */
  .emoji {
    font-size: 1.5rem;
    margin-bottom: 5px;
  }
  
  /* 이벤트 목록 스타일 */
  .events {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  
  .event {
    background-color: #e0f7fa; /* 이벤트 배경 하늘색 */
    border-radius: 5px;
    padding: 2px 5px;
    font-size: 0.8rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: background-color 0.3s ease;
  }
  
  .event:hover {
    background-color: #b2ebf2; /* 이벤트 호버 시 더 진한 하늘색 */
  }
  </style>
  