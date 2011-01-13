select new
com.admin.page.struct.PageResourceStruct(
tr.resourceId,
tr.pageResource,
cc.componentName,
tr.xtypeCode,
tr.resourceTop,
tr.resourceLeft,
tr.resourceWidth,
tr.resourceHeight,
tr.valueId,
tr.config,
tr.baseCls
)
from CodeComponent as  cc,
TplPageResource as tr where 
cc.codeXtype=
tr.xtypeCode  and  
tr.pageResource='TPOWER0G'
