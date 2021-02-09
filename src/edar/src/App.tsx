import './App.css';
import Header from './components/Header'
import MainContent from './components/MainContent/MainContent';
import EdarSiteTop from './components/EdarSiteTop'
import Footer from './components/Footer'
function App() {
  return (
    <div className="App">
      <Header title="EDAR" subtitle="~ Easily decide on a restaurant ~" />
      <EdarSiteTop />
      <MainContent />
      <Footer title="EDAR" description="~ Easily decide on a restaurant ~" />
    </div>
  );
}

export default App;
