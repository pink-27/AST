// Enum equivalent for HTTP Response Codes
const HTTPResponseCode = {
  OK_200: "OK_200",
  CREATED_201: "CREATED_201",
};

// Base class for declarations
class Decl {
  constructor(name, typeExpr) {
    this.name = name;
    this.type = typeExpr;
  }
}

class FunDecl {
  constructor(name, params, outp) {
    this.name = name;
    this.params = params;
    this.outp = outp;
  }
}

// Base class for type expressions
class TypeExpr {
  accept(visitor) {
    throw new Error("Method accept() must be implemented");
  }
}

class TypeConst extends TypeExpr {
  constructor(name) {
    super();
    this.name = name;
  }

  accept(visitor) {
    visitor.visit(this);
  }
}

class FuncType extends TypeExpr {
  constructor(params, returnType) {
    super();
    this.params = params;
    this.returnType = returnType;
  }

  accept(visitor) {
    visitor.visit(this);
  }
}

class MapType extends TypeExpr {
  constructor(domain, range) {
    super();
    this.domain = domain;
    this.range = range;
  }

  accept(visitor) {
    visitor.visit(this);
  }
}

class TupleType extends TypeExpr {
  constructor(elements) {
    super();
    this.elements = elements;
  }

  accept(visitor) {
    visitor.visit(this);
  }
}

class SetType extends TypeExpr {
  constructor(elementType) {
    super();
    this.elementType = elementType;
  }

  accept(visitor) {
    visitor.visit(this);
  }
}

// Type Declarations
class TypeDecl {}

class VariantDecl extends TypeDecl {
  constructor() {
    super();
    this.constructors = [];
  }
}

class RecordDecl extends TypeDecl {
  constructor(name, fields) {
    super();
    this.recname = name;
    this.fields = fields;
  }
}

// Expression classes
class Expr {
  accept(visitor) {
    throw new Error("Method accept() must be implemented");
  }
}

class PolymorphicFuncCall extends Expr {
  constructor(name, typeArgs, args) {
    super();
    this.name = name;
    this.typeArgs = typeArgs;
    this.args = args;
  }

  accept(visitor) {
    visitor.visit(this);
  }
}

class Var extends Expr {
  constructor(name) {
    super();
    this.name = name;
  }

  accept(visitor) {
    visitor.visit(this);
  }
}

class FuncCall extends Expr {
  constructor(name, args) {
    super();
    this.name = name;
    this.args = args;
  }

  accept(visitor) {
    visitor.visit(this);
  }
}

class Num extends Expr {
  constructor(value) {
    super();
    this.value = value;
  }

  accept(visitor) {
    visitor.visit(this);
  }
}

class Set extends Expr {
  constructor(elements) {
    super();
    this.elements = elements;
  }

  accept(visitor) {
    visitor.visit(this);
  }
}

class Map extends Expr {
  constructor(value) {
    super();
    this.value = value;
  }

  accept(visitor) {
    visitor.visit(this);
  }
}

class Tuple extends Expr {
  constructor(exprs) {
    super();
    this.expr = exprs;
  }

  accept(visitor) {
    visitor.visit(this);
  }
}

// Function Declaration
class FuncDecl {
  constructor(name, params, returnType) {
    this.name = name;
    this.params = params;
    this.returnType = returnType; // [HTTPResponseCode, TypeExpr]
  }
}

// Initialization
class Init {
  constructor(varName, expression) {
    this.varName = varName;
    this.expr = expression;
  }
}

// API
class API {
  constructor(precondition, functionCall, response) {
    this.pre = precondition;
    this.call = functionCall;
    this.response = response; // [HTTPResponseCode, Expr]
  }
}

// Block class
class Block {
  constructor() {
    // Implementation details
  }
}

// Top-level Spec class
class Spec {
  constructor(globals, types, init, functions, blocks) {
    this.globals = globals;
    this.types = types;
    this.init = init;
    this.functions = functions;
    this.blocks = blocks;
  }
}

// Export all classes
export {
  HTTPResponseCode,
  Decl,
  FunDecl,
  TypeExpr,
  TypeConst,
  FuncType,
  MapType,
  TupleType,
  SetType,
  TypeDecl,
  VariantDecl,
  RecordDecl,
  Expr,
  PolymorphicFuncCall,
  Var,
  FuncCall,
  Num,
  Set,
  Map,
  Tuple,
  FuncDecl,
  Init,
  API,
  Block,
  Spec,
};
