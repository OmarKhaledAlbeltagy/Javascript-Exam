import Display from './display.module.js'
import Api from './api.module.js'
$(window).on('load', function () {
   let searchByName = $("#searchByName");
   let searchByFL = $("#searchByFL");
   let currentSearchByName = ""
   let currentSearchByFL = ""

   let display  = new Display();

   searchByName.on('keyup',async function(){
      searchByFL.val('')
      if (searchByName.val() == "") {
         display.clearMealList()
      }
      else{
         if (currentSearchByName != searchByName.val()) {
            let searchApi = new Api('https://www.themealdb.com/api/json/v1/1/search.php?s='+searchByName.val(),'get');
            let data = await searchApi.getData();
            let displaySearchResult = new Display(data);
            displaySearchResult.showMealList()
            currentSearchByName = searchByName.val();
         }
      }
   

   })


   searchByFL.on('keydown',function(e){
   

         if (searchByFL.val().length == 1) {
            if (e.key == "Backspace" || e.key == "Delete" || e.key == "ArrowLeft" || e.key == "ArrowLeft") {
               return true;
            }
            else{
               return false;
            }
         }
   

    
     })



     searchByFL.on('keyup',async function(){

      if (searchByFL.val() == "") {
         display.clearMealList()
      }

      else{
         searchByName.val('')
         if (currentSearchByFL != searchByFL.val()) {
            let searchApi = new Api('https://www.themealdb.com/api/json/v1/1/search.php?f='+searchByFL.val(),'get');
            let data = await searchApi.getData();
            let displaySearchResult = new Display(data);
            displaySearchResult.showMealList()
            currentSearchByFL = searchByFL.val()
         }
      }
   
     })

})