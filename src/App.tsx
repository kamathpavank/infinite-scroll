import React, { useEffect, useState, useRef } from "react";
import { Route, Switch, Redirect, RouteProps } from "react-router-dom";
import "./index.css";
import "./App.css";
import { InfiniteScroll } from "./components/InfiniteScroll";
import { Login } from "./components/login/Login";

interface AuthRoutesProps extends RouteProps{
  children: React.ReactNode
}

const AdminRoutes: React.FC<AuthRoutesProps> =({children,...rest})=>{
  let isLogged:boolean

  const token = localStorage.getItem('token')
  if(token){
    isLogged = true
  }else{
    isLogged = false
  }

  return(
    <Route
      {...rest}
      render = {()=>
        isLogged ?(
          children
        ):(
          <Redirect
            to={{pathname:'/login'}}
          />
        )
      }
    />
  )
}

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
         <Redirect to="/home"/>
        </Route>
        <Route path="/login" component={Login} />
        <AdminRoutes>
          <Route path="/home" component={InfiniteScroll} />
        </AdminRoutes>
      </Switch>
    </>
  );
}

export default App;
