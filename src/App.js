import Stocktable from "./page/stockTable/StockTable";
import Sidebar from "./components/sidebar/Sidebar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./page/home/Home";

import Btob from "./page/btob/Btob";

import CrProduct from "./page/crproduct/CrProduct";
import FixProduct from "./page/product/FixProduct";

function App() {
  // const [user] = useAuthState(auth);

  return (
    <Router>
      {/* before login */}
      {/* {!user ? ( */}
      {/* <>
          <Btob />
        </> */}
      {/* ) : ( */}
      {/* // after login */}

      <div className="flex bg-gray-50 h-auto">
        <Sidebar />
        <Switch>
          <Route path="/fixproduct/:id" component={FixProduct} />
          <Route path="/crproduct" component={CrProduct} />
          <Route path="/stocktable" component={Stocktable} />
          <Route path="/b2b" component={Btob} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
      {/* )} */}
    </Router>
  );
}

export default App;
