const http = require('http');
const url = require('url');

const superheroesArray = [
    {
        id: '111',
        name: 'Thor',
        age: 427,
        planet: 'Asgard',
        weapons: 'Hammer'
    },
    {
        id: '222',
        name: 'Captain America',
        age: 180,
        planet: 'Earth',
        weapons: 'Shield'
    },
    {
        id: '333',
        name: 'Black Widow',
        age: 39,
        planet: 'Earth',
        weapons: 'Martial Art'
    },
    {
        id: '444',
        name: 'Hulk',
        age: 46,
        planet: 'Earth',
        weapons: 'Giant Body'
    }
];

const superheroes = JSON.stringify(superheroesArray);

const server = http.createServer((request, response)=>{
    
    const path = url.parse(request.url, true);

    response.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': '*',     
        'Content-Type': 'application/json'
      });

      if(request.method == 'OPTIONS') {
        response.end();
      }



      if (path.pathname =='/' || path.pathname =='/superheroes') {
        response.end(superheroes);
      }


      else if (path.pathname =='/superhero') {
        
        if(request.method == 'GET') {                     //getting selected superhero--------------
          //product id
          const id = path.query.id;
          
          const singleData = superheroesArray.find((ele)=>{
            return ele.id == id;
          });
  
        response.end(JSON.stringify(singleData));
        } //get closed-----------------
  
        else if(request.method == 'POST') {               //adding new superhero--------------
  
          // data to be added
          let addSuperhero = {
            id: '555',
            name: 'Ironman',
            age: 49,
            planet: 'Mars',
            weapons: 'Jarvis'
          };
  
          superheroesArray.push(addSuperhero);
        
          response.end(JSON.stringify(superheroesArray));
        } //post closed------------
  
        else if(request.method == 'PUT') {              //updating the selected superhero--------------

          //product id
          const id = path.query.id;

          //data to be updated
          let updateSuperhero = 
          [ 
            {
              id: '111',
              name: 'Thor',
              age: 367,                       //changed
              planet: 'Asgard',
              weapons: 'Hammer'
            },
            {
              id: '222',
              name: 'Black Panther',          //changed
              age: 45,
              planet: 'Wakanda',              //changed
              weapons: 'Titanium Energy'      //changed
            },
            {
              id: '333',
              name: 'Black Widow',
              age: 30,                        //changed
              planet: 'Earth',
              weapons: 'Martial Art'
            },
            {
              id: '444',
              name: 'Hulk',
              age: 46,
              planet: 'Mars',                 //changed
              weapons: 'Giant Body'
            }
          ];
        
            superheroesArray.forEach((ele,index) => {
              if(ele.id == id) {
                ele.name = updateSuperhero[index].name;
                ele.age = updateSuperhero[index].age;
                ele.planet = updateSuperhero[index].planet;
                ele.weapons = updateSuperhero[index].weapons;
              }
            });
          response.end(JSON.stringify(superheroesArray));
  
        } //put closed----------------
  
        else if(request.method == 'DELETE') {           //deleting the selected superhero--------------
  
          //product id
          const id = path.query.id;
  
          superheroesArray.forEach((ele, index) => {
            if(ele.id == id) {
              superheroesArray.splice(index, 1);
            }
          });
          response.end(JSON.stringify(superheroesArray));
        }
        //delete closed-----------------
      }
  
      /////////////////////////////////////////////
  
      else  {                                           //encountered wrong url--------------
        response.writeHead(404, {
          "Content-Type": 'application/json'
        });
        response.end(JSON.stringify( {message: 'Not found anything in this URL'} ));
      }
});

server.listen('3000', '127.0.0.1', ()=>{
    console.log('Server is running....Lets build an API');
});