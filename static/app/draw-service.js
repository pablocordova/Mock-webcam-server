(function() {
    "use strict";
    angular.module("app")
    .factory("DrawService", DrawService);

    function DrawService() {

        var scene, camera, render, controls;
        var fps, lastRun;
        
        var DrawService = {
            drawObject : drawObject
        };

        return DrawService;

        /**
         * Initialize and draw a object 3D(.stl)
         *
         * @param {json} optCanvas, The desired options to draw canvas
         */    
        function drawObject(optCanvas) {

            initScene(optCanvas);
            renderScene();

        }

        /**
         * Initialize a object 3D, canvas and camera
         *
         * @param {json} optCanvas, The desired options to draw canvas
         */  
        function initScene(optCanvas) {
            //scene
            scene = new THREE.Scene();
            render = new THREE.WebGLRenderer({ alpha: true });
            render.setClearColor(optCanvas.background, optCanvas.alpha);
            render.setSize(optCanvas.width, optCanvas.height);

            //still I dont research "document.querySelector" to change.
            var element = angular.element(document.querySelector("#" + optCanvas.IdDiv));
            element.append(render.domElement);

            //camera
            camera = new THREE.PerspectiveCamera(45, optCanvas.width / optCanvas.height, 0.1, 10000);
            camera.position.set(0, -80, 25);
            //I need rotate the camera because the object is in other coordenates.
            camera.rotation.x = 90 * Math.PI / 180;
            scene.add(camera);

            // Upload format STL(stl) object in the scene
            var loader=new THREE.STLLoader();
            loader.load('res/Person.stl', function (geometry) {
                //define material to use
                var material = new THREE.MeshPhongMaterial({color : 0xff5533, shininess : 200});
                //use the material defined and the geometry of object.
                var mesh = new THREE.Mesh(geometry, material);
                mesh.position.set(0, 0, 0);
                mesh.scale.set(1.5, 1.5, 1.5);
                scene.add(mesh);
            });

            //need lights to view the object
            var light1 = new THREE.PointLight(0xFFFFF1, 0.8);
            light1.position.set(-100, 200, 100);
            scene.add(light1);

            var light2 = new THREE.PointLight(0xFFFFF1, 0.8);
            light2.position.set(100, 200, 100);
            scene.add(light2);

            var light3 = new THREE.PointLight(0xFFFFF1, 0.8);
            light3.position.set(100, 0, 0);
            scene.add(light3);

            //activate control to move the world 3D
            controls = new THREE.OrbitControls(camera, render.domElement);

            lastRun = new Date().getTime();
            requestAnimationFrame(renderScene);
        }

        /**
         * Draw world 3D
         *
         */ 

        function renderScene() {
            //look only to test

            requestAnimationFrame(renderScene);
/*
            var delta = (new Date().getTime() - lastRun)/1000;
            lastRun = new Date().getTime();
            fps = 1/delta;
            console.log(fps);

*/

            //loop renderScene
            //requestAnimationFrame(renderScene);
            //render
            render.render(scene, camera);
            //see changes in controls to update
            controls.update();
        }
    }
})();
