<template>
  <div class="task-column">
    <TaskCard
      v-for="(task, index) in tasks"
      :key="`${task.id}-${index}`"
      :task="task"
      :index="index"
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
    tasks: {
      type: Array,
      default: () => [], // 기본값 설정
    },
    noDoneButton: Boolean,
  },
  mounted() {
    // tasks 데이터 확인 (컴포넌트가 렌더링된 후)
    console.log("Tasks data in TaskColumn:", this.tasks);
  },
  methods: {
    markAsDone(task) {
      this.$emit("markAsDone", task);
    },
    deleteTask(taskId) {
      this.$emit("deleteTask", taskId);
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
