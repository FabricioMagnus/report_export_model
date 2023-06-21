import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function addMarginsToPDF(
  doc,
  marginLeft,
  marginTop,
  marginRight,
  marginBottom
) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const contentWidth = pageWidth - marginLeft - marginRight;
  const contentHeight = pageHeight - marginTop - marginBottom;

  doc.addPage();
  doc.setDrawColor(0); // Remove a cor da borda

  doc.setPage(marginLeft / 2, marginTop / 2); // Define a posição do conteúdo

  return { contentWidth, contentHeight };
}

function splitImageIntoPages(
  imageData,
  doc,
  imgWidth,
  imgHeight,
  marginLeft,
  marginTop,
  marginRight,
  marginBottom
) {
  const imgHeightPx = Math.floor(imgHeight * 2.83465); // Converter mm para pixels considerando 72 dpi
  const totalPages = Math.ceil(imgHeightPx / imgWidth);

  let currentPosition = 0;
  const promises = [];

  for (let i = 1; i <= totalPages; i++) {
    const pageCanvas = document.createElement("canvas");
    pageCanvas.width = imgWidth;
    pageCanvas.height = imgWidth;

    const context = pageCanvas.getContext("2d");
    context.drawImage(
      imageData,
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
          const { contentWidth, contentHeight } = addMarginsToPDF(
            doc,
            marginLeft,
            marginTop,
            marginRight,
            marginBottom
          );
          doc.addImage(
            pageImageData,
            "PNG",
            marginLeft,
            marginTop,
            contentWidth,
            contentHeight
          );
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

export default async function handleExportPDF(ids) {

  const pdf = new jsPDF("landscape", "mm", "a4", true); // Formato paisagem

  const promises = ids.map((id) => {

    const input = document.getElementById(id);

    return html2canvas(input).then((canvas) => {

      const imgData = canvas.toDataURL("image/png");
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const pdfWidth = pdf.internal.pageSize.getWidth(); // Largura A4 em mm
      const pdfHeight = pdf.internal.pageSize.getHeight(); // Altura A4 em mm
      const pdfAspectRatio = Math.min(
        pdfWidth / imgWidth,
        pdfHeight / imgHeight
      ); // Ajustar o aspect ratio, dimensões da imagem
      const marginLeft = 10; // Margem esquerda em mm
      const marginTop = 10; // Margem superior em mm
      const marginRight = 10; // Margem direita em mm
      const marginBottom = 10; // Margem inferior em mm
      // const imgX = (pdfWidth - imgWidth * pdfAspectRatio) / 2;
      const imgX = 3; // adiciona recuo de imagem a esquerda
      const imgY = 10; // adiciona recuo de imagem acima e abaixo

      if (imgHeight > imgWidth) {
        // Dividir a imagem em várias páginas A4
        return splitImageIntoPages(
          imgData,
          pdf,
          imgWidth,
          imgHeight,
          marginLeft,
          marginTop,
          marginRight,
          marginBottom
        ).then((doc) => {
          const pages = doc.internal.pages;
          const numPagesToRemove = pages.length; // Remover todas as páginas em branco

          if (numPagesToRemove > 0) {
            pages.splice(0, numPagesToRemove); // Remove as páginas extras
          }
        });
      } else {
        const { contentWidth, contentHeight } = addMarginsToPDF(
          pdf,
          marginLeft,
          marginTop,
          marginRight,
          marginBottom
        );
        pdf.addImage(
          imgData,
          "PNG",
          imgX,
          imgY,
          imgWidth * pdfAspectRatio - 8,
          imgHeight * pdfAspectRatio
        );
      }
    });
  });
  
  await Promise.all(promises).then(() => {
    pdf.deletePage(1);
    pdf.save(`relatorio-dinamico.pdf`);
  });
  // await Promise.all(promises);
  // pdf.deletePage(1); // Remove a primeira página
  // pdf.save(`relatorio-dinamico.pdf`);
}