import axios from "axios";
import React from "react";
const ForgotPassword = () => {
    const style = {
        backgroundColor: "var(--second)",
        display: "flex",
        justifyContent: "center",
        marginTop: "100px",
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        axios.post("https://localhost:5000/g2movies/user/forgotpassword",{email : e.target.email.value});
    }
    return (<div className="forgot-password" style={style}>
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Input your email" />
            <input type="submit" value="Go" />

        </form>
    </div>);
}
 
export default ForgotPassword;