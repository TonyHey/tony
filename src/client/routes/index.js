import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
// import { CSSTransitionGroup } from "react-transition-group"
import Bundle from "./bundle"
// import styles from "./router.scss"
// import App from "../container/App"
// import Login from "../pages/login"


const App = props => (
    <Bundle load={() => import("../container/home")}>
        {Component => <Component {...props} />}
    </Bundle>
)
const Test = props => (
    <Bundle load={() => import("../container/test")}>
        {Component => <Component {...props} />}
    </Bundle>
)
const routes = () => (
    <BrowserRouter>
        <Switch>
            <Route location={location} key={`${location.key}_0`} path="/login" component={Test} />
            <Route location={location} key={`${location.key}_1`} path="/" component={App} />
        </Switch>
    </BrowserRouter>
)

export default routes
