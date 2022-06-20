import React, {useMemo} from 'react'
import {useTable, useGlobalFilter} from 'react-table'
import MOCK_DATA from '../TableSeguimiento/MOCK_DATA.json'
import {COLUMNS} from './ColumnsSeguimiento'
import '../Table/Table.css'


/*----------CREAR EL FONDO DE LA PANTALLA----------- */


function TableSeguimiento () {
    
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => MOCK_DATA,[])

    const {
        getTableProps, 
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } =  useTable({
      columns,
      data
    }, useGlobalFilter)

  return (
    <>
    
    <table {...getTableProps()}>
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
                <tr {...row.getRowProps()} onClick={() => console.log(row.original.folio)}>
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