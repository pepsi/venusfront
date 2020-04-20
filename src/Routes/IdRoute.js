import React from 'react';
import { Row, Col, Card, CardTitle, Container, Preloader, Button, MediaBox, Icon, Textarea } from 'react-materialize';
import Img from 'react-image';
import ReactTimeAgo from 'react-time-ago';
import { Link } from 'react-router-dom';
import { Materialbox } from 'materialize-css';
import { isMobile } from 'react-device-detect';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

class IdRoute extends React.Component {
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
	report = () => {
		// alert('report');
	};
	 fallbackCopyTextToClipboard(text) {
        var textArea = document.createElement("textarea");
        textArea.value = text;
        
        // Avoid scrolling to bottom
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";
      
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
      
        try {
          var successful = document.execCommand('copy');
          var msg = successful ? 'successful' : 'unsuccessful';
          console.log('Fallback: Copying text command was ' + msg);
        } catch (err) {
          console.error('Fallback: Oops, unable to copy', err);
        }
      
        document.body.removeChild(textArea);
      }
       copyTextToClipboard(text) {
        if (!navigator.clipboard) {
          this.fallbackCopyTextToClipboard(text);
          return;
        }
        navigator.clipboard.writeText(text).then(function() {
          console.log('Async: Copying to clipboard was successful!');
        }, function(err) {
          console.error('Async: Could not copy text: ', err);
        });
      }

	render() {
		if (this.state.loading) {
			return (
				<Row>
					<p style={{ color: 'white' }}>Loading</p>
					<Col s={12}>
						<Preloader size="big" flashing />
					</Col>
				</Row>
			);
		} else {
			if (this.state.thing.type === 'none') {
				return (
					<div>
						<p style={{ color: 'white', fontSize: '50px' }}>
							Sorry, we couldn't find your file. Perhaps you made a typo?<br />
							<Link to="/">Home page</Link>
						</p>
					</div>
				);
			} else {
				if (this.state.thing.type === 'file') {
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
								<Col s={12} m={12} l={12}>
									<img
										style={{ width: '100%' }}
										src={'http://cb3ad8ab.ngrok.io/image/' + this.state.id}
									/>
								</Col>
							</Row>
							<Row>
								<Button onClick={this.report}>
									<Icon left>report</Icon>Report
								</Button>
								<div id="report_holder" />
							</Row>
						</Container>
					);
				} else {
					return (
						<Container style={{ textAlign: 'left' }}>
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
								<Button
									onClick={() => {
										this.copyTextToClipboard(this.state.thing.content);
										// alert('Copied to clipboard');
									}}
								>
									Copy to clipboard
								</Button>
								<SyntaxHighlighter javascript="javascript" style={atomOneDark}>
									{this.state.thing.content}
								</SyntaxHighlighter>
							</Row>
						</Container>
					);
				}
				// return <p>Your thing type is {this.state.thing.type}</p>;
			}
		}
	}
}
export default IdRoute;
