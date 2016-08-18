
var compare = function(a, b) {
  var aName = a.name.toLowerCase(),
    bName = b.name.toLowerCase();

  if (aName < bName)
    return -1;
  if (aName > bName)
    return 1;
  return 0;
};

module.export = {
  compareArrayItems: compare
};