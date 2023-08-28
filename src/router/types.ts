// 路由表中要求的权限
export type Roles = 'admin' | 'staff';

// 路由表中roles修饰符
export type RolesModifiers = 'every' | 'some' | 'not';

export interface RouterExtra {
  [key: string]: {
    path: string;
    name: string;
  };
}
