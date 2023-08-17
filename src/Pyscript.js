import React from 'react'

const Pyscript = () => {

    const htmlText = `
  <py-config src="config.toml"></py-config>
  
  <py-script>
  import datetime as dt
  import asyncio
  from mathslib import subtract  
  import random  

  print(subtract(8, 4))  
  print("random number generated: ")  
  print(random.randint(1, 12))  

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