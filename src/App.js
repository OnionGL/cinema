import {Route, Switch, useLocation } from 'react-router-dom';
import Headers from './Components/Headers/Headers'
import CinemaById from './Components/CinemaById/CinemaById';
import Cinema from './Components/Cinema/Cinema';
import SearchByKeyword from './Components/SearchByKeyword/SearchByKeyword';
import { useTransition, animated } from 'react-spring'
import SearchByFilter from './Components/SearchByFilter/SearchByFilter';
import React from 'react';
import Footer from './Components/Footer/Footer';
import {useAuthState} from 'react-firebase-hooks/auth'
import {authentication} from './API/Firebase'
import Login from './Components/Login/Login';
import Favorite from './Components/Favorite/Favorite';



const App = () => {
  const [user] = useAuthState(authentication)
  const location = useLocation()
  const transitions = useTransition(location , {
    from : {
      opacity : 0,
    },
    enter : {
      opacity : 1,
    },
    leave : {
      opacity : 0,
    },
    delay: 200,
  }
  );
  return <>
  {
    user ?
    <>
    <Headers />
    <div className="main__app">
      {transitions((props , item) => (
        <animated.div style={props}>
          <div className= "main__app__switch">
          <Switch location={item}>
              <Route exact path='/cinema' component = {Cinema}/>
              <Route exact path='/' component = {Cinema}/>
              <Route exact path='/cinema/:value' component = {SearchByKeyword}/>
              <Route exact path='/cinemaByFilter/:ratingfrom/:ratingto/:yearfrom/:yearto/:genre/:order' component = {SearchByFilter}/>
              <Route exact path='/cinemainfo/:id' component = {CinemaById}/>
              <Route exact path='/favorite' component = {Favorite}/>
            </Switch>
          </div>
        </animated.div>
      ))}
      <Footer />
      </div>
    </>
    
    :
    <div>
      <Headers />
      <Login />
    </div>
  }
                 
  </>;
}

export default App;
