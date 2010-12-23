select m
from RuleRoleFunc as rrf,
InfoMenu as m,
RuleOperRole as rr
where rrf.roleCode=
rr.roleCode and 
rrf.entityType='M' and
m.menuCode=
rrf.entityCode and 
rr.operNo='TEST01'

