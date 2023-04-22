var sorting = false;
import algorithms from "./algorithms.js";
import graph from './graph.js'

const sort = async (algorithm, size, ascending) => {
    if (sorting) return; sorting = true;
    document.getElementById("sorting").innerHTML = "Sorting...";

    var sortArray = new algorithms(); var displayGraph = new graph(document.getElementById('graph'));
    var slider = document.getElementById('delay'); var delay = slider.value; //slider.disabled = true;
    document.querySelectorAll(".sortType").forEach(btn => btn.disabled = true);

    var array = displayGraph.generate(size);
    displayGraph.update(array, size); var sorted = [];

    switch (algorithm) {
        case 'bubbleSort':
            sorted = await sortArray.bubbleSort(array, displayGraph, ascending, delay, sortArray.iteration);
            break;
        case 'insertionSort':
            sorted = await sortArray.insertionSort(array, displayGraph, ascending, delay, sortArray.iteration)
            break;
        case 'mergeSort':
            sorted = await sortArray.mergeSort(array, displayGraph, ascending, delay, sortArray.merge, 0, array.length - 1);
            break;
        case 'bogoSort':
            sorted = await sortArray.bogoSort(array, displayGraph, ascending, delay);
            break;
        case 'quickSort':
            sorted = await sortArray.quickSort(array, displayGraph, ascending, delay, 0, array.length - 1, sortArray.partition);
            break;
    }

    sorting = false; document.querySelectorAll(".sortType").forEach(btn => btn.disabled = false); //slider.disabled = false;
    if (sorted == undefined || !sorted[0]) { document.getElementById("sorting").innerHTML = ""; } else { document.getElementById("sorting").innerHTML = "Sorted!"; }
}

document.querySelectorAll(".algorithmbtn").forEach(btn => {
    var ascending = Array.from(document.querySelectorAll(".sortType")).filter(type => type.id = "ascending");
    btn.onclick = async function () { if (btn.id == "stop") return; sort(btn.id, document.getElementById('noofelements').value, ascending[0].checked) };
});