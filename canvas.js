var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d") ;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var mouse = {
    x : undefined,
    y : undefined
};

var maxRadius = 100 ;
var minRadius = 10 ;
var affectedCirclesSpace = 100 ;
var colorArray = [ "#225378" , "#1695A3" , "#ACF0F2" , "#F3FFE2" , "#EB7F00" ];

// on mouse move
window.addEventListener("mousemove",function( e ) {
    // get mouse position
    mouse.x = e.x ;
    mouse.y = e.y ;
});

// on browser window resize
window.addEventListener("resize",function( e ) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

// if using es6 we can say class and generate instances from it but now lets stick with object oriented es5
function circle( x , y , dx , dy , radius ) {
    this.x = x ;
    this.y = y ;
    this.dx = dx ;
    this.dy = dy ;
    this.radius = radius ;
    this.minRadius = radius ;
    this.color = colorArray[ Math.floor( Math.random() * colorArray.length )] ;

    this.draw = function() {
        c.beginPath();
        c.arc( this.x , this.y ,this.radius, 0 ,Math.PI * 2 ,false ) ;
        c.fillStyle = this.color ;
        c.fill();
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
        if(
            ( mouse.x - this.x ) < affectedCirclesSpace &&
            ( mouse.x - this.x ) > -affectedCirclesSpace &&
            ( mouse.y - this.y ) < affectedCirclesSpace &&
            ( mouse.y - this.y ) > -affectedCirclesSpace
        ){
            // circle so close to mouse x position
            // do not increase radius until it's less than 40
            if( this.radius < maxRadius ){
                this.radius += 1 ;
            }
        }else if( this.radius > this.minRadius ){
            this.radius -= 1 ;
        }

        this.draw();
    }

}


var circleArray = [] ;

function init()
{
    circleArray = [] ;
    for( var i = 0 ; i < 500 ; i++ )
    {
        var radius = ( Math.random() * 20 ) + 1  ;
        var x = Math.random() * ( innerWidth - radius * 2 ) + radius ;
        var y = Math.random() * ( innerHeight - radius * 2 ) + radius ;
        var dx = ( Math.random() - 0.5 ) * 4 ;
        var dy = ( Math.random() - 0.5 ) * 4 ;

        circleArray.push( new circle( x , y , dx , dy , radius ) ) ;
    }
}

function animateCircles()
{
    requestAnimationFrame( animateCircles );
    c.clearRect( 0 , 0 , innerWidth , innerHeight);
    circleArray.forEach( function( circle ){
        circle.update();
    });
}

init();
animateCircles();