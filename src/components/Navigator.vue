<template>
  <nav class="navbar">
    <div class="logo">
      <img src="/assets/images/checked_green.png" alt="Logo" class="logo-icon" />
      <span class="logo-text">DoitU</span>
    </div>
    <div class="menu">
      <button class="calendar">Calendar</button>
      <div class="status-container">
        <button class="status all">All</button>
        <button class="status working">
          🔥 Working..! <span class="count">2</span>
        </button>
        <button class="status done">
          ✏️ Done..! <span class="count">0</span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style scoped> 
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f5f5f5;
  border-radius: 15px;
  width: 1200px; /* 고정된 너비 */
}

/* 로고 스타일 */
.logo {
  display: flex;
  align-items: center;
}

.logo-icon {
  width: 25px;
  height: 25px;
  margin-right: 10px;
}

.logo-text {
  font-size: 22px;
  font-weight: bold;
  color: #26c281;
}

/* 메뉴 스타일 */
.menu {
  display: flex;
  align-items: center;
}

.calendar {
  background-color: #eaf6f0;
  border: none;
  border-radius: 50px;
  padding: 10px 20px;
  margin-right: 15px;
  color: #26c281;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

.calendar:hover {
  background-color: #d6f5e3;
}

.status-container {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  padding: 10px 15px;
  border-radius: 50px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.status {
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  border-radius: 20px;
  padding: 5px 10px;
  margin-right: 10px;
  font-size: 14px;
  cursor: pointer;
}

.status.all {
  color: #26c281;
}

.status.working {
  color:  #26c281;
}

.status.done {
  color:  #26c281;
}

.status .count {
  background-color: #d6f5e3;
  border-radius: 50%;
  padding: 3px 8px;
  margin-left: 5px;
  font-size: 12px;
  font-weight: bold;
}

.status:hover {
  background-color: #f0f0f0;
}
</style>
