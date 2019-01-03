export default class Likes {
    constructor() {
        this.likes = [];

    }

    addLike(id, title, author, img){
        const like = {id, title, author ,img};
        this.likes.push(like);

        //persist the data in local storage
        this.persistData();
        return like;
    
    }
    deleteLike (id) {
        //slice takes a start and end returns a new array. doesnt mutate the original array
        //[2,4,8] splice(1,1) => returns [2,8]
       
        const index = this.likes.findIndex(el => el.id === id);
        //persist the data in local storage
        this.persistData();
        return this.likes.splice(index,1);
    }

    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1;//find index different from -1 i.e it is present in the array
    }

    getNumLikes(){
        return this.likes.length;
    }

    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('likes'));
        console.log(storage);
        //restoring the likes frm the localStorage
        this.likes = storage;

    }
}
