select  
	
				 max(im.menuCode)

from  InfoMenu  as im 
where  im.moduleCode='0000000'
group by  im.moduleCode
