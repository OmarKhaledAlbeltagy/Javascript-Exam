import Display from './display.module.js'
import Api from './api.module.js'
$(window).on('load', function () {
   let display  = new Display();
   
   async function getIngredients(){
      display.startLoader();
      let api = new Api("https://www.themealdb.com/api/json/v1/1/list.php?i=list","get")
      let data = await api.getData();
      data.meals = data.meals.slice(0,20);
      console.log(data);
      let displayIngredients = new Display(data);
      displayIngredients.showIngredientList();
      display.stopLoader();
   }

   $("#ingredientsResult").on('click','.ingredientCard',async function(){
      display.startLoader();
      var ingredientName = $(this).attr('ingredient-name');
      let api = new Api('https://www.themealdb.com/api/json/v1/1/filter.php?i='+ingredientName,"get");
      let data = await api.getData();

      $("#ingredientsSection").addClass('hidden');
      $("#mealsSection").removeClass('hidden');

      let displayMealsByIngredients = new Display(data);
      displayMealsByIngredients.showMealList();
      display.stopLoader();
   })

   getIngredients();



   $("#back").on('click',function(){
      $("#ingredientsSection").removeClass('hidden');
      $("#mealsSection").addClass('hidden');
   })

})