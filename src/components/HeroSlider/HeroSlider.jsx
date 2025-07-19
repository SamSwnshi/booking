import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import event1 from "../../assets/eventoffer1.png";
import event2 from "../../assets/eventoffer2.png";
import event3 from "../../assets/eventblog.jpg";

const events = [
  { img: event1, title: "Electro Music Festival" },
  { img: event2, title: "World Music Day" },
  { img: event3, title: "Music Blog Event" },
];

const HeroSlider = () => (
  <section style={{ margin: '2rem 0' }}>
    <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Featured Events</h2>
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={30}
        slidesPerView={3}
        style={{ padding: '2rem 0' }}
        breakpoints={{
          0: { slidesPerView: 1 },
          600: { slidesPerView: 2 },
          900: { slidesPerView: 3 },
        }}
      >
        {events.map((event, idx) => (
          <SwiperSlide key={idx}>
            <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(41,166,246,0.08)', padding: 16, textAlign: 'center' }}>
              <img src={event.img} alt={event.title} style={{ width: '100%', borderRadius: 8, marginBottom: 12, maxHeight: 320, objectFit: 'cover' }} />
              <div style={{ fontWeight: 600, fontSize: 18 }}>{event.title}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </section>
);

export default HeroSlider;
