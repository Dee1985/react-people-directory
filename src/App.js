import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  let peopleList = [];
  const [people, setPeople] = useState(peopleList);

  // Assistance with API provided by peer Ryan Ellingson
  const randomUserRequest = async function() {
    const queryUrl = "https://randomuser.me/api/?results=10"; // random user API provided by TA Jackson
    const response = await Axios.get(queryUrl);
    peopleList = response.data.results.map(result => {
      return {
        fname: result.name.first,
        lname: result.name.last,
        gender: result.gender
      };
    });
    setPeople(peopleList);
  };

  useEffect(() => {
    randomUserRequest();
  }, []);

  const [filteredPeople, setFilteredPeople] = useState(people);
  const [filtered, setFiltered] = useState(false);

  function genderF() {
    const women = [...people].filter(singlePerson => {
      return singlePerson.gender === "female";
    });
    setFilteredPeople(women);
    setFiltered(true);
  }

  function genderM() {
    const men = [...people].filter(singlePerson => {
      return singlePerson.gender === "male";
    });
    setFilteredPeople(men);
    setFiltered(true);
  }

  function reset() {
    setFiltered(false);
    setFilteredPeople(people);
  }

  // useEffect(() => {
  function ascending() {
    console.log("you got clicked");
    // sort by first name
    const newOrder = [...filteredPeople].sort(function(a, b) {
      if (a.fname < b.fname) {
        return -1;
      }
      if (a.fname > b.fname) {
        return 1;
      }
      return 0;
    });
    console.log("new order", people);
    setFilteredPeople(newOrder);
    setFiltered(true);
  }
  // });

  function descending() {
    console.log("you got clicked");
    // sort by first name
    const newOrder = [...filteredPeople].sort(function(a, b) {
      if (a.fname > b.fname) {
        return -1;
      }
      if (a.fname < b.fname) {
        return 1;
      }
      return 0;
    });
    console.log("new order", people);
    setFilteredPeople(newOrder);
    setFiltered(true);
  }

  const rows = [];
  if (filtered === true) {
    filteredPeople.map(singlePerson => {
      const html = (
        <tr>
          <td>{singlePerson.fname}</td>
          <td>{singlePerson.lname}</td>
          <td>{singlePerson.gender}</td>
        </tr>
      );
      rows.push(html);
    });
  } else {
    people.map(singlePerson => {
      const html = (
        <tr>
          <td>{singlePerson.fname}</td>
          <td>{singlePerson.lname}</td>
          <td>{singlePerson.color}</td>
        </tr>
      );
      rows.push(html);
    });
  }

  return (
    <div className="App">
      <button
        onClick={() => {
          ascending();
        }}>
        ascending
      </button>
      <button
        onClick={() => {
          descending();
        }}>
        descending
      </button>
      <button
        onClick={() => {
          genderF();
        }}>
        women
      </button>
      <button
        onClick={() => {
          genderM();
        }}>
        men
      </button>
      <button
        onClick={() => {
          reset();
        }}>
        Reset
      </button>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
          </tr>
        </thead>

        <tbody>{rows}</tbody>
      </table>
      {/* <p> Table coming {people[0].fname} </p> */}
    </div>
  );
}

export default App;
