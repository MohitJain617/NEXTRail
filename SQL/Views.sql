use reservation_system;
-- ----------------- VIEWS --------------------- 

drop view if exists waiting_list_count;
CREATE VIEW waiting_list_count as
SELECT count(*) as WL, T.train_no, T.week_no, T.trip_no, P.class_type as class_type
FROM passenger as P, ticket as T, receipt as R
WHERE P.pnr = T.pnr
	AND P.pnr = R.pnr
	AND P.stat = 'WL'
    GROUP BY T.train_no, T.week_no, T.trip_no, P.class_type;

-- Waiting List View with ranks
drop view if exists waiting_list;
CREATE VIEW waiting_list as
SELECT dense_rank() over (order by R.transaction_time) as priority, P.pid, T.pnr, T.train_no, T.boarding_from, T.going_to, T.week_no, T.trip_no, P.class_type
FROM passenger as P, ticket as T, receipt as R
WHERE P.pnr = T.pnr
	AND P.pnr = R.pnr
	AND P.stat = 'WL'
    ORDER by priority,pid;

-- displays ticket details with everything from pnr to fare, dist, actual time and other stuff
drop view if exists ticket_view;
create view ticket_view as
select T.pnr, T.train_no,
        (select train_name from train as T2 where T2.id = T.train_no) as train_name,
        ((select dist from time_table as T2 where T2.train_no = T.train_no and T2.st_code = T.going_to)-
    	(select dist from time_table as T2 where T2.train_no = T.train_no and T2.st_code = T.boarding_from)) as dist,
        TIMESTAMP(Date_add(get_daytime(week_no,trip_no-1),
    	INTERVAL ((select day_no from time_table as TT where TT.train_no = T.train_no and TT.st_code = T.boarding_from)-1) day) ,
    	(select departure from time_table as T2 where T2.train_no = T.train_no and T2.st_code = T.boarding_from)) as srctime,
        TIMESTAMP(Date_add(get_daytime(week_no,trip_no-1),
    	INTERVAL ((select day_no from time_table as TT where TT.train_no = T.train_no and TT.st_code = T.going_to)-1) day),
        (select arrival from time_table as T2 where T2.train_no = T.train_no and T2.st_code = T.going_to)) as desttime,
        T.boarding_from, T.going_to, T.fare
        from ticket as T;
	
drop view if exists seats_view;
create view seats_view as
SELECT S.train_no,
	S.class_type as coach, SN2.num as coach_no, SN.num as seat_no FROM struct AS S,  
	class_layout as C, seat_no AS SN2, seat_no as SN 
	WHERE S.class_type = C.class_type AND SN2.num <= S.size 
	AND SN.num <= C.capacity;

drop view if exists stations_view;
create view stations_view as
select st_code,st_name,arrival,departure,dist,day_no
 from time_table natural join station 
 order by dist ;
 
