<template>
  <div class="body">
    <div class="container">
      <Header
        :workingCount="workingCount"
        :doneCount="doneCount"
        @navigateToCalendar="goToCalendar"
        @filterStatus="handleFilterStatus"
      />
      <div class="content">
        <Sidebar :tagColors="tagColors" :days="days" @addTask="handleAddTask" />
        <div class="task-columns">
          <TaskColumn
            :tasks="filteredLeftTasks"
            @markAsDone="markAsDone"
            @deleteTask="deleteTask"
          />
          <TaskColumn
            :tasks="filteredRightTasks"
            @markAsDone="markAsDone"
            @deleteTask="deleteTask"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./Header.vue";
import Sidebar from "./TaskSideBar.vue";
import TaskColumn from "./TaskColumn.vue";
import axios from "axios";
axios.defaults.withCredentials = true; // 쿠키를 전송하기 위해 설정
export default {
  components: {
    Header,
    Sidebar,
    TaskColumn,
  },
  data() {
    return {
      allTasks: [],
      tagColors: ["#80D8FF", "#FFD740", "#FFAB91", "#CE93D8", "#A5D6A7"],
      days: ["일", "월", "화", "수", "목", "금", "토"],
      filterStatus: "all",
    };
  },
  computed: {
    workingCount() {
      return this.allTasks.filter((task) => !task.done).length;
    },
    doneCount() {
      return this.allTasks.filter((task) => task.done).length;
    },
    filteredLeftTasks() {
      return this.getFilteredTasks().filter((task, index) => index % 2 === 0);
    },
    filteredRightTasks() {
      return this.getFilteredTasks().filter((task, index) => index % 2 !== 0);
    },
  },
  methods: {
async handleAddTask(newTask) {
  const routineData = {
    sun: newTask.routine.includes("일"),
    mon: newTask.routine.includes("월"),
    tue: newTask.routine.includes("화"),
    wed: newTask.routine.includes("수"),
    thr: newTask.routine.includes("목"),
    fri: newTask.routine.includes("금"),
    sat: newTask.routine.includes("토"),
  };

  // 순서를 보장한 객체 생성
  const payload = {
    title: newTask.title, // 순서 1
    content: newTask.content, // 순서 2
    sun: routineData.sun, // 순서 3
    mon: routineData.mon, // 순서 4
    tue: routineData.tue, // 순서 5
    wed: routineData.wed, // 순서 6
    thr: routineData.thr, // 순서 7
    fri: routineData.fri, // 순서 8
    sat: routineData.sat, // 순서 9
    color: newTask.tag || "BLUE", // 순서 10
  };

  console.log("Payload being sent:", payload);
 

  try {
    const response = await axios.post("/doitu/api/todoList/create", payload);
    console.log("Task created:", response.data);
    this.allTasks.push({ ...response.data, done: false });
  } catch (error) {
    console.error("Error creating task:", error.response || error.message);
   
   alert("Task 생성 중 오류가 발생했습니다. "+ error.message);
  }
},

    deleteTask(taskId) {
      this.allTasks = this.allTasks.filter((task) => task.id !== taskId);
    },
    markAsDone(task) {
      task.done = !task.done;
    },
    goToCalendar() {
      this.$router.push("/calendar");
    },
    handleFilterStatus(status) {
      this.filterStatus = status;
    },
    getFilteredTasks() {
      if (this.filterStatus === "done") {
        return this.allTasks.filter((task) => task.done);
      }
      if (this.filterStatus === "working") {
        return this.allTasks.filter((task) => !task.done);
      }
      return this.allTasks;
    },
  },
};
</script>

<style scoped>
.body{
  width: 100vw; /*넓이 보는 화면에 맞춰서 조절*/
  height: 100vh;
  font-family: Arial, sans-serif;
  background-color: #2dc987; /* 녹색 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow : hidden; /* 수평 스크롤 방지 */
}
.container {
  flex-direction: column;
  font-family: Arial, sans-serif;
  background-color: #e9f7ef;
  width: 80%;
  padding: 20px;
  margin: 20px;
  border-radius: 25px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
.content {
  display: flex;
  flex: 1;
  gap: 20px;
  height: 100%;
}
.task-columns {
  flex: 1;
  display: flex;
}
</style>