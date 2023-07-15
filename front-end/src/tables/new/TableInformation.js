import React, { useState, useEffect } from "react"
import { useHistory } from "react-router"
import ErrorAlert from "../../layout/ErrorAlert"
import {listTables, deleteTableAssignment, } from "../../utils/api"

function TableInformation( {tables} ){
    const [currTable, setCurrTable] = useState(tables)
    const [error, setError] = useState(null)

    useEffect(loadTables, [])

    async function loadTables(){
        const abortController = new AbortController();
        setError(null)
        try{
        await listTables(abortController.signal)
        /* todo: set current table */
        setCurrTable(tables)

        console.log(await listTables(abortController.signal))
        }
        catch(error){
            console.log(error);
            setError(error)
        }
        return () => abortController.abort()
    }

    const allTables = tables?.map((table) => {
        console.log(table);
        let tableStatus = "Free"
        if (table.reservation_id){
            tableStatus = "Occupied"
        }

        return (
            <div>
            <p data-table-id-status={`$table.table_id`}>
                {table.table_name}
                {tableStatus}
                {table.capacity}
                {table.table_id}
            </p>
            <FinishButton tableStatus={tableStatus} table={table}/>
            </div>
        )
    })

    function FinishButton({tableStatus, table}){
        if (tableStatus === "Occupied"){
            return (
                <button
                    type="button"
                    data-table-id-finish={table.table_id}
                    onClick ={() => handleFinish(table.table_id)}
                >
                Finish
                </button>
            )
        }
        return null
    }

    async function handleFinish(table){
        if(window.confirm("Is this table ready to seat new guests? This cannot be undone.")){
            await deleteTableAssignment(table.table_id)
            loadTables()
        }
    }

    return (
        <main>
            <ErrorAlert error={error}/>
            <div>{allTables}</div>
            

        </main>

    )

}

export default TableInformation