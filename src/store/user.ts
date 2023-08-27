import { getAliveValue } from '/@/common/cache';
import { CacheKey } from '/@/common/cache/key';
import { post } from '/@/common/http';
import AuthAPIs from '/@/api/auth';
import { FormState } from '/@/pages/login/types';

export interface UserState {
  token: string;
  name?: string;
  avatar?: string;
  roles: string[];
  deptName?: string[];
}

export const useUserStore = defineStore('userinfo', {
  state: (): UserState => {
    const profile = getAliveValue<UserState>(CacheKey.USERINFO)?.value;
    return {
      token: getAliveValue<string>(CacheKey.ACCESS_TOKEN)?.value || '',
      name: profile?.name || '',
      avatar: profile?.avatar || '',
      roles: profile?.roles || [],
      deptName: profile?.deptName || [],
    };
  },
  actions: {
    async login(params: FormState) {
      const { access_token, refresh_token } = await post(AuthAPIs.doLogin, params);
      console.log(access_token, refresh_token);
      // this.$patch({ token, name: userName, roles, deptName: [].concat(deptName) });
      //
      // setAliveValue(CacheKey.ACCESS_TOKEN, token);
      // setAliveValue(CacheKey.USERINFO, { name: userName, roles, deptName: [].concat(deptName) });
      // router.push(HomeRoutes.HomeIndex.path);
    },
  },
});
