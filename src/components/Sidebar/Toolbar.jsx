import React, { useState } from "react";

import Sidebar from "./Sidebar";
import Backdrop from "./Backdrop";

import menu from "../../images/icons/menu.png";

function Toolbar(props) {
  const [sidebar, setSidebar] = useState(false);

  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };

  return (
    <div className="toolbar">
      <img
        className="side-menu"
        src={menu}
        alt="menu"
        onClick={toggleSidebar}
      />
      <Backdrop sidebar={sidebar} setSidebar={toggleSidebar} />
      <Sidebar
        sidebar={sidebar}
        toggleIsLogined={props.toggleIsLogined}
        showLoginModal={props.showLoginModal}
        userId={props.userId}
      />
    </div>
  );
}

export default Toolbar;
