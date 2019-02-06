//bind example
const obj = {
    name: 'Monica',
    getName(){
        return this.name;
    }
}
let getName = obj.getName.bind(obj);
getName = obj.getName.bind({name : 'Harry'});
console.log(getName())