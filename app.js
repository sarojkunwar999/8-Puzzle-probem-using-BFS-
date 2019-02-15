// INITIAL STATE OF THE 8 PUZZLE
let initialState = [
    1, 6, 4,
    2, 0, 3, // 0 FOR NULL
    8, 5, 7
];

let goalState = [
    1, 6, 4,
    2, 3, 7,
    8, 5, 0
];

// ALL NODES
let allNodes = {};

// MOVE FUNCTIONS
function swap(value, swapfrom, swapto) {
    let temp = value[swapto];
    value[swapto] = 0;
    value[swapfrom] = temp;
    return value;
}


function checkGoalState(value) {
    // value is array
    if (JSON.stringify(goalState).indexOf(JSON.stringify(value)) >= 0) {
        return true;
    } else {
        return false;
    }
}

// GET POSSIBLE MOVES
function getPossibleMoves(value) {
    let mid = {
        0: [{ swap: 1 }, { swap: 3 }],
        1: [{ swap: 2 }, { swap: 4 }, { swap: 0 }],
        2: [{ swap: 5 }, { swap: 1 }],
        3: [{ swap: 0 }, { swap: 4 }, { swap: 6 }],
        4: [{ swap: 1 }, { swap: 5 }, { swap: 7 }, { swap: 3 }],
        5: [{ swap: 2 }, { swap: 8 }, { swap: 4 }],
        6: [{ swap: 3 }, { swap: 7 }],
        7: [{ swap: 4 }, { swap: 8 }, { swap: 6 }],
        8: [{ swap: 5 }, { swap: 7 }]
    }

    return mid[value];
};

let visitedNodes = [];
let Queue = [];

// ADD INITAL TO QUEUE
Queue.push(initialState);

let main = function () {
    let index = Queue[0].indexOf(0);
    let moves = getPossibleMoves(index);

    // GET CHILDS
    let childNodes = moves.map(item => {
        let temp = [...Queue[0]];
        return swap(temp, index, item.swap);
    });

    childNodes.forEach(item => {
        if (JSON.stringify(Queue).indexOf(JSON.stringify(item)) == -1) {
            // IF NOT FOUND ON QUEUE THEN INSERT IN QUEUE AND NOT IN VISITED
            if (JSON.stringify(visitedNodes).indexOf(JSON.stringify(item)) == -1) {
                Queue.push(item);
            }
        }
    });

    let visited = Queue.splice(0, 1)[0];
    visitedNodes.push(visited);

    if (checkGoalState(visited)) {
        console.log("FOUND");
        console.log(visitedNodes);

        let output = document.getElementById("output");

        let t = '';
        visitedNodes.forEach((item) => {

            t += '<div class="node">';
            item.forEach(value => {
                t += '<div class="node_item">' + value + '</div>';
            });
            t += '<div class="right_arrow">&rarr;</div>';
            t += '</div>';
        });

        output.innerHTML = t;

        console.log(visitedNodes.length);

        return;
    } else {
        main();
    }
}

window.addEventListener('load', main);