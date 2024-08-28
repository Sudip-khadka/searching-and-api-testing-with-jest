import React, { useState, useEffect } from 'react';
import './Search.css'; // Import your CSS file

function Search() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API
  useEffect(() => {
    fetch('https://retoolapi.dev/LRwL3E/availableJobs')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setFilteredData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  // Filter data based on the search query
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);

    const filtered = data.filter(item =>
      item.jobTitle.toLowerCase().includes(value) ||
      item.company.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{`Error: ${error.message}`}</p>;

  return (
    <>
    <h2 className='headers'>Task 2: Implement and Test a React Component with API Integration (Take-Home)
    </h2>
    <h3 className="headers">Github:- <a href='https://github.com/Sudip-khadka/searching-and-api-testing-with-jest'>View Code</a></h3>
    <div className="search-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for jobs..."
          value={query}
          onChange={handleSearch}
        />
      </div>
      <div className="card-container">
        {filteredData.length > 0 ? (
          filteredData.map(job => (
            <div className="card" key={job.id}>
              <div className="card-header">
                <img src={job.logo} alt={`${job.company} logo`} className="logo" />
                <h3>{job.jobTitle}</h3>
              </div>
              <div className="card-body">
                <p><strong>Company:</strong> {job.company}</p>
                <p><strong>Location:</strong> {job.address}</p>
                <p><strong>Salary:</strong> Rs.{job.minSalary} - Rs.{job.maxSalary} ({job.salaryType})</p>
                <p><strong>Expires in:</strong> {job.expiresIn} days</p>
              </div>
            </div>
          ))
        ) : (
          <p>No jobs found.</p>
        )}
      </div>
    </div></>
  );
}

export default Search;
