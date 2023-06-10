import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function handleExportPDF(id) {
  const input = document.getElementById(id);

  html2canvas(input).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const pdfAspectRatio = imgWidth / imgHeight;
    const pdfWidth = 297; // Largura A4 em mm
    const pdfHeight = pdfWidth / pdfAspectRatio;
    const marginLeft = 10; // Margem esquerda em mm
    const marginTop = 10; // Margem superior em mm
    const marginRight = 10; // Margem direita em mm
    const marginBottom = 10; // Margem inferior em mm

    const pdf = new jsPDF("l", "mm", "a4");
    pdf.addImage(
      imgData,
      "PNG",
      marginLeft,
      marginTop,
      pdfWidth - marginLeft - marginRight,
      pdfHeight - marginTop - marginBottom
    );
    pdf.save(`${id}.pdf`);
  });
}
