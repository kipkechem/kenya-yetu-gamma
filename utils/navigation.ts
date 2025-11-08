import type { AppView, NavigationPayload } from '../types';

export const dispatchNavigate = (payload: NavigationPayload) => {
  const event = new CustomEvent('navigate', { detail: payload });
  window.dispatchEvent(event);
};