# Swager-Validator
This repository provides a useful tool to validation of swagger. 
The main objective is validate the rules from Open Finance Brasil.

## Executing with Docker
```
docker build . -t swagger-validation
docker run -p 6003:6003 swagger-validation
```

### Find properties


```
POST localhost:6003/Finder
Request Payload example:

{
  "url":[
    "https://raw.githubusercontent.com/OpenBanking-Brasil/openapi/main/swagger-apis/opendata-accounts/1.0.0.yml"
    
    ],
  "query" : [
    
    {
      "property" : "maxItems",
      "value" :"200",
      "isExactlyValue": false
    }
    ]
}
```
isExactlyValue // To find a value that contains part of the property value, just set the property with 'false'.


### Swagger Validation

```
POST localhost:6003/validation

Request payload example:
{
  "url" : "https://raw.githubusercontent.com/Sensedia/draft-openapi/aggr-opendata-accounts/swagger-apis/opendata-accounts/1.0.0-beta.1.yml",
  "validators" : [1,2,3,4,5,6,7]

}

```
## Validators

#### 1 - String with property 'MaxLength'
#### 2 - Enum without property 'MaxLength'
#### 3 - String with property 'pattern' valid with property 'example'
#### 4 - String with Pattern
#### 5 - Array with 'MaxItem'
#### 6 - String with property 'MinLength'
#### 7 - Property 'pattern' without 'NA'
#### 8 - String not accept text with trim on pattern
#### 9 - Property in required without be used
#### 10 - Property cnpj with pattern valid
#### 11 - Property cpf with pattern valid

### Executing

## Without Docker

### Runing local 
Just put in the payload the url and validators that you want to validate.
### Setup project
```
npm install
```
### Running:
```
npx ts-node index.ts
```