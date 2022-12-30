import React from 'react'
import { useSelector } from 'react-redux';
import './related_prod.css';
import { useHistory } from 'react-router';

const Relatedprod = () => {
    const history = useHistory();
    const data = useSelector((state) => state.filters_product.filtered_prd);
    const data2 = useSelector((state) => state.filters_product);
    console.log("filters_product data ", data);
    console.log("filters_product data 2 ", data2);
    return (
        <>
            {/* related products  */}
            <section class="feature-products">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12 text-center feature-title">
                            <h2>FEATURED PRODUCTS</h2>
                            <span class="feature-active">BEST SELLER</span> | <span>NEW ARRIVAL</span> | <span>MOST WANTED</span>
                        </div>
                        {data.map((elem) => {
                            return (
                                <>
                                    <div class="col-md-3 col-sm-6">
                                        <div class="product-grid" onClick={()=>{
                                            history.push('/details', { params: { elem } });
                                        }}>

                                            <div class="product-image">
                                                <div class="image" style={{ backgroundColor: "#F3F3F3" }}>
                                                    <img class="pic-1" src={elem.img} alt="img" />
                                                </div>
                                                {/* <div class="add-to-cart"> + </div> */}
                                            </div>
                                            <div class="product-content">
                                                <h3 class="title"><div>{elem.name}</div></h3>

                                                <div class="price">${elem.amount}</div>
                                                <ul class="rating">
                                                    <li class="fas fa-star"></li>
                                                    <li class="fas fa-star"></li>
                                                    <li class="fas fa-star"></li>
                                                    <li class="fas fa-star"></li>
                                                    <li class="fas fa-star disable"></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })}
                    </div>
                </div>
            </section>
        </>
    )

}
export default Relatedprod;