import React, { useEffect, useState } from "react";
import eventIcon from "../assets/event.png";
import promoImg from "../assets/eventoffer1.png";
import DownloadApp from "../components/Sections/DownloadApp/DownloadApp";
import Footer from "../components/Footer/Footer";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(stored);
  }, []);

  const filteredBookings = bookings.filter(b =>
    b.eventName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ background: '#f8fbff', minHeight: '100vh', paddingBottom: 40 }}>
      {/* Heading and Search Bar */}
      <div style={{ maxWidth: 1100, margin: '0 auto', marginTop: 32, marginBottom: 32, display: 'flex', gap: 32, alignItems: 'flex-start' }}>
        <div style={{ flex: 3 }}>
          <h1 style={{ color: '#29a6f6', fontWeight: 700, fontSize: 32, marginBottom: 24 }}>My Bookings</h1>
          <form onSubmit={e => e.preventDefault()} style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px rgba(41,166,246,0.08)', padding: '1rem 2rem', display: 'flex', gap: 16, alignItems: 'center', marginBottom: 24 }}>
            <input
              type="text"
              placeholder="Search By Event"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ flex: 1, padding: '0.7rem', borderRadius: 10, border: '1px solid #ddd', fontSize: 16, background: '#f8fbff' }}
            />
            <button type="submit" style={{ background: '#29a6f6', color: '#fff', border: 'none', borderRadius: 10, padding: '0.7rem 2.2rem', fontWeight: 600, fontSize: 16 }}>Search</button>
          </form>
          {/* Booking Cards */}
          {filteredBookings.length === 0 ? (
            <p>No bookings found.</p>
          ) : (
            filteredBookings.map((booking, idx) => (
              <div key={idx} style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px rgba(41,166,246,0.08)', marginBottom: 24, padding: '1.5rem 2rem', display: 'flex', gap: 24, alignItems: 'center' }}>
                {/* Event Icon */}
                <div style={{ flex: '0 0 60px', display: 'flex', alignItems: 'flex-start' }}>
                  <img src={eventIcon} alt="Event" style={{ width: 60, height: 60, borderRadius: 12, background: '#eaf4fd', padding: 8 }} />
                </div>
                {/* Booking Details */}
                <div style={{ flex: 1 }}>
                  <h3 style={{ color: '#29a6f6', fontWeight: 700, fontSize: 20, margin: 0, textDecoration: 'underline', cursor: 'pointer' }}>{booking.eventName}</h3>
                  <div style={{ color: '#444', fontSize: 15, margin: '4px 0' }}>{booking.city}, {booking.state}</div>
                  <div style={{ color: '#888', fontSize: 14, marginBottom: 6 }}>{booking.venue || booking.address}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <span style={{ background: '#eafbe7', color: '#1dbf73', fontWeight: 700, borderRadius: 6, padding: '2px 10px', fontSize: 14 }}>FREE</span>
                    <span style={{ background: '#eafbe7', color: '#1dbf73', fontWeight: 700, borderRadius: 6, padding: '2px 10px', fontSize: 14 }}>{booking.rating || '4.5'}</span>
                  </div>
                </div>
                {/* Time and Date */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                  <span style={{ background: '#f8fbff', color: '#29a6f6', borderRadius: 8, padding: '6px 16px', fontWeight: 600, fontSize: 15, border: '1px solid #29a6f6' }}>{booking.slot}</span>
                  <span style={{ background: '#f8fbff', color: '#29a6f6', borderRadius: 8, padding: '6px 16px', fontWeight: 600, fontSize: 15, border: '1px solid #29a6f6' }}>{booking.date}</span>
                </div>
              </div>
            ))
          )}
        </div>
        {/* Promo Image */}
        <div style={{ flex: 1, minWidth: 180, display: 'flex', justifyContent: 'center' }}>
          <img src={promoImg} alt="Promo" style={{ width: 180, borderRadius: 12 }} />
        </div>
      </div>
      {/* Download App and Footer */}
      <DownloadApp />
      <Footer />
    </div>
  );
};

export default MyBookings;
