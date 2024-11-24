<template>
  <div class="login-frame">
    <div class="icon">
      <img src="@/assets/images/checked.png" alt="Check Icon" />
    </div>
    <h2 class="title">Sign in to DoitU</h2>
    <div class="login-container">
      <form class="login-form" @submit.prevent="signIn">
        <label for="id">ID</label>
        <input
          type="text"
          v-model="userid"
          id="id"
          name="id"
          placeholder="Enter your ID"
        />
        <label for="password">Password</label>
        <input
          type="password"
          v-model="password"
          id="password"
          name="password"
          placeholder="Enter your password"
        />
        <button type="submit" class="btn-login">Sign in</button>
      </form>
    </div>
    <div class="signup">
      <a href="#" class="create-account" @click.prevent="goToSignUp"
        >Create an account</a
      >
    </div>
  </div>
</template>

<script>
//import axios from "axios"; //spring과 연동을 위한 axios import

export default {
  name: "LoginFrame",
  data() {
    return {
      userid: "",
      password: "",
    };
  },
  methods: {
    goToSignUp() {
      this.$router.push("/signup"); // '/signup' 경로로 이동
    },
    signIn() {

      // axios
      //   .post("/signin", {
      //     userId: this.userId,
      //     password: this.password,
      //   })
      //   .then((response) => {
      //     if (response.data.statusCode === 200) {
      //       this.$cookies.set("session_id", response.data.sessionId, {
      //         expires: "1d",
      //       });
      //       alert("로그인 성공");
      //     } else {
      //       alert("로그인 실패: " + response.data.statusCode);
      //     }
      //   })
      //   .catch((error) => {
      //     alert("로그인 실패: " + error.message);
      //   });
      // 위는 api 구현 전 로그인 성공 로직 추가 코드 (사용자 인증)
      // axios 요청을 위해서는 1. axios를 import 해줘야함. 2.data() 안에 보낼 데이터가 존재해야함. 
      
      this.$router.push("/maincontainer"); // '/main' 경로로 이동
    },
  },
};
</script>

<style>
/* 기존 스타일 유지 */
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #25cd94;
}

.login-frame {
  background-color: #25cd94;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.login-container {
  width: 300px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.signup {
  width: 300px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.icon img {
  width: 40px;
  height: 40px;
  margin-bottom: 10px;
}

.title {
  font-size: 20px;
  font-weight: bold;
  color: white;
  margin-bottom: 20px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.login-form label {
  font-size: 14px;
  color: #333333;
  text-align: left;
}

.login-form input {
  padding: 8px;
  font-size: 14px;
  border: 1px solid #cccccc;
  border-radius: 4px;
}

.btn-login {
  margin-top: 10px;
  padding: 10px;
  font-size: 14px;
  color: #ffffff;
  background-color: #1f883d;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-login:hover {
  background-color: #146828;
}

.create-account {
  display: block;
  font-size: 15px;
  color: #0969da;
  text-decoration: none;
}

.create-account:hover {
  text-decoration: underline;
}
</style>
