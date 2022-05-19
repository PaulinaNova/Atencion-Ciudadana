import React, {useMemo} from 'react'
import {useTable, useGlobalFilter} from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import {COLUMNS} from './Columns'
import './Table.css'
import * as IoIcons from "react-icons/io";
import * as AiIcons from "react-icons/ai";
import { GlobalFilter } from './GlobalFilter'

export const BasicTable =() =>{
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => MOCK_DATA,[])
    
    const {
        getTableProps, 
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter
    } =  useTable({
      columns,
      data
    }, useGlobalFilter)

  const {globalFilter} = state
  return (
    <>
    <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
    <table {...getTableProps()}>
         <thead>
             {headerGroups.map((headerGroup)=> (
                <tr {...headerGroup.getHeaderGroupProps}>  
                    {headerGroup.headers.map((column) => ( 
                        <th {...column.getHeaderProps()}>{column.render('Header')}</th> 
                    ))}  
                    <th>Acciones</th>       
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
                        <td>
                            <button className='btntbl'><AiIcons.AiOutlineSetting/></button>
                            <button className='btntbl'><AiIcons.AiOutlineHistory /></button>
                            <button className='btntbl'><IoIcons.IoIosAddCircleOutline /></button>
                        </td>      
                    </tr>
                )     
            })}

         </tbody>
    </table>
    </>
  )
}

export default BasicTable