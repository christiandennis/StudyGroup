var React = require('react');
var render = require('react-dom').render;
var AltContainer = require('alt/AltContainer');

var StudyGroups = require('./components/StudyGroups.jsx');
var AppBar = require('./components/AppBar.jsx');
var StudyGroupStore = require('./stores/StudyGroupStore');

var Router = require('react-router').Router
var Route = require('react-router').Route
var Link = require('react-router').Link


const App = React.createClass({
  render() {
    return (
      <div>
        <AltContainer store = {StudyGroupStore}>
          <AppBar/>
        </AltContainer>
        <AltContainer store = {StudyGroupStore}>
          {this.props.children}
        </AltContainer>
      </div>
    )
  }
})

const StudyGroupContainer = React.createClass({
  render() {
    return (
      <div>
        <AltContainer store = {StudyGroupStore}>
          <StudyGroups/>
        </AltContainer>
      </div>
    )
  }
})


const About = React.createClass({
  render() {
    return <h3>About</h3>
  }
})

React.render((
	<Router>
	    <Route path="/" component={App}>
        <Route path="studygroupapp" component={StudyGroupContainer}/>
	    </Route>
	</Router>
  
  ), document.getElementById('ReactApp')
);
