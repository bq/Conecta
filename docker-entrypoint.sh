#!/bin/sh -xe
if [ -d /root/config/ ]; then
    cat /root/config/env >> /usr/src/app/.env
fi

/bin/bash -c "yarn run start -- -p 3000"
