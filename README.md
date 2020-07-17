# HRSA Findings Dashboard

### Demo: [yevgenybulochnik.github.io/hrsa-findings-dashboard](https://yevgenybulochnik.github.io/hrsa-findings-dashboard)

This repository is a full stack dashboard using flask and React/Redux + typescript. A sudo ETL pipeline is setup using Scrapy and docker to obtain [HRSA Program Integrity Data](https://www.hrsa.gov/opa/program-integrity/index.html). The data is adjusted to feed a Restapi using Scrapy items and pipelines. The api uses flask, sqlalchemy, marshmallow and webargs to allow for specific data queries and summaries. A modular "dataService" is used for the front end to allow a deployable version of the dashboard to github pages with data being embedded in the js bundle. The "dataService" is swappable on build using env vars. 

### Core Dependencies
<details>
<summary>Infra</summary>
    
- Docker
- Traefik
- Postgres
- Poetry
</details>

<details>
<summary>API</summary>
    
- Flask
- Flask-sqlalchemy
- Flask-marshmallow
- Flask-migrate
- Webargs
</details>

<details>
<summary>ETL</summary>

- Scrapy
</details>

<details>
<summary>Dashboard</summary>
  
- React (CRA)
- Redux
- Redux-saga
- Typescript
- Blueprintjs
- React-router
- Recharts
- D3
</details>
