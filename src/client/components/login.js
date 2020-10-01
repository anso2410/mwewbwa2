
import * as React from "react";


function Login() {
    return (
        <div>
            <h1>Login</h1>
            <form   action={"/hello"} method={"POST"}>
                <div className="test"  >
                    <label   htmlFor={"name"}>Name</label>
                    <input  type={"text"} name={"username"} />
                </div>
                <div className="test">
                    <label htmlFor={"email"}>Email</label>
                    <input type={"email"} name={"email"} />
                </div>
                <div className="test">
                    <label htmlFor={"password"}>password</label>
                    <input type={"text"} name={"password"} />
                </div>
                <div className="test">
                    <label htmlFor={"color"}>Color</label>
                    <input type={"text"} name={"color"} />
                    
                </div>
                <input type={"submit"} value={"Add Member"} />
                
                         </form>
        </div>
      
       
      
    );
}


export default Login;