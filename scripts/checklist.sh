#!/bin/bash

helpcommand="checklist [-v] [-t] [-l] [-c] [-r] [-d]

Prompts the user to confirm that all the following steps are done before committing to a new release:

  1. Bumped version number? (-v)
  2. Ran linter? (-l)
  3. Tested and uploaded new code coverage? (-c)
  4. Updated release notes? (-r)
  5. Added documentation? (-d)
  6. Added a new tag for the release commit? (-t)

If no arguments are specified, goes through all checks. Otherwise only goes through the specified checks.
"

if [[ $* == *--help* ]]; then
    printf "$helpcommand"
    exit 0
fi

version=false
tag=false
linter=false
coverage=false
releasenotes=false
documentation=false

# If no arguments are specified, includes all checks, otherwise only the ones specified.

if [[ $* = "" ]]; then
    version=true
    tag=true
    linter=true
    coverage=true
    releasenotes=true
    documentation=true
fi

if [[ $* == *-*v* ]]; then version=true; fi
if [[ $* == *-*t* ]]; then tag=true; fi
if [[ $* == *-*l* ]]; then linter=true; fi
if [[ $* == *-*c* ]]; then coverage=true; fi
if [[ $* == *-*r* ]]; then releasenotes=true; fi
if [[ $* == *-*d* ]]; then documentation=true; fi

if [[ $version = false && $tag = false && $linter = false && $linter = false && $coverage = false && $releasenotes = false && $documentation = false ]]; then
    printf "No checks specified! Either run without arguments or use one or all of: -v, -t, -l, -c, -r, -d\n"
    exit 1
fi

function ask {
    read -n 1 -r -p "$1 (y/n) " confirm
    printf "\n"

    if [[ $confirm == [nN] ]]; then
        printf "\nOkay, no problem. Come back when you've completed this step.\n"
        exit 1
    elif [[ $confirm != [yY] ]]; then
        printf "\n\"$confirm\"? Really? If you can't even follow simple instructions, how can you ever hope to follow a checklist like this?\n"
        exit 1
    fi
}

if [[ $version = true ]]; then
    ask "Did you bump the version number?"
fi

if [[ $linter = true ]]; then
    ask "Did you run a linter across the source code?"
fi

if [[ $coverage = true ]]; then
    ask "Did you update the tests, maintaining 100% code coverage, and upload the new code coverage to codecov?"
fi

if [[ $releasenotes = true ]]; then
    ask "Did you update the release notes?"
fi

if [[ $documentation = true ]]; then
    ask "Did you update the documentation, if necessary?"
fi

if [[ $tag = true ]]; then
    ask "Did you tag the release commit in the repository?"
fi

printf "\nGreat! All checks complete. You are now ready to release.\n"
