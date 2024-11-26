<template>
  <div class="modal-overlay" v-if="isVisible">
    <div class="modal-container">
      <!-- 닫기 버튼 -->
      <button class="close-button" @click="closeModal">×</button>

      <!-- 날짜 제목 -->
      <h2>{{ formattedDate }}</h2>

      <!-- 감정 선택 -->
      <div class="emoji-section">
        <p>오늘의 감정</p>
        <div class="emoji-options">
          <span
            v-for="emoji in emojis"
            :key="emoji"
            class="emoji-option"
            :class="{ selected: selectedEmoji === emoji }"
            @click="selectEmoji(emoji)"
          >
            {{ emoji }}
          </span>
        </div>
      </div>

      <!-- 간단한 일기 작성 -->
      <textarea
        class="diary-input"
        v-model="diaryText"
        placeholder="간단한 하루 일기를 작성해보세요..."
      ></textarea>

      <!-- 할 일 목록 -->
      <div class="events">
        <p>오늘의 할 일</p>
        <div
          v-for="(event, index) in dayData?.events"
          :key="index"
          class="event"
        >
          {{ event }}
        </div>
      </div>

      <!-- 저장 버튼 -->
      <button class="save-button" @click="saveData">저장</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    dayData: {
      type: Object,
      default: () => ({}),
    },
    formattedDate: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      emojis: ["😀", "😢", "😡", "😆", "😍"],
      selectedEmoji: null,
      diaryText: "",
    };
  },
  methods: {
    closeModal() {
      this.$emit("close", { emoji: this.selectedEmoji, diary: this.diaryText });
    },
    selectEmoji(emoji) {
      this.selectedEmoji = emoji;
    },
    saveData() {
      // 저장 로직 (이벤트 발생)
      console.log("저장 완료: ", {
        date: this.formattedDate,
        emoji: this.selectedEmoji,
        diary: this.diaryText,
      });
      alert("저장되었습니다!");
      this.$emit("save", {
        date: this.formattedDate,
        emoji: this.selectedEmoji,
        diary: this.diaryText,
      });
    },
  },
};
</script>

<style scoped>
/* 모달 오버레이 스타일 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* 모달 컨테이너 스타일 */
.modal-container {
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  position: relative;
}

/* 닫기 버튼 스타일 */
.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

/* 감정 선택 섹션 */
.emoji-section {
  margin: 20px 0;
}

.emoji-options {
  display: flex;
  gap: 10px;
}

.emoji-option {
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.emoji-option:hover {
  transform: scale(1.2);
}

.emoji-option.selected {
  border: 2px solid #1976d2;
  border-radius: 50%;
  padding: 5px;
}

/* 일기 입력란 스타일 */
.diary-input {
  width: 90%;
  height: 100px;
  margin-top: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  resize: none;
}

/* 할 일 목록 */
.events {
  margin-top: 20px;
}

.event {
  padding: 10px;
  background: #e0f7fa;
  border-radius: 5px;
  margin-bottom: 5px;
}

/* 저장 버튼 스타일 */
.save-button {
  margin-top: 20px;
  background-color: #66bb6a;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  text-align: center;
  transition: background-color 0.3s ease;
}

.save-button:hover {
  background-color: #43a047;
}
</style>
