import * as T3 from "three";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { PointerLockControls } from "three/examples/jsm/Addons.js";
import { getFramesByRoom } from "./artwork";

interface IVec {
  x: number,
  y: number,
  z: number
}

export default class T3Helper {
  public scene = new T3.Scene();
  public renderer = new T3.WebGLRenderer({ antialias: false });
  public camera: T3.PerspectiveCamera;
  public controls: PointerLockControls;
  public stats = new Stats()

  public loader = new GLTFLoader();
  private keys: any = {};

  private stands: Array<any> = [];
  private frames: Array<any> = [];
  private loadedFrames: Array<any> = []
  private loadedStands: Array<any> = []
  private frameMeshes = new Map();
  private standMeshes = new Map();
  private lastClosestFrame: any;
  private lastClosestStand: any;

  // private _standsMesh: T3.InstancedMesh;

  constructor(width: number, height: number) {
    this.camera = new T3.PerspectiveCamera(40, width / height, 0.1, 1800);

    this.renderer.setSize(width, height);

    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.scene.background = new T3.Color(0xdddddd);

    this.controls = new PointerLockControls(
      this.camera,
      this.renderer.domElement
    );

    document.addEventListener("keydown", this.registerKey.bind(this), false);
    document.addEventListener("keyup", this.registerKey.bind(this), false);

    this.scene.add(new T3.AmbientLight(0xfcfcfc, 1));

    const dlight = new T3.DirectionalLight(0xfff9d8, 0.3);
    dlight.position.set(0, 1, 0);
    // dlight.castShadow = true;
    this.scene.add(dlight);
  }

  lock(menu: HTMLElement) {
    this.controls.lock();

    this.controls.addEventListener("lock", () => (menu.style.display = "none"));
    this.controls.addEventListener(
      "unlock",
      () => {
        let tid = setTimeout(() => {
          menu.style.display = "block";

          clearTimeout(tid);
        }, 1000)
      }
    );
  }

  registerKey(e: any) {
    this.keys[e.code] = e.type == "keydown";
  }

  updateMovement() {
    if (this.keys["KeyW"] || this.keys["ArrowUp"]) {
      this.controls.moveForward(0.05);
    }
    if (this.keys["KeyS"] || this.keys["ArrowDown"]) {
      this.controls.moveForward(-0.05);
    }
    if (this.keys["KeyA"] || this.keys["ArrowLeft"]) {
      this.controls.moveRight(-0.05);
    }
    if (this.keys["KeyD"] || this.keys["ArrowRight"]) {
      this.controls.moveRight(0.05);
    }
  }

  degToRad(deg: number) {
    return (deg * Math.PI) / 180;
  }

  arrayNotEmpty(arr: Array<any>) {
    return arr && Array.isArray(arr) && arr.length > 0;
  }

  setCameraPosition() {
    this.camera.position.set(0.2, 1.4, 8);
  }

  isZOffset (rotation: number) {
    return !rotation
  }

  isXOffset(rotation: number) {
    return rotation
  }

  getXOffset(angle: number, offset: number = 0.01) {
    let sign = angle < 0 ? -1 : 1;

    return offset * sign;
  }

  setMatrix(position: T3.Vector3, scale: T3.Vector3, matrix: T3.Matrix4) {
    const quaternion = new T3.Quaternion();

    matrix.compose(position, quaternion, scale);
  }

  setObjectPosition (obj: T3.Object3D, pos: IVec) {
    obj.position.set(
      pos.x,
      pos.y,
      pos.z
    );
  }

  setRotation(obj: T3.Object3D, angle: number, rotation: string = 'rotateY') {
    if (rotation == 'rotateY') return obj.rotateY(this.degToRad(angle))

    obj.rotateZ(this.degToRad(angle))
  }

  loadImage(image: string, pos: any, rotation?: any) {
    let loader = new T3.TextureLoader();

    var material = new T3.MeshLambertMaterial({
      map: loader.load(
        `/assets/uploads/artwork/portraits/${image}`
      ),
    });

    // create a plane geometry for the image with a width of 10
    // and a height that preserves the image's aspect ratio
    var geometry = new T3.PlaneGeometry(0.533, 0.572 * 0.75);

    // combine our image geometry and material into a mesh
    var mesh = new T3.Mesh(geometry, material);

    // set the pos of the image mesh in the x,y,z dimensions
    if (pos) mesh.position.set(pos.x, pos.y + 0.45, pos.z + 0.01);

    if (rotation) {
      this.setRotation(mesh, rotation, 'rotateY')

      if (rotation > 0) mesh.position.setX(pos.x + 0.01)
      else mesh.position.setX(pos.x - 0.01)
    }

    // add the image to the scene
    this.scene.add(mesh);
  }

