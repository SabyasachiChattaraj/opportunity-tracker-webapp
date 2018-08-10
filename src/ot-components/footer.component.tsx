import * as React from 'react';
import { Link } from 'react-router-dom';
import {getLoggedInUser,getLoggedInUserId,isLoggedIn}  from '../CommonUtility';

class FooterComponent extends React.Component<{}, {}> {
  render() {
    return (
     
      <footer className="page-footer text-center font-small wow fadeIn">
    
       
        
         
              { !isLoggedIn()?
                  <div className="pt-4">
                    <Link className="btn btn-outline-white" to="/login" role="button">Sign In
                        <i className="fa fa-sign-in ml-2"></i>
                    </Link>
                    <Link className="btn btn-outline-white" to="/login" role="button">Sign Up
                      <i className="fa fa-registered ml-2"></i>
                    </Link>  
                  </div>
               :
                  <div className="pt-4">
                    <Link className="btn btn-outline-white" to="/login" role="button">Sign Out
                      <i className="fa fa-sign-out ml-2"></i>
                    </Link>
                  </div>
              
              }
            
       
        
    
        <hr className="my-4"/>
    
       
        <div className="pb-4">
          <a href="https://www.facebook.com/Cognizant/" target="_blank">
            <i className="fa fa-facebook mr-3"></i>
          </a>
    
          <a href="https://twitter.com/Cognizant" target="_blank">
            <i className="fa fa-twitter mr-3"></i>
          </a>
    
          <a href="https://www.youtube.com/Cognizant" target="_blank">
            <i className="fa fa-youtube mr-3"></i>
          </a>
    
          <a href="https://plus.google.com/+cognizant" target="_blank">
            <i className="fa fa-google-plus mr-3"></i>
          </a>
    
          <a href="https://www.instagram.com/cognizant/?hl=en" target="_blank">
            <i className="fa fa-instagram mr-3"></i>
          </a>
    
          <a href="https://in.linkedin.com/company/cognizant" target="_blank">
            <i className="fa fa-linkedin mr-3"></i>
          </a>
    
          <a href="https://github.com/ctsh" target="_blank">
            <i className="fa fa-github mr-3"></i>
          </a>
    

        </div>
      
        <div className="footer-copyright py-3">
          © 2018 Copyright:
          <a href="https://mdbootstrap.com/bootstrap-tutorial/" target="_blank"> Cognizant Digital Business </a>
        </div>
    
    
      </footer>
    
    );
  }
}

export default FooterComponent;
