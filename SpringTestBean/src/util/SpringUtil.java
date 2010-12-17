package util;

import org.springframework.context.support.AbstractApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class SpringUtil
{
	private static AbstractApplicationContext	appConfig;

	public static AbstractApplicationContext getApplicationContext()
	{
		if(appConfig == null)
			appConfig = new ClassPathXmlApplicationContext(
					new String[] { "bean.xml" });
		return appConfig;
	}
}
