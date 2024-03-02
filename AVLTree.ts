import AVLNode from "./AVLTreeNode";

class AVLTree {
    public root: AVLNode | null;

    constructor() {
        this.root = null
    }

    private getHeight(node: AVLNode | null): number {
        return node ? node.height : 0;
    }

    private updateHeight(node: AVLNode): void {
        node.height =
            1 + Math.max(this.getHeight(node.left),
                this.getHeight(node.left));
    }

    private getBalanceFactor(node: AVLNode): number {
        return this.getHeight(node.left) - this.getHeight(node.right);
    }

    private rightRotate(node: AVLNode): AVLNode {
        let x: AVLNode = node.left as AVLNode;
        let T2 = x.right as AVLNode;
        x.right = node;
        node.left = T2;
        this.updateHeight(node);
        this.updateHeight(x);
        return x;
    }

    private leftRotate(node: AVLNode): AVLNode {
        let x: AVLNode = node.right as AVLNode;
        let T2 = x.left as AVLNode;
        x.right = node;
        node.left = T2;
        this.updateHeight(node);
        this.updateHeight(x);
        return x;
    }

    //balance
    private balance(node: AVLNode): AVLNode {
        if (node == null) return node;

        const balance = this.getBalanceFactor(node);

        if (balance > 1) {
            if (node.left && this.getBalanceFactor(node.left) >= 0) {
                return this.rightRotate(node)
            } else if (node.left) {
                node.left = this.leftRotate(node.left);
                return this.rightRotate(node)
            }
        } else if (balance < -1) {
            if (node.right && this.getBalanceFactor(node.right) <= 0) {
                return this.leftRotate(node)
            } else if (node.right) {
                node.right = this.leftRotate(node.right);
                return this.leftRotate(node)
            }
        }

        return node;
    }

    public insert(key: number): void {
        this.root = this.insertData(this.root, key);
    }

    private insertData(node: AVLNode | null, key: number): AVLNode {
        if (!node) {
            return new AVLNode(key);
        } else if (key < node.key) {
            node.left = this.insertData(node.left, key);
            node;
        } else if (key > node.key) {
            node.right = this.insertData(node.right, key);
            node;
        } else {
            return node;
        }
        this.updateHeight(node);
        return this.balance(node)
    }



    public inOrderTraversal(node: AVLNode | null): void {
        if (node) {
            this.inOrderTraversal(node.left);
            console.log(node.key);
            this.inOrderTraversal(node.right);
        }
    }


    //search
    public search(key: number): boolean {
        return this.searchNode(this.root, key);
    }

    //searchNode
    private searchNode(node: AVLNode | null, key: number): boolean {
        if (!node) return false;

        if (key < node.key) {
            return this.searchNode(node.left, key)
        }
        if (key > node.key) {
            return this.searchNode(node.right, key)
        }
        else {
            return true;
        }
    }

    //delete
    public delete(key: number): void {
        this.root = this.deleteNode(this.root, key)
    }

    private deleteNode(node: AVLNode | null, key: number): AVLNode | null {
        if (!node) return node

        if (key < node.key) {
            node.left = this.deleteNode(node.left, key)
        }

        if (key > node.key) {
            node.right = this.deleteNode(node.right, key)
        } else {
            if (!node.left && !node.right) {
                return null
            } else if (!node.left) {
                return node.right
            } else if (!node.right) {
                return node.left
            }

            const successor = this.findMinNode(node.right);
            node.key = successor.key;
            node.right = this.deleteNode(node.right, successor.key)
        }

        return this.balance(node);
    }

    private findMinNode(node: AVLNode): AVLNode {
        while (node.left) {
            node = node.left
        }

        return node;
    }

    //count
    public count(): number {
        return this.countNode(this.root)
    }

    //countNodes
    private countNode(node: AVLNode | null): number {
        let count: number = 0;
        if (!node) return count;

        this.countNode(node.left)
        count++
        this.countNode(node.right)
        count++

        return count;

    }

}

let tree = new AVLTree();
tree.insert(55);
tree.insert(60);
tree.insert(70);
tree.insert(80);

console.log(tree.search(70));

console.log(tree.inOrderTraversal(tree.root));



