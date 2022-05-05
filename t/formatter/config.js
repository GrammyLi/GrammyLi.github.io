// Editor - Code Style - JavaScript - Spaces - Around Operators
const config = {
  before_parentheses: {
    fun_declaration: false,
    fun_call: false,
    if: false,
    while: false,
    switch: false,
    catch: false,
    in_fun: false,
    in_async_arrow: false,
  },
  around_operators: {
    assignment: false, // =, +=, 
    logical: false, // && , ||
    relational: false, // < > , <=, >=
    bitwise: false, // &, |, ^
    additive: false, // +, -
    multiplicative: false, // *, /, %
    shift: false, // <<, >>, >>>
    unary_additive: false, // +. -. ++, --
    arrow: false, //  =>
    before_unary_not: false, // not ! and !!
    after_unary_not: false, // not ! and !!
  },
  before_left_brace: {
    func: true,
  },
};
