/**
 * Essentials of interpretation.
 * by Dmitry A. Soshnikov <dmitry.soshnikov@gmail.com>
 *
 * Note 1. Stack-based evaluation of the simplest
 * arithmetic expression (AE) written in the prefix notation.
 *
 * See: http://en.wikipedia.org/wiki/Polish_notation
 *
 * This appendix note shows how we can evaluate the
 * simplest arithmetic expression (AE) represented
 * in the prefix (polish) notations directly from the source.
 *
 * In contrast with the lesson 1 we do not assume here
 * that we already have a parsed AST, but instead --
 * we directly "scan & parse & evaluate" the expressions
 * (using the stack) in-place during the scanning stage.
 *
 * MIT Style License
 *
 */

/**
 * evaluate
 * @param {String} exp
 *
 * The "evaluate" function accepts the expression
 * in the prefix notation (parenthesized or not --
 * no matter), and evaluate it using the stack.
 */
function evaluate(exp) {

  /**
   * Stack to keep track of operands
   */
  var stack = [];

  // scanning from right to left
  for (var cursor = exp.length; cursor--;) {

    var current = exp[cursor];

    // if it's an operand, then push it onto the stack
    if (/\d/.test(current)) {
      var number = current;
      // in case if a number has more than one digit, i.e. >= 10
      while ((current = exp[--cursor]) && /\d/.test(current)) {
        number = current + number;
      }
      stack.push(number);
    }

    // else if it's an operator, then calculate the result
    else if (current in operators) {

      // we pop (previously pushed) operands from
      // the stack and apply the operator to them
      var leftOperand  = +stack.pop();
      var rightOperand = +stack.pop();

      // we compute the result and push it onto the stack
      var result = operators[current](leftOperand, rightOperand);
      stack.push(result);

    }

    // else we just skip whitespace and parenthesis

  }

  // finally we return the result
  // which is after all calculations is
  // stored as a single element in the stack
  return stack[0];

}

// operators table
var operators = {
  "+": function (a, b) { return a + b },
  "-": function (a, b) { return a - b },
  "*": function (a, b) { return a * b },
  "/": function (a, b) { return a / b },
};

// tests

console.log("+ 15 2:", evaluate("+ 15 2")); // 17

console.log("(+ 3 (* 1 2)):", evaluate("(+ 3 (* 3 2))")); // 9

// parenthesis are not required since the precedence
// is not ambiguous in the prefix notation
console.log("+ 3 * 3 2:", evaluate("+ 3 * 3 2")); // 9

console.log("+ * 3 3 2:", evaluate("+ * 3 3 2")); // 11
