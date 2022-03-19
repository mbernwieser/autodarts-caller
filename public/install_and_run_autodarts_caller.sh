#!/bin/bash
sudo docker run --name autodarts-caller -v ~/autodarts-caller:/usr/share/nginx/html:ro -v ~/autodarts-caller/nginx.conf:/etc/nginx/conf.d/default.conf:ro -p 8080:80 nginx:alpine
