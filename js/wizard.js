/**
 * DROPZONE — Setup wizard (streamer onboarding) steps.
 */

import { getWizStep, setWizStep } from './state.js';
import { WIZARD_STEPS } from './config.js';
import { go } from './router.js';
import { refreshIcons } from './utils.js';

/**
 * Advance to next wizard step or finish and go to dashboard.
 */
export function wizNext() {
  const wizStep = getWizStep();
  if (wizStep < WIZARD_STEPS) {
    const panel = document.getElementById('wiz-' + wizStep);
    if (panel) panel.style.display = 'none';
    const steps = document.getElementById('wizSteps');
    if (steps && steps.children[wizStep - 1]) {
      steps.children[wizStep - 1].classList.remove('cur');
      steps.children[wizStep - 1].classList.add('done');
    }
    setWizStep(wizStep + 1);
    const nextStep = getWizStep();
    if (steps && steps.children[nextStep - 1]) steps.children[nextStep - 1].classList.add('cur');
    const nextPanel = document.getElementById('wiz-' + nextStep);
    if (nextPanel) nextPanel.style.display = 'block';
    const wizPrevBtn = document.getElementById('wizPrev');
    if (wizPrevBtn) wizPrevBtn.style.visibility = 'visible';
    const wizNextBtn = document.getElementById('wizNextBtn');
    if (wizNextBtn) wizNextBtn.innerHTML = nextStep === WIZARD_STEPS ? 'Finish <i data-lucide="check" class="lc-sm"></i>' : 'Next <i data-lucide="arrow-right" class="lc-sm"></i>';
    refreshIcons();
  } else {
    go('s-dash');
  }
}

/**
 * Go back one wizard step.
 */
export function wizPrev() {
  const wizStep = getWizStep();
  if (wizStep <= 1) return;
  const panel = document.getElementById('wiz-' + wizStep);
  if (panel) panel.style.display = 'none';
  const steps = document.getElementById('wizSteps');
  if (!steps || !steps.children[wizStep - 1]) return;
  steps.children[wizStep - 1].classList.remove('cur');
  setWizStep(wizStep - 1);
  const prevStep = getWizStep();
  steps.children[prevStep - 1].classList.remove('done');
  steps.children[prevStep - 1].classList.add('cur');
  const prevPanel = document.getElementById('wiz-' + prevStep);
  if (prevPanel) prevPanel.style.display = 'block';
  const wizPrevBtn = document.getElementById('wizPrev');
  if (wizPrevBtn) wizPrevBtn.style.visibility = prevStep === 1 ? 'hidden' : 'visible';
  const wizNextBtn = document.getElementById('wizNextBtn');
  if (wizNextBtn) wizNextBtn.innerHTML = 'Next <i data-lucide="arrow-right" class="lc-sm"></i>';
  refreshIcons();
}
