<template>
  <a-tree-select
    dropdownClassName="department-tree-style"
    v-model="queryParam.deptId"
    :tree-data="treeData"
    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
    placeholder="请选择"
    allow-clear
    tree-default-expand-all
  />
</template>
<script lang="ts" setup></script>
