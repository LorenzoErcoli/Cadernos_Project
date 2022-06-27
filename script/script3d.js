import * as THREE from '../build/three.module.js';

import { OrbitControls } from '../examples/jsm/controls/OrbitControls.js';

let controls, camera, scene, renderer;
let textureEquirec, textureCube, textureEquirecBackground;
let sphereMesh, sphereMaterial, crow_group_spheres;
let sphere_object3d
let radius = 2000

let delta_y = 0
let inc_move = 0




const fold_image = [
	"./examples/textures/zz_Spheres_Img/Shpere01.jpg",
	"./examples/textures/zz_Spheres_Img/Shpere02.jpg",
	"./examples/textures/zz_Spheres_Img/Shpere03.jpg",
	"./examples/textures/zz_Spheres_Img/Shpere04.jpg",
	"./examples/textures/zz_Spheres_Img/Shpere05.jpg",
	"./examples/textures/zz_Spheres_Img/Shpere06.jpg"

]


let img_sphere_counter = (fold_image).length
const crow_degree = THREE.MathUtils.degToRad(360/img_sphere_counter)

init();
animate();




function init() {

	// CAMERAS

	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 100000 );
	camera.position.set( 0, 300, -1300 );

	// SCENE

	scene = new THREE.Scene();

	// Lights

	const ambient = new THREE.AmbientLight( 0xffffff );
	scene.add( ambient );

	// ./examples/Textures

	const loader = new THREE.CubeTextureLoader();
	loader.setPath( './examples/textures/cube/DIARIO2/' );
	textureCube = loader.load( [ 'posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg' ] );
	textureCube.encoding = THREE.sRGBEncoding;






	const textureLoader = new THREE.TextureLoader();
	textureEquirecBackground = textureLoader.load( "./examples/textures/Background_full_pink.jpg" );
	textureEquirecBackground.mapping = THREE.EquirectangularReflectionMapping;
	textureEquirecBackground.encoding = THREE.sRGBEncoding;
	

	textureEquirec = textureLoader.load( fold_image.img_02 );
	textureEquirec.mapping = THREE.EquirectangularReflectionMapping;
	textureEquirec.encoding = THREE.sRGBEncoding;

	scene.background = textureEquirecBackground;

	//

	
	sphere_object3d = new THREE.Object3D();
	const shpere_geometry = new THREE.IcosahedronGeometry( 400, 15 );
	




	for (let num_sphere = 0; num_sphere < img_sphere_counter; num_sphere++) {
		
		textureEquirec = textureLoader.load( fold_image[num_sphere] );
		textureEquirec.mapping = THREE.EquirectangularReflectionMapping;
		textureEquirec.encoding = THREE.sRGBEncoding;

		// sphereMaterial = new THREE.MeshLambertMaterial( { envMap: textureCube} );
		sphereMaterial = new THREE.MeshStandardMaterial( { 
			color: "#FAEFCB",
			emissive: "#000000",
			metalness: 0.25,
			roughness: 0.08,
			map: textureEquirec,
			envMap: textureEquirecBackground
			});

		let delta_x = Math.sin(crow_degree*num_sphere)*radius;
		let delta_y = 0;
		let delta_z = Math.cos(crow_degree*num_sphere)*radius;

		addSphere({
		    name: 'test_sphere1' + num_sphere,
		    x: delta_x,
		    y: delta_y,
			z: delta_z
		});

	}




	crow_group_spheres = new THREE.Group();
	scene.add( crow_group_spheres);
	
	crow_group_spheres.add( sphere_object3d );
	sphere_object3d.position.set( 4, - 3, - 5 );


	//

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.outputEncoding = THREE.sRGBEncoding;
	document.body.appendChild( renderer.domElement );

	//

	controls = new OrbitControls( camera, renderer.domElement );
	controls.minDistance = 850;
	controls.maxDistance = 2000;

	//


	window.addEventListener( 'resize', onWindowResize );





	function addSphere(data){
		    var sphere = new THREE.Mesh(shpere_geometry, sphereMaterial);
		    sphere.position.x = data.x
		    sphere.position.y = data.y
		    sphere.position.z = data.z
		    sphere.rotation.set(0, 0, 0);
		    sphere.name = data.name;
		    sphere_object3d.add(sphere);
	}



}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}


function animate() {


	if(rotate_crow){

		let delta_inc = crow_degree/50
		let stop_crow_degree = crow_degree*(num_rotate_crow)
		console.log(delta_inc)
		if (inc_move< stop_crow_degree) {
			inc_move += delta_inc
			console.log(inc_move)
		}else{
			rotate_crow = false;
			inc_move = inc_move
		}
	}

	crow_group_spheres.rotation.y = THREE.MathUtils.degToRad(180) + inc_move;
	crow_group_spheres.position.z = radius;

	requestAnimationFrame( animate );
	render();



}

function render() {

	camera.lookAt( scene.position );
	renderer.render( scene, camera );

}
