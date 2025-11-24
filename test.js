import BinarySearch from "../binary-search.js";

// Creamos un árbol inicial
const tree = new BinarySearch.Tree([10, 5, 15, 3, 7, 12, 18]);

console.log("Árbol original:");
BinarySearch.prettyPrint(tree.root);

// TEST insert
tree.insert(6);
tree.insert(13);
console.log("\nDespués de insertar 6 y 13:");
BinarySearch.prettyPrint(tree.root);

// TEST deleteItem
tree.deleteItem(5);  // nodo con dos hijos
tree.deleteItem(18); // nodo hoja
console.log("\nDespués de borrar 5 y 18:");
BinarySearch.prettyPrint(tree.root);

// TEST find
console.log("\nBuscar nodos:");
console.log("Encontrar 12:", tree.find(12) ? "Sí" : "No");
console.log("Encontrar 100:", tree.find(100) ? "Sí" : "No");

// TEST levelOrderForEach
console.log("\nRecorrido Level Order:");
tree.levelOrderForEach(node => console.log(node.data));

// TEST inOrderForEach
console.log("\nRecorrido In Order:");
tree.inOrderForEach(node => console.log(node.data));

// TEST preOrderForEach
console.log("\nRecorrido Pre Order:");
tree.preOrderForEach(node => console.log(node.data));

// TEST postOrderForEach
console.log("\nRecorrido Post Order:");
tree.postOrderForEach(node => console.log(node.data));

// TEST height
console.log("\nAltura de nodos:");
console.log("Altura de 10:", tree.height(10));
console.log("Altura de 12:", tree.height(12));
console.log("Altura de 3:", tree.height(3));

// TEST depth
console.log("\nProfundidad de nodos:");
console.log("Profundidad de 10:", tree.depth(10));
console.log("Profundidad de 12:", tree.depth(12));
console.log("Profundidad de 3:", tree.depth(3));

// TEST isBalanced
console.log("\n¿Está balanceado?:", tree.isBalanced());

// TEST rebalance
tree.insert(50);
tree.insert(60);
tree.insert(70);
console.log("\nÁrbol desequilibrado:");
BinarySearch.prettyPrint(tree.root);
console.log("¿Está balanceado?:", tree.isBalanced());

tree.rebalance();
console.log("\nDespués de rebalance:");
BinarySearch.prettyPrint(tree.root);
console.log("¿Está balanceado?:", tree.isBalanced());
