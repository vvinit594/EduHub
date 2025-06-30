import { useState, useEffect } from 'react';
import { HiAcademicCap, HiPlus, HiTrash } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

export default function CollegeGroups() {
  const [colleges, setColleges] = useState(() => {
    const savedColleges = localStorage.getItem('colleges');
    return savedColleges ? JSON.parse(savedColleges) : [
      'IIT Bombay',
      'VJTI',
      'SPIT',
      'Thakur College of Engineering',
      'Shree L.R Tiwari College of Engineering'
    ];
  });
  
  const [joinedGroups, setJoinedGroups] = useState(() => {
    const savedGroups = localStorage.getItem('joinedGroups');
    return savedGroups ? JSON.parse(savedGroups) : [];
  });

  const [newCollege, setNewCollege] = useState('');
  const [selectedCollege, setSelectedCollege] = useState(null);
  const navigate = useNavigate();

  // Save to localStorage whenever colleges or joinedGroups change
  useEffect(() => {
    localStorage.setItem('colleges', JSON.stringify(colleges));
    localStorage.setItem('joinedGroups', JSON.stringify(joinedGroups));
  }, [colleges, joinedGroups]);

  const handleAddCollege = () => {
    if (newCollege.trim() && !colleges.includes(newCollege)) {
      setColleges([...colleges, newCollege]);
      setNewCollege('');
    }
  };

  const handleDeleteCollege = () => {
    if (selectedCollege !== null) {
      const collegeToDelete = colleges[selectedCollege];
      const updatedColleges = colleges.filter((_, index) => index !== selectedCollege);
      setColleges(updatedColleges);
      
      // Also remove from joined groups if it was joined
      if (joinedGroups.includes(collegeToDelete)) {
        setJoinedGroups(joinedGroups.filter(item => item !== collegeToDelete));
      }
      
      setSelectedCollege(null);
    }
  };

  const handleJoinGroup = (college) => {
    if (!joinedGroups.includes(college)) {
      setJoinedGroups([...joinedGroups, college]);
    }
  };

  const handleLeaveGroup = (college) => {
    setJoinedGroups(joinedGroups.filter(item => item !== college));
  };

  const handleGroupClick = (college) => {
    navigate(`/interaction/${encodeURIComponent(college)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">College Groups</h1>
          <div className="flex gap-2">
            <input
              type="text"
              value={newCollege}
              onChange={(e) => setNewCollege(e.target.value)}
              placeholder="Enter college name"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
            <button
              onClick={handleAddCollege}
              className="bg-purple-800 text-white px-4 py-2 rounded-lg flex items-center gap-1 hover:bg-purple-900 transition-colors"
            >
              <HiPlus className="h-5 w-5" />
              Add
            </button>
            <button
              onClick={handleDeleteCollege}
              disabled={selectedCollege === null}
              className={`px-4 py-2 rounded-lg flex items-center gap-1 transition-colors ${
                selectedCollege === null
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              <HiTrash className="h-5 w-5" />
              Delete
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {colleges.map((college, index) => (
            <div
              key={index}
              className={`p-4 bg-white rounded-lg shadow-sm border ${
                selectedCollege === index
                  ? 'border-purple-600 bg-purple-50'
                  : 'border-gray-200 hover:border-purple-400'
              } transition-all cursor-pointer`}
              onClick={() => setSelectedCollege(index)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-lg text-gray-800">{college}</h3>
                  <p className="text-gray-500 text-sm">
                    Active members: {Math.floor(Math.random() * 100) + 50}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleJoinGroup(college);
                  }}
                  disabled={joinedGroups.includes(college)}
                  className={`px-3 py-1 rounded-md text-sm ${
                    joinedGroups.includes(college)
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {joinedGroups.includes(college) ? 'Joined' : 'Join'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Joined Groups Sidebar */}
      <div className="w-80 bg-white border-l border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-800 pb-3 border-b border-gray-200 mb-4">
          Your Groups
        </h2>
        {joinedGroups.length === 0 ? (
          <p className="text-gray-500 italic">You haven't joined any groups yet</p>
        ) : (
          <div className="space-y-2">
            {joinedGroups.map((college, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-purple-50 cursor-pointer"
                onClick={() => handleGroupClick(college)}
              >
                <span className="font-medium">{college}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLeaveGroup(college);
                  }}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Leave
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}