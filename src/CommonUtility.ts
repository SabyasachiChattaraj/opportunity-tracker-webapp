import {User} from './CommonModel';



   export function getLoggedInUser(){
        let loggedInUser=null;
        let userString= localStorage.getItem("user"); 
        if(userString!=null&&userString!==""){
          loggedInUser=JSON.parse(userString);
        } 
        return loggedInUser; 
      };
    
      export function getLoggedInUserId():string{
        let loggedInUser:any=getLoggedInUser();
        return loggedInUser.name+loggedInUser.family_name;
      };
    
      export function isLoggedIn():boolean{
        return getLoggedInUser()==null?false:true;
      };

      export function signOut(){
        localStorage.setItem("token",null);
        localStorage.setItem("user",null);
      }

      export function getAccessToken(){
        return localStorage.getItem("token");
        
      }

      export function saveUserSession(userLoginResponse){
        let loggedInUser: User = userLoginResponse.getUserResult.userAttributes.reduce(function (map: any, record: any, index: any) {
          map[record.name] = record.value;
          return map;
        }, {});
        loggedInUser.primarySkills=userLoginResponse.userDetails.primary_skills;
        loggedInUser.secondarySkills=userLoginResponse.userDetails.secondary_skills;
        loggedInUser.userGroup=userLoginResponse.userDetails.user_group;
        loggedInUser.userName=userLoginResponse.userDetails.user_name;
        localStorage.setItem("user", JSON.stringify(loggedInUser));
      }


     