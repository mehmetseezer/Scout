import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import authorService from '../services/author.service';
import blogService from '../services/blog.service';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Admin = () => {
  const { auth } = useAuth();
  const [usernames, setUsernames] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [queue, setQueue] = useState({ count: 0, authors: [] });
  const [activeTab, setActiveTab] = useState('scrape');
  const [tags, setTags] = useState([]);

  // Fetch tags
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tagsData = await blogService.getTopTags();
        setTags(tagsData);
        console.log("tags : ")
        console.log(tags);
      } catch (err) {
        console.error('Error fetching tags:', err);
        setError('Failed to fetch tags. Please try again later.');
      }
    };
    fetchTags();
  }, []);

  // Fetch queue
  useEffect(() => {
    fetchQueue();
  }, []);

  const fetchQueue = async () => {
    try {
      const response = await authorService.get_queue();
      setQueue(response.data);
    } catch (err) {
      console.error('Failed to fetch queue:', err);
      setError('Failed to fetch the queue. Please try again later.');
    }
  };

  // Chart data
  const tagChartData = {
    labels: tags && Array.isArray(tags) ? tags.map(tag => tag.name) : [],
    datasets: [
      {
        label: 'Number of Posts',
        data: tags && Array.isArray(tags) ? tags.map(tag => tag.count) : [],
        backgroundColor: 'rgba(239, 68, 68, 0.7)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 1,
        borderRadius: 4,
        hoverBackgroundColor: 'rgba(239, 68, 68, 0.9)',
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Most Popular Tags',
        font: {
          size: 18
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    }
  };

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'graphs':
        return (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Tag Analytics</h3>
              <div className="h-96">
                <Bar data={tagChartData} options={chartOptions} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <h4 className="text-xl font-semibold text-gray-800 mb-4">Statistics</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Total Tags Tracked</span>
                    <span className="font-bold text-red-500">{tags.length}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Most Popular Tag</span>
                    <span className="font-bold text-red-500">
                      {tags[0]?.name || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <h4 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h4>
                <div className="space-y-4">
                  <button className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors duration-300">
                    Export Data
                  </button>
                  <button className="w-full border border-red-500 text-red-500 py-3 rounded-lg hover:bg-red-50 transition-colors duration-300">
                    Generate Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <section className="flex-grow py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full lg:w-64 bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-4">Admin Dashboard</h2>
              <ul className="space-y-3">
                {['scrape', 'database', 'graphs'].map((tab) => (
                  <li key={tab}>
                    <button
                      onClick={() => setActiveTab(tab)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === tab ? 'bg-red-500 text-white shadow-md' : 'text-gray-600 hover:bg-gray-50 hover:pl-6'}`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
              <div className="mb-8 text-center">
                <h2 className="text-4xl font-bold text-gray-900 mb-2">
                  Welcome back, {auth?.user?.username}!
                </h2>
                <p className="text-gray-500">Admin Dashboard - {new Date().toLocaleDateString()}</p>
              </div>

              {renderContent()}

              {/* Notifications */}
              {message && (
                <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg animate-fade-in">
                  {message}
                </div>
              )}
              {error && (
                <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg animate-fade-in">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Admin;
