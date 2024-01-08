import { useState } from "react"
import modifyPdf from "./PdfModifier"

function App() {
  const [state,setState] = useState({
    axisX:'',
    axisY:'',    
    borderWidth:''
  })

  const change = async (e)=>{
    let file = e.target.files[0]
    let arrBuffer = await file.arrayBuffer()
    modifyPdf(arrBuffer , state);
  }

  return (
    <div className="d-flex flex-column gap-10p"> 
      <h3>Description : Accepts Negative And Positive Values Along The Cordinate Axis (x and y)</h3>
      <div className="d-flex gap-10p">
        <label htmlFor="X">axisX :</label>
        <input type="number" id="X" name="axisX" value={state.axisX} onChange={e => setState({...state ,[e.target.name]:+e.target.value})} />
      </div>
      <div className="d-flex gap-10p">
        <label htmlFor="Y">axisY :</label>
        <input type="number" id="Y" name="axisY" value={state.axisY} onChange={e => setState({...state ,[e.target.name]:+e.target.value})} />
      </div>
      <div className="d-flex gap-10p">
        <label htmlFor="">borderWidth : </label>
        <input type="number" name="borderWidth" value={state.borderWidth} onChange={e => setState({...state ,[e.target.name]:+e.target.value})} />
      </div>
      <input type="file" onChange={e => change(e)}/>
    </div>
  )
}

export default App
