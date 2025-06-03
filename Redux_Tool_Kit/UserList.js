// components/UserList.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../features/user/userSlice';

function UserList() {
  const dispatch = useDispatch();
  
  // Access the Redux state
  const { users, loading, error } = useSelector((state) => state.users);
  
  // Dispatch the fetchUsers action when the component is mounted
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  
  return (
    <div>
      <h1>User List</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
