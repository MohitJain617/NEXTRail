use reservation_system;
-- ----------------- VIEWS --------------------- 
-- Waiting List View with ranks
drop view if exists waiting_list_count;
CREATE VIEW waiting_list_count as
SELECT count(*) as WL, T.train_no, T.week_no, T.trip_no, P.class_type as class_type
FROM passenger as P, ticket as T, receipt as R
WHERE P.pnr = T.pnr
	AND P.pnr = R.pnr
	AND P.stat = 'WL'
    GROUP BY T.train_no, T.week_no, T.trip_no, P.class_type;

-- reserve , passenger -> cancelled, x passenger -> which is in waiting list and

drop view if exists waiting_list;
CREATE VIEW waiting_list as
SELECT dense_rank() over (order by R.transaction_time) as priority, P.pid, T.pnr, T.train_no, T.boarding_from, T.going_to, T.week_no, T.trip_no, P.class_type
FROM passenger as P, ticket as T, receipt as R
WHERE P.pnr = T.pnr
	AND P.pnr = R.pnr
	AND P.stat = 'WL'
    ORDER by priority,pid;

