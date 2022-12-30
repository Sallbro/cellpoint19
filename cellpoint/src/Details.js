import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';
import { useHistory } from 'react-router';
import './details.css';
import Relatedprod from './Related_prod';
import { Products } from './Products';

const Details = () => {
    const location = useLocation();
    const history = useHistory();
    const mypar = location.state;
    const mypar2 = mypar.params.elem.image_details;
    console.log("mypar ", mypar);
    console.log("mypar2 ", mypar2);
    const [product, setProduct] = useState(Products);
    const Filteredproduct = (catg) => {
        console.log("Filteredproducts ");
        const Updatefilter = Products.filter((elem) => {
            return elem.category === catg;
        });
        // console.log("catg name: "+catg);
        console.log("Updatefilter ", Updatefilter);
        setProduct(Updatefilter);
        console.log("Filteredproducts 2");
        // setCurrenpage(1);
        // setMaxlimit(2);
        // setMinlimit(0);
        // updatedata = product.slice(firstindex, lastindex);
        // console.log("updatefilter " + product)
    }

    // console.log("updatefilter2 ", product)
    // setProduct(Filteredproduct);
    useEffect(() => {
        Filteredproduct(mypar.params.elem.category);
        console.log("del prd ", product);
    }, []);


    return (
        <>
            {/* <div style={{ 'backgroundColor': 'black', 'margin-top': '10px', 'margin': 'auto', 'height': "500px", 'width': '500px', 'boxSizing': 'border-box' }}>

                <div className='container-fluid' >
                    <Carousel interval={1500} keyboard={false} pauseOnHover={true}>
                        {mypar2.map((elem) => {
                            return (
                                <Carousel.Item style={{ 'height': "500px", 'width': '500px' }}  >
                                    <img style={{ 'height': "500px", 'width': '500px' }}
                                        className="d-block w-100"
                                        src={elem} />
                                    <Carousel.Caption>
                                        <h3>First Demo </h3>
                                    </Carousel.Caption>
                                </Carousel.Item  >
                            )
                        })

                        }
                    </Carousel>
                </div>
            </div> */}

            <div class="detail_main">
                <div class="detail_img">

                    <Carousel interval={1000}>
                        {mypar2.map((elem) => {
                            return (
                                <Carousel.Item >
                                    <img
                                        className="d-block w-100"
                                        src={elem} alt="" />
                                    <Carousel.Caption>
                                        <h3>{elem.name}</h3>
                                    </Carousel.Caption>
                                </Carousel.Item  >
                            )
                        })

                        }

                    </Carousel>

                </div>
                {/* <div style={{ justifyContent: "center", alignItems: 'center' }}>
                        <button style={{ backgroundColor: "black", color: "white" }} onClick={() => history.push("/")}>back to shop</button>
                        {/* <button style={{backgroundColor:"black",color:"white"}}>AddToCart</button> 
                    </div>
                     */}

                <div class="detail_desc">
                    <h1>HeadPhone</h1>
                    <span>
                        Redgear A-15 Wired Gaming Mouse with Upto 6400 DPI, RGB & Driver Customization for PC(Black)
                        Redgear A-15 Wired Gaming Mouse with Upto 6400 DPI, RGB & Driver Customization for PC(Black)
                    </span>

                    {/* <!-- Product actions--> */}
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent" style={{marginTop:"10px"}}>
                        <div class="text-center" onClick={()=>{
                            history.push('/');
                        }}>
                            <div class="btn btn-outline-dark mt-auto">Continue Shopping</div>
                        </div>
                    </div>
                </div>
            </div>
            <Relatedprod />
        </>
    )
}

export default Details;
