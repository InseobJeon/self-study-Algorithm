
# Binary Search Tree

- 해당 자료구조가 나온 이유
    1. To store information with hierarchy, such as file system
    2. To find and insert information efficiently

- 해당 자료구조의 Time Complexity : `O(log(n))`
    - 해당 자료를 참고하였습니다.

    [Know Thy Complexities!](https://www.bigocheatsheet.com/)

- DFS(Depth-First Search) and BFS(Breadth-First Search)
    - DFS : [http://upload.wikimedia.org/wikipedia/commons/7/7f/Depth-First-Search.gif](http://upload.wikimedia.org/wikipedia/commons/7/7f/Depth-First-Search.gif)
    - BFS : [https://upload.wikimedia.org/wikipedia/commons/5/5d/Breadth-First-Search-Algorithm.gif](https://upload.wikimedia.org/wikipedia/commons/5/5d/Breadth-First-Search-Algorithm.gif)

    ## BST, 그리고 DFS 와 BFS 의 구현

    - pseudo code

    ```jsx
    ✔️ making Tree class with a value as class constructor's argument
    and it's property is... 
    	-this.value = value
    	-this.rightChild
    	-this.leftChild

    ------------------------------------------------------------------

    ✔️ making method to add child node to root(or parent) node
    	* basically, not allow the case of parent node value === child node value

    1-1. parent node value > child node value 
    	check. is parent node's leftValue is empty? 
    		1-1. if empty -> set child node to parent node's left value
    		1-2. if filled -> adding child node to parent node's left value 

    1-2 parent node value < child node value
    	check. is parent node's rightValue is empty?
    	2-1. if emtpy -> set child node to parent node's right Value
    	2-2. if filled -> adding child node to parent node's right value

    ------------------------------------------------------------------

    ✔️ making method to search Tree by depth-first order 
    	and it's traversal style is inorder traversal
    	* using stack for check easily parent node(which is not travled)

    1. start from root node
    2. make empty array 'notTraveledNodeForDFS' to check node not traveled
    3. make empty array 'arraySortedByDepth' to get traveled node value

    4. check. is this node has leftChild?
    	while node doesnt have leftChild 
    		push it's value to notTraveledNodeForDFS
    		run routine 4
    5. if routine 4 is end, push it's value to arraySortedByDepth
    6. while notTraveledNodeForDFS.length === 1
    	notTraveledNodeForDFS.pop() 
    	then push it to arraySortedByDepth
    7. routine 4 with root.rightChild as argument
    8. if 7 is ended, return arraySortedByDepth

    ------------------------------------------------------------------

    ✔️ making method to search Tree by breadth-first order 
    	* using queue for check easily parent node(which is not travled)

    1. start from root node
    2. make empty array 'tempStorageForBFS' to check node not traveled
    3. make empty array 'arraySortedByBreadth' to get traveled node value

    4. check. is this node has child?
    	* doesnt matter if child is leftChild or rightChild
    	push all of child's value to arraySortedByBreadth from left to right
    	push all of child as itself to tempStorageForBFS from left to right
    5. check 4 for each element of tempStorageForBFS
    6. if all element of tempStorageForBFS have no child, return arraySortedByBreadth

    ```

    ## 구현해야 할 클래스와 메서드, 그리고 함수

    - `Tree` class
        - 기본값인 `value`를 가진다
        - 새로운 `child node`를 추가할 때
            - `value` 보다 값이 적다면 → `leftChild` 에 해당 node 를 할당한다
            - `value` 보다 값이 크다면 → `rightChild` 에 해당 node 를 할당한다
            - `leftChild`혹은 `rightChild` 에 이미 어떤 값이 존재한다면 각각의 값을 비교해 동적으로 새로운 `child`를 적절한 곳에 추가한다

    ```jsx
    //  Tree class with value, left child and right child
    let Tree = function(value) {
        this.value = value;
        this.leftChild;
        this.rightChild;
    };
    ```

    - `Tree.prototype.addChild`  : 지정된 Tree 에 `Child node`를 추가하는 메서드를 구현하였다
        - 만약 `child node` 를 추가하려는 어떠한 `node`에 해당 `node`의 `child`가 이미 다 차있다면 → 새로운 `Tree` 를 만든다.

    ```jsx
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
    ```

    - `depthFirstSearch(node)` : `node`를 출발점으로 하여, 트리 전체를 깊이우선탐색(`DFS`) 방식으로, 그리고 그 중에서도 중위순회( `inorder traversal` )로 순회한다.
        - 참조를 더 용이하게 하기 위해, `stack` 형 자료구조를 응용하였다 (`notTraveledNodeForDFS`)

    ```jsx
    // make a array 'notTraveledNodeForDFS' to check which node is not visited
    let notTraveledNodeForDFS = [];
    // make a array 'arraySortedByDepth' to contain values as order of depth-first
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
    ```

    - `breadthFirstSearch(node)`: `node`를 출발점으로 하여, 트리 전체를 너비우선탐색(`BFS`) 방식으로 순회한다.
        - 참조를 더 용이하게 하기 위해, `queue` 형 자료구조를 응용하였다(`tempStorageForBFS`)

    ```jsx
    let tempStorageForBFS = [];
    let arraySortedByBreadth = [];
    let counter = 0;

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
    ```

    ---