package com.ems.dao;

import java.util.List;
import java.util.Map;

import com.ems.entity.RealTimeData;

public interface IReadDataCollector {
			List<RealTimeData>   GetRealTimeDataByValueId(List<String> values);
			List<RealTimeData>    findRealtimedataByDE(String deCode);
}
