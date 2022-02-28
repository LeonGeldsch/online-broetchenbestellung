import './App.css';
import './reset.css';
import Navbar from './components/Navbar';
import Map from './components/Map';
import Profile from './components/Profile';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import { BakeryProvider, BakeryContext } from './components/BakeryProvider';


const queryClient = new QueryClient();

 
function App() {
  return (
      <QueryClientProvider client={queryClient}>
        <BakeryProvider>
          <Router>
              <Navbar />
              <Pages />
          </Router>
        </BakeryProvider>
      </QueryClientProvider>
  );
}

function Pages() {
  return (
    <Routes>
        <Route path=':slug' element={<Bakery />} />
        <Route path='/' element={<Map />} />
        <Route path='/profile' element={<Profile />} />
        <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

async function fetchProducts(id) {
  const response = await fetch('http://localhost:8080/api/categories/get/' + id.queryKey[0]);
  const data = await response.json();
  return data;
}

function Bakery() {

  // TODO: check if bakery exists

  const { selectedBakery } = useContext(BakeryContext);

  const id = selectedBakery.id;

  const { data, isLoading, error } = useQuery([id], fetchProducts);

  console.log(data, selectedBakery);

  const {slug} = useParams();

  if (isLoading) return <span>Produkte werden geladen...</span>
  if (error) return <span>Produkte konnten nicht geladen werden</span>

  return (
    <>
      <h1>{selectedBakery.name}</h1>
      <p>Kategorien:</p>
    </>
  );
}

function NotFound() {
  return (
    <div>
      <h1>Sorry this page wasn't found</h1>
    </div>
  )
}

export default App;
