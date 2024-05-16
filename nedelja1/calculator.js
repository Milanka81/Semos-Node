function multiplication(num1) {
  return function (num2) {
    return num1 * num2;
  };
}

const division = (a) => (b) => a / b;

module.exports = {
  multiplication,
  division,
};
