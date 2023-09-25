/** @format */

// Import React and necessary hooks for functional components
import React, { useCallback, useEffect, useState } from 'react';

// Define a functional component called CatFacts
function CatFacts() {
 // Initialize state variables using the useState hook
 const [facts, setFacts] = useState([]); // To store cat facts
 const [isLoading, setIsLoading] = useState(true); // To track loading state
 const [favouriteFacts, setFavouriteFacts] = useState([]); // To store favourite Facts

 // Define a useEffect hook to run code after component mounting
 useEffect(() => {
  // Call the fetchData function when the component mounts
  fetchData();
 }, []); // The empty dependency array ensures this effect runs only once

 // Define an asynchronous function fetchData to fetch cat facts from an API
 const fetchData = async () => {
  try {
   // Send a GET request to the cat facts API
   const response = await fetch('https://meowfacts.herokuapp.com/?count=5');

   // Parse the response data as JSON
   const data = await response.json();

   // Update the 'names' state with the fetched cat facts
   setFacts(data.data);

   // Log the fetched data to the console
   console.log(data);

   // Set the loading state to false once data is fetched
   setIsLoading(false);
  } catch (error) {
   // Handle errors by logging them and setting loading to false
   console.error('error fetching data:', error);
   setIsLoading(false);
  }
 };

 //  Function to add a fact to the favourties list.

 const addToFavourties = (fact) => {
  // prevFavorites is a parameter representing the previous state of the favorites array.
  // ([...prevFavorites, fact]) is an expression that creates a new array. It spreads all the elements from prevFavorites into the new array and then appends the fact element to the end of the new array.
  //  The new array is passed as an argument to setFavorites.
  setFavouriteFacts((prevFavourties) => [...prevFavourties, fact]);
 };

 // Render the component's JSX content
 return (
  <main className="container">
   <section className="rendered-data">
    <h1>Cat Facts</h1>
    <button className="refresh-button" onClick={fetchData}>
     Refresh
    </button>
    <ol className="cat-list">
     {isLoading ? ( // Display a loading message while data is being fetched
      <p>Loading</p>
     ) : (
      // Map through the 'names' array and render cat facts as list items
      facts &&
      facts.map((fact, index) => (
       <li className="cat-fact" key={index} onClick={() => addToFavourties(fact)}>
        {fact}
       </li>
      ))
     )}
    </ol>
   </section>
   <section className="favourties">
    <h1> Favourite Facts</h1>
    {favouriteFacts.length === 0 ? (
     <p> No favourties selected</p>
    ) : (
     <ol>
      {favouriteFacts.map((fact, index) => (
       <li key={index}>{fact}</li>
      ))}
     </ol>
    )}
   </section>
  </main>
 );
}

// Export the CatFacts component as the default export
export default CatFacts;
