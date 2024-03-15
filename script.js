document.addEventListener('DOMContentLoaded', () => {
  const svg = document.getElementById('my-svg');
  const loadingAnimation = document.getElementById('loading-animation');

  svg.style.visibility = 'hidden';

  svg.addEventListener('load', () => {
    loadingAnimation.style.display = 'none';
    svg.style.visibility = 'visible';

    const container = document.getElementById('container');
    
    container.addEventListener('scroll', () => {
      svg.style.transform = `translateY(${container.scrollTop}px)`;
    });
  });

  svg.addEventListener('error', () => {
    loadingAnimation.style.display = 'none';
  });
});