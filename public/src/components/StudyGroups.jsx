// import react, react-router, alt
var React = require('react');
var render = require('react-dom').render;
var AltContainer = require('alt/AltContainer');

// import store and action
var StudyGroupStore = require('../stores/StudyGroupStore');
var StudyGroupActions = require('../actions/StudyGroupActions');

// import components
var Card_MainGroupView = require('./Card_MainGroupView.jsx');

// masonry react
var Masonry = require('react-masonry-component')(React);
var masonryOptions = {
	columnWidth: 550,
    transitionDuration: '0.4s',
    isFitWidth: true
};

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

// import Material UI components
const RaisedButton = require('material-ui/lib/raised-button');
const Paper = require('material-ui/lib/paper');
const Avatar = require('material-ui/lib/avatar');
const Dialog = require('material-ui/lib/dialog');
const RefreshIndicator = require('material-ui/lib/refresh-indicator');
const FlatButton = require('material-ui/lib/flat-button');
const TextField = require('material-ui/lib/text-field');
const DatePicker = require('material-ui/lib/date-picker/date-picker');
const TimePicker = require('material-ui/lib/time-picker/time-picker');
const Card = require('material-ui/lib/card/card');
const CardHeader = require('material-ui/lib/card/card-header');
const CardTitle = require('material-ui/lib/card/card-title');
const CardActions = require('material-ui/lib/card/card-actions');
const CardText = require('material-ui/lib/card/card-text');
const Tabs = require('material-ui/lib/tabs/tabs');
const Tab = require('material-ui/lib/tabs/tab');

const moment = require('moment');

const URL = "http://localhost:3000";
var axios = require('axios');

var ReactTestUtils = require('react-addons-test-utils');

var refreshInterval = 10000;


var AllStudyGroups = React.createClass({
	render() {
		if (this.props.errorMessage) {
			return (
				<div>{this.props.errorMessage}</div>
			);
		}

		if (this.props.studyGroups){
			return (
				<Masonry
	                className={'my-gallery-class'}
	                elementType={'ul'}
	                options={masonryOptions}
	                disableImagesLoaded={false}>
					{this.props.studyGroups.map((studyGroup, i) => {
					    return ( <Card_MainGroupView studyGroup={studyGroup} user={this.props.user} key={studyGroup.id}/>);
					})}
				</Masonry>		
			);
		}
	}
});

var UpcomingGroups = React.createClass({
	render() {
		if (this.props.errorMessage) {
			return (
				<div>{this.props.errorMessage}</div>
			);
		}

		if (this.props.upcomingGroups){
			return (
				<Masonry
	                className={'my-gallery-class'}
	                elementType={'ul'}
	                options={masonryOptions}
	                disableImagesLoaded={false}>
					{this.props.upcomingGroups.map((studyGroup, i) => {
					    return ( <Card_MainGroupView studyGroup={studyGroup} user={this.props.user} key={studyGroup.id}/>);
					})}
				</Masonry>		
			);
		} else {
			return (<div>Loading...</div>);
		}
	}
});

var PastGroups = React.createClass({
	render() {
		if (this.props.errorMessage) {
			return (
				<div>{this.props.errorMessage}</div>
			);
		}

		if (this.props.pastGroups){
			return (
				<Masonry
	                className={'my-gallery-class'}
	                elementType={'ul'}
	                options={masonryOptions}
	                disableImagesLoaded={false}>
					{this.props.pastGroups.map((studyGroup, i) => {
					    return ( <Card_MainGroupView studyGroup={studyGroup} user={this.props.user} key={studyGroup.id}/>);
					})}
				</Masonry>		
			);
		} else {
			return (<div>Loading...</div>);
		}
	}
});

var GroupSearch = React.createClass({
	render() {
		if (this.props.errorMessage) {
			return (
				<div>{this.props.errorMessage}</div>
			);
		}

		if (this.props.searchResults){
			return (
				<Masonry
	                className={'my-gallery-class'}
	                elementType={'ul'}
	                options={masonryOptions}
	                disableImagesLoaded={false}>
					{this.props.searchResults.map((studyGroup, i) => {
					    return ( <Card_MainGroupView studyGroup={studyGroup} user={this.props.user} key={studyGroup.id}/>);
					})}
				</Masonry>		
			);
		} else {
			return (<div>Loading...</div>);
		}
	}
});

var StudyGroups = React.createClass ({
	componentDidMount: function() {
		StudyGroupStore.fetchStudyGroups();	
		// StudyGroupStore.fetchMyGroups();
		StudyGroupStore.fetchPastGroups();
		StudyGroupStore.fetchUpcomingGroups();
		// setInterval(function() {StudyGroupStore.fetchMyGroups();} , refreshInterval);
		setInterval(function() {StudyGroupStore.fetchStudyGroups();} , refreshInterval);
		setInterval(function() {StudyGroupStore.fetchPastGroups();} , refreshInterval);
		setInterval(function() {StudyGroupStore.fetchUpcomingGroups();} , refreshInterval);
	},

	emptySearch() {
		StudyGroupActions.emptySearch(null);
	},

	render(){
		if (this.props.searchResults!=null) {
			return (
				<Tabs tabItemContainerStyle={{backgroundColor:"#0D47A1"}}
						inkBarStyle={{backgroundColor:"#FFC107", color:'rgba(255, 255, 255, 0)'}}
						valueLink={{value: 'search'}}>
					<Tab label="Search Results" value="search">
						<AltContainer store={StudyGroupStore}>
							<GroupSearch />
						</AltContainer>
					</Tab>
				</Tabs>
			)
		} else if (this.props.studyGroups!=null) {
			return (
				<Tabs tabItemContainerStyle={{backgroundColor:"#0D47A1"}}
						inkBarStyle={{backgroundColor:"#FFC107", color:'rgba(255, 255, 255, 0)'}}>
					<Tab label={this.props.user.school}>
						<AltContainer store={StudyGroupStore}>
							<AllStudyGroups />
						</AltContainer>
					</Tab>
					<Tab label="My Upcoming Groups">
						<AltContainer store={StudyGroupStore}>
							<UpcomingGroups />
						</AltContainer>
					</Tab>
					<Tab label="My Past Groups">
						<AltContainer store={StudyGroupStore}>
							<PastGroups />
						</AltContainer>
					</Tab>
				</Tabs>
			)
		}
		return (
			<div>
			</div>
		);
	}
});

module.exports = StudyGroups;