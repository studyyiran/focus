#!/bin/bash

echo "pm2 buy start"

pm2 stop buy
pm2 delete buy
pm2 start /home/ec2-user/uptrade-buy/build/compiled.js --name buy