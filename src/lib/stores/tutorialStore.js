import { writable, derived } from 'svelte/store';
import { tutorialSteps } from '$lib/data/tutorialSteps.js';

export const currentStepIndex = writable(0);
export const handTiles        = writable([]);
export const melds            = writable([]);
export const phase            = writable('info'); // 'info' | 'mock-match' | 'victory'
export const audioEnabled     = writable(false);

export const currentStep = derived(
  currentStepIndex,
  ($i) => tutorialSteps[$i]
);

export function nextStep() {
  currentStepIndex.update(i => Math.min(i + 1, tutorialSteps.length - 1));
}

export function prevStep() {
  currentStepIndex.update(i => Math.max(i - 1, 0));
}

export function resetTutorial() {
  currentStepIndex.set(0);
  handTiles.set([]);
  melds.set([]);
  phase.set('info');
}
