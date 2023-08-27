<template>
  <a-form
    :model="formState"
    name="basic"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    @finish="onFinish"
  >
    <a-form-item label="Username" name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
      <a-input v-model:value="formState.username" />
    </a-form-item>

    <a-form-item label="Password" name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
      <a-input-password v-model:value="formState.password" />
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { useUserStore } from '/@/store';
import { FormState } from '/@/pages/login/types';

const formState = reactive<FormState>({
  username: 'xiaohuang',
  password: '1234567',
});

const store = useUserStore();

const onFinish = (values: FormState) => {
  store.login(values);
  console.log('Success:', values);
};
</script>

<style lang="less" scoped>
.ant-form {
  max-width: 600px;
  margin: 0 auto;
}
</style>
