import { gql, useMutation, useQuery } from '@apollo/client';

const FRAGMENT_REGION = gql`
    fragment region on Region{
        id
        name
    }
`;

const REGIONS = gql`
    query regions {
        regions {
            ...region
        }
    }
    ${FRAGMENT_REGION}
`;

const ADD_REGION = gql`
    mutation addRegion($input : NameOnly!) {
        createRegion(input : $input){
            ...region
        }
    }
    ${FRAGMENT_REGION}
`;

const UPDATE_REGION = gql`
    mutation updateRegion($input: NameAndIDOnly!){
        updateRegion(input:$input){
            ...region
        }
    }
    ${FRAGMENT_REGION}
`;

const DELETE_REGION = gql`
    mutation deleteRegion($id : IDOnly!){
        deleteRegion(input: $id){
            ...region
        }
    }
    ${FRAGMENT_REGION}
`;

export const useRegions = () => {
    const {loading, error, data} = useQuery(REGIONS);
    return {loading, error, data};
};

export const useCreateRegion = regionName => {
    
    const updateRegions = (cache, { data }) => {
        cache.modify({
            fields: {
                regions(existingRegions = []){
                    const newRegion = data.createRegion;
                    cache.writeQuery({
                        query: REGIONS,
                        data: { newRegion, ...existingRegions}
                    })
                }
            }
        })
    };

    const [runCreateRegion, request] = useMutation(ADD_REGION,{
        variables : {
            input : {
                name : regionName
            }
        },
        update : updateRegions
    });

    return {runCreateRegion,request};
}

export const useUpdateRegion = (id,name) => {

    const [runUpdateRegion, request] = useMutation(UPDATE_REGION,{
        variables : {
            input : {
                id, name
            }
        }
    });

    return {runUpdateRegion, request};
};

export const useDeleteRegion = regionId => {
    const updateRegions = (cache, { data }) => {
        cache.modify({
            fields: {
                regions(records = []){
                    const deleted = data.deleteRegion;
                    const i = records.indexOf(deleted);
                    if (i > -1){
                        records.splice(i,1);
                    }
                    cache.writeQuery({
                        query: REGIONS,
                        data: records
                    })
                }
            }
        })
    };
    const [runDeleteRegion, request] = useMutation(DELETE_REGION,{
        variables : {
            id : {
                id : parseInt(regionId)
            }
        },
        update : updateRegions
    });

    return {runDeleteRegion, request};
};