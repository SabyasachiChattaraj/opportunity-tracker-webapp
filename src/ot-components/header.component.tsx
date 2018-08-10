import * as React from 'react';
import { Link } from 'react-router-dom';
import {getLoggedInUser,getLoggedInUserId,isLoggedIn}  from '../CommonUtility';

interface HeaderComponentState{
  isLoggedInUser:boolean;
  
};

interface HeaderComponentProps{
  
};

class HeaderComponent extends React.Component<HeaderComponentProps, HeaderComponentState> {
  
  constructor(props:HeaderComponentProps){
    super(props);

    this.state={
      isLoggedInUser:false
    }
  }    
  
  render() {
    return (
      
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark scrolling-navbar">
        <div className="container">
    
          
          <a className="navbar-brand" href="https://www.cognizant.com/cognizant-digital-business" target="_blank">
            <strong>CDB</strong>
          </a>
    
        
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
    
          
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
    
           
          { !isLoggedIn()?

            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" href="#" to="/">Home
                  <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="https://www.cognizant.com/cognizant-digital-business" target="_blank">About</a>
              </li>
              
            </ul>
            :
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" href="#" to="/Opportunities">OPPORTUNITIES
                  <span className="sr-only">(current)</span>
                </Link>
              </li>
              { 
                getLoggedInUser().userGroup==="ChannelAdmin" &&
                <li className="nav-item">
                  <Link className="nav-link" href="#" to="/Activities">ACTIVITIES</Link>
                </li>
              
              }

              
              
            </ul>

          }  
    
         
            <ul className="navbar-nav nav-flex-icons">
              <li className="nav-item">
                <a href="https://www.facebook.com/Cognizant/" className="nav-link" target="_blank">
                  <i className="fa fa-facebook"></i>
                </a>
              </li>
              <li className="nav-item">
                <a href="https://twitter.com/Cognizant" className="nav-link" target="_blank">
                  <i className="fa fa-twitter"></i>
                </a>
              </li>
              <li className="nav-item">
                { !isLoggedIn()?
                  <a href="https://www.cognizant.com/" className="nav-link border border-light rounded"
                    target="_blank">
                    <i className="fa fa-play-circle mr-2"></i>Cognizant
                  </a>
                  :
                  <Link href="#" className="nav-link border border-light rounded" to="/profile">
                    <i className="fa fa-user mr-2"></i> {getLoggedInUserId()}
                  </Link>
                } 

              </li>
            </ul>
    
          </div>
    
        </div>
      </nav>
      
    );
  }

  isUserLoggedIn=():boolean=>{
    let user:string|null=localStorage.getItem("user");
    let isLoggedInUser:boolean=false;
    if(user && user!=""){
      let loggedInUser=JSON.parse(user);
      if(loggedInUser !=null && typeof loggedInUser == "object"){
        isLoggedInUser=true;

        }  
    }
    return isLoggedInUser;
  
  }

  componentDidMount(){
    
  }

  logout(){
    localStorage.setItem("user","");

  }

}

export default HeaderComponent;
