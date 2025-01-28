// Define the ASTVisitor class
class ASTVisitor {
  // Define methods for visiting each type of node
  visitTypeConst(node) {
    throw new Error("visitTypeConst method must be implemented");
  }

  visitFuncType(node) {
    throw new Error("visitFuncType method must be implemented");
  }

  visitMapType(node) {
    throw new Error("visitMapType method must be implemented");
  }

  visitTupleType(node) {
    throw new Error("visitTupleType method must be implemented");
  }

  visitSetType(node) {
    throw new Error("visitSetType method must be implemented");
  }

  visitVar(node) {
    throw new Error("visitVar method must be implemented");
  }

  visitFuncCall(node) {
    throw new Error("visitFuncCall method must be implemented");
  }

  visitNum(node) {
    throw new Error("visitNum method must be implemented");
  }

  visitSet(node) {
    throw new Error("visitSet method must be implemented");
  }

  visitMap(node) {
    throw new Error("visitMap method must be implemented");
  }

  visitTuple(node) {
    throw new Error("visitTuple method must be implemented");
  }
}

export { ASTVisitor };
// Example usage: A derived visitor implementation
// class ConcreteVisitor extends ASTVisitor {
//   visitTypeConst(node) {
//     console.log("Visiting TypeConst node:", node);
//   }

//   visitFuncType(node) {
//     console.log("Visiting FuncType node:", node);
//   }

//   // Other methods would be similarly implemented...
// }

// Example node classes
// class TypeConst {
//   accept(visitor) {
//     visitor.visitTypeConst(this);
//   }
// }

// class FuncType {
//   accept(visitor) {
//     visitor.visitFuncType(this);
//   }
// }

// // Example usage
// const visitor = new ConcreteVisitor();
// const typeConstNode = new TypeConst();
// const funcTypeNode = new FuncType();

// typeConstNode.accept(visitor); // Output: Visiting TypeConst node: TypeConst {}
// funcTypeNode.accept(visitor); // Output: Visiting FuncType node: FuncType {}
