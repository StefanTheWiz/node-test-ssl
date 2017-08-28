#!/bin/bash
set -ex;

DOMAIN=example.com                                      \
SSL_KEY=/etc/letsencrypt/live/$DOMAIN/privkey.pem       \
SSL_CERT=/etc/letsencrypt/live/$DOMAIN/fullchain.pem    \
node index.js