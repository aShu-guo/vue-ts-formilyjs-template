<template>
  <pro-layout
    :locale="locale"
    v-bind="layoutConf"
    v-model:openKeys="state.openKeys"
    v-model:collapsed="state.collapsed"
    v-model:selectedKeys="state.selectedKeys"
  >
    <router-view />
    <!--  右侧用户头像  -->
    <template #rightContentRender>
      <a-popover trigger="hover">
        <template #content>
          <p class="pointer reset-bottom" @click="doLogout">
            <LogoutOutlined />
            <span class="info-font">注销登录</span>
          </p>
          <p class="pointer reset-bottom" @click="modifyPwd">
            <EditOutlined />
            <span class="info-font">修改密码</span>
          </p>
        </template>
        <div class="userinfo-box">
          <a-avatar shape="square" size="small">
            <template #icon>
              <UserOutlined />
            </template>
          </a-avatar>
          <span class="user-name">{{ userStore.name }}</span>
        </div>
      </a-popover>
    </template>
    <template #footerRender>
      <GlobalFooter :links="links" copyright="aShu-guo &copy; 2023" />
    </template>
  </pro-layout>
</template>

<script setup lang="ts">
import { getMenuData, clearMenuItem, GlobalFooter } from '@ant-design-vue/pro-layout';
import '@ant-design-vue/pro-layout/dist/style.less';
import ProLayout from '@ant-design-vue/pro-layout';
import SvgIcon from '/@/components/svg-icon/index.vue';
import { LogoutOutlined, EditOutlined, UserOutlined } from '@ant-design/icons-vue';
import { HomeRoutes } from '/@/router/modules/home';
import { useUserStore } from '/@/store';

const userStore = useUserStore();

const logo = h(SvgIcon, { name: 'vue' });

const locale = (i18n: string) => i18n;
const router = useRouter();

const { menuData } = getMenuData(clearMenuItem(router.getRoutes()));

const state = reactive({
  collapsed: false, // default value
  openKeys: ['/dashboard'],
  selectedKeys: [HomeRoutes.HomeIndex.path],
});

const breadcrumbRender = ({ route }) => {
  console.log('>>>>>>.');
  return h('span', route.meta.title);
};

const links = [
  {
    title: 'ProComponent-Vue',
    blankTarget: true,
    href: 'https://sunshinelixun.github.io/pro-components/components/pro-layout.html#basic-usage',
  },
  { title: 'vue-admin-template', blankTarget: true, href: 'https://github.com/aShu-guo/vue-admin-template' },
];
const layoutConf = reactive({
  title: 'vue-admin-template',
  navTheme: 'dark',
  headerTheme: 'dark',
  layout: 'mix',
  splitMenus: false,
  menuData,
  logo,
  breadcrumbRender,
});

const doLogout = () => {
  console.log('>>>>>登出');
};

const modifyPwd = () => {
  console.log('修改密码');
};
</script>
<style lang="less">
.reset-bottom {
  .info-font {
    margin-left: 4px;
  }

  &:last-child {
    margin-bottom: 0;
  }
}

.userinfo-box {
  cursor: pointer;

  .user-name {
    color: #ffffff;
    margin-left: 8px;
  }
}
</style>
