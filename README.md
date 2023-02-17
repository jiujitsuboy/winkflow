# winkflow

I simple fullstack application that allow people to register and buy coverage for crypto operations.

## Structure

This project use a monorepo structure where we have both the [web](/web) and [api](/api) code in the same repo.

### Web (UI)
The project is composed of following features

* Landing Page: This is the starting point of the project, where you land unathenticated/authenticated

![](images/landing.png)

* **Insurance List Page:** Here we find the list of insurances (coverage) offer to our clients.

![](images/insurances.png)

* My current Insurances: This is were the logged user, can see his coverage purchased. *This page required the user to be authenticated.*

![](images/my-insurances.png)

* FAQ: Frequently Asked Question section

![](images/faq.png)

* Login: Auth0 login page

![](images/login.png)

### Api (Graphql)
This project use a graphql api to serve all the logic and connection to the persistance layer. [api](http://localhost:4000/graphql) 

Mutation

* createUser(name: String): User!
* createInsurance(insuranceInput: InsuranceInputData!): Insurance!
* createChain(chainInput: ChainInputData!): Chain!
* buyCover(coverInput: CoverInputData!): Insurance

Queries

* getUser(id: Int!): User 
* getUserByName(name: String!): User
* getInsurance(id: Int!): Insurance
* getInsurances(pageNum: IntpageSize: Int): InsurancePaginated
* getChain(id: Int!): Chain
* getChains(pageNum: IntpageSize: Int): ChainPaginated
