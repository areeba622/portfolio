import { useSyncExternalStore } from 'react';

function subscribe(callback) {
  if (typeof window === 'undefined') return () => {};
  const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
}

function getSnapshot() {
  if (typeof window === 'undefined') return true;
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

function getServerSnapshot() {
  return true;
}

export function useHoverOrTap() {
  const canHover = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return {
    canHover,
    isTouch: !canHover
  };
}

