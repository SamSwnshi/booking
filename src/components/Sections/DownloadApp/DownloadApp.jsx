import React from "react";
import phoneImg from "../../../assets/eventdownload.png";

const DownloadApp = () => (
  <section style={{ margin: '2rem 0', background: '#eaf4fd', borderRadius: 16, maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto', padding: '2rem 3rem' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
      {/* Left: Phone Image */}
      <div style={{ flex: 1, minWidth: 240, display: 'flex', justifyContent: 'center' }}>
        <img src={phoneImg} alt="Download App" style={{ maxWidth: 220, width: '100%' }} />
      </div>
      {/* Right: Download Info */}
      <div style={{ flex: 2, minWidth: 320 }}>
        <h2 style={{ fontWeight: 700, fontSize: 32, margin: '0 0 12px 0' }}>
          Download the <span style={{ color: '#29a6f6' }}>Event Tracker</span> App
        </h2>
        <p style={{ color: '#444', fontSize: 16, marginBottom: 18 }}>
          Get the link to download the app
        </p>
        <form style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          <input type="text" placeholder="+91 Enter phone number" style={{ flex: 1, padding: '0.7rem', borderRadius: 6, border: '1px solid #ddd', fontSize: 16 }} />
          <button type="button" style={{ background: '#29a6f6', color: '#fff', border: 'none', borderRadius: 6, padding: '0.7rem 1.5rem', fontWeight: 600, fontSize: 16 }}>
            Send SMS
          </button>
        </form>
        <div style={{ display: 'flex', gap: 16 }}>
          <button style={{ background: '#222', color: '#fff', border: 'none', borderRadius: 6, padding: '0.7rem 1.5rem', fontWeight: 600, fontSize: 16 }}>
            Google Play
          </button>
          <button style={{ background: '#222', color: '#fff', border: 'none', borderRadius: 6, padding: '0.7rem 1.5rem', fontWeight: 600, fontSize: 16 }}>
            App Store
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default DownloadApp;
