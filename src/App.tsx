import './App.css';
import AppRoutes from './routes/AppRoutes';
import NavBar from './shared/components/navbar/NavBar';
import SimpleTable from './shared/components/table/SimpleTable';
import usePageTitle from './shared/hooks/titles/UsePageTitles';

function App() {
  const pageTitle = usePageTitle();

  return (
    <div className="flex min-h-screen">
      <NavBar isOpen={true} />
      <div className="App flex-1">
        <header className="App-header">
          <h2>{pageTitle}</h2>
          <p>
            Planeación de sacrificio avícola{' '}
            <span className="badge-yellow">
              <span className="dot-yellow" />
              Lote activo
            </span>
          </p>
        </header>
        <AppRoutes />
      </div>
    </div>
  );
}

export default App;