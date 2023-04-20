var sorting = false;
import algorithms from "./algorithms.js";
import graph from './graph.js'

const sort = async (algorithm, size, ascending) => {
    if (sorting) return; sorting = true;
    document.getElementById("sorting").innerHTML = "Sorting...";

    var sortArray = new algorithms(); var displayGraph = new graph(document.getElementById('graph'));
    var slider = document.getElementById('delay'); var delay = slider.value; slider.disabled = true;
    document.querySelectorAll(".sortType").forEach(btn => btn.disabled = true);

    var array = displayGraph.generate(size);
    displayGraph.update(array, size);

    switch (algorithm) {
        case 'bubbleSort':
            var sorted = await sortArray.bubbleSort(array, displayGraph, ascending, delay);
            break;
        case 'insertionSort':
            var sorted = await sortArray.insertionSort(array, displayGraph, ascending, delay);
            break;
        case 'mergeSort':
            var sorted = await sortArray.mergeSort(array, displayGraph, ascending, delay, sortArray.merge, 0, array.length - 1);
            break;
        case 'bogoSort':
            var sorted = await sortArray.bogoSort(array, displayGraph, ascending, delay);
            break;
        case 'quickSort':
            var sorted = await sortArray.quickSort(array, displayGraph, ascending, delay, 0, array.length - 1, sortArray.partition);
            break;
    }

    document.getElementById("sorting").innerHTML = "Sorted!";
    sorting = false; slider.disabled = false; document.querySelectorAll(".sortType").forEach(btn => btn.disabled = false);
}

document.querySelectorAll(".algorithmbtn").forEach(btn => {
    var ascending = Array.from(document.querySelectorAll(".sortType")).filter(type => type.id = "ascending");
    btn.onclick = async function () { sort(btn.id, document.getElementById('noofelements').value, ascending[0].checked) };
});