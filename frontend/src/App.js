import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home, Header } from "./components";

const App = (props) => {
	return (
		<Router>
			<Header />
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
