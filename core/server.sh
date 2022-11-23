 #!/usr/bin/env bash
red=`tput setaf 1`
green=`tput setaf 2`
reset=`tput sgr0`
if [ $# -eq 0 ]
then
    echo "${red}You must specify a valid project config"
else 
    echo "$(tput setaf 2)BUIDLING FOR $(tput sgr 0)$(tput setaf 1)$(tput setab 7) $1 $(tput sgr 0) $(tput setaf 2)IN PRODUCTION MODE "
    echo "$(tput setaf 2) Copying config files"
    cp core/$1/theme.js tailwind.config.js
    # cp custom/$1/TopSearch.jsx src/components/TopSearch.jsx
    cp core/$1/urls.js src/urls.js
    cp core/$1/config.js src/config.js
    cp core/$1/favicon.ico public/favicon.ico
    rm -rfv src/assets/images/*
    cp -R core/$1/images/. src/assets/images/
    eval 'react-scripts start'
fi