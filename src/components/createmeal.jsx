import { useState } from 'react';

function CreateMealPlan() {
  const [formData, setFormData] = useState({
    breakfast: '',
    lunch: '',
    dinner: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/meal-plans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        // Handle success, e.g., show a success message
        console.log('Meal plan created successfully');
      } else {
        // Handle error, e.g., show an error message
        console.error('Error creating meal plan');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="breakfast" placeholder="Breakfast" value={formData.breakfast} onChange={handleChange} />
      <input type="text" name="lunch" placeholder="Lunch" value={formData.lunch} onChange={handleChange} />
      <input type="text" name="dinner" placeholder="Dinner" value={formData.dinner} onChange={handleChange} />
      <button type="submit">Create Meal Plan</button>
    </form>
  );
}

export default CreateMealPlan;