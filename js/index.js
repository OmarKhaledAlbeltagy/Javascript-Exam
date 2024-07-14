import Display from './display.module.js'
import Api from './api.module.js'
$(window).on('load', function () {
    let modal = $("#modal");
    let display = new Display();
    let modalResult = $("#modalResult");


    async function getMainMeals() {
        display.startLoader();
        let api = new Api('https://www.themealdb.com/api/json/v1/1/search.php?s=','get');
        let data = await api.getData();

        let target = $("#mealsResult")
        let displayList = new Display(data);
        displayList.showMealList();
        display.stopLoader();
    }

    getMainMeals()





   

    

})