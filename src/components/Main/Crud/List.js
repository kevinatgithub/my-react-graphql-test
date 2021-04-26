import { Button, Spinner, Table } from "react-bootstrap";

const List = ({loading,error,records,variant,keys,setToUpdate,setToDelete}) => {

    if (error) {
        alert(JSON.stringify(error));
        return <></>;
    }

    return (
        <Table bordered variant={variant ? variant : 'light'} size="sm" striped style={{marginTop:"1em"}}>
            <thead>
                <tr>
                    {keys.map((k,i) => <th key={i}>{k.label}</th>)}
                </tr>
            </thead>
            <tbody>
                {loading && <tr><td colSpan={3}><Spinner animation="grow" /> Please wait..</td></tr>}
                {records ? records.map(r => (
                    <tr key={r.id}>
                        {keys.map((k,i) => <td key={i}>{r[k.key]}</td>)}
                        <td>
                            <Button variant="warning" onClick={() => {setToUpdate(r)}} size="sm">Update</Button>
                            <Button variant="danger" onClick={() => {setToDelete(r)}} style={{marginLeft:'1em'}} size="sm">Delete</Button>
                        </td>
                    </tr>
                )) : []}
                {records && records.length === 0 && <tr><td colSpan={keys.length+1}>No Records Yet</td></tr>}
            </tbody>
        </Table>
    );
}

export default List;