// var button = require('react-materialize').Button;
var React = require('react');
var Link = require('react-router').Link;
var render = require('react-dom').render;

var AltContainer = require('alt/AltContainer');
var StudyGroupStore = require('../stores/StudyGroupStore');
var StudyGroupActions = require('../actions/StudyGroupActions');

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

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

const moment = require('moment');


var AllStudyGroups = React.createClass({
	// this method should fetch the group detail and comments
	// parameter : groupId
	viewGroupDetail(id) {
		console.log("open group detail");
		var ngok = "groupDetailDialog" + "1";
		this.refs.ngok.show();
	},

	editGroup() {
		console.log("edit group");
	},

	render() {
		if (this.props.errorMessage) {
			return (
				<div>{this.props.errorMessage}</div>
			);
		}
		if (StudyGroupStore.isLoading()) {
			var left = window.document.documentElement.clientWidth/2 - 25;
			var top = window.document.documentElement.clientHeight/2 - 25;
			console.log(left);
			return(
				<div>
					<RefreshIndicator size={50} left={left} top={top} status="loading" /> 
				</div>
			);
		}

		console.log("test user in SG")
		console.log(this.props.user)
		if (this.props.user){
			return (
				<div>
					<ul>
					  {this.props.studyGroups.map((studyGroup, i) => {
					  	var date = moment(studyGroup.datetime).format("ddd, MMM D").toString();
					  	var time = moment(studyGroup.datetime).format("h:mm a").toString();
					  	var studygroupID = studyGroup.id;
					    return (
					    	<div key={studyGroup.id}>
			    		        <Paper zDepth={1} className="card-container">
			    			        <div className="card studyGroup">
			    			            <div className="colorBar"></div>
			    			            <table>
			    			                <tr className="row1">
			    			                    <td className="userPhotoHolder">
			    			                        <div className="photoHolder">
			    			                            <div className="circle">
			    			                                <img className="userPhoto" src="http://nick.mtvnimages.com/nick/properties/spongebob-squarepants/characters/spongebob-about-web-desktop.jpg?quality=0.75" />
			    			                            </div>
			    			                        </div>

			    			                    </td>
			    			                    <td colSpan="2">
			    			                        <span className="subject">{studyGroup.subject}</span>
			    			                        <span className="title">{studyGroup.title}</span>
			    			                    </td>

			    			                    <td colSpan="2" align="right" className="dateTimeHolder">
			    			                        <div className="date">{date}</div>
			    			                        <div className="time">{time}</div>
			    			                    </td>
			    			                </tr>

			    			                <tr className="row2">
			    			                    <td className="exclamationHolder">
			    			                        <div className="exclamation"></div>
			    			                    </td>
			    			                    <td colSpan="3">
			    			                        <div className="description">{studyGroup.description}</div>
			    			                        <div className="seeMore" onClick={this.viewGroupDetail}>See more...</div>
			    			                    </td>
			    			                </tr>

			    			                <tr className="row3">
			    			                    <td className="pinHolder">
			    			                        <div className="pin"></div>
			    			                    </td>
			    			                    <td colSpan="2">
			    			                        <div className="location">{studyGroup.location}</div>
			    			                    </td>
			    			                </tr>

			    			                <tr className="row4">
			    			                    <td></td>
			    			                    <td colSpan="1"><span className="host">@{studyGroup.host}</span>
			    			                    </td>
			    			                    <td colSpan="2">
			    			                        <div style={{textAlign:"right"}} className="joinButtonContainer">
			    			                            <RaisedButton label="Join" data-id={studyGroup.id}/>
			    			                        </div>
			    			                    </td>
			    			                    <td>
			    			                        <div className="capacityHolder">
			    			                            <div className="capacity">{studyGroup.guestlist}/{studyGroup.capacity}</div>
			    			                        </div>
			    			                    </td>
			    			                </tr>
			    			            </table>
			    			        </div>
			    		        </Paper>

			    		        <Dialog ref={"groupDetailDialog" + studygroupID}
			    		        		title="StudyGroup Detail" 
			    		        		actions={[]}
			    		          		autoDetectWindowHeight={true} 
			    		          		autoScrollBodyContent={true}>
			    		            <div>
			    		            	<div className="groupdesc-title">Class</div>
			    		            	<div className="groupdesc-subtitle">{studyGroup.subject}</div>

			    		            	<div className="groupdesc-title">Title</div>
			    		            	<div className="groupdesc-subtitle">{studyGroup.title}</div>

			    		            	<div className="groupdesc-title">Host</div>
			    		            	<div className="groupdesc-subtitle">@{studyGroup.host}</div>

			    		            	<div className="groupdesc-title">Time</div>
			    		            	<div className="groupdesc-subtitle">time</div>

			    		            	<div className="groupdesc-title">Date</div>
			    		            	<div className="groupdesc-subtitle">date</div>

			    		            	<div className="groupdesc-title">Location</div>
			    		            	<div className="groupdesc-subtitle">{studyGroup.location}</div>

			    		            	<CardTitle
			    		            	  subtitle={studyGroup.description}/>

			    		            </div>
			    		        </Dialog>

	    		                <Dialog ref={"editGroupDialog" + studygroupID}
	    		                	title="Create a New StudyGroup" 
	    		                	modal={true}
	    		                	actions={[
	    		                		  <FlatButton
	    		                		    label="Cancel"
	    		                		    secondary={true}
	    		                		    onTouchTap={this.cancelNewGroup} />,
	    		                		  <Link to="/studygroupapp"><FlatButton
	    		                		    label="Submit"
	    		                		    primary={true}
	    		                		    onTouchTap={this.submitNewGroup} /></Link>]}
	    		                		autoDetectWindowHeight={true} 
	    		                		autoScrollBodyContent={true}>
	    		                  	<div>
	    		        	         	<TextField
	    		        	         		ref = "editGroupSubject"
	    		        	         	  	hintText="CS169"
	    		        	         	  	floatingLabelText="Class" />
	    		        	         	<TextField
	    		        	         		ref = "editGroupTitle"
	    		        	         	  	hintText="Learn React together"
	    		        	         	  	floatingLabelText="Title" />
	    		        	         	<TextField
	    		        	         		ref = "editGroupDescription"
	    		        	         	  	hintText="Come and learn the basic (and some advanced) React together! REACT IS THE FUTURE!!!"
	    		        	         	  	floatingLabelText="Description"
	    		        	         	  	fullWidth={true}
	    		        	         	  	multiLine={true}/>
	    		        	         	<DatePicker
	    		        	         		ref = "editGroupDate"
	    		        	         	  	hintText="Nov 22, 2015"
	    		        	         	  	floatingLabelText="Date"/>
	    		        	         	<TimePicker
	    		        	         		ref = "editGroupTime"
	    		        	         	  	hintText="9:00 pm"
	    		        	         	  	floatingLabelText="Time"/>
	    		        	         	<TextField
	    		        	         		ref = "editGroupLocation"
	    		        	         	  	hintText="Wozniak Longue, Soda Hall"
	    		        	         	  	floatingLabelText="Location"/>
	    		        	         	<TextField
	    		        	         		ref = "editGroupCapacity"
	    		        	         	  	hintText="20"
	    		        	         	  	floatingLabelText="Capacity"/>
	    		                	</div>
	    		                </Dialog>
					    	</div>
					    );
					  })}
					</ul>
				</div>
			);
		}
	}
});

var StudyGroups = React.createClass ({
	componentDidMount() {
		var state = StudyGroupStore.getState();
		console.log(state);
		StudyGroupStore.fetchStudyGroups();	
		
	},
	componentWillReceiveProps() {
	},

	render(){
		if (this.props.user!=null) {
			console.log("TIDAK NULL");
			console.log(this.props);
			return (
				<div>
					<AltContainer store = {StudyGroupStore}>
						<AllStudyGroups/>
					</AltContainer>
				</div>
			);
		}
		return (
			<div>
				<AltContainer store = {StudyGroupStore}>
					<AllStudyGroups/>
				</AltContainer>
			</div>
		);
	}
});

module.exports = StudyGroups;