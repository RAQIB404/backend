CREATE TABLE "address" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"street" varchar(255) NOT NULL,
	"city" varchar(100) NOT NULL,
	"state" varchar NOT NULL,
	"country" varchar(100) NOT NULL,
	"zip_code" varchar(20) NOT NULL
);
