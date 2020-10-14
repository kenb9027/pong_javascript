document.addEventListener("DOMContentLoaded", function () {
    var $ball1 = document.querySelector("#ball1");
    var $playground = document.querySelector("#playground");
    var $leftGoal = document.querySelector(".leftGoal");
    var $rightGoal = document.querySelector(".rightGoal");
    var $counterLeft = document.querySelector(".counterLeft");
    var $counterRight = document.querySelector(".counterRight");



    var playgroundWidth = $playground.offsetWidth; //calcul de la largeur du playground
    var playgroundHeight = $playground.offsetHeight; // calcul de la hauteur du playground
    var ball1Width = $ball1.offsetWidth; //calcul de la largeur de la balle
    var goalHeight = $leftGoal.offsetHeight; //calcul de la hauteur des raquettes

    var counterLeft = 0;
    var counterRight = 0



    /**
     * BALL
     */
    // position limite de la balle (vers la droite et vers le bas)
    var limitRight = playgroundWidth - ball1Width;
    var limitTop = playgroundHeight - ball1Width;
    //position actuelle de la balle 
    var positionBallX = limitRight / 2;
    var positionBallY = limitTop / 2;

    var ballSenseX = "right" // go to the left at first
    var ballSenseY = "top" // go to the top at first
    var speedBall = 0;//speed of the ball

    /**
     * GOALS (Raquettes)
     */
    //goals start at the "middle"
    var positionLeftGoalY = playgroundHeight * 0.5 - goalHeight / 2;
    var positionRightGoalY = playgroundHeight * 0.5 - goalHeight / 2;

    const positionLeftGoalX = 35;
    const positionRightGoalX = playgroundWidth - 35;

    // goal don't move at first
    var directionLeftGoal = "STAND";
    var directionRightGoal = "STAND";
    //speed of the goals
    var speedGoal = 5;


    /**
     *  interval ( RENDER )
     */
    setInterval(function () {
        moveBall();
        moveLeftGoal(directionLeftGoal);
        moveRightGoal(directionRightGoal);
        detectColisionLeft();
        detectColisionRight();


    }, 16)


    //ball movement
    function moveBall() {
        //axe horizontal X
        if (ballSenseX === "right") {
            if (positionBallX === limitRight) {
                ballSenseX = "left";

                pointForLeft();

            } else {
                if (positionBallX + speedBall > limitRight) {
                    positionBallX = limitRight;
                }
                else {
                    positionBallX += speedBall;
                }
            }
        }
        if (ballSenseX === "left") {
            if (positionBallX === 0) {
                ballSenseX = "right";

                pointForRight();

            }
            else {
                if (positionBallX - speedBall < 0) {
                    positionBallX = 0;
                }
                else {
                    positionBallX -= speedBall;
                }
            }
        }
        //axe vertical Y
        if (ballSenseY === "top") {
            if (positionBallY === limitTop) {
                ballSenseY = "bottom";
                // console.log("tap to the bottom");
            }
            else {
                if (positionBallY + speedBall > limitTop) {
                    positionBallY = limitTop;
                }
                else {
                    positionBallY += speedBall;
                }
            }

        }
        if (ballSenseY === "bottom") {
            if (positionBallY === 0) {
                ballSenseY = "top";
                // console.log("tap to the top");

            }
            else {
                if (positionBallY - speedBall < 0) {
                    positionBallY = 0;
                }
                else {
                    positionBallY -= speedBall;
                }
            }


        }


        $ball1.style.left = positionBallX + "px";
        $ball1.style.top = positionBallY + "px";

    }

    function pointForRight() {
        counterRight += 1;
        $counterRight.textContent = counterRight;
        positionBallX = 0;
        positionBallY = 0;
    }

    function pointForLeft() {
        counterLeft += 1;
        $counterLeft.textContent = counterLeft;
        positionBallX = limitRight;
        positionBallY = 0;
    }

    //spacebar to stop the ball...
    window.addEventListener("keydown", function (event) {

        if (event.key === " ") {
            speedBall = 0;

        }


    })
    //... and restart the ball 
    window.addEventListener("keyup", function (event) {

        if (event.key === " ") {
            speedBall = 5;
        }
    })
    //change speedBall ( + or -)
    window.addEventListener("keydown", function (event) {

        if (event.key === "+") {
            speedBall = speedBall + 5;
        }

        if (event.key === "-") {
            speedBall = speedBall - 5;
            if (speedBall < 0) {
                speedBall = 0;
            }
        }



    })
    //change ball horizontal direction ( g )
    window.addEventListener("keydown", function (event) {
        if (event.key === "g") {
            if (ballSenseX === "right") {
                ballSenseX = "left";
            }
            else {
                ballSenseX = "right";
            }
        }
    })


    //move goals 
    function moveLeftGoal(directionLeftGoal) {
        if (directionLeftGoal === "DOWN") {
            positionLeftGoalY += speedGoal;

            if (positionLeftGoalY + goalHeight > playgroundHeight) {
                positionLeftGoalY = playgroundHeight - goalHeight;
            }
            $leftGoal.style.top = positionLeftGoalY + "px";
        }
        else if (directionLeftGoal === "UP") {
            positionLeftGoalY -= speedGoal;

            if (positionLeftGoalY < 0) {
                positionLeftGoalY = 0;
            }
            $leftGoal.style.top = positionLeftGoalY + "px";
        }
        else if (directionLeftGoal === "STAND") {
            positionLeftGoalY = positionLeftGoalY;
            $leftGoal.style.top = positionLeftGoalY + "px";

        }
        return positionLeftGoalY;

    }
    function moveRightGoal(directionRightGoal) {
        if (directionRightGoal === "DOWN") {
            positionRightGoalY += speedGoal;

            if (positionRightGoalY + goalHeight > playgroundHeight) {
                positionRightGoalY = playgroundHeight - goalHeight;
            }
            $rightGoal.style.top = positionRightGoalY + "px";
        }
        else if (directionRightGoal === "UP") {
            positionRightGoalY -= speedGoal;

            if (positionRightGoalY < 0) {
                positionRightGoalY = 0;
            }
            $rightGoal.style.top = positionRightGoalY + "px";
        }
        else if (directionRightGoal === "STAND") {
            positionRightGoalY = positionRightGoalY;
            $rightGoal.style.top = positionRightGoalY + "px";

        }
        return positionRightGoalY;

    }

    //left goal (a/q)
    window.addEventListener("keydown", function (event) {
        if (event.key === "q") {
            directionLeftGoal = "DOWN";
        }
        if (event.key === "a") {
            directionLeftGoal = "UP";
        }

    })
    window.addEventListener("keyup", function (event) {
        if (event.key === "q") {
            directionLeftGoal = "STAND";
        }
        if (event.key === "a") {
            directionLeftGoal = "STAND";
        }
    })

    //right goal (p/m)
    window.addEventListener("keydown", function (event) {
        if (event.key === "m") {
            directionRightGoal = "DOWN";
        }
        if (event.key === "p") {
            directionRightGoal = "UP";
        }

    })
    window.addEventListener("keyup", function (event) {
        if (event.key === "m") {
            directionRightGoal = "STAND";
        }
        if (event.key === "p") {
            directionRightGoal = "STAND";
        }
    })

    function detectColisionLeft() {
        if (positionBallX === positionLeftGoalX
            && positionBallY >= positionLeftGoalY
            && positionBallY <= positionLeftGoalY + goalHeight
            && ballSenseX === "left") {

            ballSenseX = "right";

            if (ballSenseY === "top") {
                if (directionLeftGoal === "UP") {
                    ballSenseY = "top";
                }
                else {
                    ballSenseY = "bottom";
                }
            }
            else {
                if (directionLeftGoal === "DOWN") {
                    ballSenseY = "top";
                }
                else {
                    ballSenseY = "bottom";
                }

            }
        }
    }
    function detectColisionRight() {
        if (positionBallX === positionRightGoalX - ball1Width
            && positionBallY >= positionRightGoalY
            && positionBallY <= positionRightGoalY + goalHeight
            && ballSenseX === "right") {

            ballSenseX = "left";

            if (ballSenseY === "top") {
                if (directionRightGoal === "UP") {
                    ballSenseY = "top";
                }
                else if (directionRightGoal === "DOWN") {
                    ballSenseY = "bottom";
                }
            }
            else {
                if (directionRightGoal === "DOWN") {
                    ballSenseY = "top";
                }
                else if (directionLeftGoal === "TOP") {
                    ballSenseY = "bottom";
                }
            }
        }
    }

}) 