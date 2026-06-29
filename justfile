# development server
dev:
    npm run dev -- stop
    npm run dev -- --host --open --force

# build the site
build: install
    npm run build

# install dependencies
install:
    npm install

# update all dependencies
update:
    npm update

# deploy to cloudflare workers
deploy: build
    npx --yes wrangler deploy

# upload a cloudflare workers preview version
preview alias='': build
    #!/usr/bin/env bash
    set -euo pipefail

    preview_alias="{{alias}}"
    if [[ -z "$preview_alias" ]]; then
        branch="$(git branch --show-current)"
        if [[ "$branch" == "master" ]]; then
            preview_alias="preview"
        else
            preview_alias="$(printf '%s' "$branch" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9-]+/-/g; s/^-+//; s/-+$//; s/-+/-/g')"
        fi
    fi
    if [[ -z "$preview_alias" ]]; then
        preview_alias="preview"
    fi

    echo "Uploading Workers preview alias: $preview_alias"
    npx --yes wrangler versions upload --preview-alias "$preview_alias"
