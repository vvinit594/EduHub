// Interaction.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { HiBookOpen, HiDocumentText, HiUsers, HiArrowLeft } from 'react-icons/hi';

export default function Interaction() {
  const { collegeName } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-purple-800 mb-6 hover:underline"
        >
          <HiArrowLeft className="h-5 w-5" />
          Back to Groups
        </button>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">{decodeURIComponent(collegeName)}</h1>
        <p className="text-gray-600 mb-8">Connect with your college peers</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Study Notes Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <HiBookOpen className="h-6 w-6 text-purple-800" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Study Notes</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Access and share study materials, lecture notes, and resources with your peers.
              </p>
              <button
                onClick={() => navigate(`/study-notes/${collegeName}`)}
                className="w-full bg-purple-800 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-900 transition-colors"
              >
                Explore Notes
              </button>
            </div>
          </div>

          {/* PYQs Bank Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <HiDocumentText className="h-6 w-6 text-blue-800" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">PYQs Bank</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Previous year question papers and solutions shared by seniors and faculty.
              </p>
              <button
                onClick={() => navigate(`/pyqs-bank/${collegeName}`)}
                className="w-full bg-blue-800 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-900 transition-colors"
              >
                View PYQs
              </button>
            </div>
          </div>

          {/* Chat with Peers Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <HiUsers className="h-6 w-6 text-green-800" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Chat with Peers</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Connect with classmates, ask questions, and discuss topics in real-time.
              </p>
              <button
                onClick={() => navigate(`/chat/${collegeName}`)}
                className="w-full bg-green-800 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-900 transition-colors"
              >
                Join Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}