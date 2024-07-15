import Display from './display.module.js'
import Api from './api.module.js'
$(window).on('load', function () {
   let display  = new Display();
   
   async function getCategories(){
      display.startLoader();
      let api = new Api("https://www.themealdb.com/api/json/v1/1/categories.php","get")
      let data = await api.getData();
      let displayCategories = new Display(data);
      displayCategories.showCategoriesList();
      display.stopLoader();
   }

   $("#categoriesResult").on('click','.categoryCard',async function(){
      display.startLoader();
      let categoryName = $(this).attr('category-name');
      let api = new Api('https://www.themealdb.com/api/json/v1/1/filter.php?c='+categoryName,"get");
      let data = await api.getData();

      $("#categoriesSection").addClass('hidden');
      $("#mealsSection").removeClass('hidden');

      let displayMealsCategorized = new Display(data);
      displayMealsCategorized.showMealList();
      display.stopLoader();
   })

   getCategories();



})