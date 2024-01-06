# InquirerCMS [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


## Description

This project is a command-line content management system (cms) which itilizes the inquirer npm package to navigate.

  
## Table of Contents

  - [Installation](#installation)
  - [Usage](#usage)
  - [Credits](#credits)
  - [License](#license) 


## User Story

```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Database Format

Schema: 
![Database schema includes tables labeled “employee,” role,” and “department.”](./Assets/12-sql-homework-demo-01.png)



* `department`

    * `id`: `INT PRIMARY KEY`

    * `name`: `VARCHAR(30)` to hold department name

* `role`

    * `id`: `INT PRIMARY KEY`

    * `title`: `VARCHAR(30)` to hold role title

    * `salary`: `DECIMAL` to hold role salary

    * `department_id`: `INT` to hold reference to department role belongs to

* `employee`

    * `id`: `INT PRIMARY KEY`

    * `first_name`: `VARCHAR(30)` to hold employee first name

    * `last_name`: `VARCHAR(30)` to hold employee last name

    * `role_id`: `INT` to hold reference to employee role

    * `manager_id`: `INT` to hold reference to another employee that is the manager of the current employee (`null` if the employee has no manager)


 

  ## Installation

  You can do a git clone and an npm i to install the js side of the project. 
  
  To initialize the database, you will need mysql. You should download mysql, rename the file .envExample to .env and enter in the username and password you chose where appropriate. You then go into mysql, type "SOURCE ./db/schema.sql", then "SOURCE ./db/seeds.sql" if you would like it to be seeded, and exit out of mysql. From there you may type "node  index.js " to start the application. 

  ## Usage

  After starting the application from the steps described earlier, simply follow the prompts on-screen!

  <!---
      ![alt text](assets/images/screenshot.png)
  -->
  ## Credits

  Andrew Layendecker was a big help in dealing with promises. This project is also an adaptation of coursework from UPenn's Fullstack Web Development Bootcamp, so credit goes to them for their influences.

  ## License

   The MIT License (MIT)

    Copyright © 2023 Hudson Pepper
    
    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
    
    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
    


  ## Badges

  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

  ## How to Contribute

  Feel free to fork and change as you wish. This project is not currently being updated, so feel free to change whatever you would like.

  ## Tests

  There is no testing suite available at this time.

  ## Questions

  Please submit all questions to github.com/hudsonpepper
 