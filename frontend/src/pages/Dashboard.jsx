import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const { user } = useAuth();
  const [media, setMedia] = useState([]);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/media`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setMedia(res.data);
      } catch (error) {
        console.error('Error fetching media:', error);
      }
    };
    fetchMedia();
  }, []);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Welcome, {user.username}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {media.map((item) => (
            <div key={item._id} className="bg-white p-4 rounded-lg shadow">
              {item.type === 'image' ? (
                <img src={item.url} alt={item.title} className="w-full h-48 object-cover rounded" />
              ) : (
                <video src={item.url} controls className="w-full h-48 object-cover rounded" />
              )}
              <h3 className="mt-2 font-bold">{item.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;