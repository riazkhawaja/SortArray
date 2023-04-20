export default class algorithms {
    constructor() {
        this.bubbleSort = bubbleSort;
        this.insertionSort = insertionSort;
        this.mergeSort = mergeSort;
        this.merge = merge;
        this.bogoSort = bogoSort;
        this.quickSort = quickSort;
        this.partition = partition;
    }
}
const bubbleSort = (arr, graph, ascending, delay) => {
    return new Promise(async resolve => {
        for (let i = 0; i < arr.length; i++) { // Outer iteration
            for (let j = 0; j < arr.length - i - 1; j++) { // Inner iteration
                if (arr[j + 1] < arr[j] && ascending || arr[j + 1] > arr[j] && !ascending) {
                    await new Promise(resolve => {
                        setTimeout(async () => {
                            [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]] // Swap j+1ith element with j 
                            var nodeA = document.getElementById(`${j}`); var nodeB = document.getElementById(`${j + 1}`);
                            await graph.swap(nodeA, nodeB);
                            resolve();
                        }, delay);
                    });
                }
            }
        };
        resolve(arr);
    });
};
const insertionSort = (arr, graph, ascending, delay) => {
    return new Promise(async resolve => {
        for (let i = 1; i < arr.length; i++) {
            for (let j = i - 1; j > -1; j--) {
                if (arr[j + 1] < arr[j] && ascending || arr[j + 1] > arr[j] && !ascending) {
                    await new Promise(resolve => {
                        setTimeout(async () => {
                            [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]] // Swap j+1ith element with j 
                            var nodeA = document.getElementById(`${j}`); var nodeB = document.getElementById(`${j + 1}`);
                            await graph.swap(nodeA, nodeB);
                            resolve();
                        }, delay);
                    });
                }
            }
        };
        resolve(arr);
    });
}
const mergeSort = (arr, graph, ascending, delay, merge, l, r) => {
    return new Promise(async resolve => {
        if (l < r) {
            let m = l + Math.floor((r - l) / 2);
            await mergeSort(arr, graph, ascending, delay, merge, l, m);
            await mergeSort(arr, graph, ascending, delay, merge, m + 1, r);

            arr = await merge(arr, l, m, r, graph, ascending, delay);
            await new Promise(async resolve => {
                setTimeout(async () => {
                    await graph.update(arr, arr.length);
                    resolve();
                }, delay)
            })
        }
        resolve(arr);
    });
}
const merge = (arr, left, mid, right, graph, ascending, delay) => {
    return new Promise(async resolve => {
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
}
const quickSort = (arr, graph, ascending, delay, low, high, partition) => {
    return new Promise(async resolve => {
        if (low < high) {
            var i = await partition(arr, graph, ascending, delay, low, high);
            await new Promise(resolve => {
                setTimeout(async () => {
                    await graph.update(arr, arr.length);
                    resolve();
                }, delay);
            });
            await quickSort(arr, graph, ascending, delay, low, i - 1, partition);
            await quickSort(arr, graph, ascending, delay, i + 1, high, partition);
        }
        resolve(arr);
    });
}
const partition = async (arr, graph, ascending, delay, low, high) => {
    return new Promise(async resolve => {
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
}
const bogoSort = (arr, graph, ascending, delay) => { // Seriously, why?
    return new Promise(async resolve => {
        var shuffled = arr.slice(); var sorted = false;
        while (!sorted) {
            await new Promise(resolve => {
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
                    resolve();
                }, delay);
            });
        }
        resolve(shuffled);
    });
}

