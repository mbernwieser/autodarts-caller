# autodarts-caller

Let someone call your score in your [autodarts.io](https://github.com/autodarts/docs)-setup. 

## Installation

1. Log-in to your raspberry pi via ssh
1. Go to your home-directory: `cd ~`
1. Install `docker`:
    1. `curl -fsSL https://get.docker.com | sh`
    1. Check if installation was successful by running a hello-world image `sudo docker run --rm armhf/hello-world`
    - If you see no errors everything should be fine
1. Download and unzip `autodarts-caller`:
    1. `wget https://cdn.discordapp.com/attachments/953370701329481741/953411857383817266/autodarts-caller.zip`
    1. `unzip -o autodarts-caller.zip -d .`
1. Go to the `autodarts-caller`-directory you just created:
    1. `cd autodarts-caller/`
    1. Make run-script executable: `chmod +x run_autodarts_caller.sh`
1. Add sounds to `autodarts-caller/sounds/`:
    1. Either you create sounds by yourself or you use existing soundpacks (e.g. sounds from Russ Bray)
        - Due to copyright issues the sounds are not included in this repository but you can find them in various dart-communities
        - Example (Russ Bray): https://www.dartn-forum.de/thread/129-russ-bray-sounds-f%C3%BCr-dartpro-software/?postID=473437#post473437
    1. Requirement: all sound files must be in .mp3 format
        - if the sounds are in a different format they have to be converted to .mp3
    1. Possible sounds:
        - 1.mp3 - 180.mp3
        - 0.mp3 ("no score")
        - gameon.mp3 ("gameon" on succesful connect & additional sound buttons)
        - 1st.mp3 ("game shot and the first leg" in additional sound buttons)
    1. An easy way to add the sounds is to use a programm like `FileZilla`:
        1. Download and install `FileZilla` on the system from where you connect to the raspberry-pi
        1. Open `FileZilla` and connect to your raspberry-pi with the following parameters:
            1. `Server`: `<ip-address-of-your-raspberry-pi>`
            1. `Username`: `<your-raspberry-pi-username>` (default = "pi")
            1. `Password`: `<your-raspberry-pi-password>` 
            1. `Port`: `22`
        1. Now you should be able to just drag and drop the sounds from your system to the raspberry-pi
            - File structure should look like:
            - `autodarts-caller/sounds/0.mp3`
            - `autodarts-caller/sounds/1.mp3`
            - `autodarts-caller/sounds/2.mp3`
            - `...`
## Running
1. Start `autodarts` (if not already running):
    1. `autodarts`
1. Run `autodarts-caller` (maybe in a second terminal window/tab):
    1. `./run_autodarts_caller.sh`
1. Open a browser and open: `<ip-of-your-raspberry-pi>`
    - you can copy the ip-address from the board-manager url
    - e.g. `192.168.178.73`
1. In the `IP:`-field you should enter the IP where autodarts is running (propably the same `<ip-of-your-raspberry-pi>`)
    - Enter the IP without `http` or `/`
    - you can copy the ip-address from the board-manager url
    - e.g. `192.168.178.73`
1. Click on `Connect`
1. Throw three darts and if everything works you should hear your score

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
