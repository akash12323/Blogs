const mongoose = require('mongoose');

const Blog = require('./model/blog');


const arr = [
    {
        title:"Ladakh Tourism",
        img:"https://images.unsplash.com/photo-1576137078980-7867626b63aa?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bGFkYWtoJTIwdG91cmlzbXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        desc:"Ladakh, or La-dvags as it is known in Tibetan, is the ‘land of high passes’ and that has always been its biggest draw for tourists. A land known for its monasteries, its mountain peaks, its adventure and thrills, it calls out to the adrenaline seeker within us, and becomes a destination that deserves a pilgrimage of sorts at least once in a lifetime. Come summer or winter, Ladakh tourism is a magnet all year round. Give heed to its untouched beauty and fulfil your call to the pristine land with your visit to these majestic heights.",
        category:"travel"
    },
    {
        title:"Mumbai: City Of Dreams",
        img:"https://images.unsplash.com/photo-1595658658481-d53d3f999875?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fG11bWJhaXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        desc:"Ladakh, or La-dvags as it is known in Tibetan, is the ‘land of high passes’ and that has always been its biggest draw for tourists. A land known for its monasteries, its mountain peaks, its adventure and thrills, it calls out to the adrenaline seeker within us, and becomes a destination that deserves a pilgrimage of sorts at least once in a lifetime. Come summer or winter, Ladakh tourism is a magnet all year round. Give heed to its untouched beauty and fulfil your call to the pristine land with your visit to these majestic heights.",
        category:"travel"
    },
    {
        title:"Jaipur: The Pink City",
        img:"https://images.unsplash.com/photo-1477587458883-47145ed94245?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fGphaXB1cnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        desc:"Ladakh, or La-dvags as it is known in Tibetan, is the ‘land of high passes’ and that has always been its biggest draw for tourists. A land known for its monasteries, its mountain peaks, its adventure and thrills, it calls out to the adrenaline seeker within us, and becomes a destination that deserves a pilgrimage of sorts at least once in a lifetime. Come summer or winter, Ladakh tourism is a magnet all year round. Give heed to its untouched beauty and fulfil your call to the pristine land with your visit to these majestic heights.",
        category:"travel"
    },
    {
        title:"Kashmir: Heaven on Earth",
        img:"https://images.unsplash.com/photo-1616190419596-e2839e7380d7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fGthc2htaXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        desc:"Ladakh, or La-dvags as it is known in Tibetan, is the ‘land of high passes’ and that has always been its biggest draw for tourists. A land known for its monasteries, its mountain peaks, its adventure and thrills, it calls out to the adrenaline seeker within us, and becomes a destination that deserves a pilgrimage of sorts at least once in a lifetime. Come summer or winter, Ladakh tourism is a magnet all year round. Give heed to its untouched beauty and fulfil your call to the pristine land with your visit to these majestic heights.",
        category:"travel"
    },
    {
        title:"Kedarnath",
        img:"https://images.unsplash.com/photo-1612438214708-f428a707dd4e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8a2VkYXJuYXRofGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        desc:"Ladakh, or La-dvags as it is known in Tibetan, is the ‘land of high passes’ and that has always been its biggest draw for tourists. A land known for its monasteries, its mountain peaks, its adventure and thrills, it calls out to the adrenaline seeker within us, and becomes a destination that deserves a pilgrimage of sorts at least once in a lifetime. Come summer or winter, Ladakh tourism is a magnet all year round. Give heed to its untouched beauty and fulfil your call to the pristine land with your visit to these majestic heights.",
        category:"travel"
    }
]


const seed = async ()=>{
    await Blog.insertMany(arr)
    .then(()=>{
        console.log("DB Seeded");
    })
    .catch(err=>{
        console.log("OH No!!! Error...");
    })
}

module.exports = seed;