#!/bin/bash

ssh-keygen

for i in {1..3}
do
	ssh-copy-id -i ~/.ssh/id_rsa opppi$i@195.148.21.92
done
