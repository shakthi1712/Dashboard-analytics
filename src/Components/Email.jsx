import React, { useState, useEffect } from "react";

const UserList = ({ users }) => {
  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Rating</th>
          <th>Email</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <User key={index} user={user} />
        ))}
      </tbody>
    </table>
  );
};

const User = ({ user }) => {
  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.rating}</td>
      <td>{user.email}</td>
      <td>{user.status}</td>
    </tr>
  );
};

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        
        const usersWithRating = data.map((user, index) => ({
          ...user,
          rating: getRating(index),
          status: determineStatus(), 
        }));
        setUsers(usersWithRating);
      })
      .catch((error) => console.log("Error fetching users", error));
  }, []);

 
  const getRating = (index) => {
    
    return Math.floor(Math.random() * 5) + 1;
  };
  const determineStatus = () => {
    const statuses = ["active", "inactive", "pending"];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  return (
    <div className="app">
      <UserList users={users} />
    </div>
  );
};

export default App;
