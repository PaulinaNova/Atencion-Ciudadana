import React, {useEffect, useState} from 'react'
import axios from 'axios'

function Seguimiento() {
  const [users, setUsers] = useState([])
  const getData = async() => {
    const res = await axios.get('/api/users')
    setUsers(res.data)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className='seguimiento'>
      {users.map(u => <h4 key={u._id}>userName : {u.userName}</h4>)}
    </div>
  )
}

export default Seguimiento