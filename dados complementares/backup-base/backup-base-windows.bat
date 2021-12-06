@echo off

set x=%DATE:~0,2%-%DATE:~3,2%-%DATE:~6,4%
echo %x%
set date=%x%
echo %date%

   set BACKUP_FILE=coronapeak_%date%.backup
   echo backup file name is %BACKUP_FILE%
   SET PGPASSWORD=123456!@#
   echo on
   bin\pg_dump.exe -h localhost -p 5432 -U admcoronapeak -F c -b -v -f %BACKUP_FILE% coronapeak
pause
