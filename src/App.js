import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Stocktable from "./page/stockTable/StockTable";
import Sidebar from "./components/sidebar/Sidebar";
import Login from "./page/login/Login";
import Btob from "./page/btob/Btob";
import CrProduct from "./page/crproduct/CrProduct";
import FixProduct from "./page/product/FixProduct";
import AddProduct from "./page/product/AddProduct";
import BtobOrder from "./page/btob/BtobOrder";
import BtobAdmin from "./page/btob/BtobAdmin";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./firebase";
import Spinner from "react-spinkit";
import Settings from "./page/settings/Settings";
import { useEffect, useState } from "react";

function App() {
  const [user, loading] = useAuthState(auth);

  const [userType, setUserType] = useState();

  useEffect(() => {
    db.collection("accounts")
      .doc(user?.email)
      .get()
      .then(doc => setUserType(doc?.data()?.type));
  }, [user]);
  // 로딩 페이지
  if (loading) {
    return (
      <div>
        <Spinner name="ball-spin-fade-loader" color="purple" fadeIn="none" />
      </div>
    );
  }

  // b2b
  if (userType === "customer") {
    return (
      <>
        <Router>
          <div className="flex bg-gray-50 h-auto">
            <Switch>
              <Route
                path="/b2border/:id"
                render={props => <BtobOrder user={user} {...props} />}
              />

              <Route
                path="/"
                render={props => <Btob user={user} {...props} />}
              />
            </Switch>
          </div>
          <div
            onClick={() => auth.signOut()}
            className="text-2xl font-mono font-bold text-center text-gray-200 bg-blue-900 p-6"
          >
            InterAsia
          </div>
        </Router>
      </>
    );
  }
  // 가입하고 승인 ㄴㄴ
  if (userType === "none") {
    return (
      <>
        <div className="flex bg-gray-50 h-auto">
          <div>관리자에게 문의하세요</div>
        </div>
        <div
          onClick={() => auth.signOut()}
          className="text-2xl font-mono font-bold text-center text-gray-200 bg-blue-900 p-6"
        >
          InterAsia
        </div>
      </>
    );
  }

  // 어드민
  if (userType === "admin") {
    return (
      <>
        <Router>
          <div className="flex bg-gray-50 h-auto">
            <Sidebar />
            <Switch>
              <Route path="/fixproduct/:id" component={FixProduct} />
              <Route path="/addproduct" component={AddProduct} />
              <Route path="/crproduct" component={CrProduct} />
              <Route path="/stocktable" component={Stocktable} />
              <Route path="/settings" component={Settings} />
              {/* 로그인 안하면 로그인화면만 보여주고 */}
              {/* 로그인시 직원이면 다 가능 거래처면 /btob 관련만 */}
              <Route path="/b2b/admin" component={BtobAdmin} />
              <Route
                path="/b2border/:id"
                render={props => <BtobOrder user={user} {...props} />}
              />
              <Route
                path="/b2b"
                render={props => <Btob user={user} {...props} />}
              />
              <Route path="/" component={CrProduct} />
            </Switch>
          </div>
        </Router>
      </>
    );
  }

  // if (!user) {
  //   <Login />;
  // }

  return <Login />;
}

export default App;
