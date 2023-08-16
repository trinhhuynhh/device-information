import React from 'react'

const Pyscript = () => {

    const htmlText = `
  <py-config src="config.toml"></py-config>
  <py-config>
  - autoclose_loader: true
  - runtimes:
    - src: "https://cdn.jsdelivr.net/pyodide/dev/full/pyodide.js"
      name: pyodide-dev
      lang: python
  </py-config>
  <py-env>
  - opencv-python
  - paths:
    - ./main.py
  </py-env>
  <py-script>
  import datetime as dt

  def show_time(): 
    Element("today").write(str(dt.date.today()))
  
  show_time()

  </py-script>
    <div id="outputRepl"></div>
    <py-repl output="outputRepl"> </py-repl>
  `;
  return (
    <div>
        <h1>Demo Pyscript</h1>
        <h5 id="today"></h5>
        <div dangerouslySetInnerHTML={{ __html: htmlText }}></div>
    </div>
  )
}

export default Pyscript