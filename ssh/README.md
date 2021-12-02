# SSH keypair authentication

We have decided to use SSH-keypairs instead of passwords for remote authentication to the backend server.
The instructions below will demonstrate how to generate the keypair using:
* Terminal (Linux/MacOS)
* PuTTY (Windows)

Note: 
* **DO NOT PUT YOUR PRIVATE KEYS IN ANY OF THE REPOS**

* **DO NOT POST THEM ON THE INTERNET**

* **IF A LEAK OCCURS, NOTIFY ME (Nikita) OR THE TEACHER OF THE FACT THAT A KEY HAS BEEN LEAKED SO WE CAN ROTATE ALL THE KEYS AND PREVENT BADDIES FROM CONNECTING TO OUR SERVER**

Thank you.

## Using the terminal and a bash script (Linux/MacOS)
#### Prerequisites (For MacOS)
Make sure you have your ssh daemon running [by following this article.](https://osxdaily.com/2016/08/16/enable-ssh-mac-command-line/ "OSX Daily - How to Enable SSH on a Mac from the Command Line")

#### Generating the keys
I wrote a simple bash script in order to automate the process a little bit which can be found in this folder under the name "copykeys.sh"
(creative name, I know)

* Clone this repo or paste the contents of copykeys.sh into a file with the same name and extension.
* Go to the script location (in terminal) and run it using `bash copykeys.sh`
* Alternatively you can make it executable by running `chmod +x copykeys.sh` and then running the file with `./copykeys.sh`

Then the script will start generating the ssh keypair for you.
The default location for linux is `/home/$USER/.ssh/id_rsa` and is something similar for MacOS.
If you don't want to specify a separate location, you can just press `Enter`

Next, the ssh-keygen will ask if you want a passphrase for your key, this passphrase is unique for your key only.
Alternatively you can leave the field empty and press `Enter` if you don't want one.
After re-entering the passphrase, the script will attempt to connect to the backend server.
If you are connecting to the backend for the first time, ssh daemon will ask you if you trust this source.
Type `yes` in the console and press `Enter`.

Now the daemon will prompt you for the password for the first user `opppi1`, enter the password provided by the course.
After entering the password the `ssh-copy-id` binary will copy you public-key into opppi1's `authorized_keys` file.
Repeat the password entering process for opppi2&3. 


Voilà you're set to connect to any of the users on the backend server by either running:

```ssh 'opppi{num}@195.148.21.92'```

or

```ssh -i /path/to/key opppi{num}@195.148.21.92```

If you set a passphrase, upon a successful connection, ssh will ask you for your unique passphrase for the key.



## Using the terminal **without** the script

If you would like to torture yourself with mindless repetition run the following in the terminal:

`ssh-keygen`

This starts the key generation binary and it will ask for a location where to store your public and private keys.
The default location for linux is `/home/$USER/.ssh/id_rsa` and is something similar for MacOS.
If you don't want to specify a separate location, you can just press `Enter`

Next, the ssh-keygen will ask if you want a passphrase for your key, this passphrase is unique for your key only.
Alternatively you can leave the field empty and press `Enter` if you don't want one.

Now your keys should be generated.

Next run `ssh-copy-id -i /path/to/private/key opppi{num}@195.148.21.92`

If you are connecting to the backend for the first time, ssh daemon will ask you if you trust this source. Type `yes` in the console and press `Enter`.
Then, enter the password for the user and the key should be copied for the specific user.

Repeat `ssh-copy-id -i /path/to/private/key opppi{num}@195.148.21.92` for every user from 1-3.

Done, now you can run:

```ssh 'opppi{num}@195.148.21.92'```

or

```ssh -i /path/to/key opppi{num}@195.148.21.92```

If you set a passphrase, upon a successful connection, ssh will ask you for your unique passphrase for the key.

## Using PuTTY (Windows)
__Source: [upcloud.com](https://upcloud.com/community/tutorials/use-ssh-keys-authentication/ "SSH keys for authentication - PuTTY")__

First, you need to download and install [PuTTY](https://www.chiark.greenend.org.uk/~sgtatham/putty/ "PuTTY - A free SSH and Telnet Client")

Then, use the built-in key generator from PuTTY to create a new key pair.

1. Click the Keygen button at the bottom of the PuTTY Configuration window to get started.

![](https://upcloud.com/wp-content/uploads/2015/09/puttytray_keygen.png)

Then in the Key Generator window, check that the Type of key to generate at the bottom is set to SSH-2 RSA. 
The older SSH-1 was the first version on the standard but is now generally considered obsolete. 
Most modern servers and clients support SSH-2.

2. Click the Generate button to begin.

![](https://upcloud.com/wp-content/uploads/2015/09/puttytray_keygen_generate.png)

3. Keep moving your mouse over the blank area in any manner to help generate randomness for a few moments until the progress is complete.

With the keys finished, PuTTY will show the relative information about the pair along with the public key for easier copying.

4. (Optional) Enter a key passphrase in the 2 empty fields for the added security before continuing. The passphrase will protect your key from unauthorized use should someone be able to copy it. However, some automation tools might not be able to unlock passphrase-protected private keys.

5. Click the Save private key button and store it somewhere safe. Generally anywhere in your user directory is fine as long as your PC is password protected. Before closing the keygen, you may want to copy the public key to your clipboard, but you can always get it later as well.

![](https://upcloud.com/wp-content/uploads/2015/09/putty_keygen_save_privatekey.png)

Now that you have a new key saved on your computer, you’ll need to import it into the PuTTY key agent.

6. Click the Agent button to open the key manager in the PuTTY Configuration window.

![](https://upcloud.com/wp-content/uploads/2015/09/puttytray_agent.png)

7. Click Add Key button in the Key List, then browse to the location you saved the private key, select it and click Open.

Enter your key passphrase if asked.

![](https://upcloud.com/wp-content/uploads/2015/09/puttytray_agent_add_key.png)

This will import the key to your PuTTY client, but you still need to copy the public key over to your server.

8. Open an SSH connection to your cloud server and go to the SSH key directory.

`cd ~/.ssh/`

9. Open or create the default file OpenSSH looks for public keys called authorized_keys.

`nano authorized_keys`

10. Paste the public key into the file by simply right-clicking the SSH client window. Make sure the key goes on a single line for OpenSSH to be able to read it.

11. Repeat steps 8 - 10 for users opppi1 to opppi3

When you’ve copied the public key over to the authorized keys list, save the file and exit the editor. 
You can now test the public key authentication by logging in to your server again. 
You should not get asked for your password, but instead logged straight in with the key. 
If it’s not working, check that your private key is unlocked at your SSH Agent and try again.
