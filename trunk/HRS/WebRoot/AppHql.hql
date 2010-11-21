select page.pageId,
page.pageResourceId,
res.valueId,
eng.engineCode
from InfoPage as page,
InfoPageResource as res,
RuleEngineData as eng
where page.pageResourceId=
res.pageResource and
res.valueId=
eng.valueId	and 
page.pageId='10000001'

