class Element {
    constructor(name, buildYear) {
        this.name = name;
        this.buildYear = buildYear;
    }
}

class Park extends Element {
    constructor(name, buildYear, area, numTrees){
        super(name, buildYear);
        this.area = area;
        this.numTrees = numTrees;
    }
    treeDensity() {
        const density = this.numTrees/ this.area;
        console.log(`${this.name} has a tree density of ${density} trees per square km.`);
    }
}

class Street extends Element {
    constructor(name, buildYear, length, size = 3){
        super(name, buildYear);
        this.length = length;
        this.size = size;
    }

    classifyStreet() {
        const classification = new Map();
        classification.set(1,'tiny');
        classification.set(2,'small');
        classification.set(3,'normal');
        classification.set(4,'big');
        classification.set(5,'huge');
        console.log(`${this.name}, build in ${this.buildYear}, is a ${classification.get(this.size)} street.  `);
   }
}

const allParks = [new Park('Green Park',  1987, 0.2, 215),
new Park('National Park',  1287, 2.9, 3541), 
new Park('Oak Park',  1987, 0.4, 900)
];
const allStreets = [new Street('Ocean', 1999,1.1, 4),
new Street('Evergreen', 2009,2.1, 3),
new Street('Bakers Street', 1999,32.1),
new Street('Boulevard', 1999,1.1, 4)

];

function calc(arr) {
    const sum = arr.reduce((prev, cur, index) => prev + cur, 0);  
    return [sum, sum / arr.length];
}

function reportParks(p){
    console.log('----Parks Report----');
    //Density
    p.forEach(el => el.treeDensity());
    //Average age
    const ages= p.map(el => new Date().getFullYear() - el.buildYear);
    const[totalAge, avgAge]= calc(ages);
    console.log(`Our ${p.length} parks have an average of ${avgAge} years.`);

    //which park has more than 1000 trees
    const i = p.map(el => el.numTrees).findIndex(el => el >= 1000);

    console.log(`${p[i].name} has more than 1000 trees`);
    


}
function reportStreets(s){
    console.log('----Streets Report----');
    //Total and avg length
    const [totalLength, avgLength]= calc(s.map(el => el.length));
    console.log(`Our ${s.length} streets have a total length of ${totalLength} km and have an average of ${avgLength} km .`);
    //Classify the sizes
    s.forEach(el => el.classifyStreet());
}

reportParks(allParks);
reportStreets(allStreets);
