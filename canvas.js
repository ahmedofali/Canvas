var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d") ;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var settings = {
    maxRadius:100,
    affectedCirclesSpace:100,
    colorArray:[ "#225378" , "#1695A3" , "#ACF0F2" , "#F3FFE2" , "#EB7F00" ],
    numberOfCircles:500,
    mouse:{
        x : undefined,
        y : undefined
    }
};

var gerRandomColor = function(){
    return settings.colorArray[ Math.floor( Math.random() * settings.colorArray.length )] ;
}


// if using es6 we can say class and generate instances from it but now lets stick with object oriented es5
function circle( x , y , dx , dy , radius ) {
    this.x = x ;
    this.y = y ;
    this.dx = dx ;
    this.dy = dy ;
    this.radius = radius ;
    this.minRadius = radius ;
    this.color = gerRandomColor() ;

    this.draw = function() {
        c.beginPath();
        c.arc( this.x , this.y ,this.radius, 0 ,Math.PI * 2 ,false ) ;
        c.fillStyle = this.color ;
        c.fill();
    }

    this.circleWithinMouseAffectedSpace = function(){
        if(
            ( settings.mouse.x - this.x ) < settings.affectedCirclesSpace &&
            ( settings.mouse.x - this.x ) > -settings.affectedCirclesSpace &&
            ( settings.mouse.y - this.y ) < settings.affectedCirclesSpace &&
            ( settings.mouse.y - this.y ) > -settings.affectedCirclesSpace
        ){
            return true ;
        }

        return false ;
    }

    this.update = function() {
        if( this.x + this.radius >= innerWidth || this.x - this.radius <= 0 ){
            this.dx = -this.dx;
        }

        if( this.y + this.radius >= innerHeight || this.y - this.radius <= 0 ){
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        // lets add interactivity here
        if( this.circleWithinMouseAffectedSpace() ){
            // circle so close to mouse x position
            // do not increase radius until it's less than maxRadius
            if( this.radius < settings.maxRadius ){
                this.radius += 1 ;
            }
        }else if( this.radius > this.minRadius ){
            this.radius -= 1 ;
        }

        this.draw();
    }

}


function controller(){

    this.circleArray = [] ;

    this.start = function(){
        this.instantiateEventListeners();
        this.init();
        this.animateCircles();
    }

    this.init = function(){
        this.circleArray = [] ;

        for( var i = 0 ; i < settings.numberOfCircles ; i++ )
        {
            var radius = ( Math.random() * 20 ) + 1  ;
            var x = Math.random() * ( innerWidth - radius * 2 ) + radius ;
            var y = Math.random() * ( innerHeight - radius * 2 ) + radius ;
            var dx = ( Math.random() - 0.5 ) * 4 ;
            var dy = ( Math.random() - 0.5 ) * 4 ;

            this.circleArray.push( new circle( x , y , dx , dy , radius ) ) ;
        }
    }


    this.animateCircles = function(){
        requestAnimationFrame( this.animateCircles.bind( this ) );
        c.clearRect( 0 , 0 , window.innerWidth , window.innerHeight);
        this.circleArray.forEach( function( circle ){
            circle.update();
        });
    }

    this.instantiateEventListeners = function(){
        // on mouse move
        window.addEventListener("mousemove",function( e ) {
            // get mouse position
            settings.mouse.x = e.x ;
            settings.mouse.y = e.y ;
        });

        // on browser window resize
        window.addEventListener("resize",function( e ) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        });
    }
}

var controller = new controller();
controller.start();