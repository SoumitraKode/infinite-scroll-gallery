import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Cards from "./components/Cards";
import Spinner from "./components/Spinner";
import { toast } from "react-toastify";

const App = () => {
  const [photos, setPhotos] = useState([]); // Stores all fetched photos
  const [loading, setLoading] = useState(false); // Tracks if data is being fetched
  // const [error, setError] = useState(null); // Tracks errors
  const [page, setPage] = useState(1); // Current page for API calls
  const UNSPLASH_API_KEY = "05NXXel7iEgVWJBgusouGwRRjCVSNotyYvPA1bWAFuc";

  // Fetch photos from Unsplash API
  const fetchData = async () => {
    if (loading) return; // Prevent duplicate requests
    setLoading(true);

    try {
      const response = await fetch(
        `https://api.unsplash.com/photos?page=${page}&per_page=10&order_by=latest&client_id=${UNSPLASH_API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }

      const data = await response.json();

      // Filter out duplicate photos
      const uniquePhotos = data.filter(
        (newPhoto) => !photos.some((photo) => photo.id === newPhoto.id)
      );

      // Append new photos to the existing list
      setPhotos((prevPhotos) => [...prevPhotos, ...uniquePhotos]);
    } catch (err) {
      toast.error(err.message || "Error in fetching photos");
    } finally {
      setLoading(false);
    }
  };

  // Effect: Fetch photos when `page` changes
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // Handle infinite scrolling
  const handleScroll = () => {
    const scrollPosition = window.innerHeight + document.documentElement.scrollTop;
    const bottom = document.documentElement.scrollHeight;

    // Load more photos when the user is near the bottom of the page
    if (bottom - scrollPosition < 100 && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Debounce function to limit scroll event firing frequency
  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  // Attach debounced scroll event listener
  useEffect(() => {
    const debouncedHandleScroll = debounce(handleScroll, 300);

    window.addEventListener("scroll", debouncedHandleScroll);
    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, [loading]); // Re-attach listener if `loading` changes

  return (
    <div className="wrapper">
      <Navbar />
      <div className="bg-bgDark2">
        <div
          className="gallery"
        >
          {loading && photos.length === 0 ? (
            <Spinner />
          ) : (
            <Cards photos={photos} />
          )}
        </div>
        {loading && photos.length > 0 && <Spinner />} {/* Show spinner when loading */}
      </div>
    </div>
  );
};

export default App;
