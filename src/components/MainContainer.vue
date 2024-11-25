<template>
  <div class="body"> 
    <div class="container">
      <Header :workingCount="workingCount" :doneCount="doneCount" @navigateToCalendar="goToCalendar" @filterStatus="handleFilterStatus" />
      <div class="content">
        <Sidebar :days="days" :tagColors="tagColors" @addTask="addTask" />
        <div class="task-columns">
          <TaskColumn :tasks="filteredLeftTasks" @markAsDone="markAsDone" @deleteTask="deleteTask" />
          <TaskColumn :tasks="filteredRightTasks" @markAsDone="markAsDone" @deleteTask="deleteTask" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './Header.vue';
import Sidebar from './TaskSideBar.vue';
import TaskColumn from './TaskColumn.vue';

export default {
  components: {
    Header,
    Sidebar,
    TaskColumn,
  },
  data() {
    return {
      allTasks: [], // Unified list of all tasks
      days: ["일", "월", "화", "수", "목", "금", "토"],
      tagColors: ["#80D8FF", "#FFD740", "#FFAB91", "#CE93D8", "#A5D6A7"],
      filterStatus: 'all', // all, done, working
    };
  },
  computed: {
    workingCount() {
      return this.allTasks.filter(task => !task.done).length; // Total working task count
    },
    doneCount() {
      return this.allTasks.filter(task => task.done).length; // Total done task count
    },
    filteredLeftTasks() {
      return this.getFilteredTasks().filter((task, index) => index % 2 === 0);
    },
    filteredRightTasks() {
      return this.getFilteredTasks().filter((task, index) => index % 2 !== 0);
    }
  },
  methods: {
    addTask(newTask) {
      const task = { ...newTask, id: Date.now(), done: false ,  
      hasRoutine: newTask.routine && newTask.routine.length > 0, // 루틴이 설정되어 있는지 여부 저장
      routineDays: newTask.routine || []
      };
      if (task.hasRoutine) {
      task.noDoneButton = true; // 루틴이 설정된 경우 done 버튼 없이 생성
      this.allTasks.unshift(task); // 루틴이 설정된 경우 리스트의 맨 앞에 추가
      } else {
      this.allTasks.push(task); // 루틴이 없는 경우 리스트의 맨 뒤에 추가
      }
      this.distributeTasks();
    },
    deleteTask(taskId) {
      this.allTasks = this.allTasks.filter((task) => task.id !== taskId);
      this.distributeTasks();
    },
    markAsDone(task) {
      task.done = true;
      this.distributeTasks();
    },
    distributeTasks() {
      this.leftTasks = [];
      this.rightTasks = [];
      this.allTasks.forEach((task, index) => {
        if (index % 2 === 0) this.leftTasks.push(task);
        else this.rightTasks.push(task);
      });
    },
    goToCalendar() {
      this.$router.push("/calendar"); // '/calendar' 경로로 이동
      
    },
    handleFilterStatus(status) {
      this.filterStatus = status;
    },
    getFilteredTasks() {
      if (this.filterStatus === 'done') {
        return this.allTasks.filter(task => task.done);
      } else if (this.filterStatus === 'working') {
        return this.allTasks.filter(task => !task.done);
      }
      return this.allTasks; 
    }
  },
  mounted() {
    this.distributeTasks();
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
