# PokerHandsProject
### Pokerhands project for ITrellis by Emily Wagner

## This project was made with:
  Backend: Asp.net core
  Frontend: React.js
  CSS: Bootstrap (not components)
  
## Additional libraries used:
   ### Backend:
        * Keith Rule's C# Poker Evaluator [Source Code](https://www.codeproject.com/Articles/12279/Fast-Texas-Holdem-Hand-Evaluation-and-Analysis) (included as project in solution)
        * Microsoft.AspNetCore.Mvc.NewtonsoftJson
        * Microsoft.EntityFrameworkCore
        * Microsoft.EntityFrameworkCore.Design
        * Microsoft.EntityFrameworkCore.InMemory (would have preffered a dedicated sql database but InMemory is simplier to setup for a project this scale)
        * Microsoft.EntityFrameworkCore.Proxies (to enable lazy loading for InMemory)
        * Microsoft.EntityFrameworkCore.Tools
        * Microsoft.VisualStudio.Web.CodeGeneration.Design
   ### Frontend:
        * Bootstrap

## To Deploy:
    1. Download zip and extract
    2. Open the Asp.NET solution in Visual Studio, Run a Nuget Package restore on the solution and launch it with IIS Express
    3. Run 'npm install' in the frontend directory to install the node modules
    4. Run 'npm start' in the frontend directory to start the spa
    5. (Seperatly) run 'npm test' to run unit tests