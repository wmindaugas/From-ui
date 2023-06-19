import Header from "./components/header/Header";
import Content from "./components/content/Content";
import Footer from "./components/footer/Footer";
import {BrowserRouter} from "react-router-dom";
import {Experimental_CssVarsProvider} from "@mui/material";
import store from "./store/store";
import {Provider} from "react-redux";

function App() {

  return (
      <Provider store={store}>
        <Experimental_CssVarsProvider>
          <BrowserRouter>
            <Header/>
            <Content/>
            <Footer/>
          </BrowserRouter>
        </Experimental_CssVarsProvider>
      </Provider>
  );
}

export default App;