set -ex

node node_modules/jest/bin/jest.js

node node_modules/jest/bin/jest.js --coverage --coverageDirectory /var/temp/coverage

/root/.dotnet/tools/reportgenerator -reports:/var/temp/coverage/cobertura-coverage.xml -targetdir:/var/temp/coverage/ -reportTypes:htmlInline
