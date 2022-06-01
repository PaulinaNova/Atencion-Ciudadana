import React, {useEffect, useState} from 'react'
import axios from 'axios'
import BasicTableSeguimiento from '../TableSeguimiento/TableSeguimiento'
import TableSeguimiento from '../TableSeguimiento/TableSeguimiento'


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
      <div className='inpsegui'>
    <input className='intbl2' placeholder='Paulina Nova'></input>
    <input className='intbl2' placeholder='NOVA928492OVDLD23'></input>
      </div>

    <div className='tblsegui'>
    <TableSeguimiento/>
      
      </div>
    </div> 
  )
}

export default Seguimiento