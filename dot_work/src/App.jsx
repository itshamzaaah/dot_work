import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import Signup  from './components/SignupPage';
const App = () => {


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Signup />}>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};
export default App;
