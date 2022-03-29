import React, { useState, Fragment } from 'react'
import AddUserForm from './forms/AddUserForm'
import EditUserForm from './forms/EditUserForm'
import UserTable from './tables/UserTable'

const App = () => {
  // Data
  const usersData = [
    { id: 1, name: 'Tina', username: 'floppydiskette' },
    { id: 2, name: 'Crag', username: 'milkdolon' },
    { id: 3, name: 'Alex', username: 'alex0001'}
  ]

  const initialFormState = { id: null, name: '', username: ''}

  // Setting state
  const [users, setUsers] = useState(usersData)
  const [currentUser, setCurrentUser] = useState(initialFormState)
  const [editing, setEditing] = useState(false)

  // CRUD state
  const addUser = user => {
    user.id = users.length + 1
    setUsers([...users, user])
  }

  const deleteUser = id => {
    setEditing(false);

    setUsers(users.filter(user => user.id !== id))
  }

  const updateUser = (id, updatedUser) => {
		setEditing(false)

		setUsers(users.map(user => (user.id === id ? updatedUser : user)))
	}

  const editRow = user => {
    setEditing(true)

    setCurrentUser({ id: user.id, name: user.name, username: user.username})
  }

  return (
    <div className='container'>
      <h1>CRUD App with React Hooks</h1>
      <div className='flex-row'>
        <div className='flex-large'>
          {
            editing ? (
              <Fragment>
                <h2>Edit User</h2>
                <EditUserForm
                  editing={editing}
                  setEditing={setEditing}
                  currentUser={currentUser}
                  updateUser={updateUser}
							  />
              </Fragment>
            ) : (
              <Fragment>
                <h2>Add user</h2>
                <AddUserForm addUser={addUser} />
						  </Fragment>
            )
          }
        </div>
        <div className="flex-large">
					<h2>View users</h2>
					<UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
				</div>
      </div>
    </div>
  );
}

export default App;
