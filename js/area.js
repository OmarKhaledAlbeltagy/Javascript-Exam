import Display from './display.module.js'
import Api from './api.module.js'
$(window).on('load', function () {
   let display  = new Display();
   
   async function getAreas(){
      display.startLoader();
      let api = new Api("https://www.themealdb.com/api/json/v1/1/list.php?a=list","get")
      let data = await api.getData();
      console.log(data);
      let displayCategories = new Display(data);
      displayCategories.showAreasList();
      display.stopLoader();
   }

   $("#areasResult").on('click','.areaCard',async function(){
      display.startLoader();
      let areaName = $(this).attr('area-name');
      let api = new Api('https://www.themealdb.com/api/json/v1/1/filter.php?a='+areaName,"get");
      let data = await api.getData();
      
      $("#areasSection").addClass('hidden');
      $("#mealsSection").removeClass('hidden');
      
      let displayMealsAreaMeals = new Display(data);
      displayMealsAreaMeals.showMealList();
      display.stopLoader();
   })

   getAreas();



})