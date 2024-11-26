<template>
  <div class="calendar-wrapper">
    <vc-calendar
      v-model="currentDate"
      :is-expanded="true"
    >
      <template #day-content="{ day }">
        <div
          class="custom-day-cell"
          @click="onDayClick(day)"
        >
          <!-- 날짜 텍스트 -->
          <div class="day-text">{{ day.day }}</div>
          <!-- 이모지 -->
          <div class="emoji" v-if="getDayData(day.date)?.emoji">
            {{ getDayData(day.date).emoji }}
          </div>
          <!-- 이벤트 -->
          <div class="events" v-if="getDayData(day.date)?.events">
            <span v-for="(event, index) in getDayData(day.date).events" :key="index">
              {{ event }}
            </span>
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
import axios from "axios";
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
      // 날짜별 더미 데이터
      { date: "2024-11-10", emoji: "😀", events: ["Meeting", "Shopping"] },
      { date: "2024-11-11", emoji: "😡", events: ["Coding Session"] },
      { date: "2024-11-12", emoji: "😢", events: ["Project Review"] },
      { date: "2024-11-13", emoji: "😆", events: ["Team Lunch"] },
      { date: "2024-11-14", emoji: "😍", events: ["Yoga Class", "Dinner"] },
    ],
  };
  },
  methods: {
    async fetchCalendarData() {
      try {
        const formattedMonth = this.currentDate.toISOString().split("T")[0].slice(0, 7); // "YYYY-MM" 형식
        const response = await axios.get("/api/calendar", {
          params: { month: formattedMonth },
        });
        this.dayData = response.data.days; // API 응답 데이터 매핑
      } catch (error) {
        console.error("Error fetching calendar data:", error);
        alert("캘린더 데이터를 불러오는 데 실패했습니다.");
      }
    },
    getDayData(date) {
      const formattedDate = date.toISOString().split("T")[0];
      return this.dayData.find((d) => d.date === formattedDate);
    },
    onDayClick(day) {
      const formattedDate = day.date.toLocaleDateString("en-CA"); // "YYYY-MM-DD" 형식
      this.selectedDayData = this.getDayData(day.date) || { events: [] };
      this.selectedDate = formattedDate; // 선택된 날짜 설정
      this.isModalOpen = true; // 모달 열기
    },
    handleModalClose({ emoji, diary }) {
      console.log("감정:", emoji, "일기:", diary);
      this.isModalOpen = false;
    },
  },
  mounted() {
    this.fetchCalendarData(); // 컴포넌트가 마운트되면 API 호출
  },
  watch: {
    currentDate(newDate, oldDate) {
      if (newDate.getMonth() !== oldDate.getMonth()) {
        this.fetchCalendarData(); // 달이 바뀔 때마다 데이터 갱신
      }
    },
  },
};
</script>

<style scoped>
/* 캘린더 전체 스타일 */
.calendar-wrapper {
  max-width: 1000px;
  height: 500px;
  
  margin: 50px auto;
}

/* 날짜 셀 스타일 */
.custom-day-cell {
  width: 120px; /* 셀 너비 */
  height: 80px; /* 셀 높이 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  position: relative; /* 날짜와 이모지 위치 조정을 위한 기준 */
}

.custom-day-cell:hover {
  background-color: #f5f5f5;
  transform: scale(1.05);
}

/* 날짜 텍스트 스타일 */
.day-text {
  position: absolute; /* 날짜를 셀 안의 특정 위치로 고정 */
  top: 5px; /* 셀 위쪽에서 5px 아래로 배치 */
  right: 5px; /* 셀 오른쪽에서 5px 안쪽으로 배치 */
  font-size: 0.9rem; /* 텍스트 크기 */
  font-weight: bold;
  color: #333333;
}

/* 이모지 스타일 */
.emoji {
  position: absolute; /* 이모지를 셀 안의 특정 위치로 고정 */
  top: 5px; /* 셀 위쪽에서 5px 아래로 배치 */
  left: 5px; /* 셀 왼쪽에서 5px 안쪽으로 배치 */
  font-size: 0.8rem; /* 이모지 크기 */
}

/* 이벤트 텍스트 박스 스타일 */
.events {
  font-size: 0.5rem; /* 텍스트 크기 */
  color: #666666; /* 텍스트 색상 */
  text-align: center; /* 텍스트 정렬 */
  margin-top: 5px; /* 위쪽 간격 */
  padding: 5px; /* 내부 여백 */
  width: 90%; /* 셀 크기와 비슷하게 너비 설정 */
  border: 1px solid #e0e0e0; /* 테두리 */
  border-radius: 5px; /* 둥근 모서리 */
  background-color: #f9f9f9; /* 배경색 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 약간의 그림자 */
  margin-left: auto; /* 왼쪽 정렬 */
  margin-right: auto; /* 오른쪽 정렬 */
  display: block; /* 각 이벤트를 블록으로 표시 */
}

.events span {
  display: block; /* 이벤트를 각각의 줄에 표시 */
  margin-bottom: 2px; /* 아래쪽 간격 추가 */
}

</style>
