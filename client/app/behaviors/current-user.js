import { computed, ref } from '@nuxtjs/composition-api';
import { user } from '~/app/api';

/**
 * Shared state
 */
const _currentUser = ref(null);
const _currentUserIsLoading = ref(false);

/**
 * Read-only exports
 */
export const currentUser = computed(() => _currentUser.value);
export const currentUserIsLoading = computed(() => _currentUserIsLoading.value);

/**
 * Update the current user
 */
// @todo: cancel outstanding requests
export function updateCurrentUser() {
  _currentUserIsLoading.value = true;

  return user.current().then((response) => {
    _currentUser.value = response?.data?.user || null;
  }).finally(() => {
    _currentUserIsLoading.value = false;
  });
}

/**
 * Authenticate the current user
 */
export function useAuthenticateCurrentUser() {
  const authenticateCurrentUserIsLoading = ref(false);

  const authenticateCurrentUser = (credentials) => {
    authenticateCurrentUserIsLoading.value = true;

    user.authenticate(credentials).then(response => {
      _currentUser.value = response?.data?.user || null;
    }).finally(() => {
      authenticateCurrentUserIsLoading.value = false;
    });
  }

  return {
    authenticateCurrentUser,
    authenticateCurrentUserIsLoading,
  };
}

/**
 * Log out the current user
 */
export function useLogoutCurrentUser() {
  const logoutCurrentUserIsLoading = ref(false);

  const logoutCurrentUser = () => {
    logoutCurrentUserIsLoading.value = true;

    return user.logout().then(() => {
      _currentUser.value = null;
    }).finally(() => {
      logoutCurrentUserIsLoading.value = false;
    });
  }

  return {
    logoutCurrentUser,
    logoutCurrentUserIsLoading,
  };
}

/**
 * Redirect authena
 */
export function useRedirectAuthenticatedUsers() {

}

/**
 * Behavior to register the current user.
 */
export function useRegisterCurrentUser() {
  const registerCurrentUserIsLoading = ref(false);

  const registerCurrentUser = (credentials) => {
    registerCurrentUserIsLoading.value = true;

    return user.create(credentials).then(response => {
      _currentUser.value = response?.data?.user || null;
    }).finally(() => {
      registerCurrentUserIsLoading.value = false;
    });
  }

  return {
    registerCurrentUser,
    registerCurrentUserIsLoading,
  };
}
