import { useEffect, useState } from 'react';
import api from './api';
import Card from './components/Card';
import './index.css';

function App() {
  const [contributions, setContributions] = useState([]);
  const [allContributions, setAllContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchType, setSearchType] = useState('title');
  const [itemsPerPage, setItemsPerPage] = useState(14);

  const totalPages = Math.ceil(contributions.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentContributions = contributions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const fetchContributions = async () => {
    try {
      const response = await api.get('/contributions');
      setAllContributions(response.data.contributions);
      setContributions(response.data.contributions);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
      throw error;
    }
  };

  useEffect(() => {
    // Fetch contributions when the component mounts with added delay for loading
    setTimeout(fetchContributions, 2000);
    
  }, []);


  const handleSearch = search => {
    if (search.length > 0) {
      const filtered = allContributions.filter(cont =>
        cont[searchType].toLowerCase().includes(search.trim().toLowerCase())
      );
      setContributions(filtered);
    } else {
      setContributions(allContributions);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center p-4 w-screen">
        <section className="flex flex-col md:flex-row w-full md:w-2/3 md:max-w-[600px] gap-2 mt-4">
          <div className="flex gap-1 md:w-2/3 items-end justify-center">
            <input
              type="text"
              placeholder="Search contributions..."
              className="border rounded-full p-2 px-4 w-3/4 md:w-full h-fit"
              aria-label="Search contributions"
              onChange={e => handleSearch(e.target.value)}
            ></input>
          </div>
          <div className="flex justify-evenly gap-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="searchType" className="text-sm">
                Search by:
              </label>
              <select
                defalutValue="title"
                onChange={e => setSearchType(e.target.value)}
                id="searchType"
                aria-label="Select Search by Type"
                className="border rounded-lg bg-purple-200 dark:bg-purple-800 p-1"
              >
                <option value="title">Title</option>
                <option value="owner">Owner</option>
              </select>
            </div>
            <div className="flex flex-col gap-1 min-w-[80px]">
              <label htmlFor="itemsPerPage" className="text-sm ">
                Items per page:
              </label>
              <select
                defalutValue="14"
                onChange={e => setItemsPerPage(Number(e.target.value))}
                id="itemsPerPage"
                aria-label="Select Items per page"
                className="border rounded-lg bg-purple-200 dark:bg-purple-800 p-1"
              >
                <option value="14">default</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
              </select>
            </div>
          </div>
        </section>
        <section className="flex flex-col items-center px-4 py-8 gap-y-4 md:gap-y-10">
          <h2 className="text-3xl sm:text-4xl md:text-6xl">
            Welcome to TV Central!
          </h2>
          <h2 className="text-xl sm:text-2xl md:text-3xl">
            Find our show list below.
          </h2>
          {error ? (
            <h2 className="text-4xl text-red-600 h-screen">Error: {error}</h2>
          ) : loading ? (
            <h2 className="text-2xl h-screen">Loading show contributions...</h2>
          ) : contributions.length ? (
            <div className="flex flex-col items-center h-screen">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
                {currentContributions.map(contribution => (
                  <Card key={contribution.id} contribution={contribution} />
                ))}
              </div>
              <div className="flex justify-center mt-6 gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="disabled:opacity-50 dark:bg-purple-800 bg-purple-200"
                  aria-label="Previous Page"
                >
                  Previous
                </button>
                <p className="px-4 py-2 ">
                  Page {currentPage} of {totalPages}
                </p>
                <button
                  onClick={() =>
                    setCurrentPage(prev =>
                      prev < totalPages ? prev + 1 : prev
                    )
                  }
                  disabled={currentPage >= totalPages}
                  className="disabled:opacity-50 dark:bg-purple-800 bg-purple-200"
                  aria-label="Next Page"
                >
                  Next
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center h-screen">
              <h2 className="text-2xl">No shows found.</h2>
              <p className="text-lg">Please check back later or try another search.</p>
            </div>
          )}
        </section>
      </div>
    </>
  );
}

export default App;
