const map = {

    cols: 9,
    rows: 9,
    tile_size: 64,
    spritesheet: null,
    context: null,
    resources: {
        // where to place resources on the map
        'stone': [[1,3],[4,4],[8,1]],
        'wood': [[5,2],[6,6],[2,5]]
    },

    // initialisation
    init(){
        this.context = document.getElementById('map').getContext('2d');
        // fix this load image thing
        this.spritesheet = document.getElementById('spritesheet');

        // wait for the spritesheet to load before loading the map
        this.spritesheet = new Image();
        this.spritesheet.onload = () => {
            map.draw_map();
        };
        this.spritesheet.src = 'images/spritesheets/map.png';
    },

    draw_map(){
        // place the sprites onto the canvas
        for(let x = 0; x < this.cols; x++){
            for(let y = 0; y < this.rows; y++){
                // default grass everywhere
                this.draw_tile('grass', x, y);
            }
        }
        // after we've drawn the map
        // place the resources
        for(let resource in this.resources){
            let positions = this.resources[resource]
            positions.forEach((position) => {
                map.draw_tile(resource, position[0]-1, position[1]-1);
            })
        };
        // place the buildings
        for(let name in build){
            // must exist and have a position array
            let obj = build[name]
            if(obj.exists === true && Array.isArray(obj.position)){
                map.draw_tile(name, obj.position[0]-1, obj.position[1]-1);
            }
        };
        // get the player position
        const human = player.get_position();
        this.draw_tile('player', human[0]-1, human[1]-1);
    },

    // tell this what to place, and where to place it on the map
    draw_tile(sprite, x, y){
        console.log('drawing tile');
        this.context.drawImage(
            this.spritesheet,            // spritesheet image for map
            (this.get_sprite(sprite) - 1) * this.tile_size, // spritesheet start x
            0,                      // spritesheet start y
            this.tile_size,              // how much of spritesheet to move x
            this.tile_size,              // how much of spritesheet to move x
            x * this.tile_size,          // where to place on canvas x
            y * this.tile_size,          // where to place on cavas y
            this.tile_size,              // how much of canvas to draw x
            this.tile_size               // how much of canvas to draw y
        );
    },

    // lookup function that makes it easier to specify a sprite
    get_sprite(name, level = 3){
        // could do with putting this data in an object or something
        if(name === 'grass'){
            return 2;
        }
        if(name === 'player'){
            return 3;
        }
        if(name === 'stone'){
            switch (level) {
                case 1: return 4;
                case 2: return 5;
                case 3: return 6;
                case 4: return 7;
                default: return 6;
            }
        }
        if(name === 'wood'){
            switch (level) {
                case 1: return 8;
                case 2: return 9;
                case 3: return 10;
                case 4: return 11;
                default: return 10;
            }
        }
        if(build.hasOwnProperty(name)){
            console.log(`Got sprite ${build[name].sprite} for ${name} from build obj`);
            return build[name].sprite;
        }
        console.log('Specified a sprite that doesnt exist!');
        return false;
    },

    // give coordinates, get the resource, or false
    get_resource(x,y){
        let rtn = false;
        for(let resource in this.resources){
            let positions = this.resources[resource]
            positions.forEach((position) => {
                if(position[0] === x && position[1] === y){
                    rtn = resource;
                }
            })
        };
        return rtn;
    },

}
