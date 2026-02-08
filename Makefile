.PHONY: help

check-certs: ## Check SSL certs for scheduled renewal
	@echo "Checking SSL certificates for scheduled renewal..." ; \
	cd certs && bunx --yes scheduled-renewal-notice

get-certs-local-dev: ## Download the latest SSL certs for "local.devhost.name"
	@rm -rf ./certs ; \
	git clone https://github.com/simplyhexagonal/local-dev-host-certs.git certs ; \
	cp ./certs/local.devhost.name.crt ./certs/default.crt ; \
	cp ./certs/local.devhost.name.key ./certs/default.key ; \
	make check-certs

get-env-local-dev: ## Get env from vaultcore
	mkdir -p .envs
	bunx --yes vaultcore read dianalu/dianalu.design/envs/local-dev.env .envs/local-dev.env
	cp -f .envs/local-dev.env .env

save-env-local-dev: ## Save local dev env to vaultcore
	bunx --yes vaultcore create dianalu/dianalu.design/envs/local-dev.env .envs/local-dev.env

get-env-production: ## Get production env from vaultcore
	mkdir -p .envs
	bunx --yes vaultcore read dianalu/dianalu.design/envs/production.env .envs/production.env
	cp -f .envs/production.env .env

save-env-production: ## Save production env to vaultcore
	bunx --yes vaultcore create dianalu/dianalu.design/envs/production.env .envs/production.env

install-dependencies: ## Install dependencies
	cd app && bun install
	cd cms && bun install
	cd message-broker && bun install

get-local-dev-cms-seeds: ## Get local dev cms seeds from vaultcore
	@export $$(grep -v '^#' envrepo.env | xargs) && \
	echo "Fetching CMS seed data for user: $$ENV_USER" && \
	mkdir -p ./cms/seeds && \
	bunx --yes vaultcore read dianalu/dianalu.design/$$ENV_USER/cms-seeds/users.json ./cms/seeds/users.json

save-local-dev-cms-seeds: ## Save local dev cms seeds to vaultcore
	@export $$(grep -v '^#' envrepo.env | xargs) && \
	echo "Saving CMS seed data for user: $$ENV_USER" && \
	bunx --yes vaultcore create dianalu/dianalu.design/$$ENV_USER/cms-seeds/users.json ./cms/seeds/users.json

get-production-cms-seeds: ## Get production cms seeds from vaultcore
	@export $$(grep -v '^#' envrepo.env | xargs) && \
	echo "Fetching CMS seed data for user: production" && \
	mkdir -p ./cms/seeds && \
	bunx --yes vaultcore read dianalu/dianalu.design/production/cms-seeds/users.json ./cms/seeds/users.json

save-production-cms-seeds: ## Save production cms seeds to vaultcore
	@export $$(grep -v '^#' envrepo.env | xargs) && \
	echo "Saving CMS seed data for user: production" && \
	bunx --yes vaultcore create dianalu/dianalu.design/production/cms-seeds/users.json ./cms/seeds/users.json

init: ## Install dependencies and initialize project
	make get-env-production
	make get-env-local-dev
	make get-certs-local-dev
	make get-local-dev-cms-seeds
	make install-dependencies

init-production: ## Install dependencies and initialize project
	make get-env-production
	make get-production-cms-seeds
	make install-dependencies

local-dev: ## Run local dev environment using Docker Compose
	@make check-certs && echo "Running local dev environment." && \
	docker compose up

local-dev-daemon: ## Run local dev environment using Docker Compose in daemon mode
	@make check-certs && echo "Running local dev environment in the background." && \
	echo "You can stop the environment with 'make dev-stop'." && \
	echo "You can show logs with 'make logs-all'." && \
	docker compose up -d

local-dev-backend: ## Run local dev environment using Docker Compose
	@make check-certs && echo "Running local dev backend." && \
	docker compose up proxy postgres cms message-broker cms-valkey message-broker-valkey

local-dev-stop: ## Stop local dev environment using Docker Compose
	docker compose stop

local-dev-down: ## Stop and remove local dev containers and volumes using Docker Compose
	docker compose down

local-db-only: ## Run only db and adminer
	@make check-certs && echo "Running db and adminer." && \
	docker compose up proxy postgres adminer

