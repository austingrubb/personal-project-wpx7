update customers
set appointment_date = $1
where appointment_date = $2 AND customers.id = $3;