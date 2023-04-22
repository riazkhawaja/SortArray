export default class algorithms {
    constructor() {
        this.bubbleSort = bubbleSort;
        this.insertionSort = insertionSort;
        this.iteration = iteration;
        this.mergeSort = mergeSort;
        this.merge = merge;
        this.bogoSort = bogoSort;
        this.quickSort = quickSort;
        this.partition = partition;
    }
}
const bubbleSort = (arr, graph, ascending, delay, iteration) => {
    var slider = document.getElementById('delay'); slider.addEventListener('click', () => { delay = slider.value });
    var kill = document.getElementById('stop');
    return new Promise(async (resolve, reject) => {
        kill.addEventListener('click', async () => { arr = new Array(arr.length).fill(0); await graph.update(arr, arr.length); arr.length = 0; resolve(arr) });
        if (ascending) {
            for (var i = 0; i < arr.length; i++) { // Outer iteration
                for (var j = 0; j < arr.length - i - 1; j++) { // Inner iteration {
                    await iteration(i, j, arr, graph, ascending, delay);
                }
            }
        } else {
            for (var i = arr.length - 1; i > 0; i--) { // Outer iteration
                for (var j = arr.length - 1; j > -i + 1; j--) { // Inner iteration {
                    await iteration(i, j, arr, graph, ascending, delay);
                }
            }
        }
        resolve(arr);
    });
};
const insertionSort = (arr, graph, ascending, delay, iteration) => {
    var slider = document.getElementById('delay'); slider.addEventListener('click', () => { delay = slider.value });
    var kill = document.getElementById('stop');
    return new Promise(async (resolve, reject) => {
        kill.addEventListener('click', async () => { arr = new Array(arr.length).fill(0); await graph.update(arr, arr.length); arr.length = 0; resolve(arr) });
        if (ascending) {
            for (var i = 1; i < arr.length; i++) {
                for (var j = i - 1; j > -1; j--) {
                    await iteration(i, j, arr, graph, ascending, delay);
                }
            }
        } else {
            for (var i = arr.length - 1; i > 1; i--) { // Outer iteration
                for (var j = i - 2; j < arr.length - 1; j++) { // Inner iteration 
                    await iteration(i, j, arr, graph, ascending, delay);
                }
            }
        }
        resolve(arr);
    });
}
const iteration = async (i, j, arr, graph, ascending, delay) => {
    if (arr[j + 1] < arr[j] && ascending || arr[j + 1] > arr[j] && !ascending) {
        var nodeA = document.getElementById(`${j}`); var nodeB = document.getElementById(`${j + 1}`);
        if (ascending) { nodeA.style.backgroundColor = "red"; } else { nodeB.style.backgroundColor = "red"; }
        await new Promise(async (resolve, reject) => {
            [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]] // Swap j+1ith element with j 
            setTimeout(async () => {
                await graph.swap(nodeA, nodeB, delay);
                if (ascending) { nodeA.style.backgroundColor = "white"; } else { nodeB.style.backgroundColor = "white"; }
                resolve();
            }, delay)
        });
    }
}
const mergeSort = async (arr, graph, ascending, delay, merge, l, r) => {
    var slider = document.getElementById('delay'); slider.addEventListener('click', () => { delay = slider.value });
    var kill = document.getElementById('stop');
    try {
        return await new Promise(async (resolve, reject) => {
            kill.addEventListener('click', async () => { delay = 0; arr = new Array(arr.length).fill(0); await graph.update(arr, arr.length); arr.length = 0; resolve(arr) });
            if (l < r) {
                let m = l + Math.floor((r - l) / 2);
                await mergeSort(arr, graph, ascending, delay, merge, l, m);
                await mergeSort(arr, graph, ascending, delay, merge, m + 1, r);
                for (var i = l; i < r + 1; i++) {
                    var node = document.getElementById(`${i}`);
                    if (node) node.style.backgroundColor = "red";
                }
                arr = await merge(arr, l, m, r, graph, ascending, delay);
                await new Promise(async (resolve, reject) => {
                    kill.addEventListener('click', async () => { delay = 0; arr = new Array(arr.length).fill(0); await graph.update(arr, arr.length); arr.length = 0; resolve(arr) });
                    setTimeout(async () => {
                        await graph.update(arr, arr.length);
                        for (var i = l; i < r + 1; i++) {
                            var node = document.getElementById(`${i}`);
                            if (node) node.style.backgroundColor = "white";
                        }
                        resolve();
                    }, delay);
                });
            }
            resolve(arr);
        });
    } catch (err) { }
}
const merge = async (arr, left, mid, right, graph, ascending, delay) => {
    var kill = document.getElementById('stop');
    try {
        return new Promise(async (resolve, reject) => {
            kill.addEventListener('click', async () => { delay = 0; arr = new Array(arr.length).fill(0); await graph.update(arr, arr.length); arr.length = 0; resolve(arr) });
            var start = mid + 1;
            if (arr[mid] <= arr[start]) {
                resolve(arr);
            }
            while (left <= mid && start <= right) {
                if (arr[left] <= arr[start] && ascending || arr[left] >= arr[start] && !ascending) {
                    left++;
                }
                else {
                    var value = arr[start];
                    var index = start;
                    while (index != left) {
                        arr[index] = arr[index - 1];
                        index--;
                    }
                    arr[left] = value;
                    left++;
                    mid++;
                    start++;
                }
            }
            resolve(arr);
        });
    } catch (err) { }
}
const quickSort = async (arr, graph, ascending, delay, low, high, partition) => {
    var slider = document.getElementById('delay'); slider.addEventListener('click', () => { delay = slider.value });
    var kill = document.getElementById('stop');
    try {
        return await new Promise(async (resolve, reject) => {
            kill.addEventListener('click', async () => { delay = 0; arr = new Array(arr.length).fill(0); await graph.update(arr, arr.length); arr.length = 0; resolve(arr) });
            if (low < high) {
                var i = await partition(arr, graph, ascending, delay, low, high);
                for (var j = low; j < high; j++) {
                    var node = document.getElementById(`${j}`);
                    if (node) node.style.backgroundColor = "red";
                }
                var pivot = document.getElementById(`${i}`);
                if (pivot) pivot.style.backgroundColor = "green";
                await new Promise((resolve, reject) => {
                    kill.addEventListener('click', async () => { delay = 0; arr = new Array(arr.length).fill(0); await graph.update(arr, arr.length); arr.length = 0; resolve(arr) });
                    setTimeout(async () => {
                        await graph.update(arr, arr.length);
                        for (var j = low; j < high; j++) {
                            var node = document.getElementById(`${j}`);
                            if (node) node.style.backgroundColor = "white";
                        }
                        resolve();
                    }, delay);
                });
                await quickSort(arr, graph, ascending, delay, low, i - 1, partition);
                await quickSort(arr, graph, ascending, delay, i + 1, high, partition);
            }
            resolve(arr);
        });
    } catch (err) { }
}
const partition = async (arr, graph, ascending, delay, low, high) => {
    var kill = document.getElementById('stop');
    try {
        return await new Promise(async (resolve, reject) => {
            kill.addEventListener('click', async () => { delay = 0; arr = new Array(arr.length).fill(0); await graph.update(arr, arr.length); arr.length = 0; resolve(arr) });
            var temp; var pivot = arr[high];
            var i = (low - 1);
            for (var j = low; j <= high - 1; j++) {
                if (arr[j] <= pivot && ascending || arr[j] >= pivot && !ascending) {
                    i++;
                    temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                }
            }
            temp = arr[i + 1];
            arr[i + 1] = arr[high];
            arr[high] = temp;
            resolve(i + 1);
        });
    } catch (err) { }
}
const bogoSort = async (arr, graph, ascending, delay) => { // Seriously, why?
    var slider = document.getElementById('delay'); slider.addEventListener('click', () => { delay = slider.value });
    var kill = document.getElementById('stop');
    try {
        return await new Promise(async (resolve, reject) => {
            var shuffled = arr.slice();
            kill.addEventListener('click', async () => { shuffled = new Array(arr.length).fill(0); await graph.update(shuffled, shuffled.length); shuffled.length = 0; resolve(shuffled) });
            var sorted = false;
            while (!sorted && arr.length > 0) {
                await new Promise((resolve_1, reject) => {
                    kill.addEventListener('click', async () => { shuffled = new Array(arr.length).fill(0); await graph.update(shuffled, shuffled.length); shuffled.length = 0; resolve(shuffled) });
                    setTimeout(async () => {
                        for (var i = 0; i < shuffled.length - 1; i++) {
                            var rand = Math.floor(Math.random() * shuffled.length);
                            var temp = shuffled[i]; shuffled[i] = shuffled[rand]; shuffled[rand] = temp;
                            var nodeA = document.getElementById(`${i}`); var nodeB = document.getElementById(`${rand}`);
                            await graph.swap(nodeA, nodeB);
                        }
                        sorted = true;
                        for (var i = 0; i < shuffled.length - 1; i++) {
                            if (shuffled[i] > shuffled[i + 1] && ascending || shuffled[i] < shuffled[i + 1] && !ascending) {
                                sorted = false;
                                break;
                            }
                        }
                        await graph.update(shuffled, shuffled.length);
                        resolve_1();
                    }, delay);
                });
            }
            await graph.update(shuffled, shuffled.length);
            resolve(shuffled);
        });
    } catch (err) { }
}

