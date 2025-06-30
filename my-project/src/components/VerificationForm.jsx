import { useState } from 'react';

export default function VerificationForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    university: '',
    studentId: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, studentId: e.target.files[0] }));
  };

  return (
    <form onSubmit={onSubmit} className="verification-form">
      <div className="input-group">
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="input-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="input-group">
        <label htmlFor="phone">Phone Number</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>

      <div className="input-group">
        <label htmlFor="college">College Name</label>
        <input
          type="text"
          id="college"
          name="college"
          value={formData.college}
          onChange={handleChange}
          required
        />
      </div>

      <div className="input-group">
        <label htmlFor="university">University Name</label>
        <input
          type="text"
          id="university"
          name="university"
          value={formData.university}
          onChange={handleChange}
          required
        />
      </div>

      <div className="input-group">
        <label htmlFor="studentId">Student ID Proof (PDF or Image)</label>
        <input
          type="file"
          id="studentId"
          name="studentId"
          onChange={handleFileChange}
          accept=".pdf,.jpg,.jpeg,.png"
          required
        />
        <p className="file-hint">Upload a clear photo/scan of your student ID card</p>
      </div>

      <button type="submit" className="verify-button">
        Submit Verification
      </button>
    </form>
  );
}