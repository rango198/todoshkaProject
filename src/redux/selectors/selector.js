export const selectUserName = (state) => state.auth.user.name;
export const selectUserId = (state) => state.auth.user.id;
export const selectUserAvatar = (state) => state.auth.user.avatar;

//NEW Selectors

export const selectAuthState = (state) => state.auth;
export const selectCurrentUser = (state) => state.auth.user;
export const selectIsLoggedIn = (state) => state.auth.isLogin;
export const selectAuthToken = (state) => state.auth.token;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectAuthError = (state) => state.auth.error;