  loadModel (artwork: any) {
    if (!this.lastClosestStand) return;

    this.loader.load(
      `/assets/uploads/artwork/models/${artwork.model.folder}/scene.gltf`,
      (gltf) => {
        gltf.scene.children[0].scale.set(0.01, 0.01, 0.01);

        const x = this.lastClosestStand?.x || 0,
          y = 0.55,
          z = this.lastClosestStand?.z || 0;

        gltf.scene.children[0].position.set(x, y, z);

        // this.scene.add(gltf.scene.children[0]);
      }
    );
  }

  displayPainting(portrait: any) {
    // setFramePortrait(this.lastClosestFrame.userData.frameId, portrait._id)

    this.loadImage(portrait.image, this.lastClosestFrame.position, this.lastClosestFrame.userData.rotation);
  }

  displayModel(artwork: any) {
    // setFramePortrait(this.lastClosestFrame.userData.frameId, portrait._id)

    this.loadModel(artwork)
  }

  displayPaintings() {
    (async () => {
      this.frames = (await getFramesByRoom()).frames;

      this.frames.forEach((frame: any) => {
        this.loader.load(`/3D/picture_frame_slim/scene.gltf`, (gltf) => {
          this.setObjectPosition(gltf.scene.children[0], frame.position)

          const rotation = frame.rotation;
          const position = frame.position;

          const textMesh = this.makeText('0909')

          if (textMesh)
            this.setObjectPosition(textMesh, {
              x: position.x + (this.isXOffset(rotation) ? this.getXOffset(rotation) : 0),
              y: .7,
              z: position.z + (this.isZOffset(rotation) ? 0.01 : 0)
            })

          if (rotation) {
            this.setRotation(gltf.scene.children[0], rotation, 'rotateZ')

            if (textMesh) this.setRotation(textMesh, rotation)
          }

          gltf.scene.children[0].scale.set(1.6, 0.7, 1);

          gltf.scene.children[0].userData.frameId = frame._id
          gltf.scene.children[0].userData.rotation = rotation
          gltf.scene.children[0].userData.hasPortrait = frame.hasPortrait;

          this.loadedFrames.push(gltf.scene.children[0])

          if (textMesh) this.scene.add(textMesh)

          this.scene.add(gltf.scene);

          if (frame.hasPortrait)
            this.loadImage(frame.portrait.image, position, rotation);
        });
      });

      // Make this work

      // this.loader.load(`/3D/frame_2/scene.gltf`, (gltf) => {
      //   let positions = this.frames.map((frame) => new T3.Vector3(frame.position.x, frame.position.y, frame.position.z));

      //   this.instanceRenderer(this.traverseGroup(gltf.scene.children[0]), positions, new T3.Vector3(.1, .1, .1))
      // })
    })()
  }

  displayStands () {
    (async () => {
      this.stands = [
        {
          position: {
            x: -3.4,
            y: 0,
            z: 4
          }
        },
        {
          position: {
            x: -3.4,
            y: 0,
            z: 0
          }
        },
        {
          position: {
            x: -3.4,
            y: 0,
            z: -4
          }
        },
        {
          position: {
            x: 3.4,
            y: 0,
            z: 4
          }
        },
        {
          position: {
            x: 3.4,
            y: 0,
            z: 0
          }
        },
        {
          position: {
            x: 3.4,
            y: 0,
            z: -4
          }
        },
      ];

      this.stands.forEach((stand: any) => {
        this.loader.load(`/3D/pedestal/scene.gltf`, (gltf) => {
          this.setObjectPosition(gltf.scene.children[0], stand.position)
          gltf.scene.children[0].scale.set(.05, .05, .05);

          gltf.scene.children[0].userData.standId = Math.random()

          this.loadedStands.push(gltf.scene.children[0])

          this.scene.add(gltf.scene);
        });
      });

      // this.loader.load(`/3D/pedestal/scene.gltf`, (gltf) => {
      //   let positions = this.stands.map((stand) => new T3.Vector3(stand.position.x, stand.position.y, stand.position.z));

      //   this.instanceRenderer(this.traverseGroup(gltf.scene.children[0]), positions, new T3.Vector3(.5, .5, .5))
      // });
    })()
  }

  makeText(txt: string) {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) return null;

