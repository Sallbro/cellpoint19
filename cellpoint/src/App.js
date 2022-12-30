import React, { useState, useEffect } from 'react';
import Desing from './Desing';
import './styles.css';
import Navbarbutton from './Navbarbutton';
import { useDispatch } from 'react-redux';
import { category, updatefilter } from './redux/actions/actions';
import Buffer from './Buffer';


// console.log(Products);
var last;
const App = () => {

  const dispatch = useDispatch();
  const [mainproduct, setMainproduct] = useState([]);
  const [product, setProduct] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [addtocards, setAddtocards] = useState([]);

  console.log("product " + product);
  console.log("addtocards " + addtocards);

  // pagination
  const [currenpage, setCurrenpage] = useState(1);
  const itemperpage = 4;
  // const [currenlimit,setCurrenlimit] =useState(2);
  const [minlimit, setMinlimit] = useState(0);
  const [maxlimit, setMaxlimit] = useState(2);
  const pages = [];
  for (let i = 1; i <= Math.ceil(product.length / itemperpage); i++) {
    pages.push(i);
  }
  let lastindex = currenpage * itemperpage;
  let firstindex = lastindex - itemperpage;
  let updatedata = product.slice(firstindex, lastindex);
  console.log("lastindex" + lastindex);
  console.log("firstindex" + firstindex);
  console.log("updatedata" + updatedata);

  const Get_prd_data = async () => {
    try {
      const res = await fetch("/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },

      });
      const data = await res.json();
      if (data) {
        console.log("App prd data is: ", data);
        setProduct(data);
        setMainproduct(data);

        // setPrd(data);
        // setOpen(false);
      }
    }
    catch (e) {
      console.log("data err ",e);

    }
  }
  const Unq_catg = () => {
    const Uniquecategory = ["ALL", ...new Set(mainproduct?.map((elem) => {
      return elem.category;
    }))];
    dispatch(category(Uniquecategory));
    setCategorys(Uniquecategory);

  }

  useEffect(() => {
    Get_prd_data();
  }, []);

  useEffect(() => {
    Unq_catg();
  }, [mainproduct]);

  const handleclick = (number) => {
    setCurrenpage(number);
    console.log("update " + updatedata);
  }
  const prevclick = () => {
    if (currenpage > 1) {
      setCurrenpage(currenpage - 1);
    }
    if (currenpage - 1 <= minlimit && currenpage > 1) {
      setMaxlimit(maxlimit - 2);
      setMinlimit(minlimit - 2);
    }
  }
  const nextclick = () => {
    if (currenpage < Math.ceil(product.length / itemperpage)) {
      setCurrenpage(currenpage + 1);
    }
    if (currenpage >= maxlimit && currenpage < Math.ceil(product.length / itemperpage)) {
      // && currenpage<minlimit && currenpage >Math.ceil(product.length / itemperpage)
      setMaxlimit(maxlimit + 2);
      setMinlimit(minlimit + 2);
    }
  }

  const NextDots = () => {
    if (maxlimit < Math.ceil(product.length / itemperpage)) {
      return (
        <>
          <li className="dots" onClick={NextDotfun}>...</li>
        </>
      )
    }
    else {
      return null;
    }
  }
  const PrevDots = () => {
    if (minlimit >= 1) {
      return (
        <>
          <li className="dots" onClick={PrevDotfun}>...</li>
        </>
      )
    }
    else {
      return null;
    }
  }

  const NextDotfun = () => {
    // if(currenpage < Math.ceil(product.length / itemperpage)){
    setCurrenpage(currenpage + 1);
    setMaxlimit(maxlimit + 1);
    setMinlimit(minlimit + 1);
    // }
  }

  const PrevDotfun = () => {

    setCurrenpage(currenpage - 1);
    setMaxlimit(maxlimit - 1);
    setMinlimit(minlimit - 1);

  }

  const Filteredproduct = (catg) => {
    console.log("catg ", catg);
    if (catg === 'ALL') {
      setProduct(mainproduct);
      setCurrenpage(1);
      setMaxlimit(2);
      setMinlimit(0);
      updatedata = product.slice(firstindex, lastindex);
      return;
    }
    const Updatefilter = mainproduct.filter((elem) => {
      return elem.category === catg;
    });
    // console.log("catg name: "+catg);
    dispatch(updatefilter(Updatefilter));
    setProduct(Updatefilter);
    setCurrenpage(1);
    setMaxlimit(2);
    setMinlimit(0);
    updatedata = product.slice(firstindex, lastindex);
    console.log("updatefilter " + product)
  }

  console.log("updatefilter2 ", updatedata)
  // setProduct(Filteredproduct);


  console.log("catg: ",categorys);


  const Addtocart = (idx) => {
    console.log("idx ", idx);
    const prd_idx =
      product?.filter((elem) => {
        return elem._id === idx;
      })
    console.log("prd_idx ", prd_idx);
    const updAddtocard = [...addtocards, ...prd_idx];
    console.log("updAddtocard ", updAddtocard);
    const prdidx = prd_idx;
    console.log("prdidx ", prdidx);

    //uncomment this ...
    setAddtocards(updAddtocard);
    // setProductidx(prdidx);
    if (prdidx !== undefined && prdidx.length !== 0) {
      console.log("value is present");
      Postreqadd(prdidx);
    }

    console.log("setaddtocards in Addtocart ", addtocards);
    // console.log("setProductidx in Addtocart ", productidx);
    console.log("product[idx]  in Addtocart ", prdidx);

  }


  //console.log(addtocards);

  //pagination
  // useEffect(() => {
  //   setProduct(updatedata);

  //  }, []);


  // console.log("data2 "+data);
  // const byss="dimagka";
  // last=addtocards;
  // console.log("addtocards: " + addtocards);
  // console.log("productidx ", productidx);

  //Postreqadd
  const Postreqadd = async (productidx) => {
    try {

      console.log("setProductidx in postreq ", productidx);
      const res = await fetch("/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          productidx
        })
      });
      const data = await res.json();
      console.log("Postreqadd data of add ", data);
      console.log("Postreqadd productidx ", productidx);

    }
    catch (e) {
      console.log("postreqadd " + e);
    }
  }
  //uncomment if necessary...
  // useEffect(() => {
  //   if (productidx) {
  //     Addtocart();
  //   }
  // }, [productidx]);



  return (
    <>

      <diV class="salmanc">
        <header class="bg-dark py-5">
          <div class="container px-4 px-lg-5 my-5">
            <div class="text-center text-white">
              <div class="salmanhead">
                <h1 class="display-4 fw-bolder">CELL POINT</h1>
              </div>
              <p class="lead fw-normal text-white-50 mb-0">BOOK YOUR ORDER NOW...</p>
            </div>
          </div>
        </header>

        {/* video  */}
        {/* <video autoplay muted loop id="myVideo">
          <source src="cellpoint_mp4.mp4" type="video/mp4" />
        </video> */}

        {/* 
           <BrowserRouter>  
          </BrowserRouter> */}

        {/* navebarbutton */}

        {mainproduct.length < 1 ? <Buffer /> : null}
        <Navbarbutton categorys={categorys} Filteredproduct={Filteredproduct} />


        {/* <!-- Section--> */}
        <section class="py-5">
          <div class="container px-4 px-lg-5 mt-5">
            <div class="row gx-4 gx-lg-5 row-cols-1 row-cols-md-3 row-cols-xl-4 justify-content-center">

              <Desing card_detail={updatedata} Addtocart={Addtocart} Filteredproduct={Filteredproduct} />

            </div>
          </div>
        </section>


        {/* pagination */}
        <div class="numberblock">
          <ul class="numbers">
            <li class="number" onClick={() => prevclick()}>prev</li>
            <PrevDots />
            {
              pages.map((number) => {
                if (number <= maxlimit && number > minlimit) {

                  return (
                    <>
                      <li id={number} onClick={() => handleclick(number)}
                        className={currenpage === number ? "active" : null}>{number}</li>
                    </>
                  )
                }
                return null;
              })

            }

            <NextDots />



            <li class="number" onClick={() => nextclick()}>next</li>
          </ul>
        </div>
        {/* <Pagination product={product} />  */}

        {/* <!-- Footer--> */}
        <footer class="py-5 bg-dark">
          <div class="container"><p class="m-0 text-center text-white">Copyright &copy; Cell Point 2021</p></div>
        </footer>
      </diV>

    </>
  );

}

export default App;
export { last };