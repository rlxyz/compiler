docker-run:
				DOCKER_BUILDKIT=1 docker-compose up -d --build
docker-run-prod:
				COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose -f docker-compose.prod.yml up -d
migrate:
				docker-compose exec api knex migrate:latest
				docker-compose exec api knex seed:run