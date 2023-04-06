import SignIn from "./Login/sign_in";
import CreateAccount from "./Login/create_account";
import HomepageNav from "./Home/Navbar/homePage_nav";
import {BrowserRouter,Route,Routes} from "react-router-dom";
import Sell from "./Home/Sell/sell";
import Textbooks from "./Home/Textbooks/textbooks";
import Electronics from "./Home/Electronics/electronics";
import Household from "./Home/Household/household";
import Other from "./Home/Other/other";
import NavbarResize from "./Home/Navbar/navbarResize";
import CardModal from "./Home/CardModal/CardModal";

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn/>}> </Route>
          <Route path="/register" element={<CreateAccount/>}> </Route>
          <Route path="/Menu" element={<NavbarResize/>}> </Route>

          <Route path="/login" element={<HomepageNav/>}>
            <Route path="Textbooks" element={<Textbooks/>}> </Route>
            <Route path="Electronics" element={<Electronics/>}> </Route>
            <Route path="Household" element={<Household/>}> </Route>
            <Route path="Other" element={<Other/>}></Route>
            <Route path="Sell" element={<Sell/>}> </Route>
            <Route path="item/:itemId" element={<CardModal/>}> </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );

}
export default App;
