// Statement class hierarchy
class Stmt {
  constructor() {
    if (this.constructor === Stmt) {
      throw new Error("Abstract class 'Stmt' cannot be instantiated");
    }
  }
}

class Assign extends Stmt {
  constructor(leftVar, rightExpr) {
    super();
    this.l = leftVar; // l: Var
    this.r = rightExpr; // r: Expr
  }

  toString() {
    return `${this.l} = ${this.r}`;
  }
}

class FuncCallStmt extends Stmt {
  constructor(functionCall) {
    super();
    this.f = functionCall; // f: FuncCall
  }

  toString() {
    return this.f.toString();
  }
}

// Program class to represent the top-level structure
class Program {
  constructor(statements) {
    this.s = statements; // s: Stmt[]
  }

  toString() {
    return this.s.map((stmt) => stmt.toString()).join("\n");
  }
}
// Export new classes
export { Stmt, Assign, FuncCallStmt, Program };
