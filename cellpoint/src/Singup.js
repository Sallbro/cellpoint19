import React from 'react'
import { NavLink } from 'react-router-dom'
import { useState } from 'react';
import { useHistory } from 'react-router';


const Singup = () => {

    const [user, setUser] = useState({
        username: "", phoneno: "", email: "", password: "", againpassword: ""
    });
    const history = useHistory();

    const { username, phoneno, email, password, againpassword } = user;

    const Handlechange = async (e) => {
        e.preventDefault();
        const Name = e.target.name;
        const Value = e.target.value;

        setUser({ ...user, [Name]: Value });
        console.log("Name: " + Name);
        console.log("value: " + Value);
    }
    // const settinggender = (e) => {
    //     const name = e.target.name;
    //     if (name == "male") {
    //         setUser({ ...user, gender: "male" });
    //         console.log(gender);
    //     }

    //     if (name == "female") {
    //         setUser({ ...user, gender: "female" });
    //         console.log(gender);
    //     }
    // }
    const Postdata = async (e) => {
        e.preventDefault();
        if (!username || !phoneno || !email || !password || !againpassword) {
            alert("Please Fill All The Details");
        }
        if (password !== againpassword) {
            alert("Choose The Correct Password");
        }
        else {
            console.log("work");
            const res = await fetch("/registration", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username, phoneno, email, password,
                })
            });
            console.log("work 2");
            const data = await res.json();
            console.log("work 3");
            if (data.status === 422 || !data) {
                alert("invalid");
            } else {
                alert("succesful");
                history.push("/singin");
            }
        }
    }
    return (
        <>
            <div class="wrapper">
                <div class="title">Singup Form</div>
                <form method="POST">
                    <div class="field">
                        <input type="text" value={username} name="username" onChange={Handlechange} placeholder="Username" />
                        <label>Name</label>
                    </div>
                    <div class="field">
                        <input type="number" value={phoneno} name="phoneno" onChange={Handlechange} placeholder="PhoneNo" />
                        <label>Phone No</label>
                    </div>
                    <div class="field">
                        <input type="text" value={email} name="email" onChange={Handlechange} placeholder="Email" />
                        <label>Email Address</label>
                    </div>
                    <div class="field">
                        <input type="password" value={password} name="password" onChange={Handlechange} placeholder="Password" />
                        <label>Password</label>
                    </div>
                    <div class="field">
                        <input type="password" value={againpassword} name="againpassword" onChange={Handlechange} placeholder="Again Password" />
                        <label>Again Password</label>
                    </div>
                    {/* <div class="content">
                        <div class="checkbox">
                            <input type="checkbox" id="remember-me" style={{ "marginBottom": "0px","left":"0px" }} />
                            <label for="remember-me">Remember me</label>
                        </div>
                    </div> */}
                    {/* social media login  */}
                    <div class="social-login">
                        <span class="social-label">Or login with</span>
                        <ul class="socials">
                            <li><i class="display-flex-center zmdi zmdi-facebook"></i></li>
                            <li><i class="display-flex-center zmdi zmdi-twitter"></i></li>
                            <li><i class="display-flex-center zmdi zmdi-google"></i></li>
                        </ul>
                    </div>
                    <div class="field">
                        <input type="submit" value="Submit" onClick={Postdata} />
                    </div>
                    <div class="signup-link">Already a member? <NavLink to="/singin" >Singin now</NavLink></div>
                </form>
            </div>

        </>
    )

}
export default Singup;