import { useParams, useNavigate } from 'react-router-dom';
import { 
  HiArrowLeft, 
  HiPaperAirplane, 
  HiUser, 
  HiDotsVertical,
  HiPhotograph,
  HiOutlineEmojiHappy
} from 'react-icons/hi';
import { useState, useEffect, useRef } from 'react';
import { auth, db, storage } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { 
  addDoc, 
  collection, 
  serverTimestamp, 
  query, 
  orderBy, 
  onSnapshot,
  doc,
  setDoc
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export default function ChatPage() {
  const { collegeName } = useParams();
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Sign in with Google
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  // Create college document if it doesn't exist
  useEffect(() => {
    if (user && collegeName) {
      const collegeRef = doc(db, 'colleges', collegeName);
      setDoc(collegeRef, { 
        name: collegeName,
        createdAt: serverTimestamp() 
      }, { merge: true });
    }
  }, [user, collegeName]);

  // Fetch messages in real-time
  useEffect(() => {
    if (!collegeName) return;

    const q = query(
      collection(db, `colleges/${collegeName}/messages`),
      orderBy('timestamp', 'asc')
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Convert Firestore timestamp to JS Date object
        timestamp: doc.data().timestamp?.toDate()
      }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [collegeName]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || !user || !collegeName) return;

    try {
      await addDoc(collection(db, `colleges/${collegeName}/messages`), {
        text: message,
        sender: user.displayName || user.email?.split('@')[0] || 'Anonymous',
        senderId: user.uid,
        timestamp: serverTimestamp(),
        photoURL: user.photoURL,
        type: 'text'
      });
      setMessage('');
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !user || !collegeName) return;

    try {
      setUploading(true);
      // Create storage reference
      const storageRef = ref(storage, `chats/${collegeName}/${file.name}_${Date.now()}`);
      
      // Upload file
      await uploadBytes(storageRef, file);
      
      // Get download URL
      const url = await getDownloadURL(storageRef);
      
      // Send as message
      await addDoc(collection(db, `colleges/${collegeName}/messages`), {
        type: 'image',
        content: url,
        sender: user.displayName || user.email?.split('@')[0] || 'Anonymous',
        senderId: user.uid,
        timestamp: serverTimestamp(),
        photoURL: user.photoURL,
        fileName: file.name,
        fileType: file.type
      });
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-800 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading chat...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-xl shadow-md p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Sign In Required</h2>
          <p className="text-gray-600 mb-6">
            Please sign in to participate in the {decodeURIComponent(collegeName)} chat.
          </p>
          <button
            onClick={signInWithGoogle}
            className="bg-purple-800 text-white py-2 px-6 rounded-lg font-medium hover:bg-purple-900 flex items-center justify-center gap-2 mx-auto"
          >
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" 
              alt="Google logo" 
              className="h-5 w-5"
            />
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Chat Header */}
      <div className="bg-purple-800 text-white p-4 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 hover:bg-purple-700 p-2 rounded-full"
        >
          <HiArrowLeft className="h-5 w-5" />
        </button>
        <div className="text-center">
          <h1 className="font-semibold text-lg">{decodeURIComponent(collegeName)}</h1>
          <p className="text-xs opacity-80">
            {messages.length > 0 ? `${messages.length} messages` : 'No messages yet'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {user.photoURL ? (
            <img 
              src={user.photoURL} 
              alt={user.displayName} 
              className="h-8 w-8 rounded-full"
            />
          ) : (
            <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
              <HiUser className="h-5 w-5 text-gray-600" />
            </div>
          )}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.senderId === user.uid ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs md:max-w-md rounded-lg p-3 ${msg.senderId === user.uid ? 'bg-purple-600 text-white' : 'bg-white border border-gray-200'}`}
            >
              {msg.senderId !== user.uid && (
                <div className="flex items-center gap-2 mb-1">
                  {msg.photoURL ? (
                    <img 
                      src={msg.photoURL} 
                      alt={msg.sender} 
                      className="h-6 w-6 rounded-full"
                    />
                  ) : (
                    <div className="h-6 w-6 rounded-full bg-gray-300 flex items-center justify-center">
                      <HiUser className="h-4 w-4 text-gray-600" />
                    </div>
                  )}
                  <span className="font-semibold text-sm">{msg.sender}</span>
                </div>
              )}
              
              {msg.type === 'image' ? (
                <div className="mt-2">
                  <img 
                    src={msg.content} 
                    alt={msg.fileName || 'Chat image'} 
                    className="max-w-full rounded-lg border border-gray-200"
                  />
                  <p className="text-xs mt-1 text-gray-500">{msg.fileName}</p>
                </div>
              ) : (
                <p className="break-words">{msg.text}</p>
              )}
              
              <p className={`text-xs mt-1 text-right ${msg.senderId === user.uid ? 'text-purple-200' : 'text-gray-500'}`}>
                {msg.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={sendMessage} className="bg-white border-t border-gray-200 p-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="p-2 text-gray-500 hover:text-purple-800"
            disabled={uploading}
          >
            {uploading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-purple-800"></div>
            ) : (
              <HiPhotograph className="h-5 w-5" />
            )}
          </button>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
            disabled={uploading}
          />
          
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-purple-800"
          >
            <HiOutlineEmojiHappy className="h-5 w-5" />
          </button>
          
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
            disabled={!user || uploading}
          />
          
          <button
            type="submit"
            disabled={!message.trim() || !user || uploading}
            className="bg-purple-800 text-white p-2 rounded-full hover:bg-purple-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <HiPaperAirplane className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
}