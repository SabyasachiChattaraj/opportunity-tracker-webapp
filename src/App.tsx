import * as React from 'react';
import './App.css';
import HeaderComponent from './ot-components/header.component';
import FooterComponent from './ot-components/footer.component';
import OpportunitiesComponent from './ot-components/opportunities.component';
import { BrowserRouter as Router,Route, Switch } from 'react-router-dom';
import ActivitiesComponent from './ot-components/activities.component';
import LoginRegComponent from './ot-components/loginreg.component';
import HomeComponent from './ot-components/home.component';
import PrivateRoute from './PrivateRoute';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import ProfileComponent from './ot-components/profile.component';



class App extends React.Component<{}, {}> {
  public render() {
    return (
      <Router>
      <div className="container-fluid p-0 h-100">
       <HeaderComponent />
        
              <Switch>
                  <Route exact path='/' component={HomeComponent} />
                  <Route exact path='/login' component={LoginRegComponent} />
                  <PrivateRoute exact path='/activities' component={ActivitiesComponent} />
                  <PrivateRoute exact path='/opportunities' component={OpportunitiesComponent} />
                  <PrivateRoute exact path='/profile' component={ProfileComponent}/>
              </Switch>
           

       <FooterComponent/>
        </div>
   </Router>
    );
  }
}

export default App;
