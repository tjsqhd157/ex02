<template>
  <div class = "task-column">
      <TaskCard
        v-for="(task, taskIndex) in tasks.routineDto"
        :key="task.id"
        :task="task"
        :index="taskIndex"
        @markAsDone="markAsDone"
        @deleteTask="deleteRoutine"
      />
      <TaskCard
        v-for="(task, taskIndex) in tasks.todoDto"
        :key= "task.id"
        :task="task"
        :index="taskIndex"
        @markAsDone="markAsDone"
        @deleteTask="deleteTodo"
      />   
  </div>
</template>

<script>
import TaskCard from './TaskCard.vue';

export default {
  components: {
    TaskCard,
  },
  props: {
    tasks: {
      type: Object
    },

  },
  methods: {
    markAsDone(taskId) {
    this.$emit("markAsDone", taskId); // 부모 컴포넌트로 이벤트 전달
  },
    deletetodo(taskId) {
      this.$emit('deleteTodo', taskId);
    },
    deleteRoutine(taskId) {
      this.$emit('deleteRoutine', taskId);
    },
  },
};
</script>

<style scoped>
.task-column {
  flex: 1;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 80%;
  overflow: hidden;
}
</style>
