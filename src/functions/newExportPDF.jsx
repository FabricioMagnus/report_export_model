import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export async function newExportPDF(ids) {
  const pdf = new jsPDF("landscape", "mm", "a4");
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const margin = 2;
  const marginTop = 30;

  for (const id of ids) {
    const element = document.getElementById(id);

    if (!element) {
      console.error(`Element with ID '${id}' not found.`);
      continue;
    }

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const pdfAspectRatio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const scaledWidth = imgWidth * pdfAspectRatio;
    const scaledHeight = imgHeight * pdfAspectRatio;

    pdf.addPage();
    pdf.addImage(
      imgData,
      "PNG",
      margin,
      margin,
      pdfWidth - 2 * margin,
      pdfHeight - 2 * marginTop
    );
  }

  pdf.save("relatório-dinamico.pdf");
}
