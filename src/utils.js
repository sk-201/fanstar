export const setTheme = (theme) => {
  switch (theme) {
    case 'pink':
      document.documentElement.style.setProperty(
        '--background-color',
        '#FF69B4'
      );
      document.documentElement.style.setProperty(
        '--subs-container-color',
        'rgba(255, 105, 180, 0.8)'
      );
      document.documentElement.style.setProperty(
        '--menu-container-color',
        'rgba(255, 105, 180, 0.6)'
      );
      break;
    case 'blue':
      document.documentElement.style.setProperty(
        '--background-color',
        '#1A2537'
      );
      document.documentElement.style.setProperty(
        '--subs-container-color',
        'rgba(26, 37, 55, 0.8)'
      );
      document.documentElement.style.setProperty(
        '--menu-container-color',
        'rgba(26, 37, 55, 0.6)'
      );
      break;

    case 'creame':
      document.documentElement.style.setProperty(
        '--background-color',
        '#E6CDB9'
      );
      document.documentElement.style.setProperty(
        '--subs-container-color',
        'rgba(230, 205, 185, 0.8)'
      );
      document.documentElement.style.setProperty(
        '--menu-container-color',
        'rgba(230, 205, 185, 0.6)'
      );
      break;
    default:
      document.documentElement.style.setProperty(
        '--background-color',
        '#2d2d2d'
      );
      document.documentElement.style.setProperty(
        '--subs-container-color',
        'rgba(38, 38, 38, 0.8)'
      );
      document.documentElement.style.setProperty(
        '--menu-container-color',
        'rgba(129, 129, 129, 0.6)'
      );
      break;
  }
};

export const imageUrl = 'https://fanstar.s3.us-east-2.amazonaws.com';

export const addToHome = () => {
  let deferredPrompt;
  const addBtn = document.querySelector('.addToHome-btn');
  addBtn.style.display = 'none';

  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI to notify the user they can add to home screen
    addBtn.style.display = 'block';

    addBtn.addEventListener('click', () => {
      // hide our user interface that shows our A2HS button
      console.log('clicked in');
      addBtn.style.display = 'none';
      // Show the prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });
    });
  });
};
