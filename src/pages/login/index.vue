<template>
  <a-form :model="formState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off">
    <a-form-item label="Username" name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
      <a-input v-model:value="formState.username" />
    </a-form-item>

    <a-form-item label="Password" name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
      <a-input-password v-model:value="formState.password" />
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit" @click="login">Submit</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { useUserStore } from '/@/store';

interface FormState {
  username: string;
  password: string;
}

const formState = reactive<FormState>({
  username: 'admin',
  password: '111111',
});

const userStore = useUserStore();

const login = () => {
  userStore.login(formState);
};
</script>

<style lang="less" scoped>
.ant-form {
  max-width: 600px;
  margin: 0 auto;
}
</style>
