function reflex_agent(location, state) {
    if (state == "DIRTY") return "CLEAN";
    else if (location == "A") return "RIGHT";
    else if (location == "B") return "LEFT";
}

function test(states, visitedStates) {
    var currentState = states.join(",");

    if (!visitedStates.has(currentState)) {
        visitedStates.add(currentState);
        document.getElementById("log").innerHTML += `Nuevo estado: ${currentState} (${visitedStates.size}/8)<br>`;
    }

    var location = states[0];
    var state = states[0] == "A" ? states[1] : states[2];
    var action_result = reflex_agent(location, state);
    document.getElementById("log").innerHTML += `Ubicación: ${location} | Acción: ${action_result}<br>`;

    if (action_result == "CLEAN") {
        if (location == "A") states[1] = "CLEAN";
        else if (location == "B") states[2] = "CLEAN";
    } else if (action_result == "RIGHT") states[0] = "B";
    else if (action_result == "LEFT") states[0] = "A";

    if (visitedStates.size === 8) {
        document.getElementById("log").innerHTML += `¡Cada estado posible ha sido visitado!<br>`;
        return;
    }

    // Si la aspiradora se encuentra en un ciclo infinito, hacemos que ensucie aleatoriamente una habitación
    if (visitedStates.size >= 4 && Math.random() < 0.5) {
        let randomRoom = Math.random() < 0.5 ? "A" : "B";
        if (randomRoom == "A") states[1] = "DIRTY";
        else states[2] = "DIRTY";
        document.getElementById("log").innerHTML += `¡Se ha ensuciado la habitación ${randomRoom}!<br>`;
    }

    setTimeout(function() { test(states, visitedStates); }, 2000);
}

var states = ["A", "DIRTY", "DIRTY"];
var visitedStates = new Set();
test(states, visitedStates);