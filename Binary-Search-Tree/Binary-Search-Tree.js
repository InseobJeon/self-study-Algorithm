// Making binary search tree with Depth First Search
 

//  Tree class with left child and right child
let Tree = function(value) {
    // set Tree's value by it's argument 'value'
    this.value = value;
    // rightChild and leftChild's default value is undefined
    this.rightChild;
    this.leftChild;
};

//  Add node to tree's child
Tree.prototype.addChild = function(childValue) {
    // making closure function `checkValue` to use recursion
    // case1. parent node value > child node value
    if (this.value > childValue) {
        // check. is parent node's leftValue is empty? 
        if (this.leftChild === undefined) {
            // 1-1. if empty -> set child node as a Tree to parent node's left value
            this.leftChild = new Tree(childValue);
            // 1-2. if filled -> adding child node with compare childValue with node.leftChild.value again
        } else {
            this.leftChild.addChild(childValue);
        }
        // 1-2 parent node value < child node value
    } else if(this.value < childValue) {
        // check. is parent node's rightValue is empty?
        if (this.rightChild === undefined) {
            // 2-1. if emtpy -> set child node to parent node's right Value
            this.rightChild = new Tree(childValue)
        } else {
            // 2-2. if filled -> adding child node with compare childValue with node.rightChild.value again
            this.rightChild.addChild(childValue)
        }
    }
}

// depth-first search method, show argument by depth-first order
// * inorder traversal
// * using stack 

let notTraveledNodeForDFS = [];
let arraySortedByDepth = [];

function depthFirstSearch(node) {
    if (node.leftChild) {
        notTraveledNodeForDFS.push(node.value);
        depthFirstSearch(node.leftChild);
    } arraySortedByDepth.push(node.value);
    while (notTraveledNodeForDFS.length === 1) {
        arraySortedByDepth.push(notTraveledNodeForDFS.pop());
    } if (node.rightChild) {
        depthFirstSearch(node.rightChild);
    } else {
        return arraySortedByDepth;
    }
    return arraySortedByDepth;
}


let tempStorageForBFS = [];
let arraySortedByBreadth = [];
let counter = 0;

// depth-first search method, show argument by depth-first order
// * using queue 

function breadthFirstSearch(node) {
    // get root node value at first with specific condition
    if (counter === 0) {
        arraySortedByBreadth.push(node.value);
        counter ++;
    } 
    if (node.leftChild) {
        arraySortedByBreadth.push(node.leftChild.value);
        tempStorageForBFS.push(node.leftChild);
    } 
    if (node.rightChild) {
        arraySortedByBreadth.push(node.rightChild.value);
        tempStorageForBFS.push(node.rightChild);
    } 
    tempStorageForBFS.map(arg => {
        tempStorageForBFS.shift();
        breadthFirstSearch(arg);
    }) 
    if (!node.rightChild && !node.leftChild){
        // tempStorageForBFS.shift();
        if (tempStorageForBFS.length === 0) {
            return arraySortedByBreadth;
        } 
    } 
    return arraySortedByBreadth
}
// Test code
let root = new Tree(7)
root.addChild(3)
root.addChild(8)
root.addChild(1)
root.addChild(5)
root.addChild(6)
root.addChild(10)
root.addChild(4)

// console.log(root)

let BFS = breadthFirstSearch(root);
// BFS.map(arg => {
//     console.log(arg)
// })
console.log(BFS);

// let DFS = depthFirstSearch(root)
// // DFS.map(arg => {
// //     console.log(arg)
// // })
// console.log(DFS)
