import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function splitImageIntoPages(imageData) {
  const doc = new jsPDF("l", "mm", "a4"); // Formato paisagem
  const imgWidth = 210; // Largura da página A4 em mm
  const imgHeight = 297; // Altura da página A4 em mm

  const imgData = imageData;
  const imgHeightPx = Math.floor(imgHeight * 2.83465); // Converter mm para pixels considerando 72 dpi
  const totalPages = Math.ceil(imgHeightPx / imgWidth);

  let currentPosition = 0;

  for (let i = 1; i <= totalPages; i++) {
    const pageCanvas = document.createElement("canvas");
    pageCanvas.width = imgWidth;
    pageCanvas.height = imgWidth;

    const context = pageCanvas.getContext("2d");
    context.drawImage(
      imgData,
      0,
      currentPosition,
      imgWidth,
      imgWidth,
      0,
      0,
      imgWidth,
      imgWidth
    );

    const pageDataUrl = pageCanvas.toDataURL("image/png");
    const pageImage = new Image();
    pageImage.src = pageDataUrl;

    const pagePromise = new Promise((resolve) => {
      pageImage.onload = () => {
        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = imgWidth;
        pageCanvas.height = imgWidth;

        const context = pageCanvas.getContext("2d");
        context.drawImage(pageImage, 0, 0);

        const pageImageData = pageCanvas.toDataURL("image/png");
        const pageHeight = pageImage.height;

        if (pageHeight > 0) {
          doc.addPage();
          doc.addImage(pageImageData, "PNG", 0, 0, imgWidth, imgHeight);
        }

        resolve();
      };
    });

    currentPosition += imgWidth;

    promises.push(pagePromise);
  }

  return Promise.all(promises).then(() => {
    return doc;
  });
}

export default function handleExportPDF(ids) {
  const pdf = new jsPDF("landscape", "mm", "a4"); // Formato paisagem

  const promises = ids.map((id) => {
    const input = document.getElementById(id);

    return html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const imgHeight = canvas.height;

      if (imgHeight > canvas.width) {
        // Dividir a imagem em várias páginas A4
        return splitImageIntoPages(imgData).then((doc) => {
          const pages = doc.internal.pages;
          const numPagesToRemove = pages.length; // Remover todas as páginas em branco

          if (numPagesToRemove > 0) {
            pages.splice(0, numPagesToRemove); // Remove as páginas extras
          }

          pdf.addPage();
          pdf.addImage(doc.output("datauristring"), "PNG", 0, 0);
        });
      } else {
        const imgWidth = canvas.width;
        const pdfAspectRatio = imgWidth / imgHeight;
        const pdfWidth = 297; // Largura A4 em mm
        const pdfHeight = pdfWidth / pdfAspectRatio;
        const marginLeft = 10; // Margem esquerda em mm
        const marginTop = 10; // Margem superior em mm
        const marginRight = 10; // Margem direita em mm
        const marginBottom = 10; // Margem inferior em mm

        pdf.addPage();
        pdf.addImage(
          imgData,
          "PNG",
          marginLeft,
          marginTop,
          pdfWidth - marginLeft - marginRight,
          pdfHeight - marginTop - marginBottom
        );
      }
    });
  });

  Promise.all(promises).then(() => {
    pdf.save(`relatorio-dinamico.pdf`);
  });
}
