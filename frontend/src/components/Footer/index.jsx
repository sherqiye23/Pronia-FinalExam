import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";


export default function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="first-footer">
          <div className="card-footer">
            <div className="image"><img src="https://htmldemo.net/pronia/pronia/assets/images/logo/dark.png" alt="." /></div>
            <p>Lorem ipsum dolor sit amet, consec adipisl elit, sed do eiusmod tempor
              incidio ut labore et dolore magna.</p>
            <div className="icons">
              <FaFacebookF />
              <FaTwitter />
              <FaInstagram />
              <FaLinkedinIn />
            </div>
          </div>
          <div className="card-footer">
            <div style={{ fontSize: "23px" }}>Useful Links</div>
            <div>About Pronia</div>
            <div>How to shop</div>
            <div>FAQ</div>
            <div>Contact us</div>
            <div>Log in</div>
          </div>
          <div className="card-footer">
            <div style={{ fontSize: "23px" }}>My Account</div>
            <div>About Pronia</div>
            <div>How to shop</div>
            <div>FAQ</div>
            <div>Contact us</div>
            <div>Log in</div>
          </div>
          <div className="card-footer">
            <div style={{ fontSize: "23px" }}>Our Service</div>
            <div>About Pronia</div>
            <div>How to shop</div>
            <div>FAQ</div>
            <div>Contact us</div>
            <div>Log in</div>
          </div>
        </div>
        <div className="line"></div>
        <div className="second-footer">
          © 2021 Pronia Made With ❤ By HasThemes
        </div>
      </div>
    </div>
  )
}

