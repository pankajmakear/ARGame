export const mainComponent = {
  init() {
    console.log('main component init');
    
    const okbutton = document.getElementById('okbutton');
    const rotate360 = document.getElementById('rotate360');
    const keepmoving = document.getElementById('keepmoving');
    const scene = document.getElementById('scene');
    
    if (!okbutton) {
      console.error('Element with ID "okbutton" not found');
      return;
    }
    if (!rotate360) {
      console.error('Element with ID "rotate360" not found');
      return;
    }
    if (!keepmoving) {
      console.error('Element with ID "keepmoving" not found');
      return;
    }
    if (!scene) {
      console.error('Element with ID "scene" not found');
      return;
    }

    okbutton.onclick = () => {
      rotate360.style.display = 'none';
      setTimeout(() => {
        keepmoving.style.display = 'block';
        scene.setAttribute('game-script', '');
      }, 1000);
    };
  },
};
