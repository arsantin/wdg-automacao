import React from "react";
import App from "next/app";
import { Provider } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import { store, persistor } from "../store/store";
import { PersistGate } from "redux-persist/integration/react";
import { createGlobalStyle, ThemeProvider } from "styled-components";

const GlobalStyle = createGlobalStyle`
html{
  box-sizing: border-box;
  background: #F5F4F0;
  display:block;
  height: 100%;
  max-width: 640px;
  margin:0 auto;
  padding: 0;
}

body{
  background-color:#fafafa;
  min-height:100vh;
  padding: 1rem;
  margin-top:0;
  font-family:Verdana;
}
`;

const theme = {
  colors: {
    primary: "#fafafa",
  },
};

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <PersistGate persistor={persistor}>
              <Component {...pageProps} />
            </PersistGate>
          </Provider>
        </ThemeProvider>
      </>
    );
  }
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);
