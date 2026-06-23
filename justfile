# development server
dev:
    npm run dev -- --host --open

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
