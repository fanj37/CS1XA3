var oBall = document.querySelector("#ball");  
    var oWard = document.querySelector("#ward"); 
    var oScore = document.querySelector('#score');
    var oWrap = document.querySelector('#wrap');  
    var over = document.querySelector('#gameover'); 
  
    function Breakout(ball, ward, score, wrap, over) {   
        this.ball = ball;  
        this.ward = ward;  
        this.scores = score;  
        this.wrap = wrap;  
        this.over = over;  
        this.x = 0;  
        this.y = 0;  
        this.score = 0;  
    }  
    Breakout.prototype = {    
        init: function () {  
            this.ballstar();    
            this.creatBrick();  
            this.wardMove();   
  
        },  
        creatBrick: function () {  
            var x = document.documentElement.offsetWidth / 2 - document.documentElement.offsetWidth * .05, //设置居中位置  
                w = 45 * 2, 
                h = 15 * 2;  
            for (var i = 1; i <= 8; i++) {  
                for (var j = 0; j < i * 2 - 1; j++) {     
                    var brick = document.createElement("div");  
                    brick.style.top = (i - 1) * h + 'px';  
                    brick.style.left = x - (i * w) + (j * w) + 'px';  
                    this.wrap.appendChild(brick);  
                }  
            }  
        },  
        wardMove: function () {    
            this.ward.style.top = window.innerHeight - 180 + 'px';
            this.ward.style.left = this.x - 60 + 'px';              
            this.addEvent(document, 'mousemove', this.mouseMove.bind(this));   
        },  
        ballstar: function () {    
            var This = this;  
            this.y = window.innerHeight - 200;     
            this.x = window.innerWidth / 2;         
            this.ball.style.top = this.y + 'px';    
            this.ball.style.left = this.x + 'px'; 
            this.ball.speed = 10;                 
            this.ball.width = 15;                 
            this.ball.height = 15;                 
            document.onclick = function () {      
                This.ballMove();                
            }  
  
        },  
        
        mouseMove: function (e) {                               
            e = e || window.event;                             
            var _left = e.pageX - this.ward.offsetWidth / 2;      
            _left = Math.min(window.innerWidth - this.ward.offsetWidth, _left);   
            _left = Math.max(0, _left);                                        
            this.ward.style.left = _left + 'px';                                
        },  
        ballMove: function () {                  
            document.onclick = null;           
            this.ball.xspeed = this.ball.speed; 
            this.ball.yspeed = -this.ball.speed;
            function auto() {                   
                this.x += this.ball.xspeed;   
                this.y += this.ball.yspeed;   
                this.crash();                   
                this.ball.style.left = this.x + 'px';   
                this.ball.style.top = this.y + 'px';   
                requestAnimationFrame(auto.bind(this));   
            }  
  
            auto.call(this);  
        },  
        crash: function () {  
            var maxWidth = window.innerWidth - this.ball.offsetWidth;          
            var maxHeight = window.innerHeight - this.ball.offsetHeight;       
            if (this.y >= maxHeight) {                                       
                this.gameOver();  
            }  
            if (this.x >= maxWidth) {  
                this.ball.xspeed *= -1;                                  
                this.x = maxWidth;                                         
            }  
            if (this.x < 0) {                                            
                this.ball.xspeed = this.ball.speed;  
                this.x = 0;  
            }  
            if (this.y < 0) {                                              
                this.ball.yspeed = this.ball.speed;  
                this.y = 0;  
            }  
            //挡板碰撞检测 xweizhi  
            if (Math.abs(this.x - (this.ward.offsetLeft + (this.ward.clientWidth / 2))) < 60 && Math.abs(this.y - this.ward.offsetTop - 30) < 45) {  
                var color = this.ranColor();  
                this.ward.style.background = color;  
                this.ball.yspeed *= -1;  
                this.y = this.ward.offsetTop - 40;  
            }  
  
            for (var i = this.wrap.children.length - 1; i >= 0; i--) {  
                var ballMx = this.ball.offsetLeft + (this.ball.width / 2);  
                var ballMy = this.ball.offsetTop + (this.ball.height / 2);  
                var brickMx = (this.wrap.children[i].offsetLeft + this.wrap.offsetLeft) + (45 / 2);  
                var brickMy = (this.wrap.children[i].offsetTop + this.wrap.offsetTop) + (15 / 2);  
                if (Math.abs(ballMx - brickMx) <= 45 && Math.abs(ballMy - brickMy) <= 15) {  
                    this.ball.yspeed *= -1;  
                    this.y = brickMy;  
                    this.wrap.removeChild(this.wrap.children[i]);  
                    if (this.wrap.children.length == 0) {  
                        this.gameOver();  
                    }  
                    this.scoreChange();  
                }  
            }  
        },  
        scoreChange: function () {  
            this.score++;  
            this.scores.innerHTML = this.score + '分';  
        },  
        gameOver: function () {  
            this.over.style.display = 'block';  
            this.over.children[0].innerHTML = '总分:' + this.score;  
            var all = document.querySelectorAll('*');  
            for (var i = 0; i < all.length; i++) {  
                all[i].style.cursor = 'auto'  
            }  
            this.ward.style.display = 'none';  
            this.ball.style.display = 'none';  
            this.over.children[1].onclick = function () {  
                window.location.reload();  
            }  
        },  
        
        addEvent: function (element, e, fn) {
            return element.attachEvent ? element.attachEvent('on' + e, fn) : element.addEventListener(e, fn, false);  
        },  
        ranColor: function () {   
            var color = '#';  
            for (var i = 0; i < 6; i++) {  
                color += '0123456789abcdef'[Math.floor(Math.random() * 16)]  
            }  
            return color;  
        },  
    }  
    var breakout = new Breakout(oBall, oWard, oScore, oWrap, over);  
    breakout.init(); 
