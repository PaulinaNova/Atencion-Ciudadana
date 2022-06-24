import React, {useMemo, useState, useEffect} from 'react'
import {useTable, useGlobalFilter} from 'react-table'
import {COLUMNS} from './ColumnsSeguimiento'
import './TableSeguimiento.css'
import SlideSeguimiento from '../TableSeguimiento/SlideSeguimiento';
import axios from 'axios'
import { GlobalFilter } from './GlobalFilter'

/*----------CREAR EL FONDO DE LA PANTALLA----------- */ 


function TableSeguimiento () {
    const [isShown, setIsShown] = useState(false);
    const columns = useMemo(() => COLUMNS, [])
    const [gestion, setGestion] = useState([])
    const data = gestion
    
    const getData = async() => {
        const res = await axios.get('/api/gestions')
        setGestion(res.data)
    }

    useEffect(() => {
      getData()
    }, [])
 
    const {
        getTableProps, 
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter,
        toggleHideColumn
    } =  useTable({
      columns,
      data
    }, useGlobalFilter)
    
    var {globalFilter} = state  
    const [tipo, setTipo] = useState([])
    const [estado, setEstado] = useState([])
    const [prioridad, setPrioridad] = useState([])
    const [registra, setRegistra] = useState([])
    const [folio, setFolio] = useState([])
    const [nombre, setNombre] = useState([])

    function handleClick (tipos,estados,prioridads,registras,folios,nombres){
      setIsShown(!isShown);
      toggleHideColumn('tipo',!isShown)
      toggleHideColumn('estado',!isShown)
      toggleHideColumn('prioridad',!isShown)
      setTipo(tipos)
      setEstado(estados)
      setPrioridad(prioridads)
      setRegistra(registras)
      setFolio(folios)
      setNombre(nombres)
      return isShown;
    };
    

  return (
    <>
    <div className='sidebar'> 
        <SlideSeguimiento abierto={isShown} tipo={tipo} estado={estado} prioridad={prioridad} registra={registra} folio={folio}/>
    </div>

    <div style={{width: isShown? '690px':''}}className='inpdiv'>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <input placeholder= {!isShown? "Nombre": nombre} className='intbl3'/>
    </div>
    <table style={{width: isShown? '110vh':''}} className='tseg' {...getTableProps()}>
         <thead>
             {headerGroups.map((headerGroup)=> (
                <tr {...headerGroup.getHeaderGroupProps}>  
                    {headerGroup.headers.map((column) => ( 
                        <th {...column.getHeaderProps()}>{column.render('Header')}</th> 
                    ))}       
                </tr>
             ))}
         </thead>
         <tbody {...getTableBodyProps()}> 
         {rows.map((row) => {
                prepareRow(row)
                return ( 
                    <tr {...row.getRowProps()} onClick={() => {handleClick(row.original.tipo,row.original.estado,row.original.prioridad,row.original.registra,row.original.folio,row.original.nombre_ciudadano); }}>
                        {row.cells.map((cell) => {
                            return  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>      
                        })}  
                    </tr>
                )     
            })}

         </tbody>
    </table> 
    </>
  )
}

export default TableSeguimiento