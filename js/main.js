import Display from "./display.module.js";
import Api from "./api.module.js";
$(window).on('load',function(){
    let display = new Display();
    let menuBtn = $("#menuButton");
    let closeModalBtn = $(".closeModal");


    
    menuBtn.on('click',async function(){
        display.openCloseNav();
    })
    
    
    closeModalBtn.on('click',function(){
        $(this).parent().addClass('hidden');
    })


    $("#mealsResult").on('click', '.mealCard', async function () {
        display.startLoader();
        let id = $(this).attr('meal-id');

        let detailedApi = new Api("https://www.themealdb.com/api/json/v1/1/lookup.php?i="+id,'get')
        let data = await detailedApi.getData();
        
        let displayDetails = new Display(data);
        displayDetails.showMealDetails();
        display.stopLoader();
    })




    $("#back").on('click',function(){
        $(".backfrom").addClass('hidden');
        $(".backto").removeClass('hidden');
     })
})
