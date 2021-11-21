-- my queries

-- insert some data
insert into items (task, complete, created_at) values
('Buy milk', false, current_timestamp),
('Clean car', false, current_timestamp),
('Go shopping', false, current_timestamp),
('Return amazon order', false, current_timestamp),
('Call Dad', false, current_timestamp),
('Take children to the park', false, current_timestamp),
('Write a blog post', false, current_timestamp),
('Share learning on LinkedIn', false, current_timestamp),
('Browse jobs', false, current_timestamp),
('Watch a movie', false, current_timestamp);

-- get items
select * from items order by id, created_at desc;

-- insert new item
insert into items (task, complete, created_at) values
('Buy milk', false, current_timestamp);

-- update item status
update items set complete = true where id = 4;