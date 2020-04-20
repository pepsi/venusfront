import React from 'react';
import {
	Button,
	Breadcrumb,
	Card,
	TextInput,
	DatePicker,
	RadioGroup,
	Slider,
	Checkbox,
	Row,
	Icon
} from 'react-materialize';
import { BrowserRouter as Router, Route } from 'react-router-dom';
class CommentMat extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			upvoted: false,
			downvoted: false
		};
	}
	render() {
		return (
			<Router>
				<Route path="/">
					<div>
						<Icon />
						<Row>
							<TextInput label="First Name" />
							<TextInput label="Last Name" />
						</Row>
						<Row>
							<TextInput label="Disabled" disabled />
						</Row>
						<Row>
							<TextInput label="Email" email />
							<TextInput label="Password" password />
						</Row>
					</div>
				</Route>
                <Route path="/test">
                    <p>tested!</p>
                </Route>
			</Router>
		);
	}
}
export default CommentMat;
