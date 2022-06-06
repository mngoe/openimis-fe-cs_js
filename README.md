# openimis-fe-cs_js


Register new link :

cd ../openimis-fe-cs_js
yarn unlink
cd ../openimis-fe_js
yarn unlink @openimis/fe-cs
cd ../openimis-fe-cs_js
yarn install
yarn link
cd ../openimis-fe_js
yarn link ../openimis-fe-cs_js
yarn load-config openimis.json
yarn install