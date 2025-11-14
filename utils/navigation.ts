import type { NavigationPayload } from '../types/index';

export const dispatchNavigate = (payload: NavigationPayload) => {
  const event = new CustomEvent('navigate', { detail: payload });
  window.dispatchEvent(event);
};