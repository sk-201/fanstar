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
