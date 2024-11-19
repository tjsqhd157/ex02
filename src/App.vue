<template>
  <div class="screen">
    <div class="link" />

    <div class="main">
      <p class="heading-sign-in-to">
        Congratulations !&nbsp;&nbsp;
        <br />
        <br />
        Now, use DoitU to manage your schedule efficiently
      </p>
    </div>

    <div class="component">
      <div class="text">Use it now</div>
    </div>

    <Component1 class="component-1" color="white" />
  </div>
</template>

<script>
import Component1 from "./Component1";

export default {
  name: "MyScreen",
  components: {
    Component1,
  },
};
</script>

<style>
.screen {
  background-color: #31be86;
  height: 612px;
  position: relative;
  width: 1440px;
}

.screen .link {
  background-color: #0969da;
  height: 1px;
  left: 0;
  position: absolute;
  top: 0;
  width: 1px;
}

.screen .main {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 72px;
  left: 257px;
  padding: 0px 16px;
  position: absolute;
  top: 196px;
  width: 925px;
}

.screen .heading-sign-in-to {
  align-self: stretch;
  color: var(--githubcompolar);
  font-family: "Noto Sans-Bold", Helvetica;
  font-size: 28.2px;
  font-weight: 700;
  letter-spacing: -0.50px;
  line-height: 36px;
  margin-bottom: -35.00px;
  margin-top: -1.00px;
  position: relative;
  text-align: center;
}

.screen .component {
  align-items: center;
  background-color: #1f883d;
  border: 1px solid;
  border-color: #1f232826;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  left: 632px;
  overflow: hidden;
  padding: 6px 104.69px;
  position: absolute;
  top: 408px;
  width: 176px;
}

.screen .text {
  color: #ffffff;
  font-family: var(--github-com-noto-sans-display-medium-font-family);
  font-size: var(--github-com-noto-sans-display-medium-font-size);
  font-style: var(--github-com-noto-sans-display-medium-font-style);
  font-weight: var(--github-com-noto-sans-display-medium-font-weight);
  letter-spacing: var(--github-com-noto-sans-display-medium-letter-spacing);
  line-height: var(--github-com-noto-sans-display-medium-line-height);
  margin-left: -51.69px;
  margin-right: -51.69px;
  margin-top: -1.00px;
  position: relative;
  text-align: center;
  white-space: nowrap;
  width: fit-content;
}

.screen .component-1 {
  height: 32px !important;
  left: 704px !important;
  position: absolute !important;
  top: 128px !important;
  width: 32px !important;
}
</style>