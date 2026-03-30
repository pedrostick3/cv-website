import { initGSAP } from './gsap-setup.js';
import { initI18n } from './i18n.js';
import { initScrollManager } from './scroll-manager.js';
import { init as initHero } from './scenes/01-hero.js';
import { init as initHouseItaly } from './scenes/02-house-italy.js';
import { init as initPhoneBreak } from './scenes/03-phone-break.js';
import { init as initElectronics } from './scenes/04-electronics.js';
import { init as initDroneBuild } from './scenes/05-drone-build.js';
import { init as initDroneGuide } from './scenes/06-drone-guide.js';
import { init as initCodeDoor } from './scenes/07-code-door.js';
import { init as initBrainRobot } from './scenes/08-brain-robot.js';
import { init as initAISkills } from './scenes/09-ai-skills.js';
import { init as initBedroom } from './scenes/10-bedroom.js';
import { init as initFooter } from './scenes/11-footer.js';

async function boot() {
  // 1. Initialize GSAP and plugins
  initGSAP();

  // 2. Load translations
  await initI18n();

  // 3. Initialize scroll coordination
  initScrollManager();

  // 4. Initialize scenes
  const scenes = [
    { id: '01', init: initHero, selector: '#scene-01' },
    { id: '02', init: initHouseItaly, selector: '#scene-02' },
    { id: '03', init: initPhoneBreak, selector: '#scene-03' },
    { id: '04', init: initElectronics, selector: '#scene-04' },
    { id: '05', init: initDroneBuild, selector: '#scene-05' },
    { id: '06', init: initDroneGuide, selector: '#scene-06' },
    { id: '07', init: initCodeDoor, selector: '#scene-07' },
    { id: '08', init: initBrainRobot, selector: '#scene-08' },
    { id: '09', init: initAISkills, selector: '#scene-09' },
    { id: '10', init: initBedroom, selector: '#scene-10' },
    { id: '11', init: initFooter, selector: '#scene-11' },
  ];

  scenes.forEach(({ init, selector }) => {
    const container = document.querySelector(selector);
    if (container) init(container);
  });

  // 5. Remove loading state
  document.body.classList.remove('is-loading');
  document.body.classList.add('is-ready');
}

// Wait for fonts + DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    document.fonts.ready.then(boot);
  });
} else {
  document.fonts.ready.then(boot);
}
