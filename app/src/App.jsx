import { useEffect, useState } from "react";
import modifyPdf from "./PdfModifier"


const copyArrayBuffer = (arrayBuffer) => {
  const copiedArrayBuffer = new ArrayBuffer(arrayBuffer.byteLength);
  new Uint8Array(copiedArrayBuffer).set(new Uint8Array(arrayBuffer));
  return copiedArrayBuffer;
};



function App() {
  const [val,setVal] = useState()

  const change = async (e)=>{
    let x = e.target.files[0]
    let xx = await x.arrayBuffer()
    modifyPdf(xx);
  }

  useEffect(()=>{
    if(val){
      // let x = copyArrayBuffer(val)
      // console.log(x);
    }
  },[val])

  return (
    <> 
      <input type="file" value={val} onChange={e => change(e)}/>
    </>
  )
}

export default App
