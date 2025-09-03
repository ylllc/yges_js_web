@cd /d %~dp0
del public\yges\ipl.js
for /f %%i in ('type makeipl.txt') do type "public\yges\%%i.js" >>public\yges\ipl.js
pause
