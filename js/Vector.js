//------------------------------------------------------------------------------
//	Created By: Thaoms Waters
//	Date: 6/17/2016
//	Description: 2d Vector Library
//------------------------------------------------------------------------------
// All vector methods leave the origional vector function unchanged
// Although the vector is not immutible, the functions represent this pattern

var Vector = function(x, y) {
  this.x = x;
  this.y = y;

  // Hashable representation of the class
  this.asKey = function() {
    return [this.x, this.y]
  }
}

// Standard Vectors

Vector.zero = function() {
  return new Vector(0, 0);
}

// Basic Math Functions

Vector.add = function(a, b) {
  return new Vector(a.x + b.x, a.y + b.y);
};

Vector.subtract = function(a, b) {
  return new Vector(a.x - b.x, a.y - b.y);
}

Vector.prototype.multiply = function(scalar) {
  return new Vector(this.x * scalar, this.y * scalar);
}

Vector.prototype.divide = function(scalar) {
  return new Vector(this.x / scalar, this.y / scalar);
}

// Returns a vector that has been rotated by ammount in radians
Vector.prototype.rotate = function(radians) {
  var c = Math.cos(radians);
  var s = Math.cos(radians);
  return new Vector(c * this.x - s * this.y, s * this.x + c * this.y);
}

// Advanced Vector Functions

Vector.dot = function(a, b) {
  return a.x * b.x + a.y * b.y;
}

Vector.cross = function(a, b) {
  return a.x * b.y - a.y * b.x;
}

Vector.prototype.magnitude = function() {
  return Math.sqrt(this.x * this.x + this.y * this.y);
}

// Get the unit vector
Vector.prototype.normalize = function() {
  return this.divide(this.magnitude());
}

// Static Vector Functions

Vector.midpoint = function(a, b) {
  return new Vector((a.x + b.x) / 2, (a.y + b.y) / 2);
}

Vector.proj = function(a, b) {
  return b.multiply(Vector.dot(a, b) / Math.pow(b.magnitude(), 2) );
}

Vector.angle = function(a, b) {
  return acos(Vector.dot(a, b) / (a.magnitude() * b.magnitude()));
}

Vector.distance = function(a, b) {
  return Math.sqrt(Vector.dist2(a, b));
}

// Distance Squared
Vector.dist2 = function(a, b) {
  var dx = a.x - b.x;
  var dy = a.y - b.y;
  return dx*dx + dy*dy;
}

// Distance of a point to a line segment squared
// http://stackoverflow.com/questions/849211/shortest-distance-between-a-point-and-a-line-segment
Vector.distToSegSquared = function(p, v, w) {
  var l = Vector.dist2(v, w);
  if (l == 0) return Vector.dist2(p, v);
  var t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l;
  t = Math.max(0, Math.min(1, t));
  return Vector.dist2(p, new Vector(v.x + t * (w.x - v.x),
                                    v.y + t * (w.y - v.y) ));
}

// Distance of a point to a line segment
Vector.distToSeg = function(p, v, w) {
  return Math.sqrt(Vector.distToSegSquared(p, v, w));
}

// Get the two unit vectors perpendicular to the current vector
// returns (list<Vector>) The vector perpendicular in the order
//  [v < +90deg, v < -90deg]
Vector.prototype.perpendiculars = function() {
  plus90 = new Vector(-this.y, this.x).normalize()
  minus90 = new Vector(this.y, -this.x).normalize()
  return [plus90, minus90];
}