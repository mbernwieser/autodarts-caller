# autodarts-caller

Let Russ Bray call your score in your [autodarts.io](https://github.com/autodarts/docs)-setup.

## Installation

1. Log-in to your raspberry pi via ssh
1. Go to your home-directory: `cd ~`
1. Install `docker`:
    1. `curl -fsSL https://get.docker.com | sh`
    1. Check if installation was succesful by running a hello-world image `sudo docker run --rm armhf/hello-world`
    - If you see no errors everything should be fine
1. Download and unzip `autodarts-caller`:
    1. `wget https://cdn.discordapp.com/attachments/953370701329481741/953411857383817266/autodarts-caller.zip`
    1. `unzip -o autodarts-caller.zip -d .`
1. Go to the `autodarts-caller`-directory you just created:
    1. `cd autodarts-caller/`
    1. Make run-script executable: `chmod +x run_autodarts_caller.sh`
1. Add sounds to `autodarts-caller/sounds/`:
    1. Requirement: all sound files must be .mp3
    1. Possible sounds:
        - 1.mp3 - 180.mp3
        - 0.mp3 ("no score")
        - gameon.mp3 ("gameon" on succesful connect)
    1. An easy way to add the sounds is to use a programm like `FileZilla`:
        1. Download and install `FileZilla` on the system where you connect to the raspberry-pi from
        1. Open `FileZilla` and connect with the following parameters:
            1. `Server`: `<ip-address-of-your-raspberry-pi>`
            1. `Username`: `<your-raspberry-pi-username>` (default = "pi")
            1. `Password`: `<your-raspberry-pi-password>`
            1. `Port`: `22`
        1. Now you should be able to just drag and drop the sounds from your system to the raspberry-pi
## Running
1. Start `autodarts` (if not already running):
    1. `autodarts`
1. Run `autodarts-caller`:
    1. `./run_autodarts_caller.sh`
1. Open a browser and open: `<ip-of-your-raspberry-pi>`
    - you can copy the ip-address from the board-manager url
    - e.g. `192.168.178.73`
1. In the `IP:`-field you should enter the IP where autodarts is running (propably the same `<ip-of-your-raspberry-pi>`)
    - Enter the IP without `http` or `/`, example: `192.168.178.73`
    - you can copy the ip-address from the board-manager url
    - e.g. `192.168.178.73`
1. Click on `Connect`

## Drawbacks

**Important:** This tool has no access to the information of your current match. It can only call the score of your thrown three darts. Neither does it now if you've just won a leg, nor does it call the remaining points.

Besides that: the autodarts-api is not stable yet and can change anytime. This means that this tool may stop working after a new release of autodarts.

## Contributing

This simple web-app is built with Ember.js. The main-logic (= handling of websocket messages) is done in `app/services/websocket.js`. For development details see: [CONTRIBUTING.md](CONTRIBUTING.md).

## Customizing (quick quide)

- See [CONTRIBUTING.md](CONTRIBUTING.md) for development requirements
- Clone project
- Update files in `app/`
- Build project: `ember build --environment=production`
- Created folder `autodarts-caller/` can be transfered to raspberry-pi 
- Then follow installation guide starting from: "Download and unzip..." (Replace zip-file with your built folder)
