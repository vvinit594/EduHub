import { useParams, useNavigate } from 'react-router-dom';
import { HiArrowLeft, HiPlus, HiDownload, HiTrash, HiLink } from 'react-icons/hi';
import { useState, useEffect } from 'react';

export default function PYQsBank() {
  const { collegeName } = useParams();
  const navigate = useNavigate();
  const [pyqs, setPYQs] = useState([]);
  const [newPYQ, setNewPYQ] = useState({
    title: '',
    type: 'pdf',
    content: '',
    fileUrl: '',
    year: '',
    subject: ''
  });

  // Load PYQs from localStorage
  useEffect(() => {
    const savedPYQs = localStorage.getItem(`pyqsBank_${collegeName}`);
    if (savedPYQs) {
      setPYQs(JSON.parse(savedPYQs));
    }
  }, [collegeName]);

  // Save PYQs to localStorage when they change
  useEffect(() => {
    localStorage.setItem(`pyqsBank_${collegeName}`, JSON.stringify(pyqs));
  }, [pyqs, collegeName]);

  const handleAddPYQ = (e) => {
    e.preventDefault();
    if ((newPYQ.type === 'link' && newPYQ.content) || 
        (newPYQ.type !== 'link' && newPYQ.fileUrl)) {
      const pyqToAdd = {
        ...newPYQ,
        id: Date.now(),
        date: new Date().toLocaleDateString()
      };
      setPYQs([...pyqs, pyqToAdd]);
      setNewPYQ({
        title: '',
        type: 'pdf',
        content: '',
        fileUrl: '',
        year: '',
        subject: ''
      });
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileUrl = URL.createObjectURL(file);
    setNewPYQ({
      ...newPYQ,
      fileUrl,
      content: file.name,
      type: 'pdf'
    });
  };

  const handleDeletePYQ = (id) => {
    setPYQs(pyqs.filter(pyq => pyq.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-800 mb-6 hover:underline"
        >
          <HiArrowLeft className="h-5 w-5" />
          Back to {decodeURIComponent(collegeName)}
        </button>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Previous Year Questions for {decodeURIComponent(collegeName)}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Add PYQ Section */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4">Add New PYQ</h2>
            
            <form onSubmit={handleAddPYQ} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={newPYQ.title}
                  onChange={(e) => setNewPYQ({...newPYQ, title: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="PYQ title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  value={newPYQ.subject}
                  onChange={(e) => setNewPYQ({...newPYQ, subject: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Subject name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <input
                  type="text"
                  value={newPYQ.year}
                  onChange={(e) => setNewPYQ({...newPYQ, year: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Year"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={newPYQ.type}
                  onChange={(e) => setNewPYQ({...newPYQ, type: e.target.value, content: '', fileUrl: ''})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                >
                  <option value="pdf">PDF</option>
                  <option value="link">Link</option>
                </select>
              </div>

              {newPYQ.type === 'link' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                  <input
                    type="url"
                    value={newPYQ.content}
                    onChange={(e) => setNewPYQ({...newPYQ, content: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="https://example.com"
                    required
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload PDF
                  </label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required={!newPYQ.fileUrl}
                  />
                  {newPYQ.fileUrl && (
                    <p className="mt-2 text-sm text-gray-600">
                      File ready: {newPYQ.content}
                    </p>
                  )}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-800 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-900"
              >
                <HiPlus className="h-5 w-5" />
                Add PYQ
              </button>
            </form>
          </div>

          {/* PYQs List Section */}
          <div className="lg:col-span-2 space-y-4">
            {pyqs.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-6 text-center text-gray-500">
                No PYQs added yet
              </div>
            ) : (
              pyqs.map((pyq) => (
                <div key={pyq.id} className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{pyq.title || 'Untitled PYQ'}</h3>
                      <p className="text-sm text-gray-500 mb-1">{pyq.subject} - {pyq.year}</p>
                      <p className="text-sm text-gray-500">{pyq.date}</p>
                    </div>
                    <button
                      onClick={() => handleDeletePYQ(pyq.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <HiTrash className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="mt-3 flex items-center gap-3">
                    {pyq.type === 'link' ? (
                      <>
                        <HiLink className="h-5 w-5 text-blue-500" />
                        <a 
                          href={pyq.content} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline break-all"
                        >
                          {pyq.content}
                        </a>
                      </>
                    ) : (
                      <>
                        <div className="flex-1">
                          <p className="text-gray-700">{pyq.content}</p>
                          <p className="text-sm text-gray-500">PDF file</p>
                        </div>
                        <a 
                          href={pyq.fileUrl} 
                          download={pyq.content}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <HiDownload className="h-5 w-5" />
                        </a>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}