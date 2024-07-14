import '../assets/jquery/dist/jquery.js'
window.$ = window.jQuery = jQuery;


let navContainer = $("#navContainer");
let menuList = $("#menuList");
let nav = $("nav");

export default class Display{
    constructor(data){
        this.data = data;
    }    

    startLoader(){
        $('body').addClass('loading');
        $('.loader').removeClass('hidden')
    }

    stopLoader(){
        $('body').removeClass('loading');
        $('.loader').addClass('hidden')
    }

    openCloseNav(){
        if (navContainer.hasClass('closed')) {
            navContainer.removeClass('-translate-x-60')
            navContainer.removeClass('closed')
            navContainer.addClass('opened')
            $("#menuIcon").removeClass('fa-bars')
            $("#menuIcon").addClass('fa-xmark')
            menuList.animate({top:0})
        
        
            nav.addClass('z-50')
            nav.removeClass('z-30')
        }
        else{
            navContainer.addClass('-translate-x-60')
            navContainer.addClass('closed')
            navContainer.removeClass('opened')
            $("#menuIcon").addClass('fa-bars')
            $("#menuIcon").removeClass('fa-xmark')
            menuList.animate({top:"100%"},function(){
                nav.addClass('z-30')
                nav.removeClass('z-50')
            })
        
        }
    }

    showMealList(){
        var html = '';
        $.each(this.data.meals,function(){
            
            html += `<div class="mealCard relative overflow-hidden group border-dashed border-2 border-gray-600 cursor-pointer col-span-1 " meal-id="${this.idMeal}">

            <img src="${this.strMealThumb}" class="w-full" alt="">

            <div class="bg-black opacity-50 absolute z-10 w-full h-full top-full group-hover:top-0 transition-all duration-500 flex justify-center items-center">
              <div class="text-4xl text-white">
                ${this.strMeal}
              </div>
            </div>

          </div>`
        })


        $("#mealsResult").html(html)
    }

    async showMealDetails(){
        let meal = this.data.meals[0];

       

        var ing = await this.getIngredientArray(meal);

        let srcBtn = "";
        let youtubeBtn = ""
        if (meal.strSource != null && meal.strSource != "" && meal.strSource != undefined) {
            srcBtn = `<a href="${meal.strSource}" target="_blank" class="bg-blue-500 hover:bg-blue-700 text-gray-100 font-bold py-1 px-2 rounded transition-colors duration-500 m-2"> <i class="fa-solid fa-globe"></i> Source </a>`
        }
        if (meal.strYoutube != null && meal.strYoutube != "" && meal.strYoutube != undefined) {
            youtubeBtn = `<a href="${meal.strYoutube}" target="_blank" class="bg-red-500 hover:bg-red-700 text-gray-100 font-bold py-1 px-2 rounded transition-colors duration-500 m-2">
                        <i class="fa-brands fa-youtube"></i>
                        Youtube
                      </a>`
        }
        let tags = "";
        if (meal.strTags != null && meal.strTags != "" && meal.strTags != undefined) {
            tags = meal.strTags.split(',');
        }
 
        let tagsHtml = "";
        $.each(tags,function(){
            tagsHtml += `<li class="inline-block">
                        <span class="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">${this}</span>
                    </li>`
        })


        let recipesHtml = '';
        $.each(ing,function(){
            recipesHtml += `  <li class="inline-block">
                        <span class="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">${this}</span>
                    </li>`
        })


        let html = `    <div class="col-span-2">
            <img src="${meal.strMealThumb}" alt="" class="w-full">
            <div class="text-center mt-5">
                <span class="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-2xl font-medium text-red-800 ring-1 ring-inset ring-purple-700/10">${meal.strMeal}</span>
            </div>
            
        </div>
        <div class="col-span-4">
            <div class="mb-5">
                <h1 class="text-2xl">Instructions</h1>
                <h5 class="text-sm">${meal.strInstructions}</h5>
            </div>
            
            <hr>
            <div class="mt-5">
                <h1>Area: Egypt</h1>
                <h1>Category: Main Dish</h1>
                <h1>Recipes:</h1>
                <ul class="list-none inline-block">
                   ${recipesHtml}

                </ul>
                <h1>Tags:</h1>
                <ul class="list-none inline-block">
                    ${tagsHtml}
                </ul>

                <div class="mt-5">
                   
                      ${srcBtn+" "+youtubeBtn}
                </div>
            </div>
        </div>`

        $("#modal").removeClass('hidden')
        $("#modalResult").html(html)
    }

    showCategoriesList(){
        var html = '';
        $.each(this.data.categories,function(){
            
            html += `  <div class="categoryCard relative overflow-hidden group border-dashed border-2 border-gray-600 cursor-pointer col-span-1 " category-name="${this.strCategory}">
                <img src="${this.strCategoryThumb}" class="w-full" alt="">
                <div class="bg-black opacity-50 absolute z-10 w-full h-full top-full group-hover:top-0 transition-all duration-500 flex flex-col justify-center items-center">
                  <div class="text-4xl text-white">
                    ${this.strCategory}
                  </div>
                  <div>
                    ${this.strCategoryDescription}
                  </div>
                </div>
              </div>`
        })


        $("#categoriesResult").html(html)
    }

