import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroSlider from "../components/HeroSlider/HeroSlider";
import Blogs from "../components/Sections/Blogs/Blogs";
import FAQs from "../components/Sections/FAQs/FAQs";
import DownloadApp from "../components/Sections/DownloadApp/DownloadApp";
import Footer from "../components/Footer/Footer";
import heroImg from "../assets/eventhome.png";
import eventIcon from "../assets/event.png";
import venueIcon from "../assets/venue.png";
import ticketIcon from "../assets/ticket.png";
import workshopIcon from "../assets/workshop.png";
import serviceIcon from "../assets/service.png";
import eventLogo from "../assets/eventlogo.png";
import searchIcon from "../assets/down-arr.png";
import calendarIcon from "../assets/event.png";

const quickLinks = [
  { label: "Events", icon: eventIcon },
  { label: "Venues", icon: venueIcon },
  { label: "Tickets", icon: ticketIcon, highlight: true },
  { label: "Workshops", icon: workshopIcon },
  { label: "Services", icon: serviceIcon },
];

const Home = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const navigate = useNavigate();

  // Fetch states on mount
  useEffect(() => {
    fetch("https://eventdata.onrender.com/states")
      .then((res) => res.json())
      .then((data) => setStates(data.states || []));
  }, []);

  // Fetch cities when state changes
  useEffect(() => {
    if (selectedState) {
      fetch(`https://eventdata.onrender.com/cities/${selectedState}`)
        .then((res) => res.json())
        .then((data) => setCities(data.cities || []));
    } else {
      setCities([]);
      setSelectedCity("");
    }
  }, [selectedState]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedState && selectedCity) {
      navigate(`/search?state=${encodeURIComponent(selectedState)}&city=${encodeURIComponent(selectedCity)}`);
    }
  };

  return (
    <div>
      {/* Hero Section with Search */}
      <section style={{ background: '#f8fbff', padding: '2rem 0 0 0', marginBottom: '2rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
          {/* Left: Text */}
          <div style={{ flex: 1, minWidth: 320 }}>
            <h2 style={{ fontWeight: 400, color: '#222', marginBottom: 0 }}>Skip the hassle! Track Online</h2>
            <h1 style={{ fontWeight: 700, fontSize: 48, margin: '8px 0', color: '#222' }}>
              Event <span style={{ color: '#29a6f6' }}>Tracker</span>
            </h1>
            <p style={{ color: '#555', fontSize: 18, marginBottom: 24 }}>
              Connect instantly with our platform to manage and track your events efficiently.
            </p>
            <button style={{ background: '#29a6f6', color: '#fff', border: 'none', borderRadius: 6, padding: '0.6rem 1.5rem', fontWeight: 600, fontSize: 16, marginBottom: 24 }}>
              Find Events
            </button>
            {/* Search Card */}
            <div style={{ background: '#fff', borderRadius: 24, boxShadow: '0 8px 32px rgba(41,166,246,0.10)', padding: '2rem', maxWidth: 700, margin: '0 auto', position: 'relative' }}>
              <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                <div id="state" style={{ flex: 1, minWidth: 120 }}>
                  <input
                    type="text"
                    placeholder="State"
                    value={selectedState}
                    onChange={e => setSelectedState(e.target.value)}
                    list="states-list"
                    style={{ width: '100%', padding: '0.5rem', borderRadius: 12, border: '1px solid #ddd', fontSize: 16, background: '#f8fbff' }}
                    required
                  />
                  <datalist id="states-list">
                    {states.map(state => <option key={state} value={state} />)}
                  </datalist>
                </div>
                <div id="city" style={{ flex: 1, minWidth: 120 }}>
                  <input
                    type="text"
                    placeholder="City"
                    value={selectedCity}
                    onChange={e => setSelectedCity(e.target.value)}
                    list="cities-list"
                    style={{ width: '100%', padding: '0.5rem', borderRadius: 12, border: '1px solid #ddd', fontSize: 16, background: '#f8fbff' }}
                    required
                    disabled={!selectedState}
                  />
                  <datalist id="cities-list">
                    {cities.map(city => <option key={city} value={city} />)}
                  </datalist>
                </div>
                <button type="submit" id="searchBtn" style={{ background: '#29a6f6', color: '#fff', border: 'none', borderRadius: 12, padding: '0.7rem 2.2rem', fontWeight: 600, fontSize: 16, display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 2px 8px rgba(41,166,246,0.15)' }}>
                  Search
                </button>
              </form>
              {/* Quick Links */}
              <div style={{ marginTop: 32 }}>
                <div style={{ color: '#888', fontWeight: 500, marginBottom: 8 }}>You may be looking for</div>
                <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                  {quickLinks.map((link, idx) => (
                    <div key={link.label} style={{
                      background: link.highlight ? '#e6f4fd' : '#f8fbff',
                      border: link.highlight ? '2px solid #29a6f6' : '1px solid #eee',
                      borderRadius: 16,
                      padding: '1.2rem 2.5rem',
                      minWidth: 110,
                      textAlign: 'center',
                      color: link.highlight ? '#29a6f6' : '#222',
                      fontWeight: 600,
                      boxShadow: link.highlight ? '0 2px 8px rgba(41,166,246,0.08)' : 'none',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: 16
                    }}>
                      {link.icon && <img src={link.icon} alt={link.label} style={{ height: 28, marginBottom: 8, opacity: link.highlight ? 1 : 0.5, objectFit: 'contain' }} />}
                      <div>{link.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Right: Hero Image */}
          <div style={{ flex: 1, minWidth: 320, display: 'flex', justifyContent: 'center', alignItems: 'flex-end', position: 'relative', height: 400 }}>
            <img src={heroImg} alt="Event Hero" style={{ maxWidth: 350, width: '100%', borderRadius: 16, objectFit: 'contain', position: 'absolute', bottom: 0, right: 0 }} />
          </div>
        </div>
      </section>
      {/* Event Tracking Info Section */}
      <section style={{ background: '#eaf4fd', borderRadius: 16, maxWidth: 1200, margin: '0 auto 2rem auto', padding: '2rem 3rem', display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 200, display: 'flex', justifyContent: 'center' }}>
          <img src={eventLogo} alt="Event Logo" style={{ maxWidth: 220, width: '100%' }} />
        </div>
        <div style={{ flex: 2, minWidth: 280 }}>
          <div style={{ color: '#29a6f6', fontWeight: 700, fontSize: 14, marginBottom: 4 }}>CONNECTING PEOPLE THROUGH EVENTS!!</div>
          <h2 style={{ fontWeight: 700, fontSize: 32, margin: '0 0 12px 0' }}>
            Event <span style={{ color: '#29a6f6' }}>Tracking</span>
          </h2>
          <p style={{ color: '#444', fontSize: 16, marginBottom: 18 }}>
            Our goal is to deliver an exceptional event experience in a courteous, respectful, and engaging manner. We hope you will allow us to help you stay updated and connected through our platform.
          </p>
          <ul style={{ color: '#1976d2', fontWeight: 500, fontSize: 16, listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ marginBottom: 8 }}>🔹 Stay Updated About Events</li>
            <li style={{ marginBottom: 8 }}>🔹 Check Event Details Online</li>
            <li>🔹 Manage Your Bookings</li>
          </ul>
        </div>
      </section>
      {/* Event Carousel */}
      <HeroSlider />
      {/* News/Blogs Section */}
      <Blogs />
      {/* FAQs Section */}
      <FAQs />
      {/* Download App Section */}
      <DownloadApp />
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
