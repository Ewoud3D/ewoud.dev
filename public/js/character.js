import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const vertexShader = `
    varying vec2 texcoord;
    varying vec3 vertexNormal;

    void main()
    {
        texcoord = uv;
        vertexNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const fragmentShader = `
    varying vec2 vertexUV;
    varying vec3 vertexNormal;

    uniform vec4 primary;
    uniform vec4 secondary;
    uniform vec3 directionalLight;

    void main()
    {
        float nDotL = dot(vertexNormal, directionalLight);
        if (nDotL > 0.5)
            nDotL = 1.0;
        else
            nDotL = 0.0;

        gl_FragColor = mix(secondary, primary, nDotL);
    }
`;

const canvas = document.getElementById("characterCanvas");
const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true, canvas});

const aspectRatio = canvas.width / canvas.height;
const size = 5;

const camera = new THREE.OrthographicCamera(size / - 2 * aspectRatio, size / 2 * aspectRatio, size / 2, size / - 2, 0.1, 1000);

camera.position.x = 5.939698;
camera.position.y = 7.25;
camera.position.z = 5.939698;

camera.rotateY(THREE.MathUtils.degToRad(45));
camera.rotateX(THREE.MathUtils.degToRad(-35));

const scene = new THREE.Scene();

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
scene.add(directionalLight);

const planeMaterial = new THREE.MeshLambertMaterial({color: 0x78B7D0});
const planeWidth = 4;
const planeLength = 4;
const planeGeometry = new THREE.PlaneGeometry(planeWidth, planeLength);
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = THREE.MathUtils.degToRad(-90);
scene.add(plane);

const uniforms = {
    primary: { value: hexToRgb("#FCDE70") },
    secondary: { value: hexToRgb("#E8B86D") },
    directionalLight: { value: new THREE.Vector3(-1, 0, 0) }
};

const gltfLoader = new GLTFLoader();
gltfLoader.load('character.glb', (gltfScene) => {
    gltfScene.scene.scale.set(2.3,2.3,2.3);

    gltfScene.scene.traverse((child) => {
        child.material = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: uniforms
        });
    });

    scene.add(gltfScene.scene);
    renderer.render(scene, camera);
});

renderer.render(scene, camera);



function hexToRgb(hex)
{
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16)/255,
        parseInt(result[2], 16)/255,
        parseInt(result[3], 16)/255,
        1.0
     ] : null;
}