import React, { useState, useEffect } from "react";
import {
	Button,
	Checkbox,
	Container,
	Card,
	Input,
	Icon,
	Message,
	List,
} from "semantic-ui-react";
import styled from "styled-components";
import axios from "axios";

import { API } from "../constants";

const Update = () => <h1>UPdate</h1>;
const Delete = () => <h1>Delete</h1>;

const MarginTop = styled.div`
	margin-top: 3rem;
`;

const MarginTopTiny = styled.div`
	margin-top: 1rem;
`;

const FlexBetween = styled.div`
	display: flex;
	justify-content: space-between;
`;

const FlexItem = styled.div`
	margin-left: 5rem;
`;

const MargingBottomTiny = styled.div`
	margin-bottom: 0.5rem;
`;

const Home = (props) => {
	const [homebrew, setHomebrew] = useState(false);
	const [fetchTerm, setFetchTerm] = useState(null);
	const [fetch, setFetch] = useState(null);
	const [fetchError, setFetchError] = useState(false);
	const [fetchLoading, setFetchLoading] = useState(false);

	const [updateTerm, setUpdateTerm] = useState(null);
	const [update, setUpdate] = useState(null);
	const [updateError, setUpdateError] = useState(false);
	const [updateLoading, setUpdateLoading] = useState(false);

	const [deleteTerm, setDeleteTerm] = useState("");
	const [delete_, setDelete] = useState(null);
	const [deleteError, setDeleteError] = useState(false);
	const [deleteLoading, setDeleteLoading] = useState(false);

	useEffect(() => {
		console.log(`fetch: ${fetch}`);
		fetch && fetch.forEach((item) => console.log(item));
	}, [fetch]);

	const renderFetchResults = () =>
		fetchError ? (
			<Message negative content={fetchError} size="mini" />
		) : fetchLoading ? (
			<h5>Loading...</h5>
		) : (
			<MarginTopTiny>
				{" "}
				<List bulleted>
					{fetch.map((result, index) => {
						return <List.Item key={index}>{result}</List.Item>;
					})}
				</List>
			</MarginTopTiny>
		);

	const handleFetch = async () => {
		setFetchLoading(true);
		try {
			const response = await axios.post(`${API}/search`, {
				word: fetchTerm,
				homebrew,
			});
			setFetch(response.data);
			setFetchError(false);
			setFetchLoading(false);
		} catch (err) {
			setFetchError("Something went wrong.");
			setFetchLoading(false);
		}
	};

	const renderFetch = () => (
		<Card>
			<Card.Content header="Search" />
			<Card.Content textAlign="right">
				<MargingBottomTiny>
					<Checkbox
						label="homebrew"
						checked={homebrew}
						onChange={() => setHomebrew((prevState) => !prevState)}
					/>
				</MargingBottomTiny>
				<Input
					placeholder="..."
					onChange={(e) => setFetchTerm(e.target.value)}
				/>{" "}
				<Button icon onClick={() => handleFetch()}>
					<Icon style={{ marginLeft: "0.5rem" }} name="search" />
				</Button>
				<Card.Content textAlign="left">
					{fetch ? renderFetchResults() : null}
				</Card.Content>
			</Card.Content>
		</Card>
	);

	const handleUpdate = async () => {
		try {
			setUpdateLoading(true);
			const response = await axios.post(`${API}/create`, {
				word: updateTerm,
			});
			setUpdateError(false);
			setUpdateLoading(false);
			setUpdate(response.data);
		} catch (err) {
			setUpdateLoading(false);
			setUpdateError("Something went wrong.");
		}
	};

	const renderUpdate = () => (
		<Card>
			<Card.Content header="Update" />
			<Card.Content textAlign="right">
				<Input
					placeholder="..."
					onChange={(e) => setUpdateTerm(e.target.value)}
				/>{" "}
				<Button icon onClick={() => handleUpdate()}>
					<Icon style={{ marginLeft: "0.5rem" }} name="caret right" />
				</Button>
			</Card.Content>
			<Card.Content textAlign="left">
				{updateLoading ? (
					<h5>Loading ....</h5>
				) : updateError ? (
					<Message negative content={updateError} />
				) : update ? (
					<Message positive content={update} />
				) : null}
			</Card.Content>
		</Card>
	);

	const handleDelete = async () => {
		try {
			setDeleteLoading(true);
			const payload = {
				word: deleteTerm,
			};
			const response = await axios.delete(`${API}/delete`, {
				data: payload,
			});
			setDeleteLoading(false);
			if (response.data.error) {
				setDeleteError(response.data.error);
			} else {
				setDelete(response.data.msg);
				setDeleteLoading(false);
				setDeleteError(false);
			}
		} catch (err) {
			setDeleteLoading(false);
			setDeleteError("Something went wrong.");
			console.log(`Error executing delete: ${err}`);
		}
	};

	const renderDelete = () => (
		<Card>
			<Card.Content header="Delete" />
			<Card.Content textAlign="right">
				<Input
					placeholder="..."
					onChange={(e) => setDeleteTerm(e.target.value)}
				/>{" "}
				<Button icon onClick={() => handleDelete()}>
					<Icon style={{ marginLeft: "0.5rem" }} name="caret right" />
				</Button>
			</Card.Content>
			<Card.Content textAlign="left">
				{deleteLoading ? (
					<h5>Loading ...</h5>
				) : deleteError ? (
					<Message negative content={deleteError} />
				) : delete_ ? (
					<Message positive content={delete_} />
				) : null}
			</Card.Content>
		</Card>
	);

	return (
		<Container>
			<MarginTop>
				<FlexBetween>
					<FlexItem>{renderFetch()}</FlexItem>
					<FlexItem>{renderUpdate()}</FlexItem>
					<FlexItem>{renderDelete()}</FlexItem>
				</FlexBetween>
			</MarginTop>
		</Container>
	);
};

export default Home;
