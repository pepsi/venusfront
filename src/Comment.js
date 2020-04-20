import React from 'react';

class Comment extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			upvoted: false,
			downvoted: false
		};
	}
	upvote = () => {
		this.setState({ downvoted: false, upvoted: !this.state.upvoted });
	};
	downvote = () => {
		this.setState({ upvoted: false, downvoted: !this.state.downvoted });
	};
	getColor = (v) => {
		if (v) {
			return {
				color: '#00f'
			};
		} else {
			return {
				color: '#000'
			};
		}
	};
	render() {
		return (
			<div style={{ backgroundColor: 'white', textAlign: 'left'}}>
				<h1>{this.props.question}{this.props.i}</h1>
				<br />
				<button onClick={this.upvote}>
					<span className="material-icons" style={this.getColor(this.state.upvoted)}>
						thumb_up_alt
					</span>
					<p>{this.state.upvoted}</p>
				</button>
				<button onClick={this.downvote}>
					<span className="material-icons" style={this.getColor(this.state.downvoted)}>
						thumb_down_alt
					</span>
					<p>{this.state.downvotes}</p>
				</button>
			</div>
		);
	}
}
export default Comment;
