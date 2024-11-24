<template>
  <div class="app">
    <div class="card" v-for="(item, index) in items" :key="index">
      <div class="card-header">
        <span :class="['status', item.status]"></span>
        <div class="card-title">{{ item.title }}</div>
      </div>
      <div class="card-body">
        <p>{{ item.description }}</p>
      </div>
      <div class="card-footer">
        <button @click="editItem(index)" class="icon-button">✏️</button>
        <button @click="deleteItem(index)" class="icon-button">🗑️</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: '리액트 강의보기', description: '천천히 1주차부터 12주차...', status: 'blue' },
        { title: '점심 먹기', description: '점심 뭐이지..?', status: 'yellow' },
        { title: '리액트 강의보기', description: '천천히 1주차부터 12주차...', status: 'orange' },
        { title: '점심 먹기', description: '점심 뭐하지..?', status: 'purple' },
      ]
    };
  },
  methods: {
    editItem(index) {
      alert(`Edit item at index ${index}`);
    },
    deleteItem(index) {
      this.items.splice(index, 1);
    }
  }
};
</script>

<style scoped>
.app {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 250px;
  padding: 20px;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.status {
  width: 15px;
  height: 15px;
  border-radius: 50%;
}

.status.blue {
  background-color: #4f8bf9;
}

.status.yellow {
  background-color: #f9d748;
}

.status.orange {
  background-color: #f9a24f;
}

.status.purple {
  background-color: #9b59b6;
}

.card-title {
  font-size: 16px;
  font-weight: bold;
}

.card-body {
  margin-top: 10px;
  font-size: 14px;
  color: #666;
}

.card-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.icon-button {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #999;
}

.icon-button:hover {
  color: #333;
}
</style>
