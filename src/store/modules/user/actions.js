export function updatedProfileRequest(data) {
  return {
    type: '@user/UPDATE_PROFILE_REQUEST',
    payload: { data },
  };
}

export function updatedProfileSuccess(profile) {
  return {
    type: '@user/UPDATE_PROFILE_SUCCESS',
    payload: { profile },
  };
}

export function updatedProfileFailure() {
  return {
    type: '@user/UPDATE_PROFILE_FAILURE',
  };
}
