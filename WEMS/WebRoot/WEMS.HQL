select cr.scriptUrl
from CodeComponent as cc,
ComponentResourceCode as cr
where cc.componentResourceId=
cr.componentResourceId  and  
cr.needScript=1

