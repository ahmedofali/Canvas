var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d") ;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// if using es6 we can say class and generate instances from it but now lets stick with object oriented es5
function circle( x , y , dx , dy , radius ) {
    this.x = x ;
    this.y = y ;
    this.dx = dx ;
    this.dy = dy ;
    this.radius = radius ;

    this.draw = function() {
        c.beginPath();
        c.arc( this.x , this.y ,this.radius, 0 ,Math.PI * 2 ,false ) ;
        c.strokeStyle = "blue" ;
        c.fill();
        c.stroke();
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

        this.draw();
    }

}

var circleArray = [] ;

for( var i = 0 ; i < 100 ; i++ )
{
    var radius = 30 ;
    var x = Math.random() * ( innerWidth - radius * 2 ) + radius ;
    var y = Math.random() * ( innerHeight - radius * 2 ) + radius ;
    var dx = ( Math.random() - 0.5 ) * 8 ;
    var dy = ( Math.random() - 0.5 ) * 8 ;

    circleArray.push( new circle( x , y , dx , dy , radius ) ) ;
}

function animateCircles()
{
    requestAnimationFrame( animateCircles );
    c.clearRect( 0 , 0 , innerWidth , innerHeight);
    circleArray.forEach( function( circle ){
        circle.update();
    });
}

animateCircles();