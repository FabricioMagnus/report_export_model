import html2canvas from 'html2canvas';

interface CanvaImageCreationConfigs {
  backgroundColor?: string;
  ignoreElementsClass?: string;
}
const DefaultCanvaImageCreationConfigs: CanvaImageCreationConfigs = {
  backgroundColor: 'white',
  ignoreElementsClass: 'ignore-print',
};

export async function createBase64ImageForElement(
  el: HTMLElement,
  { backgroundColor, ignoreElementsClass } = DefaultCanvaImageCreationConfigs
) {
  const htmlCanvas = document.createElement('CANVAS');
  const canvas = await html2canvas(el, {
    scale: 1.2,
    width: el.offsetWidth,
    height: el.offsetHeight,
    removeContainer: false,
    windowWidth: el.scrollWidth,
    windowHeight: el.scrollHeight,
    backgroundColor: backgroundColor,
    foreignObjectRendering: true,
    ignoreElements: element =>
      element.classList.contains(ignoreElementsClass || ''),
  });

  const img = canvas.toDataURL('image/png');
  htmlCanvas.remove();
  return img;
}
