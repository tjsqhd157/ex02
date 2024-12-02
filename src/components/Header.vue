<template>
  <div class="header">
    <div class="logo">
      <span><img src="@/assets/images/checked_green.png" alt="logo" /></span>
      DoitU
    </div>
    <div class="navigation">
      <!-- Calendar 버튼 -->
      <button class="calendar-btn" @click="goToCalendar">Calendar</button>
      <div class="status-bar">
        <!-- All Status -->
        <button class="status all" @click="filterAll">All</button>

        <!-- Working Status -->
        <button class="status working" @click="filterWorking">🔥 Working..!
          <span class="status-count">{{ workingCount }}</span>
        </button>

        <!-- Done Status -->
        <button class="status done" @click="filterDone">🌈 Done...!
          <span class="status-count">{{ doneCount }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AppHeader",
  data() {
    return {
      allTasks: {
        routineDto: [],
        todoDto: [],
      },
    };
  },
  computed: {
    workingCount() {
      return (
        this.allTasks.routineDto.length +
        this.allTasks.todoDto.filter((task) => !task.done).length
      );
    },
    doneCount() {
      return this.allTasks.todoDto.filter((task) => task.done).length;
    },
  },
  created() {
    axios
      .get("/doitu/api/todoList/ALL")
      .then((response) => {
        if (response.data.statusCode === 200) {
          this.allTasks = response.data || { routineDto: [], todoDto: [] };
        } else {
          alert("데이터 불러오기 실패");
        }
      })
      .catch((error) => {
        alert("데이터 불러오기 실패: " + error.message);
      });
  },
  methods: {
    goToCalendar() {
      this.$router.push("/calendar");
    },
    filterDone() {
      this.$emit("filterStatus", "done");
    },
    filterWorking() {
      this.$emit("filterStatus", "working");
    },
    filterAll() {
      this.$emit("filterStatus", "all");
    },
  },
};
</script>

<style scoped>
/* Header Styles */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}
.navigation {
  display: flex;
  align-items: center;
}
.logo {
  font-size: 24px;
  color: #25cd94;
  font-weight: bold;
}
.calendar-btn {
  background-color: #c9f4e9;
  border: none;
  border-radius: 50px;
  padding: 10px 20px;
  margin-right: 15px;
  color: #26c281;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}
.status-bar {
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  padding: 5px 10px;
  border-radius: 50px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.status {
  display: flex;
  align-items: center;
  background-color: transparent;
  border-radius: 20px;
  padding: 5px 10px;
  margin-right: 10px;
  font-size: 14px;
  cursor: pointer;
  color: #26c281;
  border: none;
}
.status-count {
  background-color: #d6f5e3;
  border-radius: 50%;
  padding: 3px 8px;
  margin-left: 5px;
  font-size: 12px;
  font-weight: bold;
}
</style>