    ctx.fillStyle = 'green'
    ctx.font = '30px sans-serif'
    ctx.fillText(txt, 0, 30)

    const texture = new T3.Texture(canvas)
    texture.needsUpdate = true

    var material = new T3.MeshBasicMaterial({
      map: texture,
      side: T3.DoubleSide,
    })

    return new T3.Mesh(new T3.PlaneGeometry(0.41, 0.44 * 0.75), material)
  }

  instanceRenderer(meshes: Array<any>, positions: Array<any>, scale: T3.Vector3) {
    meshes.forEach(mesh => {
      const matrix = new T3.Matrix4();

      console.log(mesh);
      

      const instancedMesh = new T3.InstancedMesh(mesh.geometry, mesh.material, positions.length);

      for (let i = 0; i < positions.length; i++) {
        this.setMatrix(positions[i], scale, matrix);

        instancedMesh.setMatrixAt(i, matrix);
      }

      this.scene.add(instancedMesh)
    });
  }

  traverseGroup (obj: any) {
    if (obj.isMesh) return [obj]

    let meshes: Array<T3.Mesh> = [];

    obj.children.forEach((child: any) => {
      meshes = [...meshes, ...this.traverseGroup(child)];
    });

    return meshes;
  }

  findClosestFrames () {
    let closestPosition: number,
      closestFrame: any

    this.loadedFrames.forEach(object => {
      if (object.userData.hasPortrait) return;

      const position = object.position;

      const distance = this.camera.position.distanceTo(
        new T3.Vector3(position.x, position.y, position.z)
      );

      if (!closestPosition || closestPosition && closestPosition > distance) {
        closestFrame = object;
        closestPosition = distance;
      }
    });

    if (!(this.lastClosestFrame && closestFrame && this.lastClosestFrame.userData.frameId == closestFrame.userData.frameId)) {
      if (!closestFrame) return;
      
      let meshes = this.frameMeshes.get(closestFrame.userData.frameId);

      if (!meshes) {
        meshes = this.traverseGroup(closestFrame);

        this.frameMeshes.set(closestFrame.userData.frameId, meshes)
      }

      meshes.forEach((mesh: any) => {
        mesh.material.emissive = new T3.Color('darkgray')
      });

      // unset the gray color from previous frame
      if (this.lastClosestFrame){
        let lastframeMeshes = this.frameMeshes.get(this.lastClosestFrame.userData.frameId);

        if (!lastframeMeshes) {
          lastframeMeshes = this.traverseGroup(this.lastClosestFrame);

          this.frameMeshes.set(this.lastClosestFrame.userData.frameId, lastframeMeshes)
        }

        lastframeMeshes.forEach((mesh: any) => {
          mesh.material.emissive = new T3.Color(0x000000)
        });
      }
    }

    this.lastClosestFrame = closestFrame.clone();
  }

  findClosestStands() {
    let closestPosition: number,
      closestStand: any

    this.loadedStands.forEach(obj => {
      if (obj.userData.hasPortrait) return;

      const position = obj.position;

      const distance = this.camera.position.distanceTo(
        new T3.Vector3(position.x, position.y, position.z)
      );

      if (!closestPosition || closestPosition && closestPosition > distance) {
        closestStand = obj;
        closestPosition = distance;
      }
    });

    if (!(this.lastClosestStand && this.lastClosestStand.userData.standId == closestStand.userData.standId)) {
      if (!closestStand) return;

      let meshes = this.standMeshes.get(closestStand.userData.standId);

      if (!meshes) {
        meshes = this.traverseGroup(closestStand);

        this.standMeshes.set(closestStand.userData.standId, meshes)
      }

      meshes.forEach((mesh: any) => {
        mesh.material.emissive = new T3.Color('darkgray')
      });

      // unset the gray color from previous frame
      if (this.lastClosestStand) {
        let lastStandMeshes = this.frameMeshes.get(this.lastClosestStand.userData.standId);

        if (!lastStandMeshes) {
          lastStandMeshes = this.traverseGroup(this.lastClosestStand);

          this.frameMeshes.set(this.lastClosestStand.userData.standId, lastStandMeshes)
        }

        lastStandMeshes.forEach((mesh: any) => {
          mesh.material.emissive = new T3.Color(0x000000)
        });
      }
    }

    this.lastClosestStand = closestStand.clone();
  }

  render() {
    this.findClosestFrames()
    this.findClosestStands()

    this.renderer.render(this.scene, this.camera);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    this.updateMovement();

    this.render();

    this.stats.update()
  }
}
