import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";
import PD from "./assets/sample.pdf";

export default async function modifyPdf(existingPdfBytes) {
//   const url = "https://pdf-lib.js.org/assets/with_update_sections.pdf";
  // const url = './assets/sample.pdf'
//   const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const pages = pdfDoc.getPages();
  
  pages.map((page)=>{
      const { width, height } = page.getSize();
      page.drawText("add sample Text!!!!!!!!!", {
        x: 5,
        y: height / 2 + 300,
        size: 50,
        font: helveticaFont,
        color: rgb(0.95, 0.1, 0.1),
        rotate: degrees(-45),
      });
    
      page.drawRectangle({
        x: 40,
        y: 450,
        borderColor: rgb(1, 0, 0),
        borderWidth: 1.5,
      })
  })

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = 'sample.pdf';

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
}
