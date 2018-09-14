update customers
set appointment_time = $1
where appointment_time = $2;