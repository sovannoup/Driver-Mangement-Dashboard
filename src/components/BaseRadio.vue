<template>
  <div>
    <div class="checkbox-form">
      <div class="answers">
        <label v-for="(option, i) in options" :key="i" class="item">
          <span :for="option.label">{{ option.label }}</span>
          <input
            :id="option.value"
            type="radio"
            :value="option.value"
            @change="onInput"
            :checked="defaultGender === option.value && 'checked'"
          />
          <span class="checkmark" />
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseRadio",
  props: {
    options: {
      type: Array,
      required: true,
      default: () => [],
    },
    defaultGender: {
      type: String,
      required: false,
      default: null
    }
  },
};
</script>

<script setup>
const emit = defineEmits(['onChange', 'update:modelValue'])

  const onInput = ($event) => {
        emit('update:modelValue', $event.target.value),
        emit('onChange', $event.target.value)
  }
</script>

<style scoped>
.checkbox-form {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.checkbox-form .answers {
	display: flex;
	flex-direction: row;
	align-items: left;
	width: 100%;
}

.checkbox-form label:not(:first-child) {
	margin-left: 1em;
}

.checkbox-form .item {
	display: block;
	position: relative;
	padding-left: 35px;
	cursor: pointer;
	font-size: 1em;
	height: 25px;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	display: flex;
	align-items: center;
  border-right: solid #E5E7EB 1px;
  padding-right: 2rem;
}

.checkbox-form .item input {
	position: absolute;
	opacity: 0;
	cursor: pointer;
	height: 0;
	width: 0;
}

.checkbox-form .checkmark {
	position: absolute;
	top: 0;
	left: 0;
	height: 25px;
	width: 25px;
	background-color: #E5E7EB;
    border-radius: 2rem;
}

.checkbox-form .item:hover input ~ .checkmark {
	background-color: #949494;
}

.checkbox-form .item input:checked ~ .checkmark {
	background-color: #700E57;
}

.checkbox-form .checkmark:after {
	content: "";
	position: absolute;
	display: none;
}

.checkbox-form .item input:checked ~ .checkmark:after {
	display: block;
}

.checkbox-form .item .checkmark:after {
	left: 10px;
    top: 7px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
}
</style>