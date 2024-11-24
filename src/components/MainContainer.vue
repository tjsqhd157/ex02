<template>
  <div class="container">
    <!-- Header -->
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
          <div class="status-item">
            <span class="label-al">All</span>
          </div>

          <!-- Working Status -->
          <div class="status-item">
            <span class="status-icon">🔥</span>
            <span class="status-working">Working..!</span>
            <span class="status-count">{{ workingCount }}</span>
          </div>

          <!-- Done Status -->
          <div class="status-item">
            <span class="status-icon">🌈</span>
            <span class="status-done">Done...!</span>
            <span class="status-count">{{ doneCount }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="content">
      <!-- Sidebar -->
      <div class="sidebar">
        <!-- Title Input -->
        <div>
          <label for="title" class="title label">제목</label>
          <input
            id="title"
            v-model="newTask.title"
            type="text"
            class="input"
            placeholder="Enter title"
          />
        </div>

        <!-- Content Input -->
        <div>
          <label for="content" class="label">content</label>
          <textarea
            id="content"
            v-model="newTask.content"
            class="textarea"
            placeholder="Enter content"
          ></textarea>
        </div>

        <!-- Routine Selector -->
        <div>
          <label class="label">routine</label>
          <div class="routine-container">
            <button
              v-for="(day, i) in days"
              :key="i"
              :class="[
                'routine-button',
                { active: newTask.routine.includes(day) },
              ]"
              @click="toggleRoutine(day)"
            >
              {{ day }}
            </button>
          </div>
        </div>

        <!-- Tag Selector -->
        <div>
          <label class="label">tag</label>
          <div class="tags">
            <button
              v-for="(tag, i) in tagColors"
              :key="i"
              :style="{ backgroundColor: tag }"
              class="tag-button"
              :class="{ active: newTask.tag === tag }"
              @click="selectTag(tag)"
            ></button>
          </div>
        </div>

        <!-- Add Button -->
        <button class="add-button" @click="addTask">add</button>
      </div>

      <!-- Task Columns -->
      <div class="task-columns">
        <!-- Left Column -->
        <div class="task-L-column">
          <div
            v-for="task in leftTasks"
            :key="'left-' + task.id"
            class="task-card"
          >
            <div class="task-header">
              <!-- Global task number -->
              <span class="task-status">
                {{ allTasks.findIndex((t) => t.id === task.id) + 1 }}
              </span>
              <div class="task-actions">
                <button class="task-done">✓</button>
                <button class="task-delete" @click="deleteTask(task.id)">
                  🗑
                </button>
              </div>
            </div>

            <div class="task-body">
              <h3 class="task-title">{{ task.title }}</h3>
              <p class="task-content">{{ task.content }}</p>
            </div>
            <div class="task-footer">
              <div class="task-tags">
                <span
                  v-for="(day, i) in task.routine"
                  :key="i"
                  class="task-day"
                >
                  {{ day }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="task-R-column">
          <div
            v-for="task in rightTasks"
            :key="'right-' + task.id"
            class="task-card"
          >
            <div class="task-header">
              <!-- Global task number -->
              <span class="task-status">
                {{ allTasks.findIndex((t) => t.id === task.id) + 1 }}
              </span>
              <div class="task-actions">
                <button class="task-done">✓</button>
                <button class="task-delete" @click="deleteTask(task.id)">
                  🗑
                </button>
              </div>
            </div>

            <div class="task-body">
              <h3 class="task-title">{{ task.title }}</h3>
              <p class="task-content">{{ task.content }}</p>
            </div>
            <div class="task-footer">
              <div class="task-tags">
                <span
                  v-for="(day, i) in task.routine"
                  :key="i"
                  class="task-day"
                >
                  {{ day }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      newTask: {
        title: "",
        content: "",
        routine: [],
        tag: null,
      },
      allTasks: [], // Unified list of all tasks
      leftTasks: [], // Tasks for the left column
      rightTasks: [], // Tasks for the right column
      toggleSide: true, // Determines which column gets the next task (true = left, false = right)
      days: ["일", "월", "화", "수", "목", "금", "토"],
      tagColors: ["#80D8FF", "#FFD740", "#FFAB91", "#CE93D8", "#A5D6A7"],
    };
  },
  computed: {
    workingCount() {
      return this.allTasks.length; // Total task count
    },
  },
  methods: {
    addTask() {
      if (this.newTask.title && this.newTask.content) {
        const task = { ...this.newTask, id: Date.now() };
        this.allTasks.push(task);
        this.distributeTasks();
        this.newTask = { title: "", content: "", routine: [], tag: null };
      }
    },
    deleteTask(taskId) {
      this.allTasks = this.allTasks.filter((task) => task.id !== taskId);
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
    toggleRoutine(day) {
      const index = this.newTask.routine.indexOf(day);
      if (index > -1) this.newTask.routine.splice(index, 1);
      else this.newTask.routine.push(day);
    },
    selectTag(tag) {
      this.newTask.tag = this.newTask.tag === tag ? null : tag;
    },
    goToCalendar() {
      alert("Navigate to Calendar!");
    },
  },
  mounted() {
    this.distributeTasks();
  },
};
</script>


