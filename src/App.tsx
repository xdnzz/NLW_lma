
import { Home } from './pages/Home';
import { Route, BrowserRouter, Switch} from 'react-router-dom';
import { NewRoom } from './pages/NewRoom';
import {Room} from './pages/Room'
import {AuthContextProvider} from './contexts/AuthContext'

type User={
  id: string;
  name: string;
  avatar: string;
}


type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: ()=> Promise<void>;
}



function App() {



  return (
  <BrowserRouter>
    <AuthContextProvider>
      <Switch>
      <Route  path="/" exact component={Home}/>  
      <Route  path="/rooms/new" component={NewRoom}/>
      <Route  path="/rooms/:id"  component={Room}/>
      </Switch>
      </AuthContextProvider>
  </BrowserRouter>
  

  );
}

export default App;
