import React, { useState } from "react";
import faqImg from "../../../assets/eventfaq.jpg";

const faqData = [
  {
    question: "Why choose our event tracking platform?",
    answer: "Our platform offers a seamless experience to manage and track your events efficiently, with real-time updates and user-friendly tools.",
  },
  {
    question: "What makes us different from others?",
    answer: "We provide a unique combination of event management, booking, and tracking features, all in one place.",
  },
  {
    question: "How do we ensure data security?",
    answer: "We use industry-standard security practices to keep your data safe and private.",
  },
  {
    question: "How can I get support for my events?",
    answer: "Our support team is available 24/7 to help you with any event-related queries or issues.",
  },
];

const FAQs = () => {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <section style={{ margin: '2rem 0' }}>
      <div style={{ color: '#29a6f6', fontWeight: 700, fontSize: 14, marginBottom: 4, textAlign: 'center' }}>Get Your Answer</div>
      <h2 style={{ textAlign: 'center', fontWeight: 700, fontSize: 32, margin: '0 0 32px 0' }}>Frequently Asked Questions</h2>
      <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', justifyContent: 'center', flexWrap: 'wrap' }}>
        {/* Left: Image */}
        <div style={{ flex: 1, minWidth: 320, maxWidth: 480 }}>
          <img src={faqImg} alt="FAQ" style={{ width: '100%', borderRadius: 16 }} />
        </div>
        {/* Right: Accordion */}
        <div style={{ flex: 2, minWidth: 320, maxWidth: 600 }}>
          {faqData.map((faq, idx) => (
            <div key={idx} style={{ borderBottom: '1px solid #eee', marginBottom: 8 }}>
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  padding: '1rem 0',
                  fontWeight: 700,
                  fontSize: 18,
                  color: '#222',
                  cursor: 'pointer',
                  outline: 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                {faq.question}
                <span style={{ color: '#29a6f6', fontSize: 24 }}>{openIdx === idx ? '-' : '+'}</span>
              </button>
              {openIdx === idx && (
                <div style={{ padding: '0 0 1rem 0', color: '#444', fontSize: 16 }}>{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQs;
