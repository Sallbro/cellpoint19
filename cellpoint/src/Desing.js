import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { prd_count } from './redux/actions/actions';

const Desing = ({ card_detail, Addtocart, Filteredproduct }) => {
  console.log("desing card_detail ",card_detail);
  const history = useHistory();

 
  const [count_state, setCount_state] = useState(0);
  const dispatch = useDispatch();

  const callaboutpage = async () => {
    try {
      console.log("addtocart ");

      const res = await fetch("/addtocart", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      console.log("addtocart 2");

      const data = await res.json();

      console.log("addtocart 3");
      console.log("addshop data: ", data);
      if (!res.status === 200) {
        console.log("frontent error found");
      }
      else {
        const obdata = data.addtocarts;
        console.log("obdata-> ", obdata);
        console.log("len ", obdata.length)
        dispatch(prd_count(obdata.length));
        setCount_state(obdata.length);
      }

    }
    catch (e) {
      console.log("frontent error found");
      // history.push("/singin");

    }
  }
  useEffect(() => {
    callaboutpage();
    console.log("conunt state ", count_state);
    dispatch(prd_count(count_state));
  }, []);

  return (
    <>
      {card_detail.map((elem, index) => {
        return (
          <>

            <div class="col mb-5" onClick={() => {
              Filteredproduct(elem.category);
              history.push('/details', { params: { elem } });
              console.log("elem catg ", elem.category);
            }
            }>

              <div class="card h-100">
                {/* <!-- Sale badge--> */}
                <div class="badge bg-dark text-white position-absolute">Sale {elem.discount} OFF</div>
                {/* <!-- Product image--> */}
                <img class="card-img-top" src={elem.img} alt="" />
                {/* <!-- Product details--> */}
                <div class="card-body p-4">
                  <div class="text-center">
                    {/* <!-- Product name--> */}
                    <h5 class="fw-bolder">{elem.name}</h5>
                    {/* <!-- Product reviews--> */}
                    <div class="d-flex justify-content-center small text-warning mb-2">
                      <div class="bi-star-fill"></div>
                      <div class="bi-star-fill"></div>
                      <div class="bi-star-fill"></div>
                      <div class="bi-star-fill"></div>
                      <div class="bi-star-fill"></div>
                    </div>
                    {/* <!-- Product price--> */}
                    <span class="text-muted text-decoration-line-through">$20.00</span>
                    $18.00
                  </div>
                </div>
                {/* <!-- Product actions--> */}
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                  <div class="text-center" onClick={(e) => {
                    e.stopPropagation();
                    Addtocart(elem._id);
                    dispatch(prd_count(count_state + 1));
                    setCount_state(count_state + 1);
                    setTimeout(()=>{
                      history.push('/addtocart');
                    },1000);

                  }
                  }>
                    <div class="btn btn-outline-dark mt-auto">BUY</div>
                  </div>
                  <div class="text-center" onClick={(e) => {
                    e.stopPropagation();
                    Addtocart(elem._id);
                    dispatch(prd_count(count_state + 1));
                    setCount_state(count_state + 1);
                  }
                  }>
                    <div class="btn btn-outline-dark mt-auto">Add to cart</div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })
      }
      {/* <Addshop barbad={barbad} /> */}
      {/* <Navs /> */}
    </>
  )
}

export default Desing;
