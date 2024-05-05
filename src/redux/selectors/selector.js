export const selectUserName = (state) =>
  state.auth.user ? state.auth.user.name : null;
export const selectUserId = (state) =>
  state.auth.user ? state.auth.user.id : null;

export const selectUserAvatar = (state) => state.auth.user.avatar;
export const selectUserEmail = (state) =>
  state.auth.user ? state.auth.user.email : null;
