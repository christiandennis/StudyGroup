// main.js
const React = require('react');
const ReactDOM = require('react-dom');
const injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();
const AppBar = require('material-ui/lib/app-bar');
const Card = require('material-ui/lib/card/card');
const CardHeader = require('material-ui/lib/card/card-header');
const Avatar = require('material-ui/lib/avatar');
const Paper = require('material-ui/lib/paper');



const NavigationBar = React.createClass({
  render() {
    return (
        <AppBar 
        	title = "StudyGroup"
        	style= {{
        		backgroundColor: "#0D47A1"
        	}}  />
    );
  },
});

const data = [
  {author: "Pete Hunt", text: "This is one comment"},
  {author: "Jordan Walke", text: "This is *another* comment"}
];

var GroupContainer = React.createClass ({
	loadCommentsFromServer: function() {
	    $.ajax({
	      url: this.props.url,
	      dataType: 'json',
	      cache: false,
	      success: function(data) {
	        this.setState({data: data});
	      }.bind(this),
	      error: function(xhr, status, err) {
	        console.error(this.props.url, status, err.toString());
	      }.bind(this)
	    });
	  },
	getInitialState: function() {
		return {data: []};
	},
	componentDidMount: function() {
	    this.loadCommentsFromServer();
	    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
	 },
	render: function() {
		return (
			<div className="groupContainer">
				<NavigationBar/>
				<GroupList data = {this.state.data} />
			</div>
			);
	}
});


var GroupList = React.createClass ({
	render: function() {
		var groupNodes = this.props.data.map(function (group) {
			return (
				<StudyGroup key = {group.author} author = {group.author} subtitle = {group.text} avatar = {group.author.slice(0,1)}>
				</StudyGroup>
			);
		});
		return (
			<div className="groupList">
				{groupNodes}
			</div>
		);
	}
});

var StudyGroup = React.createClass ({
	render: function() {
		return (
			<div className="studyGroup">
				<Paper zDepth={2}>
					<div className = "profile">
						<Avatar>{this.props.avatar}</Avatar>
						{this.props.author}
					</div>
					{this.props.subtitle} 
				</Paper>
				
		</div>
	);}
});



ReactDOM.render(
  	<GroupContainer url = "/api/studyGroup" pollInterval={2000}/>,
  	document.getElementById('content')
);