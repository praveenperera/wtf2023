# What you can do about Bitcoin spam: as a node runner

Source: https://wtfhappenedinfeb2023.com/what-you-can-do-about-it/as-a-noderunner

## As a node runner

- Run [Bitcoin Knots](https://github.com/bitcoinknots/bitcoin) so your node can use stricter relay policy
- Run a [BIP-110 node](https://bip110.org/howto) if you want consensus-level reduced-data enforcement
- If you are using Knots 25.1 or later, set `-permitbaremultisig=0` and `-datacarrier=0`

Strict relay summary for Bitcoin Knots 25.1+:

```text
permitbaremultisig=0
datacarrier=0
```

A more detailed version of these instructions can be found below.

Running a node on a Raspberry Pi?

Don't forget that if you don't even use your node to broadcast your transactions and check the state of the chain or TXs of interest to you on-chain, your node plays no role at all in the network.

It is true though that if it's a full node, it could at least help someone synchronize their own node at some point in the future, which is the reason why it is important to keep the ability to run nodes affordable for most users.

If you're using an Umbrel distribution to run your node, you can install a version of Bitcoin Knots which will filter the inscription related spam. You can do so with this alternative [app store](https://github.com/Retropex/Bitcoin-store).

Detailed instructions to install or update your Umbrel node are provided below.

## Install and run Knots

### APT on Debian GNU/Linux

These steps work on Debian GNU/Linux.

1. Get Léo Haf's key and add it to the apt key list:

   ```sh
   wget --quiet -O - https://apt.orangepill.ovh/gpg-pubkey.asc | sudo tee /etc/apt/keyrings/leohaf.asc
   ```

2. Add the repository to your apt repository list and indicate the GPG key to use:

   ```sh
   echo "deb [signed-by=/etc/apt/keyrings/leohaf.asc arch=$(dpkg --print-architecture)] https://apt.orangepill.ovh bookworm main" | sudo tee /etc/apt/sources.list.d/bitcoin-knots.list
   ```

3. Update apt and install Bitcoin Knots:

   ```sh
   sudo apt update
   sudo apt install bitcoin-knots
   ```

### Ubuntu

Use the [Bitcoin Knots PPA](https://launchpad.net/~luke-jr/+archive/ubuntu/bitcoinknots).

1. Add the PPA:

   ```sh
   sudo add-apt-repository ppa:luke-jr/bitcoinknots
   ```

2. Update apt:

   ```sh
   sudo apt update
   ```

3. Install either the daemon or the GUI:

   ```sh
   sudo apt install bitcoind
   ```

   ```sh
   sudo apt install bitcoin-qt
   ```

### Start9

1. Download the [`.s9pk` package](https://github.com/Retropex/ordisrespector-startos/releases/tag/v26.1.knots20240513)
2. Go to system, sideload a service, then browse
3. Select the `.s9pk` file
4. Click upload and install
5. Click Bitcoin Knots, configure, save, then start

And there you go, you now have Bitcoin Knots. There is also a [video walkthrough](https://www.youtube.com/watch?v=UxhSelzMcAs).

### MyNode

MyNode supports Knots v26.1.knots20240513 since [v0.3.29](https://github.com/mynodebtc/mynode/blob/264aa430b20c0b430d4349f0dc62666ff50adeed/CHANGELOG#L3).

You can also use Ordisrespector to limit spam if you have at least version [v0.3.10](https://github.com/mynodebtc/mynode/blob/776ccb35d1939b76de429dd129247425cd911f17/CHANGELOG#L4).

1. Connect to your MyNode
2. Go to **Settings**
3. Go down to **CUSTOM BITCOIN VERSION**
4. Select Bitcoin Knots v26.1 or Ordisrespector v24.0.1
5. Click **Install**

And there you go, you are now filtering spam using Knots or Ordisrespector on your MyNode.

### Homebrew

Install the dependencies necessary for compilation, then compile and install Bitcoin Knots:

```sh
brew tap retropex/knots
brew install knots
```

You can also install it with the GUI:

```sh
brew install knots-gui
```

### Nixpkgs

Install Bitcoin Knots with Nix package manager:

```sh
nix-shell -p bitcoind-knots
```

More information is available in the [NixOS package search](https://search.nixos.org/packages?channel=24.05&show=bitcoind-knots&from=0&size=50&sort=relevance&type=packages&query=bitcoin+knots).

### nodl

1. Log in to nodl with SSH using the [nodl guide](http://docs.nodl.it/guides/ssh.html)
2. Install Bitcoin Knots:

   ```sh
   sudo add-apt-repository ppa:luke-jr/bitcoinknots
   sudo apt update
   sudo apt install bitcoind
   ```

3. Restart

### DIY node

If you have made your own node on Linux, this [RaspiBolt guide](https://jesterhodl.com/raspibolt-replacing-bitcoin-core-with-knots/) shows how to switch from Bitcoin Core to Bitcoin Knots.

If you want to create a Bitcoin node from scratch on Alpine Linux, you can use the [MicroBolt guide](https://microbolt.guide), but make sure to use Knots or apply the Ordisrespector patch on Core.

There is also a guide for Debian/Ubuntu, which is a bit easier than Alpine Linux. You can find this guide [here](https://scratch-knots.orangepill.ovh/).

### Umbrel App Store edition

Install like any other app.

Optionally read the detailed instructions and video tutorial for switching from Bitcoin Core to Bitcoin Knots: [Umbrel setup guide](https://docs.mempool.guide/page/migrationumbrel.html).

### Umbrel Community edition

If you don't have a node yet:

1. [Install Umbrel](https://umbrel.com/umbrelos#install)
2. Install the alternative app store:
   - Go to app store
   - Click the menu in the top right corner
   - Click community app stores
   - Paste this link as the URL: `https://github.com/Retropex/Bitcoin-store.git`
   - Click open
   - Install the version for your platform

### Umbrel manual switch

These steps save the data of your current node and transfer it to the new one to avoid a new long synchronization.

1. Stop all containers:

   ```sh
   sudo docker stop $(sudo docker ps -q)
   ```

2. Create a backup folder:

   ```sh
   mkdir ~/umbrel/backup
   ```

3. Move all files except the Bitcoin folder:

   ```sh
   cp -r ~/umbrel/app-data/!(bitcoin) ~/umbrel/backup
   ```

4. Delete non-Bitcoin app-data files from the active app-data directory:

   ```sh
   sudo rm -r ~/umbrel/app-data/!(bitcoin)
   ```

5. Move the chain to the root before removing the current node:

   ```sh
   mv ~/umbrel/app-data/bitcoin/data/ ~/umbrel/
   ```

6. Remove the node:

   ```sh
   sudo ./umbrel/scripts/app uninstall bitcoin
   ```

If a message indicates that Tor could not be removed, it is normal. Umbrel does not use Tor only for Bitcoin.

7. Add the Bitcoin Knots app repository:

   ```sh
   sudo ~/umbrel/scripts/repo add https://github.com/Retropex/Bitcoin-store.git
   ```

The command above can take up to five minutes to be fully effective.

8. Choose the right platform and install the new node.

   For arm64, including Raspberry Pi 4 and Apple Silicon Macs:

   ```sh
   sudo ./umbrel/scripts/app install btc-knots
   ```

   For x86-64, including most PCs and servers:

   ```sh
   sudo ./umbrel/scripts/app install btc-knotsx86
   ```

9. Stop the Knots containers before moving data:

   ```sh
   sudo docker container stop btc-knots_server_1 btc-knots_bitcoind_1 btc-knots_i2pd_daemon_1 btc-knots_tor_1 btc-knots_app_proxy_1
   ```

10. Move data:

    ```sh
    sudo rm -r ~/umbrel/app-data/btc-knots/data/*
    mv ~/umbrel/data/ ~/umbrel/app-data/btc-knots/*
    ```

11. Restart your computer:

    ```sh
    sudo shutdown -r now
    ```

And there you go, you now have Ordisrespector through Knots on your node.

### Manual Linux x86-64 switch from Core to Bitcoin Knots

1. Log in to your account in a Linux system, such as remotely via SSH. If Bitcoin processes are running, terminate them.
2. Copy and substitute binary files in their default location. You may also want to verify authenticity of the files by comparing their checksums with the ones listed at [bitcoinknots.org](http://bitcoinknots.org).
3. Optionally edit the `bitcoin.conf` file, in the home directory by default, to insert `datacarrier=0`.
4. Start the program.

## Media

- [Video](https://youtu.be/9JKpA7gqbW0?si=em41HtcNYW-gSYe-)
- [Video](https://www.youtube.com/watch?v=zT4NuAaH3EM)
- [Video](https://www.youtube.com/watch?v=UxhSelzMcAs)
- [Video](https://youtu.be/bCJR7v73r3Q?si=mB9EcrmfaQKk4arI)
- [Video](https://youtu.be/w6G3DDyccdA?si=BT00aBPYo6KwHWTc)
- [Video](https://youtu.be/iK5eny26vVk?si=1QcPZ3GG34uwZxis)
