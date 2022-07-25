# openIMIS CS Frontend module

- Link Install
Using Yarn simple link process doesn't work on Mac Os 

Here is the method we found : 

`
cd ../openimis-fe-cmr-cs_js
yarn install
yarn build
yarn link
cd ../openimis-fe_js
yarn link "@openimis/fe-cmr-cs"
yarn add "@openimis/fe-cmr-cs@link:latest"
yarn install
yarn start

cd ../openimis-fe-claim_js
yarn install
yarn build
yarn link
cd ../openimis-fe_js
yarn link "@openimis/fe-claim"
yarn add "@openimis/fe-claim@link:latest"
yarn install
yarn start
`