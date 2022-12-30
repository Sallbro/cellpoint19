import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
export const Paypal = ({ totalam }) => {
    console.log("paypal am ", totalam);
    const paypal = useRef();
    const history = useHistory();
    useEffect(() => {
        console.log("paypal run");
        window.paypal.Buttons({
            // Sets up the transaction when a payment button is clicked
            createOrder: (data, actions) => {
                return actions.order.create({
                    purchase_units: [{
                        description: "just a desp",
                        amount: {
                            currency_code: "USD",
                            value: totalam.totalam   // Can also reference a variable or function
                        }
                    }]
                });
            },
            // Finalize the transaction after payer approval
            onApprove: (data, actions) => {
                return actions.order.capture().then(function (orderData) {
                    // Successful capture! For dev/demo purposes:
                    // console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
                    const transaction = orderData.purchase_units[0].payments.captures[0];
                    alert(`Transaction ${transaction.status}: ${transaction.id}\n\nSee console for all available details`);
                    history.push("/");
                });
            },
            onError: (err) => {
                console.log("paypal err ", err);
            }
        }).render(paypal.current);
    }, []);

    return (
        <>
            <div>
                <div ref={paypal}></div>
            </div>

        </>
    )
}