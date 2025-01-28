const { ASTVisitor } = require("./ASTVisitor.js");

// class ASTVisitor {
//   visit(node) {
//     throw new Error("Method not implemented");
//   }
// }

class ASTVisitor {
  visit(node) {
    throw new Error("Method not implemented");
  }
}

class PrintVisitor extends ASTVisitor {
  constructor() {
    super();
    this.indent = 0;
  }

  printIndent() {
    return "  ".repeat(this.indent);
  }

  // We'll use console.log instead of cout
  visit(node) {
    // In JavaScript, we can use a more dynamic approach using the constructor name
    const methodName = `visit${node.constructor.name}`;
    if (this[methodName]) {
      return this[methodName](node);
    }
    throw new Error(`No visit method for ${node.constructor.name}`);
  }

  visitTypeConst(node) {
    console.log(`${this.printIndent()}TypeConst: ${node.name}`);
  }

  visitFuncType(node) {
    console.log(`${this.printIndent()}FuncType:`);
    this.indent++;

    console.log(`${this.printIndent()}Parameters:`);
    this.indent++;
    node.params.forEach((param) => {
      this.visit(param);
    });
    this.indent--;

    console.log(`${this.printIndent()}Return type:`);
    this.indent++;
    this.visit(node.returnType);
    this.indent -= 2;
  }

  visitMapType(node) {
    console.log(`${this.printIndent()}MapType:`);
    this.indent++;

    console.log(`${this.printIndent()}Domain:`);
    this.indent++;
    this.visit(node.domain);
    this.indent--;

    console.log(`${this.printIndent()}Range:`);
    this.indent++;
    this.visit(node.range);
    this.indent -= 2;
  }

  visitTupleType(node) {
    console.log(`${this.printIndent()}TupleType:`);
    this.indent++;
    node.elements.forEach((elem) => {
      this.visit(elem);
    });
    this.indent--;
  }

  visitSetType(node) {
    console.log(`${this.printIndent()}SetType:`);
    this.indent++;
    this.visit(node.elementType);
    this.indent--;
  }

  visitVar(node) {
    console.log(`${this.printIndent()}Var: ${node.name}`);
  }

  visitFuncCall(node) {
    console.log(`${this.printIndent()}FuncCall: ${node.name}`);
    this.indent++;
    node.args.forEach((arg) => {
      this.visit(arg);
    });
    this.indent--;
  }

  visitNum(node) {
    console.log(`${this.printIndent()}Num: ${node.value}`);
  }

  visitSet(node) {
    console.log(`${this.printIndent()}Set:`);
    this.indent++;
    node.elements.forEach((elem) => {
      this.visit(elem);
    });
    this.indent--;
  }

  visitMap(node) {
    console.log(`${this.printIndent()}Map:`);
    this.indent++;
    // Assuming value is an array of [key, value] pairs
    node.value.forEach(([key, value]) => {
      this.visit(key);
      this.visit(value);
    });
    this.indent--;
  }

  visitTuple(node) {
    console.log(`${this.printIndent()}Tuple`);
    this.indent++;
    node.expr.forEach((e) => {
      this.visit(e);
    });
    this.indent--;
  }
}

export { PrintVisitor, printAST };
