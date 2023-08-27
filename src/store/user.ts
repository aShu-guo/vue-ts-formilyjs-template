import { getAliveValue, setAliveValue } from '/@/common/cache';
import { CacheKey } from '/@/common/cache/key';
import { post, get } from '/@/common/http';
import AuthAPIs from '/@/api/auth';
import router from '/@/router';
import { FormState } from '/@/pages/login/types';
import { HomeRoutes } from '/@/router/modules/home';

export interface UserState {
  id: string;
  name: string;
  nickName?: string;
  token: string;
  refreshToken: string;
  avatar?: string;
  roles: string[];
  deptName?: string[];
}

export const useUserStore = defineStore('userinfo', {
  state: (): UserState => {
    const profile = getAliveValue<UserState>(CacheKey.USERINFO)?.value;
    return {
      id: profile?.id || '',
      name: profile?.name || '',
      nickName: profile?.nickName || '',
      token: getAliveValue<string>(CacheKey.ACCESS_TOKEN)?.value || '',
      refreshToken: getAliveValue<string>(CacheKey.REFRESH_TOKEN)?.value || '',
      avatar: profile?.avatar || '',
      roles: profile?.roles || [],
      deptName: profile?.deptName || [],
    };
  },
  actions: {
    async login(params: FormState) {
      const { access_token, refresh_token } = await post(AuthAPIs.doLogin, params);
      const realToken = 'Bearer ' + access_token;
      const realRefreshToken = 'Bearer ' + refresh_token;

      const { id, name, nickName } = await get(AuthAPIs.getProfile, undefined, undefined, {
        headers: { Authorization: realToken },
      });

      const payload = {
        id,
        token: realToken,
        refreshToken: realRefreshToken,
        name,
        nickName,
        // deptName: [].concat(deptName),
      };
      this.$patch(payload);

      setAliveValue(CacheKey.ACCESS_TOKEN, realToken, 10 * 60 * 1000);
      setAliveValue(CacheKey.REFRESH_TOKEN, realRefreshToken);
      setAliveValue(CacheKey.USERINFO, payload);
      router.push(HomeRoutes.HomeIndex.path);
    },
  },
});
