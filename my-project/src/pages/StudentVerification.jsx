import { HiAcademicCap, HiUpload, HiDocumentText } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function StudentVerification() {
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    university: '',
    studentId: null
  });

  // Load saved data on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('studentVerificationData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    setFormData(prev => {
      const newData = {
        ...prev,
        [id]: files ? files[0] : value
      };
      // Save to localStorage on each change
      localStorage.setItem('studentVerificationData', JSON.stringify(newData));
      return newData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mark as verified in localStorage
    localStorage.setItem('isVerified', 'true');
    navigate('/college-groups');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col p-6">
      <header className="py-4">
        <div className="flex items-center gap-3">
          <HiAcademicCap className="h-9 w-9 text-purple-800" />
          <span className="text-2xl font-bold text-gray-800">MoodSync</span>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-purple-800 mb-2">
              Student Verification
            </h1>
            <p className="text-gray-600">
              Verify your student status to access all features
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="John Doe"
                  required
                />
              </div>

              {/* Other input fields with same pattern */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="john@college.edu"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="+1 (123) 456-7890"
                  required
                />
              </div>

              <div>
                <label htmlFor="college" className="block text-sm font-medium text-gray-700 mb-1">
                  College Name
                </label>
                <input
                  type="text"
                  id="college"
                  value={formData.college}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Your college name"
                  required
                />
              </div>

              <div>
                <label htmlFor="university" className="block text-sm font-medium text-gray-700 mb-1">
                  University Name
                </label>
                <input
                  type="text"
                  id="university"
                  value={formData.university}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Your university name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Student ID Proof
                </label>
                <label htmlFor="studentId" className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-colors">
                  <HiUpload className="h-10 w-10 text-purple-600 mb-3" />
                  <span className="text-gray-600 mb-2">
                    {formData.studentId ? formData.studentId.name : 'Upload PDF or image of your student ID'}
                  </span>
                  <HiDocumentText className="h-8 w-8 text-gray-400" />
                </label>
                <input
                  type="file"
                  id="studentId"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleChange}
                  required={!formData.studentId}
                />
                <p className="mt-2 text-sm text-gray-500">
                  Max file size: 5MB. Supported formats: PDF, JPG, PNG
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <button
                type="submit"
                className="w-full bg-purple-800 text-white py-3 px-4 rounded-lg font-semibold hover:bg-purple-900 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
              >
                Submit Verification
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}