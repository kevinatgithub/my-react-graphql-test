import {gql} from "@apollo/client";
import {InputGroup, FormControl} from "react-bootstrap";

export const ITEM_FRAGMENT = gql`
    fragment itemFragment on GqlItem{
        id
        name
        stocks
        unitPrice
        orders {
            id
            quantity
            totalPrice
            status
        }
    }
`;

export const ITEMS = gql`
    query items{
        items {
            id
            name
            stocks
            unitPrice
        }
    }
`;

export const GET_ITEM = gql`
    query GetItem($id: Int!){
        item(id:$id){
            ...itemFragment
        }
    }
    ${ITEM_FRAGMENT}
`;

export const TextInput = ({label, value, onChange}) => {
    return (
        <InputGroup className="mb-3">
            <InputGroup.Prepend>
                <InputGroup.Text>{label}</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
                placeholder={label}
                value={value}
                onChange={onChange} />
        </InputGroup>
    );
};