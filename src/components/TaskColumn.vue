<template>
  <div class="task-column">
    <TaskCard
      v-for="(task, index) in tasks"
      :key="task.id"
      :task="task"
      :index="index"
      :noDoneButton="task.noDoneButton" 
      @markAsDone="markAsDone"
      @deleteTask="deleteTask"
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
    tasks: Array,
    noDoneButton: Boolean, /*done버튼이 있는지 없는지 확인하는 변수 */
  },
  methods: {
    markAsDone(task) {
      this.$emit('markAsDone', task);
    },
    deleteTask(taskId) {
      this.$emit('deleteTask', taskId);
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
