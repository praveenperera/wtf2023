# What you can do about Bitcoin spam: as a node runner

Source: https://wtfhappenedinfeb2023.com/what-you-can-do-about-it/as-a-noderunner

What can you do about it?

## As a node runner

● Use [Bitcoin Knots](https://github.com/bitcoinknots/bitcoin) (instructions below).

● Set the following configuration options: *-permitbaremultisig=0, -datacarrier=0* (if you are using knots 25.1 or later)

A more detailed version of these instructions can be found below.

Running a node on a Raspberry Pi?

Don't forget that if you don't even use your node to broadcast your transactions and check the state of the chain or TXs of interest to you on-chain, your node plays no role at all in the network.

It is true though that if it's a full node, it could at least help someone synchronize their own node at some point in the future, which is the reason why it is important to keep the ability to run nodes affordable for most users.

● If you're using an Umbrel distribution to run your node, you can install a version of Bitcoin Knots which will filter the inscription related spam. You can do so here with an alternative [app store](https://github.com/Retropex/Bitcoin-store).

Detailed instructions to install or update your Umbrel node are provided [below](https://wtfhappenedinfeb2023.com/what-you-can-do-about-it/as-a-noderunner#install-run-knots).

How to Guides

[Run Knots](https://wtfhappenedinfeb2023.com/what-you-can-do-about-it/as-a-noderunner#install-run-knots)

APT (Debian GNU/Linux and Ubuntu)

This steps work on Debian GNU/Linux.

1. Get Léo Haf's key and add it to the apt key list:

wget --quiet -O - https://apt.orangepill.ovh/gpg-pubkey.asc | sudo tee /etc/apt/keyrings/leohaf.asc

2. Add the repository to your apt repository list and indicate the GPG key to use:

echo "deb [signed-by=/etc/apt/keyrings/leohaf.asc arch=$(dpkg --print-architecture)] https://apt.orangepill.ovh bookworm main" | sudo tee /etc/apt/sources.list.d/bitcoin-knots.list

3. Update apt and install Bitcoin Knots:

sudo apt update && sudo apt install bitcoin-knots

For Ubuntu (https://launchpad.net/~luke-jr/+archive/ubuntu/bitcoinknots):

1. sudo add-apt-repository ppa:luke-jr/bitcoinknots
2. sudo apt update

3. sudo apt install bitcoind

or

sudo apt install bitcoin-qt

Start9 steps

On your start9 server:

1. Download the package ([.s9pk](https://github.com/Retropex/ordisrespector-startos/releases/tag/v26.1.knots20240513))

2. Now go to system -> sideload a service -> browse

3. Select the .s9pk file

4. Click on upload & install

5. Click on Bitcoin Knots -> configure -> save -> start

And there you go, you now have Bitcoin Knots. [Video walkthrough](https://www.youtube.com/watch?v=UxhSelzMcAs').

MyNode steps

MyNode supports Knots (v26.1.knots20240513) since [v0.3.29](https://github.com/mynodebtc/mynode/blob/264aa430b20c0b430d4349f0dc62666ff50adeed/CHANGELOG#L3).

You can also use Ordisrespector to limit spam if you have at least version [v0.3.10](https://github.com/mynodebtc/mynode/blob/776ccb35d1939b76de429dd129247425cd911f17/CHANGELOG#L4)

1. Connect to your MyNode

2. Go to **Settings**

3. Go down to **CUSTOM BITCOIN VERSION**

4. Select the desired version: Bitcoin Knots (v26.1) or Ordisrespector (v24.0.1)

5. Click on **Install**

And there you go, you are now filtering spam using Knots or Ordisrespector on your MyNode.

Homebrew steps

This will install the dependencies necessary for compilation then will compile and install Bitcoin Knots:

*brew tap retropex/knots*

*brew install knots*

**You can also install it with the GUI:**

*brew install knots-gui*

Nixpkgs

This will install install Bitcoin Knots with Nix package manager:

*nix-shell -p bitcoind-knots*

More information: [https://search.nixos.org/packages?channel=24.05&show=bitcoind-knots&from=0&size=50&sort=relevance&type=packages&query=bitcoin+knots](https://search.nixos.org/packages?channel=24.05&show=bitcoind-knots&from=0&size=50&sort=relevance&type=packages&query=bitcoin+knots)

nodl

1) Login to nodl: [docs.nodl.it/guides/ssh.html](http://docs.nodl.it/guides/ssh.html)

2) Issue commands:

sudo add-apt-repository ppa:luke-jr/bitcoinknots

sudo apt update

sudo apt install bitcoind

3) Restart.

DIY node steps

If you have made your own node on linux, here is a simple and quick [guide](https://jesterhodl.com/raspibolt-replacing-bitcoin-core-with-knots/) to switch from Bitcoin Core to Bitcoin Knots.

If you want to create from scratch a bitcoin node on alpine linux you can use this [guide](https://microbolt.guide/en-US), but make sure to use [Knots](https://microbolt.guide/en-US/bitcoin/bitcoin-client/bitcoin-knots) or to apply [ordisrespector patch](https://microbolt.guide/en-US/bitcoin/bitcoin-client/bitcoin-core#apply-patches) on Core.

There is also a guide for Debian/Ubuntu, which is a bit easier than alpine linux. You can find this guide [here](https://scratch-knots.orangepill.ovh/).

Umbrel steps

App Store edition

Install like any other app.

Optionally read detailed instructions (and video tutorial) how to migrate from Bitcoin Core to Bitcoin Knots: [https://docs.mempool.guide/page/migrationumbrel.html](https://docs.mempool.guide/page/migrationumbrel.html).

Community edition:

If you don't have a node yet

1. [Install Umbrel](https://umbrel.com/umbrelos#install)

2. Install the alternative app store

● Go to app store

● Click on ... in the top right corner

● Click on community app stores

● Paste this link on URL : https://github.com/Retropex/Bitcoin-store.git

● Click on open

● Finally install the version of your platform.

Manual instruction

In order to avoid a new long synchronization, we will save the data of your current node and then transfer it to the new one.

Let's start by stopping all container:

*sudo docker stop $(sudo docker ps -q)*

Create a backup folder:

*mkdir ~/umbrel/backup*

Move all files except the Bitcoin folder:

*cp -r ~/umbrel/app-data/!(bitcoin) ~/umbrel/backup*

Delete original files:

*sudo rm -r ~/umbrel/app-data/!(bitcoin)*

Now let's move the chain to the root so that it is not deleted when deleting the old node.

*mv ~/umbrel/app-data/bitcoin/data/ ~/umbrel/*

We can now remove the node.

*sudo ./umbrel/scripts/app uninstall bitcoin*

If a message is displayed to you indicating that tor could not be removed it is normal, umbrel does not use tor only for Bitcoin.

*sudo ~/umbrel/scripts/repo add https://github.com/Retropex/Bitcoin-store.git*

The command above can take up to five minutes to be fully effective.

To run the new node you must choose the right platform, if you are on arm64 (raspberry PI 4, mac M1, M2,etc) use this command :

*sudo ./umbrel/scripts/app install btc-knots*

If you are on x86-64 (most PCs, server) use this command:

*sudo ./umbrel/scripts/app install btc-knotsx86*

Now that the new node is installed let's stop it to restore data.

*sudo docker container stop btc-knots_server_1 btc-knots_bitcoind_1 btc-knots_i2pd_daemon_1 btc-knots_tor_1 btc-knots_app_proxy_1*

Now we can restore data.

*sudo rm -r ~/umbrel/app-data/btc-knots/data/*

*mv ~/umbrel/data/ ~/umbrel/app-data/btc-knots/*

We can now restart your computer:

*sudo shutdown -r now*

And there you go, you now have ordisrespector (knots) on your node.

Migrate from Core to Bitcoin Knots (manually, Linux x86-64)

1) Log in to your account in a Linux system, e.g remotely via SSH. If bitcoin processes are running, terminate them, e.g.:

2) Execute the command to copy and substitute binary files in their default location (you may also want to verify authenticity of the files, e.g. by comparing their checksums with the ones listed at [bitcoinknots.org](http://bitcoinknots.org)):

Optionally 3) edit bitcoin.conf file (in home directory by default) to insert the configuration option: datacarrier=0. For example:

4) Finally start the program.

## Media

- [Video](https://youtu.be/9JKpA7gqbW0?si=em41HtcNYW-gSYe-)
- [Video](https://www.youtube.com/watch?v=zT4NuAaH3EM)
- [Video](https://www.youtube.com/watch?v=UxhSelzMcAs)
- [Video](https://youtu.be/bCJR7v73r3Q?si=mB9EcrmfaQKk4arI)
- [Video](https://youtu.be/w6G3DDyccdA?si=BT00aBPYo6KwHWTc)
- [Video](https://youtu.be/iK5eny26vVk?si=1QcPZ3GG34uwZxis)
