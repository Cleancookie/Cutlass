# Cutlass

This repo uses yarn workspaces

## Transcoding

Requires Handbrake-cli.  When doing an `npm i` the handbrake cli will be installed automatically on windows and mac.

Linux will require manual installation:

```
sudo add-apt-repository --yes ppa:stebbins/handbrake-releases
sudo apt-get update -qq
sudo apt-get install -qq handbrake-cli
```