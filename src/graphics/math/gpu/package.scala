package graphics.math.gpu

// Re-export CPU class names for shader contract definitions
// (e.g., type Attribs = (position: Vec2, color: Vec4))
export graphics.math.cpu.{
  Vec2,
  Vec2f,
  Vec3,
  Vec3f,
  Vec4,
  Vec4f,
  Mat2,
  Mat3,
  Mat4,
}
