<template>
  <div class="login-frame">
    <div class="icon">
      <img src="@/assets/images/checked.png" alt="Check Icon" />
    </div>
    <h2 class="title">Sign up to DoitU</h2>
    <div class="login-container">
      <form class="login-form" @submit.prevent="signUp">
        <label for="id">ID</label>
        <input
          type="text"
          id="id"
          name="id"
          v-model="formData.userid"
          placeholder="Enter your ID"
        />
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          v-model="formData.password"
          placeholder="Enter your password"
        />
        <button type="submit" class="btn-login">Sign up</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginFrame",
  methods: {
    data() {
    return {
      // Initialize the form data for id and password
      formData: {
        userid: "",
        password: "",
      },
    };
  },
    signUp() {
      // You can add logic to handle the form submission, like validating the ID and password

      //  axios
      //   .post("/signup", {
      //     userid: this.formData.id,
      //     password: this.formData.password,
      //
      //   })
      //   .then((response) => {
      //     if (response.data.statusCode === 200) {
      //       alert("회원가입 완료");
      //       this.$router.push("/success");
      //     } else {
      //       alert("회원가입 실패: " + response.data.statusCode);
      //     }
      //   })
      //   .catch((error) => {
      //     alert("회원가입 실패: " + error.message);
      //   });
      // 위는 api 구현 전 로그인 성공 로직 추가 코드 (사용자 인증)
      // axios 요청을 위해서는 1. axios를 import 해줘야함. 2.data() 안에 보낼 데이터가 존재해야함.
      console.log(this.formData); // You can log form data for now
      this.$router.push("/success"); // 위 로그인 성공 시 라우터로 페이지 바꿔주는거 넣어놨음. 나중에 백하고 연동하면 이 줄은 삭제해도됨.
    },
  },
  
};
</script>

<style>
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
</style>
