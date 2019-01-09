-- DATABASE 
create DATABASE project;
	use project;

-- SCHEMA
CREATE TABLE students(student_id int auto_increment primary key,
	        		  first_name varchar(255),	
	        		  last_name varchar(255),
	        		  phone_number varchar(255),
	        		  address varchar(255)
	        		  username varchar(255)
	        		  email varchar(255)
	        		  password varchar(255));

CREATE TABLE instructors(instructor_id int auto_increment primary key,
						 first_name varchar(255),
						 last_name varchar(255),
						 phone_number varchar(255),
						 address varchar(255)
						 username varchar(255)
	        		  	 email varchar(255)
	        		  	 password varchar(255));

CREATE TABLE courses(course_id int auto_increment primary key,
					 course_name varchar(255),
					 about varchar(255)
					 download varchar(255)
					 created_date date);

CREATE TABLE studentcourses(course_id,
							student_id);

CREATE TABLE instructorstudents(student_id,
								instructor_id);

--DATA
INSERT INTO courses (course_name,about,download) VALUES ( 'Web developer bootcamp','
														   Web developer bootcamp',	
														   'https://www.udemy.com/the-complete-web-development-bootcamp/');
INSERT INTO courses (course_name,about,download) VALUES ( 'AWS',
														  'AWS certified solutions',	
														  'https://www.udemy.com/aws-certified-solutions-architect-associate/');
INSERT INTO courses (course_name,about,download) VALUES ( 'WEB',
														  'WEB DEVELOPER',
														  'https://www.udemy.com/the-web-developer-bootcamp/');
INSERT INTO courses (course_name,about,download) VALUES ( 'Ethical Hacking',
	                                                      'The complete Ethical Hacking',	
	                                                      'https://www.udemy.com/hacking-complete/learn/v4/');
INSERT INTO courses (course_name,about,download) VALUES ( 'Angular2',
														  'Learn Angular2',
														  'https://www.udemy.com/learn-angular-2-from-beginner-to-advanced/learn/v4/');
INSERT INTO courses (course_name,about,download) VALUES ( 'WordPress',
														  'Wordpress',
														  'https://www.udemy.com/wordpress-beginners/learn/v4/');
INSERT INTO courses (course_name,about,download) VALUES ( 'Website',
	                                                      'Build Your own website',
	                                                      'https://www.udemy.com/how-to-build-your-own-website/learn/v4/');
INSERT INTO courses (course_name,about,download) VALUES ( 'Photoshop',
	                                                      'Learn Photshop from zero',
	                                                      'https://www.udemy.com/photoshop-effects-photo-effects/learn/v4/')
INSERT INTO courses (course_name,about,download) VALUES ( 'C++',
														  'Learn and Understand C++',
														  'https://www.udemy.com/learn-c-plus-plus-from-beginner-to-advanced/learn/v4/');
INSERT INTO courses (course_name,about,download) VALUES ( 'Web developer bootcamp','WEB DEVELOPER','https://www.udemy.com/the-complete-web-development-bootcamp/');

INSERT INTO `students`(`first_name`,`last_name`,`phone_number`,`address`,`username`,`email`, `password`) 
 						VALUES ('Sahil','kumar','8565077815','allahabad','sahil','sk19631999@gmail.com','123')

INSERT INTO `students`(`first_name`,`last_name`,`phone_number`,`address`,`username`,`email`, `password`) 
 						VALUES ('Rohan','Patel','8565077815','Jabalpur','rohan','sk19631999@.com','123')
gmail
 INSERT INTO `instructors`(`first_name`,`last_name`,`phone_number`,`address`,`username`,`email`, `password`)
 					   VALUES ('Rohan','Patel','8565077815','jabalpur','rohan','sk19631999@gmail.com','123')

INSERT INTO `instructors`(`first_name`,`last_name`,`phone_number`,`address`,`username`,`email`, `password`)
 					   VALUES ('sahil','kumar','8565077815','allahabad','rohan','sk19631999@gmail.com','123')

--TRIGGERS
DELIMITER ;;
CREATE TRIGGER `my_table_bi` BEFORE INSERT ON `courses` FOR EACH ROW
BEGIN
    SET NEW.created_date = NOW();
END;;
DELIMITER ;