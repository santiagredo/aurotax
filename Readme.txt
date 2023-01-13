Project made between Cjaf1994 and Santiagredo, first stable release on January 13th, 2023.

The idea for this application originated from Cjaf1994, who works with tax forms and saw the opportunity to automate the process. The idea was pitched to a group of people, including Santiagredo, at the beginning of "ciclo 4, ruta 2 del MinTic 2022" in November 2022. Initially, the project was presented with just one form filling feature, but Cjaf1994 and Santiagredo later decided to launch it to a wider audience.

The development of the application required learning new technologies, as most of them were new for both Cjaf1994 and Santiagredo. The app uses Oracle Apex to store information, and NodeJS to generate PDFs, encrypt/decrypt information, and manage an administration page. The specific NodeJS packages used include express, express-session, passport, passport-local, dotenv, ejs, crypto, and pdf-lib. On the frontend, the application uses Bootstrap for styling, PayPal for handling payments, a captcha for security, jQuery for dynamic functionality, and another pdf-lib script for handling pdf documents. 

The app offers users the option to choose between a free version or a paid version, with the paid version offering more features and capabilities. The free version allows users to fill two different forms in one go, while the paid version allows users to fill up to six different forms in one go. In the free version, no information is collected by the server and the pdf-lib module generates and downloads the forms once completed. In the paid version, once all the information is submitted, it is wrapped in a JSON, sent to express for encryption, and then sent for storage in Apex. Due to time constraints, we did not implement an automated form delivery, instead, users must contact us after finishing the form and we will then send them their respective files.

The app still has room for improvement. One important aspect to address is the ability to download the PDF files through the admin module from any browser or computer, as it currently only allows downloading them if the app is running on localhost. This issue may be related to wrong paths in Express and Ubuntu, or Oracle's server.
Another improvement would be to notify users and administrators when a form is filled, through email. This feature would help users keep track of their forms and administrators to keep track of the forms filled by users.
Another possible improvement is to add a donation button, this would allow users who are satisfied with the app to support its development and maintenance.

Cjaf1994 purchased a DNS from Hostinger, while Santiagredo used an Oracle server with Ubuntu to run the application online. This was the most challenging part of the development process as both of us had limited experience with the terminal and Ubuntu in general. However, we were able to successfully generate an SSL certificate and deploy the app on the server. The URL for the application is aurotax.com. This required a lot of effort, research and a lot of learning, but we finally managed to make it happen.

To run the app, use the command node server.js in server folder.

This readme.txt file will be updated if any major improvements are implemented in the future.



