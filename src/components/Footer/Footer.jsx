import React from "react";
import logo from "../../assets/eventlogo.png";
import fb from "../../assets/fb.png";
import twitter from "../../assets/twitter.png";
import yt from "../../assets/yt.png";
import pinterest from "../../assets/pinterest.png";

const links = [
  ["About Us", "Pricing", "Gallery", "Contact Us", "Privacy Policy"],
  ["Event Management", "Real-time Tracking", "Customizable Features", "Support", "Security"],
  ["About Us", "Pricing", "Gallery", "Contact Us", "Privacy Policy"],
];

const Footer = () => (
  <footer style={{ background: '#eaf4fd', padding: '3rem 0 1rem 0', marginTop: '2rem' }}>
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'flex-start', justifyContent: 'space-between' }}>
      {/* Logo and Social */}
      <div style={{ flex: 1, minWidth: 220 }}>
        <img src={logo} alt="Event Logo" style={{ height: 48, marginBottom: 16 }} />
        <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
          <a href="#"><img src={fb} alt="Facebook" style={{ height: 28 }} /></a>
          <a href="#"><img src={twitter} alt="Twitter" style={{ height: 28 }} /></a>
          <a href="#"><img src={yt} alt="YouTube" style={{ height: 28 }} /></a>
          <a href="#"><img src={pinterest} alt="Pinterest" style={{ height: 28 }} /></a>
        </div>
        <div style={{ color: '#888', fontSize: 14, marginBottom: 8 }}>
          Copyright &copy;{new Date().getFullYear()} EventTracker.com. All Rights Reserved
        </div>
      </div>
      {/* Links Columns */}
      <div style={{ flex: 3, display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
        {links.map((col, idx) => (
          <ul key={idx} style={{ listStyle: 'none', padding: 0, margin: 0, minWidth: 160 }}>
            {col.map((link, i) => (
              <li key={i} style={{ marginBottom: 10 }}><a href="#" style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 500 }}>{link}</a></li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
