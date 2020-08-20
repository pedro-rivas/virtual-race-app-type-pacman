const map_01 = [
    //STREET 01
    [  
         {latitude:21.467708, longitude:-103.461892},
        {latitude:21.467662, longitude:-103.461900},
        {latitude:21.467620, longitude:-103.461907},
        {latitude:21.467574, longitude:-103.461916},
        {latitude:21.467530, longitude:-103.461924},
        {latitude:21.467485, longitude:-103.461929},
        {latitude:21.467441, longitude:-103.461940},
        {latitude:21.467397, longitude:-103.461950},
        {latitude:21.467353, longitude:-103.461963},
        {latitude:21.467309, longitude:-103.461972},
        {latitude:21.467267, longitude:-103.461984},
        {latitude:21.467224, longitude:-103.461997},
        {latitude:21.467181, longitude:-103.462007},
        {latitude:21.467135, longitude:-103.462020},
        {latitude:21.467093, longitude:-103.462028},
        {latitude:21.467047, longitude:-103.462042},
        {latitude:21.467003, longitude:-103.462052},
    ],
    //STREET 02
    [
        {latitude:21.466837, longitude:-103.461416},
        {latitude:21.466858, longitude:-103.461478},
        {latitude:21.466869, longitude:-103.461525},
        {latitude:21.466876, longitude:-103.461573},
        {latitude:21.466885, longitude:-103.461621},
        {latitude:21.466886, longitude:-103.461669},
        {latitude:21.466905, longitude:-103.461715},
        {latitude:21.466914, longitude:-103.461761},
        {latitude:21.466925, longitude:-103.461809},
        {latitude:21.466933, longitude:-103.461857},
        {latitude:21.466934, longitude:-103.461906}, 
        {latitude:21.466943, longitude:-103.461954},
        {latitude:21.466953, longitude:-103.461999},
        {latitude:21.466959, longitude:-103.462043},
    ],
    //STREET 03
    [
        {latitude:21.466974, longitude:-103.462088},
        {latitude:21.466983, longitude:-103.462132},
        {latitude:21.466992, longitude:-103.462180},
        {latitude:21.467014, longitude:-103.462226},
        {latitude:21.467023, longitude:-103.462272},
        {latitude:21.467034, longitude:-103.462318},
        {latitude:21.467045, longitude:-103.462366},
        {latitude:21.467054, longitude:-103.462425},
    ],
    //STREET 04
    [
        {latitude:21.467740, longitude:-103.462325},
        {latitude:21.467694, longitude:-103.462328},
        {latitude:21.467650, longitude:-103.462336},
        {latitude:21.467605, longitude:-103.462344},
        {latitude:21.467562, longitude:-103.462351},
        {latitude:21.467518, longitude:-103.462360},
        {latitude:21.467474, longitude:-103.462375},
        {latitude:21.467428, longitude:-103.462376},
        {latitude:21.467385, longitude:-103.462384},
        {latitude:21.467341, longitude:-103.462395},
        {latitude:21.467296, longitude:-103.462401},
        {latitude:21.467252, longitude:-103.462410},
        {latitude:21.467208, longitude:-103.462418},
        {latitude:21.467163, longitude:-103.462426},
        {latitude:21.467120, longitude:-103.462433},
        {latitude:21.467082, longitude:-103.462435},
    ],
    //STREET 05
    [
        {latitude:21.467752, longitude:-103.461915},
        {latitude:21.467768, longitude:-103.461947},
        {latitude:21.467762, longitude:-103.461995},
        {latitude:21.467778, longitude:-103.462044},
        {latitude:21.467786, longitude:-103.462091},
        {latitude:21.467790, longitude:-103.462139},
        {latitude:21.467797, longitude:-103.462186},
        {latitude:21.467803, longitude:-103.462234},
        {latitude:21.467812, longitude:-103.462282},
    ],
    //STREET 06
    [
        {latitude:21.467673,  longitude:-103.461406},
        {latitude:21.467681, longitude:-103.461441},
        {latitude:21.467694,  longitude:-103.461478},
        {latitude:21.467701,  longitude:-103.461520},
        {latitude:21.467709,  longitude:-103.461573},
        {latitude:21.467716,  longitude:-103.461620},
        {latitude:21.467722,  longitude:-103.461669},
        {latitude:21.467733,  longitude:-103.461715},
        {latitude:21.467740,  longitude:-103.461764},
        {latitude:21.467747,  longitude:-103.461811},
        {latitude:21.467758,  longitude:-103.461859},
        ],
    //STREET 07
    [
        {latitude:21.467654, longitude:-103.461371},
        {latitude:21.467608, longitude:-103.461372},
        {latitude:21.467564, longitude:-103.461373},
        {latitude:21.467520, longitude:-103.461378},
        {latitude:21.467473, longitude:-103.461371},
        {latitude:21.467429, longitude:-103.461370},
        {latitude:21.467383, longitude:-103.461370},
        {latitude:21.467337, longitude:-103.461378},
        {latitude:21.467294, longitude:-103.461381},
        {latitude:21.467249, longitude:-103.461376},
        {latitude:21.467204, longitude:-103.461378},
        {latitude:21.467160, longitude:-103.461379},
        {latitude:21.467116, longitude:-103.461370},
        {latitude:21.467070, longitude:-103.461367},
        {latitude:21.467026, longitude:-103.461370},
        {latitude:21.466979, longitude:-103.461369},
        {latitude:21.466933, longitude:-103.461378},
        {latitude:21.466874, longitude:-103.461382},
    ],
];

const getGameCoins = () => {
    let coins = [];
    for (let i = 0; i < map_01.length; i++) {
        const street = map_01[i];
       for (let z = 0; z < street.length; z++) {
           const point = street[z];
           if(z % 3 === 0 && z <= street.length -3 && z >= 2){
               coins.push(point);
           }
       }
    }
    return coins;
}

const map_limits = [
    {latitude: 21.467994, longitude: -103.462426},
    {latitude: 21.467849, longitude:  -103.461179},
    {latitude: 21.466676, longitude: -103.461254},
    {latitude: 21.466996, longitude: -103.462627},
    {latitude: 21.467994, longitude: -103.462426},
]

export{
    map_01,
    getGameCoins,
    map_limits,
}