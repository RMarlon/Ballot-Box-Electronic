let yourVoteFor = document.querySelector('.d-1-1 span');
let position = document.querySelector('.d-1-2 span');
let description = document.querySelector('.d-1-4');
let notice = document.querySelector('.d-2');
let side = document.querySelector('.d-1-right');
let numbers = document.querySelector('.d-1-3');

let actualSteps = 0;
let num = '';
let white = false;

function startSteps() {
    let step = steps[actualSteps];
    let numberHtml = '';
    num = '';
    white = false;

    for (let i = 0; i < step.number; i++) {
        if (i === 0) {
            numberHtml += '<div class="number flashes"></div>';
        }
        else {
            numberHtml += '<div class="number"></div>';
        }
    }

    yourVoteFor.style.display = 'none';
    position.innerHTML = step.title;
    description.innerHTML = '';
    notice.style.display = 'none';
    side.innerHTML = '';
    numbers.innerHTML = numberHtml;
}

function actualizeInterface() {
    let step = steps[actualSteps];
    let candidate = step.candidates.filter((item) => {
        if (item.number === num) {
            return true;
        }
        else {
            return false;
        }
    });
    if (candidate.length > 0) {
        candidate = candidate[0];

        yourVoteFor.style.display = 'block';
        notice.style.display = 'block';
        description.innerHTML = `Name: ${candidate.name}<br/> Party: ${candidate.party}`;

        let pictureHtml = '';
        for (let i in candidate.picture) {
            if(candidate.picture[i].small){
                pictureHtml += `<div class="d-1-image small"> <img src="/images/${candidate.picture[i].url}" alt="">${candidate.picture[i].legend}</div>`;
            }
            pictureHtml += `<div class="d-1-image"> <img src="/images/${candidate.picture[i].url}" alt="">${candidate.picture[i].legend}</div>`;

        }
        side.innerHTML = pictureHtml;
    }
    else {
        yourVoteFor.style.display = 'block';
        notice.style.display = 'block';
        description.innerHTML = '<div class="big--side flashes">Vote Null</div>';
    }
}

function cliked(n) {
    let elNumber = document.querySelector('.number.flashes');
    if (elNumber !== null) {
        elNumber.innerHTML = n;
        num = `${num}${n}`;

        elNumber.classList.remove('flashes');
        if (elNumber.nextElementSibling !== null) {
            elNumber.nextElementSibling.classList.add('flashes');
        }
        else {
            actualizeInterface();
        }
    }
}

function blankVote() {
    num = '';
    white = true;
    yourVoteFor.style.display = 'block';
    notice.style.display = 'block';
    numbers.innerHTML = '';
    description.innerHTML = '<div class="big--side flashes">Blank Vote</div>';
    side.innerHTML = '';
}

function correct() {
    startSteps();
}

function confirmOK() {
    let step =steps[actualSteps];
    let confirmationVote = false;

    if(white === true){
        confirmationVote = true;
        console.log('Confirming with white...');
    }
    else if(num.length === step.number){
        confirmationVote = true;
        console.log('Confirming with ' + num)
    }
    
    if(confirmationVote){
        actualSteps++;
        if(steps[actualSteps] !== undefined){
            startSteps();
        }
        else{
            console.log('FIM');
        }
    }
}

startSteps();