<template> 
  <div class="body">
    <div class="container">
      <Header
        :workingCount="workingCount"
        :doneCount="doneCount"
        @navigateToCalendar="goToCalendar"
        @filterStatus="filteredTasks"
      />
      <div class="content">
        <Sidebar :tagColors="tagColors" :days="days" @addTask="handleAddTask" />
        <div class="task-columns" >
          <TaskColumn
            :tasks="this.allTasks"
            @markAsDone="markAsDone"
            @deleteTodo="deleteTodo"
            @deleteRoutine="deleteRoutine"
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
      addTasks: [],
      rotineList : [],
      todoList : [],
      tagColors: ["#80D8FF", "#FFD740", "#FFAB91", "#CE93D8", "#A5D6A7"],
      days: ["일", "월", "화", "수", "목", "금", "토"],
      filterStatus: "all",
    };
  },
  computed: {
    workingCount() {
      return this.allTasks.todoDto.filter((task) => task.done).length + this.allTasks.todoDto.filter((task) => task.done).length;
    },
    doneCount() {
      return this.allTasks.todoDto.filter((task) => task.done).length;
    },
    filteredLeftTasks() {
      return this.allTasks.routineDto.filter((task, index) => index % 2 === 0);
    },
    filteredRightTasks() {
      return this.allTasks.filter((task, index) => index % 2 !== 0);
    },
     
    filteredTasks() {
    if (this.filterStatus === "done") {
      return this.allTasks.todoDto.filter(task => task.done); // done=true
    } else if (this.filterStatus === "working") {
      return this.allTasks.todoDto.filter(task => !task.done); // done=false
    }
    return this.allTasks.todoDto; // 전체 보기
  },

    },

  created() {
    axios
      .get("/doitu/api/todoList/ALL")
      .then((response) => {
        if (response.data.statusCode === 200) {
          alert("데이터 불러오기 성공");
          this.rotineList = response.data.routineDto || []; // 데이터를 ALL_List에 저장
          this.todoList = response.data.todoDto || [] ;
          this.allTasks = response.data || [];
          this.addIsRoutineToRoutineDto();
        } else {
          alert("데이터 불러오기 실패");
        }
      })
      .catch((error) => {
        alert("데이터 불러오기 실패: " + error.message);
      });
  },

  methods: {

    dataUP(){
    axios
      .get("/doitu/api/todoList/ALL")
      .then((response) => {
        if (response.data.statusCode === 200) {
          alert("데이터 불러오기 성공");
          this.rotineList = response.data.routineDto || []; // 데이터를 ALL_List에 저장
          this.todoList = response.data.todoDto || [] ;
          this.allTasks = response.data || [];
          console.log("mergedTasks:", this.allTasks); 
          this.addIsRoutineToRoutineDto();
        } else {
          alert("데이터 불러오기 실패");
        }
      })
      .catch((error) => {
        alert("데이터 불러오기 실패: " + error.message);
      });  
    },

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
        const response = await axios.post(
          "/doitu/api/todoList/create",
          payload
        );
        console.log("Task created:", response.data);
        this.addTasks.push({ ...response.data, done: false });
        this.dataUP();
      } catch (error) {
        console.error("Error creating task:", error.response || error.message);
        alert("Task 생성 중 오류가 발생했습니다. " + error.message);
      }
    },
     
  addIsRoutineToRoutineDto() {
    if (this.allTasks.routineDto && Array.isArray(this.allTasks.routineDto)) {
      this.allTasks.routineDto = this.allTasks.routineDto.map((task) => {
        // 요일이 true인 경우 해당 요일 이름을 day 배열에 추가
        const day = [];
        if (task.sun) day.push("일요일");
        if (task.mon) day.push("월요일");
        if (task.tue) day.push("화요일");
        if (task.wed) day.push("수요일");
        if (task.thr) day.push("목요일");
        if (task.fri) day.push("금요일");
        if (task.sat) day.push("토요일");

        // day 배열에 값이 있으면 isRoutine: true, 없으면 false
        return {
          ...task,
          day, // 요일 배열 추가
          isRoutine: day.length > 0,
        };
      });

      console.log("Updated routineDto with day and isRoutine:", this.allTasks.routineDto);
    } else {
      console.error("routineDto is not an array or is undefined");
    }
  },



  // Todo 삭제 메서드
   async deleteTodo(taskId) {
    try {
        const response = await axios.delete(`/doitu/api/todoList/todo/delete/${taskId}`);
        if (response.status === 200) {
            this.dataUP();
            console.log("삭제 성공");
        }
    } catch (error) {
        console.error("삭제 요청 중 오류 발생:", error.message);
    }
},
  // Routine 삭제 메서드
  async deleteRoutine(routineId) {
    try {
      const response = await axios.delete(`/doitu/api/todoList/routine/delete/${routineId}`);
      if (response.data.statusCode === 200) {
        console.log("Routine 삭제 성공");
            this.dataUP();
            console.log("삭제 성공");
      } else {
        console.error("Routine 삭제 실패: ", response.data);
      }
    } catch (error) {
      console.error("삭제 요청 중 오류 발생: ", error.message);
    }
  },

    async markAsDone(taskId) {
    // 로컬 상태 업데이트
    const taskIndex = this.allTasks.todoDto.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
      this.allTasks.todoDto[taskIndex].done = !this.allTasks.todoDto[taskIndex].done;
    }

    // 서버와 동기화
    try {
    const response = await axios.post(`/doitu/api/todoList/done/${taskId}`);
    if (response.data.statusCode === 200) {
      alert("작업 완료 상태로 변경 성공!");
    } else {
      alert("상태 변경 실패: " + response.data.msg);
    }
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error.message);
  }
  },
 

},
   showDoneTasks() {
    this.filterStatus = "done";
  },
  showAllTasks() {
    this.filterStatus = "all";
  },
  

    goToCalendar() {
      this.$router.push("/calendar");
    },

  mounted() {
   
  },
};
</script>

<style scoped>
.body {
  width: 100vw; /*넓이 보는 화면에 맞춰서 조절*/
  height: 100vh;
  font-family: Arial, sans-serif;
  background-color: #2dc987; /* 녹색 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* 수평 스크롤 방지 */
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