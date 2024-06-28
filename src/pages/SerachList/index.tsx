import { Outlet } from "react-router-dom";
import React from "react"
import "./SearchList.css";

function SerachList (): React.ReactElement {
  return(
    <div className="content">
      <Outlet/>
    </div>
  )
}

export default SerachList;
