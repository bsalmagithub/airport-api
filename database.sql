
INSERT INTO `countries` (`id`, `name`, `country_code_two`, `country_code_three`, `mobile_code`, `continent_id`) 
VALUES (198, 'New Country', 'NC', 'NCO', '123', 6);

ALTER TABLE `countries` MODIFY `name` VARCHAR(255) DEFAULT 'Default Country Name';

ALTER TABLE `countries` MODIFY `name` VARCHAR(255) NULL;

INSERT INTO `cities` (`id`, `name`, `country_id`, `is_active`, `lat`, `long`) 
VALUES (47868, 'New City', 198, DEFAULT, DEFAULT, DEFAULT);


