import React, {useMemo} from 'react'
import {useTable} from 'react-table'
import MOCK_DATA from './MOCK_DATA_PENDIENTES.json'
import {COLUMNS} from './ColumnsPendientes'
import '../Table/Table.css'

export const TblPendientes =(props) =>{
    const {cadena} = props
    const columns = useMemo(() => COLUMNS, [])
    var data = useMemo(() => MOCK_DATA,[])
    if(cadena === "Urgentes"){
        data = data.filter(function (entry) {
            return entry.prioridad === 'Alta';
        });
    }else if(cadena === "Vencidas"){
        data = data.filter(function (entry) {
            return entry.captura <= '2022-02-01';
        });
    }else if(cadena === "Pendientes"){
        data = data.filter(function (entry) {
            return entry.estado <= 'Aceptado';
        });
    }

    
    const {
        getTableProps, 
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } =  useTable({
      columns,
      data
    })

  return (
    <>
    <table className='tbl' {...getTableProps()}>
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
                <tr {...row.getRowProps()}>
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

export default TblPendientes