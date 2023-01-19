<template>
  <page-wrapper>
    <a-result status="403" title="403" sub-title="Sorry, you are not authorized to access this page.">
      <template #extra>
        <a-button type="primary" @click="router.push('/')">Back Home</a-button>
      </template>
    </a-result>
  </page-wrapper>
</template>
<script lang="ts" setup>
const router = useRouter();
</script>
