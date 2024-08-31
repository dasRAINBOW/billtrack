const fullScreenPrompt = document.getElementById('fullScreenPrompt');
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;
var pl1_fouls = 0;
var pl2_fouls = 0;

themeToggle.addEventListener('click', function () {
    const isLightTheme = root.getAttribute('data-theme') === 'light';
    root.setAttribute('data-theme', isLightTheme ? 'dark' : 'light');
    this.textContent = isLightTheme ? '☀' : '☽';
});

pl1_name.addEventListener('click', () => {
    let name = prompt("Please enter name of player 1", "Player 1");
    pl1_name.innerHTML = name;
    if (pl1_name.innerHTML == "") {
        pl1_name.innerHTML = "Player 1";
    }
});

pl2_name.addEventListener('click', () => {
    let name = prompt("Please enter name of player 2", "Player 2");
    pl2_name.innerHTML = name;
    if (pl2_name.innerHTML == "") {
        pl2_name.innerHTML = "Player 2";
    }
});

pl1_decideHalf.addEventListener('click', () => {
    if (confirm('Are you sure?')) {
        pl1_ball.innerHTML = 'Half';
        pl2_ball.innerHTML = 'Full';
        var elements = document.getElementsByClassName('pl_decideHalf');
        for (var i = 0; i < elements.length; i++) {
            elements[i].classList.add('beGone');
        }
    }
})

pl1_decideFull.addEventListener('click', () => {
    if (confirm('Are you sure?')) {
        pl1_ball.innerHTML = 'Full';
        pl2_ball.innerHTML = 'Half';
        var elements = document.getElementsByClassName('pl_decideHalf');
        for (var i = 0; i < elements.length; i++) {
            elements[i].classList.add('beGone');
        }
    }
})

pl2_decideHalf.addEventListener('click', () => {
    if (confirm('Are you sure?')) {
        pl1_ball.innerHTML = 'Full';
        pl2_ball.innerHTML = 'Half';
        var elements = document.getElementsByClassName('pl_decideHalf');
        for (var i = 0; i < elements.length; i++) {
            elements[i].classList.add('beGone');
        }
    }
})

pl2_decideFull.addEventListener('click', () => {
    if (confirm('Are you sure?')) {
        pl1_ball.innerHTML = 'Half';
        pl2_ball.innerHTML = 'Full';
        var elements = document.getElementsByClassName('pl_decideHalf');
        for (var i = 0; i < elements.length; i++) {
            elements[i].classList.add('beGone');
        }
    }
})

pl1_countUp.addEventListener('click', () => {
    let score = parseInt(pl1_score.innerHTML);
    pl1_score.innerHTML = score + 1;
})

pl1_countDown.addEventListener('click', () => {
    let score = parseInt(pl1_score.innerHTML);
    pl1_score.innerHTML = score - 1;
})

pl2_countUp.addEventListener('click', () => {
    let score = parseInt(pl2_score.innerHTML);
    pl2_score.innerHTML = score + 1;
})

pl2_countDown.addEventListener('click', () => {
    let score = parseInt(pl2_score.innerHTML);
    pl2_score.innerHTML = score - 1;
})

pl1_foul.addEventListener('click', () => {
    pl1_fouls += 1;
    if (pl1_fouls == 1) {
        pl1_foul1.style.backgroundColor = "#f00";
    } else if (pl1_fouls == 2) {
        pl1_foul1.style.backgroundColor = "#f00";
        pl1_foul2.style.backgroundColor = "#f00";
    } else if (pl1_fouls == 3) {
        pl1_foul1.style.backgroundColor = "var(--empty)";
        pl1_foul2.style.backgroundColor = "var(--empty)";
        pl1_foul3.style.backgroundColor = "var(--empty)";
        let score = parseInt(pl2_score.innerHTML);
        pl2_score.innerHTML = score + 1;
        var elements = document.getElementsByClassName('pl_decideHalf');
        for (var i = 0; i < elements.length; i++) {
            elements[i].classList.remove('beGone');
        }
        pl1_ball.innerHTML = 'Half / Full';
        pl2_ball.innerHTML = 'Half / Full';
        alert("Three fouls! Enemy scored a game!")
    }
})

pl2_foul.addEventListener('click', () => {
    pl2_fouls += 1;
    if (pl2_fouls == 1) {
        pl2_foul1.style.backgroundColor = "#f00";
    } else if (pl2_fouls == 2) {
        pl2_foul1.style.backgroundColor = "#f00";
        pl2_foul2.style.backgroundColor = "#f00";
    } else if (pl2_fouls == 3) {
        pl2_foul1.style.backgroundColor = "var(--empty)";
        pl2_foul2.style.backgroundColor = "var(--empty)";
        pl2_foul3.style.backgroundColor = "var(--empty)";
        let score = parseInt(pl1_score.innerHTML);
        pl1_score.innerHTML = score + 1;
        var elements = document.getElementsByClassName('pl_decideHalf');
        for (var i = 0; i < elements.length; i++) {
            elements[i].classList.remove('beGone');
        }
        pl1_ball.innerHTML = 'Half / Full';
        pl2_ball.innerHTML = 'Half / Full';
        alert("Three fouls! Enemy scored a game!")
    }
})

function checkTheme() {
    root.setAttribute('data-theme', 'dark');
}

fullScreenPrompt.addEventListener('click', () => {
    if((window.fullScreen) ||
    (window.innerWidth == screen.width && window.innerHeight == screen.height)) {
        document.exitFullscreen();
    } else {
        let requestFullscreen = root.requestFullscreen || root.webkitRequestFullscreen || root.msRequestFullscreen;
        requestFullscreen.call(root);
    }
});