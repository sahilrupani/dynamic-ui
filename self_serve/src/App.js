import './App.css';
import { useEffect } from 'react';
import { ContextProvider } from './context/GlobalState'
import Routes from './Hoc/Routes'

function App() {
  useEffect(() => {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
  }, [])
  return (
    <div className="App">
        <ContextProvider>
          <Routes/>
        </ContextProvider>
    </div>
  );
}

export default App;
