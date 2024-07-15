import '../assets/jquery/dist/jquery.js'

export default class Api{
    constructor(url, method){
        this.url = url;
        this.method = method;
    }



    async getData(){
        let response = await fetch(this.url,{method:this.method});
        let data = await response.json();
        return data; 
    }
    
    

}