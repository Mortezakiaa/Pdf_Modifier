import { degrees, PDFDocument,PDFImage, rgb, StandardFonts } from "pdf-lib";


export default async function modifyPdf(existingPdfBytes , data) {
  const {axisX,axisY,borderWidth} = data
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  // const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const pages = pdfDoc.getPages();
  
  const tsnaImgArrayBuffer = await tsnaBase64ToFile();
  const tsnaImage = await pdfDoc.embedPng(tsnaImgArrayBuffer);
  const tsnaDims = tsnaImage.scale(0.25);

  const amisaImgArrayBuffer = await amisaBase64ToFile();
  const amisaImage = await pdfDoc.embedPng(amisaImgArrayBuffer);
  const amisaDims = amisaImage.scale(0.15);
  
  pages.map((page)=>{
    const { width, height } = page.getSize();

    page.drawImage(tsnaImage, {
      x: width / 2 - tsnaDims.width / 2,
      y: height / 2 - tsnaDims.height / 2,
      width: tsnaDims.width,
      height: tsnaDims.height,
      opacity: 0.08
    })
      page.drawRectangle({
        x: width,
        y: 0,
        borderColor: rgb(1, 1, 1),
        borderWidth: borderWidth,
        height:height,
        width:width,
      })
      page.drawImage(amisaImage, {
        x: width / 2 + amisaDims.width,
        y: height / 2 - amisaDims.height / 2,
        width: amisaDims.width,
        height: amisaDims.height,
        opacity: 0.08
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
async function tsnaBase64ToFile() {
  const response = await fetch("../T.png");
  const arrayBuffer = await response.arrayBuffer();
  return arrayBuffer;
}
async function amisaBase64ToFile() {
  const response = await fetch("../amisa.png");
  const arrayBuffer = await response.arrayBuffer();
  return arrayBuffer;
}