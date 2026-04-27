package examples.geometry3d_scene

import graphics.buffers.*
import graphics.geometry.{*, given}
import graphics.math.cpu.*
import graphics.math.cpu.Mat4
import graphics.math.cpu.Vec3
import graphics.math.cpu.Vec3Buffer
import graphics.math.cpu.given
import graphics.math.gpu.{*, given}
import graphics.painter.*
import graphics.shader.dsl.{*, given}
import graphics.shader.{*, given}
import org.scalajs.dom.HTMLCanvasElement
import org.scalajs.dom.document
import trivalibs.utils.js.*

import scala.scalajs.js.annotation.*

@JSExportTopLevel("main", moduleID = "geometry3d_scene")
def main(): Unit =
  val canvas = document.getElementById("canvas").asInstanceOf[HTMLCanvasElement]

  Painter.init(canvas): painter =>
    type SceneAttribs = (position: Vec3, normal: Vec3)
    type SceneVaryings = (normal: Vec3)
    type SceneUniforms = (viewProj: VertexUniform[Mat4])
    type SceneFields = (Vec3Buffer, Vec3Buffer)

    val shade = painter.shade[SceneAttribs, SceneVaryings, SceneUniforms]:
      program =>
        program.vert: ctx =>
          Block(
            ctx.out.position := ctx.bindings.viewProj * vec4(
              ctx.in.position,
              1.0,
            ),
            ctx.out.normal := ctx.in.normal,
          )
        program.frag[(n: Vec3, diffuse: Float, c: Vec3)]: ctx =>
          val n = ctx.locals.n
          val diffuse = ctx.locals.diffuse
          val c = ctx.locals.c
          val light = vec3(1.0, 2.0, 1.0).normalize
          Block(
            n := ctx.in.normal.normalize,
            diffuse := n.dot(light).max(0.0),
            c := vec3(0.75, 0.65, 0.45) * (diffuse * 0.85 + 0.15),
            ctx.out.color := vec4(c, 1.0),
          )

    val writeVertex: VertexWriterN[Vec3, SceneFields] =
      (pos, normal, ref) =>
        ref.set0(pos.x.toFloat, pos.y.toFloat, pos.z.toFloat)
        ref.set1(normal.x.toFloat, normal.y.toFloat, normal.z.toFloat)

    // -------------------------------------------------------------------------
    // Terrain — 24×24 wave grid with smooth vertex normals
    // -------------------------------------------------------------------------

    val segments = 24
    val terrainGrid = new Grid[Vec3]()
    for gx <- 0 to segments do
      val col = Arr[Vec3]()
      for gz <- 0 to segments do
        val wx = (gx - segments / 2).toDouble
        val wz = (gz - segments / 2).toDouble
        val wy = Math.sin(wx * 0.45) * Math.cos(wz * 0.35) * 0.9
        col.push(Vec3(wx, wy, wz))
      terrainGrid.addCol(col)

    val terrainMesh = Mesh(terrainGrid.ccwQuads.asInstanceOf[Arr[Face[Vec3]]])
    terrainMesh.ensureFaceNormals()

    val terrainGeo = toBufferedGeometry[Vec3, SceneFields](
      terrainMesh,
      MeshBufferType.FaceVerticesWithVertexNormal,
      null,
      writeVertex,
    )
    val terrainShape = painter.shape(
      painter.form(geometry = terrainGeo),
      shade,
      cullMode = CullMode.Back,
    )

    // -------------------------------------------------------------------------
    // Cuboids — flat face normals
    // -------------------------------------------------------------------------

    def makeCuboidShape(cuboid: Cuboid) =
      val mesh = new Mesh[Vec3]()
      val faces = cuboid.faces
      faces.foreach: (face, normal) =>
        mesh.addFace(face, normal)

      val geo = toBufferedGeometry[Vec3, SceneFields](
        mesh,
        MeshBufferType.FaceVerticesWithFaceNormal,
        null,
        writeVertex,
      )
      painter.shape(
        painter.form(geometry = geo),
        shade,
        cullMode = CullMode.Back,
      )

    val towerShape = makeCuboidShape(Cuboid(Vec3(3.0, 1.5, 3.0), 1.0, 3.0, 1.0))
    val platformShape =
      makeCuboidShape(Cuboid(Vec3(8.0, 0.5, 4.5), 3.0, 1.0, 2.0))
    val wallShape = makeCuboidShape(Cuboid(Vec3(4.5, 0.5, 10.0), 1.5, 1.0, 4.0))

    // -------------------------------------------------------------------------
    // Spheres — smooth vertex normals
    // -------------------------------------------------------------------------

    def makeSphereShape(
        vSegs: Int,
        hSegs: Int,
        center: Vec3,
        radius: Double,
    ) =
      val mesh = sphereMesh(vSegs, hSegs)((p, _) => p * radius + center)
      mesh.ensureFaceNormals()
      val geo = toBufferedGeometry[Vec3, SceneFields](
        mesh,
        MeshBufferType.FaceVerticesWithVertexNormal,
        null,
        writeVertex,
      )
      painter.shape(
        painter.form(geometry = geo),
        shade,
        cullMode = CullMode.Back,
      )

    val largeSphereShape = makeSphereShape(14, 20, Vec3(6.0, 2.5, 6.0), 0.9)
    val smallSphereShape = makeSphereShape(10, 14, Vec3(10.0, 1.5, 9.0), 0.5)

    // -------------------------------------------------------------------------
    // Camera and panel
    // -------------------------------------------------------------------------

    val viewProjBinding = painter.binding(Mat4.identity)
    val aspect = canvas.width.toDouble / canvas.height.toDouble
    val proj = Mat4.perspective(Math.PI / 4.0, aspect, 0.1, 200.0)
    val view = Mat4.lookAt(-5.0, 15.0, 25.0, 3.0, 1.0, 5.0, 0.0, 1.0, 0.0)
    viewProjBinding.set(proj * view)

    val sceneShapes = Arr(
      terrainShape,
      towerShape,
      platformShape,
      wallShape,
      largeSphereShape,
      smallSphereShape,
    )

    val panel = painter
      .panel(
        clearColor = (0.05, 0.07, 0.12, 1.0),
        depthTest = true,
        shapes = sceneShapes,
      )
      .bind("viewProj" := viewProjBinding)

    painter.onResize: (w, h) =>
      val p = Mat4.perspective(Math.PI / 4.0, w / h, 0.1, 200.0)
      viewProjBinding.set(p * view)
      painter.paint(panel)
      painter.show(panel)
