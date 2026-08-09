export const USER_QUERY_KEYS = {
  users: {
    all: ['users'] as const,
    getAll: (params?: unknown) =>
      [...USER_QUERY_KEYS.users.all, params] as const,
    getById: (id: string) =>
      [...USER_QUERY_KEYS.users.all, 'detail', id] as const,
  },
};
