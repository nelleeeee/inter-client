import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Stocktable from "./components/sidebar/stockTable/StockTable";
import Sidebar from "./components/sidebar/Sidebar";
import Login from "./page/login/Login";
import Btob from "./page/btob/customer/Btob";
import CrProduct from "./page/product/crproduct/CrProduct";
import FixProduct from "./page/product/fixproduct/FixProduct";
import AddProduct from "./page/product/addproduct/AddProduct";
import BtobOrder from "./page/btob/customer/BtobOrder";
import BtobAdmin from "./page/btob/admin/BtobAdmin";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./firebase";
import Spinner from "react-spinkit";
import Settings from "./page/settings/Settings";
import { useEffect, useState } from "react";
import BtoBAdminRowDetail from "./page/btob/admin/BtoBAdminRowDetail";
import AdminChat from "./page/btob/chat/AdminChat";
import Invoices from "./page/btob/admin/Invoices";
import UnShipped from "./page/btob/admin/UnShipped";
import UnShippedRowDetail from "./page/btob/admin/UnShippedRowDetail";

function App() {
  const [user, loading] = useAuthState(auth);

  const [userType, setUserType] = useState("before");

  useEffect(() => {
    db.collection("accounts")
      .doc(user?.email)
      .get()
      .then(doc => setUserType(doc?.data()?.type));
  }, [user]);

  // 로딩 페이지
  if (loading || userType === "before") {
    return (
      <div className="grid place-items-center h-screen w-full">
        <div className="text-center pb-24 flex flex-col justify-center items-center">
          <Spinner name="ball-spin-fade-loader" color="gray" fadeIn="none" />
        </div>
      </div>
    );
  }

  // b2b
  if ((user && userType) === "customer") {
    return (
      <>
        <Router>
          <div className="flex bg-gray-50 h-auto">
            <Switch>
              <Route
                path="/b2border/:uid/:id"
                render={props => <BtobOrder user={user} {...props} />}
              />

              <Route
                path="/b2b"
                render={props => <Btob user={user} {...props} />}
              />
            </Switch>
          </div>
        </Router>
      </>
    );
  }
  // 가입하고 승인 ㄴㄴ
  if ((user && userType) === "none") {
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
  if ((user && userType) === "admin") {
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
              {/* 미발송건 */}
              <Route
                exact
                path="/unshipped/:id"
                render={props => <UnShippedRowDetail {...props} />}
              />

              <Route
                exact
                path="/unshipped"
                render={props => <UnShipped {...props} />}
              />
              {/* 인보이스 */}
              <Route
                exact
                path="/invoice/:id"
                render={props => <Invoices {...props} />}
              />
              {/* 채팅 */}
              <Route
                exact
                path="/chats"
                render={props => <AdminChat user={user} {...props} />}
              />

              <Route
                exact
                path="/b2b/admin/:id"
                component={BtoBAdminRowDetail}
              />
              <Route path="/b2b/admin" component={BtobAdmin} />
              <Route
                path="/b2border/:uid/:id"
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

  if (!user) {
    return <Login />;
  }

  return (
    <>
      <div className="grid place-items-center h-screen w-full">
        <div className="text-center pb-24 flex flex-col justify-center items-center">
          <Spinner name="ball-spin-fade-loader" color="gray" fadeIn="none" />
        </div>
      </div>
      {/* <div
        onClick={() => auth.signOut()}
        className="text-2xl font-mono font-bold text-center text-gray-200 bg-blue-900 p-6"
      >
        InterAsia
      </div> */}
    </>
  );
}

export default App;
