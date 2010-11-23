package com.ems.dao;

import java.util.List;

import com.ems.entity.RealTimeData;

public interface IReadDataConllector {
			List<RealTimeData>   GetRealTimeDataByValueId(List<String> values);
			List<RealTimeData>    findRealtimedataByDE(String deCode);
}
