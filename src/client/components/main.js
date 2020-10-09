import * as React from "react";
import Login from "./login";
import Test from "./carte";
import Title from "./title";
//import LogiqueModal from "./logiqueModal";
//import Modal from "./Modal";

function App() {
   // const {revele, toggle} = LogiqueModal();

    return (
        <div>
            <Title />
            <Login />
           
            {/* <button className={"button"} onClick={toggle}>
                open modal
            </button>
            <Modal revele={revele} cache={toggle} /> */}

            <Test />
        </div>
    );
}

export default App;
