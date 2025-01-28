import {
  SymbolTable,
  convert,
  makeStmt,
  convertSpec,
  Program,
  getInputVars,
  FuncCallStmt,
} from "./algo.js";

import {
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
} from "./api_spec.js";

// Import the required classes and functions

// Utility function for assertions
function assert(condition, message) {
  if (!condition) {
    throw new Error(message || "Assertion failed");
  }
}

// Test SymbolTable
function testSymbolTable() {
  console.log("Testing SymbolTable...");

  const symbolTable = new SymbolTable();
  const var1 = new Var("x");
  const var2 = new Var("y");

  // Test empty table
  assert(!symbolTable.exists(var1), "New symbol table should be empty");

  // Test adding and checking symbols
  symbolTable.symtable.add(var1);
  assert(symbolTable.exists(var1), "Should find added variable");
  assert(!symbolTable.exists(var2), "Should not find unadded variable");

  // Test parent-child relationship
  const childTable = new SymbolTable();
  symbolTable.children.push(childTable);
  childTable.par = symbolTable;
  assert(symbolTable.children.length === 1, "Should have one child");
  assert(childTable.par === symbolTable, "Child should reference parent");
}

// Test convert function
function testConvert() {
  console.log("Testing convert function...");

  const symbolTable = new SymbolTable();
  const testVar = new Var("test");
  symbolTable.symtable.add(testVar);

  // Test variable conversion
  const convertedVar = convert(testVar, symbolTable, "1");
  assert(convertedVar instanceof Var, "Should convert to Var");
  assert(
    convertedVar.name === "test1",
    "Should append suffix to variable name"
  );

  // Test number conversion
  const num = new Num(42);
  const convertedNum = convert(num, symbolTable, "1");
  assert(convertedNum instanceof Num, "Should convert to Num");
  assert(convertedNum.value === 42, "Should preserve number value");

  // Test function call conversion
  const funcCall = new FuncCall("func", [testVar, num]);
  const convertedFunc = convert(funcCall, symbolTable, "1");
  assert(convertedFunc instanceof FuncCall, "Should convert to FuncCall");
  assert(convertedFunc.name === "func", "Should preserve function name");
  assert(convertedFunc.args.length === 2, "Should preserve argument count");

  // Test Set conversion
  const set = new Set([testVar, num]);
  const convertedSet = convert(set, symbolTable, "1");
  assert(convertedSet instanceof Set, "Should convert to Set");
  assert(convertedSet.elements.length === 2, "Should preserve element count");

  // Test Tuple conversion
  const tuple = new Tuple([testVar, num]);
  const convertedTuple = convert(tuple, symbolTable, "1");
  assert(convertedTuple instanceof Tuple, "Should convert to Tuple");
  assert(convertedTuple.expr.length === 2, "Should preserve expression count");

  // Test Map conversion
  const map = new Map([[testVar, num]]);
  const convertedMap = convert(map, symbolTable, "1");
  assert(convertedMap instanceof Map, "Should convert to Map");
  assert(convertedMap.value.length === 1, "Should preserve mapping count");
}

// Test makeStmt function
function testMakeStmt() {
  console.log("Testing makeStmt function...");

  const expr = new FuncCall("test", [new Num(1)]);
  const stmt = makeStmt(expr);

  // console.log(stmt.constructor.name);
  assert(
    stmt.constructor.name === "FuncCallStmt",
    "Should create FuncCallStmt"
  );
  assert(stmt.f instanceof FuncCall, "Should contain FuncCall");
}

// Test getInputVars function
function testGetInputVars() {
  console.log("Testing getInputVars function...");

  const symbolTable = new SymbolTable();
  const inputVars = [];
  const var1 = new Var("x");
  const var2 = new Var("y");

  // Test with nested structure
  const expr = new FuncCall("test", [
    var1,
    new Tuple([var2, new Num(1)]),
    new Set([var1, var2]),
  ]);

  getInputVars(expr, inputVars, "1", symbolTable);
  assert(inputVars.length === 4, "Should collect all variables");
}

// Test convertSpec function
function testConvertSpec() {
  console.log("Testing convertSpec function...");

  const symbolTable = new SymbolTable();
  const childTable = new SymbolTable();
  symbolTable.children.push(childTable);

  // Add variables to the symbol table
  const varX = new Var("x");
  const varY = new Var("y");
  const varZ = new Var("z");
  const varW = new Var("w");

  // Add variables to child table since that's what's used in convertSpec
  childTable.symtable.add(varX);
  childTable.symtable.add(varY);
  childTable.symtable.add(varZ);
  childTable.symtable.add(varW);

  // Create a minimal spec
  const block = {
    pre: new FuncCall("pre", [varX]),
    call: new FuncCall("api", [varY]),
    response: [varZ, new FuncCall("post", [varW])],
  };

  const apispec = {
    blocks: [block],
  };

  const program = convertSpec(apispec, symbolTable);
  assert(program instanceof Program, "Should create Program");
  assert(program.s.length === 3, "Should create three statements");
  assert(
    program.s.every((stmt) => stmt instanceof FuncCallStmt),
    "All statements should be FuncCallStmt"
  );

  // Add some debugging
  // console.log("Symbol table contents:", Array.from(childTable.symtable));
  // console.log("First statement:", program.s[0]);
}

// Run all tests
function runAllTests() {
  try {
    testSymbolTable();
    testConvert();
    testMakeStmt();
    testGetInputVars();
    testConvertSpec();
    console.log("All tests passed successfully! ✅");
  } catch (error) {
    console.error("Test failed! ❌");
    console.error(error);
  }
}

// Execute tests
runAllTests();
