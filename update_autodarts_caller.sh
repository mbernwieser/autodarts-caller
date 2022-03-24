#!/bin/bash

# Colors - https://stackoverflow.com/a/65814978
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

function red {
    printf "${RED}$@${NC}\n"
}

function green {
    printf "${GREEN}$@${NC}\n"
}

function yellow {
    printf "${YELLOW}$@${NC}\n"
}

echo $(red "Are you sure you want to update/downgrade autodarts-caller to version: $1?")
echo $(red "All changes to default files (default-plugins, default-sounds, etc.) will be resetted!")
echo $(red "Type 'y' to continue or 'n' to cancel...")

read confirmed

if [ "$confirmed" != "y" ]; then
  echo "Exiting update/downgrade..."
fi

echo $(yellow "Creating backup...")

current_date=$(date +%Y-%m-%dT%H-%M-%S)
backup_file="autodarts-caller-backup_${current_date}"

cd ..
cp -r autodarts-caller/ "$backup_file"

echo $(green "Backup created: $backup_file")

echo $(yellow "Downloading new zip-file...")
echo $(yellow "Unzip new zip-file...")
