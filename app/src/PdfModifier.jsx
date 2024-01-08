import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";

export default async function modifyPdf(existingPdfBytes , data) {
  const {axisX,axisY,borderWidth} = data
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  // const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const pages = pdfDoc.getPages();
  
  pages.map((page)=>{
      const { width, height } = page.getSize();
      page.drawRectangle({
        x: axisX,
        y: axisY,
        borderColor: rgb(1, 1, 1),
        borderWidth: borderWidth,
        height:height,
        width:width,
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