    showIngredientList(){
        var html = '';
        $.each(this.data.meals,function(){
            
            html += `  <div class="ingredientCard h-72 relative overflow-hidden group border-dashed border-2 border-gray-600 cursor-pointer col-span-1 " ingredient-name="${this.strIngredient}">
                <div class="w-full flex justify-center top-4 relative z-20">
                 <i class="fa-solid fa-bowl-food text-7xl"></i>
                </div>
                <div class="bg-black opacity-80 absolute z-10 w-full h-full top-0 flex flex-col justify-center items-center">
                  <div class="text-4xl text-white">
                    ${this.strIngredient}
                  </div>
                </div>
              </div>`
        })


        $("#ingredientsResult").html(html)
    }

    showAreasList(){
        var html = '';
        $.each(this.data.meals,function(){
            
            html += `  <div class="areaCard h-72 relative overflow-hidden group border-dashed border-2 border-gray-600 cursor-pointer col-span-1 " area-name="${this.strArea}">
                <div class="w-full flex justify-center top-4 relative z-20">
                 <i class="fa-solid fa-earth-africa text-7xl"></i>
                </div>
                <div class="bg-black opacity-80 absolute z-10 w-full h-full top-0 flex flex-col justify-center items-center">
                  <div class="text-4xl text-white">
                    ${this.strArea}
                  </div>
                </div>
              </div>`
        })


        $("#areasResult").html(html)
    }

    clearMealList(){
        $("#mealsResult").children().remove();
    }

    async  getIngredientArray(obj){
        var res = [];
        if (obj.strIngredient1 != null && obj.strIngredient1 != "" && obj.strIngredient1 != undefined) {
            res.push(obj.strMeasure1+" "+obj.strIngredient1)
        }
        if (obj.strIngredient2 != null && obj.strIngredient2 != "" && obj.strIngredient2 != undefined) {
            res.push(obj.strMeasure2+" "+obj.strIngredient2)
        }
        if (obj.strIngredient3 != null && obj.strIngredient3 != "" && obj.strIngredient3 != undefined) {
            res.push(obj.strMeasure3+" "+obj.strIngredient3)
        }
        if (obj.strIngredient4 != null && obj.strIngredient4 != "" && obj.strIngredient4 != undefined) {
            res.push(obj.strMeasur4+" "+obj.strIngredient4)
        }
        if (obj.strIngredient5 != null && obj.strIngredient5 != "" && obj.strIngredient5 != undefined) {
            res.push(obj.strMeasure5+" "+obj.strIngredient5)
        }
        if (obj.strIngredient6 != null && obj.strIngredient6 != "" && obj.strIngredient6 != undefined) {
            res.push(obj.strMeasure6+" "+obj.strIngredient6)
        }
        if (obj.strIngredient7 != null && obj.strIngredient7 != "" && obj.strIngredient7 != undefined) {
            res.push(obj.strMeasure7+" "+obj.strIngredient7)
        }
        if (obj.strIngredient8 != null && obj.strIngredient8 != "" && obj.strIngredient8 != undefined) {
            res.push(obj.strMeasure8+" "+obj.strIngredient8)
        }
        if (obj.strIngredient9 != null && obj.strIngredient9 != "" && obj.strIngredient9 != undefined) {
            res.push(obj.strMeasure9+" "+obj.strIngredient9)
        }
        if (obj.strIngredient10 != null && obj.strIngredient10 != "" && obj.strIngredient10 != undefined) {
            res.push(obj.strMeasure10+" "+obj.strIngredient10)
        }
        if (obj.strIngredient11 != null && obj.strIngredient11 != "" && obj.strIngredient11 != undefined) {
            res.push(obj.strMeasure11+" "+obj.strIngredient11)
        }
        if (obj.strIngredient12 != null && obj.strIngredient12 != "" && obj.strIngredient12 != undefined) {
            res.push(obj.strMeasure12+" "+obj.strIngredient12)
        }
        if (obj.strIngredient13 != null && obj.strIngredient13 != "" && obj.strIngredient13 != undefined) {
            res.push(obj.strMeasure13+" "+obj.strIngredient13)
        }
        if (obj.strIngredient14 != null && obj.strIngredient14 != "" && obj.strIngredient14 != undefined) {
            res.push(obj.strMeasure14+" "+obj.strIngredient14)
        }
        if (obj.strIngredient15 != null && obj.strIngredient15 != "" && obj.strIngredient15 != undefined) {
            res.push(obj.strMeasure15+" "+obj.strIngredient15)
        }
        if (obj.strIngredient16 != null && obj.strIngredient16 != "" && obj.strIngredient16 != undefined) {
            res.push(obj.strMeasure16+" "+obj.strIngredient16)
        }
        if (obj.strIngredient17 != null && obj.strIngredient17 != "" && obj.strIngredient17 != undefined) {
            res.push(obj.strMeasure17+" "+obj.strIngredient17)
        }
        if (obj.strIngredient18 != null && obj.strIngredient18 != "" && obj.strIngredient18 != undefined) {
            res.push(obj.strMeasure18+" "+obj.strIngredient18)
        }
        if (obj.strIngredient19 != null && obj.strIngredient19 != "" && obj.strIngredient19 != undefined) {
            res.push(obj.strMeasure19+" "+obj.strIngredient19)
        }
        if (obj.strIngredient20 != null && obj.strIngredient20 != "" && obj.strIngredient20 != undefined) {
            res.push(obj.strMeasure20+" "+obj.strIngredient20)
        }
        return res;
    }

}