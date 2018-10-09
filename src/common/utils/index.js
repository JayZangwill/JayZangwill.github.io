export function getSize() {
  const doc = document.documentElement;
  const baseWidth = 1860;
  const baseFontSize = 100;
  const screenWidth = doc.clientWidth;
  doc.style.fontSize = screenWidth / baseWidth * baseFontSize + 'px';
}
