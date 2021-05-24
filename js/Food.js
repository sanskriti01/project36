class Food{
    constructor(){
        this.foodStock = 15;
        this.lastFeed;
        this.image;
    }
    updateFoodStock(){
        this.foodStock = this.foodStock;
    }
    getFedTime(){
        this.lastFeed = this.lastFeed;
    }
    deductFood(){
        if(this.foodStock > 0){
            this.foodStock = foodStock - 1;
        }
        return this.foodStock;
    }
    getFoodStock(){
        return this.foodStock;
    }
    display(){
        var x = 80, y = 100;
        imageMode(CENTER);
        image (this.image, 720,220,70,70);

        if(this.foodStock != 0){
            for(var i=0; i<this.foodStock; i++){
                if(i%0 == 0){
                    x = 80;
                    y = 50;

                }
                image(this.image, x, y,50,50);
                x = x+30;
            }
        }
    }

}