import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HomeComponent extends Component<{},{}>{

    render(){
        return (
           
                <div className="view h-100">

                    <video className="video-intro" poster="https://mdbootstrap.com/img/Photos/Others/background.jpg" playsInline autoPlay muted loop>
                    <source src="https://mdbootstrap.com/img/video/Lines-min.mp4" type="video/mp4"/>
                    </video>

                    
                    <div className="mask rgba-black-light d-flex justify-content-center align-items-center">

                    
                    <div className="text-center white-text mx-5 wow fadeIn">

                        <h1 className="display-4 mb-4">
                        <strong>Cognizant Digital Business</strong>
                        </h1>

                       
                        <p id="time-counter" className="border border-light my-4">
                            Opportunity Tracker 
                        </p>


                        <h4 className="mb-4">
                        <strong>A comprehensive digital platform for</strong>
                        </h4>

                        <h4 className="mb-4 d-none d-md-block">
                        <strong>automation of end to end proposal workflow</strong>
                        </h4>

                        <Link to="/login" className="btn btn-outline-white btn-lg">Let's Start
                        <i className="fa fa-sign-in ml-2"></i>
                        </Link>
                    </div>
                   

                    </div>
                   </div>

                

        );
    }


}

export default HomeComponent;