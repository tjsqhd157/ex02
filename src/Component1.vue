<template>
  <div>
    <img
      v-if="['one', 'six'].includes(variant)"
      :class="['component', variant]"
      :alt="'Variant'"
      :src="variant === 'six' ? variant6 : variant1"
    />
    <Variant2 v-if="variant === 'two'" class="variant" />
    <Variant4
      v-if="['four', 'three'].includes(variant)"
      class="variant-4"
      :color="variant === 'four' ? '#B0CCBF' : '#59D8A1'"
    />
    <Variant5 v-if="variant === 'five'" class="variant-5" />
  </div>
</template>

<script>
import Variant2 from "./Variant2";
import Variant4 from "./Variant4";
import Variant5 from "./Variant5";
import variant1 from "./variant-1.svg";
import variant6 from "./variant-6.svg";

export default {
  name: "Component",
  components: {
    Variant2,
    Variant4,
    Variant5,
  },
  props: {
    variant: {
      type: String,
      validator: function (value) {
        return ["two", "three", "four", "one", "five", "six"].indexOf(value) !== -1;
      },
    },
  },
  data() {
    return {
      variant1,
      variant6,
    };
  },
};
</script>

<style>
.component {
  left: 0;
  position: absolute;
  top: 0;
}

.component .variant {
  height: 21px !important;
  left: 0 !important;
  position: absolute !important;
  top: 0 !important;
  width: 21px !important;
}

.component .variant-4 {
  height: 26px !important;
  left: 0 !important;
  position: absolute !important;
  top: 0 !important;
  width: 26px !important;
}

.component .variant-5 {
  height: 16px !important;
  left: 0 !important;
  position: absolute !important;
  top: 0 !important;
  width: 16px !important;
}

.component.four {
  height: 30px;
  width: 26px;
}

.component.three {
  height: 30px;
  width: 26px;
}

.component.five {
  height: 30px;
  width: 26px;
}

.component.six {
  height: 16px;
  width: 14px;
}

.component.two {
  height: 30px;
  width: 26px;
}

.component.one {
  height: 30px;
  width: 26px;
}
</style>