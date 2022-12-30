import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import { useHistory } from 'react-router';
import { Products2 } from './products2';
import { Paypal } from './Paypal';
import pay_logo from './img/payment_ani.gif';
import './payment.css';
console.log("Products2 ", Products2);
const Payment = () => {
    const [islog, setIslog] = useState(false);
    const [address, setAddress] = useState('');
    const history = useHistory();
    const location = useLocation();
    const mypar = location.state;
    const totalam = location.state.totalam;
    console.log("payment amt ", mypar);
    console.log("totalam ", totalam);
    console.log("history ", history);

    const Autherize_payment = async () => {
        try {
            console.log("payment ");

            const res = await fetch("/payment", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            console.log("payment 2");

            // const data = await res.json();

            // console.log("addtocart 3");
            // console.log("addshop data: ", data);
            if (!res.status === 200) {
                console.log(" payment frontent error found");
            }
            else {
                // console.log("data.addtocarts ", data.addtocarts);
                // const obdata = data.addtocarts;
                // console.log("obdata ", obdata.length);
                // setUsercarts([...obdata]);
                // dispatch(prd_count(obdata.length));
                // // setUsercarts_og([...obdata]);

                // console.log("usercarts ", usercarts);
                setIslog(true);
            }

        }
        catch (e) {
            console.log("payment frontent error found");
            history.push("/singin");
        }
    }


    const post_payment = async () => {
        try {
            // console.log("chal");
            // const { username, email, message, phoneno } = usermessage;
            const res = await fetch("/payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    address
                })
            });
            const data = await res.json();
            console.log("data of add ", data);
            alert("Your Response is Successfully Recevied.We Received Your Product Soon Within 24 Hours.Thank You...");
            history.push('/');
        }
        catch (e) {
            console.log("postreqadd " + e);
        }
    }


    useEffect(() => {
        Autherize_payment();
    }, []);

    if (islog) {
        return (
            <>

                <div className="main_pay">
                    <div className="pay_logo">
                        <img src={pay_logo} alt='payment' />
                    </div>
                    <div className="pay_det">
                        <div class="field">
                            <label>Enter Your Address: </label>
                            <textarea value={address} name="address"
                                onChange={(e) => {
                                    setAddress(e.target.value)
                                }}
                                placeholder="Enter Your Address:" />
                        </div>
                        <button class="custom-btn btn-11" onClick={post_payment}>
                            Submit<div class="dot"></div></button>
                        <h1 className="or">OR</h1>
                        <Paypal totalam={totalam} />
                    </div>
                </div>

            </>
        )
    }
    return null;
}
export default Payment;