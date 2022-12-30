import React, { useState } from 'react'
// import Googlemap from './Googlemap';
import './styles.css';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { useCallback } from 'react';
//api      AIzaSyBNBa6RNNbH8mXmODcUjdF6OzeALsbdVqk


const About = () => {
    const [islog, setIslog] = useState(false);
    const [aboutuser, setAboutuser] = useState();
    const history = useHistory();
    const callaboutpage = useCallback(async () => {
        try {
            console.log("about ");
            const res = await fetch("/about", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            console.log("about 2");
            const data = await res.json();
            console.log("about 3");
            console.log("data is: ", data);

            if (!res.status === 200) {
                console.log("frontent error found");

            }
            else {
                console.log("frontent about js : ");
                setAboutuser(data);
                setIslog(true);
            }


        }
        catch (e) {
            console.log("frontent error found");
            history.push("/singin");
        }
    }, [history]);

    useEffect(() => {
        callaboutpage();
    }, [callaboutpage]);

    if (islog) {
        return (
            <>

                <form method="GET">
                    <div className="page-content page-container" id="page-content">
                        <div className="padding">
                            <div className="row container d-flex mx-auto mt-5 mb-5 col-12 justify-content-center">
                                <div className="col-xl-6 col-md-12">
                                    <div className="card user-card-full">
                                        <div className="row m-l-0 m-r-0">
                                            <div className="col-sm-4 bg-c-lite-green user-profile">
                                                <div className="card-block text-center text-white">
                                                    <div className="m-b-25"> <img src="https://img.icons8.com/bubbles/100/000000/user.png" className="img-radius" alt="User-Profile" /> </div>
                                                    <h6 className="f-w-600 about_nameheader">Name</h6>
                                                    <p className="about_name">{aboutuser.username}</p> <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                                </div>
                                            </div>
                                            <div className="col-sm-8">
                                                <div className="card-block">
                                                    <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <p className="m-b-10 f-w-600">Email</p>
                                                            <h6 className="text-muted f-w-400">{aboutuser.email}</h6>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <p className="m-b-10 f-w-600">Phone</p>
                                                            <h6 className="text-muted f-w-400">{aboutuser.phoneno}</h6>
                                                        </div>
                                                    </div>
                                                    <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Additional Info</h6>
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <p className="m-b-10 f-w-600">Date Of Birth</p>
                                                            <h6 className="text-muted f-w-400">{aboutuser.dateofbirth}</h6>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <p className="m-b-10 f-w-600">Country</p>
                                                            <h6 className="text-muted f-w-400">{aboutuser.country}</h6>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <p className="m-b-10 f-w-600">Gender</p>
                                                            <h6 className="text-muted f-w-400">{aboutuser.gender}</h6>
                                                        </div>
                                                    </div>
                                                    {/* <ul className="social-link list-unstyled m-t-40 m-b-10">
                                                        <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="facebook" data-abc="true"><i className="mdi mdi-facebook feather icon-facebook facebook" aria-hidden="true"></i></a></li>
                                                        <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="twitter" data-abc="true"><i className="mdi mdi-twitter feather icon-twitter twitter" aria-hidden="true"></i></a></li>
                                                        <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="instagram" data-abc="true"><i className="mdi mdi-instagram feather icon-instagram instagram" aria-hidden="true"></i></a></li>
                                                    </ul> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </>
        )
    }
    return null;
}

export default About;
