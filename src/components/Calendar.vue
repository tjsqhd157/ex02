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
          <!-- 요일 루틴 -->
          <div class="routine" v-if="getDayData(day.date)?.routine">
            <span
              v-for="(routine, index) in getDayData(day.date).routine"
              :key="index"
              :style="{ color: routine.color }"
            >
              {{ routine.title }}
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
      dayData: [], // API로 초기화
    };
  },
  methods: {
    async fetchCalendarData() {
      try {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth() + 1; // 월은 0부터 시작하므로 +1
        const response = await axios.get(`/doitu/api/calender/${year}/${month}`);

        if (response.data.statusCode === 200) {
          this.dayData = response.data.calenderDto.map((entry) => ({
            date: entry.date,
            emoji: entry.emoji,
            events: [
              ...entry.todoDto.map((todo) => `${todo.title} (${todo.done ? "완료" : "미완료"})`)
            ],
            routine: this.processRoutine(entry.routineDto, entry.date),
          }));
        } else {
          console.error("캘린더 데이터를 불러오는 데 실패했습니다:", response.data.msg);
          alert("캘린더 데이터를 불러오는 데 실패했습니다.");
        }
      } catch (error) {
        console.error("Error fetching calendar data:", error);
        alert("캘린더 데이터를 불러오는 중 오류가 발생했습니다.");
      }
    },
    processRoutine(routineDto, date) {
      // 요일에 따라 활성화된 루틴만 반환
      const weekDay = new Date(date).getDay(); // 0: 일요일, 1: 월요일 ...
      const weekKeys = ["sun", "mon", "tue", "wed", "thr", "fri", "sat"];

      return routineDto
        .filter((routine) => routine[weekKeys[weekDay]]) // 해당 요일이 true인 루틴만
        .map((routine) => ({
          title: routine.title,
          color: routine.color,
        }));
    },
    getDayData(date) {
      const formattedDate = this.formatDateToISO(date); // ISO 형식 변환
      return this.dayData.find((d) => d.date === formattedDate);
    },
    formatDateToISO(date) {
      // 날짜 형식을 ISO 8601 형식 (YYYY-MM-DD)으로 변환
      const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
      return offsetDate.toISOString().split("T")[0]; // 로컬 시간대로 변환
    },
    onDayClick(day) {
      const formattedDate = this.formatDateToISO(day.date); // 날짜 형식을 ISO로 변환
      this.selectedDayData = this.getDayData(day.date) || { events: [], routine: [] };
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
      if (newDate.getMonth() !== oldDate.getMonth() || newDate.getFullYear() !== oldDate.getFullYear()) {
        this.fetchCalendarData(); // 연도와 월이 바뀔 때마다 데이터 갱신
      }
    },
  },
};
</script>

<style scoped>
/* 기존 스타일 유지 */
.calendar-wrapper {
  max-width: 1000px;
  height: 500px;
  margin: 50px auto;
}

.custom-day-cell {
  width: 120px;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  position: relative;
}

.custom-day-cell:hover {
  background-color: #f5f5f5;
  transform: scale(1.05);
}

.day-text {
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 0.9rem;
  font-weight: bold;
  color: #333333;
}

.emoji {
  position: absolute;
  top: 5px;
  left: 5px;
  font-size: 0.8rem;
}

.events, .routine {
  font-size: 0.5rem;
  color: #666666;
  text-align: center;
  margin-top: 5px;
  padding: 5px;
  width: 90%;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-left: auto;
  margin-right: auto;
}

.events span, .routine span {
  display: block;
  margin-bottom: 2px;
}
</style>
