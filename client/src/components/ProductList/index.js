import React ,{ useEffect }from 'react';
import { useQuery } from '@apollo/client';
//import { UPDATE_PRODUCTS } from '../../utils/actions';
import { updateProducts } from '../../utils/productSlice';
// import useDispatch from react-redux so we can add to our store
import { useDispatch } from 'react-redux';


// import our context hook that includes useContext
//import { useStoreContext } from '../../utils/GlobalState';

import ProductItem from '../ProductItem';
import { QUERY_PRODUCTS } from '../../utils/queries';
import spinner from '../../assets/spinner.gif';
import { idbPromise } from '../../utils/helpers';
// import useSelector from react-redux so we can access our state
import { useSelector } from 'react-redux';

function ProductList() {
  // use the useStoreContext function to get global state and dispatch function for changing data
  //const [state, dispatch] = useStoreContext();

   // query for our db data using the useQuery() hook from apollo/client
   const { loading, data } = useQuery(QUERY_PRODUCTS);
  if(loading) {
    console.log('loading');
  };
  console.log(data);

  // useSelector to read products from the state give a vriable name of state
  const state = useSelector(state => state.products);
  console.log(state.products);


// call useDispatch() dispatch to make things easier and more readable
const dispatch = useDispatch();

  // destructure currenCategory form the state variable retuned by useStoreContext
  const currentCategory  = useSelector(state => state.currentCategory);
 
  

  // use the useEffect hook to update products array
  useEffect(() => {
    // if data is there send it to global state
   if (data) {
    console.log(data);
     // use dispatch and product action along with data from useQuery to update our global store
     dispatch(updateProducts(data.products));
   // lets also take each product and save it to indexedDb using the helper function
   data.products.forEach((product) => {
     idbPromise('products','put', product);
   })
   // if loading value from useQuery is undefined get data from indexedDb and add it to the global store
  }else if (!loading) {
    // since were offline get all of the data from the products store
    idbPromise('products', 'get').then((products) => {
      // use retrieved data to set global state for offline browsing
      dispatch(updateProducts(data.products));
    })
  }
  }, [data, loading, dispatch]);



  function filterProducts() {
    if (!currentCategory) {
      return state.products;
    }

    return state.products.filter(
      product => product.category._id === currentCategory
    );
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {state.products.length ? (
        <div className="flex-row">
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;
