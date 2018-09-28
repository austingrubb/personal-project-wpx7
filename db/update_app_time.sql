update customers
set appointment_time = $1
where email = $2;