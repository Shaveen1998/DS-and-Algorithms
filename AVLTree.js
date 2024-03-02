"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AVLTreeNode_1 = __importDefault(require("./AVLTreeNode"));
class AVLTree {
    constructor() {
        this.root = null;
    }
    getHeight(node) {
        return node ? node.height : 0;
    }
    updateHeight(node) {
        node.height =
            1 + Math.max(this.getHeight(node.left), this.getHeight(node.left));
    }
    getBalanceFactor(node) {
        return this.getHeight(node.left) - this.getHeight(node.right);
    }
    rightRotate(node) {
        let x = node.left;
        let T2 = x.right;
        x.right = node;
        node.left = T2;
        this.updateHeight(node);
        this.updateHeight(x);
        return x;
    }
    leftRotate(node) {
        let x = node.right;
        let T2 = x.left;
        x.right = node;
        node.left = T2;
        this.updateHeight(node);
        this.updateHeight(x);
        return x;
    }
    //balance
    balance(node) {
        if (node == null)
            return node;
        const balance = this.getBalanceFactor(node);
        if (balance > 1) {
            if (node.left && this.getBalanceFactor(node.left) >= 0) {
                return this.rightRotate(node);
            }
            else if (node.left) {
                node.left = this.leftRotate(node.left);
                return this.rightRotate(node);
            }
        }
        else if (balance < -1) {
            if (node.right && this.getBalanceFactor(node.right) <= 0) {
                return this.leftRotate(node);
            }
            else if (node.right) {
                node.right = this.leftRotate(node.right);
                return this.leftRotate(node);
            }
        }
        return node;
    }
    insert(key) {
        this.root = this.insertData(this.root, key);
    }
    insertData(node, key) {
        if (!node) {
            return new AVLTreeNode_1.default(key);
        }
        else if (key < node.key) {
            node.left = this.insertData(node.left, key);
            node;
        }
        else if (key > node.key) {
            node.right = this.insertData(node.right, key);
            node;
        }
        else {
            return node;
        }
        this.updateHeight(node);
        return this.balance(node);
    }
    inOrderTraversal(node) {
        if (node) {
            this.inOrderTraversal(node.left);
            console.log(node.key);
            this.inOrderTraversal(node.right);
        }
    }
    //search
    search(key) {
        return this.searchNode(this.root, key);
    }
    //searchNode
    searchNode(node, key) {
        if (!node)
            return false;
        if (key < node.key) {
            return this.searchNode(node.left, key);
        }
        if (key > node.key) {
            return this.searchNode(node.right, key);
        }
        else {
            return true;
        }
    }
    //delete
    delete(key) {
        this.root = this.deleteNode(this.root, key);
    }
    deleteNode(node, key) {
        if (!node)
            return node;
        if (key < node.key) {
            node.left = this.deleteNode(node.left, key);
        }
        if (key > node.key) {
            node.right = this.deleteNode(node.right, key);
        }
        else {
            if (!node.left && !node.right) {
                return null;
            }
            else if (!node.left) {
                return node.right;
            }
            else if (!node.right) {
                return node.left;
            }
            const successor = this.findMinNode(node.right);
            node.key = successor.key;
            node.right = this.deleteNode(node.right, successor.key);
        }
        return this.balance(node);
    }
    findMinNode(node) {
        while (node.left) {
            node = node.left;
        }
        return node;
    }
}
let tree = new AVLTree();
tree.insert(55);
tree.insert(60);
tree.insert(70);
tree.insert(80);
console.log(tree.search(70));
console.log(tree.inOrderTraversal(tree.root));
console.log(tree.delete(80));
console.log(tree.inOrderTraversal(tree.root));
