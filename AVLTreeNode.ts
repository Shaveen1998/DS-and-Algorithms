class AVLNode {
    key: number;  //student marks are taken as key
    left: AVLNode | null;
    right: AVLNode | null;
    height: number;

    constructor(key: number) {
        this.key = key;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

export default AVLNode