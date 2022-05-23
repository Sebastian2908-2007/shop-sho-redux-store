import React, {useEffect} from 'react';
//import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../../utils/actions';
// import redux action creators
import { updateCategories, updateCurrentCategory } from '../../utils/categoriesSlice';
// import useSelector from react-redux so we can read the state in this component
import { useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
// import dispatch from react-redux so that we can actually do stuff to our state like adding etc.
import { useDispatch } from 'react-redux';
import { QUERY_CATEGORIES } from '../../utils/queries';
//import { useStoreContext } from '../../utils/GlobalState';
import { idbPromise } from '../../utils/helpers';

function CategoryMenu() {
  const currentCategory = useSelector(state => state.currentCategory);

  // this function is using the useContext hook
  //const [state, dispatch] = useStoreContext();
  // call useDispatch "dispatch" to make thing more normal
  const dispatch = useDispatch();
  // destructure categories from the state object
  const  {categories}  = useSelector(state => state.categories);
  // query to get category data
  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
     // if categoryData exists or has changed from the response of useQuery, then run dispatch()
    if (categoryData) {
    // execute our dispatch function with our action object indicating the type of action and the data to set our state for categories to
    dispatch(updateCategories(categoryData.categories)); 
    
    categoryData.categories.forEach(category => {
      idbPromise('categories', 'put', category);
     });
     // if loading value from useQuery is undefined get data from indexedDb and add it to the global store
    } else if (!loading) {
      idbPromise('categories', 'get').then(categories => {
        dispatch(updateCategories(categories));
      });
    }
  }, [categoryData, loading, dispatch]);

  // function to set state with each click
  const handleClick = id => {
   // console.log(id);
    dispatch(updateCurrentCategory(id));
   
    //console.log(currentCategory);
  };

//console.log(categories);
  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
