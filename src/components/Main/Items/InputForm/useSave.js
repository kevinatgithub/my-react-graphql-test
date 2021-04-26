import {gql, useMutation} from "@apollo/client";
import { ITEM_FRAGMENT, ITEMS } from "../common";

const CREATE_ITEM = gql`
    mutation CreateItem($item:ItemInputType!){
        createItem(itemInputType:$item){
            ...itemFragment
        }
    }
    ${ITEM_FRAGMENT}
`;

const UPDATE_ITEM = gql`
    mutation UpdateItem($item:UpdateItemInput!){
        updateItem(updateItemInput:$item){
            ...itemFragment
        }
    }
    ${ITEM_FRAGMENT}
`;

const useSave = ({item}) => {
    const query = item.id === undefined ? CREATE_ITEM : UPDATE_ITEM;
    
    const param = item.id !== undefined ? item : {
        name : item.name, stocks : item.stocks, unitPrice : item.unitPrice
    };

    const updateItems = (cache, { data }) => {
        cache.modify({
            fields: {
                items(existingItems = []){
                    const newItem = data.createItem;
                    cache.writeQuery({
                        query: ITEMS,
                        data: { newItem, ...existingItems}
                    })
                }
            }
        })
    };
    
    const [execute, call] = useMutation(query, {
        variables : {item : param},
        update : updateItems
    });

    return {execute, call};
}

export default useSave;