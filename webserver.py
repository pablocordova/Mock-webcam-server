#!/usr/bin/env python

import flask
from flask import Response

import os

# ----------------------------------------
# 
#Setup flask server
app = flask.Flask(__name__)

# ----------------------------------------
# Static file routing


#We need to set these mappings in order to avoid issues with Flask wanting static resources
#to be inside the python/flask directory structure (ie. 'static' folder at the same level as main py file)
#In our case, this considers static resources are contained in a 'web' folder , sibling to the current folder.

static_folder_root = os.path.join(os.path.dirname(os.path.abspath(__file__)), "./static")

# we also need to define these mappings, since html files don't know about the parent folder called 'web'.
@app.route('/res/<path:filename>')
def serve_static_resource(filename):
    return flask.send_from_directory(os.path.join(static_folder_root, 'res'), filename)

@app.route('/app/<path:filename>')
def serve_static_app(filename):
    return flask.send_from_directory(os.path.join(static_folder_root, 'app'), filename)

@app.route('/vendor/<path:filename>')
def serve_static_lib(filename):
    return flask.send_from_directory(os.path.join(static_folder_root, 'vendor'), filename)

@app.route('/css/<path:filename>')
def serve_static_css(filename):
    return flask.send_from_directory(os.path.join(static_folder_root, 'css'), filename)

@app.route('/')
def index():
    return flask.send_from_directory(static_folder_root, 'index.html')


if __name__ == '__main__':    
    port = 5000
    #app.debug = True  
    app.run(host='0.0.0.0', port=port, threaded=True)  
    #app.run(port=port, threaded=True)




