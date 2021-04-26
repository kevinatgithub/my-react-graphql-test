import ItemForm from "./Items/ItemForm";
import List from "./Items/List";
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";

const Items = () => {

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <List />
                </Route>
                <Route exact path={["/form","/form/:id"]}>
                    <ItemForm />
                </Route>
                <Route path="*">
                    Not Found
                </Route>
            </Switch>
        </Router>
    );
};

export default Items;