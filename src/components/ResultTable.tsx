import { useContext } from 'react'
import { Table } from 'semantic-ui-react'
import { MainContext } from '../context/Context'

const ResultTable = () => {
 const { tableData } = useContext(MainContext)
 
  return(
  <Table celled>
    <div className='table-body'>
    <Table.Header>
      <Table.Row className='table-row'>
        <Table.HeaderCell>Process Name</Table.HeaderCell>
        <Table.HeaderCell>Method</Table.HeaderCell>
        <Table.HeaderCell>Model</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
    {tableData.lenght != 0 && tableData.map((i,index)=> {
      return (
        <Table.Row key={index}>
          <Table.Cell>{i.processName}</Table.Cell>
          <Table.Cell>{i.method}</Table.Cell>
          <Table.Cell>{i.model}</Table.Cell>
        </Table.Row>
      )
    })
    }
  </Table.Body>
    </div>
   
  </Table>
)}

export default ResultTable