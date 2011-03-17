package com.device.struct;

import java.io.Serializable;

public class DataStatusStruct implements Serializable {
				
				private   String   device_id;
				
				private   Integer   device_var_id;
				
				private   String   status_code;
				
				private   String   status_message;
				
				private   String   value_id;

				public String getDevice_id() {
					return device_id;
				}

				public void setDevice_id(String deviceId) {
					device_id = deviceId;
				}

				public Integer getDevice_var_id() {
					return device_var_id;
				}

				public void setDevice_var_id(Integer deviceVarId) {
					device_var_id = deviceVarId;
				}

				public String getStatus_code() {
					return status_code;
				}

				public void setStatus_code(String statusCode) {
					status_code = statusCode;
				}

				public String getStatus_message() {
					return status_message;
				}

				public void setStatus_message(String statusMessage) {
					status_message = statusMessage;
				}

				public String getValue_id() {
					return value_id;
				}

				public void setValue_id(String valueId) {
					value_id = valueId;
				}
}
