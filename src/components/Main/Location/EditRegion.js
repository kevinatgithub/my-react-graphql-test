import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import CrudForm from "../Crud/CrudForm";


const EditRegion = ({region, setActive}) => {
    const [name,setName] = useState(region.name);

    const addRegion = gql`
        mutation Add($input : NameOnly!){
            createRegion(input:$input){
                id
                name
            }
        }
    `;

    const updateRegion = gql`
        mutation Update($input : NameAndIdOnly!){
            updateRegion(input : $input){
                id
                name
            }
        }
    `;

    const updateRecords = (cache, { data }) => {
        cache.modify({
            fields: {
                regions(records = []){
                    if (region.id){
                        const newRecord = data.addRegion;
                        cache.writeQuery({
                            query: addRegion,
                            data: { newRecord, ...records}
                        })
                    }else {
                        const newRecord = data.addRegion;
                        cache.writeQuery({
                            query: addRegion,
                            data: { newRecord, ...records}
                        })

                    }
                }
            }
        })
    };

    const [doSave, {loading, error, data}] = useMutation(addRegion,{
        variables : {input : {name}},
        update : updateRecords
    });

    const fields = [
        {type : "text", label : "Region Name", value : name, setValue : setName}
    ];

    return <CrudForm
                title="Add Region" fields={fields} setActive={setActive} doSave={doSave} loading={loading} error={error} data={data}
            />
};

export default EditRegion;