import React from "react"
export const GlobalFilter = (props,{ filter, setFilter}) => {
    const {abierto} = props
    return (
        <span>
            <input style={{width: abierto? '110vh':''}} placeholder="Buscar folio" value={filter || ''} onChange={(e) => setFilter(e.target.value)} className='intbl2'/>
        </span>
    )
}