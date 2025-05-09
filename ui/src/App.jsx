import { useEffect, useState } from 'react';
import api from './api';
import Card from './components/Card';
import './index.css';

function App() {
  const [contributions, setContributions] = useState([]);

  const fetchContributions = async () => {
    try {
      const response = await api.get('/contributions');
      setContributions(response.data.contributions);
    } catch (error) {
      console.error('Error fetching contributions:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchContributions();
  }, []);

  // const handleSearch = (searchTerm) => {

  // const handleSearch = async (searchTerm) => {
  //   try {
  //     const response = await api.get(`/contributions?search=${searchTerm}`);
  //     setContributions(response.data);
  //   } catch (error) {
  //     console.error('Error fetching contributions:', error);
  //   }
  // }
  // const handleFilter = async (filter) => {
  //   try {
  //     const response = await api.get(`/contributions?filter=${filter}`);
  //     setContributions(response.data);
  //   } catch (error) {
  //     console.error('Error fetching contributions:', error);
  //   }
  // }
  // const handleSort = async (sort) => {
  //   try {
  //     const response = await api.get(`/contributions?sort=${sort}`);
  //     setContributions(response.data);
  //   } catch (error) {
  //     console.error('Error fetching contributions:', error);
  //   }
  // }
  // const handlePagination = async (page) => {
  //   try {
  //     const response = await api.get(`/contributions?page=${page}`);
  //     setContributions(response.data);
  //   } catch (error) {
  //     console.error('Error fetching contributions:', error);
  //   }
  // }

  return (
    <>
      <div className="flex flex-col items-center p-4 w-screen">
        <section className="w-full md:w-1/2" >
          <input
            type="text"
            placeholder="Search contributions..."
            className="border rounded-full p-2 w-full"
            // onChange={(e) => handleSearch(e.target.value)}
            ></input>
        </section>
        <section className="flex flex-col items-center px-4 py-8 gap-y-4  md:gap-y-10">
          <h2 className='text-3xl sm:text-4xl md:text-6xl'>Welcome to Home Page!</h2>
          <h2 className='text-xl sm:text-2xl md:text-3xl'>Find contributions made below.</h2>
          {contributions.length > 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {contributions.map((contribution) => (
                <Card key={contribution.id} contribution={contribution} />
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}

export default App;