<style scoped>
/* General Container Styles */
.container {
  display: flex;
  flex-direction: column;
  font-family: Arial, sans-serif;
  height: 100vh;
  background-color: #e9f7ef;
  padding: 20px;
}

/* Header Styles */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.logo {
  font-size: 24px;
  color: #25cd94;
}
.status-bar {
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  background-color: white;
  border-radius: 30px;

  box-shadow: inset 0 4px 6px rgba(0, 0, 0, 0.1),
    /* 내부 그림자 */ 0 2px 4px rgba(0, 0, 0, 0.1); /* 외부 그림자 */

  max-width: 400px;
  margin: 20px auto; /* 화면 중앙 정렬 */
}

.status-item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  padding: 10px 15px;
}

.label-al {
  font-size: 13.34px;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  color: rgba(37, 205, 148, 1);
  width: 15.76px;
  height: 16px;
}

.status-icon {
  font-size: 16px; /* 아이콘 크기 */
}

.status-working {
  font-size: 12.47px;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
  width: 72px;
  height: 15px;
}

.status-done {
  font-size: 12.47px;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
  width: 59px;
  height: 15px;
}

.status-count {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e0f7fa;
  color: rgba(37, 205, 148, 1);
  font-size: 14px;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2); /* 내부 그림자 */
}

/* Main Content */
.content {
  display: flex;
  flex: 1;
  gap: 20px; /* Sidebar와 Task Columns 사이 간격 */
}

/* Sidebar Styles */
.sidebar {
  background: #25cd94;
  border-radius: 10px;
  padding: 20px;
  width: 300px;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input {
  width: 83%;
  border-radius: 15px;
  border: none;
  padding: 10px;
  background-color: #f9f9f9;
  margin: 10px;
  resize: none;
}

.textarea {
  width: 83%;
  height: 304px;
  border-radius: 15px;
  border: none;
  padding: 10px;
  margin: 10px;
  resize: none;
}
.routine-container,
.tags {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.routine-button,
.tag-button {
  width: 26px;
  height: 26px;
  border-radius: 10px;
  margin: 5px;
  border: none;
  background-color: white;
  line-height: auto;
}

.routine-button.active {
  background-color: #00c389;
  color: white;
}
.tag-button.active {
  border: 2px solid black;
}

.add-button {
  width: 100%;
  padding: 15px;
  background-color: #008a65;
  border: none;
  border-radius: 10px;
  color: white;
  cursor: pointer;
  font-size: 16px;
}

/* Task Columns */
.task-columns {
  flex: 1; /* 나머지 공간 차지 */
  display: flex;
}
.task-L-column {
  flex: 1;
  border-radius: 10px 0px 0px 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 500px; /* 열의 가로 크기 고정 */
  height: 600px; /* 열의 높이 고정 */
  overflow-y: auto; /* 스크롤 가능 */
}
.task-R-column {
  flex: 1;

  border-radius: 0px 10px 10px 0px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 500px; /* 열의 가로 크기 고정 */
  height: 600px; /* 열의 높이 고정 */
  overflow-y: auto; /* 스크롤 가능 */
}

/* .task-card {
  background: #f9f9f9;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
} */
.task-card {
  background-color: #ffffff; /* White background for the card */
  border: 1px solid #e0e0e0; /* Light border for card outline */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  padding: 16px; /* Padding inside the card */
  margin-bottom: 16px; /* Spacing between cards */
  font-family: Arial, sans-serif; /* Clean font style */
}

.task-header {
  display: flex;
  justify-content: space-between; /* Align status and delete button */
  align-items: center;
  margin-bottom: 8px; /* Space below the header */
}

.task-status {
  background-color: #6ecf68; /* Green circle color */
  color: white;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%; /* Make it a perfect circle */
  font-size: 14px;
  font-weight: bold;
}

.task-delete {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #333; /* Default icon color */
  transition: color 0.3s ease;
}

.task-delete:hover {
  color: #ff4d4f; /* Red color on hover */
}

.task-body {
  margin-bottom: 12px; /* Space below the body */
}

.task-title {
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 8px 0; /* Title spacing */
}

.task-content {
  font-size: 14px;
  color: #666; /* Subtle text color */
}

.task-footer {
  display: flex;
  justify-content: flex-start; /* Align tags to the left */
  gap: 8px; /* Space between routine days */
}

.task-tags {
  display: flex;
  gap: 8px; /* Space between tags */
}

.task-day {
  background-color: #f0f0f0; /* Light gray background for tags */
  color: #333; /* Text color */
  padding: 4px 8px; /* Padding for tags */
  border-radius: 4px; /* Rounded tag corners */
  font-size: 12px;
}
.task-done {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px; /* Match the size of the delete button */
  color: #333; /* Default icon color */
  margin-left: 8px; /* Add spacing between the status and button */
  transition: color 0.3s ease, transform 0.2s ease; /* Smooth hover effect */
}

.task-done:hover {
  color: #6ecf68; /* Green color on hover to indicate success */
  transform: scale(1.1); /* Slight zoom on hover for emphasis */
}
</style>
