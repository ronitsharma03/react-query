
import React, { useState } from "react";
import PostData from "./components/PostData";

function App(){
  const [toggle, setToggle] = useState(true);
  
  return <div>
    <button onClick={() => setToggle(!toggle)}>Toggle</button>
    {toggle && <PostData />}
  </div>
}

export default App;