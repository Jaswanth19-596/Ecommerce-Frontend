import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Loading from './../../components/Loading';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllUsers = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get('/users/get-all-users');

      if (!data.success) {
        throw new Error();
      }
      setUsers(data.data);
    } catch (error) {
      toast.error('Error while fetching users');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div>
      <h1 className="text-center">All Users</h1>

      <table class="table">
        <thead>
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Address</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && <Loading />}

          {!isLoading &&
            users?.map((user, id) => (
              <tr>
                <td>{id + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.address}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
