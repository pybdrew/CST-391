# Milestone 4
- Andrew Rodriguez  
- 28 Sep 2025  

## Introduction
> [!Note]  
> This builds upon [Milestone 3](../Milestone%203/README.md)  
> Quick link to [API Code](../InclusionAPI/)  
> Quick link to [Front-end Code](../Inclusion/)  

> [!IMPORTANT]  
> View [Challenges, Issues, and Lessons Learned](#challenges-issues-and-lessons-learned)  
> Angular Front-End Demo: [Loom Link](https://www.loom.com/share/7b06c11168624906a77b5d6b27bcd00d?sid=8bc66ee2-5f0b-4314-94e1-b17a3eb0b16e)  
> View PowerPoint .PDF version here: [Milestone 4 PowerPoint](./Milestone%204.pdf)  

Inclusion is a Christian-themed personal study web app that enables users to read, update, and delete personal study notes tied to specific Bible verses and translations. While Milestone 3 focused on implementing the REST API with Express/Node.js and MySQL, Milestone 4 integrates an **Angular front-end** with this backend. The Angular application now provides interactive navigation, UI components for viewing verses and comments, and the ability to perform CRUD operations directly in the browser. This marks the project’s first milestone with full-stack functionality.  

## Functionality Requirements
- As a user, I want to navigate a Home page to understand the purpose of the app and access key features.  
- As a user, I want to browse Bible verses through different translations.  
- As a user, I want to view, add, edit, and delete personal comments tied to specific verses.  
- As a user, I want to filter comments by translation for better comparison across versions.  
- As a user, I want to view a dedicated **My Comments** page showing all my study notes in one place.  
- As a user, I want to use the Angular interface for seamless, real-time interaction with the backend API.  

<br>

## Database Design: ER Diagram
![ER Diagram](../Milestone%202/images/ER.png)

## UI Sitemap
![UI Sitemap](./images/sitemap.png)

## UI Wireframes 
**Home Page**
![Home Page](./images/home.png)

**Books/Browse Page**
![Browse Page](./images/books.png)

**My Comments Page**
![Comments Page](./images/comments.png)

**Add Comments Page Page**
![Add Comments Page](./images/addcomments.png)

**Edit Comments Page**
![Edit Comments Page](./images/edit%20comment.png)

## UML 
**Front-end UML**
![Front-end UML](./images/front-end%20UML.png)

**Back-end UML**
![Back-end UML](./images/back-end%20UML.png)

## REST Endpoints
(Unchanged from Milestone 3, now consumed by Angular UI)  

|Method|Endpoint|Description|Postman
|--|--|--|--|
|GET|/comments|Retrieve all comments|[Postman](../Milestone%202/images/GET%20all.png)|
|GET|/comments/:id|Retrieve comment by id|[Postman](../Milestone%202/images/GET%20id.png)|
|GET|/verses/all?|Retrieve all translations|[Postman](../Milestone%202/images/GET%20translations.png)|
|POST|/comments|Create a new comment|[Postman](../Milestone%202/images/POST.png)|
|PUT|/comments/:id|Update comment by id|[Postman](../Milestone%202/images/PUT.png)|
|DELETE|/comments/:id|Delete comment by id|[Postman](../Milestone%202/images/DEL.png)|


## Risks
1. Front-end Integration: Angular needed careful routing and service injection to align with backend endpoints.  
2. UI/UX Consistency: Handling multiple translations and dynamic verse data introduced complexity in component state.  
3. Scalability: Rendering potentially large comment sets requires efficient filtering and pagination(pagination not yet included).  
4. Angular Forms: Ensuring two-way binding and validation worked properly for comment editing.  

## Challenges, Issues, and Lessons Learned
During this milestone, most challenges were centered on Angular setup and routing. The edit-comment feature required aligning Angular’s two-way binding (`ngModel`) with form inputs, and ensuring navigation between pages (Home, Browse Verses, Comments) worked consistently. A key lesson learned was structuring Angular components to cleanly separate data services (API calls) from UI logic. Integrating Angular with the existing API demonstrated the importance of consistent endpoint design and reusable services.  

## Conclusion
With the completion of Milestone 4, Inclusion now provides a working Angular front-end integrated with the Express/Node.js backend and MySQL database. Users can browse verses, view details, and fully manage personal study comments in an interactive UI. This milestone marks the transition from backend-only functionality to a complete full-stack application, laying the foundation for improved user experience and future enhancements.
