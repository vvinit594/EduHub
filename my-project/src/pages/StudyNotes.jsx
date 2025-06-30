import { useParams, useNavigate } from 'react-router-dom';
import { HiArrowLeft, HiPlus, HiDownload, HiTrash, HiLink } from 'react-icons/hi';
import { useState, useEffect } from 'react';

export default function StudyNotes() {
  const { collegeName } = useParams();
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({
    title: '',
    type: 'link',
    content: '',
    fileUrl: ''
  });

  // Load notes from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem(`studyNotes_${collegeName}`);
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, [collegeName]);

  // Save notes to localStorage when they change
  useEffect(() => {
    localStorage.setItem(`studyNotes_${collegeName}`, JSON.stringify(notes));
  }, [notes, collegeName]);

  const handleAddNote = (e) => {
    e.preventDefault();
    if ((newNote.type === 'link' && newNote.content) || 
        (newNote.type !== 'link' && newNote.fileUrl)) {
      const noteToAdd = {
        ...newNote,
        id: Date.now(),
        date: new Date().toLocaleDateString()
      };
      setNotes([...notes, noteToAdd]);
      setNewNote({
        title: '',
        type: 'link',
        content: '',
        fileUrl: ''
      });
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // In a real app, you would upload to a server here
    // For demo, we'll create a fake URL and store file metadata
    const fileUrl = URL.createObjectURL(file);
    setNewNote({
      ...newNote,
      fileUrl,
      content: file.name,
      type: file.type.includes('image') ? 'image' : 'pdf'
    });
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-purple-800 mb-6 hover:underline"
        >
          <HiArrowLeft className="h-5 w-5" />
          Back to {decodeURIComponent(collegeName)}
        </button>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Study Notes for {decodeURIComponent(collegeName)}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Add Note Section */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4">Add New Note</h2>
            
            <form onSubmit={handleAddNote} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={newNote.title}
                  onChange={(e) => setNewNote({...newNote, title: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Note title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={newNote.type}
                  onChange={(e) => setNewNote({...newNote, type: e.target.value, content: '', fileUrl: ''})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                >
                  <option value="link">Link</option>
                  <option value="pdf">PDF</option>
                  <option value="image">Image</option>
                </select>
              </div>

              {newNote.type === 'link' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                  <input
                    type="url"
                    value={newNote.content}
                    onChange={(e) => setNewNote({...newNote, content: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="https://example.com"
                    required
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload {newNote.type.toUpperCase()}
                  </label>
                  <input
                    type="file"
                    accept={newNote.type === 'pdf' ? '.pdf' : 'image/*'}
                    onChange={handleFileUpload}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required={!newNote.fileUrl}
                  />
                  {newNote.fileUrl && (
                    <p className="mt-2 text-sm text-gray-600">
                      File ready: {newNote.content}
                    </p>
                  )}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-purple-800 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-purple-900"
              >
                <HiPlus className="h-5 w-5" />
                Add Note
              </button>
            </form>
          </div>

          {/* Notes List Section */}
          <div className="lg:col-span-2 space-y-4">
            {notes.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-6 text-center text-gray-500">
                No study notes added yet
              </div>
            ) : (
              notes.map((note) => (
                <div key={note.id} className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{note.title || 'Untitled Note'}</h3>
                      <p className="text-sm text-gray-500 mb-2">{note.date}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <HiTrash className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="mt-3 flex items-center gap-3">
                    {note.type === 'link' ? (
                      <>
                        <HiLink className="h-5 w-5 text-blue-500" />
                        <a 
                          href={note.content} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline break-all"
                        >
                          {note.content}
                        </a>
                      </>
                    ) : (
                      <>
                        <div className="flex-1">
                          <p className="text-gray-700">{note.content}</p>
                          <p className="text-sm text-gray-500">{note.type.toUpperCase()} file</p>
                        </div>
                        <a 
                          href={note.fileUrl} 
                          download={note.content}
                          className="text-purple-600 hover:text-purple-800"
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