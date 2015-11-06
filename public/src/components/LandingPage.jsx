var React = require('react');
var render = require('react-dom').render;
var axios = require('axios');


var AltContainer = require('alt/AltContainer');

var AppBar = require('./AppBar.jsx');

var LandingPage = React.createClass({
	render() {
		return (
			<div>
				<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.1/css/materialize.min.css" />
				<link href="landing.css" type="text/css" rel="stylesheet" media="screen,projection"/>
				<link href='https://fonts.googleapis.com/css?family=Lobster|Pacifico|Amatic+SC|Quicksand|Sigmar+One|Dancing+Script|Fredoka+One|Cookie|Oleo+Script|Marck+Script' rel='stylesheet' type='text/css' />
				<div id="index-banner" className="parallax-container">
				  <div className="section no-pad-bot">
				    <div className="container">
				      <br /><br />
				      <h1 className="header center white-text text-lighten-2">Succeed Together</h1>
				      <div className="row center">
				        <h5 className="header col s12 light">Join a study group, study, discuss, nail the class, have fun.</h5>
				      </div>
				      <div className="row center">
				        <a onClick={this.props.dialogSignUp} id="signup_button" className="btn-large waves-effect waves-light blue darken-4">Get Started</a>
				      </div>
				    </div>
				  </div>
				  <div className="parallax"><img style={{display:"block"}} src="campanile-3.jpg" alt="Unsplashed background img 1" /></div>
				</div>
				  
				<div className="container ">
				  <div className="section">
				    <div className="row">
				      <div className="col s6 l6">
				        <div className="icon-block">
				          <h2 className="center blue-text text-darken-4 center"><i className="material-icons">group_work</i></h2>
				          <h5 className="center">We want you to collaborate</h5>
				          <p className="light">Search the most convenient group you want to study with. Sign in to the study group. Grab your bag, laptop and dont forget your study materials. Meet the group, and discuss the upcoming midterm with your peers. </p>
				        </div>
				      </div>

				      <div className="col s6 l6 center">
				        <div className="icon-block">
				          <h2 className="center blue-text text-darken-4"><i className="material-icons">grade</i></h2>
				          <h5 className="center">Achieve something</h5>
				          <p className="light">The more the merrier. Jot up ideas together, learn materials you potentially missed in the lecture from other students. Everyone gets a good grade. Everyone is happy.</p>
				        </div>
				      </div>
				    </div>
				  </div>
				</div>

				<footer className="page-footer blue darken-4 center">
				  <div className="container">
				    <div className="row">
				      <div className="col s12">
				        <p className="grey-text text-lighten-4">"Just a bunch of college students who love to study together."</p>
				    </div>
				  </div>

				    <div className="container ">
				    <a className="brown-text text-lighten-3" >Patrick Hong, Mohit Kohli, Dionysius Hanubrata, Theodorus Budiyanto, Christian Dennis</a>
				    </div>
				  </div>
				</footer>
				  
			</div>
		)
	}
})

module.exports = LandingPage;