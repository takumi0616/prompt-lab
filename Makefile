.PHONY: rebuild
rebuild:
	rm -rf node_modules
	npm install
	npm run lint
	npm run lint:fix
	npm run format
	npm run build
	docker compose up -d
	npm run migrate:init
	npm run postinstall
	# npm run seed

.PHONY: run
run:
	npm run format
	npm run build
	npm run dev

.PHONY: build
build:
	npm install
	npm run lint
	npm run lint:fix
	npm run format
	npm run build
	docker compose up -d
	npm run migrate:init
	npm run postinstall
	# npm run seed

.PHONY: resetdb
resetdb:
	npm run db:reset

.PHONY: seed
seed:
	npm run seed

.PHONY: studio
studio:
	npm run studio