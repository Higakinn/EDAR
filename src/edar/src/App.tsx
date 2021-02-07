import './App.css';
import RestaurantList from './components/RestaurantList';
import Header from './components/Header'
import EdarSiteTop from './components/EdarSiteTop'
import Footer from './components/Footer'
function App() {
  return (
    <div className="App">
      <Header title="EDAR" subtitle="~ Easily decide on a restaurant ~" />
      <EdarSiteTop />
      <RestaurantList />
      <Footer title="EDAR" description="~ Easily decide on a restaurant ~" />
    </div>
  );
}

export default App;