production: ## Run local dev environment using Docker Compose
	@echo "Running production environment." && \
	docker compose --file docker-compose.production.yml up

production-daemon: ## Run production environment using Docker Compose in daemon mode
	@echo "Running production environment in the background." && \
	echo "You can stop the environment with 'make production-stop'." && \
	echo "You can show logs with 'make logs-all'." && \
	docker compose up -d

production-backend: ## Run production backend using Docker Compose
	@echo "Running production backend." && \
	docker compose up proxy postgres cms message-broker cms-valkey message-broker-valkey

production-stop: ## Stop production environment using Docker Compose
	docker compose stop

production-down: ## Stop and remove production containers and volumes using Docker Compose
	docker compose down

production-setup: ## Run production setup playbook
	ansible-playbook --inventory scripts/playbooks/production/inventory.ini scripts/playbooks/production/setup.yml

lint-all: lint-app lint-cms lint-message-broker ## Lint all code
lint-all-fix: lint-app-fix lint-cms-fix lint-message-broker-fix ## Lint all code

lint-app: ## Run linter on app code (only check, not fix)
	bunx --yes @biomejs/biome check app

lint-cms: ## Run linter on cms code (only check, not fix)
	bunx --yes @biomejs/biome check cms/src

lint-message-broker: ## Run linter on message broker code (only check, not fix)
	bunx --yes @biomejs/biome check message-broker/src

lint-app-fix: ## Run linter on app code (check and fix)
	bunx --yes @biomejs/biome check --write app

lint-cms-fix: ## Run linter on cms code (check and fix)
	bunx --yes @biomejs/biome check --write cms/src

lint-message-broker-fix: ## Run linter on message broker code (check and fix)
	bunx --yes @biomejs/biome check --write message-broker/src

restart-app: ## Restart app container
	docker compose restart app

restart-cms: ## Restart cms container
	docker compose restart cms

restart-message-broker: ## Restart message broker container
	docker compose restart message-broker

restart-cms-valkey: ## Restart cms valkey container
	docker compose restart cms-valkey

restart-message-broker-valkey: ## Restart message broker valkey container
	docker compose restart message-broker-valkey

restart-all: ## Restart all containers
	docker compose restart

stop-app: ## Stop app container
	docker compose stop app

stop-cms: ## Stop cms container
	docker compose stop cms

stop-message-broker: ## Stop message broker container
	docker compose stop message-broker

local-reset-db: ## Reset local Postgres database
	docker compose stop postgres
	rm -rf ./.docker/postgres
	docker compose up -d postgres

logs-app: ## Show logs for app container
	docker compose logs -f app

logs-cms: ## Show logs for cms container
	docker compose logs -f cms

logs-message-broker: ## Show logs for message broker container
	docker compose logs -f message-broker

logs-cms-valkey: ## Show logs for cms valkey container
	docker compose logs -f cms-valkey

logs-message-broker-valkey: ## Show logs for message broker valkey container
	docker compose logs -f message-broker-valkey

logs-all: ## Show logs for all containers
	docker compose logs -f

build-app: ## Build app
	cd app && bun run build

build-cms: ## Build cms
	cd cms && bun run build

cms-migration-generate: ## Migrate cms
	cd cms && bun --env-file=../.env run payload migrate:create

cms-migrate: ## Migrate cms
	cd cms && npx --yes dotenv-cli -e ../.env -- npx --yes payload migrate

cms-cli: ## Run cms cli
	docker compose exec -it cms bash

valkey-flushall: ## Flush all valkey data
	valkey-cli -h localhost -p 6379 FLUSHALL
	valkey-cli -h localhost -p 6380 FLUSHALL

build-message-broker: ## Build message broker
	cd message-broker && bun run build

build-all: build-app build-cms build-message-broker ## Build all apps/services

postrender-app: ## Postrender app
	cd app && bun run postrender

codegen-app: ## Run codegen on app code
	cd app && bun run codegen

sync-types: ## Sync types between app and cms
	@cd cms && bun run generate:types
	@make codegen-app

start: ## Start the project
	bun run start

help: ## Show help
	@echo "Available targets:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
