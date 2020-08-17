import { ref } from '@nuxtjs/composition-api';
import axios from 'axios';

let refreshId = 0;

const currentUser = ref(null);
const currentUserIsLoading = ref(false);

/**
 * Manage the current user.
 */
export function useCurrentUser() {
  // authenticate
  const authenticateCurrentUserIsLoading = ref(false);

  const authenticateCurrentUser = async (credentials) => {
    authenticateCurrentUserIsLoading.value = true;

    const xhr = axios.post('/.netlify/functions/user-login', credentials)
    
    xhr.finally(() => {
      authenticateCurrentUserIsLoading.value = false;
    });

    return xhr;
  }

  // logout
  const logoutCurrentUser = async () => {
    await axios.post('/.netlify/functions/user-logout');

    currentUser.value = null;
  }

  // refresh
  const refreshCurrentUser = async () => {
    currentUserIsLoading.value = true;

    const id = ++refreshId;
    const response = await axios.get('/.netlify/functions/user-current');

    if (id === refreshId) {
      currentUserIsLoading.value = false;
      currentUser.value = response?.data?.user?.data || null;
    }
  }

  return {
    authenticateCurrentUser,
    authenticateCurrentUserIsLoading,
    currentUser,
    currentUserIsLoading,
    logoutCurrentUser,
    refreshCurrentUser,
  };
}