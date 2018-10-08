export function getSize() {
  const doc = document.documentElement;
  const baseWidth = 750;
  const baseFontSize = 100;
  const screenWidth = doc.clientWidth;
  doc.style.fontSize = screenWidth / baseWidth * baseFontSize + 'px';
}
