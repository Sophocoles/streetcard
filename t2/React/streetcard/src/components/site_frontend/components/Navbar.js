import { Link, useNavigate } from "react-router-dom";
import { React, useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from '../../django/auth/login/LoginActions';

const Navbar = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/t2/about");
  };

  useEffect(() => {
    function handleScroll() {
      setScrollPosition(window.pageYOffset);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (


    <nav className={`navbar ${scrollPosition > 50 ? "navbar--scroll" : ""}`} >
      <div className="navbar__logo">
        <Link className="links" to="/" style={{textDecoration: 'none'}}><h1>StreetCard</h1></Link>
      </div>

      <div className="navbar__links">
        <Link className="links" to="/t2/">Home</Link>
        <Link className="links" to="/t2/providers">Provider Directory</Link>
        <Link className="links" to="/t2/about">About</Link>
        <Link className="links" to="/t2/mission">Mission</Link>
        <Link className="links" to="/t2/newsletter">Newsletter</Link>
        <Link className="links" to="/t2/servDir">Service Directory</Link>
        <Link className="links" to="/t2/dash">Dashboard</Link>
        <Link className="links" to="/t2/stats">Statistics</Link>
        <Link className="links" to="/t2/help">How Can I Help?</Link>
        <Link className="links" to="/t2/contact">Contact</Link>
        <Link className="links" to="/t2/assist">Support</Link>

        {auth.user?.userData ? (
            <>
                <Link className="links" to="/t2/providerPatients"><span className="user-name">{auth.user.userData.first_name}</span></Link>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </>
            ) : (
            <Link className="links" to="/login">Login / Signup</Link>
            )}
      </div>
    </nav>
  );
};

export default Navbar;
