import { useEffect } from 'react';
import {PropTypes} from 'prop-types';
import useUsers from '../../hooks/useUsers';

const UserList = ({ role }) => {
  const { userList, isLoading, error, getUserListDispatch } = useUsers();

  useEffect(() => {
    getUserListDispatch(role);
  }, [role, getUserListDispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {userList.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

UserList.propTypes = {
  role: PropTypes.string.isRequired
};

export default UserList;