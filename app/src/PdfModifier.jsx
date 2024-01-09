import {PDFDocument, rgb} from "pdf-lib";
import img from './assets/TSNA Logo.png'

const pngArrayBuffer = async()=>{
  let n = new Blob([`${img}`] , {type:'image/png'})
  let x = await n.arrayBuffer()
  return x
}


export default async function modifyPdf(existingPdfBytes , data) {
  const {axisX,axisY,borderWidth} = data
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  const pngImageBytes = await pngArrayBuffer()
  console.log(pngImageBytes);

  const pngImage = await pdfDoc.embedPng(pngImageBytes)
  
  const pages = pdfDoc.getPages();

  const pngDims = pngImage.scale(0.4)
  
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
      page.drawImage(pngImage, {
        x: width/5.5,
        y: height/2.5,
        width: pngDims.width,
        height: pngDims.height,
        opacity:0.3,
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
