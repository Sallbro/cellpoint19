import React from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
function myFunction(e) {
    // var header = document.getElementsByClassName("btn-group");
    var btns = document.getElementsByClassName("btn-group__item");
    console.log("btns len ", btns.length)
    console.log("btns ", btns)
    for (var i = 0; i < btns.length; i++) {
        var current = document.getElementsByClassName("btn-group__item active");

        for (var j = 0; j < current.length; j++) {
            // console.log("current of " + i + " " + current[j]);
            current[j].classList.remove("active");
        }
        console.log("current ", current);
    }
    e.target.className += " active";
}

const Navbarbutton = ({ categorys, Filteredproduct }) => {
    const mystate = useSelector((state) => state.catg);
    // console.log("mystate ", mystate);
    useEffect(() => {
        if (mystate.catg.length) {
            var btns = document.getElementsByClassName("btn-group__item");
            if (btns.length && btns) {
                btns[0].className += " active";
            }
        }
    }, [mystate]);
    return (
        <>
            <nav className="navbar">
                <div className="btn-group">
                    {
                        categorys?.map((elem) => {
                            return (
                                <>
                                    <button
                                        className="row row-cols-2 btn-group__item" onClick={(e) => {
                                            Filteredproduct(elem);
                                            myFunction(e);
                                        }
                                        }>
                                        {elem}
                                    </button>
                                </>
                            )
                        })
                    }

                </div>
            </nav>
        </>
    )
}

export default Navbarbutton;
