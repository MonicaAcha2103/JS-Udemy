
import axios from 'axios';
import {key,proxy} from '../../config'
//search model 
export default class Search{
    constructor(query){
        this.query = query;
    }
    async getResults() {
        //not using fetch since not supported by all browsers, automatically returns json,better at error handling 
       try{
            const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;   
            //console.log(res);
       } catch (error) {
        alert(error);
       }  
    }
}


