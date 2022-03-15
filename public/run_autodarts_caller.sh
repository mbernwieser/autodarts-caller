#!/bin/bash
sudo docker run --rm -it -v ~/autodarts-caller:/usr/share/nginx/html:ro -v ~/autodarts-caller/nginx.conf:/etc/nginx/conf.d/default.conf:ro -p 80:80 nginx:alpine
