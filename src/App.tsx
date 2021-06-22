
import { Home } from './pages/Home';
import { Route, BrowserRouter } from 'react-router-dom';
import { NewRoom } from './pages/NewRoom';

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
      <Route  path="/" exact component={Home}/>  
      <Route  path="/rooms/new" exact component={NewRoom}/>
      </AuthContextProvider>
  </BrowserRouter>
  

  );
}

export default App;
