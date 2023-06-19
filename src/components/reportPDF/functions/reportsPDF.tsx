import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import {
  IDGRAFICOSREVISAOCARTEIRA,
  IDREVISAOCARTEIRA,
} from "../../../constants/idForHTML";
import { createBase64ImageForElement } from "./imageUtils";

const FONT_SIZE = 16;
const MARGIN_X = 20;
const MARGIN_Y = 20;
const Y_SPACE = 30;
const PAGE_WIDTH_PX = 446;
const FREE_PAGE_WIDTH_PX = PAGE_WIDTH_PX - 2 * MARGIN_X;
const PAGE_HEIGHT_PX = 631;

// A4 Px --> 446.46, height: 631.4175
// A4 mm --> 210, height: 297
// A4 Original Px => 2480 x 3508
export class ReportPDF {
  doc: jsPDF;
  x = MARGIN_X;
  y = MARGIN_Y;

  constructor() {
    // Default export is a4 paper, portrait, using millimeters for units
    this.doc = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: "a4",
    });
    this.resetFont();
    this.drawPageLimits();
  }

  private setBoldFont() {
    this.doc.setFont("Helvetica", "bold");
  }

  private resetFont() {
    this.doc.setFontSize(FONT_SIZE);
    this.doc.setFont("Helvetica", "normal");
  }

  private testNewPage(height: number = Y_SPACE) {
    if (this.y + height >= PAGE_HEIGHT_PX) {
      this.addPage();
    }
  }

  private resetPage() {
    this.x = MARGIN_X;
    this.y = MARGIN_Y;
  }
  newLine(space?: number) {
    this.y += space || Y_SPACE;
  }

  drawPageLimits() {
    // Draw only in dev to debug
    // if (import.meta.env.MODE !== 'development') return;
    // this.doc.setDrawColor(0, 0, 0);
    // this.doc.rect(
    //   MARGIN_X,
    //   MARGIN_Y,
    //   PAGE_WIDTH_PX - MARGIN_X * 2,
    //   PAGE_HEIGHT_PX - MARGIN_Y * 2
    // );
  }

  addPage() {
    const { doc } = this;
    doc.addPage();
    this.drawPageLimits();
    this.resetPage();
  }

  addTitle(title: string) {
    const TITLE_SIZE = 24;
    this.doc.setFontSize(TITLE_SIZE);
    this.setBoldFont();
    this.doc.setTextColor("#006FB7");
    this.doc.text(title, PAGE_WIDTH_PX / 2, this.y, {
      align: "center",
      baseline: "top",
    });
    this.resetFont();
    this.newLine(TITLE_SIZE * 2);
  }

  addSection(header: string) {
    this.testNewPage();
    const SECTION_SIZE = 16;
    this.doc.setFontSize(SECTION_SIZE);

    // Definir cor da fonte
    this.doc.setTextColor("#006FB7");

    this.setBoldFont();

    this.doc.text(header, this.x, this.y, {
      baseline: "top",
    });

    this.resetFont();
    this.newLine();
  }

  addText(text: string) {
    this.testNewPage();
    this.resetFont();
    this.doc.text(text, this.x, this.y);
    this.newLine(FONT_SIZE * 2);
  }

  addBase64Image(
    base64Img: string,
    height?: number,
    configs = { center: false, border: true }
  ) {
    const maxHeight = PAGE_HEIGHT_PX - MARGIN_Y * 2;
    const imageHeight = height && height < maxHeight ? height : maxHeight;

    const imgProps = this.doc.getImageProperties(base64Img);
    const imageWidth = (imgProps.width * imageHeight) / imgProps.height;

    this.testNewPage(imageHeight);
    let xPos = this.x;
    if (configs.center) {
      xPos += FREE_PAGE_WIDTH_PX / 2 - imageWidth / 2;
    }
    this.doc.addImage(base64Img, "PNG", xPos, this.y, imageWidth, imageHeight);
    this.doc.setDrawColor(0, 0, 0);
    if (configs.border) {
      this.doc.rect(xPos - 1, this.y - 1, imageWidth + 2, imageHeight + 2);
    }
    this.newLine(imageHeight + Y_SPACE);
  }

  addTableByElementId(tableElementId: string) {
    autoTable(this.doc, {
      html: tableElementId,
      startY: this.y,
    });
  }

  outputFile(filename?: string) {
    this.doc.save(filename || "relatorio-dinamico.pdf");
  }
}

export async function generateReportPdf() {
  const report = new ReportPDF();

  async function addHtmlElementAsImage(elementId: string, width?: number) {
    let element = document.getElementById(elementId);
    let image = await createBase64ImageForElement(element as HTMLElement);
    report.addBase64Image(image, width);
  }

  report.addTitle(`Relatório Dinâmico`);
  // report.addSection("Visão Geral da Carteira");
  await addHtmlElementAsImage(IDREVISAOCARTEIRA);

  // report.addSection("2 - Evolução do Patrimônio - (Crescimento da Carteira)");
  // await addHtmlElementAsImage(IDGRAFICOSREVISAOCARTEIRA);
  // report.addPage();
  // report.addSection("3 - Retorno da Carteira Local - (Quanto estou ganhando)");
  // report.addPage();
  // report.addSection("4 - Tipos de Ativos - (Em que eu tenho)");
  report.outputFile();
}
