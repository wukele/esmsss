echo %date:~0,4%��%date:~5,2%��%date:~8,2%�� %time:~0,2%ʱ%time:~3,2%��%time:~6,2%�� ��ʼ��������>>control.log
sqlldr userid=mansys/mansys@scpt control=impdata.ctl
echo %date:~0,4%��%date:~5,2%��%date:~8,2%�� %time:~0,2%ʱ%time:~3,2%��%time:~6,2%�� ������������>>control.log
echo %date:~0,4%��%date:~5,2%��%date:~8,2%�� %time:~0,2%ʱ%time:~3,2%��%time:~6,2%�� ��ʼ���������ֵ���>>control.log
sqlplus mansys/mansys@scpt @alter.sql
echo %date:~0,4%��%date:~5,2%��%date:~8,2%�� %time:~0,2%ʱ%time:~3,2%��%time:~6,2%�� �������������ֵ���>>control.log
echo %date:~0,4%��%date:~5,2%��%date:~8,2%�� %time:~0,2%ʱ%time:~3,2%��%time:~6,2%�� ��������>>control.log
exit
