# vue-admin-template

- 项目集成了`@formily/antdv-x3`支持 JSON Schema 形式的表单配置方案。
- 模块化插件，根据不同环境加载
- 集成了 antdv 组件库、pinia 状态管理、typescript、axios 以及 git hook
- 集成代码格式化以及校验：prettier、stylelint、eslint

## 如果你想要使用此模板，请修改

1. 配置文件中对应的 VITE_API_HOST，用于更换接口 API（各配置文件都需要修改）
2. 修改请求拦截器中的 header 校验策略，涉及：pinia actions 异步逻辑、axios 配置、token 对应的 key
3. 修改全局路由守卫策略

## 权限设计

- 包括用户、角色、权限
  - 权限又可以分为菜单权限、数据权限
