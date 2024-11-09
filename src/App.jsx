import { useState, useEffect } from 'react';
import CreateMealPlan from './components/createmeal';

function App() {
  const [mealPlan, setMealPlan] = useState(null);


  // use the useeffect to get the the server response 
  useEffect(() => {
    fetch('http://localhost:3000/api/meal-plan')
      .then(response => response.json())
      .then(data => setMealPlan(data))
      .catch(error => console.error('Error fetching meal plan:', error));
  }, []);


  // Front end with the meal plan 
  return (
    
    <>
      <div>
        <h1>{`Today's Meal Plan`}</h1>
        {mealPlan ? (
          <div>
            <p>Breakfast: {mealPlan.breakfast}</p>
            <p>Lunch: {mealPlan.lunch}</p>
            <p>Dinner: {mealPlan.dinner}</p>
          </div>
        ) : (
          <p>Loading meal plan...</p>
        )}
      </div>
      <div>
       <h2>{`Add more meal plans?`}</h2>
        <CreateMealPlan/>
      </div>
        
    </>
  );
}

export default App;