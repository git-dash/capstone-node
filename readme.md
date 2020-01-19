Capstone Node Application service description

No  PORT   Service Name            Description
1.  3000   Search Restaurants      search restaurants by various filters
2.  3001   Order                   Place an Order with order details
3.  8080   API-Gateway             Single port Endpoint for all API Requests 
4.  3002   Aggerator               Simple Queries on different services
5.  3010   NodeMailer              Service to send mail
6.  3005   RabitMQ                 RabitMQ service using producer-consumer approach


docker commands to run docker image one by one

1. cd to specified service
2. docker build -t service-name:version .
3. docker run service-name_generated build_id
4. docker delete service_name

#docker compose

    
