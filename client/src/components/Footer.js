import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faGithub,
  faDribbble,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

export default function FooterCom() {
  return (
    <footer className="container-fluid footerBorder border border-t-8 border-teal-500 py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <Link to="/" className="text-lg text-dark font-weight-bold">
              <h2 className="logo">CHRIS</h2>
              <h3 className="text-center">Blog</h3>
            </Link>
          </div>
          <div className="col-lg-6">
            <div className="row">
              <div className="col-lg-4">
                <h5 className="mb-3">About</h5>
                <ul className="list-unstyled">
                  <li>
                    <a
                      href="https://www.100jsprojects.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      100 JS Projects
                    </a>
                  </li>
                  <li>
                    <Link to="/about">Sahand's Blog</Link>
                  </li>
                </ul>
              </div>
              <div className="col-lg-4">
                <h5 className="mb-3">Follow us</h5>
                <ul className="list-unstyled">
                  <li>
                    <a
                      href="https://www.github.com/sahandghavidel"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Github
                    </a>
                  </li>
                  <li>
                    <Link to="#">Discord</Link>
                  </li>
                </ul>
              </div>
              <div className="col-lg-4">
                <h5 className="mb-3">Legal</h5>
                <ul className="list-unstyled">
                  <li>
                    <Link to="#">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to="#">Terms & Conditions</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="my-4" />
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <p className="text-muted mb-0">
              &copy; {new Date().getFullYear()} CHRIS Blog
            </p>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 text-right">
            <Link to="#" className="text-dark me-3">
              <FontAwesomeIcon icon={faFacebook} />
            </Link>
            <Link to="#" className="text-dark me-3">
              <FontAwesomeIcon icon={faInstagram} />
            </Link>
            <Link to="#" className="text-dark me-3">
              <FontAwesomeIcon icon={faTwitter} />
            </Link>
            <Link
              to="https://github.com/sahandghavidel"
              className="text-dark me-3"
            >
              <FontAwesomeIcon icon={faGithub} />
            </Link>
            <Link to="#" className="text-dark">
              <FontAwesomeIcon icon={faDribbble} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
