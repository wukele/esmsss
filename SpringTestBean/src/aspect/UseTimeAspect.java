package aspect;

public class UseTimeAspect
{
	long beforeTime;
	long afterTime;
	long useTime;
	
	public void beforeTime()
	{
		beforeTime = System.currentTimeMillis();
		System.out.println("this method process before time is "+beforeTime);
	}
	
	public void afterTime()
	{
		afterTime = System.currentTimeMillis();
		useTime = afterTime - beforeTime;
		System.out.println("this method processed done time is "+afterTime);
		System.out.println("this method processed time is "+useTime);
	}
}
