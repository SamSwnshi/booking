import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/eventlogo.png";

const NavBar = () => (
  <>
    {/* Top info bar */}
    <div style={{ background: '#29a6f6', color: '#fff', fontSize: 12, textAlign: 'center', padding: '4px 0' }}>
      Stay updated with the latest events and maximize your experience with our platform.
    </div>
    <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 2rem', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
      {/* Logo */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        <img src={logo} alt="Event Logo" style={{ height: 36, marginRight: 8 }} />
      </Link>
      {/* Center links */}
      <div style={{ display: 'flex', gap: '2rem', flex: 1, justifyContent: 'center' }}>
        <Link to="/search" style={{ color: '#222', textDecoration: 'none', fontWeight: 500 }}>Find Events</Link>
        <a href="#" style={{ color: '#222', textDecoration: 'none', fontWeight: 500 }}>Venues</a>
        <a href="#" style={{ color: '#222', textDecoration: 'none', fontWeight: 500 }}>Tickets</a>
        <a href="#" style={{ color: '#222', textDecoration: 'none', fontWeight: 500 }}>Workshops</a>
        <a href="#" style={{ color: '#222', textDecoration: 'none', fontWeight: 500 }}>Event Management Software</a>
        <a href="#" style={{ color: '#222', textDecoration: 'none', fontWeight: 500 }}>Services</a>
      </div>
      {/* My Bookings button */}
      <Link to="/my-bookings">
        <button style={{ background: '#29a6f6', color: '#fff', border: 'none', borderRadius: 6, padding: '0.5rem 1.2rem', fontWeight: 600, cursor: 'pointer' }}>
          My Bookings
        </button>
      </Link>
    </nav>
  </>
);

export default NavBar;
