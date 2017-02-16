(function() {
    "use strict";

    angular.module("app")
    .factory("StreamService", StreamService);

    StreamService.$inject = ["$interval"];

    function StreamService($interval) {

        var StreamService = {
            getVideoStream : getVideoStream
        };

        return StreamService;

        /**
         * Initialize and draw canvas to video
         *
         * @param {json} optSqr, The desired options to draw the video
         */ 

        function getVideoStream(opts) {
            
            //image initial
            var image = new Image();
            // create the canvas to render to
            var canvas = document.createElement("canvas");
            //methods to draw Image
            var context = canvas.getContext("2d"); 
            // src img from webserver
            //image.src = "http://" + opts.host + ":" + opts.port + "/" + opts.topicServer;
            image.src = "http://" + opts.host + ":" + opts.port + "/stream?topic=" + opts.topic;
            console.log(image.src);
            // src img from image base64
            //image.src = opts.srcImg;
		
            //define canvas parameters
            canvas.width = opts.width;
            canvas.height = opts.height;
            canvas.style.background = "#bbbbbb";    //only is canvas background, not important.
            //with methods angular
            var element = angular.element(document.querySelector("#" + opts.divID));
            element.append(canvas);
            $interval(function() {draw(canvas, image, context);}, opts.refreshRate)
        }

        /**
         * draw video constantly
         *
         * @param {DOM} canvas, canvas where need draw the video
         * @param {image} image, the image to draw.
         * @param {context} context, methods to draw.
         */ 

        function draw(canvas, image, context) {
            //draw video
            context.drawImage(image, 0, 0, canvas.width, canvas.height);

            // fix problem with Firefox
            if (navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
                var aux = image.src.split("?killcache=");
                image.src = aux[0] + "?killcache=" + Math.random(42);
            }

        }   
    }
})();
