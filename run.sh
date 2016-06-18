#!/bin/sh
docker run \
	--rm --interactive --tty \
	--name node \
	--volume `pwd`:/usr/src/app/ \
	--workdir /usr/src/app \
	--publish 3000:3000 \
	--publish 3001:3001 \
	node \
	$*
