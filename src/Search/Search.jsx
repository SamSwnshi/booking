import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import eventIcon from "../assets/event.png";
import promoImg from "../assets/eventoffer2.png";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

// Hardcoded state-city mapping
const stateCityMap = {
  Texas: ["Houston", "Dallas", "Austin", "San Antonio"],
  California: ["Los Angeles", "San Francisco", "San Diego", "Sacramento"],
  "New York": ["New York City", "Buffalo", "Rochester", "Albany"],
  Florida: ["Miami", "Orlando", "Tampa", "Jacksonville"],
};
const hardcodedStates = [
  "California", "Texas", "Florida", "New York", "Illinois", "Pennsylvania", "Ohio", "Georgia",
  "North Carolina", "Michigan", "Nevada", "Arizona", "Washington", "Oregon", "Colorado",
  "Virginia", "Massachusetts", "Indiana", "Tennessee", "Missouri"
];

const Search = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openBooking, setOpenBooking] = useState(null); // event id
  const [selectedDate, setSelectedDate] = useState({}); // event id -> date
  const [selectedSlot, setSelectedSlot] = useState({}); // event id -> slot
  const [confirmation, setConfirmation] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // Update city options when state changes
  useEffect(() => {
    setCity(""); // Reset city when state changes
  }, [state]);

  // Fetch events
  useEffect(() => {
    if (state && city) {
      const url = `https://eventdata.onrender.com/events?state=${encodeURIComponent(state)}&city=${encodeURIComponent(city)}`;
      console.log("Fetching events from:", url);
      setLoading(true);
      setError("");
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched events:", data);
          // Map API data to expected UI format
          const events = Array.isArray(data)
            ? data.map((e, idx) => ({
                id: idx + 1, // fallback id
                name: e.eventName || e.name,
                city: e.city,
                state: e.state,
                venue: e.address || e.venue,
                rating: e.rating,
              }))
            : [];
          setEvents(events);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching events:", err);
          setError("Failed to fetch events.");
          setLoading(false);
        });
    }
  }, [state, city]);

  // Booking calendar helpers
  const getNext7Days = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      days.push(d);
    }
    return days;
  };
  const timeSlots = [
    { label: "Morning", slots: ["11:30 AM"] },
    { label: "Afternoon", slots: ["12:00 PM", "12:30 PM", "01:30 PM", "02:00 PM", "02:30 PM"] },
    { label: "Evening", slots: ["05:00 PM", "05:30 PM", "07:00 PM", "07:30 PM"] },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (state && city) {
      navigate(`/search?state=${encodeURIComponent(state)}&city=${encodeURIComponent(city)}`);
    }
  };

  const handleBook = (eventId) => {
    if (!selectedSlot[eventId]) return;
    // Save booking to localStorage
    const event = events.find(e => e.id === eventId);
    const booking = {
      eventId: event.id,
      eventName: event.name,
      city: event.city,
      state: event.state,
      venue: event.venue,
      rating: event.rating,
      date: selectedDate[eventId],
      slot: selectedSlot[eventId],
    };
    const prev = JSON.parse(localStorage.getItem("bookings") || "[]");
    localStorage.setItem("bookings", JSON.stringify([...prev, booking]));
    setConfirmation(`Booking confirmed for ${event.name} on ${selectedDate[eventId]} (${selectedSlot[eventId]})!`);
    setOpenBooking(null);
    navigate("/my-bookings"); // Redirect after booking
  };

  return (
    <div style={{ background: '#f8fbff', minHeight: '100vh', paddingBottom: 40 }}>
      {/* Search Bar Card */}
      <div style={{ maxWidth: 1100, margin: '0 auto', marginTop: 32, marginBottom: 32, display: 'flex', gap: 32, alignItems: 'flex-start' }}>
        <div style={{ flex: 3 }}>
          <form onSubmit={handleSearch} style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px rgba(41,166,246,0.08)', padding: '1.5rem 2rem', display: 'flex', gap: 16, alignItems: 'center' }}>
            <select
              value={state}
              onChange={e => setState(e.target.value)}
              style={{ flex: 1, padding: '0.7rem', borderRadius: 10, border: '1px solid #ddd', fontSize: 16, background: '#f8fbff' }}
              required
            >
              <option value="">Select State</option>
              {hardcodedStates.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select
              value={city}
              onChange={e => setCity(e.target.value)}
              style={{ flex: 1, padding: '0.7rem', borderRadius: 10, border: '1px solid #ddd', fontSize: 16, background: '#f8fbff' }}
              required
              disabled={!state || !stateCityMap[state]}
            >
              <option value="">Select City</option>
              {state && stateCityMap[state] && stateCityMap[state].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {state && !stateCityMap[state] && (
              <div style={{ color: 'red', marginTop: 8 }}>No cities available for this state.</div>
            )}
            <button type="submit" style={{ background: '#29a6f6', color: '#fff', border: 'none', borderRadius: 10, padding: '0.7rem 2.2rem', fontWeight: 600, fontSize: 16 }}>Search</button>
          </form>
        </div>
        {/* Promo Image */}
        <div style={{ flex: 1, minWidth: 180, display: 'flex', justifyContent: 'center' }}>
          <img src={promoImg} alt="Promo" style={{ width: 180, borderRadius: 12 }} />
        </div>
      </div>
      {/* Results Heading */}
      <div style={{ maxWidth: 900, margin: '0 auto 16px auto' }}>
        <h1 style={{ fontWeight: 700, fontSize: 22, margin: 0 }}>{events.length} events available in {city}</h1>
        <div style={{ color: '#888', fontSize: 15, marginBottom: 16 }}>Book tickets with minimum wait-time & verified event details</div>
        {confirmation && <div style={{ color: 'green', fontWeight: 600, marginBottom: 12 }}>{confirmation}</div>}
      </div>
      {/* Event Cards */}
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {loading ? (
          <p>Loading events...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : events.length === 0 ? (
          <p>No events found for this location.</p>
        ) : (
          events.map(event => (
            <div key={event.id} style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px rgba(41,166,246,0.08)', marginBottom: 24, padding: '1.5rem 2rem', display: 'flex', gap: 24 }}>
              {/* Event Icon */}
              <div style={{ flex: '0 0 60px', display: 'flex', alignItems: 'flex-start' }}>
                <img src={eventIcon} alt="Event" style={{ width: 60, height: 60, borderRadius: 12, background: '#eaf4fd', padding: 8 }} />
              </div>
              {/* Event Details */}
              <div style={{ flex: 1 }}>
                <h3 style={{ color: '#29a6f6', fontWeight: 700, fontSize: 20, margin: 0, textDecoration: 'underline', cursor: 'pointer' }}>{event.name}</h3>
                <div style={{ color: '#444', fontSize: 15, margin: '4px 0' }}>{event.city}, {event.state}</div>
                <div style={{ color: '#888', fontSize: 14, marginBottom: 6 }}>{event.venue}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                  <span style={{ background: '#eafbe7', color: '#1dbf73', fontWeight: 700, borderRadius: 6, padding: '2px 10px', fontSize: 14 }}>FREE</span>
                  <span style={{ background: '#eafbe7', color: '#1dbf73', fontWeight: 700, borderRadius: 6, padding: '2px 10px', fontSize: 14 }}>Available Today</span>
                  <span style={{ background: '#eafbe7', color: '#1dbf73', fontWeight: 700, borderRadius: 6, padding: '2px 10px', fontSize: 14 }}>4.5</span>
                </div>
                {/* Booking Calendar */}
                {openBooking === event.id && (
                  <div style={{ background: '#f8fbff', borderRadius: 12, margin: '16px 0', padding: 16 }}>
                    <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
                      {getNext7Days().map((d, idx) => (
                        <button
                          key={d.toISOString()}
                          type="button"
                          style={{
                            background: (selectedDate[event.id] || getNext7Days()[0].toISOString().split('T')[0]) === d.toISOString().split('T')[0] ? "#29a6f6" : "#fff",
                            color: (selectedDate[event.id] || getNext7Days()[0].toISOString().split('T')[0]) === d.toISOString().split('T')[0] ? "#fff" : "#222",
                            border: '1px solid #29a6f6',
                            borderRadius: 8,
                            padding: '0.4rem 1.1rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                          }}
                          onClick={() => setSelectedDate(s => ({ ...s, [event.id]: d.toISOString().split('T')[0] }))}
                        >
                          {idx === 0 ? "Today" : d.toLocaleDateString()}
                        </button>
                      ))}
                    </div>
                    {timeSlots.map(ts => (
                      <div key={ts.label} style={{ marginBottom: 8 }}>
                        <div style={{ fontWeight: 600, color: '#888', marginBottom: 4 }}>{ts.label}</div>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                          {ts.slots.map(slot => (
                            <button
                              key={slot}
                              type="button"
                              style={{
                                background: selectedSlot[event.id] === slot ? "#29a6f6" : "#fff",
                                color: selectedSlot[event.id] === slot ? "#fff" : "#222",
                                border: '1px solid #29a6f6',
                                borderRadius: 8,
                                padding: '0.4rem 1.1rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                              }}
                              onClick={() => setSelectedSlot(s => ({ ...s, [event.id]: slot }))}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                    <button
                      style={{ background: '#29a6f6', color: '#fff', border: 'none', borderRadius: 10, padding: '0.7rem 2.2rem', fontWeight: 600, fontSize: 16, marginTop: 12 }}
                      onClick={() => handleBook(event.id)}
                      disabled={!selectedSlot[event.id]}
                    >
                      Confirm Booking
                    </button>
                  </div>
                )}
                <button
                  style={{ background: openBooking === event.id ? '#eee' : '#29a6f6', color: openBooking === event.id ? '#222' : '#fff', border: 'none', borderRadius: 10, padding: '0.7rem 2.2rem', fontWeight: 600, fontSize: 16, marginTop: 8 }}
                  onClick={() => setOpenBooking(openBooking === event.id ? null : event.id)}
                >
                  {openBooking === event.id ? 'Hide Booking Calendar' : 'Book FREE Event'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Search;
