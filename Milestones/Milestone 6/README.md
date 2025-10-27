# Milestone 6
- Andrew Rodriguez
- October 26 2025
  
## Introduction
> [!NOTE]  
> This builds upon [Milestone 4 - Angular](../Milestone%204/README.md) and [Milestone 5 - React](../Milestone%205/README.md)
> Quick link to [API Code](../InclusionAPI/)  
> Quick link to [React Front-end Code](../Inclusionre/)  
> Quick link to [Angular Front-end Code](../Inclusion/)


> [!IMPORTANT]  
> View [Conclusion](#conclusion)  
> React Front-End Demo: [Loom Link](https://www.loom.com/share/7b054701927a45c68b29b506861fb992)  
> View PowerPoint .PDF version here: [Milestone 6 PowerPoint](./Milestone%206.pdf)  
> 
## Sitemaps
![Angular Sitemap](../Milestone%204/images/sitemap.png)
*Sitemap used for both Angular and React front-ends*


## Wireframes
This section shows a pages from both the Angular and React front-end. Please view previous Milestones(4 and 5) to see full wireframe.

![Angular Verses](../Milestone%204/images/books.png)
*Angular verses display page*

![React Comments](../Milestone%205/images/viewComments.png)
*Study comments user created with React*

![Angular Edit Comment](../Milestone%204/images/edit%20comment.png)
*Angular Edit Comment Page*

## Database Design
![ER Diagram](../Milestone%202/images/ER.png)
*This is the database design used for both applications, the front-ends were the only necessary change*

## Class Diagrams
![Angular Classes](../Milestone%204/images/back-end%20UML.png)
*Angular Class Diagram*

![React Classes](../Milestone%205/images/UML.png)
*React Class Diagram*

## REST Endpoints
|Method|Endpoint|Description|Postman
|--|--|--|--|
|GET|/comments|Retrieve all comments|[Postman](../Milestone%202/images/GET%20all.png)|
|GET|/comments/:id|Retrieve comment by id|[Postman](../Milestone%202/images/GET%20id.png)|
|GET|/verses/all?|Retrieve all translations|[Postman](../Milestone%202/images/GET%20translations.png)|
|POST|/comments|Create a new comment|[Postman](../Milestone%202/images/POST.png)|
|PUT|/comments/:id|Update comment by id|[Postman](../Milestone%202/images/PUT.png)|
|DELETE|/comments/:id|Delete comment by id|[Postman](../Milestone%202/images/DEL.png)|

## Conclusion
The personal Bible study web application demonstrates a full-stack implementation integrating a MySQL database, a Node.js/Express REST API, and dynamic front-ends using Angular and React. Across milestones, key functionality such as CRUD operations, dynamic verse display, and comment management has been successfully implemented. Lessons learned include the importance of early API contract definition, modular component/service design, and thorough testing with Postman. Challenges such as route alignment, asynchronous debugging, and performance optimization provided valuable insights for future improvements. Moving forward, completing pending frontend features, refining database queries, and enhancing scalability will ensure a robust, maintainable, and user-friendly application.