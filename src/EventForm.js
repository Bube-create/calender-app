import React, { useState } from "react";
import styled from "styled-components";
import { saveDateData } from "./utils/allinfo";
import { months } from "./utils/allinfo";
import { v4 as uuidv4 } from "uuid";

const EventForm = ({ setClicked, setGlobalEvent, globalEvent }) => {
	const [state, setState] = useState({
		title: "",
		startDate: "",
		endDate: "",
		description: "",
		id: "",
	});

	function formhandler(e, name) {
		setState({ ...state, [name]: e.target.value });
	}

	function submitHandler(e) {
		e.preventDefault();
		if (state.title.trim().length < 1) {
			console.log("invalid Input");
		} else {
			setGlobalEvent({
				...globalEvent,
				events: [{ ...state }],
			});

			saveDateData(globalEvent.year, months.indexOf(globalEvent.month), {
				...globalEvent,
				events: [{ ...state, id: uuidv4() }],
			});
			setClicked(false);
		}
	}
	return (
		<StyledDiv>
			<StyledForm>
				<form onSubmit={submitHandler}>
					<div>
						<label>Title</label>
						<input
							type={"text"}
							value={state.title}
							onChange={(e) => formhandler(e, "title")}
						/>
					</div>

					<div>
						<div>
							<label>Begins</label>
							<input
								type="datetime-local"
								value={state.startDate}
								onChange={(e) => formhandler(e, "startDate")}
							/>
						</div>

						<div>
							<label>End</label>
							<input
								type="datetime-local"
								value={state.endDate}
								onChange={(e) => formhandler(e, "endDate")}
							/>
						</div>
					</div>

					<div>
						<label>Description</label>
						<input
							type="text"
							value={state.description}
							onChange={(e) => formhandler(e, "description")}
						/>
					</div>
					<button>Add Event</button>

					<button onClick={() => setClicked(false)}>Close</button>
				</form>
			</StyledForm>
		</StyledDiv>
	);
};

export default EventForm;

const StyledDiv = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100vw;
	background: grey;
	opacity: 0.8;
	display: grid;
	place-content: center;
	z-index: 103;
`;
const StyledForm = styled.div`
	border: solid;
	width: 60vw;
	background: white;
	padding: 32px;
	color: black;
	z-index: 105;
`;
