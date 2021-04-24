import React from "react";
import { Menu, Button, Icon } from "semantic-ui-react";
import styled from "styled-components";
import "./header.scss";

const KobraCai = styled(Menu.Header)`
	font-family: "dead_stockregular";
	margin: auto;
	margin-left: 1rem;
`;

const OrangeDiv = styled.div`
	background-color: #f2711c;
`;

const Header = () => (
	<OrangeDiv>
		<Menu size="huge" color="orange" inverted>
			<Menu.Menu position="left">
				<KobraCai>Corpus Craker</KobraCai>{" "}
			</Menu.Menu>
		</Menu>
	</OrangeDiv>
);

export default Header;
