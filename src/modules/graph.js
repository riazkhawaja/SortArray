export default class graph {
    constructor(graph) {
        this.graph = graph;
        this.generate = generate;
        this.update = update;
        this.swap = swap;
    }
}
const generate = size => {
    var arrSize = size < 5 ? 5 : size; arrSize = size > 50 ? 50 : size;
    return Array.from({ length: arrSize }, () => Math.floor(10 + Math.random() * arrSize * 3));
}
const update = async (array, size) => {
    return new Promise(resolve => {
        var graph = document.getElementById('graph'); graph.innerHTML = ''; 
        var adjwidth = Math.max(25 * size, 500);
        var gapwidth = adjwidth * 2 / 5 / size; var barwidth = adjwidth * 3/5 / size;
        graph.style = `width:${adjwidth + gapwidth}px;border: 3px solid white; padding-left:${gapwidth - 3}px;`
        var maxValue = Math.max(...array);
        for (let i = 0; i < size; i++) {
            var bar = document.createElement("div"); var gap = document.createElement("div");
            bar.id = `${i}`; bar.style = `width:${barwidth}px;background-color: white;height: ${(array[i] * 400 / maxValue) - 3}px;float: left; margin-top:${400 - (array[i] * 400 / maxValue)}px;`;
            gap.style = `width:${gapwidth}px;background-color: transparent;height: ${400}px;float: left;`;
            graph.appendChild(bar); graph.appendChild(gap);
        }
        resolve();
    });
}
const swap = (nodeA, nodeB) => {
    return new Promise(resolve => {
    [nodeA.style.height, nodeB.style.height] = [nodeB.style.height, nodeA.style.height];
    [nodeA.style.marginTop, nodeB.style.marginTop] = [nodeB.style.marginTop, nodeA.style.marginTop];
    resolve();
    });
}
