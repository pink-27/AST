// const { SymbolTable, convert, makeStmt, convertSpec } = require("./algo.js");

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

import { Stmt, Assign, FuncCallStmt, Program } from "./atc.js";

class SymbolTable {
  constructor() {
    this.children = [];
    this.par = null;
    this.symtable = new globalThis.Set(); // Using JS Set for symtable
  }

  exists(v) {
    return this.symtable.has(v);
  }
}

// Convert function for expressions
function convert(expr, symtable, add) {
  if (!expr) {
    return null;
  }

  // In JS we'll use instanceof instead of dynamic_cast
  if (expr instanceof Var) {
    if (symtable.exists(expr)) {
      //   console.log(expr.name + add);
      return new Var(expr.name + add);
    }
    return new Var(expr.name);
  }

  if (expr instanceof FuncCall) {
    const args = expr.args.map((arg) => convert(arg, symtable, add));
    // console.log(args);
    return new FuncCall(expr.name, args);
  }

  if (expr instanceof Num) {
    return new Num(expr.value);
  }

  if (expr instanceof Set) {
    const elements = expr.elements.map((element) =>
      convert(element, symtable, add)
    );
    return new Set(elements);
  }

  if (expr instanceof Map) {
    const ret = expr.value.map(([key, value]) => {
      const keyExpr = convert(key, symtable, add);
      const valueExpr = convert(value, symtable, add);
      return [keyExpr, valueExpr];
    });
    return new Map(ret);
  }

  if (expr instanceof Tuple) {
    const exprs = expr.expr.map((exp) => convert(exp, symtable, add));
    return new Tuple(exprs);
  }

  throw new Error("Unknown expression type in convert function");
}

function makeStmt(expr) {
  const call = new FuncCall(expr);
  return new FuncCallStmt(call);
}

function getInputVars(expr, InputVariables, toadd, symtable) {
  if (expr instanceof Var) {
    InputVariables.push(convert(expr, symtable, toadd));
    return;
  }

  if (expr instanceof FuncCall) {
    expr.args.forEach((arg) =>
      getInputVars(arg, InputVariables, toadd, symtable)
    );
  }

  if (expr instanceof Set) {
    expr.elements.forEach((element) =>
      getInputVars(element, InputVariables, toadd, symtable)
    );
  }

  if (expr instanceof Tuple) {
    expr.expr.forEach((exp) =>
      getInputVars(exp, InputVariables, toadd, symtable)
    );
  }

  if (expr instanceof Map) {
    expr.value.forEach(([key, value]) => {
      getInputVars(key, InputVariables, toadd, symtable);
      getInputVars(value, InputVariables, toadd, symtable);
    });
  }

  if (expr instanceof Num) {
    return;
  }
}

function convertSpec(apispec, symtable) {
  const program_stmts = [];

  apispec.blocks.forEach((block, i) => {
    const currtable = symtable.children[i];
    const currblock = block;
    const pre = currblock.pre;
    const call = currblock.call;
    const response = currblock.response;
    const post = response[1]; // Using array access instead of pair

    const InputVariables = [];
    call.args.forEach((arg, i) => {
      getInputVars(arg, InputVariables, i.toString(), currtable);
    });
    // console.log(i.toString());
    const pre1 = convert(pre, currtable, i.toString());
    const callexpr = call; // changed from new Expr(call)
    const call1 = convert(callexpr, currtable, i.toString());
    const post1 = convert(post, currtable, i.toString());

    program_stmts.push(makeStmt(pre1));

    program_stmts.push(makeStmt(call1));
    program_stmts.push(makeStmt(post1));
    // console.log(program_stmts[2].f.name);
  });

  return new Program(program_stmts);
}

// Assumed base classes (you'll need to implement these)

export {
  SymbolTable,
  convert,
  makeStmt,
  convertSpec,
  Program,
  getInputVars,
  FuncCallStmt,
};
