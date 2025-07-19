import React from "react";
import blogImg from "../../../assets/eventblog.jpg";

const blogData = [
  {
    date: "March 31, 2022",
    title: "5 Strategies to Maximize Your Event Attendance",
    author: "John Doe",
    img: blogImg,
  },
  {
    date: "March 31, 2022",
    title: "5 Strategies to Maximize Your Event Attendance",
    author: "John Doe",
    img: blogImg,
  },
  {
    date: "March 31, 2022",
    title: "5 Strategies to Maximize Your Event Attendance",
    author: "John Doe",
    img: blogImg,
  },
];

const Blogs = () => (
  <section style={{ margin: '2rem 0' }}>
    <div style={{ color: '#29a6f6', fontWeight: 700, fontSize: 14, marginBottom: 4, textAlign: 'center' }}>Blog & News</div>
    <h2 style={{ textAlign: 'center', fontWeight: 700, fontSize: 32, margin: '0 0 32px 0' }}>Read Our Latest News</h2>
    <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
      {blogData.map((blog, idx) => (
        <div key={idx} style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px rgba(41,166,246,0.08)', width: 320, padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <img src={blog.img} alt={blog.title} style={{ width: '100%', height: 180, objectFit: 'cover' }} />
          <div style={{ padding: '1rem' }}>
            <div style={{ color: '#888', fontSize: 14, marginBottom: 4 }}>Events | {blog.date}</div>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8, color: '#222' }}>{blog.title}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <img src={blog.img} alt="author" style={{ width: 28, height: 28, borderRadius: '50%' }} />
              <span style={{ color: '#1976d2', fontWeight: 500 }}>{blog.author}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Blogs;
