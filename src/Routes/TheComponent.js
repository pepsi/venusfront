import React, { Component } from 'react';
import { Container, Button, Row, Icon } from 'react-materialize';
import { Link } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago/commonjs/ReactTimeAgo';
import { isMobile } from 'react-device-detect';

export class TheComponent extends Component{
	constructor(props) {
        super(props);
        this.state = {
			id: props.match.params.id,
			thing: null,
			loading: true
		};
	}
    componentDidMount() {
		let url = 'http://cb3ad8ab.ngrok.io/api/v1/';
		// fetch('http://localhost:3333/api/v1/' + this.state.id).then((response) => {
		fetch(url + this.state.id).then((response) => {
			response.json().then((js) => {
				this.setState({
					thing: js,
					loading: false
				});
			});
		});
	}
    render() {
		return (
			<Container
				style={{
					width: isMobile ? '100%' : '40%',
					backgroundColor: '#333',
					borderRadius: '3%',
					padding: 10,
					marginTop: 10
				}}
			>
				<Row>
					<p style={{ color: 'white' }}>
						Uploaded by{' '}
						<Link style={{ color: '#26a69a' }} to="">
							{this.state.thing.uploader}{' '}
						</Link>
						<ReactTimeAgo date={this.state.thing.date} />
					</p>
				</Row>
				<Row>
					{this.props.children}
				</Row>
				<Row>
					<Button onClick={this.report}>
						<Icon left>report</Icon>Report
					</Button>
					<div id="report_holder" />
				</Row>
			</Container>
		);
	}
}
