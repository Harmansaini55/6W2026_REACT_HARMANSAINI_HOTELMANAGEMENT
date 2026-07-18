export default function Footer (){
    return(
        <>
        <>
  {/* ##### Footer Area Start ##### */}
  <footer className="footer-area">
    <div className="container">
      <div className="row">
        {/* Footer Widget Area */}
        <div className="col-12 col-lg-5">
          <div className="footer-widget-area mt-50">
            <a href="#" className="d-block mb-5">
              <img src="img/core-img/logo.png" alt="" />
            </a>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              malesuada lorem maximus mauris sceleri sque, at rutrum nulla
              dictum. Ut ac ligula sapien. Suspendisse cursus faucibus finibus.{" "}
            </p>
          </div>
        </div>
        {/* Footer Widget Area */}
        <div className="col-12 col-md-6 col-lg-4">
          <div className="footer-widget-area mt-50">
            <h6 className="widget-title mb-5">Find us on the map</h6>
            <img src="img/bg-img/footer-map.png" alt="" />
          </div>
        </div>
        {/* Footer Widget Area */}
        <div className="col-12 col-md-6 col-lg-3">
          <div className="footer-widget-area mt-50">
            <h6 className="widget-title mb-5">Subscribe to our newsletter</h6>
            <form action="#" method="post" className="subscribe-form">
              <input
                type="email"
                name="subscribe-email"
                id="subscribeemail"
                placeholder="Your E-mail"
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
        {/* Copywrite Text */}
        <div className="col-12">
          <div className="copywrite-text mt-30">
            <p>
              <a href="#">
                {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                Copyright © All rights reserved | This template is made with{" "}
                <i className="fa fa-heart-o" aria-hidden="true" /> by{" "}
              </a>
              <a href="https://colorlib.com" target="_blank">
                Colorlib
              </a>
              {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
  {/* ##### Footer Area End ##### */}
</>

        
        </>
    )
}