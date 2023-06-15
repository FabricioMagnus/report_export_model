importScripts(
  "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.0.0-alpha.12/html2canvas.min.js"
);

self.addEventListener("message", (event) => {
  const { input } = event.data;

  html2canvas(input).then((canvas) => {
    self.postMessage({ canvas });
  });
});
