// src/pages/Home.jsx
import { FaGraduationCap, FaFileAlt, FaQuestionCircle, FaRobot, FaCheckCircle } from 'react-icons/fa';
import { HiAcademicCap, HiUserGroup, HiOutlineLightningBolt } from 'react-icons/hi';
import { Link } from 'react-router-dom';


export default function Home() {
  const primaryColor = '#69247C';
  const primaryHover = '#5a1d6a';
  const primaryLight = '#f0e6f5';
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
     <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <HiAcademicCap className="h-8 w-8" style={{ color: '#69247C' }} />
              <span className="ml-2 text-xl font-bold text-gray-900">MoodSync</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                to="/login" 
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-800 transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="px-4 py-2 text-sm font-medium text-white rounded-md hover:bg-purple-900 transition-colors"
                style={{ backgroundColor: '#69247C' }}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Your College</span>
            <span className="block" style={{ color: primaryColor }}>Learning Community</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Connect with your college peers, share resources, and get your doubts solved in a verified academic community.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <a
                href="#"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white md:py-4 md:text-lg md:px-10 hover:bg-purple-800"
                style={{ backgroundColor: primaryColor }}
              >
                Get Started
              </a>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <a
                href="#"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md bg-white md:py-4 md:text-lg md:px-10 hover:bg-gray-50"
                style={{ color: primaryColor, borderColor: primaryColor }}
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base font-semibold tracking-wide uppercase" style={{ color: primaryColor }}>
              Features
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need for academic success
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {/* College Groups */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-center h-12 w-12 rounded-md" style={{ backgroundColor: primaryLight }}>
                  <HiUserGroup className="h-6 w-6" style={{ color: primaryColor }} />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">College Groups</h3>
                <p className="mt-2 text-base text-gray-500">
                  Verified groups exclusively for your college students to discuss and solve doubts.
                </p>
              </div>

              {/* Study Notes */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-center h-12 w-12 rounded-md" style={{ backgroundColor: primaryLight }}>
                  <FaFileAlt className="h-6 w-6" style={{ color: primaryColor }} />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Study Notes</h3>
                <p className="mt-2 text-base text-gray-500">
                  High-quality notes shared by peers and professors, organized by subjects.
                </p>
              </div>

              {/* PYQs */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-center h-12 w-12 rounded-md" style={{ backgroundColor: primaryLight }}>
                  <FaQuestionCircle className="h-6 w-6" style={{ color: primaryColor }} />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">PYQs Bank</h3>
                <p className="mt-2 text-base text-gray-500">
                  Comprehensive collection of previous year questions to help you prepare for exams.
                </p>
              </div>

              {/* AI Chatbot */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-center h-12 w-12 rounded-md" style={{ backgroundColor: primaryLight }}>
                  <FaRobot className="h-6 w-6" style={{ color: primaryColor }} />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">AI Doubt Solver</h3>
                <p className="mt-2 text-base text-gray-500">
                  Instant help with your academic questions from our intelligent chatbot assistant.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base font-semibold tracking-wide uppercase" style={{ color: primaryColor }}>
              How it works
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Get started in 3 simple steps
            </p>
          </div>

          <div className="mt-10">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full font-bold" style={{ backgroundColor: primaryLight, color: primaryColor }}>
                  1
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Sign Up</h3>
                <p className="mt-2 text-base text-gray-500">
                  Create your account using your college email or verify with your college ID.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full font-bold" style={{ backgroundColor: primaryLight, color: primaryColor }}>
                  2
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Join Your College Group</h3>
                <p className="mt-2 text-base text-gray-500">
                  Get access to your exclusive college community after verification.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full font-bold" style={{ backgroundColor: primaryLight, color: primaryColor }}>
                  3
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Start Learning</h3>
                <p className="mt-2 text-base text-gray-500">
                  Access resources, ask questions, and collaborate with peers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">EduHub</h3>
              <p className="mt-4 text-base text-gray-300">
                The academic community platform for college students.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Resources</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Notes</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">PYQs</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Groups</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-base text-gray-300 hover:text-white">About</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Privacy</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Terms</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Contact</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Help Center</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Status</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
            <p className="text-base text-gray-400">
              &copy; 2025 MoodSync. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}