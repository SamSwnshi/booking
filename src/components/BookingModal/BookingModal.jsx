import React, { useState } from "react";

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

const timeSlots = ["Morning", "Afternoon", "Evening"];

const BookingModal = ({ event, onClose, onBooked }) => {
  const days = getNext7Days();
  const [selectedDate, setSelectedDate] = useState(days[0]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [error, setError] = useState("");

  const handleBook = () => {
    if (!selectedSlot) {
      setError("Please select a time slot.");
      return;
    }
    const booking = {
      eventId: event.id,
      eventName: event.name,
      date: selectedDate.toISOString().split("T")[0],
      slot: selectedSlot,
    };
    // Save to localStorage
    const prev = JSON.parse(localStorage.getItem("bookings") || "[]");
    localStorage.setItem("bookings", JSON.stringify([...prev, booking]));
    onBooked && onBooked(booking);
    onClose();
  };

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
      <div style={{ background: "#fff", padding: 24, borderRadius: 8, minWidth: 320, maxWidth: 400 }}>
        <h2>Book: {event.name}</h2>
        <div style={{ marginBottom: 16 }}>
          <p>Select a date:</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {days.map((d, idx) => (
              <button
                key={d.toISOString()}
                type="button"
                style={{
                  background: d.getTime() === selectedDate.getTime() ? "#1976d2" : "#e3f2fd",
                  color: d.getTime() === selectedDate.getTime() ? "#fff" : "#000",
                  border: "none",
                  borderRadius: 4,
                  padding: "0.5rem 1rem",
                  cursor: "pointer"
                }}
                onClick={() => setSelectedDate(d)}
              >
                <p style={{ margin: 0 }}>{idx === 0 ? "Today" : d.toLocaleDateString()}</p>
              </button>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <p>Select a time slot:</p>
          <div style={{ display: "flex", gap: 8 }}>
            {timeSlots.map((slot) => (
              <button
                key={slot}
                type="button"
                style={{
                  background: selectedSlot === slot ? "#1976d2" : "#e3f2fd",
                  color: selectedSlot === slot ? "#fff" : "#000",
                  border: "none",
                  borderRadius: 4,
                  padding: "0.5rem 1rem",
                  cursor: "pointer"
                }}
                onClick={() => setSelectedSlot(slot)}
              >
                <p style={{ margin: 0 }}>{slot}</p>
              </button>
            ))}
          </div>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button type="button" onClick={onClose}>Cancel</button>
          <button type="button" onClick={handleBook}>Confirm Booking</button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
